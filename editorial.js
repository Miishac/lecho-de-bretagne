/* L'Écho V2 — couche éditoriale commune */
(function(){
  const KEY='lecho-theme';
  const root=document.documentElement;

  function theme(){
    const t=localStorage.getItem(KEY)||'light';
    root.dataset.theme=t;
    if(document.body) document.body.classList.toggle('dark-mode',t==='dark');
  }

  function initTheme(){
    theme();
    document.addEventListener('click',function(e){
      const b=e.target.closest('[data-theme-toggle],#theme-toggle,.theme-toggle');
      if(!b)return;
      localStorage.setItem(KEY,(localStorage.getItem(KEY)||'light')==='dark'?'light':'dark');
      theme();
    });
  }

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
      cards.forEach(c=>c.hidden=q && !(c.innerText||'').toLowerCase().includes(q));
    });
  }

  document.addEventListener('DOMContentLoaded',()=>{
    initTheme(); initReadTime(); initSearch();
  });
})();
