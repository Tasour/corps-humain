# Veille — meilleur modèle féminin

Date : 2026-11-24. Contexte : le champion `female-atlas` affiche quatre yeux
(deux appareils oculaires superposés) et 72 % de géométrie dérivée d'une référence
masculine. Audit local des cinq jeux disponibles et d'un candidat externe.

## Audit

| Critère | `female-atlas` (actuel) | `enhanced` | `slorksmo` | `bodyatlas` | `open-anatomy-3d` |
|---|---|---|---|---|---|
| Pièces | 3 004 | 888 | 1 220 | **2 534** | 133 maillages / 147 catalogues |
| Part femelle | 552 (18 %) | 599 (68 %) | 964 HRA (79 %) | 599 HRA | HRA v1.10 + MakeHuman |
| Part mâle | **2 163 BP3D (72 %, non filtrée)** | 0 | 180 empruntés (15 %, documentés) | 1 653 ajustés (65 %, documentés) | BP3D warpé (documenté) |
| Doublons de noms | **798** | 171 | **5** | 506 | catalog 145 |
| Doublons d'yeux | **OUI — 4 yeux** | non | non | non | non |
| Peau | **BP3D mâle** (`BP3D_FJ2810`) | VH_F femelle | HRAF femelle | VH_F femelle | MakeHuman femelle CC0 |
| Squelette | 343 (mâle brut) | 91 (partiel) | 65 + 180 empruntés | 352 (mâle ajusté) | complet (warpé) |
| Muscles | 416 (mâle brut) | 16 | 16 + 76 | 399 (ajustés) | fusionnés |
| Reprod. / grossesse | 54 / 8 | 38 / 8 | 38 / 8 | 38 / 8 | utérus, ovaires, trompes, vagin |
| Bornes hors corps | 0 | 0 | 0 | 0 | non mesuré |
| `vertexCount = 0` | 0 | 0 | 0 | 0 | non mesuré |
| Structures mâles pures | 0 | 0 | 0 | 0 | non mesuré |
| Licence | 🟢 MIT + CC BY 4.0 | 🟢 MIT + CC BY 4.0 | 🟢 MIT + CC BY 4.0 | 🟢 CC BY 4.0 | 🟢 CC BY 4.0 + CC0 |

Mesures locales : les 22 chunks de `female-atlas` sont byte-identiques à l'amont ;
le défaut vient donc de la composition de la source, pas de notre pipeline.
BodyParts3D est décrit par le DBCLS comme « an adult human male » dérivé du
fantôme IRM **TARO** (homme). L'écart entre les deux clusters oculaires de
`female-atlas` est de **22,6 mm** (`y ≈ 1,560` pour HRA, `y ≈ 1,537` pour BP3D).

`open-anatomy-3d` a été installé et mesuré localement (`npm pack`, paquet 0.1.0) :
147 entrées de catalogue, 133 maillages, 139 nœuds, extensions
`EXT_meshopt_compression` et `KHR_mesh_quantization`, GLB femelle de 8,1 Mo.
Corps MakeHuman CC0, organes HRA v1.10, anatomie BP3D déformée par spline sur
~600 repères. Candidat léger et cohérent, mais **beaucoup moins granulaire**.

## Décision

`female-atlas` est écarté. **`bodyatlas` est retenu** : couverture complète,
peau de la Visible Human Female, aucun doublon oculaire, et les apports de la
référence masculine y sont explicitement documentés et recalés sur la femelle,
contrairement à `female-atlas` qui les empile sans filtrage.

`open-anatomy-3d` reste une alternative crédible si la priorité devient la
morphologie féminine lisse et le budget réseau plutôt que la granularité.

Piste d'avenir : HRA **v2.5 / united-female v1.10** (juin 2026, 81 organes,
1 392 structures anatomiques, CC BY 4.0) ; GLB source de 374 Mo, nécessite une
recompression avant publication.

## Sources

- https://github.com/HiMahendraBeniwal/female-atlas
- https://github.com/ImliStack/Body-Atlas-3D/blob/main/public/ATTRIBUTION.md
- https://github.com/slorksmo/Human-Atlas
- https://github.com/MervinR07/open-anatomy-3d
- https://dbarchive.biosciencedbc.jp/en/bodyparts3d/desc.html
- https://humanatlas.io/3d-reference-library
- https://github.com/Nurkan1/Anatria-3D
