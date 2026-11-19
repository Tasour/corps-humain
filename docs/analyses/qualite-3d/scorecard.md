# Scorecard qualité 3D — statuts par structure

Généré le 2026-11-19 par `npm run scorecard:3d`.

> **Lecture :** S1 = mesurée, S2 = topologie et orientation saines, S3 = production.
> Aucune structure n'est S3 aujourd'hui : G4 (résolution) et G5 (assemblage) ne sont pas
> encore mesurés. La classification ouvert/fermé est **provisoire**.

## Synthèse

| Statut | Structures | Part |
|---|---:|---:|
| S0 | 0 | 0.0 % |
| S1 | 1 087 | 53.3 % |
| S2 | 952 | 46.7 % |
| S3 | 0 | 0.0 % |
| S4 | 0 | 0.0 % |

## Portes

| Porte | Structures qui passent | Part |
|---|---:|---:|
| G0 traçabilité (source, chemin, TA2) | 1 979 | 97.1 % |
| G2 topologie + étanchéité (classification provisoire) | 1 534 | 75.2 % |
| G2 topologie seule (hors étanchéité) | 1 949 | 95.6 % |
| G3 orientation et normales | 1 292 | 63.4 % |

## Pilotes — 5 structures prioritaires

| Sujet | Structures | S2 | Captures | Débordements | Principaux bloqueurs |
|---|---:|---:|---:|---:|---|
| Cœur | 6 | 3 | 8/8 | 0 | 1 arêtes non-manifold ; 17 faces inversées ; 7 faces inversées |
| Encéphale | 1 | 0 | 8/8 | 0 | 2 arêtes non-manifold ; 7240 arêtes libres ; 573 composantes ; 34 faces inversées |
| Main droite | 40 | 32 | 8/8 | 0 | 532 arêtes libres ; 6 composantes ; 11 faces inversées ; G0 TA2 absent |
| Face | 1 | 0 | 8/8 | 0 | 5135 arêtes libres ; 294 composantes ; 12 faces inversées |
| Genou droit | 3 | 3 | 8/8 | 0 | — |

## 20 structures les plus bloquées

| Structure | Cat. | Statut | Bloqueurs |
|---|---|---|---|
| `bone:ethmoid-bone` | bone | S1 | 31 arêtes non-manifold ; 33 arêtes libres ; 13 composantes ; 27 faces inversées |
| `muscle:bp-levator-ani-r` | muscle | S1 | 1 arêtes non-manifold ; 6220 arêtes libres ; 1148 composantes ; 7 faces inversées |
| `muscle:internal-intercostal-muscles-l` | muscle | S1 | 15 arêtes non-manifold ; 22 arêtes libres ; 12 composantes ; 264 faces inversées |
| `muscle:internal-intercostal-muscles-r` | muscle | S1 | 15 arêtes non-manifold ; 22 arêtes libres ; 12 composantes ; 265 faces inversées |
| `organ:base-of-peduncle-l` | organ | S1 | 1 arêtes non-manifold ; 7 arêtes libres ; 3 composantes ; 10 faces inversées |
| `organ:base-of-peduncle-r` | organ | S1 | 1 arêtes non-manifold ; 7 arêtes libres ; 3 composantes ; 10 faces inversées |
| `organ:bp-brainstem` | organ | S1 | 2 arêtes non-manifold ; 4812 arêtes libres ; 394 composantes ; 24 faces inversées |
| `organ:habenula` | organ | S1 | 12 arêtes non-manifold ; 10 arêtes libres ; 3 composantes ; 9 faces inversées |
| `bone:bp-bony-pelvis` | bone | S1 | 658 arêtes libres ; 16 composantes ; 4 faces inversées ; captures absentes |
| `bone:bp-neurocranium` | bone | S1 | 4947 arêtes libres ; 304 composantes ; 26 faces inversées ; captures absentes |
| `bone:bp-neurocranium-l` | bone | S1 | 3246 arêtes libres ; 121 composantes ; 19 faces inversées ; captures absentes |
| `bone:bp-neurocranium-r` | bone | S1 | 3072 arêtes libres ; 122 composantes ; 18 faces inversées ; captures absentes |
| `bone:cricoid-cartilage` | bone | S1 | 2 arêtes non-manifold ; 3 arêtes libres ; 1 faces inversées ; captures absentes |
| `bone:lateral-process-of-nasal-septal-cartilage-l` | bone | S1 | 1 arêtes non-manifold ; 2 arêtes libres ; 1 faces inversées ; captures absentes |
| `bone:lateral-process-of-nasal-septal-cartilage-r` | bone | S1 | 1 arêtes non-manifold ; 2 arêtes libres ; 1 faces inversées ; captures absentes |
| `bone:lower-first-molar-tooth-l` | bone | S1 | 3 arêtes libres ; 3 composantes ; 13 faces inversées ; captures absentes |
| `bone:lower-first-molar-tooth-r` | bone | S1 | 3 arêtes libres ; 3 composantes ; 13 faces inversées ; captures absentes |
| `bone:mandible` | bone | S1 | 52 arêtes non-manifold ; 6 arêtes libres ; 53 faces inversées ; captures absentes |
| `bone:occipital-bone` | bone | S1 | 37 arêtes non-manifold ; 58 arêtes libres ; 15 faces inversées ; captures absentes |
| `bone:sacrum` | bone | S1 | 4 arêtes non-manifold ; 15 arêtes libres ; 12 faces inversées ; captures absentes |

## Trous de complétude constatés

| Élément | Constat | Preuve |
|---|---|---|
| Myocarde du cœur | `organ:bp-heart` ne contient que 11 pièces BodyParts3D : valves, sinus coronaire, veines cardiaques. Aucun muscle cardiaque. | inventaire `organ:bp-heart` + capture `coeur/face.jpg` |
| Œsophage | aucun identifiant `esophag` dans le manifeste | recherche manifeste |
| Poumons entiers | seuls les lobes existent, pas de structure `poumon` complète | recherche manifeste |
| Hémisphères cérébraux | aucun identifiant `hemisphere` ; le cerveau est un agrégat de 466 composantes | recherche manifeste + audit |
| Ménisques et ligaments du genou | aucun `menisc`, aucun ligament croisé/collatéral | recherche manifeste + capture `genou-droit/face.jpg` |

## Limites

- La classification ouvert/fermé est heuristique : un fascia peut être classé ouvert à tort,
  un organe creux fermé à tort. Elle doit être validée en P2 avant toute correction.
- S2 ne dit rien de la fidélité anatomique : un maillage sain peut être faux.
- Les captures 8 angles existent pour 5 sujets, pas pour les 2 039 structures.
- Aucune structure n'est S3 : la résolution (G4) et l'assemblage (G5) restent à mesurer.

JSON : `docs/analyses/qualite-3d/scorecard.json` · classification :
`docs/qualite/classification-structures.provisional.json`.