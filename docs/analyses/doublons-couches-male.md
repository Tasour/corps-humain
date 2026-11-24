# Doublons apparents de couches — homme — 2026-11-24

## Question

L'utilisateur a l'impression qu'il existe deux squelettes et deux muscles chez
l'homme, et que le « bug muscle » pourrait venir de la version femme.

## Méthode

- Inventaire des noms de nœuds du GLB homme et comparaison avec le catalogue.
- Comparaison des noms de maillages homme et femme.
- Test visuel avec toutes les couches, aucune couche, puis couches isolées.
- Cycle femme → homme → femme → homme dans le viewer, avec détection des
  organes exclusifs à chaque sexe.

## Résultats

### 1. Pas de contamination femme→homme

| Sexe affiché | Organes féminins visibles | Organes masculins visibles |
|---|---|---|
| femme | utérus, ovaires, trompes, vagin, seins | aucun |
| homme | aucun | prostate, appareil reproducteur |

Le cycle femme → homme → femme → homme ne laisse aucun résidu. L'hypothèse
« le muscle bug vient de la version femme » est **infirmée**.

### 2. Ce qui ressemble à un second squelette

Le GLB contient un objet `Corps Rig` de type armatures avec **66 os**, en plus
des **28 maillages** catalogués comme `skeleton`. Dans Blender, ces deux
représentations coexistent : le rig sert de support de déformation, les
maillages sont la géométrie visible. Le viewer web n'affiche pas l'armature.
Ce n'est donc pas un doublon de géométrie, mais un doublon de représentation.

Les 12 entrées `joints` du catalogue sont des **ancres**, sans maillage
correspondant dans le GLB. Elles n'affichent donc jamais de deuxième
squelette.

### 3. Ce qui ressemble à un second muscle

Sept maillages ont des noms de nœuds absents du catalogue :

| Nom du nœud | Nom du maillage GLB | Système suggéré |
|---|---|---|
| frontalis | Sphère | muscles |
| orbicularis_oculi_l | Sphère.001 | muscles |
| orbicularis_oculi_r | Sphère.002 | muscles |
| masseter_l | Sphère.003 | muscles |
| masseter_r | Sphère.004 | muscles |
| orbicularis_oris | Sphère.005 | muscles |
| Cauda equina root 1 | Cauda equina root 1 | nerves |

Ce sont les six muscles faciaux et une racine nerveuse sacrée. Ils existent
dans **les deux sexes** avec les mêmes noms. Ils étaient masqués du viewer
parce que `systemOf` ne les connaissait pas, ce qui donnait l'impression d'un
muscle « sans couche ».

Une tentative de catalogage les a rendus visibles, mais les six sphères
faciales sont rendues en blanc et se lisent comme des fragments osseux. La
modification a donc été **annulée** : le GLB et le catalogue sont revenus à
l'état `22c16b9`.

### 4. Comptes

- GLB homme : 135 maillages.
- Catalogue : 147 entrées, dont 12 ancres `joints` sans maillage.
- Viewer, toutes couches cochées avant catalogage : 129 objets visibles.
- Viewer, aucune couche : 0 objet visible.
- Aucun maillage visible ne porte le nom d'un organe de l'autre sexe.

## Conclusion

Il n'y a **ni double squelette géométrique, ni muscle féminin dans l'homme**.
Les doublons perçus viennent de l'armature Blender et des six muscles faciaux
non catalogués. Aucun modèle ni catalogue n'a été modifié de façon
permanente ; ce rapport est la seule livraison de cette passe.

## Intégration finale

Les six muscles faciaux ont reçu le matériau musculaire `#b5463d` dans les
deux GLB, sans modification de géométrie. Le catalogue contient désormais 153
entrées, dont ces six muscles. Le viewer affiche 135 objets visibles chez
l'homme et 140 chez la femme, toutes couches cochées, et 0 objet toutes
couches décochées. Les captures de preuve sont `integration-male-all.png`,
`integration-male-muscles.png`, `integration-female-all.png` et
`integration-male-mobile.png`.
