# Portfolio d'Ulrich IDOHOU

Portfolio one-page construit avec React, Vite, Tailwind CSS et Express. Il présente les services, compétences, projets et moyens de contact d'Ulrich IDOHOU.

## Prérequis

- Node.js 20 ou supérieur
- npm (le fichier `package-lock.json` doit être conservé pour des installations reproductibles)

## Installation et lancement local

```bash
npm ci
npm run dev
```

Vite affiche alors l'adresse locale de développement. Pour tester exactement le serveur de production :

```bash
npm run build
npm start
```

Le serveur Express écoute `http://127.0.0.1:8085` par défaut. L'hébergeur peut fournir un autre port via la variable d'environnement `PORT`.

## Envoi des demandes de devis

Le formulaire envoie la demande au serveur sans quitter la page. Après confirmation du service d'e-mail, les champs sont vidés et un message de succès s'affiche. En cas d'échec, les champs restent remplis.

L'envoi utilise l'API Resend. Pour l'activer en production, créez une clé API Resend et vérifiez le domaine/adresse d'expédition, puis configurez ces variables dans l'environnement Render :

- `RESEND_API_KEY` : clé secrète de l'API Resend.
- `RESEND_FROM_EMAIL` : adresse d'expédition autorisée, par exemple `Portfolio <devis@votredomaine.com>`.
- `QUOTE_TO_EMAIL` : adresse de réception (par défaut `ulrichidohou5@gmail.com`).

Ne mettez jamais la clé API dans le code client ou dans une variable `VITE_`.

## Variables d'environnement et sécurité

Le portfolio ne requiert aucune variable d'environnement côté navigateur et ne contient aucune clé API dans son code. Ne placez jamais un secret dans une variable préfixée par `VITE_` : ces valeurs sont incluses dans le bundle public. Les clés serveur doivent être stockées uniquement dans l'environnement de l'hébergeur (jamais dans le dépôt).

## Modifier le contenu

- Informations personnelles, navigation, compétences, services et projets : `src/data/portfolio.js`
- Sections : `src/components/`
- Composants réutilisables : `src/components/ui/`
- Référencement : `index.html`, `public/robots.txt` et `public/sitemap.xml`
- Images et CV publics : `public/`

Après toute modification, exécutez `npm run build` pour vérifier le bundle de production. Ajoutez un dépôt valide dans `repository` pour tout projet dont le code doit être rendu accessible.

## Scripts

| Commande | Rôle |
| --- | --- |
| `npm run dev` | Lance Vite en développement sur le réseau local. |
| `npm run build` | Génère le bundle de production dans `dist/`. |
| `npm run preview` | Prévisualise le bundle avec Vite. |
| `npm start` | Sert `dist/` avec Express. |
