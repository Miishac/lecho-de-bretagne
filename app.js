(function () {
  "use strict";
  const months = ["janvier", "février", "mars", "avril", "mai", "juin", "juillet", "août", "septembre", "octobre", "novembre", "décembre"];
  const escape = value => String(value).replace(/[&<>"']/g, character => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#039;" }[character]));
  const articleLink = article => `article.html?id=${encodeURIComponent(article.id)}`;
  function initDate() {
    const date = new Date();
    const label = `${date.getDate()}${date.getDate() === 1 ? "er" : ""} ${months[date.getMonth()]} 1474`;
    document.querySelectorAll("[data-rp-date]").forEach(element => { element.textContent = label; });
  }
  function initLeaves() {
    const container = document.getElementById("leaves");
    if (!container || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    for (let index = 0; index < 16; index += 1) {
      const leaf = document.createElement("span");
      leaf.className = "leaf";
      leaf.textContent = ["🍂", "🍁", "🍃"][index % 3];
      leaf.style.left = `${Math.random() * 100}vw`;
      leaf.style.animationDuration = `${7 + Math.random() * 8}s`;
      leaf.style.animationDelay = `${-Math.random() * 10}s`;
      leaf.style.fontSize = `${12 + Math.random() * 14}px`;
      container.appendChild(leaf);
    }
  }
  const card = article => `<article class="card"><div class="label">${escape(article.category || "Article")}</div><div class="meta">${escape(article.date_display || "")} · ${escape(article.author || "")}</div><h3>${escape(article.title || "")}</h3><p>${escape(article.excerpt || "")}</p><a href="${articleLink(article)}">Lire l’article →</a></article>`;
  const byDateDesc = (a, b) => String(b.date || "").localeCompare(String(a.date || ""));
  async function renderArticles() {
    const container = document.getElementById("article-list");
    const view = document.getElementById("article-view");
    const featured = document.getElementById("featured-article");
    const recent = document.getElementById("recent-list");
    const breadcrumbs = document.getElementById("breadcrumbs");
    if (!container && !view && !featured && !recent) return;
    let articles;
    try {
      const response = await fetch("articles.json");
      if (!response.ok) throw new Error("Catalogue indisponible");
      articles = await response.json();
    } catch {
      if (container) container.textContent = "Les articles ne peuvent pas être chargés pour le moment.";
      if (view || featured) (view || featured).textContent = "Cet article ne peut pas être chargé pour le moment.";
      return;
    }
    const sorted = [...articles].sort(byDateDesc);
    if (featured && sorted[0]) {
      const article = sorted[0];
      featured.innerHTML = `<div><div class="label">À la Une</div><h2>${escape(article.title)}</h2><p class="meta">${escape(article.date_display || "")} · ${escape(article.author || "")}</p><p class="chapo">${escape(article.excerpt || "")}</p><p><a class="button" href="${articleLink(article)}">Lire l’article</a> <a class="button button-secondary" href="Carte.html">Explorer la carte</a></p></div>${article.image ? `<img src="${escape(article.image)}" alt="${escape(article.title)}">` : ""}`;
    }
    if (recent) {
      const list = (featured ? sorted.slice(1) : sorted).slice(0, 3);
      recent.innerHTML = list.length ? list.map(card).join("") : "<p>Aucun autre article pour le moment.</p>";
    }
    if (container) {
      const paint = list => { container.innerHTML = list.map(card).join(""); };
      paint(articles);
      const search = document.getElementById("search");
      if (search) search.addEventListener("input", () => {
        const query = search.value.trim().toLocaleLowerCase();
        paint(articles.filter(article => [article.title, article.author, article.category, article.location, article.excerpt].join(" ").toLocaleLowerCase().includes(query)));
      });
    }
    if (view) {
      const id = new URLSearchParams(location.search).get("id");
      const article = articles.find(item => item.id === id) || (id ? null : articles[0]);
      if (!article) {
        location.replace("404.html");
        return;
      }
      if (breadcrumbs) breadcrumbs.innerHTML = `<a href="index.html">Accueil</a> <span aria-hidden="true">›</span> <a href="articles.html">Articles</a> <span aria-hidden="true">›</span> <span aria-current="page">${escape(article.title || "")}</span>`;
      view.innerHTML = `<article class="paper article"><div class="label">${escape(article.category || "Article")}</div><div class="meta">${escape(article.date_display || "")} · Par ${escape(article.author || "")}${article.location ? ` · ${escape(article.location)}` : ""}</div><h2>${escape(article.title)}</h2><p class="chapo">${escape(article.excerpt || "")}</p>${article.image ? `<img src="${escape(article.image)}" alt="${escape(article.title)}">` : ""}${(article.sections || []).map(section => `${section.title ? `<h3>${escape(section.title)}</h3>` : ""}${(section.paragraphs || []).map(paragraph => `<p>${escape(paragraph)}</p>`).join("")}`).join("")}<p class="signature"><em>${escape(article.author || "")}</em></p></article>`;
    }
  }
  function initMapFullscreen() {
    document.querySelector("[data-map-fullscreen]")?.addEventListener("click", () => document.querySelector(".map iframe")?.requestFullscreen());
  }
  document.addEventListener("DOMContentLoaded", () => { initDate(); initLeaves(); initMapFullscreen(); renderArticles(); });
}());
