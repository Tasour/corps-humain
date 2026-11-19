# Scorecard qualité 3D — statuts par structure

Généré le 2026-11-19 par `npm run scorecard:3d`.

> **Lecture :** S1 = mesurée, S2 = topologie et orientation saines, S3 = production.
> Aucune structure n'est S3 aujourd'hui : G4 (résolution) et G5 (assemblage) ne sont pas
> encore mesurés. La classification ouvert/fermé est **provisoire**.

## Synthèse

| Statut | Structures | Part |
|---|---:|---:|
| S0 | 0 | 0.0 % |
| S1 | 1 355 | 66.5 % |
| S2 | 684 | 33.5 % |
| S3 | 0 | 0.0 % |
| S4 | 0 | 0.0 % |

## Portes

| Porte | Structures qui passent | Part |
|---|---:|---:|
| G0 traçabilité (source, chemin, TA2) | 1 979 | 97.1 % |
| G2 topologie + étanchéité (classification provisoire) | 1 515 | 74.3 % |
| G2 topologie seule (hors étanchéité) | 1 896 | 93.0 % |
| G3 orientation et normales | 950 | 46.6 % |

## Pilotes — 5 structures prioritaires

| Sujet | Structures | S2 | Captures | Débordements | Principaux bloqueurs |
|---|---:|---:|---:|---:|---|
| Cœur | 6 | 4 | 8/8 | 0 | 37 faces inversées ; 7 faces inversées |
| Encéphale | 1 | 0 | 8/8 | 0 | 7 arêtes non-manifold ; 4 faces dupliquées ; 7142 arêtes libres ; 572 composantes |
| Main droite | 40 | 32 | 8/8 | 0 | 532 arêtes libres ; 6 composantes ; 11 faces inversées ; G0 TA2 absent |
| Face | 1 | 0 | 8/8 | 0 | 2 arêtes non-manifold ; 4747 arêtes libres ; 290 composantes ; 49 faces inversées |
| Genou droit | 3 | 3 | 8/8 | 0 | — |

## 20 structures les plus bloquées

| Structure | Cat. | Statut | Bloqueurs |
|---|---|---|---|
| `bone:bp-neurocranium` | bone | S1 | 1 arêtes non-manifold ; 1 faces dupliquées ; 4755 arêtes libres ; 301 composantes |
| `bone:bp-rib-r` | bone | S1 | 1 arêtes non-manifold ; 1 faces dupliquées ; 284 arêtes libres ; 17 composantes |
| `bone:bp-thoracic-vertebra` | bone | S1 | 1 arêtes non-manifold ; 1 faces dupliquées ; 4766 arêtes libres ; 75 composantes |
| `bone:ethmoid-bone` | bone | S1 | 31 arêtes non-manifold ; 3 faces dupliquées ; 27 arêtes libres ; 13 composantes |
| `muscle:bp-levator-ani-r` | muscle | S1 | 1 arêtes non-manifold ; 1 faces dupliquées ; 6218 arêtes libres ; 1148 composantes |
| `muscle:internal-intercostal-muscles-l` | muscle | S1 | 62 arêtes non-manifold ; 35 faces dupliquées ; 18 arêtes libres ; 10 composantes |
| `muscle:internal-intercostal-muscles-r` | muscle | S1 | 65 arêtes non-manifold ; 35 faces dupliquées ; 18 arêtes libres ; 10 composantes |
| `organ:bp-brainstem` | organ | S1 | 4 arêtes non-manifold ; 4 faces dupliquées ; 4800 arêtes libres ; 394 composantes |
| `organ:bp-telencephalon-l` | organ | S1 | 13 arêtes non-manifold ; 1 faces dupliquées ; 10257 arêtes libres ; 255 composantes |
| `organ:bp-telencephalon-r` | organ | S1 | 11 arêtes non-manifold ; 2 faces dupliquées ; 10524 arêtes libres ; 264 composantes |
| `organ:bp-viscerocranium` | organ | S1 | 1 arêtes non-manifold ; 1 faces dupliquées ; 4061 arêtes libres ; 255 composantes |
| `organ:bp-viscerocranium-l` | organ | S1 | 3 arêtes non-manifold ; 2 faces dupliquées ; 9740 arêtes libres ; 674 composantes |
| `bone:cricoid-cartilage` | bone | S1 | 3 arêtes non-manifold ; 1 faces dupliquées ; 2 arêtes libres ; 1 faces inversées |
| `bone:mandible` | bone | S1 | 39 arêtes non-manifold ; 4 faces dupliquées ; 6 arêtes libres ; 29 faces inversées |
| `bone:sacrum` | bone | S1 | 4 arêtes non-manifold ; 1 faces dupliquées ; 13 arêtes libres ; 12 faces inversées |
| `muscle:extensor-carpi-radialis-longus-l` | muscle | S1 | 1 faces dupliquées ; 2 composantes ; winding inversé ; 6 faces inversées |
| `muscle:external-intercostal-muscles-l` | muscle | S1 | 56 arêtes non-manifold ; 39 faces dupliquées ; 11 composantes ; 420 faces inversées |
| `muscle:external-intercostal-muscles-r` | muscle | S1 | 73 arêtes non-manifold ; 52 faces dupliquées ; 11 composantes ; 425 faces inversées |
| `muscle:innermost-intercostal-muscles-l` | muscle | S1 | 80 arêtes non-manifold ; 55 faces dupliquées ; 9 composantes ; 477 faces inversées |
| `muscle:innermost-intercostal-muscles-r` | muscle | S1 | 84 arêtes non-manifold ; 60 faces dupliquées ; 9 composantes ; 474 faces inversées |

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