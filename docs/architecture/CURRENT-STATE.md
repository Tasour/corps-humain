# État courant — CORPS

Date : 2026-11-21. Mesures produites par `tools.arch.profile` (aucun adaptateur d'analyse disponible).

## Drivers
- Atlas statique français, hors ligne, sans backend, sans prétention diagnostique.
- Jeu de données 2 009 structures, 3 LOD, rebuild reproductible (`npm run rebuild:verify`).
- Interface unifiée : v2 + pathologies simulées issues de v1.

## Stack et entrées (preuves)
- Vite (`package.json:1`), Three.js (`src/v2-engine.js`), WASM Rust (`wasm/corps-core/Cargo.toml:1`).
- Entrées historiques `index.html` (v1) et `v2.html` ; `postbuild-unify.mjs` sert v2 à la racine.
- Persistance locale : `public/models/anatomy.json`, `public/models/v2/manifest.json`, `docs/analyses/sources-checksums.json`.
- CI GitHub Actions (`.github/workflows/qualite-3d.yml`), déploiement `gh-pages` `1796c8e`.

## Limites de mesure
`tools.arch.profile` rapporte 0 référence CI et aucun adaptateur (dependency-cruiser, madge…).
Le scorecard est donc `0/100`, couverture 0 %, confiance `low` : aucune dimension n'est notée au feeling.
Les preuves réelles sont les gates exécutés (`npm test`, `test:review`, `test:pathologies`, `lint:claims`, `build`).
