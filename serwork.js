const CACHE_NAME = "mi-cache-v1";
const URLS_A_CACHEAR = [
    "index.html",
    "style.css",
    "script.js",
    "manifest.json",
    "favicon.ico",
    "offline.html",
    "multimedia/imagen.jpg"
];

self.addEventListener("install", (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => cache.addAll(URLS_A_CACHEAR))
    );
});

self.addEventListener("activate", (event) => {
    event.waitUntil(
        caches.keys().then(keys => Promise.all(
            keys.map(key => {
                if (key !== CACHE_NAME) return caches.delete(key);
            })
        ))
    );
});

self.addEventListener("fetch", (event) => {
    event.respondWith(
        caches.match(event.request).then(response => {
            return response || fetch(event.request).catch(() => caches.match("offline.html"));
        })
    );
});