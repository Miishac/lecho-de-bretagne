# L'Écho de Bretagne

Journal RP médiéval consacré aux récits, voyages et événements vécus par Mishac.

## Pages

- `index.html` : accueil (article en avant + 3 derniers articles)
- `articles.html` : articles et recherche
- `article.html?id=...` : lecture d’un article (avec fil d’Ariane et retour au catalogue)
- `article-template.html?id=...` : modèle de page article
- `Carte.html` : carte interactive
- `archives.html` : archives unifiées
- `a-propos.html` : à propos du journal (contact Discord)
- `contact.html` : page de contact
- `404.html` : page d’erreur si un article ou une page n’existe pas
- `feed.xml` : flux RSS des articles

## Ajouter un article

Ajoutez ses métadonnées et son texte dans `articles.json`. Les pages Articles, Archives, Accueil et Article lisent ce même catalogue. Les champs disponibles sont : `id`, `title`, `author`, `date`, `date_display`, `category`, `location`, `image`, `excerpt` et `sections`. Pensez aussi à ajouter une entrée dans `feed.xml` et `sitemap.xml`.

`dark-mode.js` est l’unique gestionnaire de thème ; `app.js` gère la date RP, les feuilles, la carte, le catalogue, le fil d’Ariane et les derniers articles.
