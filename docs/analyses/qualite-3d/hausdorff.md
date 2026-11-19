# Écart de silhouette entre LOD — Hausdorff échantillonné

Généré le 2026-11-19 par `npm run hausdorff:3d`.
Référence : LOD `high`. 2039 structures, 256 sommets échantillonnés par direction.

## Synthèse

| Comparaison | Médiane | P90 | P99 | Max | > 0,5 mm | > 2 mm |
|---|---:|---:|---:|---:|---:|---:|
| medium → high | 0,00 mm | 0,61 mm | 3,69 mm | 121,23 mm | 268 | 48 |
| low → high | 0,40 mm | 2,76 mm | 17,39 mm | 121,23 mm | 915 | 316 |

## 20 écarts medium → high les plus grands

| Structure | Cat. | Tris high | Tris medium | Écart max (mm) | Écart moyen (mm) |
|---|---|---:|---:|---:|---:|
| `organ:bp-mediastinum` | organ | 12 000 | 6 113 | 121,23 | 3,22 |
| `organ:bp-inferior-mediastinum` | organ | 12 000 | 5 060 | 41,55 | 0,99 |
| `organ:bp-middle-mediastinum` | organ | 12 000 | 5 067 | 27,33 | 0,59 |
| `organ:bp-nerve-l` | organ | 5 454 | 1 677 | 19,66 | 0,78 |
| `organ:bp-hepatic-portal-vein-r` | organ | 6 370 | 4 311 | 14,64 | 0,14 |
| `organ:bp-nerve-r` | organ | 5 346 | 1 642 | 14,05 | 0,41 |
| `organ:bp-viscerocranium-l` | organ | 12 268 | 12 202 | 10,26 | 0,02 |
| `organ:bp-superior-mesenteric-artery` | organ | 5 058 | 2 882 | 8,20 | 0,10 |
| `bone:bp-thoracic-vertebra` | bone | 11 999 | 5 099 | 6,95 | 0,28 |
| `organ:bp-basilar-artery-r` | organ | 6 190 | 3 732 | 5,79 | 0,09 |
| `organ:bp-right-pulmonary-artery-r` | organ | 12 000 | 11 364 | 5,32 | 0,05 |
| `bone:bp-sternum` | bone | 5 566 | 1 540 | 4,82 | 0,26 |
| `bone:bp-neurocranium-l` | bone | 6 560 | 2 864 | 4,58 | 0,17 |
| `muscle:flexor-digitorum-profundus-l` | muscle | 7 110 | 1 494 | 4,45 | 0,08 |
| `muscle:flexor-digitorum-profundus-r` | muscle | 7 110 | 1 494 | 4,45 | 0,08 |
| `organ:bp-left-pulmonary-artery-l` | organ | 8 070 | 6 906 | 4,37 | 0,14 |
| `organ:white-matter-of-telencephalon-l` | organ | 12 000 | 1 496 | 4,20 | 0,46 |
| `muscle:longus-colli-muscle-l` | muscle | 6 294 | 3 625 | 4,10 | 0,21 |
| `bone:bp-neurocranium-r` | bone | 6 600 | 2 826 | 3,97 | 0,15 |
| `muscle:longus-colli-muscle-r` | muscle | 6 294 | 3 627 | 3,87 | 0,17 |

## Limites

- Mesure **LOD contre LOD**, pas source contre LOD : elle prouve la fidélité de la chaîne
  de simplification, pas la fidélité au réel. La comparaison source → high reste à faire.
- Échantillonnage déterministe de sommets : un détail omis entre deux sommets peut échapper.
- La distance est une distance point-surface exacte via BVH, mais le maximum est estimé sur
  un échantillon, pas sur tous les sommets.

JSON : `docs/analyses/qualite-3d/hausdorff.json`.