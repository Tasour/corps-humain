# Guide d'intégration web — corps animés

Les GLB optimisés sont dans `docs/models/corps-{female,male}-opt.glb` (8 Mo chacun).
Ils utilisent EXT_meshopt_compression : charger avec `MeshoptDecoder` de three.js.

La démo `docs/demo-corps.html` montre :
- sélecteur de sexe (femme / homme),
- sélecteur de couche (peau, muscles, squelette, organes, toutes),
- sélecteur parmi 6 animations,
- lecture / pause.

Pour intégrer dans `v2.html`, réutiliser le chargeur de la démo et brancher les sélecteurs sur l'état de l'app.
