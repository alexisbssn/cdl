# Bâtir ensemble le Coteau-du-Lac de demain

Site web sur l'urbanisme et le développement à Coteau-du-Lac, construit avec Tailwind CSS et Flowbite.

## Structure du projet

- **`src/`** – Fichiers sources HTML (à éditer uniquement ; avec placeholder pour le header)
- **`includes/`** – Composants réutilisables (header)
- **`images/`** – Images et assets
- **`index.html`**, **`plateforme.html`**, **`nouvelles.html`**, **`nouvelles/`** – Fichiers générés par le build (ne pas modifier directement)

## Démarrage

1. Installer les dépendances : `npm install`

2. Développement (Tailwind + watch + serveur local sur http://localhost:3000) :
   ```
   npm run dev
   ```
   Ouvrir soit http://localhost:3000 ou /index.html dans le navigateur. Les fichiers fonctionnent en local (file://) grâce aux chemins relatifs.

3. Build unique (avant déploiement) :
   ```
   npm run build
   ```

## Déploiement

Après `npm run build`, déployer les fichiers générés à la racine :
- `index.html`, `plateforme.html`, `nouvelles.html`
- `nouvelles/` (dossier avec les articles)
- `output.css`, `images/`, favicons, etc.

## Technologies

- [Tailwind CSS](https://tailwindcss.com/)
- [Flowbite](https://flowbite.com/docs/getting-started/introduction/)

## Licence

MIT
