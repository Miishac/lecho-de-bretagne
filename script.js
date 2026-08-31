// ========================
// Script commun du site
// ========================

document.addEventListener("DOMContentLoaded", function () {
  // Initialiser la date RP
  initDateRP();
});

/**
 * Initialise la date RP (jour du mois + mois actuel + année 1474)
 */
function initDateRP() {
  const mois = [
    "janvier", "février", "mars", "avril", "mai", "juin",
    "juillet", "août", "septembre", "octobre", "novembre", "décembre"
  ];

  const aujourdHui = new Date();
  const jour = aujourdHui.getDate();
  const moisActuel = mois[aujourdHui.getMonth()];
  const anneeRP = 1474;

  const dateTexte = `${jour} ${moisActuel} ${anneeRP}`;

  document.querySelectorAll(".date-rp").forEach(function (element) {
    element.textContent = dateTexte;
  });
}

/**
 * Active le plein écran sur une iframe (carte)
 */
function pleinEcran(iframeId = "carteRR") {
  const carte = document.getElementById(iframeId);

  if (!carte) return;

  if (carte.requestFullscreen) {
    carte.requestFullscreen();
  } else if (carte.webkitRequestFullscreen) {
    carte.webkitRequestFullscreen();
  }
}

/**
 * Initialise la recherche simple dans les articles
 * À appeler dans les pages Archives
 */
function initSearch(containerId = "articles-list") {
  const searchInput = document.getElementById("search-input");
  const container = document.getElementById(containerId);
  
  if (!searchInput || !container) return;

  searchInput.addEventListener("input", function() {
    const query = this.value.toLowerCase();
    const articles = container.querySelectorAll(".article-item");
    
    articles.forEach(article => {
      const text = article.textContent.toLowerCase();
      article.style.display = text.includes(query) ? "block" : "none";
    });
  });
}

/**
 * Filtre les articles par type, date, ou royaume
 */
function filterArticles(filterType, filterValue) {
  const articles = document.querySelectorAll(".article-item");
  
  articles.forEach(article => {
    let shouldShow = true;
    
    if (filterType === "type") {
      shouldShow = article.dataset.type === filterValue || filterValue === "all";
    } else if (filterType === "royaume") {
      shouldShow = article.dataset.royaume === filterValue || filterValue === "all";
    }
    
    article.style.display = shouldShow ? "block" : "none";
  });
}

/**
 * Génère un flux RSS simple (JSON pour GitHub Pages)
 */
function generateRSSFeed(articles) {
  const feed = {
    version: "1.0",
    title: "L'Écho de Bretagne et Lorraine",
    link: window.location.origin,
    description: "Journal libre et indépendant des Royaumes Renaissants",
    lastBuildDate: new Date().toISOString(),
    items: articles.map(article => ({
      title: article.title,
      link: article.link,
      description: article.excerpt,
      pubDate: article.date,
      author: article.author,
      category: article.type
    }))
  };
  
  return feed;
}

/**
 * Système de notation/réaction simple
 */
function initReactions() {
  const reactions = document.querySelectorAll(".reaction-btn");
  
  reactions.forEach(btn => {
    btn.addEventListener("click", function() {
      const type = this.dataset.reaction;
      const count = this.querySelector(".reaction-count");
      let current = parseInt(count.textContent) || 0;
      
      // Toggle: si déjà cliqué, diminuer sinon augmenter
      if (this.classList.contains("active")) {
        current--;
        this.classList.remove("active");
      } else {
        current++;
        this.classList.add("active");
      }
      
      count.textContent = current;
      
      // Sauvegarder en localStorage
      const articleId = this.closest(".article").dataset.articleId;
      localStorage.setItem(`reaction-${articleId}-${type}`, current);
    });
  });
}

/**
 * Charge les réactions depuis localStorage
 */
function loadReactions() {
  const articles = document.querySelectorAll(".article[data-article-id]");
  
  articles.forEach(article => {
    const articleId = article.dataset.articleId;
    const reactions = article.querySelectorAll(".reaction-btn");
    
    reactions.forEach(btn => {
      const type = btn.dataset.reaction;
      const saved = localStorage.getItem(`reaction-${articleId}-${type}`);
      
      if (saved) {
        btn.querySelector(".reaction-count").textContent = saved;
      }
    });
  });
}

/**
 * Enregistre le Service Worker au chargement
 */
function registerServiceWorker() {
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
      // Chemin relatif pour GitHub Pages
      const swPath = './service-worker.js';
      
      navigator.serviceWorker.register(swPath)
        .then(function(registration) {
          console.log('✓ Service Worker enregistré:', registration.scope);
          return registration.update();
        })
        .catch(function(err) {
          console.log('Service Worker erreur:', err);
        });
    });
  }
}

// Enregistrer le Service Worker au chargement de la page
registerServiceWorker();
