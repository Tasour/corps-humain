# Scorecard qualité 3D — statuts par structure

Généré le 2026-11-19 par `npm run scorecard:3d`.

> **Lecture :** S1 = mesurée, S2 = topologie et orientation saines, S3 = production.
> Aucune structure n'est S3 aujourd'hui : G4 (résolution) et G5 (assemblage) ne sont pas
> encore mesurés. La classification ouvert/fermé est **provisoire**.

## Synthèse

| Statut | Structures | Part |
|---|---:|---:|
| S0 | 0 | 0.0 % |
| S1 | 1 399 | 68.6 % |
| S2 | 640 | 31.4 % |
| S3 | 0 | 0.0 % |
| S4 | 0 | 0.0 % |

## Portes

| Porte | Structures qui passent | Part |
|---|---:|---:|
| G0 traçabilité (source, chemin, TA2) | 1 979 | 97.1 % |
| G2 topologie + étanchéité (classification provisoire) | 1 324 | 64.9 % |
| G2 topologie seule (hors étanchéité) | 1 898 | 93.1 % |
| G3 orientation et normales | 1 017 | 49.9 % |

## Pilotes — 5 structures prioritaires

| Sujet | Structures | S2 | Captures | Débordements | Principaux bloqueurs |
|---|---:|---:|---:|---:|---|
| Cœur | 6 | 4 | 8/8 | 0 | 36 faces inversées ; 7 faces inversées |
| Encéphale | 1 | 0 | 8/8 | 0 | 7 arêtes non-manifold ; 4 faces dupliquées ; 6775 arêtes libres ; 466 composantes |
| Main droite | 40 | 31 | 8/8 | 0 | 532 arêtes libres ; 6 composantes ; 9 arêtes libres ; 11 faces inversées |
| Face | 1 | 0 | 8/8 | 0 | 2 arêtes non-manifold ; 4195 arêtes libres ; 135 composantes ; 49 faces inversées |
| Genou droit | 3 | 2 | 8/8 | 0 | 3 arêtes libres |

## 20 structures les plus bloquées

| Structure | Cat. | Statut | Bloqueurs |
|---|---|---|---|
| `bone:bp-neurocranium` | bone | S1 | 1 arêtes non-manifold ; 1 faces dupliquées ; 4210 arêtes libres ; 148 composantes |
| `bone:bp-rib-r` | bone | S1 | 1 arêtes non-manifold ; 1 faces dupliquées ; 284 arêtes libres ; 17 composantes |
| `bone:bp-thoracic-vertebra` | bone | S1 | 1 arêtes non-manifold ; 1 faces dupliquées ; 4766 arêtes libres ; 75 composantes |
| `muscle:bp-levator-ani-r` | muscle | S1 | 1 arêtes non-manifold ; 1 faces dupliquées ; 5857 arêtes libres ; 1030 composantes |
| `muscle:internal-intercostal-muscles-l` | muscle | S1 | 62 arêtes non-manifold ; 35 faces dupliquées ; 18 arêtes libres ; 10 composantes |
| `muscle:internal-intercostal-muscles-r` | muscle | S1 | 65 arêtes non-manifold ; 35 faces dupliquées ; 18 arêtes libres ; 10 composantes |
| `muscle:latissimus-dorsi-muscle-l` | muscle | S1 | 4 arêtes non-manifold ; 4 faces dupliquées ; 3 arêtes libres ; 3 composantes |
| `muscle:latissimus-dorsi-muscle-r` | muscle | S1 | 5 arêtes non-manifold ; 5 faces dupliquées ; 3 arêtes libres ; 3 composantes |
| `organ:bp-brainstem` | organ | S1 | 4 arêtes non-manifold ; 4 faces dupliquées ; 4582 arêtes libres ; 336 composantes |
| `organ:bp-telencephalon-l` | organ | S1 | 13 arêtes non-manifold ; 1 faces dupliquées ; 10229 arêtes libres ; 246 composantes |
| `organ:bp-telencephalon-r` | organ | S1 | 11 arêtes non-manifold ; 2 faces dupliquées ; 10495 arêtes libres ; 255 composantes |
| `organ:bp-viscerocranium` | organ | S1 | 1 arêtes non-manifold ; 1 faces dupliquées ; 3512 arêtes libres ; 102 composantes |
| `organ:bp-viscerocranium-l` | organ | S1 | 3 arêtes non-manifold ; 2 faces dupliquées ; 8895 arêtes libres ; 492 composantes |
| `organ:ganglia-of-sympathetic-trunk-l` | organ | S1 | 2 arêtes non-manifold ; 2 faces dupliquées ; 2599 arêtes libres ; 18 composantes |
| `organ:ganglia-of-sympathetic-trunk-r` | organ | S1 | 7 arêtes non-manifold ; 7 faces dupliquées ; 2690 arêtes libres ; 18 composantes |
| `bone:ethmoid-bone` | bone | S1 | 22 arêtes non-manifold ; 70 arêtes libres ; 13 composantes ; 19 faces inversées |
| `bone:mandible` | bone | S1 | 38 arêtes non-manifold ; 4 faces dupliquées ; 25 arêtes libres ; 29 faces inversées |
| `bone:sacrum` | bone | S1 | 3 arêtes non-manifold ; 1 faces dupliquées ; 10 arêtes libres ; 12 faces inversées |
| `muscle:extensor-carpi-radialis-longus-l` | muscle | S1 | 1 faces dupliquées ; 2 composantes ; winding inversé ; 6 faces inversées |
| `muscle:external-intercostal-muscles-l` | muscle | S1 | 56 arêtes non-manifold ; 39 faces dupliquées ; 11 composantes ; 420 faces inversées |

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