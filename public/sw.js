// public/sw.js
self.addEventListener("install", (event) => {
  // Activate immediately after install
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  // Take control of open pages
  event.waitUntil(self.clients.claim());
});

// You can add caching logic later if you want offline support.
