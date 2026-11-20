# Provenance des sources 3D — atlas CORPS

Ce document est la source de vérité pour la provenance et la reproductibilité du jeu de
données v2. Toute régénération doit vérifier les empreintes ci-dessous avec
`npm run sources:check`.

## Sources

| Source | Licence | Rôle | Emplacement persistant |
|---|---|---|---|
| Z-Anatomy | CC BY-SA 4.0 | Maillages anatomiquesprincipaux | `zanatomy-export/` (dans le dépôt) |
| BodyParts3D 4.0 via [ashemag/human-atlas](https://github.com/ashemag/human-atlas) | CC BY 4.0 (Human-atlas : à confirmer) | Organes, os, muscles et peau complémentaires | `/home/tasour/.cache/corps-sources/human-atlas/public/models/` |
| TA2 (FMA) via Z-Anatomy | CC BY-SA 4.0 | Identifiants anatomiques | `docs/inventaire-anatomique/` (dérivé) |

Le dossier `/tmp/opencode/human-atlas` utilisé lors des premières phases était un tmpfs :
il a disparu entre deux sessions. La source est désormais **clonée de façon persistante**
dans `/home/tasour/.cache/corps-sources/` et vérifiable par empreinte.

## Empreintes

`docs/analyses/sources-checksums.json` contient le SHA-256 des fichiers suivants :

- `zanatomy-export/zanatomy-all.json` et `zanatomy-all.bin`
- `zanatomy-export/zanatomy.json` et `zanatomy.bin`
- `<source BP3D>/atlas.json` et tous les chunks `body-*.bin.gz` référencés par l'atlas
- `docs/inventaire-anatomique/structures.json`

La date de vérification et la version du dépôt human-atlas (commit Git) y sont consignées.

## Commandes

```bash
npm run sources:check          # vérifie les empreintes, échoue si un fichier manque ou diffère
npm run sources:refresh        # recalcule le fichier d'empreintes après une mise à jour source
```

## Règle

Aucun rebuild du jeu de données (`npm run models:v2`) ne doit être lancé si
`npm run sources:check` échoue. Les corrections de la revue visuelle (vagues 0–2) ont été
appliquées sans rebuild ; le prochain rebuild devra repartir de ces sources vérifiées.
