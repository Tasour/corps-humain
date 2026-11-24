# Sources anatomiques disponibles

Le site public charge deux champions figés, uniquement depuis `docs/models/`.
Aucun appel réseau externe au chargement.

| Clé | Source | Sexe réel | Licence | État |
|---|---|---|---|---|
| `seema` | 3D Human Body Anatomy | générique, sans organes génitaux explicites | 🟡 CC BY-SA 4.0 | **champion homme** |
| `female-atlas` | Female Atlas | femme, appareil reproducteur complet | 🟢 MIT + CC BY 4.0 | **championne femme** |
| `nqwrc` | 3D Anatomy | homme (pénis, testicules, prostate), sans peau | 🔴 CC BY-NC-SA 4.0 | archivé |
| `wangzh` | Human Atlas 3D — wangzh | **mixte ♂/♀** (les deux appareils génitaux) | 🟢 MIT + CC BY 4.0 | archivé |

Sources éliminées du concours : `bodyatlas`, `slorksmo`, `enhanced`, `anatria`, `organui`.
Leurs fichiers restent présents dans le dépôt mais ne sont plus publiés dans `dist/`.

Un carré bleu représente l'homme et un carré rose la femme. Les deux corps sont
affichés côte à côte et chargés depuis des jeux de géométries indépendants, sans
fusion. Voir `docs/analyses/audit-sexes-sources.md`.

## Sélection d'une structure

Un clic (ou un tap) lance un rayon depuis la caméra dans la direction du pointeur.
Le premier maillage visible touché est sélectionné : un popup affiche son nom, une
courte description sourcée et sa licence, tandis qu'un fin contour turquoise
clignote autour de la pièce (statique si `prefers-reduced-motion`). Un clic dans le
vide, `Échap` ou le bouton × effacent la sélection. Le glisser de caméra est ignoré
(seuil de 6 px). Les descriptions sont construites par
`scripts/build_selection_descriptions.py` dans `docs/models/selection-descriptions.json`.

Voir `docs/veille/2026-11-24-forks-body-atlas.md`, `docs/models/concours-femme.md` et `LICENSES.md`.
