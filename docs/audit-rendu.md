# Audit du rendu — atlas CORPS v2 (2 104 structures, 3 lots BatchedMesh + peau)

**Nature de l'analyse :** statique, uniquement à partir du code et des fichiers présents sur
cette machine. Aucun fichier source n'a été modifié, aucune mesure runtime n'a été prise.
Versions/faits vérifiés : three.js **r187** (`package.json:19`),
`public/models/v2/manifest.json` = **2 104 structures** (os **325**, muscle **697**,
organe **1 082**) + 1 lot peau = **2 105 instances** BatchedMesh,
**1 122 730 triangles** au LOD `low` (somme calculée de `indexCount/3` dans le manifeste).
Le document `docs/architecture-performance.md:139-145` mesure ~**1 220 structures visibles**
après culling et ~**1,2 M tris** affichés sur le jeu de données réel : ces ordres de grandeur
sont repris ci-dessous.

---

## 0. Chiffres de cadrage

| Élément | Valeur | Source |
|---|---|---|
| Structures / instances | 2 104 + 1 peau = 2 105 | manifeste, `v2-engine.js:301-380` |
| Triangles LOD `low` | 1 122 730 | manifeste (calcul) |
| Structures visibles après culling (corps entier) | ≈ 1 220 | `architecture-performance.md:144` |
| Lots avec `castShadow`/`receiveShadow` | **3** (os, muscle, organe) | `v2-engine.js:338-339` |
| Lot peau | 1 instance, **ni** `castShadow` **ni** `receiveShadow` | `v2-engine.js:375-379` (attributs non posés) |
| Carte d'ombre | `BasicShadowMap`, 512×512, `autoUpdate = false` | `v2.html:234-236, 260` |
| Matériaux | `MeshPhysicalMaterial` ×4 (3 lots + peau) | `v2-engine.js:314-325, 365-374` |
| Résolution de rendu en mode lourd | `pixelRatio = 0.35` | `v2.html:845` |
| Fréquence de rendu en mode lourd | **≤ 1 rendu/s** (palier fixe 1 000 ms) | `v2.html:865` |

**Deux constats structurants, à lire avant le reste :**

1. Le diff d'ancien vs nouveau masque de visibilité **existe déjà** dans
   `updateVisibility()` (`v2-engine.js:563-574`). Contrairement à l'hypothèse de départ,
   celle-ci n'appelle **pas** `setVisibleAt()` 2 104 fois par mouvement de caméra. Le coût
   réel qui « touche toutes les instances » se situe ailleurs : dans le culling propre de
   Three.js, rendu obligatoire à chaque frame à cause de `perObjectFrustumCulled = true`
   (`v2-engine.js:332`, voir §1.3).
2. `renderer.shadowMap.needsUpdate = true` (`v2.html:840`) est **du code mort** : la ligne
   `849` écrase systématiquement la valeur avant le `renderer.render()` de la ligne `867`.
   La passe d'ombre n'est donc **jamais** déclenchée par un mouvement de caméra (voir §3).

---

## 1. `updateVisibility()` — combien de `setVisibleAt()` par mouvement de caméra ?

### 1.1 Le code exact (`src/v2-engine.js:547-577`)

```js
557: const count = this.index.visible_into(planes, ..., this.visibleBuffer);
561: const next = new Set();
562: for (let i = 0; i < count; i++) next.add(this.visibleBuffer[i]);
563: for (const structureIndex of this.currentVisible) {
564:   if (next.has(structureIndex)) continue;              // inchangé → ignoré
567:   batch.setVisibleAt(ref.instanceId, false);           // seulement les "sorties"
568: }
569: for (const structureIndex of next) {
570:   if (this.currentVisible.has(structureIndex)) continue; // inchangé → ignoré
573:   batch.setVisibleAt(ref.instanceId, true);            // seulement les "entrées"
574: }
575: this.currentVisible = next;
```

**Réponse chiffrée :** le nombre d'appels est exactement la **différence symétrique**
`|ancien \ nouveau| + |nouveau \ ancien|` entre les deux masques de visibilité. Ce n'est
**jamais 2 104 dans un mouvement de caméra ordinaire**.

| Scénario (tout affiché) | `\|ancien\|` | `\|nouveau\|` | Appels `setVisibleAt()` |
|---|---:|---:|---:|
| Premier appel au démarrage (`v2.html:747`) | 0 | ≈ 1 220 | **≈ 1 220** (`true`) |
| Orbit lent, caméra qui bouge | ≈ 1 220 | ≈ 1 220 | **quelques unités à quelques dizaines** (structures qui traversent le frustum / le seuil LOD) |
| Après `isolate(null)` (`v2-engine.js:634-636`), premier mouvement | 2 104 | ≈ 1 220 | **≈ 884** (`false`) |
| Caméra tournée vers le vide (`next` = 0) | ≈ 1 220 | 0 | **≈ 1 220** (`false`) |
| Saut de caméra important (tween vers une structure puis retour) | variable | variable | jusqu'à ≈ 1 220 |

À noter : `isolate()` (`v2-engine.js:634`), `showCollection()` (`:461`), `showGroup()` (`:665`)
et `isolate(structure)` (`:649`) appellent eux-mêmes `setVisibleAt()` sur **les 2 104
instances**. Ce sont ces chemins — pas `updateVisibility()` — qui font un travail exhaustif.

### 1.2 Le coût résiduel de `updateVisibility()`

Même quand le diff est vide, chaque appel (déclenché à chaque frame où la caméra bouge,
ce qui arrive souvent à cause de `enableDamping = true`, `v2.html:253`) paie :

- 2 itérations complètes sur `currentVisible` et `next`, soit ≈ **2 446 itérations** ;
- ≈ **2 446 `Map.get()`** sur `structureToInstance` (`v2-engine.js:565, 571`) plus
  autant de `Set.has()` ;
- l'allocation d'un **nouveau `Set` de ≈ 1 220 entrées** à chaque appel (`:561`), donc une
  pression GC sur une boucle à 120 Hz ;
- `camera.updateMatrixWorld()` (`:550`), la matrice projection×vue (`:552`) et l'appel WASM
  `visible_into()` (`:557-560`), qui reste négligeable (~0,08 ms d'après
  `architecture-performance.md:36`).

Ordre de grandeur : quelques centièmes de milliseconde par appel — réel mais **mineur**
face au rendu.

### 1.3 Le vrai « toutes les instances à chaque frame »

`v2-engine.js:332` pose `batch.perObjectFrustumCulled = true` pour contourner un bug de
r187 où la passe d'ombre écrasait le tampon indirect (commentaire `:328-331`). Conséquence
dans `node_modules/three/src/objects/BatchedMesh.js` :

- `_updateDrawParameters()` ne court-circuite que si `_visibilityChanged`,
  `perObjectFrustumCulled` **et** `sortObjects` sont tous faux (`:1585`). Ici le second est
  vrai → la boucle `:1728-1760` tourne **à chaque rendu**, pour **325 + 697 + 1 082 =
  2 104 instances** : `getMatrixAt()` + `getBoundingSphereAt()` + `applyMatrix4()` +
  `frustum.intersectsSphere()` par instance, puis ré-écriture du tampon indirect
  (`indirectTexture.needsUpdate = true`, `:1789`).
- La passe d'ombre, si elle était active, referait la même chose via `onBeforeShadow()`
  (`:1815-1822`) avec la caméra d'ombre.

C'est ici que se trouve le balayage systématique des 2 105 instances, **pas** dans le diff
de `updateVisibility()`.

### 1.4 Optimisation proposée : diff par masque, sans Set ni Map

Le diff logique est déjà correct ; l'amélioration porte sur le coût du diff et sur le
doublon de culling.

a) **Remplacer les deux `Set` par des tableaux typés réutilisés + estampillage par
génération** (aucune allocation par appel, aucun `Map.get()`) :

```js
// Initialisation unique, dans load()
this.stamp = new Uint32Array(n);        // n = 2104
this.prevList = new Uint32Array(n);
this.nextList = new Uint32Array(n);
this.prevCount = 0;
this.visibleGen = 0;
// Remplacer structureToInstance (Map) par 2 tableaux indexés par structure._index :
this.instanceIdByIndex = new Uint32Array(n);
this.categoryByIndex = new Array(n);

// Dans updateVisibility(), après visible_into()
const gen = ++this.visibleGen;
let nextCount = 0;
for (let i = 0; i < count; i++) {
  const id = this.visibleBuffer[i];
  if (this.stamp[id] !== gen - 1) this.setVisibleById(id, true);   // entrée
  this.stamp[id] = gen;
  this.nextList[nextCount++] = id;
}
for (let i = 0; i < this.prevCount; i++) {
  const id = this.prevList[i];
  if (this.stamp[id] !== gen) this.setVisibleById(id, false);      // sortie
}
[this.prevList, this.nextList] = [this.nextList, this.prevList];
this.prevCount = nextCount;
```

Coût : exactement `count + prevCount` lectures de tableaux (≈ 2 446) contre 2 446
`Map.get()` + `Set.has()` + 1 allocation de `Set` aujourd'hui. Le nombre d'appels à
`setVisibleAt()` reste identique (différence symétrique) : aucune bascule inutile n'est
ajoutée. Three.js fait déjà un test d'idempotence dans `setVisibleAt()`
(`BatchedMesh.js:1180-1183`), mais éviter les appels reste préférable.

b) **Supprimer le culling redondant de Three.js** en passant
`batch.perObjectFrustumCulled = false` (`v2-engine.js:332`) *une fois le problème d'ombre
réglé* (§3). Le culling WASM (`index.visible_into`) + le diff ci-dessus décrivent déjà
l'état exact ; `_updateDrawParameters()` peut alors court-circuiter tant que rien ne
bascule. **Précaution :** le commentaire `:328-331` indique que cette option compense une
corruption du tampon indirect par la passe d'ombre. Il faut donc verrouiller l'absence de
passe d'ombre en vue corps entier (§3) et re-tester en vue isolée avant de généraliser.

---

## 2. `setColorAt()` à la création — coût unique ou répété ?

**Coût unique.** `v2-engine.js:348` :

```js
batch.setColorAt(instanceId, new THREE.Color(colorFor(structure)));
```

est dans la boucle de création des lots (`:341-355`), exécutée **une fois par structure**,
soit **2 104 appels pendant `load()`** — et un seul `load()` par page (`v2.html:278-282`).

Détail par appel (`node_modules/three/src/objects/BatchedMesh.js:1123-1134`) :
`validateInstanceId()`, puis `color.toArray(colorsTexture.image.data, instanceId * 4)`
(4 flottants) puis `colorsTexture.needsUpdate = true`. Ce dernier ne provoque **pas** 2 104
téléversements : le drapeau est consommé une fois par le renderer lors du prochain rendu.
Le coût total est donc :

- CPU : 2 104 allocations de `THREE.Color` + ~8 416 écritures de flottants → **< 1 ms** au
  chargement ;
- GPU : **1 upload par lot** de la texture de couleurs. Taille via `_initColorsTexture()`
  (`BatchedMesh.js:381-389`) = `ceil(sqrt(maxInstanceCount))²` pixels RGBA float :
  organe 33×33 ≈ **17,4 Ko**, muscle 27×27 ≈ **11,7 Ko**, os 18×18 ≈ **5,2 Ko**,
  soit **≈ 34 Ko au total**.

**Chemin répété unique :** l'animation « Flux sanguin ». `updateAnimation()`
(`v2-engine.js:799-830`) appelle `setColorAt()` à la ligne `812` pour chaque id animé —
jusqu'à **160 ids** (`v2.html:640`) — **à chaque frame où l'animation est active**, ce qui
remarque toute la texture de couleurs comme sale → ré-upload de ~17 Ko par frame. Les autres
appels sont ponctuels : `highlight()` (`:720`, 1–2 appels par sélection) et
`clearAnimation()` (`:794`, un par id animé). En vue corps entier, l'animation est de toute
façon coupée par `v2.html:767-773`.

**Optimisation éventuelle (faible priorité) :** réutiliser un seul `THREE.Color` tampon au
lieu d'en allouer 2 104 ; écrire directement dans `colorsTexture.image.data` avant le
premier rendu (API interne, fragile). Aucun gain à attendre sur le FPS.

---

## 3. Ombres — coût réel, utilité du sol, désactivation conditionnelle

### 3.1 Configuration (`v2.html:232-276`, `v2-engine.js:338-339`)

- `shadowMap.enabled = true`, `type = BasicShadowMap` (le mode le moins cher : pas de PCF),
  **`autoUpdate = false`** (`:234-236`) ;
- `WebGLShadowMap.render()` court-circuite si `enabled === false` **ou** si
  `autoUpdate === false && needsUpdate === false`
  (`node_modules/three/src/renderers/webgl/WebGLShadowMap.js:94-95`) ;
- 3 lots `castShadow = true; receiveShadow = true` → **2 104 instances** projettent et
  reçoivent des ombres ; la peau n'en fait pas partie ;
- lampe directionnelle fixe, `mapSize 512×512`, ortho `x[-1.2;1.2]`, `y[-0.2;2.2]`,
  `near 0.5`, `far 8` (`:257-268`) → **le corps entier tient dans le frustum d'ombre** ;
- sol : `CircleGeometry(1.3, 64)` (64 triangles) + `ShadowMaterial({opacity:0.16})`,
  `receiveShadow = true` (`:270-276`).

### 3.2 Coût de `needsUpdate = true` à chaque mouvement de caméra

**Il est nul en l'état**, pour deux raisons cumulées :

1. `v2.html:840` (`renderer.shadowMap.needsUpdate = visibleCount <= 800`) est **écrasé
   trois lignes plus tard** par `v2.html:849` :
   `renderer.shadowMap.needsUpdate = !heavy && (!!groupAnim || !!engine.animation);`
   Aucun `renderer.render()` n'a lieu entre les deux (le rendu est en `:867`). Sans
   animation, la valeur finale est donc toujours `false`.
2. En vue corps entier, `heavy = max(visibleCount, currentVisible.size) > 800` (`:835`) est
   vrai (≈ 1 220), donc `:844` pose `shadowMap.enabled = false` : la passe est exclue avant
   même le test de `needsUpdate`.

**Coût si la ligne 840 était effective** (par exemple si on supprimait la ligne 849) :
la passe d'ombre re-soumettrait les 3 lots, soit **~1,12 M triangles supplémentaires** par
mouvement de caméra (~2,24 M tris/frame au total), avec en plus :
- 3 draw calls supplémentaires ;
- un second passage dans `_updateDrawParameters()` pour la caméra d'ombre
  (`BatchedMesh.js:1815-1822`) → 2 104 tests de frustum de plus ;
- un changement d'état GPU (framebuffer de 512² + matériau depth) et, au premier passage,
  une compilation de shader depth.

En rendu logiciel (le cas décrit, 1–5 fps), ce serait **~+100 % du coût géométrique** par
frame — c'est précisément pour cela que le garde `heavy` a été ajouté. Il faut donc **ne pas**
simplement « réparer » la ligne 840 sans condition.

### 3.3 Le sol `ShadowMaterial` est-il utile ?

- **Utile uniquement si une carte d'ombre est réellement produite.** En vue corps entier,
  `enabled = false` et `needsUpdate = false` : le sol échantillonne une carte vide ou
  périmée et se dessine comme un disque uniformément teinté à 0,16 d'opacité. C'est de
  l'**overdraw transparent pur** (64 triangles, `transparent: true`, `depthWrite` implicite
  désactivé) sur une zone de ~π·1,3² unités, sans information visuelle.
- **Utile en vue isolée**, où il fournit une ombre de contact discrète sous la structure —
  à condition de déclencher un `needsUpdate` quand l'isolement/le LOD change (aujourd'hui
  ce n'est pas le cas : seule une animation active le fait, `:849`).

### 3.4 Proposition de désactivation conditionnelle

La mécanique existe déjà (`:843-848`) mais elle est incomplète et le double écrit de
`needsUpdate` la rend incohérente. Proposition :

```js
// Un seul état explicite, calculé une fois par frame, et un seul écrit de needsUpdate.
const shadowWanted = !heavy;                 // ou mieux : distance caméra/cible > 1,2
if (shadowWanted !== shadowEnabled) {
  shadowEnabled = shadowWanted;
  renderer.shadowMap.enabled = shadowWanted;
  key.castShadow = shadowWanted;
  ground.visible = shadowWanted;            // supprime le disque transparent inutile
  renderer.shadowMap.needsUpdate = true;    // une seule mise à jour après réactivation
  needsRender = true;
} else {
  renderer.shadowMap.needsUpdate = shadowEnabled && (!!groupAnim || !!engine.animation);
}
```

Points clés :
- **supprimer la ligne 840** (code mort) et n'avoir qu'un seul écrit de `needsUpdate` ;
- masquer `ground` avec les ombres pour économiser un draw call transparent en vue corps
  entier ;
- critère recommandé : **distance caméra ↔ cible** ou `!!engine.isolated`, plutôt que
  `visibleCount`. `visibleCount` vient du culling WASM et **ignore l'état `batch.visible`**
  des catégories : même avec les os et muscles masqués (réglage par défaut, `v2.html:285`),
  il vaut ≈ 1 220 et donc `heavy = true`. Le mode dégradé est donc actif dès l'ouverture,
  alors que seulement ~1 082 instances d'organes sont réellement dessinées ;
- conserver `BasicShadowMap` et 512² : c'est déjà le réglage le moins coûteux.

---

## 4. Micro-texture procédurale — recalculée à chaque chargement ?

**Non.** Vérification :

- `loadTissueTextures()` (`v2-engine.js:160-170`) n'est appelée qu'**une seule fois**, à
  `v2-engine.js:240` dans `load()` ; `v2.html:278-282` crée un seul moteur et appelle
  `load()` une seule fois.
- Aucun appel dans `updateVisibility()`, `updateAnimation()`, `setGlobalLod()`,
  `setStructureLod()`, `ensureLod()`, ni lors d'un changement de thème ou de resize.

Coût **unique au démarrage**, par catégorie (`bone`, `muscle`, `organ`) :

- `generateAlbedo()` (`:93-158`) : canvas 256×256, LCG déterministe semé par
  `kind.length * 7919` (`:98-99`, **pas de `Math.random()`**) ; os = 900 arcs + ~29 courbes
  (`:104-118`), muscle = 240 courbes de Bézier (`:122-132`), organe = 90 dégradés
  radiaux + 45 polylignes (`:136-155`) ;
- `derivePbrMaps()` (`:44-90`) : `getImageData` 256×256 (`:50`), `Float32Array` de
  65 536 hauteurs (`:52-55`), boucle de Sobel de **65 536 itérations** avec `Math.hypot`
  (`:65-80`), 2 `putImageData`, 2 `CanvasTexture` (`:81-89`) ;
- total : **3 × 65 536 = 196 608 itérations** pixel + ~2 900 opérations de dessin canvas ;
  **9 `CanvasTexture`** (3 albedo + 3 normal + 3 roughness), 256×256 RGBA ≈
  **2,25 Mo** de données GPU (~3 Mo avec mipmaps).

Il n'y a pas de cache module-level : créer un second `AnatomyV2Engine` et appeler `load()`
recalculerait le tout. Ce n'est pas le cas de l'application. Coût de l'ordre de quelques
millisecondes à quelques dizaines de millisecondes au chargement, **jamais dans la boucle de
rendu**.

Anomalie mineure (non performancielle) : `albedo.repeat.set(5, 5)` (`:166`) alors que
`normal`/`roughness` utilisent `repeat.set(6, 6)` (`:86`) → les trois cartes ne sont pas
alignées.

---

## 5. `MeshPhysicalMaterial` + clearcoat vs `MeshStandardMaterial` sur mobile

**Oui, plus coûteux.** `MeshPhysicalMaterial` étend `MeshStandardMaterial` ; avec
`clearcoat = 0.35` (organes) / `0.12` (os, muscles) et `clearcoatRoughness = 0.45`
(`v2-engine.js:322-323`), le define `USE_CLEARCOAT` est actif et ajoute par fragment :

- un lobe spéculaire GGX supplémentaire pour chaque lumière
  (`lights_physical_fragment.glsl.js:72-85`, `lights_physical_pars_fragment.glsl.js:527+`) ;
- une évaluation `EnvironmentBRDF` supplémentaire sur `clearcoatRadiance`
  (`lights_physical_pars_fragment.glsl.js:671-675`) — or `scene.environment` est une PMREM
  `RoomEnvironment` (`v2.html:247-248`), donc un échantillonnage IBL de plus ;
- la gestion d'une normale de clearcoat (`clearcoat_normal_fragment_begin.glsl.js`,
  `normal_fragment_begin.glsl.js:22,33,51`).

S'y ajoutent :
- **3 échantillons de texture par fragment** : `map`, `normalMap`, `roughnessMap`
  (`v2-engine.js:316-319`) + le calcul de base tangent-space induit par la normal map ;
- **`side: THREE.DoubleSide`** (`:324`) : pas de backface culling → jusqu'à 2× fragments
  rastérisés pour des géométries fermées ;
- `ACESFilmicToneMapping` (`v2.html:237-238`) et `antialias: true` (`:232`).

Sur GPU mobile (Mali/Adreno) comme en rendu logiciel, le poste **fragment** domine.
Estimation (non mesurée ici) : le clearcoat seul coûte typiquement **~10–25 %** de temps
fragment de plus que `MeshStandardMaterial` ; le passage à un matériau réduit
(clearcoat + normalMap supprimés, FaceSide avant) peut faire gagner **~20–40 %** du temps
de rendu dans ce scénario. Le lot peau (`:365-374`) est encore plus lourd : Physical +
3 cartes + `transparent: true` + `depthWrite: false`.

### Fallback recommandé

Décider le niveau au chargement (le matériau est créé à `v2-engine.js:314`) et/ou le
basculer sur la transition `heavy` (`v2.html:843-848`, une seule affectation par lot) :

```js
const lowTier = matchMedia('(max-width: 820px)').matches
  || (navigator.hardwareConcurrency || 8) <= 4;

const Params = lowTier ? THREE.MeshStandardMaterial : THREE.MeshPhysicalMaterial;
const params = {
  color: 0xffffff,
  map: maps?.map || null,
  roughnessMap: lowTier ? null : maps?.roughness || null,
  roughness: category === 'bone' ? 0.9 : 0.7,
  metalness: 0,
  side: THREE.FrontSide, // à valider : certaines structures ouvertes exigent DoubleSide
};
if (!lowTier) Object.assign(params, {
  normalMap: maps?.normal || null,
  normalScale: new THREE.Vector2(0.5, 0.5),
  clearcoat: category === 'organ' ? 0.35 : 0.12,
  clearcoatRoughness: 0.45,
});
const material = new Params(params);
```

Ordre de retrait recommandé si le budget reste dépassé : `clearcoat` → `normalMap` →
`roughnessMap` → `DoubleSide` → `antialias`. **Conserver `map`** : elle porte l'identité
tissulaire et est multipliée par la couleur par instance de `setColorAt()`.
Conserver `MeshPhysicalMaterial` pour la vue isolée/haut détail, où quelques milliers de
fragments seulement sont touchés.

---

## 6. Classement des 5 optimisations à plus fort impact

Estimations **déduites du code**, non mesurées : elles supposent le contexte décrit
(rendu logiciel, corps entier, 2 104 instances, 1,12 M tris, 1 rendu/s actuel).

| Rang | Optimisation | Emplacement | Gain estimé | Effort |
|---:|---|---|---|---|
| **1** | **Remplacer le palier de throttle fixe `1000 ms` par un throttle adaptatif** : `throttleMs = min(1000, max(0, avgRenderMs − 16))`, ou palier à 66 ms (15 fps) / 33 ms (30 fps) ; ne garder 1 000 ms que si le budget est dépassé d'un facteur > 10. À coupler au correctif HUD de l'autre agent. | `v2.html:865` (palier), `:877` (`avg`) | **×3 à ×10 sur le fps perçu** (1 rendu/s → 3–10 rendus/s). Aucune réduction du coût par image, mais on cesse de jeter des frames déjà payables. | 1 ligne (+ HUD) |
| **2** | **Matériau dégradé sur mobile / mode lourd** : Physical → Standard, supprimer clearcoat, puis normalMap/roughnessMap, `DoubleSide` → `FrontSide` si valide, `antialias` off. Voir §5. | `v2-engine.js:314-325, 365-374` ; `v2.html:232` | **−20 à −40 % du temps de rendu** (poste fragment dominant en logiciel/mobile). | Faible (choix du matériau + bascule sur transition `heavy`) |
| **3** | **`perObjectFrustumCulled = false`** une fois les ombres fiabilisées : supprime les 2 104 tests de frustum + la réécriture du tampon indirect à chaque rendu. Le culling WASM fait déjà le travail. | `v2-engine.js:332` ; `BatchedMesh.js:1585, 1728-1787` | **−0,5 à −2 ms CPU/frame** ; sur desktop GPU, le doc annonce ~1,2 ms CPU pour `render()` (`:143`) : ce poste pourrait être divisé par ~2. Négligeable face à une frame logicielle de 200 ms, mais décisif sur GPU/mobile. | Faible, **mais nécessite de re-tester le bug d'ombre décrit en `:328-331`** |
| **4** | **Diff de visibilité par masque typé** (§1.4) : tableaux `stamp`/`prevList`/`nextList` + `instanceIdByIndex`, suppression du `Set` alloué à chaque appel. Le diff logique existe déjà ; on attaque seulement son overhead. | `v2-engine.js:561-575`, `:212-213` | **−0,05 à −0,3 ms par mouvement de caméra** et moins de GC. Impact faible sur le fps brut, mais c'est le levier propre pour « ne toucher que les instances qui changent ». | Moyen |
| **5** | **Ombres conditionnelles cohérentes + sol masqué** (§3.4) : supprimer l'écrasement `840`/`849`, un seul état `enabled`/`castShadow`/`ground.visible`, un `needsUpdate` unique après réactivation, critère distance/isolement plutôt que `visibleCount`. | `v2.html:234-236, 270-276, 835, 840, 843-849` | **~0,1–0,3 ms** en vue corps entier (draw call transparent du sol en moins) ; surtout **évite un doublement de la géométrie (~+1,12 M tris)** si la passe d'ombre se réactive pendant une animation. Gain surtout en robustesse/correctitude. | Faible |

**Hors classement (gain potentiel plus élevé, effort élevé) :** un LOD « proxy » (~100 tris
par structure au lieu de ~300 en `low`) ramènerait 1,12 M → ~200–300 k triangles en vue
corps entier, soit un gain potentiel de **×2 à ×4** sur le rastériseur logiciel. Cela
nécessite une nouvelle ressource 3D (`scripts/build-anatomy-v2.mjs`) et un branchement dans
`setGlobalLod()` (`v2-engine.js:743-765`). À étudier seulement après les rangs 1–3.

**À ne pas faire :** « corriger » la ligne 840 en laissant `enabled = true` en mode lourd —
ce serait réintroduire la passe d'ombre sur 2 104 instances à chaque mouvement, soit
~+100 % de géométrie, pour un bénéfice visuel nul à cette échelle.

---

## 7. Synthèse

- `updateVisibility()` **fait déjà un diff** : quelques dizaines d'appels à
  `setVisibleAt()` par mouvement de caméra, pas 2 104. Le balayage exhaustif se trouve dans
  le culling par instance de Three.js, rendu obligatoire par
  `perObjectFrustumCulled = true`.
- `setColorAt()` à la création est un coût **unique** (~34 Ko de textures de couleurs) ;
  seule l'animation « flux sanguin » le répète, jusqu'à 160 fois par frame.
- `needsUpdate = true` à `v2.html:840` est **mort** (écrasé en `:849`) ; les ombres sont
  déjà désactivées en vue corps entier (`:844`), mais le sol `ShadowMaterial` continue de
  coûter un draw call transparent sans rien apporter.
- Les textures procédurales sont générées **une seule fois** au `load()`, jamais par frame.
- `MeshPhysicalMaterial` + clearcoat + normal/roughness + `DoubleSide` est sensiblement plus
  lourd sur mobile ; un fallback `MeshStandardMaterial` est recommandé.
- **Le premier levier n'est pas dans le moteur mais dans la boucle : le palier fixe de
  1 000 ms (`v2.html:865`) plafonne le rendu réel à 1 image/s.** Tant qu'il est en place,
  aucune optimisation du moteur ne se verra à l'écran — et le HUD continuera d'afficher
  120 fps tant que `frames++` (`:874`) comptera les callbacks rAF au lieu des rendus.
