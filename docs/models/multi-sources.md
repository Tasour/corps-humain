# Sources anatomiques disponibles

Le site public charge deux champions figés, uniquement depuis `docs/models/`.
Aucun appel réseau externe au chargement.

| Clé | Source | Sexe réel | Licence | État |
|---|---|---|---|---|
| `seema` | 3D Human Body Anatomy | générique, sans organes génitaux explicites | 🟡 CC BY-SA 4.0 | **champion homme** |
| `bodyatlas` | Body Atlas 3D — femme | peau Visible Human Female, organes reproducteurs, apports masculins recalés | 🟢 CC BY 4.0 | **championne femme** |
| `nqwrc` | 3D Anatomy | homme (pénis, testicules, prostate), sans peau | 🔴 CC BY-NC-SA 4.0 | archivé |
| `wangzh` | Human Atlas 3D — wangzh | **mixte ♂/♀** (les deux appareils génitaux) | 🟢 MIT + CC BY 4.0 | archivé |

Sources éliminées du concours : `female-atlas`, `slorksmo`, `enhanced`, `anatria`, `organui`.
`female-atlas` a été disqualifié après audit : 2 163 pièces sur 3 004 (72 %) proviennent
de BodyParts3D, une référence masculine, et deux appareils oculaires sont superposés
avec un décalage de 22,6 mm. Leurs fichiers restent présents dans le dépôt comme
archive mais ne sont plus publiés dans `dist/`.

Un carré bleu représente l'homme et un carré rose la femme. Les deux corps sont
affichés côte à côte et chargés depuis des jeux de géométries indépendants, sans
fusion. Voir `docs/analyses/audit-sexes-sources.md`.

## Sélection d'une structure

Un clic (ou un tap) lance un rayon depuis la caméra dans la direction du pointeur.
Le premier maillage visible touché est sélectionné : un popup affiche son nom, une
courte description sourcée et sa licence, tandis qu'un fin contour turquoise
clignote autour de la pièce (statique si `prefers-reduced-motion`). Un clic dans le
vide, `Échap` ou le bouton × effacent la sélection. Le glisser de caméra est ignoré
(seuil de 6 px). Le popup indique aussi la provenance de la pièce (Visible Human Female,
BodyParts3D recalé, Allen…). Le rayon traverse la peau translucide : le premier touché
peut donc être un organe profond. Le préréglage « Peau seule » permet de juger la
morphologie sans les couches internes. Les descriptions sont construites par
`scripts/build_selection_descriptions.py` dans `docs/models/selection-descriptions.json`.

Voir `docs/veille/2026-11-24-femelle-meilleur-modele.md`,
`docs/veille/2026-11-24-forks-body-atlas.md`, `docs/models/concours-femme.md` et `LICENSES.md`.

## Compléments du 2026-11-25

Le corps femelle reçoit des compléments prélevés sur la référence masculine
`seema` (Z-Anatomy, CC BY-SA 4.0) et recalés sur 13 repères anatomiques :
34 muscles faciaux, 8 muscles du tronc, cheveux et sourcils, 255 nerfs
périphériques. Ils restent des structures indépendantes, étiquetées
« référence masculine adaptée » dans le popup. L'oblique interne manque dans
cette référence et n'a pas été fabriquée.

Les 8 structures de grossesse (placenta, amnion, cordon) sont désormais dans une
couche « Grossesse — référence », masquée au démarrage. Les préréglages Peau,
Muscles, Squelette, Organes et Rayon X permettent d'éviter le mélange
transparent qui rendait le dos illisible. Le mode Rayon X reste le mode par
défaut ; l'ordre de rendu des couches est désormais explicite.

## Correctifs d'ergonomie du 2026-11-25

- Le contour de sélection utilise un **overlay Fresnel** pour les maillages fins
  (cheveux, nerfs, vaisseaux) : un liseré turquoise suit la silhouette sans
  produire de grandes plages opaques. Les petits volumes solides gardent
  `EdgesGeometry`.
- Le pivot de rotation suit le corps sur lequel le glisser commence. Un simple
  clic sélectionne sans déplacer le pivot. Les boutons **H** et **F** forcent
  le pivot sur l'homme ou la femme, et l'indicateur « Pivot : … » affiche l'état.
- Toute modification manuelle des cases quitte le mode Rayon X : la peau
  réactivée est donc opaque à opacité 1, ce qui permet de la sélectionner.
  Le mode Rayon X reste disponible avec son bouton dédié.
- Les 34 muscles faciaux de la femme ont leur propre couche « Muscles du visage »
  et un préréglage « Visage », afin d'être visibles et sélectionnables même en
  présence de cheveux ou de peau.

## Interface du 2026-11-25

- Un seul bouton « sexe » remplace les boutons H/F : `#` par défaut sur l'homme,
  il bascule vers `♀` au clic et n'affiche que le corps actif. Le pivot et la vue
  suivent ce choix explicite ; aucun glisser ne modifie plus la caméra au relâchement.
- La barre d'outils est horizontale, fixée en bas de l'écran, avec COUCH, INFO et
  le bouton sexe. Les boutons +, −, CADRER et RESET ont été supprimés.
- Sur mobile, le double-tap zoome de 50 % autour du point touché, comme sur une
  carte ; le pincement reste disponible.
- Les muscles du visage sont intégrés à la couche `muscles` : la couche séparée
  et le préréglage « Visage » ont été supprimés.
- Le recalage facial utilise un interpolant TPS sur 13 repères crâniens. Le
  résidu maximal mesuré est de 0,000008 mm, largement sous le seuil de 0,1 mm.
  Voir `docs/models/facial-alignment.json`.
