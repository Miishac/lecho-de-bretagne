(function () {
  function initTheme() {
    const storageKey = 'dark-mode';
    const toggles = document.querySelectorAll('#theme-toggle, .theme-toggle');
    const themeMeta = document.querySelector('meta[name="theme-color"]');

    let isDark = false;
    try {
      isDark = localStorage.getItem(storageKey) === 'true';
    } catch (error) {
      isDark = false;
    }

    function applyTheme(nextIsDark) {
      document.body.classList.toggle('dark-mode', nextIsDark);

      toggles.forEach(function (toggle) {
        toggle.textContent = nextIsDark ? '☀️ Clair' : '🌙 Sombre';
        toggle.setAttribute('aria-pressed', String(nextIsDark));
        toggle.setAttribute('aria-label', nextIsDark ? 'Activer le mode clair' : 'Activer le mode sombre');
      });

      if (themeMeta) {
        themeMeta.setAttribute('content', nextIsDark ? '#1a1a1a' : '#762c27');
      }
    }

    applyTheme(isDark);

    toggles.forEach(function (toggle) {
      toggle.addEventListener('click', function () {
        isDark = !isDark;
        applyTheme(isDark);

        try {
          localStorage.setItem(storageKey, String(isDark));
        } catch (error) {
          // Le thème continue de fonctionner même si le stockage local est indisponible.
        }
      });
    });
  }

  if (document.body) {
    initTheme();
  } else {
    document.addEventListener('DOMContentLoaded', initTheme, { once: true });
  }
})();
