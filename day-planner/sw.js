const CACHE_NAME = "day-planner-v2"; // bumped so the sync-enabled shell replaces any previously cached copy
const SHELL_FILES = [
  "/day-planner/",
  "/day-planner/index.html",
  "/day-planner/manifest.json",
  "/day-planner/icons/icon-192.png",
  "/day-planner/icons/icon-512.png"
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(SHELL_FILES))
  );
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((names) =>
      Promise.all(
        names.filter((n) => n !== CACHE_NAME).map((n) => caches.delete(n))
      )
    )
  );
  self.clients.claim();
});

// Cache-first for the app shell, falling back to network — and updating
// the cache in the background when the network succeeds, so the next
// launch picks up new deploys without needing a manual clear.
//
// Only the planner's own same-origin GET requests are handled here.
// Cross-origin calls (the sync engine talking to api.github.com) are
// deliberately left alone so they always hit the network directly —
// caching them would risk serving stale synced data.
self.addEventListener("fetch", (event) => {
  if (event.request.method !== "GET") return;
  if (new URL(event.request.url).origin !== self.location.origin) return;
  event.respondWith(
    caches.match(event.request).then((cached) => {
      const networkFetch = fetch(event.request)
        .then((response) => {
          if (response && response.status === 200) {
            const clone = response.clone();
            caches.open(CACHE_NAME).then((cache) => cache.put(event.request, clone));
          }
          return response;
        })
        .catch(() => cached);
      return cached || networkFetch;
    })
  );
});
