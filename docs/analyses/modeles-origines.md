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

## Reconstruction v6 (dernière version)

`scripts/rebuild-anatomy-v6.py` reconstruit toutes les couches sauf le
squelette à partir de `anatomy-female.glb` / `anatomy-male.glb` (CC BY 4.0) :
peau, muscles, organes, vaisseaux et nerfs, avec une couleur par structure
d'après `catalog.json` (107 matériaux femme, 103 homme). Six muscles faciaux
nommés ont été ajoutés. Les muscle sont attachés avec des poids automatiques
au lieu d'un parentage rigide (capture `v7-muscles-full.png`). L'optimiseur
`optimize-glb-v5.mjs` utilise `copy` + `meshopt` : `optimize` supprimait 39
maillages musculaires (139 → 100), désormais tous conservés.

## Modèle féminin externe (CC BY 4.0)

Le corps féminin provient de `open-anatomy-3d/anatomy-female.glb` (cache local
`/home/tasour/.cache/corps-sources/open-anatomy-3d/`), licence **CC BY 4.0**
(preuve : `node_modules/open-anatomy-3d/LICENSE-MODELS.md`). Il apporte la peau
féminine, `uterus`, `vagina`, `ovary_l/r`, `breast_l/r`, et ne contient pas de
prostate. Il a été importé dans `docs/humain-femme-anatomie.blend`, mis à
l'échelle sur `Corps Rig`, puis attaché avec des poids automatiques
(`scripts/import-female-anatomy.py`). Attribution : projet open-anatomy-3d,
licence CC BY 4.0, https://creativecommons.org/licenses/by/4.0/.

## Limites articulaires

`docs/models/joint-limits.json` définit les amplitudes anatomiques standard.
Elles sont appliquées **à l'export** (`scripts/clamp-animations.py`). Le clamp
runtime a été désactivé dans `src/corps-viewer.js` : les rotations des os sont
relatives à leur pose de repos, pas à l'identité ; un clamp runtime les
faussait (jambes repliées, torse écrasé sur les frames 0–120).

## Couches nerveuse et vasculaire enrichies (CC0)

- Nerfs : `full-body-peripheral-nervous-system-figure.glb` (Innerscene, CC0) —
  382 maillages assemblés en un seul arbre nerveux (`nerves_peripheral`),
  système nerveux périphérique complet du corps. L'enveloppe d'orientation
  MakeHuman a été exclue.
- Vaisseaux : le modèle CC0 Innerscene a été écarté à la demande de
  l'utilisateur. Le jeu conservé est celui d'origine open-anatomy (22 maillages,
  couleurs par structure), seul affiché dans la couche Vaisseaux.

Aucune attribution requise (CC0), source documentée pour traçabilité.

## Mécanique des bras et poids

- `scripts/rebuild-arm-animations.py` reconstruit pour les 6 danses la chaîne
  clavicule → scapula → upperarm → forearm → main, avec des paramètres
  distincts par danse (amplitudes coude/épaule/main et alternance gauche/droite).
- L'auto-poids échouait sur la peau masculine (tous les poids à 0, donc aucun
  mouvement visible malgré des os animés). Les poids de l'ancienne peau
  masculine sont transférés par plus proche sommet sur la nouvelle peau
  (moyenne des poids 0,999, 0 sommet à zéro).

## Limite connue

Les `.blend` ne contiennent **aucune image/texture** : les six matériaux sont
des matériaux PBR à couleur unie. « Matériaux complets » signifie ici les six
matériaux PBR d'origine, pas des textures photo. Le rendu reste stylisé par
rapport à un rendu Blender avec éclairage de studio.
