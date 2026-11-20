# Écart de silhouette entre LOD — Hausdorff échantillonné

Généré le 2026-11-20 par `npm run hausdorff:3d`.
Référence : LOD `high`. 2009 structures, 256 sommets échantillonnés par direction.

## Synthèse

| Comparaison | Médiane | P90 | P99 | Max | > 0,5 mm | > 2 mm |
|---|---:|---:|---:|---:|---:|---:|
| medium → high | 0,00 mm | 0,62 mm | 4,10 mm | 127,00 mm | 262 | 53 |
| low → high | 0,39 mm | 2,74 mm | 14,99 mm | 127,00 mm | 894 | 311 |

## 20 écarts medium → high les plus grands

| Structure | Cat. | Tris high | Tris medium | Écart max (mm) | Écart moyen (mm) |
|---|---|---:|---:|---:|---:|
| `organ:bp-right-subclavian-artery-r` | organ | 33 054 | 13 884 | 126,99 | 4,76 |
| `organ:bp-left-subclavian-artery-l` | organ | 33 339 | 13 784 | 124,46 | 5,35 |
| `organ:bp-mediastinum` | organ | 24 004 | 6 116 | 116,47 | 5,55 |
| `organ:bp-inferior-mediastinum` | organ | 21 976 | 5 057 | 38,52 | 1,30 |
| `organ:bp-nerve-l` | organ | 5 454 | 1 677 | 19,66 | 0,78 |
| `organ:bp-hepatic-portal-vein-r` | organ | 6 370 | 4 311 | 14,64 | 0,14 |
| `organ:bp-nerve-r` | organ | 5 346 | 1 642 | 14,05 | 0,41 |
| `organ:falx-cerebri` | organ | 14 722 | 2 686 | 12,35 | 0,24 |
| `organ:bp-middle-mediastinum` | organ | 21 038 | 5 050 | 10,34 | 0,50 |
| `organ:bp-superior-mesenteric-artery` | organ | 5 058 | 2 882 | 8,20 | 0,10 |
| `organ:bp-large-intestine` | organ | 22 919 | 13 489 | 7,65 | 0,22 |
| `organ:bp-small-intestine` | organ | 18 190 | 16 380 | 6,62 | 0,14 |
| `organ:bp-basilar-artery-r` | organ | 6 190 | 3 732 | 5,79 | 0,09 |
| `organ:bp-right-pulmonary-artery-r` | organ | 12 694 | 11 364 | 5,49 | 0,11 |
| `muscle:external-abdominal-oblique-muscle-r` | muscle | 29 622 | 1 499 | 5,46 | 0,21 |
| `muscle:flexor-digitorum-profundus-l` | muscle | 7 058 | 1 494 | 5,15 | 0,07 |
| `bone:bp-sternum` | bone | 5 566 | 1 540 | 4,82 | 0,26 |
| `organ:bp-telencephalon-l` | organ | 54 920 | 12 402 | 4,56 | 0,28 |
| `muscle:flexor-digitorum-profundus-r` | muscle | 7 110 | 1 494 | 4,45 | 0,08 |
| `organ:bp-left-pulmonary-artery-l` | organ | 8 070 | 6 906 | 4,37 | 0,14 |

## Limites

- Mesure **LOD contre LOD**, pas source contre LOD : elle prouve la fidélité de la chaîne
  de simplification, pas la fidélité au réel. La comparaison source → high reste à faire.
- Échantillonnage déterministe de sommets : un détail omis entre deux sommets peut échapper.
- La distance est une distance point-surface exacte via BVH, mais le maximum est estimé sur
  un échantillon, pas sur tous les sommets.

JSON : `docs/analyses/qualite-3d/hausdorff.json`.