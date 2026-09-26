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

## Administration privée

L'administration est servie par Express, séparément du portfolio public, à `/admin/login`. La page ne figure ni dans la navigation ni dans le sitemap. Toutes les routes `/admin` et `/api/admin/*` vérifient le cookie de session côté serveur ; une requête non authentifiée vers `/admin` est redirigée avant l'envoi du HTML.

Créez un `.env` local à partir de `.env.example` (ce fichier est déjà ignoré par Git), puis renseignez `ADMIN_USERNAME`, `ADMIN_PASSWORD_HASH` et un `JWT_SECRET` aléatoire d'au moins 32 caractères. Ne placez jamais un secret dans une variable préfixée par `VITE_` : ces valeurs sont incluses dans le bundle public. Pour générer le hash bcrypt du mot de passe :

```bash
npm run hash-admin-password
```

Sur Render, créez les trois variables dans les secrets du service plutôt que d'envoyer un fichier `.env`. Le dashboard actuel présente les statistiques et la liste des projets publiés ; il est prêt à accueillir des fonctions de gestion supplémentaires côté API.

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
| `npm run hash-admin-password` | Génère un hash bcrypt pour `ADMIN_PASSWORD_HASH`. |
