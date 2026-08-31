// ========================
// Script commun du site
// ========================

document.addEventListener("DOMContentLoaded", function () {
  // Initialiser la date RP
  initDateRP();
  // Initialiser réactions
  initReactions();
  // Charger réactions sauvegardées
  loadReactions();
  // Initialiser thème sombre
  initTheme();
  // Initialiser recherche globale si présente
  initGlobalSearch();
  // Initialiser scroll to top
  initScrollToTop();
  // Calculer temps de lecture
  calculateReadingTime();
  // Initialiser TOC si présent
  initTableOfContents();
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
 * Initialise le thème sombre partagé par toutes les pages.
 */
function initTheme() {
  const themeToggle = document.getElementById("theme-toggle");
  if (!themeToggle) return;

  const isDark = localStorage.getItem("dark-mode") === "true";
  document.body.classList.toggle("dark-mode", isDark);
  themeToggle.textContent = isDark ? "☀️ Clair" : "🌙 Sombre";

  themeToggle.addEventListener("click", () => {
    const isDarkNow = document.body.classList.toggle("dark-mode");
    localStorage.setItem("dark-mode", isDarkNow);
    themeToggle.textContent = isDarkNow ? "☀️ Clair" : "🌙 Sombre";
  });
}

/**
 * Initialise la recherche globale depuis la page d'accueil.
 */
function initGlobalSearch() {
  const searchInput = document.getElementById("global-search");
  if (!searchInput) return;

  searchInput.addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
      const query = searchInput.value.trim().toLowerCase();
      if (query) {
        window.location.href = `search-advanced.html?search=${encodeURIComponent(query)}`;
      }
    }
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
    } else if (filterType === "auteur") {
      shouldShow = article.dataset.auteur === filterValue || filterValue === "all";
    }
    
    article.style.display = shouldShow ? "block" : "none";
  });
}

/**
 * Système de notation/réaction avancé
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
      const articleId = this.closest(".article")?.dataset.articleId || 
                        this.closest(".paper")?.id || "global";
      localStorage.setItem(`reaction-${articleId}-${type}`, current);
    });
  });
}

/**
 * Charge les réactions depuis localStorage
 */
function loadReactions() {
  const articles = document.querySelectorAll(".article[data-article-id], .paper[id]");
  
  articles.forEach(article => {
    const articleId = article.dataset.articleId || article.id;
    if (!articleId) return;
    
    const reactions = article.querySelectorAll(".reaction-btn");
    
    reactions.forEach(btn => {
      const type = btn.dataset.reaction;
      const saved = localStorage.getItem(`reaction-${articleId}-${type}`);
      
      if (saved) {
        btn.querySelector(".reaction-count").textContent = saved;
        if (parseInt(saved) > 0) {
          btn.classList.add("active");
        }
      }
    });
  });
}

/**
 * Initialise le bouton scroll to top
 */
function initScrollToTop() {
  const scrollBtn = document.getElementById("scroll-to-top");
  
  if (!scrollBtn) {
    // Créer le bouton s'il n'existe pas
    const btn = document.createElement("button");
    btn.id = "scroll-to-top";
    btn.innerHTML = "⬆️";
    btn.style.cssText = `
      position:fixed;
      bottom:30px;
      right:30px;
      width:50px;
      height:50px;
      background:#762c27;
      color:#f6ecd5;
      border:2px solid #51201c;
      border-radius:50%;
      font-size:24px;
      cursor:pointer;
      display:none;
      z-index:1000;
      transition:all 0.3s;
    `;
    document.body.appendChild(btn);
  }
  
  const btn = document.getElementById("scroll-to-top");
  
  window.addEventListener("scroll", () => {
    if (window.pageYOffset > 300) {
      btn.style.display = "block";
    } else {
      btn.style.display = "none";
    }
  });
  
  btn.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  });
}

/**
 * Calcule et affiche le temps de lecture
 */
function calculateReadingTime() {
  const articles = document.querySelectorAll(".article, .article-item");
  const wordsPerMinute = 200;
  
  articles.forEach(article => {
    const text = article.innerText || article.textContent;
    const wordCount = text.trim().split(/\s+/).length;
    const readingTime = Math.ceil(wordCount / wordsPerMinute);
    
    // Insérer avant le premier <p>
    const firstP = article.querySelector("p");
    if (firstP && !article.querySelector(".reading-time")) {
      const readingTimeSpan = document.createElement("span");
      readingTimeSpan.className = "reading-time";
      readingTimeSpan.style.cssText = `
        display:block;
        font-size:13px;
        color:#6f604c;
        font-style:italic;
        margin-bottom:15px;
      `;
      readingTimeSpan.textContent = `⏱️ Temps de lecture: ${readingTime} min`;
      firstP.parentNode.insertBefore(readingTimeSpan, firstP);
    }
  });
}

/**
 * Initialise Table of Contents
 */
function initTableOfContents() {
  const tocContainer = document.getElementById("table-of-contents");
  if (!tocContainer) return;
  
  const headings = document.querySelectorAll(".paper h2, .paper h3, .article h2, .article h3");
  if (headings.length === 0) return;
  
  const ul = document.createElement("ul");
  ul.style.cssText = `
    list-style:none;
    padding:0;
    margin:0;
  `;
  
  headings.forEach((heading, index) => {
    if (!heading.id) {
      heading.id = `heading-${index}`;
    }
    
    const li = document.createElement("li");
    li.style.marginBottom = "8px";
    const level = parseInt(heading.tagName[1]);
    li.style.marginLeft = (level - 2) * 20 + "px";
    
    const link = document.createElement("a");
    link.href = `#${heading.id}`;
    link.textContent = heading.textContent;
    link.style.cssText = `
      color:#762c27;
      text-decoration:none;
      font-size:14px;
    `;
    link.addEventListener("click", (e) => {
      e.preventDefault();
      heading.scrollIntoView({ behavior: "smooth" });
    });
    
    li.appendChild(link);
    ul.appendChild(li);
  });
  
  tocContainer.innerHTML = "<strong>Table des matières</strong>";
  tocContainer.appendChild(ul);
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
 * Enregistre le Service Worker au chargement
 */
function registerServiceWorker() {
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
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

// Enregistrer le Service Worker
registerServiceWorker();
