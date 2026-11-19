# Waypoints pédagogiques — atlas CORPS v2

Date : 19 novembre 2026 · Page : `/v2.html` · Preuve : `npm run test:waypoints` → **7/7**,
`npm run test:v2` → **31/31**. Captures : `docs/analyses/waypoints/`.

## 1. Ce qui a changé

| Avant | Après |
|---|---|
| 6 structures curées, dont une morte (`organ:bp-left-lung`) | **22 structures curées**, toutes présentes dans le manifeste |
| 3 waypoints génériques pour tout le reste | 3 génériques + 2 à 6 anecdotes par structure curée |
| Marqueurs = sphères de 2 mm, invisibles de loin | `Sprite` en `sizeAttenuation: false` (26 px constants) |
| Fiche d'anecdote recouvrant la barre d'animations | Fiche empilée au-dessus, hauteur mesurée |

## 2. Contenu curé

| Système | Structures |
|---|---|
| Cardiovasculaire | cœur (4 waypoints), rate |
| Respiratoire | lobes pulmonaires gauche supérieur/inférieur, trachée, diaphragme |
| Digestif | estomac, pancréas, vésicule biliaire, intestin grêle, gros intestin |
| Urinaire | reins G/D, vessie |
| Nerveux | cerveau, cervelet, œil droit |
| Ostéo-articulaire | mandibule, humérus gauche, fémurs G/D, tibia gauche |

Chaque anecdote est vérifiable : pH gastrique 1,5–3,5, 16 à 20 anneaux
trachéaux en C, îlots de Langerhans, nerf phrénique issu de C3–C5, 1,2 million de
fibres dans le nerf optique, etc.

## 3. Contrôles automatisés

`tests/waypoints.test.mjs` vérifie, hors navigateur :

1. chaque identifiant curé existe dans `public/models/v2/manifest.json` ;
2. 2 à 6 waypoints par structure curée ;
3. libellés, titres et textes renseignés (40 à 320 caractères) ;
4. libellés uniques à l'intérieur d'une structure ;
5. positions contenues dans la boîte englobante de la structure ;
6. une structure non curée reçoit 3 waypoints génériques dans ses bornes ;
7. au moins 20 structures curées (garde-fou de couverture).

`tests/v2-tests.mjs` ajoute un contrôle de bout en bout : recherche « estomac »,
sélection de la structure réelle, puis vérification que les libellés affichés sont
bien `Fundus`, `Corps de l'estomac` et `Pylore`, et que le nombre de marqueurs 3D
égale le nombre de waypoints.

## 4. Défauts corrigés

- **Waypoint mort** : `organ:bp-left-lung` n'existait pas ; les anecdotes du poumon
  gauche ont été reportées sur les deux lobes réels. Le test 1 empêche la récidive.
- **Marqueurs invisibles** : une sphère de rayon `min(0,004 ; spread × 0,018)` m
  mesure quelques pixels à l'écran et disparaît complètement quand la caméra recule.
  Les sprites à taille constante restent lisibles et cliquables.
- **Recouvrement** : `#waypoint-info` était à `bottom: 80px` fixe, au-dessus d'une
  barre d'animations qui peut faire deux lignes. La position est maintenant calculée
  à partir de `animBar.offsetHeight`, sur desktop et sur mobile.

## 5. Limites

- Les 2 017 structures restantes conservent des waypoints génériques. Ils sont
  exacts (positions dans les bornes) mais n'apportent pas de connaissance
  anatomique spécifique.
- Les anecdotes sont en français uniquement ; les fiches multilingues annoncées
  par le chantier 5 restent à faire.
- Le manifeste ne contient pas d'œsophage : le waypoint « hiatus œsophagien » du
  diaphragme décrit un orifice réel, mais aucune structure œsophagienne ne peut être
  sélectionnée.
