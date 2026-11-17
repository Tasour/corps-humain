# CORPS — Atlas vivant du corps humain

Atlas 3D interactif en français pour explorer l'anatomie et visualiser l'effet des pathologies.
Construit avec **Three.js** et **Vite**, il s'appuie sur les maillages libres **BodyParts3D 4.0**
et **Z-Anatomy** pour la peau, les organes, les os et les muscles, avec une anatomie procédurale
de secours.

**Application en ligne :** https://tasour.github.io/corps-humain/

![Aperçu de l'atlas 3D](docs/apercu.jpg)

![Simulation d'une pathologie](docs/pathologie.jpg)

## Fonctionnalités

- **Maillages anatomiques réels BodyParts3D + Z-Anatomy** pour 47 structures (organes, os,
  muscles) et la peau, chargés progressivement avec repli procédural automatique.
- **22 organes**, **13 os**, **12 muscles** et **30 pathologies** répartis en 9 systèmes.
- Couches anatomiques : peau, muscles, squelette, organes, étiquettes.
- **Vue éclatée** : chaque organe se détache pour être observé séparément (slider %).
- **Coupe anatomique** : retire la partie avant du corps pour visualiser l'intérieur (squelette, organes).
- **Réinitialisation de la scène** : retour complet à l'anatomie, aux couches et à l'état.
- **Isolement** : un seul organe à l'écran, avec cadrage automatique.
- **Comparaison sain / malade** : bascule instantanée entre l'état physiologique et la pathologie.
- Simulation de gravité en temps réel : morphologie, couleurs, halos, secousses, monitorage
  (FC, SpO₂, FR, TA, température) et ECG.
- Recherche, filtres par système, fiches détaillées (fonction, causes, symptômes, prévention).
- Deux jeux pédagogiques : **mode diagnostic** et **chasse aux organes**.
- **Installable sur mobile (PWA)** : icône dédiée, plein écran et accès hors ligne.
- Interface responsive desktop / mobile, sans dépendance à un backend.

## Lancer le projet

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # génère dist/
npm run preview  # prévisualise le build
```

Le build utilise `base: "./"`, il fonctionne donc à la racine comme dans un sous-dossier
(GitHub Pages, serveur statique, etc.).

## Modèles 3D

Les maillages sont pré-générés dans `public/models/` :

- `anatomy.json` — manifeste (entités, offsets, bornes, nombre de triangles) ;
- `anatomy.bin` — positions Float32, normales Int16 normalisées, indices Uint16/Uint32 ;
- `anatomy.bin.gz` — même binaire compressé, servi en priorité (~5,3 Mo).

L'application affiche d'abord l'anatomie procédurale, puis remplace progressivement les
maillages dès que le binaire est disponible. En cas d'échec, le rendu procédural reste actif.

Le jeu de données combine deux sources :

1. **BodyParts3D 4.0**, via les maillages déjà convertis du dépôt
   [human-atlas](https://github.com/ashemag/human-atlas), pour la peau, les organes, les os
   et la majorité des muscles ;
2. **Z-Anatomy**, pour la thyroïde, le grand dorsal, les abdominaux et les obliques, absents
   de l'extraction BodyParts3D utilisée.

Pour régénérer les modèles, exporter d'abord les structures Z-Anatomy depuis le fichier
Blender officiel (`Z-Anatomy/Startup.blend`) :

```bash
blender -b /chemin/vers/Z-Anatomy/Startup.blend --python scripts/export-zanatomy.py
```

Puis fusionner les deux sources. L'export Z-Anatomy est lu par défaut dans
`zanatomy-export/` (variable `ZANATOMY_SOURCE` pour changer ce dossier) :

```bash
ANATOMY_SOURCE=/chemin/vers/human-atlas/public/models npm run models
```

Le script `scripts/build-anatomy-models.mjs` fusionne les pièces, simplifie avec
`meshoptimizer`, recentre les géométries et produit le binaire compressé. L'export Z-Anatomy
convertit les coordonnées Blender (Z-up) vers le repère de l'application (mètres, Y-up) et
calcule des normales lissées.

### Inventaire anatomique complet

Un inventaire exhaustif des **organes, os et muscles** disponibles dans Z-Anatomy, avec pour
chaque structure le meilleur modèle 3D (Z-Anatomy ou BodyParts3D), est fourni dans
[`docs/inventaire-anatomique/`](docs/inventaire-anatomique/) :

- [`rapport.md`](docs/inventaire-anatomique/rapport.md) — tableau lisible par catégorie ;
- [`structures.json`](docs/inventaire-anatomique/structures.json) — 2 202 maillages individuels
  (1 251 structures canoniques), noms TA2 français/latin, triangles, meilleur modèle
  et alternatives.

### Performance et passage à l'échelle

L'architecture pour afficher l'intégralité des structures sans surchauffe est décrite dans
[`docs/architecture-performance.md`](docs/architecture-performance.md) : rendu groupé
`BatchedMesh`, moteur Rust→WASM pour le picking et le culling, niveaux de détail et
budget thermique. Un prototype WASM (`wasm/corps-core`, 37 Ko) et un benchmark de
batching (`bench/batching.html`) l'accompagnent.

Le **jeu de données v2** (2 107 structures × 3 niveaux de détail) est décrit dans
[`docs/jeu-de-donnees-v2.md`](docs/jeu-de-donnees-v2.md) et généré via `npm run models:v2`.
Une démonstration de l'atlas complet avec rendu groupé et picking WASM est disponible
sur `/v2.html` (3 appels de rendu, ~1,2 ms CPU/frame pour 1,2 M triangles). Le détail
d'une structure se charge à la demande (medium sur mobile, high sur desktop) et un
gouverneur ajuste résolution et **LOD global automatique** (medium sur desktop rapide,
low sur mobile) selon le coût de rendu. Isoler un item ou un groupe charge son
détail maximal (high) et masque la peau. Les matériaux utilisent des **textures PBR
procédurales** (albedo tissu-spécifique, normal et roughness dérivées localement).
Son explorateur latéral
permet de rechercher et de cadrer chacune des 2 107 structures, d'isoler/focaliser
un item, et d'animer les groupes (éclaté, mouvements articulaires). Un accès rapide
« bras gauche », « poumons », « œil droit » etc. est disponible.

Un **contrôle qualité automatisé** (`scripts/analyze-v2.mjs`, `npm run analyze:v2`)
vérifie chaque structure (triangles dégénérés, normales, indices, bornes, doublons
AABB) et produit `docs/analyses/rapport-v2.md`. Une **batterie de 22 tests 3D**
(`npm run test:v2`) couvre le focus sous toutes les orientations, l'isolement, la
peau, les groupes, les animations, les waypoints, le tour du monde, le LOD et le mobile.

Chaque structure possède des **waypoints** (3 par défaut, anecdotes et explications
pour les structures majeures), une visite guidée, et plusieurs animations de scène :
tour du monde, battement cardiaque, respiration, clignement et flux sanguin.

## Installer sur téléphone (PWA)

L'application est une **Progressive Web App** : elle peut être installée depuis le navigateur,
sans passer par l'App Store ni le Play Store.

### Android / Chrome

1. Ouvrir https://tasour.github.io/corps-humain/
2. Appuyer sur le bouton **Installer** ou sur le menu **⋮** de Chrome.
3. Choisir **Installer l'application** (ou **Ajouter à l'écran d'accueil**).

### iOS / Safari

1. Ouvrir https://tasour.github.io/corps-humain/ dans **Safari**.
2. Appuyer sur le bouton **Partager**.
3. Choisir **Sur l'écran d'accueil**, puis **Ajouter**.

L'application s'ouvre ensuite en plein écran, avec son icône, et reste disponible
hors ligne après la première visite.

## Raccourci Omarchy

Pour ajouter l'application au lanceur Omarchy (Hyprland) :

```bash
bash packaging/install-launcher.sh
```

Le raccourci ouvre l'application hébergée en mode web-app, avec son icône et son nom dédiés.

## Structure

```
src/
  anatomy.js        anatomie procédurale de secours + matériau de peau
  scene.js          moteur Three.js, chargement des modèles, couches, pathologies
  main.js           état de l'application et interactions
  ui.js             rendu des panneaux et fiches
  games.js          mode diagnostic et chasse aux organes
  monitor.js        ECG et constantes vitales
  data/             pathologies et systèmes
  style.css         interface
public/
  models/           maillages BodyParts3D + Z-Anatomy (manifeste + binaire + .gz)
  sw.js             service worker (app shell + modèles hors ligne)
scripts/
  build-anatomy-models.mjs   extraction, simplification et packaging des modèles
  export-zanatomy.py         export Blender des structures Z-Anatomy
```

## Sources & crédits

Les maillages 3D proviennent de deux sources libres :

- **[BodyParts3D 4.0](https://dbarchive.biosciencedbc.jp/en/bodyparts3d/download.html)**,
  © The Database Center for Life Science, diffusé sous licence
  [CC Attribution 4.0 International](https://creativecommons.org/licenses/by/4.0/).
  Les maillages ont été extraits, fusionnés, simplifiés et convertis en mètres / Y-up
  pour le web (voir `public/models/anatomy.json`).
- **[Z-Anatomy](https://github.com/Z-Anatomy/Models-of-human-anatomy)**,
  « Z-Anatomy — The libre 3D atlas of anatomy », diffusé sous licence
  [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0/).
  Les maillages Z-Anatomy (thyroïde, grand dorsal, abdominaux, obliques) sont dérivés
  de BodyParts3D et ont été exportés depuis le fichier Blender officiel, puis simplifiés
  et convertis dans le même repère.

Le jeu de données combiné `public/models/anatomy.bin` est donc distribué sous
**CC BY-SA 4.0**, avec attribution de BodyParts3D et de Z-Anatomy. Toute redistribution
d'un modèle dérivé doit conserver ces attributions et la même licence de partage.

Les contenus pédagogiques sont originaux. Les idées de visualisation s'inspirent de projets libres :

- [ashemag/human-atlas](https://github.com/ashemag/human-atlas) — vue éclatée (slider),
  isolement, comparaison sain / malade, pipeline de conversion des maillages.
- [Z-Anatomy](https://github.com/Z-Anatomy/Models-of-human-anatomy) — maillages Z-Anatomy
  et référence de modélisation anatomique libre.
- [anatomyatelier.org](https://anatomyatelier.org/) — inspiration pédagogique.

## Avertissement

Outil pédagogique de visualisation. Il ne remplace ni un diagnostic ni un avis médical.
En cas de symptômes réels, consultez un professionnel de santé.

## Licence

Le **code** est sous licence MIT — voir [LICENSE](LICENSE).

Les **maillages anatomiques** de `public/models/` sont sous licence **CC BY-SA 4.0** :
BodyParts3D 4.0 (© The Database Center for Life Science, CC BY 4.0) et Z-Anatomy
(CC BY-SA 4.0). Voir `public/models/README.md` pour le détail des attributions.
