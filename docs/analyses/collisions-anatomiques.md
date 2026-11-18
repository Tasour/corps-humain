# Audit systémique des collisions anatomiques visibles

**Date :** 2026-11-18  
**Périmètre :** analyse statique de `public/models/v2/manifest.json` (v2.0, généré le 2026-11-18) et `docs/inventaire-anatomique/structures.json` (généré le 2026-11-17). Aucun rendu ni modification du code moteur : les chiffres ci-dessous sont reproductibles par simple parcours des AABB et du maillage de peau inliné.

## 1. Jeu de données et convention

| Propriété | Valeur |
|---|---|
| Structures du manifest | **2 104** (organe 1 082, muscle 697, os 325) |
| Inventaire source | **2 202** entrées (os 359, muscle 702, organe 1 141) |
| Agrégats exclus (`excludedAggregates`) | 98 → 2 202 − 98 = 2 104 ✔ |
| Sources | Z-Anatomy 1 442 ; BodyParts3D 4.0 662 |
| Côtés | 883 droit, 882 gauche, 339 non latéralisés |
| Enveloppe cutanée (union des LOD) | x ∈ [−0,3333 ; 0,3320], y ∈ [0 ; 1,7194], z ∈ [−0,1452 ; 0,1467] m |
| Maillage peau `high` | 6 495 sommets, 12 000 triangles, **926 arêtes frontières (maillage ouvert)** |

Convention de coordonnées vérifiée : **Y = vertical** (0 → 1,72 m), **X = latéral, gauche = +X**, Z = antéro-postérieur. Le corps est en **T-pose** : aux étages y ∈ [0,70 ; 0,90] les bras atteignent x = ±0,333 m ; il n'existe **aucun sommet de peau à |x| > 0,20 m sous y = 0,65 m**. Le maillage cutané ne modélise donc pas les doigts isolément (1 689 sommets seulement pour l'ensemble des deux bras + mains au LOD high).

## 2. Catégorie A — structures hors enveloppe cutanée

**Deux tests, deux résultats très différents :**

| Test | Résultat | Interprétation |
|---|---|---|
| AABB vs boîte englobante de la peau (tolérance 5 mm cumulés) | **0 / 2 104** dépassement ; excursion maximale **2,1 mm** (extrémité du pouce, x = −0,3354 vs −0,3333) | Aucune erreur de coordonnées brute |
| Silhouette logicielle (rasterisation des 12 000 triangles, grille 3 mm, vues face et profil, 8 coins + centre de l'AABB) | **362 structures à > 87,5 %** des points hors silhouette, **527 à > 50 %**, dont 124 préfixées `bp-` | Défaut de couverture de la peau, pas des organes |

Parmi les 960 structures vasculaires/ nerveuses (sous-systèmes `arterial`, `venous`, `Cardiovasculaire`, `Lymphoïde`, `lymphatic`, `cardiac`, `Nerveux et sens`, `nervous`, `sensory`), **136 (14,2 %) sont à > 50 % hors silhouette** : 78 artères, 31 veines, 24 ganglions lymphatiques, 3 sensoriels. Exemples : `organ:bp-brachial-artery-l/-r`, `organ:bp-cephalic-vein-l`, `organ:bp-anterior-tibial-artery-l`, `organ:apical-axillary-nodes-l`, `organ:bp-arteria-princeps-pollicis-l`.

**Verdict :** les « vaisseaux qui dépassent des mains » ne sont pas des vaisseaux mal placés. Ce sont des vaisseaux **correctement positionnés dans des doigts que le maillage de peau ne représente pas** (926 arêtes ouvertes + absence de géométrie digitale). C'est une erreur de *couverture/LOD de la peau*, pas une erreur de données anatomiques. Correctif : garder les vaisseaux, remplacer ou densifier le maillage cutané dans la zone y ∈ [0,69 ; 0,80], |x| > 0,22.

## 3. Catégorie B — vaisseaux/nerfs traversant des organes

| Métrique | Valeur |
|---|---|
| Chevauchements AABB vaisseau/nerf × parenchyme (> 2 % du plus petit volume) | **1 327** |
| Vaisseaux distincts concernés | **374** |
| Cibles parenchymateuses testées | 31 |
| Chevauchements « côté croisé » (> 5 %) | **9** |
| Paires parenchyme/parenchyme > 20 % | **74** |

**Imbrication NORMALE (à conserver).** Un AABB de vaisseau est un tube fin inclus dans un gros AABB d'organe : artère coronaire dans le myocarde, artère rénale dans `organ:kidney-r`, artère hépatique dans `organ:bp-left-lobe-of-liver`, plexus dans `organ:stomach`. Le chevauchement AABB y est attendu et même obligatoire. Les 1 327 cas sont donc une **borne haute**, pas un compte d'erreurs : le test AABB ne connaît ni la lumière vasculaire ni la surface réelle.

**Vraies erreurs.** Les 9 cas « côté croisé » impliquent tous `organ:bp-left-lobe-of-liver-l`, dont l'AABB x ∈ [−0,087 ; +0,057] traverse la ligne médiane alors que l'ID porte le suffixe `-l` et `side: left` : `organ:bp-common-hepatic-artery-r`, `organ:bp-hepatic-portal-vein-r`, `organ:bp-musculophrenic-artery-r`, `organ:bp-right-gastric-artery-r`, `organ:bp-right-hepatic-artery-r`, `organ:bp-right-hepatic-vein-r`, `organ:bp-right-lobe-of-liver-r`, `organ:bp-superior-epigastric-artery-r`, `organ:bp-right-gastric-vein-r`. De même, 74 paires parenchyme/parenchyme > 20 % incluent des couples anatomiquement impossibles : `organ:inferior-lobe-of-right-lung` × `organ:posterior-medial-segment-of-liver-viii` (97 %), `organ:inferior-lobe-of-right-lung` × `organ:middle-lobe-of-right-lung` (93 %), `organ:kidney-r` × `organ:bp-large-intestine` (97 %). À l'inverse, `organ:mucosa-of-stomach` × `organ:stomach` (99 %) est une imbrication normale.

## 4. Catégorie C — doublons d'AABB

**30 groupes, 73 identifiants, 100 % préfixés `bp-`** (agrégats BodyParts3D). Le filtre qui a retiré 98 agrégats est incomplet.

| Taille | Groupe | Exemple |
|---|---|---|
| ×4 | 1 | `bp-bronchus-l`, `bp-left-main-bronchus-l`, `bp-main-bronchus-l`, `bp-posterior-mediastinum-l` |
| ×3 | 10 | `bp-bony-pelvis`, `bp-lower-limb`, `bp-pelvic-girdle` ; `bp-bile-duct`, `bp-common-hepatic-duct`, `bp-extrahepatic-bile-duct` |
| ×2 | 19 | `bp-ciliary-ganglion-l` / `bp-parasympathetic-ganglion-l` ; `bp-nose` / `bp-nasal-septum` |

Quatre concepts distincts partageant une seule AABB signifient qu'un seul maillage sert à quatre rendus : **z-fighting, doubling d'opacité et « collisions » apparentes garantis**. C'est la vraie erreur de données la plus nette de l'audit.

## 5. Catégorie D — dimensions absurdes et cohétenance des côtés

Aucune dimension nulle ou négative, aucun axe > 0,9 m. **62 structures ont une hauteur > 0,45 m** (38 organes, 22 muscles, 2 os) : la majorité est légitime (`organ:bp-great-saphenous-vein-l/-r` 0,822 m ; `muscle:sartorius-muscle-l` 0,599 m ; `muscle:fascia-lata-l` 0,570 m ; faisceaux de la moelle 0,490 m).

Anomalies réelles à mettre en quarantaine :

| ID | AABB observée | Attendu |
|---|---|---|
| `organ:hypothalamus` | 0,476 m de haut, y ∈ [1,148 ; 1,624] | ≈ 1 cm, dans le diencéphale |
| `organ:bp-left-lung` | 0,081 m de haut | ≈ 0,25 m |
| `organ:spinal-ganglion-l/-r` | 0,466 m de haut | ganglion ≈ 5 mm (mesh agrégé) |
| `organ:intercostal-nodes-l/-r` | 0,298 m de haut | chaîne de ganglions, pas un nœud |
| `organ:juxta-oesophageal-nodes`, `organ:prevertebral-nodes` | 0,216 m de haut | idem |

Enfin, **16 identifiants ont un côté déclaré incohérent avec le centre X réel** (14 organes, 2 muscles, tous `bp-`) : `organ:bp-left-lobe-of-liver-l` (cx = −0,0149), `organ:bp-hepatic-portal-vein-l` (−0,0149), `muscle:bp-flexor-pollicis-brevis-l` (−0,2786) — inversion gauche/droite complète pour ce dernier.

## 6. Classification automatique proposee

Règle déterministe, applicable au chargement sans réseau :

1. **Exclure du rendu** les 43 IDs « non-spécifiques » des 30 groupes de doublons (règle : within-group, conserver le nom le plus spécifique — nombre de tokens, puis présence de `left/right/anterior/posterior/common/main`, puis absence de `mediastinum/pelvis/limb/girdle/bronchus/thymus/bile-duct`). La liste complète des 43 est déterminable par ce tri ; exemples : `bone:bp-lower-limb*`, `bone:bp-pelvic-girdle*`, `organ:bp-mediastinum*`, `organ:bp-thymus-l/-r`, `organ:bp-bile-duct*`, `organ:bp-bronchus-l/-r`, `organ:bp-nose`.
2. **Exclure** les 16 IDs de côté incohérent et les 8 IDs de dimensions absurdes du §5, jusqu'à correction de la source.
3. **Conserver** les 960 structures vasculaires/nerveuses — y compris les 136 hors silhouette — : leur position est correcte, le défaut est la peau.
4. **Conserver** les imbrications AABB normales ; n'alerter que sur les 9 paires côté-croisé et les 74 paires parenchyme/parenchyme après filtrage par `side` et par nom d'organe.
5. Appliquer la classification sous forme de **liste de filtrage au rendu** (`hiddenIds`), jamais en supprimant les entrées du manifest : l'atlas reste reconstruisable et la liste reste auditable.

## 7. Vérification par screenshots multi-angles

Technique proposée (entièrement locale, sans dépendance réseau) :

1. Instrumenter le moteur pour produire, pour chaque structure testée, **3 rendus orthographiques 1024 × 1024** : face (caméra +Z), dos (−Z), profil (+X), fond transparent, même cadrage de 0,70 m de large (soit **0,68 mm/pixel**).
2. Rendu A : peau seule → masque binaire `M_skin` ; rendu B : peau + structure → `M_struct`. Dilater `M_skin` de **6 px (≈ 4 mm)** pour absorber les 926 arêtes ouvertes et la tolérance de 2,1 mm aux doigts.
3. Métrique mesurable : `hors = |M_struct \ dilate(M_skin)| / |M_struct|` sur chaque vue, lue via `canvas.getImageData` (aucun export réseau). **Seuil d'alerte : hors > 2 %** des pixels de la structure dans au moins une vue, **ou composante connectée hors-peau > 64 px² (≈ 30 mm²)**, **ou segment continu > 12 px (≈ 8 mm)**.
4. Complément z-buffer : un pixel de vaisseau à l'intérieur de `M_skin` mais avec une profondeur **plus proche que la peau** signale un défaut d'occlusion (classe B) ; cibler en priorité les 136 IDs du §2.
5. Porte de validation CI : **≤ 0,5 % de pixels hors masque sur les 3 vues pour tout ID rendu**. Au-delà, l'ID bascule en quarantaine et un screenshot est archivé dans `docs/analyses/screenshots/`.

## 8. Recommandations actionnables (ordre de priorité)

1. Remplacer le maillage cutané par un modèle à doigts distincts (objectif : 0 arête frontière dans la zone des mains) — traite la plainte visuelle principale.
2. Ajouter le filtre `hiddenIds` (43 doublons + 16 côtés + 8 dimensions = **63 IDs uniques** (4 chevauchements déjà dédupliqués)) dans le pipeline de chargement de `v2-engine.js`.
3. Corriger la latéralisation de `bp-left-lobe-of-liver-l` et `bp-hepatic-portal-vein-l` (AABB traversant la ligne médiane).
4. Réexaminer les 5 AABB absurdes du §5 et les 40 structures dont les `dimensions` de l'inventaire ne correspondent à aucune permutation des dimensions du manifest (ex. `organ:anterior-axillary-nodes-l` : inventaire [0,0387 ; 0,0266 ; 0,0205] vs manifest [0,0155 ; 0,0438 ; 0,0248]).
5. Intégrer le test multi-angles du §7 dans `tests/` avec le seuil de 2 % comme régression.

**Limite de l'audit :** les AABB sont une approximation conservatrice ; un chevauchement AABB ne prouve jamais une intersection de maillages. Le test de silhouette souffre des trous du maillage de peau. Les conclusions « erreur avérée » portent donc uniquement sur les doublons exacts, les inversions de côté et les dépassements de 2,1 mm mesurés — le reste demande la confirmation par rendu.
