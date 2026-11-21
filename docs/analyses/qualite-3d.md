# Audit qualité 3D — mesures topologiques

Généré le 2026-11-21 par `npm run audit:3d`.
LOD analysé(s) : **high** · 1 989 enregistrements · 4 749 553 triangles.

## Synthèse

| Indicateur | Valeur |
|---|---:|
| Structures étanches et manifold | **1 264 / 1 989** (63.5 %) |
| Structures avec arêtes libres (bords) | 720 |
| Structures avec arêtes non-manifold | 67 |
| Structures en plusieurs composantes connexes | 581 |
| Triangles dégénérés | 0 (0 %) |
| Faces inversées (normale de face ≠ sommets) | 10 131 (0.213 %) |
| Faces dupliquées | 37 |
| Structures à volume signé négatif (winding inversé) | 0 |
| Normales nulles | 0 |
| Indices hors bornes | 0 |

## Par catégorie et par LOD

| Catégorie | LOD | Structures | Triangles | Médiane | P10 | P90 | Densité méd. (tri/cm²) | Étanches | Non-manifold | Pluri-composantes |
|---|---|---:|---:|---:|---:|---:|---:|---:|---:|---:|
| bone | high | 287 | 621 226 | 984 | 276 | 5 364 | 43.4 | 257 | 11 | 19 |
| muscle | high | 683 | 2 189 344 | 1 280 | 174 | 6 548 | 33.9 | 542 | 12 | 87 |
| organ | high | 1 019 | 1 938 983 | 672 | 168 | 4 016 | 95.9 | 465 | 44 | 475 |

## Par source

| Source | Structures | Triangles | Étanches | Winding inversé | Pluri-composantes |
|---|---:|---:|---:|---:|---:|
| Z-Anatomy | 1 524 | 3 504 653 | 1 194 | 0 | 282 |
| BodyParts3D 4.0 | 465 | 1 244 900 | 70 | 0 | 299 |

## 15 structures les plus ouvertes (ratio arêtes libres / triangles)

| Structure | Cat. | LOD | Tris | Arêtes libres | Ratio |
|---|---|---|---:|---:|---:|
| `organ:bp-eyebrow` | organ | high | 6 146 | 13 826 | 225.0 % |
| `organ:bp-mons-pubis` | organ | high | 2 718 | 5 228 | 192.3 % |
| `organ:bp-visceral-peritoneum` | organ | high | 26 672 | 45 670 | 171.2 % |
| `organ:bp-pancreatic-duct` | organ | high | 1 816 | 2 784 | 153.3 % |
| `organ:zonular-fibres-l` | organ | high | 4 | 6 | 150.0 % |
| `organ:zonular-fibres-r` | organ | high | 4 | 6 | 150.0 % |
| `muscle:bp-extensor-carpi-ulnaris-l` | muscle | high | 1 016 | 1 312 | 129.1 % |
| `muscle:bp-extensor-carpi-ulnaris-r` | muscle | high | 1 008 | 1 300 | 129.0 % |
| `muscle:lateral-patellar-retinaculum-l` | muscle | high | 7 | 9 | 128.6 % |
| `muscle:lateral-patellar-retinaculum-r` | muscle | high | 7 | 9 | 128.6 % |
| `organ:bp-inferior-phrenic-artery-r` | organ | high | 1 568 | 1 904 | 121.4 % |
| `organ:bp-corona-ciliaris-l` | organ | high | 10 103 | 11 527 | 114.1 % |
| `organ:central-canal` | organ | high | 16 | 18 | 112.5 % |
| `bone:bp-intervertebral-symphysis` | bone | high | 2 852 | 3 066 | 107.5 % |
| `organ:bp-corona-ciliaris-r` | organ | high | 11 781 | 12 651 | 107.4 % |

## 15 structures les plus fragmentées (composantes connexes)

| Structure | Cat. | LOD | Tris | Composantes |
|---|---|---|---:|---:|
| `organ:bp-visceral-peritoneum` | organ | high | 26 672 | 9 853 |
| `organ:bp-eyebrow` | organ | high | 6 146 | 3 869 |
| `organ:bp-large-intestine` | organ | high | 22 919 | 3 025 |
| `organ:bp-corona-ciliaris-r` | organ | high | 11 781 | 1 948 |
| `organ:bp-corona-ciliaris-l` | organ | high | 10 103 | 1 820 |
| `organ:bp-mons-pubis` | organ | high | 2 718 | 1 341 |
| `organ:bp-viscerocranium-r` | organ | high | 43 122 | 1 294 |
| `muscle:bp-levator-ani-r` | muscle | high | 5 889 | 1 203 |
| `muscle:bp-levator-ani-l` | muscle | high | 10 740 | 1 146 |
| `organ:bp-left-subclavian-artery-l` | organ | high | 33 339 | 866 |
| `organ:bp-right-subclavian-artery-r` | organ | high | 33 054 | 849 |
| `organ:bp-viscerocranium-l` | organ | high | 37 464 | 682 |
| `bone:bp-intervertebral-symphysis` | bone | high | 2 852 | 664 |
| `organ:bp-nervous-system` | organ | high | 30 676 | 655 |
| `organ:bp-brain` | organ | high | 30 516 | 652 |

## 15 structures fermées à winding inversé (volume signé négatif)

| Structure | Cat. | LOD | Tris | Volume (cm³) |
|---|---|---|---:|---:|

## 15 densités les plus faibles (triangles / cm²)

| Structure | Cat. | LOD | Tris | Aire (cm²) | Densité | Arête max (mm) |
|---|---|---|---:|---:|---:|---:|
| `organ:bp-transverse-mesocolon` | organ | high | 872 | 836,47 | 1 | 82,9 |
| `muscle:lateral-patellar-retinaculum-l` | muscle | high | 7 | 6,49 | 1.1 | 49,4 |
| `muscle:lateral-patellar-retinaculum-r` | muscle | high | 7 | 6,49 | 1.1 | 49,4 |
| `muscle:medial-patellar-retinaculum-r` | muscle | high | 10 | 6,67 | 1.5 | 50,9 |
| `muscle:medial-patellar-retinaculum-l` | muscle | high | 10 | 6,67 | 1.5 | 50,9 |
| `organ:bp-femoral-artery-l` | organ | high | 208 | 125,15 | 1.7 | 116,4 |
| `organ:descending-colon` | organ | high | 765 | 445,19 | 1.7 | 26,1 |
| `muscle:linea-alba` | muscle | high | 338 | 195,57 | 1.7 | 123,7 |
| `organ:ascending-colon` | organ | high | 539 | 307,95 | 1.8 | 27,7 |
| `organ:bp-femoral-artery-r` | organ | high | 230 | 124,14 | 1.9 | 110,3 |
| `organ:bp-femoral-vein-r` | organ | high | 212 | 110,92 | 1.9 | 124,5 |
| `organ:bp-femoral-vein-l` | organ | high | 228 | 110,35 | 2.1 | 131,7 |
| `organ:transverse-colon` | organ | high | 511 | 241,72 | 2.1 | 28,1 |
| `muscle:posterior-layer-of-thoracolumbar-fascia-l` | muscle | high | 313 | 142,96 | 2.2 | 37,9 |
| `muscle:posterior-layer-of-thoracolumbar-fascia-r` | muscle | high | 313 | 142,96 | 2.2 | 37,9 |

## 15 arêtes les plus longues

| Structure | Cat. | LOD | Tris | Arête max (mm) | P99 (mm) |
|---|---|---|---:|---:|---:|
| `bone:tibia-l` | bone | high | 1 670 | 151,5 | 62,47 |
| `bone:tibia-r` | bone | high | 1 670 | 151,5 | 62,47 |
| `organ:bp-femoral-vein-l` | organ | high | 228 | 131,7 | 113,53 |
| `organ:bp-femoral-vein-r` | organ | high | 212 | 124,5 | 116,90 |
| `muscle:linea-alba` | muscle | high | 338 | 123,7 | 67,13 |
| `bone:femur-l` | bone | high | 3 794 | 121,5 | 46,90 |
| `bone:femur-r` | bone | high | 3 794 | 121,5 | 46,90 |
| `organ:bp-femoral-artery-l` | organ | high | 208 | 116,4 | 100,31 |
| `organ:bp-femoral-artery-r` | organ | high | 230 | 110,3 | 104,45 |
| `organ:bp-visceral-peritoneum` | organ | high | 26 672 | 101,5 | 45,44 |
| `organ:bp-great-saphenous-vein-r` | organ | high | 6 606 | 93,3 | 27,05 |
| `muscle:vastus-intermedius-muscle-l` | muscle | high | 6 164 | 91,1 | 23,21 |
| `muscle:vastus-intermedius-muscle-r` | muscle | high | 6 164 | 91,1 | 23,21 |
| `organ:bp-descending-branch-of-lateral-circumflex-femoral-artery-r` | organ | high | 1 150 | 87,7 | 51,78 |
| `bone:fibula-l` | bone | high | 1 264 | 86,8 | 42,25 |

## 15 structures aux faces les plus inversées

| Structure | Cat. | LOD | Tris | Faces inversées | % |
|---|---|---|---:|---:|---:|
| `muscle:external-intercostal-muscles-l` | muscle | high | 41 410 | 450 | 1.1 % |
| `muscle:external-intercostal-muscles-r` | muscle | high | 41 410 | 450 | 1.1 % |
| `muscle:innermost-intercostal-muscles-l` | muscle | high | 38 254 | 303 | 0.8 % |
| `muscle:innermost-intercostal-muscles-r` | muscle | high | 38 254 | 303 | 0.8 % |
| `muscle:internal-intercostal-muscles-l` | muscle | high | 40 184 | 265 | 0.7 % |
| `muscle:internal-intercostal-muscles-r` | muscle | high | 40 184 | 265 | 0.7 % |
| `organ:falx-cerebri` | organ | high | 1 675 | 112 | 6.7 % |
| `organ:septum-pellucidum` | organ | high | 2 388 | 110 | 4.6 % |
| `muscle:internal-abdominal-oblique-muscle-l` | muscle | high | 28 869 | 88 | 0.3 % |
| `muscle:internal-abdominal-oblique-muscle-r` | muscle | high | 28 869 | 88 | 0.3 % |
| `muscle:multifidus-thoracis-muscle-l` | muscle | high | 3 902 | 78 | 2.0 % |
| `muscle:multifidus-thoracis-muscle-r` | muscle | high | 3 902 | 78 | 2.0 % |
| `organ:parieto-occipital-sulcus-l` | organ | high | 1 636 | 72 | 4.4 % |
| `organ:parieto-occipital-sulcus-r` | organ | high | 1 636 | 72 | 4.4 % |
| `muscle:external-abdominal-oblique-muscle-l` | muscle | high | 29 622 | 67 | 0.2 % |

## Limites de cet audit

- Il mesure la **topologie et l'intégrité**, pas la **fidélité anatomique** : un maillage
  étanche peut être faux. La fidélité exige une revue experte et des captures multi-angles.
- Les maillages ouverts (séreuses, fascia, peau, vaisseaux coupés) sont légitimement
  non étanches ; le taux global d'étanchéité ne doit donc pas être lu comme une note.
- Les composantes multiples peuvent être anatomiquement légitimes (dents, ganglions) ;
  elles sont un signal à relire, pas une faute automatique.
- La densité en tri/cm² ne dit rien de la forme : une sphère dense reste une sphère.

JSON complet : `docs/analyses/qualite-3d.json`.