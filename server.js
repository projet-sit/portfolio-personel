import express from "express";
import { existsSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const app = express();
const port = process.env.PORT || 8085;
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const distPath = path.join(__dirname, "dist");

// Le serveur ne doit démarrer qu'avec les fichiers générés par `npm run build`.
if (!existsSync(distPath)) {
  throw new Error("Le dossier dist est introuvable. Exécutez `npm run build` avant `npm start`.");
}

app.disable("x-powered-by");
app.use(express.json({ limit: "16kb" }));

function escapeHtml(value) {
  return value.replace(/[&<>"']/g, (character) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;",
  })[character]);
}

app.post("/api/quote", async (request, response) => {
  const { name, email, company, budget = "Non précisé", deadline = "Non précisée", details } = request.body ?? {};
  const fields = [name, email, company, budget, deadline, details];

  if (fields.some((value) => typeof value !== "string") || !name.trim() || !company.trim() || !details.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
    return response.status(400).json({ error: "Vérifiez les champs obligatoires et l’adresse e-mail." });
  }
  if (fields.some((value) => value.length > 5000)) {
    return response.status(400).json({ error: "Votre demande est trop longue. Réduisez le contenu et réessayez." });
  }

  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.RESEND_FROM_EMAIL;
  const to = process.env.QUOTE_TO_EMAIL || "ulrichidohou5@gmail.com";
  if (!apiKey || !from) {
    console.error("RESEND_API_KEY et RESEND_FROM_EMAIL doivent être configurés pour recevoir les demandes de devis.");
    return response.status(503).json({ error: "L’envoi des demandes est momentanément indisponible. Réessayez plus tard ou contactez-moi par e-mail." });
  }

  const text = [
    "Nouvelle demande de devis",
    `Nom : ${name.trim()}`,
    `E-mail : ${email.trim()}`,
    `Entreprise ou projet : ${company.trim()}`,
    `Budget : ${budget.trim() || "Non précisé"}`,
    `Échéance : ${deadline.trim() || "Non précisée"}`,
    "",
    "Description du besoin :",
    details.trim(),
  ].join("\n");
  const html = `<h2>Nouvelle demande de devis</h2><p><strong>Nom :</strong> ${escapeHtml(name.trim())}</p><p><strong>E-mail :</strong> ${escapeHtml(email.trim())}</p><p><strong>Entreprise ou projet :</strong> ${escapeHtml(company.trim())}</p><p><strong>Budget :</strong> ${escapeHtml(budget.trim() || "Non précisé")}</p><p><strong>Échéance :</strong> ${escapeHtml(deadline.trim() || "Non précisée")}</p><h3>Description du besoin</h3><p>${escapeHtml(details.trim()).replace(/\n/g, "<br>")}</p>`;

  try {
    const mailResponse = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from,
        to: [to],
        reply_to: email.trim(),
        subject: `Demande de devis — ${name.trim()} (${company.trim()})`,
        text,
        html,
      }),
      signal: AbortSignal.timeout(10000),
    });

    if (!mailResponse.ok) {
      const reason = await mailResponse.text();
      console.error("Resend a refusé la demande de devis :", mailResponse.status, reason);
      return response.status(502).json({ error: "L’e-mail n’a pas pu être envoyé. Réessayez dans un instant." });
    }

    return response.json({ ok: true });
  } catch (error) {
    console.error("Échec de l’envoi de la demande de devis :", error);
    return response.status(502).json({ error: "L’e-mail n’a pas pu être envoyé. Réessayez dans un instant." });
  }
});

// Sert les fichiers générés par Vite après `npm run build`.
app.use(
  express.static(distPath, {
    index: false,
    maxAge: "1y",
  }),
);

// Petite route utile pour vérifier que le serveur Node fonctionne.
app.get("/api/health", (_request, response) => {
  response.json({
    status: "ok",
    app: "portfolio-ulrich-idohou",
  });
});

// Fallback SPA : toutes les routes non trouvées affichent le portfolio React.
app.use((request, response) => {
  if (path.extname(request.url)) {
    response.status(404).send("Fichier non trouvé");
  } else {
    response.sendFile(path.join(distPath, "index.html"));
  }
});

app.listen(port, () => {
  console.log(`Portfolio disponible sur http://127.0.0.1:${port}`);
});
