/* L'Écho — couche éditoriale commune */
(function(){
  function initReadTime(){
    document.querySelectorAll('[data-reading-time]').forEach(el=>{
      const target=document.querySelector(el.dataset.readingTime);
      if(!target)return;
      const words=(target.innerText||'').trim().split(/\s+/).filter(Boolean).length;
      el.textContent=Math.max(1,Math.ceil(words/200))+' min de lecture';
    });
  }

  function initSearch(){
    const input=document.querySelector('[data-site-search]');
    if(!input)return;
    const cards=[...document.querySelectorAll('[data-search-item]')];
    input.addEventListener('input',()=>{
      const q=input.value.trim().toLowerCase();
      cards.forEach(c=>c.hidden=!!q && !(c.innerText||'').toLowerCase().includes(q));
    });
  }

  document.addEventListener('DOMContentLoaded',()=>{
    initReadTime();
    initSearch();
  });
})();
