# CORPS — Atlas vivant du corps humain

Atlas 3D interactif en français pour explorer l'anatomie. Construit avec **Three.js** et **Vite**,
il assemble **BodyParts3D 4.0** (CC BY 4.0) et **Z-Anatomy** (CC BY-SA 4.0) en **2 009 structures**
(os, muscles, organes) avec 3 niveaux de détail. Le jeu de données est reconstruit de façon
reproductible depuis les sources épinglées (`npm run rebuild:verify` : 14 fichiers byte-identiques).
L'atlas est pédagogique et n'a aucune prétention diagnostique.

La feuille de route des **24 chantiers prioritaires** est dans
[`docs/chantiers-prioritaires.md`](docs/chantiers-prioritaires.md).
Le contrôle des collisions est assuré par `npm run check:collisions` et
`npm run test:collisions` (rapport `docs/analyses/collisions.md`).

**Application en ligne :** https://tasour.github.io/corps-humain/

### Version déployée

Le site public est la branche `gh-pages`, copie statique de `dist/`. Service worker `corps-v44`.
La version active est celle de `main` au moment du déploiement consigné dans
`docs/analyses/deploiement-2026-11-21.json`. Pour vérifier localement :
`npm test && npm run test:review && npm run test:textures && npm run lint:claims && npm run build`.
Les textures CC0 ne sont actives qu'avec `?tex=cc0` et restent éteintes par défaut tant que la
relecture anatomique humaine n'est pas signée.

![Aperçu de l'atlas 3D](docs/apercu.jpg)

![Simulation d'une pathologie](docs/pathologie.jpg)

## Fonctionnalités

- **2 009 structures réelles** (286 os, 695 muscles, 1 028 organes) et peau, en 3 LOD.
- **Explorateur hiérarchique**, recherche FR/latin, 22 waypoints curés, deep links `?vue=<id>&wp=<n>`.
- **Catalogue de vues remarquables**, tours guidés, coupes frontale/sagittale/transversale,
  éclaté global, étiquettes ancrées avec ligne de rappel.
- **Fiches de vérité** par structure (source, licence, limite), registre des licences dans l'app,
  2 009 pages statiques indexables + sitemap.
- **Quiz multi-modes** (trouver, nommer, système, côté, code TA2) et chasse aux organes.
- **Pathologies simulées** : 30 pathologies, 27 cibles anatomiques, sévérité, constantes et
  comparaison sain/malade — portées de la v1 vers le moteur v2, sans prétention diagnostique.
- **Textures CC0 par tissu** derrière `?tex=cc0` (désactivé par défaut) ; station de revue humaine
  dans `docs/revues/` et gate `npm run test:review`.
- Couches anatomiques : peau, muscles, squelette, organes, étiquettes.
- **Vue éclatée** : chaque organe se détache pour être observé séparément (slider %).
- **Coupe anatomique** : retire la partie avant du corps pour visualiser l'intérieur (squelette, organes).
- **Réinitialisation de la scène** : retour complet à l'anatomie, aux couches et à l'état.
- **Isolement** : un seul organe à l'écran, avec cadrage automatique.
- **Comparaison sain / malade** : bascule instantanée entre l'état physiologique et la pathologie.
- Simulation de gravité en temps réel : morphologie, couleurs, halos, secousses, monitorage
  (FC, SpO₂, FR, TA, température) et ECG.
- Recherche, filtres par système, fiches détaillées (fonction, causes, symptômes, prévention).
- Jeux pédagogiques : **pathologies simulées** et **chasse aux organes** (5 modes).
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

Le **jeu de données v2** (2 009 structures × 3 niveaux de détail) est décrit dans
[`docs/jeu-de-donnees-v2.md`](docs/jeu-de-donnees-v2.md) et généré via `npm run models:v2`.
Une démonstration de l'atlas complet avec rendu groupé et picking WASM est disponible
sur `/v2.html` (3 appels de rendu, ~1,2 ms CPU/frame pour 1,2 M triangles). Le détail
d'une structure se charge à la demande (medium sur mobile, high sur desktop) et un
gouverneur ajuste résolution et **LOD global automatique** (medium sur desktop rapide,
low sur mobile) selon le coût de rendu. Isoler un item ou un groupe charge son
détail maximal (high) et masque la peau. Les matériaux utilisent des **textures PBR
procédurales** (albedo tissu-spécifique, normal et roughness dérivées localement).
Son explorateur latéral
permet de rechercher et de cadrer chacune des 2 009 structures, d'isoler/focaliser
un item, et d'animer les groupes (éclaté, mouvements articulaires). Un accès rapide
« bras gauche », « poumons », « œil droit » etc. est disponible, ainsi que
**43 groupes anatomiques** (articulations, ceintures, muscles, organes) répartis
dans une section repliable : chaque groupe a son pivot, son axe et son mouvement
physiologique (flexion du coude, abduction de l'épaule, ouverture de la mâchoire…).

Un **contrôle qualité automatisé** (`scripts/analyze-v2.mjs`, `npm run analyze:v2`)
vérifie chaque structure (triangles dégénérés, normales, indices, bornes, doublons
AABB) et produit `docs/analyses/rapport-v2.md`. L'**audit topologique**
(`scripts/audit-qualite-3d.mjs`, `npm run audit:3d`) mesure en plus les arêtes
libres, les arêtes non-manifold, les composantes connexes, les faces dupliquées,
le winding inversé, l'aire, le volume, les longueurs d'arête et la densité
(tri/cm²) ; il produit `docs/analyses/qualite-3d.md`. Une **porte CI**
(`npm run audit:3d:check`) le compare structure par structure à une baseline
versionnée. Le **harnais de captures 8 angles** (`npm run captures:3d`) rend
chaque sujet pilote sur fond neutre en 1024 × 1024 avec un cadrage calculé sur
les huit coins de sa boîte ; le **scorecard** (`npm run scorecard:3d`) attribue
un statut S0–S4 à chaque structure ; l'**écart de silhouette** (`npm run
hausdorff:3d`) mesure la fidélité des LOD par BVH de triangles. Les critères
d'acceptation sont définis dans
[`docs/METHODOLOGIE-QUALITE-3D.md`](docs/METHODOLOGIE-QUALITE-3D.md) et la
feuille de route dans [`docs/plan-qualite-3d.md`](docs/plan-qualite-3d.md).
Une **batterie de 35 tests 3D**
(`npm run test:v2`) couvre le focus sous toutes les orientations, l'isolement, la
peau, les groupes, les animations, les waypoints, la chasse aux organes, le tour
du monde, le LOD et le mobile.
**19 contrôles d'accessibilité** (`npm run test:a11y`) mesurent les contrastes réels,
les noms accessibles, le focus visible, la navigation clavier du canvas et la
feuille de détails mobile. Les **43 groupes** sont couverts par
`npm run test:groupes` (8 contrôles de données) et `npm run test:groupes3d`
(52 mesures 3D : isolement exact, éclaté, mouvement, réinitialisation).
Les **waypoints** sont vérifiés par `npm run test:waypoints` (7 contrôles) et la
**chasse aux organes** par `npm run test:chasse` (7 contrôles : cibles existantes,
catégories, géométrie non vide). `npm test` enchaîne les contrôles hors navigateur
(groupes, waypoints, chasse, collisions).

**Au clavier** : `Tab` atteint le canvas, les flèches tournent autour du corps,
`+`/`-` zooment, `Entrée` sélectionne la structure au centre, `Échap` désélectionne
(ou ferme le tiroir mobile), `/` place le focus dans la recherche, `Début` recadre.

Chaque structure possède des **waypoints** (3 par défaut ; **22 structures majeures**
ont 2 à 6 anecdotes curées — cœur, poumons, estomac, pancréas, rate, vésicule,
intestins, trachée, vessie, cervelet, diaphragme, mandibule, humérus, tibia, reins,
cerveau, œil…), masqués tant que le bouton « Waypoints » n'est pas activé, plus une
visite guidée et plusieurs animations de scène : tour du monde, battement cardiaque,
respiration, clignement et flux sanguin. Les marqueurs sont des sprites de taille
constante à l'écran : ils restent visibles et cliquables à toute distance.

Une **chasse aux organes** est intégrée : 27 cibles (organes, os, muscle) tirées au
hasard, une seule couche visible à la fois, 90 secondes, +10 points par bonne réponse
et −2 secondes par erreur. Le clic passe par le picking exact du moteur v2, pas par
le modèle d'entités de la v1. La version classique (`/index.html`), qui conserve les
pathologies simulées, le jeu de diagnostic et la coupe anatomique, reste accessible
par un lien dans la fiche de structure.

L'interface v2 a été entièrement repensée : thème clair inspiré des atlas
médicaux, mise en page trois colonnes (explorateur / vue 3D / fiche), logo
inspiré de l'homme vitruvien de Léonard de Vinci, éclairage PBR avec
environnement, picking exact sur triangles, pivot de rotation commutable
(item / corps) et étiquettes placées sans chevaucher les waypoints.

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

## Sélecteur de couches

Le rail gauche liste six couches activables individuellement par checkbox :
peau, muscles, squelette, organes, vaisseaux, nerfs. Toutes sont cochées par
défaut. Une case maîtresse « Toutes les couches » les active ou les désactive
d'un seul geste. L'état est reflété dans l'URL (`?layers=skin,muscles`), ce qui
rend chaque capture reproductible.

## Validation anatomique externe

Les proportions du modèle live sont comparées à deux références publiques indépendantes :

- **ANSUR II** (Gordon et al., 2015, NATICK/TR-15/007) : 1 986 femmes et 4 082 hommes,
  moyennes et écarts-types recalculés depuis les CSV publics ;
- **De Leva 1996** : utilisé seulement pour les segments dont la définition concorde
  (la mesure du bras à 90° d'abduction est classée `notComparable`).

La méthode et ses garde-fous sont décrits dans `docs/models/truth-ledger.md`. Les
références sont hachées dans `docs/models/reference-checksums.json` ; aucun script
de mesure ne peut les modifier. Les rapports séparés sont publiés dans
`docs/analyses/validation-{metrique,topologique,provenance}-{female,male}.json`.

Le build publie l'empreinte `data-geometry` du modèle servi dans `dist/index.html`.
Le gate `python3 scripts/publication_gate.py` doit être vert avant publication.
Un invariant `npm test` vérifie que peau et rig restent cohérents à 1 mm près.

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
