# Maillages anatomiques

Ce dossier contient les maillages 3D combinés de l'atlas CORPS :

- `anatomy.json` — manifeste (entités, offsets, bornes, nombre de triangles) ;
- `anatomy.bin` — positions Float32, normales Int16 normalisées, indices Uint16/Uint32 ;
- `anatomy.bin.gz` — même binaire compressé.

## Sources et attributions

- **BodyParts3D 4.0** — © The Database Center for Life Science.
  Source : https://dbarchive.biosciencedbc.jp/en/bodyparts3d/download.html
  Licence : CC BY 4.0 — https://creativecommons.org/licenses/by/4.0/
  Maillages convertis via https://github.com/ashemag/human-atlas

- **Z-Anatomy — The libre 3D atlas of anatomy** — Gauthier Kervyn et Marcin Zielinski.
  Source : https://github.com/Z-Anatomy/Models-of-human-anatomy
  Licence : CC BY-SA 4.0 — https://creativecommons.org/licenses/by-sa/4.0/
  Structures utilisées : thyroïde, grand dorsal, abdominaux, obliques.

## Licence du jeu de données

Le jeu de données combiné (`anatomy.bin`, `anatomy.bin.gz`, `anatomy.json`) est distribué
sous **CC BY-SA 4.0**. Il combine des éléments sous CC BY 4.0 (BodyParts3D) et CC BY-SA 4.0
(Z-Anatomy). Toute redistribution ou adaptation doit conserver les attributions ci-dessus
et être partagée sous la même licence.

Le code de l'application reste sous licence MIT (voir `LICENSE` à la racine du dépôt).

## Régénération

Voir la section « Modèles 3D » du `README.md` principal. Les fichiers sont produits par
`scripts/build-anatomy-models.mjs` à partir de l'export BodyParts3D et de
`scripts/export-zanatomy.py`.
