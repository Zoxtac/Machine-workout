const CACHE_NAME = 'machine-workout-v1';
const urlsToCache = [
    './',
    './index.html',
    './icon.png',
    'https://cdn.tailwindcss.com',
    'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css',
    'https://cdn.jsdelivr.net/npm/chart.js'
];

// Installation du Service Worker et mise en cache des fichiers
self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => {
                return cache.addAll(urlsToCache);
            })
    );
});

// Interception des requêtes pour servir le cache en mode hors-ligne
self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request)
            .then(response => {
                // Retourne le fichier du cache s'il existe, sinon va le chercher sur le réseau
                return response || fetch(event.request);
            })
    );
});