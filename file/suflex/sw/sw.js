// downloads the site offline
var cacheName = "suflex-offline";
var files = [
  "/file/suflex", // index
  "meta.json",
  "asset/app.js",
  "asset/chkvs.js",
  "sw/reg.js",
  "sw/sw.js"
];



self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(cacheName).then((cache) => {
      return cache.addAll(files);
    })
  );
});

self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      if (response) {
        return response;
      }

      return fetch(event.request).then((response) => {
        if (!response || response.status !== 200 || response.type !== "basic") {
          return response;
        }
        const clonedResponse = response.clone();
        caches.open(cacheName).then((cache) => {
          cache.put(event.request, clonedResponse);
        });
        return response;
      });
    })
  );
});


self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((name) => {
          if (name !== cacheName) {
            return caches.delete(name);
          }
        })
      );
    })
  );
});