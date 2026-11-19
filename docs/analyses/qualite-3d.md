# Audit qualité 3D — mesures topologiques

Généré le 2026-11-19 par `npm run audit:3d`.
LOD analysé(s) : **high** · 2 039 enregistrements · 5 009 243 triangles.

## Synthèse

| Indicateur | Valeur |
|---|---:|
| Structures étanches et manifold | **1 107 / 2 039** (54.3 %) |
| Structures avec arêtes libres (bords) | 907 |
| Structures avec arêtes non-manifold | 124 |
| Structures en plusieurs composantes connexes | 620 |
| Triangles dégénérés | 0 (0 %) |
| Faces inversées (normale de face ≠ sommets) | 13 354 (0.267 %) |
| Faces dupliquées | 496 |
| Structures à volume signé négatif (winding inversé) | 466 |
| Normales nulles | 0 |
| Indices hors bornes | 0 |

## Par catégorie et par LOD

| Catégorie | LOD | Structures | Triangles | Médiane | P10 | P90 | Densité méd. (tri/cm²) | Étanches | Non-manifold | Pluri-composantes |
|---|---|---:|---:|---:|---:|---:|---:|---:|---:|---:|
| bone | high | 317 | 844 738 | 1 452 | 314 | 7 459 | 52.3 | 187 | 16 | 55 |
| muscle | high | 695 | 1 899 454 | 1 472 | 328 | 6 760 | 35.4 | 478 | 33 | 86 |
| organ | high | 1 027 | 2 265 051 | 812 | 274 | 6 528 | 111.1 | 442 | 75 | 479 |

## Par source

| Source | Structures | Triangles | Étanches | Winding inversé | Pluri-composantes |
|---|---:|---:|---:|---:|---:|
| Z-Anatomy | 1 443 | 3 680 982 | 994 | 442 | 294 |
| BodyParts3D 4.0 | 596 | 1 328 261 | 113 | 24 | 326 |

## 15 structures les plus ouvertes (ratio arêtes libres / triangles)

| Structure | Cat. | LOD | Tris | Arêtes libres | Ratio |
|---|---|---|---:|---:|---:|
| `organ:bp-eyebrow` | organ | high | 4 350 | 9 565 | 219.9 % |
| `organ:bp-mons-pubis` | organ | high | 2 690 | 5 182 | 192.6 % |
| `organ:bp-visceral-peritoneum` | organ | high | 22 241 | 39 101 | 175.8 % |
| `organ:bp-pancreatic-duct` | organ | high | 1 816 | 2 784 | 153.3 % |
| `organ:bp-large-intestine` | organ | high | 13 030 | 19 255 | 147.8 % |
| `muscle:bp-extensor-carpi-ulnaris-l` | muscle | high | 1 016 | 1 312 | 129.1 % |
| `muscle:bp-extensor-carpi-ulnaris-r` | muscle | high | 1 008 | 1 300 | 129.0 % |
| `organ:bp-inferior-phrenic-artery-r` | organ | high | 1 568 | 1 904 | 121.4 % |
| `bone:bp-intervertebral-symphysis` | bone | high | 2 819 | 3 001 | 106.5 % |
| `organ:bp-corona-ciliaris-l` | organ | high | 8 658 | 9 112 | 105.2 % |
| `muscle:bp-levator-ani-r` | muscle | high | 5 745 | 5 857 | 101.9 % |
| `organ:bp-pericallosal-artery-l` | organ | high | 566 | 562 | 99.3 % |
| `organ:bp-pericallosal-artery-r` | organ | high | 562 | 558 | 99.3 % |
| `organ:bp-inferior-phrenic-artery-l` | organ | high | 1 232 | 1 218 | 98.9 % |
| `organ:bp-left-renal-vein-l` | organ | high | 4 560 | 4 492 | 98.5 % |

## 15 structures les plus fragmentées (composantes connexes)

| Structure | Cat. | LOD | Tris | Composantes |
|---|---|---|---:|---:|
| `organ:bp-visceral-peritoneum` | organ | high | 22 241 | 8 077 |
| `organ:bp-large-intestine` | organ | high | 13 030 | 2 724 |
| `organ:bp-eyebrow` | organ | high | 4 350 | 2 523 |
| `organ:bp-mons-pubis` | organ | high | 2 690 | 1 330 |
| `organ:bp-corona-ciliaris-l` | organ | high | 8 658 | 1 156 |
| `muscle:bp-levator-ani-l` | muscle | high | 10 672 | 1 114 |
| `organ:bp-corona-ciliaris-r` | organ | high | 9 732 | 1 073 |
| `muscle:bp-levator-ani-r` | muscle | high | 5 745 | 1 030 |
| `organ:bp-left-subclavian-artery-l` | organ | high | 13 808 | 697 |
| `organ:bp-right-subclavian-artery-r` | organ | high | 13 917 | 684 |
| `bone:bp-intervertebral-symphysis` | bone | high | 2 819 | 645 |
| `organ:bp-viscerocranium-r` | organ | high | 18 978 | 644 |
| `organ:bp-viscerocranium-l` | organ | high | 11 675 | 492 |
| `organ:bp-nervous-system` | organ | high | 26 163 | 468 |
| `organ:bp-brain` | organ | high | 26 131 | 466 |

## 15 structures fermées à winding inversé (volume signé négatif)

| Structure | Cat. | LOD | Tris | Volume (cm³) |
|---|---|---|---:|---:|
| `bone:corniculate-cartilage-l` | bone | high | 136 | 0,00 |
| `organ:anterior-cochlear-nucleus-r` | organ | high | 192 | 0,00 |
| `organ:posterior-nucleus-of-vagus-nerve-r` | organ | high | 768 | 0,01 |
| `organ:nucleus-ambiguus-r` | organ | high | 768 | 0,01 |
| `organ:inferior-parathyroid-gland-l` | organ | high | 128 | 0,01 |
| `organ:nucleus-of-hypoglossal-nerve-r` | organ | high | 768 | 0,01 |
| `organ:motor-root-of-trigeminal-nerve-r` | organ | high | 960 | 0,01 |
| `organ:posterior-cochlear-nucleus-r` | organ | high | 960 | 0,01 |
| `organ:ampulla-of-lacrimal-canaliculus-l` | organ | high | 244 | 0,01 |
| `organ:tympanic-membrane-l` | organ | high | 1 572 | 0,01 |
| `organ:fibular-node-l` | organ | high | 168 | 0,01 |
| `organ:lateral-lacunar-node-l` | organ | high | 168 | 0,01 |
| `organ:medial-lacunar-node-l` | organ | high | 168 | 0,01 |
| `organ:intermediate-lacunar-node-l` | organ | high | 168 | 0,01 |
| `organ:anterior-tibial-node-l` | organ | high | 168 | 0,01 |

## 15 densités les plus faibles (triangles / cm²)

| Structure | Cat. | LOD | Tris | Aire (cm²) | Densité | Arête max (mm) |
|---|---|---|---:|---:|---:|---:|
| `organ:bp-transverse-mesocolon` | organ | high | 864 | 836,47 | 1 | 82,9 |
| `organ:pleura` | organ | high | 12 000 | 9 822,21 | 1.2 | 95,8 |
| `organ:bp-femoral-artery-l` | organ | high | 208 | 125,15 | 1.7 | 116,4 |
| `muscle:linea-alba` | muscle | high | 338 | 195,57 | 1.7 | 123,7 |
| `organ:bp-femoral-artery-r` | organ | high | 230 | 124,14 | 1.9 | 110,3 |
| `organ:bp-femoral-vein-r` | organ | high | 212 | 110,92 | 1.9 | 124,5 |
| `organ:bp-femoral-vein-l` | organ | high | 228 | 110,35 | 2.1 | 131,7 |
| `muscle:posterior-layer-of-thoracolumbar-fascia-l` | muscle | high | 313 | 142,96 | 2.2 | 37,9 |
| `muscle:posterior-layer-of-thoracolumbar-fascia-r` | muscle | high | 313 | 142,96 | 2.2 | 37,9 |
| `muscle:middle-layer-of-thoracolumbar-fascia-l` | muscle | high | 160 | 63,35 | 2.5 | 27,1 |
| `muscle:middle-layer-of-thoracolumbar-fascia-r` | muscle | high | 160 | 63,35 | 2.5 | 27,1 |
| `muscle:transverse-intermuscular-septum-of-leg-l` | muscle | high | 495 | 175,13 | 2.8 | 31,9 |
| `muscle:transverse-intermuscular-septum-of-leg-r` | muscle | high | 495 | 175,13 | 2.8 | 31,9 |
| `bone:bp-bony-pelvis-l` | bone | high | 1 808 | 561,00 | 3.2 | 51,4 |
| `bone:bp-bony-pelvis-r` | bone | high | 1 898 | 563,83 | 3.4 | 51,8 |

## 15 arêtes les plus longues

| Structure | Cat. | LOD | Tris | Arête max (mm) | P99 (mm) |
|---|---|---|---:|---:|---:|
| `bone:tibia-l` | bone | high | 1 669 | 151,5 | 62,47 |
| `bone:tibia-r` | bone | high | 1 669 | 151,5 | 62,47 |
| `organ:bp-femoral-vein-l` | organ | high | 228 | 131,7 | 113,53 |
| `organ:bp-femoral-vein-r` | organ | high | 212 | 124,5 | 116,90 |
| `muscle:linea-alba` | muscle | high | 338 | 123,7 | 67,13 |
| `bone:femur-l` | bone | high | 3 794 | 121,5 | 46,90 |
| `bone:femur-r` | bone | high | 3 794 | 121,5 | 46,90 |
| `organ:bp-femoral-artery-l` | organ | high | 208 | 116,4 | 100,31 |
| `organ:bp-femoral-artery-r` | organ | high | 230 | 110,3 | 104,45 |
| `organ:bp-visceral-peritoneum` | organ | high | 22 241 | 110,0 | 51,57 |
| `organ:pleura` | organ | high | 12 000 | 95,8 | 47,54 |
| `organ:bp-great-saphenous-vein-r` | organ | high | 6 575 | 93,3 | 27,05 |
| `muscle:vastus-intermedius-muscle-l` | muscle | high | 6 163 | 91,1 | 23,21 |
| `muscle:vastus-intermedius-muscle-r` | muscle | high | 6 163 | 91,1 | 23,21 |
| `organ:bp-descending-branch-of-lateral-circumflex-femoral-artery-r` | organ | high | 1 150 | 87,7 | 51,78 |

## 15 structures aux faces les plus inversées

| Structure | Cat. | LOD | Tris | Faces inversées | % |
|---|---|---|---:|---:|---:|
| `muscle:innermost-intercostal-muscles-l` | muscle | high | 11 964 | 477 | 4.0 % |
| `muscle:innermost-intercostal-muscles-r` | muscle | high | 11 960 | 474 | 4.0 % |
| `muscle:external-intercostal-muscles-r` | muscle | high | 11 976 | 425 | 3.5 % |
| `muscle:external-intercostal-muscles-l` | muscle | high | 11 974 | 420 | 3.5 % |
| `muscle:internal-intercostal-muscles-r` | muscle | high | 11 993 | 337 | 2.8 % |
| `muscle:internal-intercostal-muscles-l` | muscle | high | 11 993 | 336 | 2.8 % |
| `organ:falx-cerebri` | organ | high | 11 959 | 335 | 2.8 % |
| `organ:bp-telencephalon-r` | organ | high | 12 573 | 308 | 2.4 % |
| `organ:bp-telencephalon-l` | organ | high | 12 376 | 295 | 2.4 % |
| `organ:bp-left-subclavian-artery-l` | organ | high | 13 808 | 226 | 1.6 % |
| `organ:bp-right-subclavian-artery-r` | organ | high | 13 917 | 226 | 1.6 % |
| `muscle:internal-abdominal-oblique-muscle-l` | muscle | high | 11 979 | 160 | 1.3 % |
| `muscle:internal-abdominal-oblique-muscle-r` | muscle | high | 11 987 | 152 | 1.3 % |
| `organ:bp-viscerocranium-r` | organ | high | 18 978 | 120 | 0.6 % |
| `organ:bp-viscerocranium-l` | organ | high | 11 675 | 114 | 1.0 % |

## Limites de cet audit

- Il mesure la **topologie et l'intégrité**, pas la **fidélité anatomique** : un maillage
  étanche peut être faux. La fidélité exige une revue experte et des captures multi-angles.
- Les maillages ouverts (séreuses, fascia, peau, vaisseaux coupés) sont légitimement
  non étanches ; le taux global d'étanchéité ne doit donc pas être lu comme une note.
- Les composantes multiples peuvent être anatomiquement légitimes (dents, ganglions) ;
  elles sont un signal à relire, pas une faute automatique.
- La densité en tri/cm² ne dit rien de la forme : une sphère dense reste une sphère.

JSON complet : `docs/analyses/qualite-3d.json`.