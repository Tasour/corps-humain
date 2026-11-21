# Audit qualité 3D — mesures topologiques

Généré le 2026-11-21 par `npm run audit:3d`.
LOD analysé(s) : **high** · 1 989 enregistrements · 4 749 553 triangles.

## Synthèse

| Indicateur | Valeur |
|---|---:|
| Structures étanches et manifold | **1 659 / 1 989** (83.4 %) |
| Structures avec arêtes libres (bords) | 325 |
| Structures avec arêtes non-manifold | 67 |
| Structures en plusieurs composantes connexes | 282 |
| Triangles dégénérés | 0 (0 %) |
| Faces inversées (normale de face ≠ sommets) | 9 402 (0.198 %) |
| Faces dupliquées | 37 |
| Structures à volume signé négatif (winding inversé) | 0 |
| Normales nulles | 314 328 |
| Indices hors bornes | 1 896 127 |

## Par catégorie et par LOD

| Catégorie | LOD | Structures | Triangles | Médiane | P10 | P90 | Densité méd. (tri/cm²) | Étanches | Non-manifold | Pluri-composantes |
|---|---|---:|---:|---:|---:|---:|---:|---:|---:|---:|
| bone | high | 287 | 621 226 | 984 | 276 | 5 364 | 42.6 | 266 | 11 | 14 |
| muscle | high | 683 | 2 189 344 | 1 280 | 174 | 6 548 | 33.8 | 556 | 12 | 74 |
| organ | high | 1 019 | 1 938 983 | 672 | 168 | 4 016 | 20.7 | 837 | 44 | 194 |

## Par source

| Source | Structures | Triangles | Étanches | Winding inversé | Pluri-composantes |
|---|---:|---:|---:|---:|---:|
| Z-Anatomy | 1 524 | 3 504 653 | 1 194 | 0 | 282 |
| BodyParts3D 4.0 | 465 | 1 244 900 | 465 | 0 | 0 |

## 15 structures les plus ouvertes (ratio arêtes libres / triangles)

| Structure | Cat. | LOD | Tris | Arêtes libres | Ratio |
|---|---|---|---:|---:|---:|
| `organ:zonular-fibres-l` | organ | high | 4 | 6 | 150.0 % |
| `organ:zonular-fibres-r` | organ | high | 4 | 6 | 150.0 % |
| `muscle:lateral-patellar-retinaculum-l` | muscle | high | 7 | 9 | 128.6 % |
| `muscle:lateral-patellar-retinaculum-r` | muscle | high | 7 | 9 | 128.6 % |
| `organ:central-canal` | organ | high | 16 | 18 | 112.5 % |
| `muscle:cruciform-part-of-fibrous-sheath-of-digit-of-hand-l` | muscle | high | 282 | 300 | 106.4 % |
| `muscle:cruciform-part-of-fibrous-sheath-of-digit-of-hand-r` | muscle | high | 282 | 300 | 106.4 % |
| `organ:anterior-fasciculus-proprius` | organ | high | 46 | 48 | 104.3 % |
| `organ:posterior-fasciculus-proprius` | organ | high | 64 | 66 | 103.1 % |
| `organ:lateral-intermediate-substance` | organ | high | 66 | 68 | 103.0 % |
| `organ:omental-taenia` | organ | high | 155 | 157 | 101.3 % |
| `organ:free-taenia` | organ | high | 167 | 169 | 101.2 % |
| `organ:mesocolic-taenia` | organ | high | 169 | 171 | 101.2 % |
| `organ:anterior-corticospinal-tract` | organ | high | 36 | 36 | 100.0 % |
| `organ:anterior-horn-of-spinal-cord` | organ | high | 44 | 44 | 100.0 % |

## 15 structures les plus fragmentées (composantes connexes)

| Structure | Cat. | LOD | Tris | Composantes |
|---|---|---|---:|---:|
| `organ:spinal-dura` | organ | high | 24 902 | 36 |
| `organ:intrapulmonary-nodes` | organ | high | 3 864 | 23 |
| `muscle:multifidus-thoracis-muscle-l` | muscle | high | 3 902 | 21 |
| `muscle:multifidus-thoracis-muscle-r` | muscle | high | 3 902 | 21 |
| `organ:spinal-ganglion-l` | organ | high | 1 680 | 21 |
| `organ:spinal-ganglion-r` | organ | high | 1 680 | 21 |
| `organ:ganglia-of-sympathetic-trunk-l` | organ | high | 1 440 | 18 |
| `organ:ganglia-of-sympathetic-trunk-r` | organ | high | 1 440 | 18 |
| `organ:paracolic-superior-mesenteric-nodes` | organ | high | 2 856 | 17 |
| `organ:juxta-intestinal-mesenteric-nodes` | organ | high | 2 520 | 15 |
| `muscle:levatores-longi-costarum-l` | muscle | high | 5 930 | 15 |
| `muscle:levatores-longi-costarum-r` | muscle | high | 5 930 | 15 |
| `organ:intercostal-nodes-l` | organ | high | 2 016 | 12 |
| `organ:intercostal-nodes-r` | organ | high | 2 016 | 12 |
| `muscle:internal-intercostal-muscles-l` | muscle | high | 40 184 | 12 |

## 15 structures fermées à winding inversé (volume signé négatif)

| Structure | Cat. | LOD | Tris | Volume (cm³) |
|---|---|---|---:|---:|

## 15 densités les plus faibles (triangles / cm²)

| Structure | Cat. | LOD | Tris | Aire (cm²) | Densité | Arête max (mm) |
|---|---|---|---:|---:|---:|---:|
| `bone:bp-bony-part-of-nasal-septum` | bone | high | 1 586 | 0,00 | 0 | 0,0 |
| `bone:bp-bony-pelvis` | bone | high | 5 058 | 0,00 | 0 | 0,0 |
| `bone:bp-bony-pelvis-l` | bone | high | 1 808 | 0,00 | 0 | 0,0 |
| `bone:bp-bony-pelvis-r` | bone | high | 1 898 | 0,00 | 0 | 0,0 |
| `bone:bp-cuneiform-cartilage-l` | bone | high | 174 | 0,00 | 0 | 0,0 |
| `bone:bp-cuneiform-cartilage-r` | bone | high | 170 | 0,00 | 0 | 0,0 |
| `bone:bp-floating-rib-l` | bone | high | 1 800 | 0,00 | 0 | 0,0 |
| `bone:bp-floating-rib-r` | bone | high | 1 810 | 0,00 | 0 | 0,0 |
| `bone:bp-intervertebral-symphysis` | bone | high | 2 852 | 0,00 | 0 | 0,0 |
| `bone:bp-sternum` | bone | high | 5 566 | 0,00 | 0 | 0,0 |
| `muscle:bp-extensor-carpi-ulnaris-l` | muscle | high | 1 016 | 0,00 | 0 | 0,0 |
| `muscle:bp-extensor-carpi-ulnaris-r` | muscle | high | 1 008 | 0,00 | 0 | 0,0 |
| `muscle:bp-flexor-digitorum-superficialis-l` | muscle | high | 732 | 0,00 | 0 | 0,0 |
| `muscle:bp-flexor-digitorum-superficialis-r` | muscle | high | 736 | 0,00 | 0 | 0,0 |
| `muscle:bp-levator-ani-l` | muscle | high | 10 740 | 0,00 | 0 | 0,0 |

## 15 arêtes les plus longues

| Structure | Cat. | LOD | Tris | Arête max (mm) | P99 (mm) |
|---|---|---|---:|---:|---:|
| `bone:tibia-l` | bone | high | 1 670 | 151,5 | 62,47 |
| `bone:tibia-r` | bone | high | 1 670 | 151,5 | 62,47 |
| `muscle:linea-alba` | muscle | high | 338 | 123,7 | 67,13 |
| `bone:femur-l` | bone | high | 3 794 | 121,5 | 46,90 |
| `bone:femur-r` | bone | high | 3 794 | 121,5 | 46,90 |
| `muscle:vastus-intermedius-muscle-l` | muscle | high | 6 164 | 91,1 | 23,21 |
| `muscle:vastus-intermedius-muscle-r` | muscle | high | 6 164 | 91,1 | 23,21 |
| `bone:fibula-l` | bone | high | 1 264 | 86,8 | 42,25 |
| `bone:fibula-r` | bone | high | 1 264 | 86,8 | 42,25 |
| `bone:radius-l` | bone | high | 784 | 81,3 | 53,66 |
| `bone:radius-r` | bone | high | 784 | 81,3 | 53,66 |
| `bone:ulna-l` | bone | high | 904 | 78,7 | 38,85 |
| `bone:ulna-r` | bone | high | 904 | 78,7 | 38,85 |
| `muscle:tibialis-anterior-muscle-l` | muscle | high | 3 526 | 73,8 | 28,42 |
| `muscle:tibialis-anterior-muscle-r` | muscle | high | 3 526 | 73,8 | 28,42 |

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