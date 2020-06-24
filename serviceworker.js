var cacheName = 'gih-cache-v2';
var CACHED_URLS = [
  '/',
  '/index.html',
  '/css/style.css',
  '/js/main.js'
];

self.addEventListener('install', function(e) {
  event.waitUntil(
    caches.open(CACHE_NAME).then(function(cache) {
      return cache.addAll(CACHED_URLS);
    })
  );
});

/* Serve cached content when offline */
self.addEventListener("fetch", function(event) {
  var requestURL = new URL(event.request.url);
  if (requestURL.pathname === "/" || requestURL.pathname === "/index.html") {
    event.respondWith(
      caches.open(CACHE_NAME).then(function(cache) {
        return cache.match("/index.html").then(function(cachedResponse) {
          var fetchPromise =
            fetch("/index.html")
            .then(function(networkResponse) {
              cache.put("/index.html", networkResponse.clone());
              return networkResponse;
            });
          return cachedResponse || fetchPromise;
        });
      })
    );
  } else if (
    CACHED_URLS.includes(requestURL.href) ||
    CACHED_URLS.includes(requestURL.pathname)
  ) {
    event.respondWith(
      caches.open(CACHE_NAME).then(function(cache) {
        return cache.match(event.request).then(function(response) {
          return response || fetch(event.request);
        });
      })
    );
  }
});