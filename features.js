(function(){
"use strict";
const ECHO_CATS=["Toutes","Voyages","Chroniques","Politique","Vie locale","Rencontres","Événements"];
function esc(s){return String(s??"").replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;"}[c]))}
async function data(){try{let r=await fetch("articles.json",{cache:"no-store"});let x=await r.json();return Array.isArray(x)?x:(x.articles||[])}catch(e){return[]}}
function card(a){return `<article class="e-card"><div class="e-kicker">${esc(a.category||"Chroniques")}</div><div class="e-meta">${esc(a.date_display||a.date||"")} · ${esc(a.author||"")}</div><h3>${esc(a.title||"")}</h3><p>${esc(a.excerpt||"")}</p><a class="e-btn" href="article.html?id=${encodeURIComponent(a.id)}">Lire l’article</a></article>`}
function init(list){
 const latest=document.getElementById("une-article");
 if(latest&&list.length){
  const a=list[0];
  latest.innerHTML=`<div class="e-lead">${a.image?`<img src="${esc(a.image)}" alt="${esc(a.title)}">`:""}<div><div class="e-kicker">À la Une · ${esc(a.category||"Chroniques")}</div><div class="e-meta">${esc(a.date_display||a.date||"")} · ${esc(a.author||"")}</div><h2 class="e-title">${esc(a.title)}</h2><p>${esc(a.excerpt||"")}</p><a class="e-btn" href="article.html?id=${encodeURIComponent(a.id)}">Lire l’article →</a></div></div>`;
 }
 const listBox=document.getElementById("articles-v6");const search=document.getElementById("article-search");const cats=document.getElementById("article-categories");if(!listBox)return;
 let selected="Toutes";
 function paint(){const q=(search?.value||"").toLowerCase();const filtered=list.filter(a=>{const text=(a.title+" "+a.author+" "+a.excerpt+" "+a.category).toLowerCase();return(!q||text.includes(q))&&(selected==="Toutes"||a.category===selected)});listBox.innerHTML=filtered.length?filtered.map(card).join(""):'<div class="e-empty">Aucun article ne correspond à votre recherche.</div>'}
 if(cats){cats.innerHTML=ECHO_CATS.map(c=>`<button class="e-cat${c===selected?" active":""}" data-cat="${esc(c)}">${esc(c)}</button>`).join("");cats.addEventListener("click",e=>{const b=e.target.closest("[data-cat]");if(!b)return;selected=b.dataset.cat;cats.querySelectorAll(".e-cat").forEach(x=>x.classList.toggle("active",x===b));paint()})}
 if(search)search.addEventListener("input",paint);paint();
}
document.addEventListener("DOMContentLoaded",async()=>init(await data()));
})();