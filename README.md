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

## Variables d'environnement et sécurité

Le portfolio ne requiert actuellement aucune variable d'environnement côté navigateur et ne contient aucune clé API. Ne placez jamais un secret dans une variable préfixée par `VITE_` : ces valeurs sont incluses dans le bundle public. Les éventuelles clés serveur doivent être stockées uniquement dans l'environnement de l'hébergeur et consignées dans `.env.example` (jamais dans `.env`).

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
