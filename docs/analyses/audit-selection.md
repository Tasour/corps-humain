# Audit du layer de sélection 3D — `v2.html` / `src/v2-engine.js`

**Objet** : sélection, survol, isolement, surbrillance et picking dans l'atlas CORPS v2.
**Périmètre** : `v2.html` (973 lignes) et `src/v2-engine.js` (984 lignes), Three.js r187.
**Méthode** : analyse statique avec numéros de lignes, complétée par une vérification runtime
(Chromium/Playwright sur `http://localhost:5199/v2.html`) pour les trois problèmes critiques.
Aucun fichier source n'a été modifié.

**Référence des concentrations de code** (les numéros de lignes ci-dessous renvoient toujours à ces deux fichiers) :

| Symbole | Fichier | Lignes |
|---|---|---|
| `buildMergedViews()` | `src/v2-engine.js` | 401–445 |
| `addTo()` | `src/v2-engine.js` | 447–454 |
| `setMergedMode()` | `src/v2-engine.js` | 457–467 |
| `pick()` | `src/v2-engine.js` | 511–523 |
| `showCollection()` | `src/v2-engine.js` | 526–541 |
| `setHover()` / `clearHover()` | `src/v2-engine.js` | 550–632 / 634–639 |
| `pickExact()` | `src/v2-engine.js` | 643–673 |
| `updateVisibility()` | `src/v2-engine.js` | 676–706 |
| `setStructureLod()` / `resetLodsToLow()` | `src/v2-engine.js` | 718–740 / 744–755 |
| `isolate()` / `showGroup()` | `src/v2-engine.js` | 758–791 / 794–810 |
| `highlight()` | `src/v2-engine.js` | 855–860 |
| `setGlobalLod()` | `src/v2-engine.js` | 882–904 |
| `clearAnimation()` | `src/v2-engine.js` | 924–936 |
| `setSkinVisible()` / `setCategoryVisible()` | `src/v2-engine.js` | 971–974 / 976–983 |
| `selectStructure()` / `focusNode()` | `v2.html` | 486–572 / 383–433 |
| Survol pointeur | `v2.html` | 445–477 |
| Clic canvas | `v2.html` | 723–748 |
| Boucle / auto-LOD | `v2.html` | 775–949 (auto-LOD : 936–940) |

---

## 0. Synthèse — tableau des défauts

| ID | Gravité | Zone | Ligne(s) | Symptôme |
|---|---|---|---|---|
| **P1** | 🔴 Critique | `pickExact`/`pick` | 644, 648–654, 520–521 ; `v2.html` 456, 747 | En vue corps entier (état initial), **plus aucun picking ni survol ne fonctionne** : tous les `batch.visible` sont à `false`. |
| **S1** | 🔴 Critique | `setMergedMode`/`isolate(null)` | 457–467, 760–777 | Après un retour à la racine, **merged meshes ET batches sont visibles en même temps** (double rendu). |
| **E1** | 🔴 Critique | `setStructureLod`/`resetLodsToLow` | 731, 745–752, 889–891 | `sourceGeometries` est écrasée par la géométrie high : `resetLodsToLow()` et `setGlobalLod('low')` ne repassent **jamais réellement en low**. |
| **H2** | 🟠 Élevé | `highlight` / `selectStructure` | 854–860 ; `v2.html` 489 | La désélection repeint l'ancien item en **blanc** au lieu de sa couleur d'origine (`colorFor`) : surbrillance permanente. |
| **P3** | 🟠 Élevé | `pickExact`/`pick` | 519–521, 648–669 | Une catégorie désactivée reste **cliquable/survolable** après retour à la racine (batch resté visible). |
| **V1** | 🟠 Élevé | `setHover` / `setGlobalLod` | 557, 598, 882–904 | Le contour de survol est construit depuis le LOD bas/stale : **il ne suit pas un LOD global medium/high**. |
| **V2** | 🟠 Élevé | `setHover` | 553, 626–627 | Le contour ignore les transformations d'instance (éclaté, mouvement, battement) : **il reste à la position de repos**. |
| **S2** | 🟡 Moyen | `isolate`/`showCollection`/`showGroup` | 530, 783, 799 vs 760–777 | `categoryEnabled` est forcé à `true` à l'isolement mais **jamais restauré** au retour à la racine. |
| **S3** | 🟡 Moyen | `setCategoryVisible` | 976–982 | Le `batch.visible` n'est mis à jour que hors merged mode : état **incohérent** quand les deux modes sont actifs (S1). |
| **S4** | 🟡 Moyen | `isolate`/`showCollection`/`showGroup` | 759, 537, 806 | `isolated` surcharge trois types hétérogènes (Structure / `{ids}` / Group) sans tag discriminant. |
| **H1** | 🟡 Moyen (latent) | `highlight` / merged meshes | 855–860, 437–438 | La couleur de sélection n'est appliquée **que sur le BatchedMesh**, jamais sur le mesh fusionné (latent aujourd'hui car `isolate()` précède toujours `highlight()`). |
| **S6** | 🟡 Moyen | `showCollection`/`showGroup` | 526–541, 793–810 | Contrairement à `isolate(null)` (l. 774), ces deux fonctions **ne réinitialisent pas les LOD** des structures promues. |
| **E2** | 🟡 Moyen | `resetLodsToLow` | 744–755 | Ne vide pas `hoverGeometryCache` : **contour périmé** après un reset de LOD. |
| **E4** | 🟡 Moyen | `resetLodsToLow` | 754 | Force `globalLod = 'low'` même quand la géométrie réelle est medium/high. |
| **E5** | 🟡 Moyen | `clearHover` côté UI | `v2.html` 386, 443, 475 | La variable `hovered` n'est pas remise à `null` quand l'UI appelle `clearHover()` : garde-fou de survol périmé. |
| **H3** | 🟡 Moyen | groupes / arborescence | `v2.html` 592–620 | Le handler de groupe **ne nettoie pas `selected`/`highlight`** : libellé et surbrillance d'une structure restent affichés. |
| **V4** | 🔵 Faible | `setHover` | 550 | Paramètre `activeGeometry` jamais utilisé par aucun appelant (code mort). |

---

## 1. `highlight()` — application de la couleur de sélection

### 1.1 Mécanisme exact

```js
// src/v2-engine.js : 854–860
highlight(structure, color = "#ffffff") {
  if (!structure) return;
  const ref = this.structureToInstance.get(structure._index);
  const batch = ref && this.batches.get(ref.category);
  if (batch) batch.setColorAt(ref.instanceId, new THREE.Color(color));
}
```

- La couleur est écrite dans la **texture d'instances du BatchedMesh** via `BatchedMesh.setColorAt()`
  (three r187, `node_modules/three/src/objects/BatchedMesh.js:1123`), qui pose
  `_colorsTexture.needsUpdate = true` : la mise à jour GPU est donc bien effectuée, **à condition que
  le lot soit visible**.
- **La couleur par défaut n'est PAS blanche.** Le commentaire de la ligne 854 est faux : à la ligne
  `354`, chaque instance reçoit `batch.setColorAt(instanceId, new THREE.Color(colorFor(structure)))`.
  La valeur blanche n'est que l'initialisation de la texture (`_initColorsTexture`, `.fill(1)`),
  immédiatement remplacée au chargement. Valeurs réelles : os `#e6dcc9`, muscle `#a83b44`,
  artère `#b63a40`, organe `#a85f55`, etc. (`colorFor()`, lignes 19–40).
- `BatchedMesh.setColorAt()` n'écrit **que le lot**. Il n'existe aucun chemin vers
  `this.mergedMeshes`.

### 1.2 Problème H1 — sélection invisible sur le mesh fusionné

`buildMergedViews()` (l. 401–445) fabrique une géométrie fusionnée par catégorie avec un attribut
`color` **par vertex** (l. 419–426, 434) et un matériau cloné avec `vertexColors = true` (l. 437–438).
`highlight()` ne touche pas cet attribut. Donc si un item est mis en surbrillance alors que le mesh
fusionné est ce qui est affiché, la surbrillance est **invisible**.

| Élément | Détail |
|---|---|
| **Lignes** | `src/v2-engine.js` 855–860 (highlight), 437–438 (vertexColors), 450–451 (merged visible / batches cachés) |
| **Scénario** | Dans la vue corps entier, `window.__v2.highlight(window.__v2.structures[0], '#ffffff')` : aucun changement visuel. Le parcours UI évite aujourd'hui le cas car `selectStructure()` appelle `isolate()` (l. 510) **avant** `highlight()` (l. 511), et `isolate()` force `setMergedMode(false)` (l. 784). Le défaut est donc **latent mais structurel** : toute API externe (`window.__v2` est exposé, l. 967) ou tout futur appel sans isolement le révèle. |
| **Correction** | Ne jamais stocker la surbrillance dans la couleur d'instance du seul lot. Soit (a) faire précéder tout `highlight()` d'un `setMergedMode(false)`, soit (b) maintenir un `selectedId` dans le moteur et réécrire l'attribut `color` du merged mesh sur la plage de vertices de la structure (table `structureId → [vertexStart, vertexCount]` à construire dans `buildMergedViews()`), soit (c) sortir la surbrillance du pipeline de rendu de données (overlay dédié, comme `hoverScene`) pour être indépendante du mode. |

### 1.3 Problème H2 — la désélection ne restaure pas la couleur d'origine

```js
// v2.html : 489 — désélection de l'ancien item
if (selected) engine.highlight(selected, '#ffffff');
```

On repaint l'ancien item en blanc — exactement la couleur utilisée pour la sélection (l. 511).
Résultat : l'item reste **blanc indéfiniment**.

| Élément | Détail |
|---|---|
| **Lignes** | `v2.html` 489 (et 511) ; `src/v2-engine.js` 854–860, 354, 933 (`clearAnimation()` sait, lui, restaurer `colorFor(structure)`) |
| **Scénario (confirmé runtime)** | 1. Sélectionner `bone:femur-l` depuis la liste → couleur lue dans la texture = `(1, 1, 1)`. 2. Sélectionner `triceps` → la couleur du fémur reste `(1, 1, 1)` au lieu de revenir à `#e6dcc9 ≈ (0.902, 0.863, 0.788)`. Le défaut est cumulatif : après N sélections, N structures restent blanches. |
| **Correction** | Ajouter une méthode `restoreColor(structure)` qui appelle `batch.setColorAt(id, new THREE.Color(colorFor(structure)))` (identique à la l. 933), l'appeler à la l. 489 à la place de `highlight(selected, '#ffffff')`, et corriger le commentaire trompeur de la l. 854. Idéalement, faire porter l'état par le moteur : `setSelected(structure)` restaure l'ancien et colore le nouveau, ce qui évite la duplication `v2.html` ↔ moteur. |

### 1.4 Problème H3 — surbrillance et libellé périmés lors d'un changement de groupe

Le handler de groupe (`v2.html` 592–620) appelle `engine.showGroup(group)` (l. 597) **sans** remettre
`selected` à `null`, sans nettoyer `highlight()` et sans incrémenter `selectGeneration`.

| Élément | Détail |
|---|---|
| **Lignes** | `v2.html` 592–620 (handler), 835–846 (libellé `labelEl` piloté par `selected`), 532–548 (`detailTimer`) |
| **Scénario** | Sélectionner une structure (elle devient blanche, `selected` non nul), puis cliquer sur un groupe : la structure reste blanche dans la vue de groupe (si elle en est membre), le libellé flottant continue d'afficher son nom, et un `detailTimer` encore en volée peut écrire « … tris » dans `#sel-meta` alors que le panneau affiche le groupe. |
| **Correction** | Factoriser une fonction `clearSelection()` dans `v2.html` (restaure la couleur, `selected = null`, `detailStructure = null`, `++selectGeneration`, `clearTimeout(detailTimer)`, cache `labelEl`) et l'appeler au début des handlers « groupe », `focusNode()` et `isolate(null)` programmatique. |

---

## 2. `isolate()` / `showCollection()` / `showGroup()` — cohérence des états

### 2.1 Variables d'état et invariants attendus

| Variable | Déclaration | Rôle réel | Invariant souhaité |
|---|---|---|---|
| `mergedMode` | l. 213 (`true`) | modes exclusifs fused / lots | Un seul des deux modes rendu à la fois |
| `categoryEnabled` | l. 212 | masquage utilisateur par catégorie | autorité pour `batch.visible` **et** `merged.visible` |
| `isolated` | l. 224 (`null`) | `null` ou Structure ou `{ids}` ou Group | `null` ⇔ vue corps entier |
| `currentVisible` | l. 223 (`Set()`) | indices autorisés au picking | doit refléter ce qui est **réellement dessiné** |
| `batch.visible` | l. 451 (`false`) | visibilité GPU du lot | `!mergedMode && categoryEnabled !== false` |
| `merged.visible` | l. 450 (`true`) | visibilité GPU du mesh fusionné | `mergedMode && categoryEnabled !== false` |
| `skinBatch.visible` | l. 385/973 | enveloppe peau | `skinDesired && !isolated` |

### 2.2 Tableau exhaustif des états

Hypothèse : état initial `categoryEnabled = {bone:false, muscle:false, organ:true}` (`v2.html` 285),
`skinDesired = false`, `mergedMode = true`. Les catégories activées par une opération le restent.

| Opération | `mergedMode` | `merged.visible` B/M/O | `batch.visible` B/M/O | `isolated` | `currentVisible` | Peau |
|---|---|---|---|---|---|---|
| **Initial** (`addTo` + `setCategoryVisible`) | `true` | F / F / **T** | F / F / F | `null` | `∅` puis ~2041 (culling, l. 751) | F |
| `isolate(os)` — `selectStructure` | `false` | F / F / F | **T / T\* / F**\* | Structure | `{index os}` | F |
| `isolate(organe)` | `false` | F / F / F | F / F / **T** | Structure | `{index organe}` | F |
| `showCollection(ids os)` — `focusNode` | `false` | F / F / F | **T / T\* / F** | `{ids}` | `Set(members._index)` | F |
| `showGroup(bras G)` (os+muscle) | `false` | F / F / F | **T / T / F** | Group | `Set(members._index)` | F |
| `isolate(null)` — retour racine | `true` | **T / T / T** | **T / T / T** (non réinitialisés !) | `null` | tous puis culling (~324 mesurés) | `skinDesired` |

\* Le lot d'une catégorie activée mais dont toutes les instances sont masquées par `setVisibleAt(false)`
(l. 785–788) reste `visible = true` : draw call vide, sans effet visuel mais coûteux.

### 2.3 Problème S1 — double rendu après retour à la racine

`setMergedMode(enabled)` (l. 457–467) ne touche aux lots **que dans le cas `false`** :

```js
// src/v2-engine.js : 462–466
if (!this.mergedMode) {
  for (const [category, batch] of this.batches) {
    batch.visible = this.categoryEnabled?.get(category) !== false;
  }
}
```

Quand on repasse en `true` (via `isolate(null)`, l. 761), les lots restent `visible = true`, et
`isolate(null)` réactive toutes les instances (l. 766–769) puis applique le culling. Les meshes
fusionnés redeviennent visibles (l. 459–461). **Les deux représentations sont donc dessinées
simultanément.**

| Élément | Détail |
|---|---|
| **Lignes** | `src/v2-engine.js` 457–467 (surtout 462), 760–777 ; `addTo()` 450–452 |
| **Scénario (confirmé runtime)** | État initial : `merged = {organ:true}`, `batches = {organ:false}`. Sélectionner un organe puis appeler `isolate(null)` → `merged = {organ:true}`, `batches = {organ:true}`, `currentVisible = 324`. Le même corps est rendu deux fois (z-fighting, ~2× de triangles). Une fois l'état pollué, il ne se réinitialise plus jamais. |
| **Correction** | Rendre `setMergedMode` symétrique : dans la branche `true`, poser `batch.visible = false` pour toutes les catégories (et, dans la branche `false`, poser explicitement `merged.visible = false`). Alternativement, dériver les deux visibilités d'une seule fonction d'invariant appelée après chaque mutation de `categoryEnabled`/`isolated`/`mergedMode`. |

### 2.4 Problème S2 — fuite de `categoryEnabled`

`isolate()` (l. 783), `showCollection()` (l. 529–531) et `showGroup()` (l. 798–799) écrivent
`categoryEnabled.set(cat, true)` pour rendre la sélection visible — ce qui est légitime — mais
`isolate(null)` (l. 760–777) ne restaure jamais l'état initial.

| Élément | Détail |
|---|---|
| **Lignes** | `src/v2-engine.js` 529–531, 783, 798–799 vs 760–777 ; état initial `v2.html` 285 |
| **Scénario** | Au démarrage, os et muscles sont masqués. Sélectionner un fémur, puis revenir à la racine (`← Retour` de l'arborescence → `focusNode(root)` → `isolate(null)`, `v2.html` 393) : le corps entier affiche maintenant **os + muscles + organes** alors que l'utilisateur n'a jamais activé les couches Os/Muscles. Les pastilles de l'UI (`v2.html` 180–184) restent désactivées : **désynchronisation UI ↔ scène**. |
| **Correction** | Distinguer « catégorie activée par l'utilisateur » (`categoryEnabled`) d'un masquage temporaire lié à l'isolement. Ne pas écrire `categoryEnabled` dans `isolate`/`showGroup` : rendre la catégorie visible via un drapeau d'isolement (`forceCategories`), ou sauvegarder/restaurer `categoryEnabled` lors du retour à la racine, ou synchroniser les classes `active` des boutons dans le même sens. |

### 2.5 Problème S3 — `batch.visible` désynchronisé de `categoryEnabled`

`setCategoryVisible()` (l. 976–983) ne met à jour le lot **que si `mergedMode === false`** (l. 979).
Après S1, les deux modes sont actifs : désactiver une catégoriecache le merged mesh (l. 981) mais
laisse le lot visible.

| Élément | Détail |
|---|---|
| **Lignes** | `src/v2-engine.js` 976–983 (l. 979), 457–467 |
| **Scénario** | Sélectionner un organe, revenir à la racine, puis cliquer sur « Os » pour le désactiver (l'UI bascule `button.active`, `v2.html` 654–660) : le merged mesh os disparaît, mais le lot os reste dessiné et reste pickable (voir P3). |
| **Correction** | Toujours écrire les deux visibilités : `batch.visible = !!visible && !this.mergedMode` et `merged.visible = !!visible && this.mergedMode`, indépendamment de l'état courant, puis forcer un rendu (la signature de rendu `v2.html` 871–881 inclut déjà `batch.visible` mais **pas** `merged.visible` — à ajouter). |

### 2.6 Problème S4 — `isolated` polymorphe

`isolated` reçoit successivement une Structure (l. 759), un objet `{ ids }` (l. 537) ou un Group
(l. 806). Les consommateurs ne testent que la vérité (l. 519, 678, `v2.html` 773, 782), ce qui
fonctionne aujourd'hui, mais aucune logique ne peut discriminer le type sans `instanceof`/`duck typing`.

| Élément | Détail |
|---|---|
| **Lignes** | `src/v2-engine.js` 537, 759, 806, 519, 678 ; `v2.html` 773, 782–790 |
| **Scénario** | Toute nouvelle fonctionnalité qui doit distinguer « un item » d'« un bloc » (ex. : cadrage spécifique, LOD différent) doit deviner le type. Risque de régression silencieuse. |
| **Correction** | Normaliser en `this.isolated = { type: 'structure' \| 'collection' \| 'group', ids, structure }` ou `null`, avec un getter `get isIsolated()`. |

### 2.7 Problème S6 — LOD non réinitialisés lors des changements de vue

`isolate(null)` appelle `resetLodsToLow()` (l. 774). `showCollection()` (l. 526–541) et `showGroup()`
(l. 793–810) ne le font pas.

| Élément | Détail |
|---|---|
| **Lignes** | `src/v2-engine.js` 526–541, 774, 793–810 ; `v2.html` 426–432 (promotion des 20 premiers d'un bloc) |
| **Scénario** | Depuis une structure en LOD high, cliquer sur un groupe : la structure promue reste en high dans son lot (si elle n'est pas membre, elle est juste masquée par `setVisibleAt`). Le coût mémoire/GPU reste engagé jusqu'au prochain retour à la racine. |
| **Correction** | Appeler une unique `switchView()` qui, avant toute nouvelle sélection, dépromouvoit les structures promues et réinitialise l'état de survol. (À combiner avec la correction E1, sinon la dépromotion est inefficace.) |

### 2.8 Comportements corrects à conserver

- `isolate(structure)` masque bien la peau (l. 782) et n'autorise qu'une instance (l. 785–789), avec
  `currentVisible = {structure._index}` (l. 789) : le picking d'items masqués est correctement bloqué.
- `updateVisibility()` (l. 676–706) ne recalcule plus rien tant que `isolated` est non nul (l. 678) :
  le culling est intentionnellement suspendu en vue isolée, `currentVisible` reste la source de vérité.
- `showCollection()` et `showGroup()` posent tous deux `skinBatch.visible = false` (l. 539, 808).

---

## 3. `setHover()` — synchronisation du contour avec la géométrie affichée

### 3.1 Mécanisme exact

`setHover(structure, activeGeometry = null)` (l. 550–632) :

1. `clearHover()` (l. 551) ;
2. source = `activeGeometry || sourceGeometries.get(structure.id)` (l. 553) ;
3. cache **clé uniquement par `structure.id`** (l. 557, 598), limité à 20 entrées (l. 17, 600–604) ;
4. clone de la source, expansion radiale de ~1,5 % autour du centre de la bounds (l. 565–596) ;
5. material `BackSide` cyan, translation au centre de la structure (l. 616–627).

`structure.bounds` provient du manifest (champ `bounds` de chaque structure, voir
`scripts/build-anatomy-v2.mjs:340`) ; il est statique, indépendant du LOD.

### 3.2 Problème V1 — le contour ne suit pas un LOD global

`setStructureLod()` (l. 718–740) fait correctement deux choses pour le survol : il remplace
`sourceGeometries[id]` par la géométrie promue (l. 731) et **invalide** le cache (l. 732).
`setGlobalLod()` (l. 882–904), lui, remplace la géométrie de **toutes** les structures du lot
(l. 887–896) mais **ne touche ni à `sourceGeometries`, ni à `hoverGeometryCache`**, et ne met pas à
jour `structure._activeLod` de façon cohérente avec le contour.

| Élément | Détail |
|---|---|
| **Lignes** | `src/v2-engine.js` 553, 557, 598, 731–732, 882–904 ; `v2.html` 936–940 (auto-LOD après 4 s) |
| **Scénario** | Laisser la page 4 s sur desktop rapide : `setGlobalLod('medium')` (l. 939). Le lot affiche medium, mais `sourceGeometries` contient encore le low. Un survol d'une structure dont le lot est medium construit un contour à partir du low (moins de triangles, silhouette plus grossière) : le liseré ne colle pas à l'item. Le défaut est aggravé par E1 (après une promotion high, `sourceGeometries` contient du high alors que `_activeLod` dit `low`). |
| **Correction** | (a) Clé de cache incluant le LOD : `${structure.id}:${structure._activeLod}` ; (b) dans `setGlobalLod()`, mettre à jour `sourceGeometries` (ou une carte dédiée `hoverSource`) et appeler `hoverGeometryCache.clear()` + `clearHover()` ; (c) faire de `setStructureLod()` et `setGlobalLod()` deux chemins convergents vers une seule méthode `applyLod(structure, geometry, lod)`. |

### 3.3 Problème V2 — le contour ignore les transformations d'instance

Le contour est construit dans le repère local de la géométrie source puis simplement translaté au
centre de la structure (l. 626–627). Or les instances subissent des matrices via
`animateGroup()` (l. 813–843 : éclaté/mouvement) et `updateAnimation()` (l. 938–969 : battement,
respiration, clignement). Le `hoverMesh` n'hérite d'aucune de ces matrices.

| Élément | Détail |
|---|---|
| **Lignes** | `src/v2-engine.js` 553, 626–627, 813–843, 938–969 |
| **Scénario** | Cliquer sur « Membre supérieur gauche », puis « Éclater », puis survoler l'humérus : les vertices de l'instance sont décalés de `0.18·t` (l. 835–836) alors que le contour reste à sa position de repos. Le liseré apparaît à côté de l'os, pas autour. Idem pour « Mouvement » (rotation l. 824–827) et « Battement cardiaque ». |
| **Correction** | Récupérer la matrice d'instance (`batch.getMatrixAt(ref.instanceId, matrix)`) et l'appliquer au `hoverMesh` : `mesh.matrixAutoUpdate = false; mesh.matrix.copy(matrix);` (la géométrie du contour est déjà en coordonnées locales recentrées sur l'origine, l. 597 ; la translation au centre doit être incorporée dans la matrice, p. ex. `matrix.multiply(new THREE.Matrix4().makeTranslation(center.x, center.y, center.z))`). Mettre à jour le contour à chaque frame d'animation si le survol reste actif. |

### 3.4 Problème V4 — paramètre `activeGeometry` mort

`activeGeometry` (l. 550) n'est fourni par aucun appelant : ni `v2.html` (l. 459), ni le moteur.
La double source (`activeGeometry || sourceGeometries`) est donc illusoire.

| Élément | Détail |
|---|---|
| **Lignes** | `src/v2-engine.js` 550, 553 ; `v2.html` 459 |
| **Scénario** | Aucun. Dette technique : la correction V1 doit décider quelle source est autoritative. |
| **Correction** | Supprimer le paramètre, ou l'utiliser réellement depuis `setStructureLod()` pour passer directement la géométrie promue (évitant l'écrasure de `sourceGeometries`, voir E1). |

### 3.5 Observation — survol sans contour

Pour les structures « nappes » (l. 606–615), `setHover()` retourne sans créer de `hoverMesh`, mais
`v2.html` (l. 462–467) affiche tout de même le curseur `pointer` et l'étiquette. Ce comportement est
documenté dans le commentaire (l. 613–615) : l'étiquette suffit à identifier l'item. À conserver,
mais à signaler dans l'UI (ex. : pastille « contour désactivé ») pour éviter l'illusion d'un bug.

---

## 4. `pickExact()` / `pick()` — picking d'items masqués, cas des meshes fusionnés

### 4.1 Problème P1 — picking et survol morts en vue corps entier (CRITIQUE)

```js
// src/v2-engine.js : 644, 648–654
if (!this.batches.size) return null;
const targets = [];
for (const [category, batch] of this.batches) {
  if (batch?.visible) { targets.push(batch); byBatch.set(batch, category); }
}
if (!targets.length) return null;
```

`addTo()` (l. 451) met **tous** les lots à `visible = false` au démarrage. `pickExact()` n'a donc
aucune cible. `pick()` (l. 520–521) applique le même filtre `if (batch && !batch.visible) return null`
et échoue également.

| Élément | Détail |
|---|---|
| **Lignes** | `src/v2-engine.js` 451, 644, 648–654, 520–521 ; `v2.html` 456 (survol), 747 (clic) |
| **Scénario (confirmé runtime)** | Page fraîchement chargée : `pickTargets = 0`. Un clic au centre du corps ne change pas `#sel-name` (« Cliquez sur une structure »), et un `pointermove` au même endroit ne produit ni étiquette ni contour. Le picking ne devient actif qu'**après** une première sélection depuis la liste/l'arborescence (qui appelle `isolate()` → `setMergedMode(false)`). Le test `v2-tests.mjs:267–280` ne couvre que le cas post-isolement et ne détecte donc pas le défaut. |
| **Correction** | Ne faire dépendre le picking que de l'**autorité logique**, pas de la visibilité GPU : (a) dans `pickExact()`, si `targets.length === 0`, requir `pick(raycaster)` (BVH WASM) ; (b) dans `pick()`, remplacer le test `batch.visible` par `categoryEnabled.get(category) === false → null` et conserver le garde-fou `isolated && !currentVisible.has(...)` ; (c) appliquer le même repli dans le handler de survol `v2.html` 456. Ajouter un test « clic sur le corps au chargement ». |

### 4.2 Problème P3 — picking d'une catégorie désactivée

`pickExact()` vérifie `currentVisible` (l. 669) et la visibilité du lot, mais **pas**
`categoryEnabled`. `pick()` vérifie `batch.visible` (l. 521) mais pas `categoryEnabled` non plus.
Combinés à S1 et S3 (lots restés visibles après retour à la racine), cela permet de sélectionner un
item dont la couche est désactivée dans l'UI.

| Élément | Détail |
|---|---|
| **Lignes** | `src/v2-engine.js` 519–521, 648–669, 976–982 ; `v2.html` 654–660 |
| **Scénario** | Sélectionner un organe → retour à la racine (`isolate(null)`) → désactiver « Os » (bouton non `active`) → survoler/cliquer un os : le lot os est resté `visible = true` (l. 979 non exécutée en merged mode), `currentVisible` contient l'os après culling, donc `pickExact()` le renvoie et le contour cyan + l'étiquette apparaissent alors que l'os n'est pas affiché dans le merged mesh. |
| **Correction** | Ajouter dans les deux fonctions : `if (this.categoryEnabled.get(structure.category) === false) continue;` (pickExact, avant le `return` l. 670 ; pick, avant le `return` l. 522) et corriger `setCategoryVisible()` selon S3. |

### 4.3 Cas des merged meshes — pas d'`instanceId`, contournement par le BVH

`pickExact()` n'inclut volontairement pas les meshes fusionnés dans `targets` (l. 648). Un raycast
sur `THREE.Mesh` renverrait `faceIndex` mais ni `batchId` ni `instanceId` (l. 659–663) : il serait
impossible de remonter à la structure. Le moteur s'appuie donc sur :

- `pickExact()` pour le **triangle-exact** sur les lots (quand ils sont visibles) ;
- `pick()` (l. 511–523) pour le **BVH AABB** WASM (`index.raycast`, l. 515), seul capable de
  fonctionner sur la vue fusionnée — mais aujourd'hui bloqué par le test `batch.visible` (P1).

| Élément | Détail |
|---|---|
| **Lignes** | `src/v2-engine.js` 439–443 (merged), 511–523 (pick BVH), 643–673 (pickExact lots), 659–663 (`batchId ?? instanceId`) |
| **Scénario** | Vue corps entier : même après correction de P1, `pick()` reste approximatif (AABB) : dans une zone dense (p. ex. thorax), le BVH peut renvoyer une structure dont la boîte est traversée mais dont la surface réelle est derrière une autre. `v2.html` 747 utilise `pickExact() || pick()`: le fallback n'est activé que lorsque le lot est invisible, donc l'approximation est précisément celle qui reste en vue corps entier. |
| **Correction** | Option minimale : accepter l'approximation en vue fusée et la documenter (le commentaire l. 641–642 le fait déjà). Option robuste : construire dans `buildMergedViews()` une table `faceStart → structureId` pendant l'accumulation des index (l. 427), puis un `pickMerged(raycaster)` qui convertit `hit.faceIndex` en structure. On obtient alors un picking exact dans **tous** les modes sans dépendre de `batch.visible`. |

### 4.4 Comportement correct — items masqués par isolement

Les deux garde-fou suivants fonctionnent et doivent être conservés :

- `pick()` l. 519 : `if (this.isolated && !this.currentVisible.has(structure._index)) return null;`
- `pickExact()` l. 669 : `if (!this.currentVisible.has(structure._index)) continue;`

Ils empêchent de sélectionner une structure masquée par `isolate()`/`showGroup()`/`showCollection()`.
Le test `v2-tests.mjs:267–280` (« clic sur zone masquée ne change pas la sélection ») valide ce cas.

---

## 5. `clearHover()`, `resetLodsToLow()`, `setStructureLod()` — effets de bord sur la sélection

### 5.1 Tableau des effets de bord

| Fonction | Lignes | Effet sur la sélection | Effet sur le survol | Effet sur le LOD | Anomalie |
|---|---|---|---|---|---|
| `clearHover()` | 634–639 | aucun | retire `hoverMesh` du `hoverScene`, **dispose le matériau**, garde la géométrie en cache | aucun | OK (cache volontaire), mais voir E5 |
| `resetLodsToLow()` | 744–755 | aucun (couleur conservée) | **ne vide pas** `hoverGeometryCache` | repasse chaque structure à `sourceGeometries[id]` + `globalLod='low'` | **E1 + E2 + E4** |
| `setStructureLod()` | 718–740 | aucun | invalide le cache de la structure (l. 732), **écrit** `sourceGeometries[id]` (l. 731) | remplace la géométrie du lot, annule boundingBox/Sphere, pose `_activeLod` | **E1** (écrasement de la source basse) |
| `setGlobalLod()` | 882–904 | aucun | **aucune invalidation** | remplace toutes les géométries du lot | **V1** (contour périmé) |
| `clearAnimation()` | 924–936 | **restaure** `colorFor(structure)` (l. 933) — le seul chemin correct | aucun | aucun | Contraste avec H2 : la logique de restauration existe déjà ici |

### 5.2 Problème E1 — `sourceGeometries` écrasée (CRITIQUE)

`sourceGeometries` est initialisée au chargement avec la géométrie **basse** (l. 356 :
`this.sourceGeometries.set(structure.id, structure._geometry)` où `_geometry` vient du LOD
`this.lod = 'low'`, l. 271/276). Son commentaire de rôle est « géométrie source » (l. 221) et
`resetLodsToLow()` (l. 742–743) dit explicitement « géométrie source (LOD bas) ».

Or `setStructureLod()` fait :

```js
// src/v2-engine.js : 728–732
batch.setGeometryAt(structure._geometryId, geometry);          // high
this.sourceGeometries.set(structure.id, geometry);             // ÉCRASE le low
this.hoverGeometryCache.delete(structure.id);
```

Conséquences :

- `resetLodsToLow()` (l. 745–752) relit la géométrie **high** et la réapplique au lot tout en posant
  `_activeLod = 'low'` : mensonge d'état, coût GPU conservé.
- `setGlobalLod('low')` (l. 889–891) puise dans la même carte : il applique du high en croyant
  appliquer du low.

| Élément | Détail |
|---|---|
| **Lignes** | `src/v2-engine.js` 221, 271, 276, 356, 728–732, 745–752, 889–891 |
| **Scénario (confirmé runtime)** | Sur `Artère hépatique commune` : `sourceGeometries.vertexCount = 2709` (low). Après `setStructureLod(s,'high')` : `4260`. Après `resetLodsToLow()` : **4260 toujours**, avec `_activeLod = 'low'`. Le reset est inefficace. |
| **Correction** | Séparer les deux responsabilités : `baseGeometries` (immuable, low, utilisée par `resetLodsToLow` et `setGlobalLod('low')`) et `hoverSourceGeometries` (suit la géométrie affichée, utilisée par `setHover`). `setStructureLod()` n'écrit que la seconde et le cache de contour ; `resetLodsToLow()` et `setGlobalLod()` lisent la première. Variant minimal : dans `setStructureLod()`, passer la géométrie promue via `setHover(structure, geometry)` et ne pas écrire `sourceGeometries` du tout (nécessite de decorator l'appelant pour rafraîchir le survol courant). |

### 5.3 Problème E2 — cache de contour non invalidé par `resetLodsToLow()`

`resetLodsToLow()` modifie les géométries de lots (l. 751) mais ne touche ni à `hoverGeometryCache`
ni au `hoverMesh` courant. Si l'utilisateur survole une structure au moment où `isolate(null)` est
déclenché (par un clic dans l'arborescence, `v2.html` 386 → 393), le contour reste construit sur
l'ancienne géométrie.

| Élément | Détail |
|---|---|
| **Lignes** | `src/v2-engine.js` 744–755 vs 732 ; `v2.html` 386–393 |
| **Scénario** | Survoler une structure en high → cliquer « ← Retour » : `isolate(null)` → `resetLodsToLow()` ; le `hoverMesh` reste plaqué sur la silhouette high alors que le lot (théoriquement) repasse low. |
| **Correction** | Appeler `this.clearHover(); this.hoverGeometryCache.clear();` en fin de `resetLodsToLow()` (et de `setGlobalLod()`), puis forcer `needsRender = true` côté `v2.html`. |

### 5.4 Problème E4 — `globalLod` forcé à `low`

La ligne 754 pose `this.globalLod = "low"` inconditionnellement, même si `setGlobalLod('medium')`
avait été appliqué plus tôt (l. 939) et que la géométrie réelle du lot est medium.

| Élément | Détail |
|---|---|
| **Lignes** | `src/v2-engine.js` 754, 882–904 ; `v2.html` 936–940, 945 (affichage HUD `LOD ${engine.globalLod}`) |
| **Scénario** | Auto-LOD medium après 4 s → sélection d'un item → retour à la racine : le HUD affiche « LOD low » alors que les lots sont medium/high (cumul avec E1). L'appel suivant à `setGlobalLod('medium')` est court-circuité par le garde `globalLod === lod` (l. 883) : **le LOD ne peut plus être corrigé**. |
| **Correction** | Ne modifier `globalLod` que si la géométrie a effectivement été remplacée, et suivre le LOD **par structure** (`structure._activeLod`) plutôt qu'un global unique. Le HUD doit afficher un état dérivé des `_activeLod` réels. |

### 5.5 Problème E5 — variable `hovered` périmée dans `v2.html`

`v2.html` garde `let hovered = null` (l. 443) comme garde anti-raycast redondant (`if (structure !== hovered)`, l. 457). Deux chemins appellent `engine.clearHover()` **sans** remettre cette variable à `null` :

- `focusNode()` l. 386 (navigation arborescente) ;
- tout appel programmatique à `window.__v2.isolate(null)` (tests, l. 115/197/210/… de `v2-tests.mjs`) qui ne repasse pas par le handler de survol.

Le handler `pointerleave` (l. 473–477), lui, remet bien `hovered = null` (l. 474).

| Élément | Détail |
|---|---|
| **Lignes** | `v2.html` 443, 457, 386, 473–477 ; `src/v2-engine.js` 634–639 |
| **Scénario** | Survoler une structure A, puis cliquer sur un nœud de l'arborescence sans bouger le pointeur : `focusNode()` efface le contour et le libellé, mais `hovered === A`. Tant que le pointeur reste sur A, le prochain `pointermove` (si la structure redevient A) ne déclenche pas `setHover()` : **aucun contour ne revient**. |
| **Correction** | Extraire `function clearHoverUi() { hovered = null; engine.clearHover(); hoverLabel.style.display='none'; renderer.domElement.style.cursor='grab'; }` et l'appeler en l. 386, l. 475 et dans toute transition de vue. |

---

## 6. Matrice finale « mode de rendu × picking »

| Mode de rendu | Lots visibles | Merged visibles | `pickExact()` | `pick()` | Survol fonctionnel |
|---|---|---|---|---|---|
| **Initial** (corps entier) | ✗ | ✓ (catégories activées) | ✗ (0 cible) — **P1** | ✗ (`batch.visible` false) — **P1** | ✗ — **P1** |
| **Après `selectStructure`** (isolement) | ✓ | ✗ | ✓ (triangles exacts) | ✓ (mais masqué par P1 non déclenché) | ✓ (contour correct pour l'item promu) |
| **Après `showCollection` / `showGroup`** | ✓ | ✗ | ✓ | ✓ | ✓ (sauf V2 si animation de groupe) |
| **Après `isolate(null)`** (retour racine) | ✓ (**S1**) | ✓ | ✓ mais **P3** (catégories off sélectionnables) | ✓ mais **P3** | ✓ mais contour **V1** |

---

## 7. Plan de correction priorisé

| Priorité | Actions | Lignes concernées |
|---|---|---|
| **P0 — bloquant** | P1 : découpler le picking de `batch.visible`, repli BVH dans `pickExact` et dans le handler de survol ; test « clic au chargement ». | `v2-engine.js` 451, 519–521, 648–654 ; `v2.html` 456, 747 |
| **P0 — bloquant** | S1 : rendre `setMergedMode(true)` symétrique (masque les lots) ; ajouter `merged.visible` à la signature de rendu. | `v2-engine.js` 457–467, 760–777 ; `v2.html` 871–881 |
| **P0 — bloquant** | E1 : séparer `baseGeometries` de `hoverSourceGeometries` ; corriger `resetLodsToLow()` et `setGlobalLod('low')`. | `v2-engine.js` 221, 356, 728–732, 745–752, 889–891 |
| **P1** | H2/H3 : `restoreColor()` + `clearSelection()` centrale, appelée à la désélection et aux changements de vue. | `v2.html` 489, 511, 592–620, 383–393 ; `v2-engine.js` 854–860 |
| **P1** | P3/P4 : filtre `categoryEnabled` dans `pick`/`pickExact`, correction S3, éventuel `pickMerged()` avec LUT `faceIndex → structure`. | `v2-engine.js` 519–521, 648–669, 976–983, 439–443 |
| **P1** | V1/V2/V4 : cache de contour clé par LOD, invalidation dans `setGlobalLod`, application de la matrice d'instance au `hoverMesh`. | `v2-engine.js` 550, 553, 557, 598, 626–627, 882–904 |
| **P2** | S2/S4/S6/E2/E4/E5 : restaurer `categoryEnabled`, typer `isolated`, factoriser `switchView()`, vider le cache au reset, LOD par structure, `clearHoverUi()`. | cf. tableaux §2, §5 |

---

## 8. Limites de l'audit

- L'analyse couvre le layer de sélection uniquement ; le culling BVH, les textures PBR et le budget
  de rendu ne sont examinés que lorsqu'ils intersectent la sélection (LOD, visibilité).
- La vérification runtime a été menée sur Chromium en viewport 1360×880, sans test mobile spécifique
  du survol (le tactile ne déclenche pas `pointermove` de la même façon ; `v2.html` 445).
- Les lignes citées correspondent au contenu des fichiers au moment de l'audit ; toute modification
  de `v2.html` ou `src/v2-engine.js` doit les revalider.
