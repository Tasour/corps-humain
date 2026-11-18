# Audit du compteur FPS — `v2.html` (atlas 3D, 2 104 structures)

**Nature de l'analyse :** statique. Aucun fichier n'a été modifié, aucune mesure runtime
n'a été prise ; tous les chiffres ci-dessous sont déduits du code source et de la
configuration vérifiés sur cette machine (three.js **r187**, `manifest.json` = **2 104**
structures + 1 lot de peau, soit **2 105 instances** BatchedMesh).

---

## 1. Cause exacte du faux « 120 fps »

### Le mécanisme

La boucle de rendu est une boucle **rAF continue avec rendu à la demande** :

| Ligne (`v2.html`) | Code | Rôle |
|---|---|---|
| 757 | `let rafId = 0, running = true;` | état de la boucle |
| 760 | `async function loop() {` | entrée de la boucle |
| 762 | `rafId = requestAnimationFrame(loop);` | **re-planifie à chaque frame d'affichage (120 Hz sur un écran 120 Hz)** |
| 863 | `const signature = [...].join('\|');` | signature de l'état 3D |
| 864–865 | `if ((needsRender \|\| signature !== lastSignature) && !(heavy && dragging) && nowFrame - lastRenderAt >= (heavy ? 1000 : 0))` | **condition de rendu réel** |
| 866–867 | `const t0 = performance.now(); renderer.render(scene, camera);` | unique appel de rendu |
| 868–869 | `frameSum += performance.now() - t0; frameCount++;` | mesure réelle… **jamais affichée** |
| 870–872 | `lastRenderAt = nowFrame; lastSignature = signature; needsRender = false;` | verrou du rendu à la demande |
| **874** | **`frames++;`** | **incrémenté à CHAQUE callback rAF, rendu ou non** |
| 876 | `if (now - last >= 500) {` | fenêtre HUD de 500 ms |
| **890** | **`fpsEl.textContent = Math.round((frames * 1000) / (now - last)) + ' fps';`** | **le numérateur compte les rAF, pas les rendus** |
| 895 | `frames = 0; frameSum = 0; frameCount = 0; last = now;` | reset |

### Pourquoi « 120 »

- `frames++` (874) est exécuté sur **toutes** les frames rAF, y compris celles où le
  bloc 864–865 est court-circuité. Sur un écran 120 Hz, le compteur vaut donc ≈ 120
  sur chaque fenêtre de 500 ms, ce qui donne `120 * 1000 / 1000 = 120 fps` (890),
  **indépendamment du nombre de `renderer.render()` effectués**.
- Quand tout est affiché (2 104 structures), `heavy = Math.max(visibleCount,
  engine.currentVisible.size) > 800` (835) est **vrai**. La garde
  `nowFrame - lastRenderAt >= (heavy ? 1000 : 0)` (865) limite alors le rendu réel à
  **1 image par seconde au maximum** (commentaire 850–852 : « un frame en rendu
  logiciel peut prendre une seconde »). Le HUD affiche pourtant 120 fps :
  **sur-déclaration d'un facteur ≈ 120**.
- Le même défaut existe hors du mode lourd : avec le rendu à la demande, une scène
  statique produit **0 rendu** mais le HUD affiche quand même 120 fps. Le chiffre
  affiché ne mesure donc jamais la performance de rendu, seulement la fréquence
  du moniteur.
- Par contraste, la vraie mesure existe déjà : `frameSum` / `frameCount` (749, 868–869)
  donnent `avg = frameSum / Math.max(1, frameCount)` (877), utilisé uniquement pour
  l'adaptation de qualité (878–884) et l'auto-LOD (885–889), **jamais pour l'affichage**.
  Le HUD `draw`/`quality` (893–894) affiche les appels, triangles et le LOD, mais pas
  le coût par image.

### Effet secondaire de la mesure actuelle

L'adaptation de qualité (878–884) repose sur `avg` (temps CPU autour de `render()`).
En mode lourd, `renderer.setPixelRatio(heavy ? 0.35 : pixelRatio)` (845, 880) écrase
le `pixelRatio` calculé : la boucle 878–884 ne fait que déclencher `forceCulling = true`
(883), c.-à-d. **plus** d'appels à `updateVisibility` (839), sans réduire le coût réel.

---

## 2. Correction précise à appliquer

**Principe : compter les `renderer.render()` réellement exécutés, pas les callbacks rAF ;
afficher le temps par rendu et le fps qui en découle.**

### a) État (ligne 749)

```js
// Avant
let frames = 0, last = performance.now(), frameSum = 0, frameCount = 0;
// Après
let renders = 0, last = performance.now(), renderMsSum = 0;
let hudWindowMs = 500; // adapté ci-dessous
```

Supprimer `frames` partout. Conserver `lastRenderAt` (759) : il sert déjà à la
limitation de fréquence (865).

### b) Bloc de rendu (lignes 864–874)

```js
if ((needsRender || signature !== lastSignature) && !(heavy && dragging)
  && nowFrame - lastRenderAt >= (heavy ? throttleMs : 0)) {
  const t0 = performance.now();
  renderer.render(scene, camera);
  renderMsSum += performance.now() - t0;   // garder 868
  renders++;                               // remplacer frameCount++ (869)
  lastRenderAt = nowFrame;
  lastSignature = signature;
  needsRender = false;
}
// SUPPRIMER : frames++;  (ligne 874)
```

### c) HUD (lignes 876–895)

```js
// Fenêtre d'au moins 1 s en mode lourd : à 1 rendu/s, une fenêtre de 500 ms
// afficherait alternativement 0 et 2 fps.
hudWindowMs = heavy ? 2000 : 1000;
if (now - last >= hudWindowMs) {
  const elapsed = now - last;
  const msPerRender = renders ? renderMsSum / renders : NaN;
  const realFps = (renders * 1000) / elapsed;

  fpsEl.textContent = renders
    ? `${realFps.toFixed(0)} fps · ${msPerRender.toFixed(1)} ms/rendu`
    : '0 fps · rendu à la demande';

  // L'adaptation de qualité réutilise la même mesure.
  if (msPerRender > 8 && pixelRatio > 1) { /* ... inchangé ... */ }

  renders = 0; renderMsSum = 0; last = now;
}
```

Points importants :

1. `fpsEl` doit afficher **`rendus / temps écoulé`**, pas `frames rAF / temps écoulé`.
2. Afficher **ms/rendu** à côté : c'est la donnée qui pilote déjà la qualité (877),
   et elle reste lisible même si `rends = 0` sur une fenêtre.
3. Choisir une fenêtre ≥ 1 000 ms (2 000 ms sous `heavy`) pour qu'au moins un rendu
   tombe dans la fenêtre ; sinon le HUD clignote entre 0 et 2 fps.
4. `performance.now()` autour de `renderer.render()` mesure le temps **CPU** soumis
   à la commande de rendu. Avec un rendu logiciel (SwiftShader/llvmpipe, cas décrit
   ici) c'est une bonne approximation du coût réel. Sur GPU matériel, le temps GPU
   est asynchrone : compléter si besoin avec `EXT_disjoint_timer_query_webgl2`,
   sans que cela remplace le compte de rendus.
5. Option recommandée (non bloquante) : exposer `window.__v2Perf = { renders,
   renderMsSum, lastRenderAt, heavy }` pour les tests, comme `window.__renderer`
   (916) l'expose déjà.

**Application minimale (5 lignes) :** remplacer `frames++` (874) par rien, remplacer
le numérateur de 890 par `renders`, incrémenter `renders` dans le bloc 866–869,
remplacer `frameSum/frameCount` par `renderMsSum/renders` et allonger la fenêtre.

---

## 3. Autres sources de surcoût sous charge

### 3.1 `updateVisibility` — `v2.html:747, 836–842` ; `v2-engine.js:547–577`

- Appelée une fois au démarrage (747) puis **à chaque mouvement de caméra** (836–839),
  car `controls.enableDamping = true` (`v2.html:253`) fait bouger la caméra pendant
  de nombreuses frames après chaque interaction (`controls.update()`, 819).
- À chaque appel : `camera.updateMatrixWorld()` (550), matrice projection×vue (552),
  appel WASM `index.visible_into(...)` (557–560), construction d'un `Set` de **jusqu'à
  2 104 indices** (561–562), puis diff avec `currentVisible` (563–574).
- Le diff appelle `batch.setVisibleAt()` pour chaque instance dont l'état bascule
  (567, 573). En vue corps entier avec tout affiché, un léger mouvement de caméra
  peut basculer des centaines d'instances → autant d'appels dans une seule frame.
- `forceCulling = true` (836, 883) force l'appel même sans mouvement, donc
  l'adaptation de qualité **ajoute** du travail au lieu d'en retirer.

### 3.2 `setVisibleAt` sur 2 104 instances — `v2-engine.js:461, 567, 573, 634, 649, 665`

- `isolate()` (625–653), `showGroup()` (656–671) et `showCollection()` (452–467)
  parcourent **toute la map `structureToInstance`** (2 104 entrées) et appellent
  `setVisibleAt` pour chacune (649, 665, 461) ; `isolate(null)` les réactive toutes (634).
- Dans three r187, `BatchedMesh.setVisibleAt()` (`node_modules/three/src/objects/BatchedMesh.js:1177–1192`)
  est bon marché **par appel** (un `validateInstanceId`, un flag, `_visibilityChanged = true`),
  mais ce flag force au rendu suivant la reconstruction complète du tampon
  multi-draw indirect et le re-culling de **toutes les instances** :
  `_updateDrawParameters` (1581–1589) ne court-circuite que si `_visibilityChanged`,
  `perObjectFrustumCulled` **et** `sortObjects` sont tous faux ; or ici
  `batch.perObjectFrustumCulled = true` (`v2-engine.js:332`), donc la boucle sur
  ~2 105 instances (1652+) tourne **à chaque rendu**, visibility changée ou non.
- `batch.frustumCulled = false` (337) désactive le culling au niveau du lot : tout le
  travail de culling est reporté sur cette boucle par instance.

### 3.3 `shadowMap` — `v2.html:234–236, 257–260, 338–339, 840, 844, 849`

- `shadowMap.enabled = true`, `type = BasicShadowMap`, `autoUpdate = false` (234–236).
- Chaque lot a `castShadow = true; receiveShadow = true` (`v2-engine.js:338–339`) :
  la passe d'ombre re-dessine toute la géométrie visible, en plus de la passe principale.
- `needsUpdate` est écrit **deux fois dans la même frame** : `= visibleCount <= 800`
  (840) puis écrasé par `= !heavy && (!!groupAnim || !!engine.animation)` (849).
  La condition de 840 est donc morte dès qu'il n'y a pas d'animation — la carte
  d'ombre n'est pas rafraîchie quand la caméra bouge. À corriger pour la justesse,
  indépendamment du FPS.
- Le passage `heavy` bascule `shadowMap.enabled = !heavy` et
  `setPixelRatio(heavy ? 0.35 : pixelRatio)` (843–848) : chaque transition Coût
  un changement d'état GPU (recompilation/re-upload possible), et la désactivation
  de l'ombre n'allège **ni** le nombre d'instances **ni** la boucle de culling.
- Le commentaire `v2-engine.js:328–331` confirme que la passe d'ombre écrasait le
  tampon indirect : `perObjectFrustumCulled = true` est un contournement, pas une
  optimisation.

### 3.4 `DecompressionStream` — `v2-engine.js:172–181, 256–258, 580–586` ; `bench/v2.html:10–14`

- `loadBinary()` détecte l'en-tête gzip (176–177) et décompresse via
  `new Response(new Blob([payload]).stream().pipeThrough(new DecompressionStream('gzip'))).arrayBuffer()` (178).
- Appelé pour **chaque catégorie** `.bin.gz` au chargement (256–258) et pour
  **chaque chunk LOD** via `ensureLod()` (580–586), lui-même appelé par
  `setStructureLod()` (589–607) et `setGlobalLod()` (`v2.html:888`).
- Ce n'est **pas** un coût par frame : c'est un coût de chargement et de promotion
  LOD, qui peut bloquer le thread principal (décompression + `geometryFromRecord`
  183–201 + `setGeometryAt` 599) au moment où l'auto-LOD se déclenche à 4 s
  (`v2.html:885–889`). Ce hitch tombe dans une fenêtre HUD de 500 ms et est
 est attribué à tort au rendu. À mesurer séparément du `render()`.

### 3.5 Raycast de survol — `v2.html:443–470` ; `v2-engine.js:514–544`

- `pointermove` borne le raycast à 70 ms (447) → jusqu'à ~14 raycasts/s. Le
  commentaire (445) dit explicitement « Raycast de triangles sur ~2 000 instances ».
- `pickExact()` appelle `raycaster.intersectObjects(targets, false)` (526) sur **tous
  les lots visibles** : intersection triangle-par-triangle sur ~2 104 instances,
  puis recoupement avec `currentVisible` (540).
- Le clic ajoute `pickWaypoint()` + `pickExact()` + `pick()` BVH (`v2.html:726–743`).
- `setHover()` (`v2-engine.js:471–503`) clone la géométrie au premier survol de
  chaque structure (480–482, cache limité par `HOVER_CACHE_LIMIT`) et crée un
  **nouveau `MeshBasicMaterial` à chaque changement de survol** (490–497) →
  allocations et pression GC pendant le déplacement de la souris.

### 3.6 Coûts fixes aggravants (pour information)

- `antialias: true` (`v2.html:232`) et `MeshPhysicalMaterial` avec `clearcoat`
  (`v2-engine.js:314–325`) : coût par fragment élevé, même à `pixelRatio = 0.35`.
- `ACESFilmicToneMapping` (237–238), environnement `PMREMGenerator` (247–248).
- `scene.add(engine.hoverScene)` (284) : le contour de survol est rendu dans la
  passe principale.
- `setPixelRatio(0.35)` (845) ne réduit que le *fill rate* : il ne réduit ni les
  2 105 instances, ni la boucle de culling, ni le nombre de draw calls indirects.

---

## 4. Budget cible

### Objectifs de fluidité (fps réels, mesurés sur `renderer.render()`)

| Contexte | Cible | Plancher | Temps/rendu équivalent |
|---|---|---|---|
| Desktop, GPU, vue isolée / peu de structures | **60 fps** | 45 fps | 16,7 ms (plancher 22 ms) |
| Desktop, GPU, corps entier tout affiché (2 104) | **60 fps** | **30 fps** | 16,7 ms (plancher 33 ms) |
| Mobile, GPU, vue isolée | 60 fps | 30 fps | 16,7 / 33 ms |
| Mobile, GPU, corps entier tout affiché | **30 fps** | 30 fps | **33 ms** |
| Rendu logiciel, corps entier tout affiché (fallback actuel) | ≥ 15 fps | 10 fps | ≤ 66 ms (≤ 100 ms) |

### Répartition indicative du budget image (33 ms sur mobile / 16,7 ms sur desktop)

| Poste | Budget mobile | Budget desktop | Mesure actuelle |
|---|---|---|---|
| `renderer.render()` (CPU soumis, y compris update multi-draw) | ≤ 33 ms | ≤ 16,7 ms | déjà mesuré en `frameSum` (868), non affiché |
| `updateVisibility` + WASM `visible_into` | ≤ 4 ms | ≤ 2 ms | non mesuré |
| `setVisibleAt` (diffs + reconstruction indirecte) | ≤ 2 ms | ≤ 1 ms | non mesuré |
| Passe d'ombre (quand activée) | ≤ 4 ms | ≤ 2 ms | non mesuré |
| Raycast de survol (hors frame de rendu, ≤ 70 ms) | ≤ 8 ms | ≤ 4 ms | non mesuré |
| JS Annexe (tweens, controls, signature) | ≤ 2 ms | ≤ 1 ms | non mesuré |

### Règles de gestion du budget

1. **Le HUD doit dire la vérité :** afficher `fps réel = rendus / période` et
   `ms/rendu`, avec une fenêtre ≥ 1 s (2 s en mode lourd). Un rendu à la demande
   affiche `0 fps · rendu à la demande`, pas `120 fps`.
2. **Seuil de dégradation basé sur `ms/rendu`, pas sur le nombre de frames rAF :**
   si `msPerRender > 33` sur 3 fenêtres consécutives → baisser `pixelRatio`,
   puis désactiver l'ombre, puis forcer le LOD bas, puis masquer la peau ; ne
   jamais augmenter `forceCulling` (qui ajoute du travail).
3. **Le throttling lourd (865) doit être un dernier recours et un état mesuré :**
   remplacer le palier fixe `1000 ms` (≤ 1 fps) par `1000 / fpsCible` (33 ms pour
   30 fps, 66 ms pour 15 fps) et ne conserver 1 000 ms que si le budget est
   dépassé d'un facteur > 10. Le HUD doit alors afficher le fps réel (1 fps), pas 120.
4. **Plancher d'honnêteté :** en rendu logiciel, viser 15–20 fps réels et l'afficher ;
   ne pas masquer la dégradation derrière un compteur de rAF.
5. **Instrumentation minimale à ajouter** (hors duplication de boucle rAF) :
   `updateVisibility`, `pickExact`, `ensureLod` et le nombre d'appels
   `setVisibleAt` par frame, pour ventiler le budget ci-dessus au lieu de le supposer.

---

## Synthèse en une phrase

Le « 120 fps » est **le taux de rafraîchissement de l'écran** : `frames++` (874)
compte les callbacks rAF à 120 Hz tandis que `renderer.render()` (867) est bridé à
1 image/s en mode lourd (865) — il faut compter les rendus (868–869) et afficher
`rendus/temps` + `ms/rendu`, puis viser 30 fps plancher sur mobile et 60 sur desktop.
