// ========================
// Service Worker - L'Écho
// ========================

const CACHE_NAME = 'lecho-final';
const urlsToCache = [
  './',
  './index.html',
  './Bretagne.html',
  './Lorraine.html',
  './Carte.html',
  './Archives.html',
  './Archives-Lorraine.html',
  './About.html',
  './script.js',
  './journal.css',
  './feed.json',
  './manifest.json',
  './styles-print.css'
];

// Installation du Service Worker
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      console.log('✓ Cache ouvert');
      return cache.addAll(urlsToCache).catch(err => {
        console.log('Erreur lors du cache:', err);
      });
    })
  );
});

// Activation du Service Worker
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName !== CACHE_NAME) {
            console.log('Suppression ancien cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

// Stratégie de fetch
self.addEventListener('fetch', event => {
  const { request } = event;
  const url = new URL(request.url);

  // Ignorer les requêtes externes
  if (url.origin !== location.origin) {
    return;
  }

  // Stratégie NETWORK FIRST pour le contenu HTML
  if (request.mode === 'navigate') {
    event.respondWith(
      fetch(request)
        .then(response => {
          // Cloner la réponse avant de la mettre en cache
          const responseClone = response.clone();
          caches.open(CACHE_NAME).then(cache => {
            cache.put(request, responseClone);
          });
          return response;
        })
        .catch(() => {
          // Retourner la version en cache si offline
          return caches.match(request);
        })
    );
    return;
  }

  // Stratégie CACHE FIRST pour les assets (CSS, JS, images)
  event.respondWith(
    caches.match(request).then(response => {
      if (response) {
        return response;
      }
      return fetch(request).then(response => {
        // Ne pas cacher les réponses non-200
        if (!response || response.status !== 200 || response.type === 'error') {
          return response;
        }
        // Cloner et cacher
        const responseClone = response.clone();
        caches.open(CACHE_NAME).then(cache => {
          cache.put(request, responseClone);
        });
        return response;
      }).catch(() => {
        // Fallback offline
        return new Response('Offline - Contenu non disponible', {
          status: 503,
          statusText: 'Service Unavailable',
          headers: new Headers({
            'Content-Type': 'text/plain'
          })
        });
      });
    })
  );
});
