// ========================
// Disqus Comments Setup
// ========================
// À ajouter dans chaque article après </article> :
/*
<div id="disqus_thread"></div>
<script>
  var disqus_config = function () {
    this.page.url = window.location.href;
    this.page.identifier = 'article-1';
  };
  (function() {
    var d = document, s = d.createElement('script');
    s.src = 'https://VOTRE_SHORTNAME.disqus.com/embed.js';
    s.setAttribute('data-timestamp', +new Date());
    (d.head || d.body).appendChild(s);
  })();
</script>
<noscript>Veuillez activer JavaScript pour voir les commentaires.</noscript>
*/

// Alternative légère : système de réactions simple (déjà implémenté dans script.js)
