import { clientsClaim } from "workbox-core";
// import { ExpirationPlugin } from "workbox-expiration";
import { precacheAndRoute, createHandlerBoundToURL } from "workbox-precaching";
// import { registerRoute } from "workbox-routing";
// import { CacheFirst, StaleWhileRevalidate } from "workbox-strategies";

// clientsClaim();
// 
precacheAndRoute(self.__WB_MANIFEST);

const _Cache = "v1";


self.addEventListener("install", function (event) {
  event.waitUntil(
    caches.open(_Cache).then(function (cache) {
      return cache.addAll([
        "/public/logo192.png",
        "/public/logo512.png",
        "/public/index.html",
        "/src/index.css",
        "/src/index.js",
        "/offline.html",
      ]);
    })
  );
});


self.addEventListener("fetch", (event) => {
  console.log("Fetch event for ", event.request.url);
  event.respondWith(
    caches
      .match(event.request)
      .then((response) => {
        if (response) {
          console.log("Found ", event.request.url, " in cache");
          return response;
        }
        console.log("Network request for ", event.request.url);
        return fetch(event.request).then((response) => {
          return caches.open(_Cache).then((cache) => {
            cache.put(event.request.url, response.clone());
            return response;
          });
        });
      })
      .catch((error) => {})
  );
});

self.addEventListener("activate", (event) => {
  console.log("Activating new service worker...");

  const cacheAllowlist = [_Cache];

  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheAllowlist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});





          