const CACHE_NAME = "qr-app-cache-v1";
const urlsToCache = [
  "/",
  "/index.html",
  "/style.css",
  "/icon.png",
  "/ewm.gif",
  "/true.png",
  "/jquery-1.8.0.min.js"
];

self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(urlsToCache);
    })
  );
});

self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});
