/* Outils éditoriaux communs */
(function(){
  function initReadTime(){
    document.querySelectorAll('[data-reading-time]').forEach(function(el){
      var target=document.querySelector(el.dataset.readingTime);
      if(!target)return;
      var words=(target.innerText||'').trim().split(/\s+/).filter(Boolean).length;
      el.textContent=Math.max(1,Math.ceil(words/200))+' min de lecture';
    });
  }
  document.addEventListener('DOMContentLoaded',initReadTime);
})();
