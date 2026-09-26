import bcrypt from "bcryptjs";
import cookieParser from "cookie-parser";
import crypto from "node:crypto";
import { existsSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import dotenv from "dotenv";
import express from "express";
import { rateLimit } from "express-rate-limit";
import jwt from "jsonwebtoken";
import { projects } from "./src/data/portfolio.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 8085;
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const distPath = path.join(__dirname, "dist");
const adminPath = path.join(distPath, "admin", "index.html");
const adminLoginPath = path.join(distPath, "admin", "login", "index.html");
const authCookieName = "portfolio_admin";
const csrfCookieName = "portfolio_admin_csrf";
const sessionDurationMs = 4 * 60 * 60 * 1000;
const isProduction = process.env.NODE_ENV === "production";

// Les sessions actives sont conservées côté serveur : supprimer une entrée invalide
// immédiatement le JWT correspondant, y compris s'il a été copié avant la déconnexion.
const activeSessions = new Map();

if (!existsSync(distPath)) {
  throw new Error("Le dossier dist est introuvable. Exécutez `npm run build` avant `npm start`.");
}

app.disable("x-powered-by");
app.use((_request, response, next) => {
  response.set({
    "Content-Security-Policy": "default-src 'self'; base-uri 'self'; form-action 'self'; frame-ancestors 'none'; object-src 'none'; script-src 'self'; style-src 'self' https://fonts.googleapis.com; img-src 'self' data:; font-src 'self' https://fonts.gstatic.com; connect-src 'self'",
    "Permissions-Policy": "camera=(), geolocation=(), microphone=()",
    "Referrer-Policy": "strict-origin-when-cross-origin",
    "X-Content-Type-Options": "nosniff",
    "X-Frame-Options": "DENY",
  });
  next();
});
app.use(express.json({ limit: "10kb" }));
app.use(cookieParser());

function adminConfig() {
  const { ADMIN_USERNAME, ADMIN_PASSWORD_HASH, JWT_SECRET } = process.env;
  if (!ADMIN_USERNAME || !ADMIN_PASSWORD_HASH || !JWT_SECRET || JWT_SECRET.length < 32) return null;
  return { username: ADMIN_USERNAME, passwordHash: ADMIN_PASSWORD_HASH, jwtSecret: JWT_SECRET };
}

function cookieOptions() {
  return { httpOnly: true, sameSite: "strict", secure: isProduction, path: "/" };
}

function csrfCookieOptions() {
  // Ce cookie ne permet pas de s'authentifier : il est uniquement comparé à
  // l'en-tête CSRF afin de protéger les requêtes qui reposent sur le cookie JWT.
  return { httpOnly: false, sameSite: "strict", secure: isProduction, path: "/" };
}

function noStore(response) {
  response.set("Cache-Control", "no-store, max-age=0");
}

function createCsrfToken() {
  return crypto.randomBytes(32).toString("base64url");
}

function tokensMatch(first, second) {
  if (typeof first !== "string" || typeof second !== "string") return false;
  const firstBuffer = Buffer.from(first);
  const secondBuffer = Buffer.from(second);
  return firstBuffer.length === secondBuffer.length && crypto.timingSafeEqual(firstBuffer, secondBuffer);
}

function hashCsrfToken(token) {
  return crypto.createHash("sha256").update(token).digest("hex");
}

function getSession(request) {
  const config = adminConfig();
  const token = request.cookies[authCookieName];
  if (!config || !token) return null;
  try {
    const payload = jwt.verify(token, config.jwtSecret, { algorithms: ["HS256"], issuer: "portfolio-admin", audience: "portfolio-admin" });
    const session = activeSessions.get(payload.jti);
    if (!payload.jti || !session || session.expiresAt * 1000 <= Date.now()) {
      activeSessions.delete(payload.jti);
      return null;
    }
    return { payload, session };
  } catch {
    return null;
  }
}

function requireAdminPage(request, response, next) {
  if (!getSession(request)) {
    noStore(response);
    return response.redirect(302, "/admin/login");
  }
  return next();
}

function requireAdminApi(request, response, next) {
  const session = getSession(request);
  if (!session) {
    noStore(response);
    return response.status(401).json({ message: "Authentification requise." });
  }
  request.adminSession = session;
  return next();
}

function requireCsrf(request, response, next) {
  const csrfCookie = request.cookies[csrfCookieName];
  const csrfHeader = request.get("X-CSRF-Token");
  const tokensAreValid = tokensMatch(csrfCookie, csrfHeader);
  const sessionTokenMatches = !request.adminSession
    || (tokensAreValid && hashCsrfToken(csrfCookie) === request.adminSession.session.csrfTokenHash);

  if (!tokensAreValid || !sessionTokenMatches) {
    noStore(response);
    return response.status(403).json({ message: "Requête refusée." });
  }
  return next();
}

const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 5,
  standardHeaders: "draft-8",
  legacyHeaders: false,
  skipSuccessfulRequests: true,
  message: { message: "Trop de tentatives. Réessayez dans 15 minutes." },
});

app.get("/api/health", (_request, response) => response.json({ status: "ok", app: "portfolio-ulrich-idohou" }));

app.post("/api/admin/login", requireCsrf, loginLimiter, async (request, response) => {
  noStore(response);
  const config = adminConfig();
  const { username, password } = request.body ?? {};
  if (!config) return response.status(503).json({ message: "Administration indisponible." });
  if (typeof username !== "string" || typeof password !== "string") return response.status(400).json({ message: "Identifiant et mot de passe requis." });

  const passwordMatches = await bcrypt.compare(password, config.passwordHash);
  const submittedUsername = Buffer.from(username);
  const expectedUsername = Buffer.from(config.username);
  const usernameMatches = submittedUsername.length === expectedUsername.length && crypto.timingSafeEqual(submittedUsername, expectedUsername);
  if (!usernameMatches || !passwordMatches) return response.status(401).json({ message: "Identifiant ou mot de passe incorrect." });

  const sessionId = crypto.randomUUID();
  const expiration = Math.floor((Date.now() + sessionDurationMs) / 1000);
  const csrfToken = createCsrfToken();
  const token = jwt.sign({ role: "admin", jti: sessionId }, config.jwtSecret, { algorithm: "HS256", subject: config.username, issuer: "portfolio-admin", audience: "portfolio-admin", expiresIn: Math.floor(sessionDurationMs / 1000) });
  activeSessions.set(sessionId, { expiresAt: expiration, csrfTokenHash: hashCsrfToken(csrfToken) });
  response.cookie(authCookieName, token, { ...cookieOptions(), maxAge: sessionDurationMs });
  response.cookie(csrfCookieName, csrfToken, { ...csrfCookieOptions(), maxAge: sessionDurationMs });
  return response.status(204).end();
});

app.post("/api/admin/logout", requireAdminApi, requireCsrf, (request, response) => {
  activeSessions.delete(request.adminSession.payload.jti);
  noStore(response);
  response.clearCookie(authCookieName, cookieOptions());
  response.clearCookie(csrfCookieName, csrfCookieOptions());
  return response.status(204).end();
});

app.get("/api/admin/overview", requireAdminApi, (_request, response) => {
  noStore(response);
  const completedProjects = projects.filter((project) => project.status === "Terminé").length;
  return response.json({
    stats: { totalProjects: projects.length, completedProjects, inProgressProjects: projects.length - completedProjects },
    projects: projects.map(({ name, status, year, technologies }) => ({ name, status, year, technologies })),
  });
});

function sendAdminLogin(request, response) {
  if (getSession(request)) return response.redirect(302, "/admin");
  noStore(response);
  response.cookie(csrfCookieName, createCsrfToken(), csrfCookieOptions());
  return response.sendFile(adminLoginPath);
}

function sendAdminDashboard(_request, response) {
  noStore(response);
  return response.sendFile(adminPath);
}

// Ces routes précèdent express.static : l'HTML du dashboard n'est jamais servi
// sans que la garde serveur ait validé la session.
app.get(["/admin/login", "/admin/login/", "/admin/login/index.html"], sendAdminLogin);
app.get(["/admin", "/admin/", "/admin/index.html"], requireAdminPage, sendAdminDashboard);
app.use("/admin", requireAdminPage, (_request, response) => response.status(404).send("Page introuvable"));

app.use(express.static(distPath, { index: false, maxAge: "1y" }));

app.use((request, response) => {
  if (path.extname(request.url)) response.status(404).send("Fichier non trouvé");
  else response.sendFile(path.join(distPath, "index.html"));
});

// Ne jamais laisser le gestionnaire d'erreurs par défaut exposer une pile Node.
app.use((error, request, response, next) => {
  if (response.headersSent) return next(error);
  noStore(response);
  const status = error?.type === "entity.parse.failed" ? 400 : 500;
  if (request.path.startsWith("/api/")) return response.status(status).json({ message: status === 400 ? "Requête invalide." : "Erreur interne." });
  return response.status(status).send(status === 400 ? "Requête invalide." : "Erreur interne.");
});

setInterval(() => {
  const now = Date.now();
  for (const [sessionId, session] of activeSessions) {
    if (session.expiresAt * 1000 <= now) activeSessions.delete(sessionId);
  }
}, 15 * 60 * 1000).unref();

app.listen(port, () => {
  console.log(`Portfolio disponible sur http://127.0.0.1:${port}`);
});
