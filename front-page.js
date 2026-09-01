(function(){
"use strict";
const CATS=["Actualités","Politique","Élections","Événements","Vie locale","Voyages","Chroniques","Annonces"];
const esc=s=>String(s??"").replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;"}[c]));
const url=a=>"article.html?id="+encodeURIComponent(a.id);
const card=a=>`<article class="front-card"><div class="label">${esc(a.category||"Actualités")}</div><div class="meta">${esc(a.date_display||a.date||"")} · ${esc(a.author||"")}</div><h3>${esc(a.title||"")}</h3><p>${esc(a.excerpt||"")}</p><a href="${url(a)}">Lire →</a></article>`;
async function get(){try{const r=await fetch("articles.json",{cache:"no-store"});if(!r.ok)throw 0;const x=await r.json();return Array.isArray(x)?x:(x.articles||[])}catch{return[]}}
document.addEventListener("DOMContentLoaded",async()=>{
 const list=(await get()).slice().sort((a,b)=>String(b.date||"").localeCompare(String(a.date||"")));
 const lead=list[0];
 if(lead){
   document.getElementById("front-title").textContent=lead.title||"";
   document.getElementById("front-meta").textContent=[lead.date_display||lead.date,lead.author,lead.category].filter(Boolean).join(" · ");
   document.getElementById("front-excerpt").textContent=lead.excerpt||"";
   document.getElementById("front-link").href=url(lead);
   if(lead.image) document.getElementById("front-image").innerHTML=`<img class="front-image" src="${esc(lead.image)}" alt="${esc(lead.title)}">`;
 }
 document.getElementById("front-columns").innerHTML=list.slice(1,5).map(card).join("")||'<p class="meta">Les prochaines nouvelles paraîtront ici.</p>';
 document.getElementById("recent-list").innerHTML=list.slice(1,4).map(card).join("")||'<p class="meta">Aucun autre article pour le moment.</p>';
 document.getElementById("front-categories").innerHTML=CATS.map(c=>`<a class="front-cat" href="articles.html?category=${encodeURIComponent(c)}"><strong>${esc(c)}</strong><span>Voir les articles →</span></a>`).join("");
});
})();