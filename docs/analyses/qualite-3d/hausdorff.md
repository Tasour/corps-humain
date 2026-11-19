# Écart de silhouette entre LOD — Hausdorff échantillonné

Généré le 2026-11-19 par `npm run hausdorff:3d`.
Référence : LOD `high`. 2039 structures, 256 sommets échantillonnés par direction.

## Synthèse

| Comparaison | Médiane | P90 | P99 | Max | > 0,5 mm | > 2 mm |
|---|---:|---:|---:|---:|---:|---:|
| medium → high | 0,00 mm | 0,64 mm | 4,30 mm | 127,46 mm | 280 | 59 |
| low → high | 0,40 mm | 2,65 mm | 15,66 mm | 127,46 mm | 914 | 309 |

## 20 écarts medium → high les plus grands

| Structure | Cat. | Tris high | Tris medium | Écart max (mm) | Écart moyen (mm) |
|---|---|---:|---:|---:|---:|
| `organ:bp-mediastinum` | organ | 11 984 | 6 106 | 127,46 | 3,44 |
| `organ:bp-inferior-mediastinum` | organ | 11 984 | 5 056 | 40,39 | 0,96 |
| `organ:bp-nerve-l` | organ | 5 438 | 1 665 | 19,40 | 0,71 |
| `organ:bp-hepatic-portal-vein-r` | organ | 6 349 | 4 295 | 15,66 | 0,14 |
| `organ:bp-nerve-r` | organ | 5 321 | 1 622 | 14,06 | 0,41 |
| `organ:bp-middle-mediastinum` | organ | 11 985 | 5 045 | 13,02 | 0,40 |
| `organ:intermediomedial-nucleus` | organ | 6 432 | 1 459 | 10,00 | 0,07 |
| `bone:bp-thoracic-vertebra` | bone | 12 000 | 5 106 | 9,00 | 0,30 |
| `organ:bp-superior-mesenteric-artery` | organ | 5 058 | 2 886 | 8,20 | 0,10 |
| `organ:bp-basilar-artery-r` | organ | 6 182 | 3 729 | 7,25 | 0,11 |
| `organ:bp-right-pulmonary-artery-r` | organ | 11 990 | 11 354 | 5,98 | 0,04 |
| `organ:bp-large-intestine` | organ | 13 030 | 13 024 | 5,55 | 0,01 |
| `organ:cavernous-sinus-r` | organ | 512 | 1 375 | 5,52 | 0,95 |
| `organ:cavernous-sinus-l` | organ | 512 | 1 336 | 5,52 | 0,91 |
| `organ:lateral-reticulospinal-tract` | organ | 3 216 | 1 474 | 5,01 | 0,03 |
| `organ:tectospinal-tract` | organ | 3 216 | 1 475 | 5,00 | 0,02 |
| `organ:white-matter-of-telencephalon-l` | organ | 12 000 | 1 500 | 4,67 | 0,43 |
| `bone:bp-neurocranium-l` | bone | 6 560 | 2 864 | 4,58 | 0,17 |
| `muscle:flexor-digitorum-profundus-l` | muscle | 7 110 | 1 498 | 4,45 | 0,07 |
| `muscle:flexor-digitorum-profundus-r` | muscle | 7 110 | 1 498 | 4,45 | 0,08 |

## Limites

- Mesure **LOD contre LOD**, pas source contre LOD : elle prouve la fidélité de la chaîne
  de simplification, pas la fidélité au réel. La comparaison source → high reste à faire.
- Échantillonnage déterministe de sommets : un détail omis entre deux sommets peut échapper.
- La distance est une distance point-surface exacte via BVH, mais le maximum est estimé sur
  un échantillon, pas sur tous les sommets.

JSON : `docs/analyses/qualite-3d/hausdorff.json`.