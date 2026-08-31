// Service Worker - L'Écho de Bretagne et Lorraine
// Permet le fonctionnement hors ligne et met en cache les ressources

const CACHE_NAME = 'echo-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/Bretagne.html',
  '/Lorraine.html',
  '/Archives.html',
  '/Archives-Lorraine.html',
  '/Carte.html',
  '/Carte-Lorraine.html',
  '/Galerie.html',
  '/article-template.html',
  '/style.css',
  '/script.js',
  '/feed.json'
];

// Installation du Service Worker
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Cache ouvert');
        return cache.addAll(urlsToCache);
      })
      .catch(err => {
        console.log('Erreur lors de la mise en cache:', err);
      })
  );
  self.skipWaiting();
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
  self.clients.claim();
});

// Stratégie: Cache first, fallback to network
self.addEventListener('fetch', event => {
  // Ignorer les requêtes non-GET
  if (event.request.method !== 'GET') {
    return;
  }

  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Retourner depuis le cache si disponible
        if (response) {
          return response;
        }

        // Sinon, faire une requête réseau
        return fetch(event.request)
          .then(response => {
            // Vérifier si réponse valide
            if (!response || response.status !== 200 || response.type === 'error') {
              return response;
            }

            // Cloner la réponse avant de la mettre en cache
            const responseToCache = response.clone();
            caches.open(CACHE_NAME)
              .then(cache => {
                cache.put(event.request, responseToCache);
              });

            return response;
          })
          .catch(() => {
            // Si offline et pas en cache, retourner page offline
            return caches.match('/index.html');
          });
      })
  );
});
