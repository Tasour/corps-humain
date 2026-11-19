# 24 chantiers prioritaires — atlas CORPS v2

État : après refonte UX, picking exact, ombres, thèmes, waypoints, **35 tests 3D**,
**19 contrôles d'accessibilité**, **43 groupes d'animation** et une **chasse aux
organes** native v2, mesurés.

| # | Chantier | Objectif | ✅ Fait | Prochaine action |
|---:|---|---|:---:|---|
| 1 | **Fiabilité du picking et des interactions** | Clic sur la géométrie visible uniquement, instances masquées ignorées, peau, glisser/double-clic/tactile | ✅ | Tests occlusion profonde, gestures multi-touch suivants |
| 2 | **Textures PBR photorealistes** | Remplacer les albedos procéduraux par des PBR scans (albedo/normal/roughness/AO) par tissu | ⬜ | Procedural en place ; chercher sources CC0/CC BY et pipeline KTX2 (crédit IA épuisé) |
| 3 | **Audit qualité & tests visuels** | Un test par structure : normales, dégénérés, collisions, TA2 ; regression screenshots | ✅ | `npm run analyze:v2` + 30 tests ; **manque de données identifié** : aucun œsophage dans le manifeste (trou entre pharynx et estomac) |
| 4 | **Groupes & cinématique complète** | Pivots réels, articulations, mouvements physiologiques pour tous les groupes | ✅ | 43 groupes (8/8 données, 52/52 3D) ; pivots et axes par articulation, captures 4 orientations |
| 5 | **Waypoints & contenu pédagogique pour tous** | Anecdotes curées pour les 2 039 structures, fiches multilingues | 🟡 | **22 structures curées** (2–6 anecdotes) + 3 génériques ; `npm run test:waypoints` → 7/7 ; poursuivre la rédaction |
| 6 | **Performance & sobriété énergétique** | LOD streaming, WebGPU optionnel, budget thermique, occlusion culling | ✅ | LOD auto + BatchedMesh (3 appels) + WASM ; mesurer sur vrais mobiles |
| 7 | **Fusion v1 + v2** | Remplacer les 47 entités de l'accueil par l'atlas complet sans perdre pathologies/jeux/coupe | 🟡 | **Chasse aux organes portée dans v2** (27 cibles, 7/7 + 3 tests 3D) ; lien croisé v1 ↔ v2 ; pathologies, diagnostic et coupe restent en v1 |
| 8 | **Accessibilité & responsive** | Clavier, lecteur d'écran, contraste AA clair/sombre, gestes mobiles | ✅ | 19 contrôles mesurés (`npm run test:a11y`) ; voir `docs/analyses/accessibilite-2026-11-19.md` |
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
| 24 | **Qualité 3D — 100 % des structures** | Présence, intégrité, résolution et rendu vérifiés pour chaque élément, sous 8 angles, pour les étudiants en médecine | 🟡 | P0 instrumenté : audit, porte CI, 5 sujets × 8 captures (0 débordement), scorecard (1 355 S1 / 684 S2 / 0 S3), Hausdorff LOD. Pipeline corrigé puis dataset reconstruit : 65,8 % étanches, 0 LOD non monotone, sinus caverneux 512 → 9 728 tris. Reste : 566 windings inversés, 126 non-manifold, 24 plafonnées. Méthode : [`METHODOLOGIE-QUALITE-3D.md`](METHODOLOGIE-QUALITE-3D.md). Plan : [`plan-qualite-3d.md`](plan-qualite-3d.md) |

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
- **Preuve** : `npm run test:a11y` → **19/19** ; `npm run test:v2` → **30/30**.

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

## Passe groupes et cinématique (19 novembre 2026)

Détail et limites : [`docs/analyses/groupes-2026-11-19.md`](analyses/groupes-2026-11-19.md).

- **43 groupes** (contre 9) : articulations (coude, poignet, genou, cheville, cou,
  mâchoire, tronc), ceintures scapulaires, muscles (biceps, triceps, deltoïde, pectoral,
  grand dorsal, quadriceps, ischio-jambiers, mollet, fessiers, abdominaux, trapèzes) et
  organes (cœur, poumons, yeux, encéphale).
- **Convention d'axes documentée** : X = flexion sagittale, Z = abduction/élévation
  frontale avec signe opposé à gauche et à droite.
- **Preuves** : `npm run test:groupes` → 8/8 (identifiants, appartenance au manifeste,
  doublons, pivots dans l'enveloppe du corps) ; `npm run test:groupes3d` → 52/52
  (isolement exact, éclaté, mouvement distinct, réinitialisation) ; 12 groupes ×
  4 orientations capturés et relus.
- **Interface** : section « Groupes anatomiques » repliable (43 pastilles) pour que la
  liste des structures reste visible ; ouverte, elle défile sans pousser le panneau.
- **Correction de l'outil de capture** : le cadrage ignorait le champ de vision réel
  (38°) et la profondeur de l'objet — la mâchoire sortait du cadre. La distance est
  maintenant calculée par `rayon / tan(fov/2) + demi-profondeur`, avec 15 % de marge.

## Passe waypoints (19 novembre 2026)

- **22 structures curées** (contre 6, dont une morte) : cœur, reins, fémurs, cerveau,
  œil, estomac, pancréas, rate, vésicule biliaire, intestin grêle, gros intestin,
  trachée, vessie, cervelet, diaphragme, mandibule, humérus, tibia, lobes pulmonaires.
  Chaque structure porte 2 à 6 anecdotes vérifiables (pH gastrique, anneaux
  trachéaux, îlots de Langerhans, nerf phrénique C3-C5…).
- **Identifiant mort corrigé** : `organ:bp-left-lung` n'existe pas dans le manifeste ;
  son contenu est désormais porté par les lobes réels (`organ:superior-lobe-of-left-lung`,
  `organ:inferior-lobe-of-left-lung`). Aucun waypoint ne peut plus disparaître en
  silence : `npm run test:waypoints` vérifie que **chaque identifiant curé existe**.
- **Marqueurs visibles** : les sphères de 2 mm devenaient invisibles dès qu'on
  reculait. Ce sont maintenant des `Sprite` en `sizeAttenuation: false` (taille
  constante à l'écran, 26 px), donc cliquables à toute distance.
- **Superposition** : la fiche d'anecdote et la barre d'animations se recouvraient en
  bas de scène ; la fiche est empilée au-dessus de la barre, hauteur mesurée au
  chargement et au redimensionnement.
- **Preuves** : `npm run test:waypoints` → 7/7 ; `npm run test:v2` → 31/31 (dont un
  contrôle dédié aux anecdotes de l'estomac) ; captures `docs/analyses/waypoints/`
  (estomac, pancréas, tibia, mobile).
- **Limite** : les 2 017 autres structures gardent 3 waypoints génériques
  (« pôle supérieur / partie centrale / pôle inférieur »), honnêtes mais peu
  instructifs ; le chantier reste ouvert.

## Passe chasse aux organes (19 novembre 2026)

Détail et limites : [`docs/analyses/chasse-2026-11-19.md`](analyses/chasse-2026-11-19.md).

- **Premier jeu natif v2** : 27 cibles (22 organes, 4 os, 1 muscle) tirées au hasard
  dans `src/data/hunt.js` ; la cible est une structure réelle du manifeste, le clic
  passe par `pickExact` et non par les 47 entités de la v1.
- **Règles mesurables** : une seule couche visible, 90 s, +10 points (+3 par série),
  −2 s par erreur ; HUD avec cible, indice, score, temps et barre.
- **Défaut moteur corrigé** : `setCategoryVisible()` masquait le mesh fusionné
  principal mais pas `<catégorie>:membrane` ; le fascia crural restait cliquable
  alors que la couche muscle était éteinte. Les deux meshes suivent maintenant la
  même visibilité, avec un contrôle de régression dédié.
- **Preuves** : `npm run test:chasse` → 7/7 ; `npm run test:v2` → 35/35 (dont un
  clic réel sur le tibia cadré) ; captures bureau/mobile dans `docs/analyses/chasse/`.
- **Navigation v1 ↔ v2** : la fiche de structure v2 renvoie vers la version
  classique (pathologies, diagnostic, coupe), qui renvoie déjà vers v2.

## Passe qualité 3D — socle de mesure (19 novembre 2026)

Détail : [`docs/analyses/qualite-3d.md`](analyses/qualite-3d.md).

- **Nouvel audit** : `npm run audit:3d` mesure en ~5 s les arêtes libres, arêtes
  non-manifold, composantes connexes, faces dupliquées, faces inversées, winding
  inversé, aire, volume, longueurs d'arête et densité, pour les 2 039 structures.
- **Vérité mesurée** : 1 107/2 039 structures étanches et manifold (54,3 %),
  907 avec bords, 124 non-manifold, 620 pluri-composantes, 466 windings inversés,
  13 354 faces inversées (0,267 %), 0 dégénéré.
- **Plafond identifié** : 24 structures sont exactement à 12 000 triangles ; les
  sources contiennent 1 302 552 triangles au-delà de ce plafond, actuellement jetés.
- **Résolution limitée par la source** : arête P99 médiane de 9,0 mm (os), 12,4 mm
  (muscles), 6,9 mm (organes) — le détail sub-millimétrique exige de nouvelles sources.
- **Aucune structure n'est déclarée « terminée »** : le statut réel est S1 (mesurée),
  pas S3 (production). La méthode et le plan de route remplacent les affirmations par
  des portes chiffrées.

## Ordre d'exécution recommandé (restant)

**24 (qualité 3D) → 2 (matériaux, débloqué par le pilote P4) → 5 → 7.**
Les chantiers 1, 3, 4, 6, 8, 9, 10, 11-15 sont achevés.
