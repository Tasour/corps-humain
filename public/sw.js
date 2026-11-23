/* CORPS — service worker
 * Cache l'app shell et les assets pour un démarrage hors ligne.
 * Incrémenter CACHE_VERSION à chaque déploiement majeur.
 */
const CACHE_VERSION = "corps-v46";
const BUILD = "__BUILD__";
const SHELL = [
  "./",
  "./index.html",
  "./manifest.webmanifest",
  "./favicon.svg",
  "./logo.svg",
  "./icons/icon-192.png",
  "./icons/icon-512.png",
  "./icons/icon-maskable-512.png",
  "./icons/apple-touch-icon.png",
];

/* Petites données uniquement. Les buffers de l'ancien atlas (models/v2/*)
 * et les GLB ne sont plus pré-cachés : ils sont chargés à la demande et leurs
 * URL sont versionnées par le BUILD_ID, donc jamais périmées dans le cache. */
const DATA = [
  "./docs/models/catalog.json",
  /* Le modèle par défaut est pré-caché : sans lui, un rechargement hors ligne
   * afficherait une erreur. L'autre sexe est mis en cache à la demande. */
  `./docs/models/corps-female-opt.glb?v=${BUILD}`,
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    (async () => {
      const cache = await caches.open(CACHE_VERSION);
      await cache.addAll(SHELL);
      /* Pré-cache les assets hachés référencés par index.html. */
      try {
        const assets = new Set();
        for (const page of ["./index.html"]) {
          const response = await fetch(page, { cache: "reload" });
          const html = await response.text();
          for (const match of html.matchAll(/(?:src|href)="(\.\/assets\/[^"]+)"/g)) {
            assets.add(match[1]);
          }
        }
        /* Le module WASM est référencé depuis le JS, pas depuis le HTML :
           on le découvre en scannant les scripts precachés. */
        for (const asset of [...assets]) {
          if (!asset.endsWith(".js")) continue;
          try {
            const source = await (await fetch(asset)).text();
            for (const match of source.matchAll(/(corps_core_bg-[^"']+\.wasm)/g)) {
              assets.add(`./assets/${match[1]}`);
            }
          } catch { /* le fichier sera mis en cache à la volée */ }
        }
        await Promise.all([...assets].map((asset) => cache.add(asset).catch(() => {})));
      } catch {
        /* le shell reste utilisable, les assets seront mis en cache à la volée */
      }
      await Promise.all(DATA.map((item) => cache.add(item).catch(() => {})));
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

  /* Petits fichiers de données : réseau d'abord pour ne jamais servir un
   * catalogue périmé, cache en secours hors ligne. */
  if (url.pathname.endsWith(".json") || url.pathname.endsWith(".webmanifest")) {
    event.respondWith(
      fetch(request)
        .then((response) => {
          if (response.ok && response.type === "basic") {
            const copy = response.clone();
            caches.open(CACHE_VERSION).then((cache) => cache.put(request, copy));
          }
          return response;
        })
        .catch(() => caches.match(request)),
    );
    return;
  }

  /* GLB versionnés (?v=BUILD_ID) et assets hachés : cache d'abord. */
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
