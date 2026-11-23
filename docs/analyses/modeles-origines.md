# Origine des modèles 3D — 2026-11-23

Deux modèles très différents coexistaient dans l'application. Ce tableau
établit lequel est servi, d'où il vient, et ce qui a changé.

| Vue | Fichiers servis | Source réelle | Maillages | Matériaux | État |
|---|---|---|---|---|---|
| **Corps animé (vue par défaut)** | `docs/models/corps-female-opt.glb`, `corps-male-opt.glb` | Exports Blender `docs/humain-femme-complet.blend` / `humain-homme-complet.blend` (23/11 06:50), réexportés 06:52 puis optimisés | 128 | 6 PBR (peau, squelette, muscles, organes, vaisseaux, nerfs) | ✅ dernier travail Blender |
| **Ancien atlas** (`ancien-atlas.html`) | `models/v2/*.bin.gz` + `manifest.json` | Z-Anatomy + BodyParts3D 4.0 (`version 2.1-stock`) | 1989 structures | matériaux de la banque stock | ⚠️ ancien modèle, chargé uniquement à la demande |

## Preuves

- Le `manifest.json` de l'ancien atlas déclare `version: "2.1-stock"` et liste
  explicitement Z-Anatomy (CC BY-SA 4.0) et BodyParts3D 4.0 (CC BY 4.0).
- Sur le téléphone, l'ancien atlas affichait `1989 visibles`, `794k tris`,
  `1 fps` — ce n'était donc pas le modèle Blender.
- Les GLB optimisés étaient générés avec `gltf-transform optimize --palette true`
  par défaut, ce qui **fusionnait les 6 matériaux en 2** et produisait un
  mannequin blanc. Le script `scripts/optimize-glb-v5.mjs` force
  `--palette false` : les 6 matériaux sont conservés.
- Le matériau peau du `.blend` reliait `Base Color` à un attribut de couleur de
  sommet, ce qui faisait écrire un facteur blanc au lieu de la couleur PBR.
  `scripts/export-glb-v5.py` coupe ce lien : `baseColorFactor` vaut désormais
  `[0.72, 0.50, 0.42, 1]` dans le GLB.

## Mesures des GLB livrés

| Modèle | Taille | Maillages | Matériaux | Animations | Extensions |
|---|---|---|---|---|---|
| `corps-female-opt.glb` | 9,62 Mo | 128 | 6 | 6 danses | EXT_meshopt_compression, KHR_mesh_quantization |
| `corps-male-opt.glb` | 9,62 Mo | 128 | 6 | 6 danses | EXT_meshopt_compression, KHR_mesh_quantization |

Les GLB bruts de 53 Mo restent dans `docs/models/` comme source d'export, mais
ne sont plus copiés dans `dist/`.

## Limite connue

Les `.blend` ne contiennent **aucune image/texture** : les six matériaux sont
des matériaux PBR à couleur unie. « Matériaux complets » signifie ici les six
matériaux PBR d'origine, pas des textures photo. Le rendu reste stylisé par
rapport à un rendu Blender avec éclairage de studio.
