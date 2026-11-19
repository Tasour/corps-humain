# Écart de silhouette entre LOD — Hausdorff échantillonné

Généré le 2026-11-19 par `npm run hausdorff:3d`.
Référence : LOD `high`. 2039 structures, 256 sommets échantillonnés par direction.

## Synthèse

| Comparaison | Médiane | P90 | P99 | Max | > 0,5 mm | > 2 mm |
|---|---:|---:|---:|---:|---:|---:|
| medium → high | 0,00 mm | 0,61 mm | 3,72 mm | 121,23 mm | 271 | 47 |
| low → high | 0,39 mm | 2,80 mm | 17,65 mm | 127,51 mm | 916 | 323 |

## 20 écarts medium → high les plus grands

| Structure | Cat. | Tris high | Tris medium | Écart max (mm) | Écart moyen (mm) |
|---|---|---:|---:|---:|---:|
| `organ:bp-mediastinum` | organ | 12 000 | 6 122 | 121,23 | 3,22 |
| `organ:bp-inferior-mediastinum` | organ | 12 000 | 5 076 | 41,55 | 0,99 |
| `organ:bp-middle-mediastinum` | organ | 12 000 | 5 076 | 27,33 | 0,59 |
| `organ:bp-nerve-l` | organ | 5 454 | 1 680 | 19,66 | 0,78 |
| `organ:bp-hepatic-portal-vein-r` | organ | 6 370 | 4 316 | 14,64 | 0,14 |
| `organ:bp-nerve-r` | organ | 5 346 | 1 646 | 14,05 | 0,41 |
| `organ:bp-viscerocranium-l` | organ | 12 270 | 12 198 | 10,26 | 0,02 |
| `organ:bp-superior-mesenteric-artery` | organ | 5 058 | 2 886 | 8,20 | 0,10 |
| `organ:white-matter-of-telencephalon-l` | organ | 12 000 | 1 498 | 8,11 | 0,45 |
| `bone:bp-thoracic-vertebra` | bone | 12 000 | 5 094 | 6,95 | 0,28 |
| `organ:bp-basilar-artery-r` | organ | 6 190 | 3 738 | 5,79 | 0,09 |
| `organ:bp-right-pulmonary-artery-r` | organ | 12 000 | 11 364 | 5,32 | 0,05 |
| `bone:bp-sternum` | bone | 5 566 | 1 540 | 4,82 | 0,26 |
| `bone:bp-neurocranium-l` | bone | 6 560 | 2 864 | 4,58 | 0,17 |
| `muscle:flexor-digitorum-profundus-l` | muscle | 7 110 | 1 498 | 4,45 | 0,07 |
| `muscle:flexor-digitorum-profundus-r` | muscle | 7 110 | 1 498 | 4,45 | 0,08 |
| `organ:bp-left-pulmonary-artery-l` | organ | 8 070 | 6 906 | 4,37 | 0,14 |
| `muscle:internal-intercostal-muscles-r` | muscle | 11 993 | 1 499 | 4,36 | 0,26 |
| `bone:bp-neurocranium-r` | bone | 6 600 | 2 826 | 3,97 | 0,15 |
| `muscle:external-abdominal-oblique-muscle-l` | muscle | 12 000 | 1 500 | 3,92 | 0,21 |

## Limites

- Mesure **LOD contre LOD**, pas source contre LOD : elle prouve la fidélité de la chaîne
  de simplification, pas la fidélité au réel. La comparaison source → high reste à faire.
- Échantillonnage déterministe de sommets : un détail omis entre deux sommets peut échapper.
- La distance est une distance point-surface exacte via BVH, mais le maximum est estimé sur
  un échantillon, pas sur tous les sommets.

JSON : `docs/analyses/qualite-3d/hausdorff.json`.