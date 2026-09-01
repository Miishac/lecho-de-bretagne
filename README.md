# L'Écho de Bretagne

Journal RP médiéval consacré aux récits, voyages et événements vécus par Mishac.

## Pages

- `index.html` : accueil
- `articles.html` : articles et recherche
- `article.html?id=...` : lecture d’un article
- `article-template.html?id=...` : modèle de page article
- `Carte.html` : carte interactive
- `archives.html` : archives unifiées

## Ajouter un article

Ajoutez ses métadonnées et son texte dans `articles.json`. Les pages Articles, Archives et Article lisent ce même catalogue. Les champs disponibles sont : `id`, `title`, `author`, `date`, `date_display`, `category`, `location`, `image`, `excerpt` et `sections`.

`dark-mode.js` est l’unique gestionnaire de thème ; `app.js` gère la date RP, les feuilles, la carte et le catalogue.
