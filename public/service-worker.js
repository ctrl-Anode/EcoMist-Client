// Cache names with dynamic versioning
const CACHE_VERSION = 'v2';
const CACHE_NAME = `aerotech-cache-${CACHE_VERSION}`;
const urlsToCache = [
  '/',
  '/index.html',
  '/style.css',
  '/main.js',
  '/icons/aerotech-185x192.png',
  '/icons/aerotech-493x512.png',
  '/offline.html' // Add offline fallback page
];

// Install event
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      console.log('Opened cache');
      return cache.addAll(urlsToCache);
    }).catch(err => console.error('Cache open failed:', err))
  );
});

// Fetch event with dynamic caching and offline fallback
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request).then(fetchResponse => {
        return caches.open(CACHE_NAME).then(cache => {
          cache.put(event.request, fetchResponse.clone()); // Dynamically cache new requests
          return fetchResponse;
        });
      });
    }).catch(() => {
      return caches.match('/offline.html'); // Serve offline fallback
    })
  );
});

// Activate event with cache busting
self.addEventListener('activate', event => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (!cacheWhitelist.includes(cacheName)) {
            console.log('Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});