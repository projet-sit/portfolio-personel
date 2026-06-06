import express from "express";
import path from "node:path";
import { fileURLToPath } from "node:url";

const app = express();
const port = process.env.PORT || 8085;
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const distPath = path.join(__dirname, "dist");

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
// Cela permet de gérer les routes côté client si nécessaire et évite les erreurs 404 brutes.
app.use((request, response) => {
  // On vérifie si la requête ne concerne pas un fichier statique manquant (extension dans l'URL)
  if (path.extname(request.url)) {
    response.status(404).send("Fichier non trouvé");
  } else {
    response.sendFile(path.join(distPath, "index.html"));
  }
});

app.listen(port, () => {
  console.log(`Portfolio disponible sur http://127.0.0.1:${port}`);
});
