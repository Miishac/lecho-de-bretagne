// ========================
// Goat Counter Analytics
// ========================
// À ajouter dans le <head> de chaque page :
// <script data-goatcounter="https://YOURSITE.goatcounter.com/count" async src="//gc.zgo.at/count.js"></script>

// Configuration Goat Counter (privacy-first, pas de cookies)
window.goatcounter = {
  // URL du dashboard Goat Counter (remplacer YOURSITE)
  endpoint: 'https://YOURSITE.goatcounter.com/count',
  // Ignorer certaines pages
  ignore_prefixes: ['/admin', '/.git'],
  // Ignorer les bots
  ignore_query: false,
  // Pas de localStorage requis
  store_console: false
};

// Alternative simple : insérer le snippet Goat Counter en haut de <body>
/*
<script data-goatcounter="https://YOURSITE.goatcounter.com/count"
        async src="//gc.zgo.at/count.js"></script>
*/
