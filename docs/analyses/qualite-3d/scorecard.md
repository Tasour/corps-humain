# Scorecard qualité 3D — statuts par structure

Généré le 2026-11-19 par `npm run scorecard:3d`.

> **Lecture :** S1 = mesurée, S2 = topologie et orientation saines, S3 = production.
> Aucune structure n'est S3 aujourd'hui : G4 (résolution) et G5 (assemblage) ne sont pas
> encore mesurés. La classification ouvert/fermé est **provisoire**.

## Synthèse

| Statut | Structures | Part |
|---|---:|---:|
| S0 | 0 | 0.0 % |
| S1 | 1 096 | 53.8 % |
| S2 | 943 | 46.2 % |
| S3 | 0 | 0.0 % |
| S4 | 0 | 0.0 % |

## Portes

| Porte | Structures qui passent | Part |
|---|---:|---:|
| G0 traçabilité (source, chemin, TA2) | 1 979 | 97.1 % |
| G2 topologie + étanchéité (classification provisoire) | 1 517 | 74.4 % |
| G2 topologie seule (hors étanchéité) | 1 911 | 93.7 % |
| G3 orientation et normales | 1 269 | 62.2 % |

## Pilotes — 5 structures prioritaires

| Sujet | Structures | S2 | Captures | Débordements | Principaux bloqueurs |
|---|---:|---:|---:|---:|---|
| Cœur | 6 | 3 | 8/8 | 0 | 1 arêtes non-manifold ; 37 faces inversées ; 7 faces inversées |
| Encéphale | 1 | 0 | 8/8 | 0 | 5 arêtes non-manifold ; 7150 arêtes libres ; 572 composantes ; 53 faces inversées |
| Main droite | 40 | 32 | 8/8 | 0 | 532 arêtes libres ; 6 composantes ; 11 faces inversées ; G0 TA2 absent |
| Face | 1 | 0 | 8/8 | 0 | 2 arêtes non-manifold ; 4747 arêtes libres ; 290 composantes ; 49 faces inversées |
| Genou droit | 3 | 3 | 8/8 | 0 | — |

## 20 structures les plus bloquées

| Structure | Cat. | Statut | Bloqueurs |
|---|---|---|---|
| `bone:bp-neurocranium` | bone | S1 | 1 arêtes non-manifold ; 4757 arêtes libres ; 301 composantes ; 40 faces inversées |
| `bone:bp-rib-r` | bone | S1 | 1 arêtes non-manifold ; 286 arêtes libres ; 17 composantes ; 12 faces inversées |
| `bone:bp-thoracic-vertebra` | bone | S1 | 1 arêtes non-manifold ; 4768 arêtes libres ; 75 composantes ; 24 faces inversées |
| `bone:ethmoid-bone` | bone | S1 | 31 arêtes non-manifold ; 33 arêtes libres ; 13 composantes ; 27 faces inversées |
| `muscle:bp-levator-ani-r` | muscle | S1 | 1 arêtes non-manifold ; 6220 arêtes libres ; 1148 composantes ; 7 faces inversées |
| `muscle:external-intercostal-muscles-l` | muscle | S1 | 58 arêtes non-manifold ; 71 arêtes libres ; 11 composantes ; 405 faces inversées |
| `muscle:external-intercostal-muscles-r` | muscle | S1 | 64 arêtes non-manifold ; 79 arêtes libres ; 11 composantes ; 400 faces inversées |
| `muscle:innermost-intercostal-muscles-l` | muscle | S1 | 72 arêtes non-manifold ; 84 arêtes libres ; 9 composantes ; 456 faces inversées |
| `muscle:innermost-intercostal-muscles-r` | muscle | S1 | 77 arêtes non-manifold ; 99 arêtes libres ; 9 composantes ; 444 faces inversées |
| `muscle:internal-intercostal-muscles-l` | muscle | S1 | 61 arêtes non-manifold ; 80 arêtes libres ; 11 composantes ; 323 faces inversées |
| `muscle:internal-intercostal-muscles-r` | muscle | S1 | 57 arêtes non-manifold ; 72 arêtes libres ; 11 composantes ; 330 faces inversées |
| `muscle:latissimus-dorsi-muscle-l` | muscle | S1 | 4 arêtes non-manifold ; 8 arêtes libres ; 3 composantes ; 56 faces inversées |
| `muscle:latissimus-dorsi-muscle-r` | muscle | S1 | 5 arêtes non-manifold ; 10 arêtes libres ; 3 composantes ; 54 faces inversées |
| `organ:base-of-peduncle-l` | organ | S1 | 1 arêtes non-manifold ; 7 arêtes libres ; 3 composantes ; 10 faces inversées |
| `organ:base-of-peduncle-r` | organ | S1 | 1 arêtes non-manifold ; 7 arêtes libres ; 3 composantes ; 10 faces inversées |
| `organ:bp-brainstem` | organ | S1 | 2 arêtes non-manifold ; 4808 arêtes libres ; 394 composantes ; 24 faces inversées |
| `organ:bp-telencephalon-l` | organ | S1 | 13 arêtes non-manifold ; 10259 arêtes libres ; 255 composantes ; 295 faces inversées |
| `organ:bp-telencephalon-r` | organ | S1 | 11 arêtes non-manifold ; 10528 arêtes libres ; 264 composantes ; 307 faces inversées |
| `organ:bp-tracheobronchial-tree-r` | organ | S1 | 1 arêtes non-manifold ; 4574 arêtes libres ; 365 composantes ; 17 faces inversées |
| `organ:bp-viscerocranium` | organ | S1 | 1 arêtes non-manifold ; 4063 arêtes libres ; 255 composantes ; 37 faces inversées |

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