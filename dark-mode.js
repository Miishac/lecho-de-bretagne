(function () {
  "use strict";
  const key = "lecho-theme";
  const apply = dark => {
    document.documentElement.classList.toggle("dark", dark);
    document.querySelectorAll("[data-theme]").forEach(button => {
      button.textContent = dark ? "☀️ Clair" : "🌙 Sombre";
      button.setAttribute("aria-pressed", String(dark));
    });
  };
  apply(localStorage.getItem(key) === "dark");
  document.addEventListener("click", event => {
    if (!event.target.closest("[data-theme]")) return;
    const dark = !document.documentElement.classList.contains("dark");
    localStorage.setItem(key, dark ? "dark" : "light");
    apply(dark);
  });
}());
