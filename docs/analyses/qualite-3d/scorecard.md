# Scorecard qualité 3D — statuts par structure

Généré le 2026-11-19 par `npm run scorecard:3d`.

> **Lecture :** S1 = mesurée, S2 = topologie et orientation saines, S3 = production.
> Aucune structure n'est S3 aujourd'hui : G4 (résolution) et G5 (assemblage) ne sont pas
> encore mesurés. La classification ouvert/fermé est **provisoire**.

## Synthèse

| Statut | Structures | Part |
|---|---:|---:|
| S0 | 0 | 0.0 % |
| S1 | 1 073 | 52.6 % |
| S2 | 967 | 47.4 % |
| S3 | 0 | 0.0 % |
| S4 | 0 | 0.0 % |

## Portes

| Porte | Structures qui passent | Part |
|---|---:|---:|
| G0 traçabilité (source, chemin, TA2) | 1 979 | 97.0 % |
| G2 topologie + étanchéité (classification provisoire) | 1 585 | 77.7 % |
| G2 topologie seule (hors étanchéité) | 2 040 | 100.0 % |
| G3 orientation et normales | 1 296 | 63.5 % |

## Pilotes — 5 structures prioritaires

| Sujet | Structures | S2 | Captures | Débordements | Principaux bloqueurs |
|---|---:|---:|---:|---:|---|
| Cœur | 6 | 4 | 8/8 | 0 | 15 faces inversées ; 7 faces inversées |
| Encéphale | 1 | 0 | 8/8 | 0 | 7258 arêtes libres ; 652 composantes ; 26 faces inversées |
| Main droite | 40 | 32 | 8/8 | 0 | 532 arêtes libres ; 6 composantes ; 11 faces inversées ; G0 TA2 absent |
| Face | 1 | 0 | 8/8 | 0 | 5135 arêtes libres ; 294 composantes ; 12 faces inversées |
| Genou droit | 3 | 3 | 8/8 | 0 | — |

## 20 structures les plus bloquées

| Structure | Cat. | Statut | Bloqueurs |
|---|---|---|---|
| `bone:bp-bony-pelvis` | bone | S1 | 658 arêtes libres ; 16 composantes ; 3 faces inversées ; captures absentes |
| `bone:bp-neurocranium` | bone | S1 | 4947 arêtes libres ; 304 composantes ; 25 faces inversées ; captures absentes |
| `bone:bp-neurocranium-l` | bone | S1 | 3246 arêtes libres ; 121 composantes ; 16 faces inversées ; captures absentes |
| `bone:bp-neurocranium-r` | bone | S1 | 3072 arêtes libres ; 122 composantes ; 16 faces inversées ; captures absentes |
| `bone:cricoid-cartilage` | bone | S1 | 17 arêtes libres ; 4 composantes ; 1 faces inversées ; captures absentes |
| `bone:ethmoid-bone` | bone | S1 | 172 arêtes libres ; 33 composantes ; 27 faces inversées ; captures absentes |
| `bone:lateral-process-of-nasal-septal-cartilage-l` | bone | S1 | 9 arêtes libres ; 3 composantes ; 1 faces inversées ; captures absentes |
| `bone:lateral-process-of-nasal-septal-cartilage-r` | bone | S1 | 9 arêtes libres ; 3 composantes ; 1 faces inversées ; captures absentes |
| `bone:lower-first-molar-tooth-l` | bone | S1 | 3 arêtes libres ; 3 composantes ; 13 faces inversées ; captures absentes |
| `bone:lower-first-molar-tooth-r` | bone | S1 | 3 arêtes libres ; 3 composantes ; 13 faces inversées ; captures absentes |
| `bone:mandible` | bone | S1 | 314 arêtes libres ; 55 composantes ; 53 faces inversées ; captures absentes |
| `bone:occipital-bone` | bone | S1 | 311 arêtes libres ; 60 composantes ; 15 faces inversées ; captures absentes |
| `bone:sacrum` | bone | S1 | 43 arêtes libres ; 11 composantes ; 12 faces inversées ; captures absentes |
| `bone:vertebra-t8` | bone | S1 | 235 arêtes libres ; 38 composantes ; 49 faces inversées ; captures absentes |
| `bone:xiphoid-process` | bone | S1 | 121 arêtes libres ; 23 composantes ; 5 faces inversées ; captures absentes |
| `muscle:bp-flexor-digitorum-superficialis-l` | muscle | S1 | 556 arêtes libres ; 36 composantes ; 2 faces inversées ; captures absentes |
| `muscle:bp-flexor-digitorum-superficialis-r` | muscle | S1 | 560 arêtes libres ; 36 composantes ; 2 faces inversées ; captures absentes |
| `muscle:bp-levator-ani-l` | muscle | S1 | 8008 arêtes libres ; 1146 composantes ; 12 faces inversées ; captures absentes |
| `muscle:bp-levator-ani-r` | muscle | S1 | 6227 arêtes libres ; 1203 composantes ; 6 faces inversées ; captures absentes |
| `muscle:bp-levator-veli-palatini-r` | muscle | S1 | 1070 arêtes libres ; 2 composantes ; 8 faces inversées ; captures absentes |

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