// service-worker.js
const cacheName = 'swatch-time-v1';
const filesToCache = [
  '/swatch/',
  '/swatch/index.html',
  '/swatch/swatch.css',
  '/swatch/swatch.js',
  '/swatch/swatchlogo.jpg',
  '/swatch/apple-touch-icon.png',
  '/swatch/favicon-32x32.png',
  '/swatch/favicon-16x16.png',
  '/swatch/site.webmanifest'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(cacheName)
      .then((cache) => cache.addAll(filesToCache))
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => response || fetch(event.request))
  );
});