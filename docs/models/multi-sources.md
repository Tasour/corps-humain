# Sources anatomiques disponibles

Le sélecteur `SRC` propose trois jeux de modèles, chargés uniquement depuis
`docs/models/`. Aucun appel réseau externe au chargement.

| Clé | Source | Sexe réel | Licence | État |
|---|---|---|---|---|
| `seema` | 3D Human Body Anatomy | générique, sans organes génitaux explicites | 🟡 CC BY-SA 4.0 | en compétition |
| `nqwrc` | 3D Anatomy | homme (pénis, testicules, prostate), sans peau | 🔴 CC BY-NC-SA 4.0 | comparaison locale |
| `wangzh` | Human Atlas 3D — wangzh | **mixte ♂/♀** (les deux appareils génitaux) | 🟢 MIT + CC BY 4.0 | en compétition |

Sources éliminées du concours : `bodyatlas`, `slorksmo`, `enhanced`.
Leurs fichiers restent présents dans le dépôt mais ne sont plus proposés dans le site.

Un carré bleu représente l’homme et un carré rose la femme. Les sources
aucune ne fournissant un corps féminin complet séparé, le carré rose porte « Vide ». Voir `docs/analyses/audit-sexes-sources.md`.

Voir `docs/veille/2026-11-24-forks-body-atlas.md` et `LICENSES.md`.

## Concours

Homme : `seema`, `nqwrc`, `wangzh`.
Femme : `female-atlas`, `enhanced`, `slorksmo`, `bodyatlas`, `anatria`, `organui`.
Voir `docs/models/concours-femme.md`.
