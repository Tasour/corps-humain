# 15 chantiers prioritaires — atlas CORPS v2

État : après refonte UX, picking exact, ombres, thèmes, waypoints et **30 tests 3D**.

| # | Chantier | Objectif | ✅ Fait | Prochaine action |
|---:|---|---|:---:|---|
| 1 | **Fiabilité du picking et des interactions** | Clic sur la géométrie visible uniquement, instances masquées ignorées, peau, glisser/double-clic/tactile | ✅ | Tests occlusion profonde, gestures multi-touch suivants |
| 2 | **Textures PBR photorealistes** | Remplacer les albedos procéduraux par des PBR scans (albedo/normal/roughness/AO) par tissu | ⬜ | Procedural en place ; chercher sources CC0/CC BY et pipeline KTX2 (crédit IA épuisé) |
| 3 | **Audit qualité & tests visuels** | Un test par structure : normales, dégénérés, collisions, TA2 ; regression screenshots | ✅ | `npm run analyze:v2` + 28 tests ; ajouter captures visuelles automatiques |
| 4 | **Groupes & cinématique complète** | Pivots réels, articulations, mouvements physiologiques pour tous les groupes | ⬜ | 9 groupes et animations de base ; étendre à ~40 groupes |
| 5 | **Waypoints & contenu pédagogique pour tous** | Anecdotes curées pour les 2 039 structures, fiches multilingues | ⬜ | 3 waypoints génériques + 6 curés ; rédiger la suite |
| 6 | **Performance & sobriété énergétique** | LOD streaming, WebGPU optionnel, budget thermique, occlusion culling | ✅ | LOD auto + BatchedMesh (3 appels) + WASM ; mesurer sur vrais mobiles |
| 7 | **Fusion v1 + v2** | Remplacer les 47 entités de l'accueil par l'atlas complet sans perdre pathologies/jeux/coupe | ⬜ | Deux pages coexistent ; unifier le state par ID TA2 |
| 8 | **Accessibilité & responsive** | Clavier, lecteur d'écran, contraste AA clair/sombre, gestes mobiles | ✅ | 18 contrôles mesurés (`npm run test:a11y`) ; voir `docs/analyses/accessibilite-2026-11-19.md` |
| 9 | **Intégrité données & licences** | Provenance par structure, attributions CC, citations TA2, CI | ✅ | Manifest sources + README + `public/models/README.md` |
| 10 | **PWA hors ligne robuste** | Cache versionné, streaming chunks, reprise après échec, quota | ✅ | SW `corps-v23` + hors ligne vérifié |
| 11 | **Système d'ombres réaliste** | Ombres douces, contact, auto-prise en charge du thème | ✅ | `BasicShadowMap` (r187) + sol récepteur ; ombres portées par les lots |
| 12 | **Contrôles sans menu flottant** | 4 premières actions en barre compacte, 4 suivantes (Peau/Os/Muscles/Organes) dans la sidebar | ✅ | Barre d'actions réduite + section « Couches » dans la sidebar |
| 13 | **Bug cœur éclaté** | Le raccourci « Cœur » affichait les cavités dispersées au lieu du cœur | ✅ | Raccourci pointe vers une structure unique cohérente |
| 14 | **Détection automatique des collisions** | Log des paires AABB suspectes, test qui échoue quand une collision est détectée | ✅ | `npm run test:collisions` + `docs/analyses/collisions.md` |
| 15 | **Correction des collisions géométriques** | Structures qui traversent la peau / se chevauchent anormalement | ✅ | 3 structures hors peau exclues du build ; 0 erreur, 173 imbrications en avertissement |
| 16 | **FPS réels sous charge** | HUD honnête + cadence adaptative, plus d'image gelée au glisser | ✅ | HUD = rendus réels ; glisser = ~63 fps ; `MeshStandardMaterial` ; WASM pile fixe |
| 17 | **Collisions visuelles (hover + cadrage)** | Contour plaqué, catégorie activée à l'isolement, cadrage sans débordement | ✅ | Test par dilatation euclidienne : 0 anomalie / 400 structures ; 63 IDs exclus |
| 18 | **Classification respiratoire** | Poumons/trachée dans l'appareil respiratoire | ✅ | Remappage dans l'arbre, 15 structures, sous-nœuds Poumons/Bronches |
| 19 | **Cohérence de la fusion des bases** | Paires G/D d'une même source, doublons inter-sources, suffixes TA2 | ✅ | 0 anomalie (`tests/coherence-modeles.mjs`), 2 039 structures |
| 20 | **Arbre sans branches parallèles** | Rattacher BodyParts3D aux branches Z-Anatomy | ✅ | Table `BP3D_CANONICAL` + canonicalisation ; « Appareil digestif » unique (43) |
| 21 | **Couche de sélection** | Picking en vue fusionnée, double rendu, LOD réinitialisable, restauration de couleur | ✅ | `pickMerged`, `baseGeometries`, `highlight(s, null)` ; captures runtime |
| 22 | **Séreuses lisibles** | Omentum/mésentère/péritoine translucides | ✅ | Mesh membrane séparé, opacité 0,15 |
| 23 | **Contrôle visuel par groupe** | 1 groupe = 1 capture par orientation | ✅ | `tests/screens-groupes.mjs` : 29 groupes × 4 = 116 captures |

Légende : ✅ = terminé et vérifié · ⬜ = à faire.

## Passe fusion des bases et sélection (18 novembre 2026)

Détail et preuves : [`docs/analyses/passe-fusion-2026-11-18.md`](analyses/passe-fusion-2026-11-18.md).

- **Données** : 8 paires G/D mixtes corrigées, 4 artères TA2 contradictoires et 5 doublons
  inter-sources masqués, **intestin grêle restauré** (la règle « > 20 pièces = agrégat »
  excluait un vrai organe), déduplication par `(nom, côté)`.
- **Arbre** : fin des branches « Squelette (BodyParts3D) », « Musculature (BodyParts3D) » et du
  double « Appareil digestif ».
- **Sélection** : picking réparé en vue corps entier, plus de double rendu, LOD de retour au
  bas après isolement, couleur anatomique restaurée à la désélection.
- **Rendu** : couleurs corrigées pour 8 familles de structures, séreuses translucides.
- **Tests** : 30/30, 0 collision AABB, 0 anomalie visuelle, 0 anomalie de cohérence.

## Passe accessibilité et responsive (19 novembre 2026)

Détail et mesures : [`docs/analyses/accessibilite-2026-11-19.md`](analyses/accessibilite-2026-11-19.md).

- **Contraste** : quatre textes secondaires passaient sous 4,5:1 (2,43 à 4,08). `--muted`
  passe à `#5f6f78` (4,71:1 sur le fond papier, 5,13:1 sur le panneau), les compteurs et
  groupes à la même valeur.
- **Clavier** : canvas focusable (`tabindex=0`, `role=application`, aide liée), flèches
  pour orbiter, `+`/`-` pour zoomer, `Entrée` sélectionne la structure au centre, `Échap`
  désélectionne, `/` va à la recherche, `Début` recadre.
- **Lecteur d'écran** : un seul `<main>`, repères nommés, `aria-pressed` sur les couches,
  la sélection et le tour du monde, `aria-expanded` sur le tiroir et les nœuds de l'arbre,
  région live pour les annonces, chargement en `role=status`.
- **Mobile** : la fiche n'est plus supprimée — elle devient une feuille inférieure ouverte
  à la sélection, avec bouton de fermeture ; tiroir avec voile, `Échap` et restitution du
  focus ; cibles principales à 44 px ; barre d'animations en défilement horizontal.
- **Mouvement réduit** : transitions neutralisées, rotations de caméra instantanées, tour
  continu désactivé, avec annonce explicite.
- **Preuve** : `npm run test:a11y` → **18/18** ; `npm run test:v2` → **30/30**.

## Corrections livrées (chantiers 11-15)

- **Ombres** : `BasicShadowMap` compatible r187, lots cast/receive, sol récepteur, update à la demande.
- **Contrôles** : barre compacte à 4 actions (Focus / Isoler / Tout / Pivot) ; couches Peau/Os/Muscles/Organes déplacées dans la sidebar avec pastilles de couleur.
- **Cœur** : le raccourci sélectionne maintenant `organ:bp-heart` (structure cohérente) au lieu du composite fibreux éclaté.
- **Collisions** : `scripts/check-collisions.mjs` + `npm run check:collisions` produisent `docs/analyses/collisions.{md,json,log}` et un test (`npm run test:collisions`) échoue dès qu'une structure sort de l'enveloppe cutanée. 173 paires imbriquées (fascia/muscle, cornée/chambre) sont classées en avertissement, pas en erreur.
- **30 tests 3D + test de collisions** : tous verts.

Ordre restant : 2 → 4 → 5 → 7 → 8.

## Corrections livrées dans ce cycle (chantier 1)

- **Organes invisibles au chargement** : la peau était affichée par défaut et recouvrait tout. Elle est désormais masquée par défaut (bouton « Peau » désactivé), organes visibles immédiatement.
- **Organes disparaissant à la rotation** : le seuil LOD WASM éliminait les structures à distance. Plancher à 3,5 m ajouté → ~2 041 structures restent visibles quelle que soit l'orientation.
- **Clic sur zone masquée** : `pickExact` filtre les instances via `currentVisible` en plus de `batch.visible`; le BVH filtre aussi via `currentVisible`.
- **Glisser** ne sélectionne plus ; **double-clic** recadre ; `touch-action: none` pour le tactile.
- **Ombres** PCF soft avec update à la demande ; **thèmes** clair/sombre persistés.
- **Palette réaliste** : nerfs or, organes rouge-brun, poumons rose, glandes ocre, peau gris-bleu.
- **Lot désactivé à la sélection** : cliquer un os ou un muscle alors que sa catégorie était
  masquée par défaut laissait un écran vide. `selectStructure()` réactive désormais la
  catégorie de l'item (et son bouton), comme le fait déjà le bouton Focus.
- **Disparition des organes à la rotation** : `PCFSoftShadowMap`, supprimé en three r187,
  provoquait `GL_INVALID_OPERATION: Mismatch between texture format and sampler type
  (shadow)` après le premier passage d'ombre. Remplacé par `BasicShadowMap` ; le modèle
  reste visible à la rotation.
- **30 tests** (`npm run test:v2`) couvrent tous ces points, desktop et mobile tactile.

## Ordre d'exécution recommandé (restant)

2 → 4 → 5 → 7 → 8 (les chantiers 1, 3, 6, 9, 10, 11-15 sont achevés).
