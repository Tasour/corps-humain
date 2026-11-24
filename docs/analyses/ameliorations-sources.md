# Améliorations des sources — 2026-11-24

Aucun set n'a été mélangé à un autre. Chaque source a été améliorée séparément.

## Body Atlas 3D — nerfs

- Avant : 490 maillages nerveux.
- Après : **577 maillages** (ajout CC0 de 40 nerfs crâniens et 7 éléments cerveau/moelle).
- Capture : `improve-bodyatlas.png`.

## slorksmo et enhanced — muscles et pieds

- `slorksmo` homme : 402 muscles, 296 os squelettiques dont 6 os du pied.
- `slorksmo` femme : 16 muscles `muscular` + 76 `donor-muscle` désormais
  correctement classés muscles (**168 visibles**) ; 65 os squelettiques,
  **aucun os du pied** dans la source.
- `enhanced` femme : 16 muscles seulement, 91 os, **aucun os du pied**.
- Ces absences sont des limites des jeux de données source, pas un bug de mapping.
- Captures : `improve-slorksmo-female-muscles.png`, `improve-enhanced-female-muscles.png`.

## 3D Human Body Anatomy (SeemaBansal)

- Le maillage `Modesty_cover` a été retiré : 2 198 → **2 197 maillages**.
- Les organes sont colorés par appareil : cœur rouge, poumons rose, foie brun,
  rein/urinaire pourpre, tube digestif ocre, cerveau/nerfs doré, reproducteur rose.
- La peau et les muscles sont translucides en mode « toutes couches », ce qui
  rend les organes visibles.
- Captures : `improve-seema-fixed.png`, `improve-seema-organs.png`.

## nqwrc

- Le modèle est **masculin uniquement** : le sélecteur de sexe recharge le même
  modèle pour « femme ». À considérer comme limite source.
- Aucun maillage de peau n'existe dans le jeu de données ; aucun n'a été importé
  d'ailleurs (interdiction de mélanger les sets).
- DPR plafonné à 1 pour cette source afin de limiter le lag.
- Chargement mesuré : ~3 s en local après平行isation.

## wangzh

- Les 14 chunks sont désormais téléchargés et décodés en parallèle.
- Chargement mesuré : ~2,4 s en local (avant : blocage ou très lent).

## Limites conservées

- La femme n'existe réellement que dans Body Atlas, slorksmo et enhanced.
- Les setsSeemaBansal, nqwrc et wangzh restent masculins.
- nqwrc reste en comparaison locale sous licence CC BY-NC-SA.
