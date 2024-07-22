const cache = "suflex:cached:v1";
const cacheFiles = [
  "/suflex", 
  "index.html",
  "assets/index.js",
  "assets/index.css",
  "icon512.png"
];


self.addEventListener("install", e => {
  e.waitUntil(
    caches.open(cache).then(c => c.addAll(cacheFiles))
  );
});

self.addEventListener("fetch", e => {
  e.respondWith( caches.match(e.request).then(async res => {
    if (res) return res;
    let req = await fetch(e.request);
    (await caches.open(cache)).put(e.request, req.clone());
    return req;
  }) );
});