const CACHE_NAME = "qr-app-cache-v3"; // Đổi phiên bản để ép trình duyệt cập nhật cache
const urlsToCache = [
  "./",
  "./index.html",
  "./style.css",
  "./icon.png",
  "./ewm.gif",
  "./true.png",
  "./jquery-1.8.0.min.js"
];

// Cài đặt và cache tài nguyên
self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache =>
      Promise.all(
        urlsToCache.map(url =>
          cache.add(url).catch(err => {
            console.error("❌ LỖI cache:", url, err);
          })
        )
      )
    )
  );
});

// Xử lý fetch
self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request).then(response => response || fetch(event.request))
  );
});

// Xóa cache cũ khi kích hoạt service worker mới
self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(cacheNames =>
      Promise.all(
        cacheNames
          .filter(name => name !== CACHE_NAME)
          .map(name => caches.delete(name))
      )
    )
  );
});
