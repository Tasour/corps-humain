# 10 chantiers prioritaires — atlas CORPS v2

État : après refonte UX, picking exact, ombres, thèmes, waypoints et 25 tests 3D.

| # | Chantier | Objectif | État / prochaine action |
|---:|---|---|---|
| 1 | **Fiabilité du picking et des interactions** | Clic sur la géométrie visible uniquement, ignoring instances masquées, peau et marqueurs ; gestion tactile,双击, glisser | Partiel : filtrage `currentVisible` et `pickExact` en place ; ajouter tests occlusion profonde et gestures mobiles |
| 2 | **Textures et matériaux photorealistes** | Remplacer les albedos procéduraux par des PBR scans (albedo/normal/roughness/AO) libres ou générés, par tissu | Procedural en place ; bloqué par crédits IA — chercher sources CC0/CC BY et pipeline KTX2 |
| 3 | **Audit qualité exhaustif et tests visuels** | Un test par structure : normales, dégénérés, collisions, orientation, cohérence TA2, captures visuelles | `npm run analyze:v2` + 25 tests ; ajouter regression screenshots et seuils automatiques |
| 4 | **Groupes anatomiques et cinématique complète** | Pivots réels, articulations, mouvements physiologiques (épaule, coude, genou, mâchoire, respiration complète) pour tous les groupes | 9 groupes et animations de base ; étendre à ~40 groupes et corrections anatomiques |
| 5 | **Waypoints et contenu pédagogique pour tous** | Anecdotes/explications curées pour les 2 107 structures, pas seulement 6 ; fiches multilingues | 3 waypoints génériques + 6 curés ; rédiger les 2 101 restants |
| 6 | **Performance et sobriété énergétique** | LOD streaming par système, WebGPU optionnel, budget thermique, instancing GPU, occlusion culling | LOD auto + BatchedMesh (3 appels) ; mesurer sur vrais mobiles et ajouter WebGPU opt-in |
| 7 | **Fusion v1 + v2 en une seule application** | Remplacer les 47 entités de l'accueil par l'atlas complet sans perdre pathologies, jeux, coupe et éclaté | Deux pages coexistent ; unifier le state et les entités par ID TA2 |
| 8 | **Accessibilité et design responsive** | Clavier, lecteur d'écran, contrastes AA en clair/sombre, gestes mobiles, hiérarchie de聚焦 | Thèmes + sidebar mobile ; audit axe et navigation clavier à faire |
| 9 | **Intégrité des données et licences** | Provenance par structure, attributions CC BY 4.0 / CC BY-SA 4.0, partage à l'identique, citations TA2 | Manifest sources + README ; ajouter `citations` par structure et vérification CI |
| 10 | **PWA hors ligne robuste** | Cache versionné, streaming des chunks PBR, reprise après échec, installabilité iOS/Android | SW `corps-v17` + hors ligne vérifié ; tester mises à jour incrementales et stockage quota |

## Ordre d'exécution recommandé

1 → 3 → 6 → 4 → 5 → 2 → 7 → 8 → 9 → 10

Le chantier 1 est bloquant car il conditionne la confiance dans toutes les autres interactions. Le 3 sécurise les régressions. Les 6 et 4 rendent l'atlas utilisable au quotidien avant d'investir dans le contenu (5) et le photorealisme (2).
