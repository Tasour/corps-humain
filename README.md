# CORPS — Atlas vivant du corps humain

Atlas 3D interactif en français pour explorer l'anatomie et visualiser l'effet des pathologies.
Construit avec **Three.js** et **Vite**, il s'appuie sur les maillages libres **BodyParts3D 4.0**
pour la peau, les organes, les os et les muscles, avec une anatomie procédurale de secours.

**Application en ligne :** https://tasour.github.io/corps-humain/

![Aperçu de l'atlas 3D](docs/apercu.jpg)

![Simulation d'une pathologie](docs/pathologie.jpg)

## Fonctionnalités

- **Maillages anatomiques réels BodyParts3D** pour 43 structures (organes, os, muscles, peau),
  chargés progressivement avec repli procédural automatique.
- **22 organes**, **13 os**, **11 muscles** et **30 pathologies** répartis en 9 systèmes.
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
- `anatomy.bin.gz` — même binaire compressé, servi en priorité (~4,9 Mo).

L'application affiche d'abord l'anatomie procédurale, puis remplace progressivement les
maillages dès que le binaire est disponible. En cas d'échec, le rendu procédural reste actif.

Pour régénérer les modèles à partir des données BodyParts3D déjà converties
(dépôt [human-atlas](https://github.com/ashemag/human-atlas)) :

```bash
ANATOMY_SOURCE=/chemin/vers/human-atlas/public/models npm run models
```

Le script `scripts/build-anatomy-models.mjs` fusionne les pièces, simplifie avec
`meshoptimizer`, recentre les géométries et produit le binaire compressé.

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
  models/           maillages BodyParts3D (manifeste + binaire + .gz)
  sw.js             service worker (app shell + modèles hors ligne)
scripts/
  build-anatomy-models.mjs   extraction, simplification et packaging des modèles
```

## Sources & crédits

Les maillages 3D proviennent de **[BodyParts3D 4.0](https://dbarchive.biosciencedbc.jp/en/bodyparts3d/download.html)**,
© The Database Center for Life Science, diffusés sous licence
[CC Attribution 4.0 International](https://creativecommons.org/licenses/by/4.0/).
Ils ont été extraits, fusionnés, simplifiés et convertis en mètres / Y-up pour le web
(voir `public/models/anatomy.json`). Les structures non disponibles dans BodyParts3D
(thyroïde, dorsaux, abdominaux) restent générées procéduralement.

Les contenus pédagogiques sont originaux. Les idées de visualisation s'inspirent de projets libres :

- [ashemag/human-atlas](https://github.com/ashemag/human-atlas) — vue éclatée (slider),
  isolement, comparaison sain / malade, pipeline de conversion des maillages.
- [Z-Anatomy](https://github.com/Z-Anatomy/Models-of-human-anatomy) — référence
  de modélisation anatomique libre.
- [anatomyatelier.org](https://anatomyatelier.org/) — inspiration pédagogique.

## Avertissement

Outil pédagogique de visualisation. Il ne remplace ni un diagnostic ni un avis médical.
En cas de symptômes réels, consultez un professionnel de santé.

## Licence

Code sous licence MIT — voir [LICENSE](LICENSE).
