# Passe de correction — fusion Z-Anatomy + BodyParts3D et couche de sélection

Date : 18 novembre 2026 · Jeu de données : **2 039 structures** (Z-Anatomy 1 435 + BodyParts3D)
· Tests : **30/30** (`npm run test:v2`), **0 collision** (`npm run test:collisions`),
**0 anomalie** (`tests/coherence-modeles.mjs`).

Cette passe corrige les défauts introduits par la fusion de deux bases de modèles 3D et par
la couche de sélection/surbrillance. Chaque correction est adossée à une mesure reproductible.

## 1. Données : incohérences de fusion

| # | Défaut | Correction | Preuve |
|---|---|---|---|
| 1 | 8 paires gauche/droite mélangeaient Z-Anatomy et BodyParts3D (cause : `bpTris > zTris` évalué **par côté**) | Décision prise **par paire** ; les 8 paires utilisent Z-Anatomy des deux côtés | `coherence-modeles.mjs` → `source-pair : 0` |
| 2 | 4 artères avaient un suffixe d'ID `-l/-r` contredisant le nom TA2 | Fragments contradictoires masqués (`HIDDEN_IDS`), artère complète conservée | `ta2-name-side : 0` |
| 3 | 5 doublons inter-sources (corps spongieux, méso-appendice, 3 ténias) | Version Z-Anatomy conservée, doublon BodyParts3D masqué | `duplicate-fr-source : 0` |
| 4 | **Intestin grêle absent** : la règle « agrégat = plus de 20 pièces » excluait un vrai organe (54 morceaux) | Filtre par **nom d'agrégat** (`system`, `mediastinum`, `head`, `liver`…), plus par nombre de pièces | `organ:bp-small-intestine` présent, 16 380 triangles |
| 5 | Concepts FMA dupliqués (`small intestine` / `zone of small intestine`, artères en 3 variantes) | Déduplication par `(nom, côté)` avec préférence Z-Anatomy ; `HIDDEN_IDS` appliqué avant | 0 groupe de noms dupliqué |
| 6 | 13 branches parallèles dans l'explorateur (« Appareil digestif » en double, « Squelette (BodyParts3D) », « Musculature (BodyParts3D) »…) | Table `BP3D_CANONICAL` + canonicalisation des labels Z-Anatomy redondants | « Appareil digestif » : **1 nœud, 43 structures** (avant : 9 + éclats) |

## 2. Couche de sélection et de rendu

| # | Défaut | Correction | Preuve runtime |
|---|---|---|---|
| 7 | **Picking mort au démarrage** : tous les lots `visible=false` en vue fusionnée → aucun clic ni survol | `pickMerged()` : raycast sur les meshes fusionnés + carte vertex → structure (`mergedVertexMap`) | survol « Grand omentum », clic sélectionne |
| 8 | **Double rendu** au retour à la racine : meshes fusionnés **et** lots dessinés | `setMergedMode()` masque explicitement l'autre mode | 1 mesh fusionné visible, 0 lot |
| 9 | **LOD jamais réinitialisé** : `sourceGeometries` écrasée par `setStructureLod()` | Map `baseGeometries` immuable ; `resetLodsToLow()` et `setGlobalLod('low')` s'appuient dessus | fémur : 1 899 → **152** sommets |
| 10 | **Sélection invisible en vue fusionnée** (pas d'`instanceColor` sur un `Mesh`) | `highlight()` repeint la plage de vertices de la structure ; `highlight(s, null)` restaure `colorFor()` | blanc → couleur anatomique |
| 11 | Désélection repeinte en blanc | `v2.html` appelle `highlight(prev, null)` (sélection **et** retour hiérarchique) | couleur d'origine restaurée |

## 3. Couleurs : deux bases, deux conventions

`colorFor()` ne lit plus `materials` pour BodyParts3D (497/606 vides, 109 hérités et faux) et
applique un ordre de priorité strict : **vaisseau nommé → organe nommé → os nommé →
cartilage/tendon → sous-système normalisé → catégorie**.

| Cas signalé par l'audit | Avant | Après |
|---|---|---|
| Artère spinale antérieure | couleur nerf | artère `#b63a40` |
| Tronc pulmonaire | couleur poumon | artère `#b63a40` |
| Lobe droit du foie (`subsystem=arterial`) | couleur artère | foie `#83423a` |
| Tentorium cerebelli | cartilage (matériau hérité) | méninge `#cbb06a` |
| Viscerocranium (os classé organe) | organe générique | os `#e6dcc9` |
| Patella | cartilage | os `#e6dcc9` |
| Rétine / retinaculum | rétine par sous-chaîne | rétine `#d9b36a` / tendon `#d8c9a8` |
| Uretère, rectum, langue, pharynx… | organe générique | teintes dédiées |

Résultat mesuré : **2 structures** seulement conservent la teinte organe générique
(les deux lobes hypophysaires, désormais rattachés aux glandes).

## 4. Séreuses opaques

Le grand omentum, le péritoine viscéral et le mésentère masquaient tout l'abdomen : on croyait
les intestins absents. Ils sont désormais fusionnés dans un mesh **translucide séparé**
(opacité 0,15, `depthWrite=false`, sans ombre portée), sans changer le picking ni la sélection.

## 5. Captures de contrôle

`tests/screens-groupes.mjs` produit **29 groupes × 4 orientations = 116 captures** dans
`docs/analyses/screens-groupes/` (plus les planches 2×2 dans `planches/`). Les groupes sont
ceux de l'interface (`src/data/groups.js`) et de l'explorateur (`src/data/hierarchy.js`) —
plus aucun filtre de coordonnées qui faisait apparaître des avant-bras dans l'abdomen.

## 6. Reste ouvert

- Le mésentère Z-Anatomy est découpé en éclats (géométrie source partielle) : visible comme
  un voile fragmenté, sans solution côté rendu.
- Intestin grêle : un seul modèle BodyParts3D (54 morceaux), pas de version Z-Anatomy.
- Chantiers 2 (PBR réels), 4 (cinématiques), 5 (waypoints), 7 (fusion v1/v2), 8 (accessibilité).
