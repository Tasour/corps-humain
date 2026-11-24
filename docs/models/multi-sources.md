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
