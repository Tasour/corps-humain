/* CORPS — service worker
 * Cache l'app shell et les assets pour un démarrage hors ligne.
 * Incrémenter CACHE_VERSION à chaque déploiement majeur.
 */
const CACHE_VERSION = "corps-v4";
const SHELL = [
  "./",
  "./index.html",
  "./manifest.webmanifest",
  "./favicon.svg",
  "./icons/icon-192.png",
  "./icons/icon-512.png",
  "./icons/icon-maskable-512.png",
  "./icons/apple-touch-icon.png",
];

/* Modèles anatomiques BodyParts3D + Z-Anatomy : volumineux, mis en cache
 * séparément pour qu'un échec ne bloque pas l'installation du shell. */
const MODELS = ["./models/anatomy.json", "./models/anatomy.bin.gz"];

self.addEventListener("install", (event) => {
  event.waitUntil(
    (async () => {
      const cache = await caches.open(CACHE_VERSION);
      await cache.addAll(SHELL);
      /* Pré-cache les assets hachés référencés par index.html. */
      try {
        const response = await fetch("./index.html", { cache: "reload" });
        const html = await response.text();
        const assets = [...html.matchAll(/(?:src|href)="(\.\/assets\/[^"]+)"/g)].map((match) => match[1]);
        await Promise.all([...new Set(assets)].map((asset) => cache.add(asset).catch(() => {})));
      } catch {
        /* le shell reste utilisable, les assets seront mis en cache à la volée */
      }
      await Promise.all(MODELS.map((model) => cache.add(model).catch(() => {})));
      await self.skipWaiting();
    })(),
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) => Promise.all(keys.filter((key) => key !== CACHE_VERSION).map((key) => caches.delete(key))))
      .then(() => self.clients.claim()),
  );
});

self.addEventListener("fetch", (event) => {
  const request = event.request;
  if (request.method !== "GET") return;

  const url = new URL(request.url);
  if (url.origin !== self.location.origin) return;

  /* Navigations : réseau d'abord, cache en secours. */
  if (request.mode === "navigate") {
    event.respondWith(
      fetch(request)
        .then((response) => {
          const copy = response.clone();
          caches.open(CACHE_VERSION).then((cache) => cache.put("./index.html", copy));
          return response;
        })
        .catch(async () => {
          const cache = await caches.open(CACHE_VERSION);
          return (await cache.match(request)) || (await cache.match("./index.html")) || (await cache.match("./"));
        }),
    );
    return;
  }

  /* Assets : cache d'abord, puis réseau et mise en cache. */
  event.respondWith(
    caches.match(request).then((cached) => {
      if (cached) return cached;
      return fetch(request).then((response) => {
        if (response.ok && response.type === "basic") {
          const copy = response.clone();
          caches.open(CACHE_VERSION).then((cache) => cache.put(request, copy));
        }
        return response;
      });
    }),
  );
});
