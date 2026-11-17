# Architecture performance — atlas CORPS 3D

## Objectif

Passer de 47 entités / 366 k triangles à **2 202 maillages individuels** (1 251
structures canoniques, ~11,6 M triangles dans le jeu de données complet) sans
dégrader la fluidité ni faire chauffer les appareils mobiles. La contrainte n'est
pas le nombre de triangles en soi, mais le **coût CPU par objet** et le **nombre
de draw calls**.

## Mesures effectuées sur cette machine

### Rendu : objets séparés vs `THREE.BatchedMesh`

`bench/batching.html`, 2 200 sphères, 12 matériaux, WebGLRenderer, 90 frames
(Chrome headless, CPU `renderer.render()`) :

| Mode | Médiane | p90 | Draw calls | Triangles |
|---|---:|---:|---:|---:|
| 2 200 `THREE.Mesh` | 9,9 ms | 13,1 ms | 2 154 | 172 320 |
| 12 `THREE.BatchedMesh` | **1,0 ms** | **1,3 ms** | **12** | 172 000 |

→ **~10× moins de temps CPU** et **~180× moins de draw calls**. Le gain vient du
fair work une seule fois par lot au lieu de 2 200 fois par frame. Le coût par objet
domine très largement le coût GPU dans ce scénario.

### Picking / culling : JavaScript vs WASM (Rust)

`wasm/corps-core`, BVH sur 2 202 AABB, comparé à un balayage JS linéaire :

| Opération | WASM (Rust) | JavaScript | Accélération |
|---|---:|---:|---:|
| 5 000 raycasts | 13,9 ms | 331 ms | **~24×** |
| 2 000 cullings frustum + LOD | 143 ms | 207 ms | ~1,5× |

Le culling WASM reste sous **0,08 ms par frame** : même avec 2 200 structures, le
budget 60 Hz (16 ms) est largement respecté. Le raycast est le vrai gagnant : le
picking au clic devient négligeable au lieu de parcourir tous les maillages.

### WebGPU : pas le bon levier prioritaire

Étude de l'écosystème (three.js r187, mai-octobre 2026) :

- `WebGPURenderer` coûte ~2× plus de CPU par `render()` que `WebGLRenderer` sur
  des scènes à beaucoup de maillages, avec un premier frame 5 à 10× plus lent
  (bug #30560, UBO/bind-groups par objet).
- Support navigateur ~89 % mais **partiel** : Firefox absent sur Linux/Android et
  Mac Intel, Safari 26 seulement (iOS 18 et antérieurs restent en WebGL 2).
- Les benchmarks indépendants montrent que le gain de FPS vient de l'**instance /
  batching**, pas du nom de l'API.

**Décision :** garder `WebGLRenderer` + `BatchedMesh` comme chemin principal,
ajouter WebGPU plus tard en option. Le WASM est utilisé pour la partie CPU, pas
pour remplacer le renderer.

## Architecture retenue

```
┌──────────────────────────────────────────────────────────────┐
│ UI / état (JS)                                               │
│   - arborescence par système, recherche, fiche               │
├──────────────────────────────────────────────────────────────┤
│ Moteur CPU — Rust → WASM (corps-core, 37 Ko gzip)            │
│   - BVH sur les AABB des 2 202 structures                    │
│   - raycast au clic (24× plus rapide)                        │
│   - culling frustum + LOD angulaire, write dans un Uint32Array│
├──────────────────────────────────────────────────────────────┤
│ Données (build)                                              │
│   - 3 niveaux de détail par structure : 300 / 1,5k / original│
│   - meshopt (quantification + réordonnancement) + gzip/brotli│
│   - KTX2/Basis pour les textures, chargées à la demande      │
│   - chunks par système, chargement paresseux                 │
├──────────────────────────────────────────────────────────────┤
│ Rendu — Three.js WebGLRenderer                               │
│   - BatchedMesh par matériau/système (draw calls ~12-40)     │
│   - DPR plafonné, governor de frame time, pause onglet caché │
└──────────────────────────────────────────────────────────────┘
```

### Pourquoi Rust / WASM ici

Le renderer Three.js est déjà excellent dès qu'on lui donne peu d'objets. Le
coût restant est dans les tâches CPU pures : tests d'intersection, culling,
sélection LOD, décompression. Rust compile ces boucles en WASM sans GC, avec
`opt-level=3`, LTO et `panic=abort` : le module pèse **37 Ko** une fois
optimisé (`wasm-opt`). Il ne remplace pas Three.js, il l'alimente.

Le module exposé (`src/wasm/corps-core/`) :

- `AnatomyIndex.push(id, centre, rayon, bornes…)` puis `build(leaf_size)`
- `raycast(origin, direction, max_dist) -> id`
- `visible(planes, cam, lod_bias) -> Uint32Array`
- `visible_into(planes, cam, lod_bias, out: Uint32Array) -> count` (sans
  allocation, chemin recommandé dans la boucle de rendu)

### Pourquoi `BatchedMesh`

`BatchedMesh` regroupe des géométries **différentes** qui partagent un matériau.
C'est exactement le cas de l'atlas : une centaine de matériaux couleur suffisent
pour 2 202 structures. On obtient le meilleur des deux mondes : picking et
mise à jour par structure côté logique, et un nombre de draw calls constant côté
GPU.

### Compression et textures

- **Géométrie** : meshopt. Le décodeur est déjà un petit module WASM (~10 Ko)
  et la décompression est proche d'une copie mémoire ; gzip/brotli par-dessus.
- **Textures** : KTX2/Basis (transcodage WASM), uniquement pour les structures
  qui en ont besoin, jamais chargées par défaut sur mobile.
- **LOD** : le niveau « low » (~300 tris) sert de proxy pour tout le corps ; le
  niveau « high » n'est chargé que pour la structure focalisée/isolée.

### Budget thermique / batterie

- `devicePixelRatio` plafonné à 1,5 (1 sur mobile si le frame time dépasse 14 ms).
- LOD angulaire dans `AnatomyIndex.visible_into` : les petites structures
  disparaissent quand elles font moins de ~1/120 radian à l'écran.
- `renderer.setAnimationLoop` suspendu quand `document.hidden`.
- Aucun post-traitement coûteux sur le chemin par défaut (le scan skin reste un
  uniform simple).

## Implémentation P1 (prototype fonctionnel)

Le moteur `src/v2-engine.js` consomme le jeu de données v2 et expose :

- `load()` — chargement du manifeste, des chunks `low`, construction des géométries
  et de l'index BVH WASM ;
- `addTo(scene)` — ajout de **3 lots `BatchedMesh`** (os, muscles, organes) plus
  un lot peau optionnel ;
- `pick(raycaster)` — picking via le BVH Rust (~24× plus rapide qu'un balayage) ;
- `updateVisibility(camera, lodBias)` — culling frustum + LOD via
  `AnatomyIndex.visible_into`, avec bascule incrémentale de la visibilité des
  instances (seules les différences sont écrites).

La page `/v2.html` (accessible aussi en production) démontre l'atlas complet
avec contrôles OrbitControls, filtres par catégorie, sélection d'une structure
et compteur de performance.

**Mesures sur le jeu de données réel** (2 131 structures, niveau `low`,
Chrome headless, 1 228 k triangles affichés) :

- **3 draw calls** (au lieu de 2 131) ;
- **~1,2 ms de CPU par `renderer.render()`** ;
- **1 223 structures visibles** après culling ;
- picking et culling négligeables dans le budget frame.

Le chemin reste expérimental : l'application principale (`index.html`) utilise
encore le modèle v1 (47 structures) et toutes ses fonctionnalités. La fusion
des deux interfaces et la qualité adaptative sont les étapes P2/P3.

## Phases de migration

| Priorité | Contenu | État |
|---|---|---|
| **P0.1** | Inventaire complet des 2 202 structures + prototype Rust/WASM + benchmarks | ✅ fait |
| **P0.2** | **Jeu de données 3D** : 2 131 structures individuelles en 3 LOD (300 / 1,5 k / 12 k), simplification meshopt, manifest, chunks par catégorie | ✅ fait — voir `docs/jeu-de-donnees-v2.md` |
| P1 | Moteur `BatchedMesh` + index WASM : 3 lots, picking BVH, culling frustum/LOD, page `/v2.html` | ✅ fait — 3 appels, 1,2 M tris, ~1,2 ms CPU/frame |
| P2 | Qualité adaptative (governor DPR/LOD), textures KTX2 à la demande | à faire |
| P3 | Explorateur hiérarchique (système → organe → structure) dans l'UI | à faire |

Le **jeu de données** fait donc partie des fondations (P0), au même titre que
l'inventaire et le moteur WASM : sans lui, les couches de rendu et de culling
n'ont rien à afficher. Le code actuel continue de fonctionner : le moteur WASM
et le benchmark sont des modules autonomes, non branchés sur l'application.
L'intégration se fera sans casser le repli procédural ni le mode hors ligne.

## Commandes

```bash
# Recompiler le module WASM (nécessite rustup + wasm-pack)
cd wasm/corps-core && wasm-pack build --target web --release \
  --out-dir ../../src/wasm/corps-core

# Benchmark batching (serveur Vite en cours, /bench/batching.html)
```

## Licences

- Code Rust/WASM : MIT, comme le reste du dépôt.
- Géométries : BodyParts3D CC BY 4.0 + Z-Anatomy CC BY-SA 4.0 (voir
  `public/models/README.md`).
