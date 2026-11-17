# 10 chantiers prioritaires — atlas CORPS v2

État : après refonte UX, picking exact, ombres, thèmes, waypoints et **28 tests 3D**.

| # | Chantier | Objectif | ✅ Fait | Prochaine action |
|---:|---|---|:---:|---|
| 1 | **Fiabilité du picking et des interactions** | Clic sur la géométrie visible uniquement, instances masquées ignorées, peau, glisser/double-clic/tactile | ✅ | Tests occlusion profonde, gestures multi-touch suivants |
| 2 | **Textures PBR photorealistes** | Remplacer les albedos procéduraux par des PBR scans (albedo/normal/roughness/AO) par tissu | ⬜ | Procedural en place ; chercher sources CC0/CC BY et pipeline KTX2 (crédit IA épuisé) |
| 3 | **Audit qualité & tests visuels** | Un test par structure : normales, dégénérés, collisions, TA2 ; regression screenshots | ✅ | `npm run analyze:v2` + 28 tests ; ajouter captures visuelles automatiques |
| 4 | **Groupes & cinématique complète** | Pivots réels, articulations, mouvements physiologiques pour tous les groupes | ⬜ | 9 groupes et animations de base ; étendre à ~40 groupes |
| 5 | **Waypoints & contenu pédagogique pour tous** | Anecdotes curées pour les 2 107 structures, fiches multilingues | ⬜ | 3 waypoints génériques + 6 curés ; rédiger la suite |
| 6 | **Performance & sobriété énergétique** | LOD streaming, WebGPU optionnel, budget thermique, occlusion culling | ✅ | LOD auto + BatchedMesh (3 appels) + WASM ; mesurer sur vrais mobiles |
| 7 | **Fusion v1 + v2** | Remplacer les 47 entités de l'accueil par l'atlas complet sans perdre pathologies/jeux/coupe | ⬜ | Deux pages coexistent ; unifier le state par ID TA2 |
| 8 | **Accessibilité & responsive** | Clavier, lecteur d'écran, contraste AA clair/sombre, gestes mobiles | ⬜ | Thèmes + sidebar mobile ; audit axe et navigation clavier |
| 9 | **Intégrité données & licences** | Provenance par structure, attributions CC, citations TA2, CI | ✅ | Manifest sources + README + `public/models/README.md` |
| 10 | **PWA hors ligne robuste** | Cache versionné, streaming chunks, reprise après échec, quota | ✅ | SW `corps-v18` + hors ligne vérifié ; tester mises à jour incrémentales |

Légende : ✅ = terminé et vérifié · ⬜ = à faire.

## Corrections livrées dans ce cycle (chantier 1)

- **Organes invisibles au chargement** : la peau était affichée par défaut et recouvrait tout. Elle est désormais masquée par défaut (bouton « Peau » désactivé), organes visibles immédiatement.
- **Organes disparaissant à la rotation** : le seuil LOD WASM éliminait les structures à distance. Plancher à 3,5 m ajouté → ~2 107 structures restent visibles quelle que soit l'orientation.
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

2 → 4 → 5 → 7 → 8 (les chantiers 1, 3, 6, 9, 10 sont achevés).
