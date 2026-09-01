/* L'Écho — thème unique et stable */
(function () {
  "use strict";
  const KEY = "lecho-theme";

  function apply(dark) {
    document.documentElement.classList.toggle("dark-mode", dark);
    if (document.body) document.body.classList.toggle("dark-mode", dark);
    document.documentElement.dataset.theme = dark ? "dark" : "light";
    document.querySelectorAll("#theme-toggle, .theme-toggle").forEach(function (b) {
      b.textContent = dark ? "☀️ Clair" : "🌙 Sombre";
      b.setAttribute("aria-pressed", dark ? "true" : "false");
      b.setAttribute("title", dark ? "Passer au mode clair" : "Passer au mode sombre");
    });
  }

  function init() {
    apply(localStorage.getItem(KEY) === "dark");
    document.addEventListener("click", function (e) {
      const b = e.target.closest("#theme-toggle, .theme-toggle, [data-theme-toggle]");
      if (!b) return;
      const dark = !document.documentElement.classList.contains("dark-mode");
      localStorage.setItem(KEY, dark ? "dark" : "light");
      apply(dark);
    });
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();
})();
