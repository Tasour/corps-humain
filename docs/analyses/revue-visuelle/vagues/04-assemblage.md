# Vague 4 — assemblage (lot 2)

**Date : 20 novembre 2026 · Statut : terminée et vérifiée.**

## Méthode

30 nouveaux muscles `assemblage` diagnostiqués, répartis en 3 worktrees. Les agents ont
classé 27 structures `multipart_legitime` et 3 `fragment_negigeable`.

## Corrections

| Structure | Avant | Après |
|---|---:|---:|
| `muscle:flexor-digitorum-profundus-l` | 4 composantes, 7 110 tris (high) | 2 composantes, 7 058 tris |
| `muscle:gluteus-minimus-muscle-l/r` | 2 composantes, 6 250 tris | 1 composante, 6 244 tris |

Le seuil initial proposé pour le fléchisseur supprimait 152 triangles (2,14 %) et faisait
échouer la porte CI « détail perdu > 2 % ». Il a été relevé à 0,6 cm² : seuls les deux plus
petits artefacts sont retirés (–52 triangles), la porte redevient verte. Le correctif est
appliqué uniquement au LOD `high`.

## Effets

- Triangles : 6 298 922 → **6 298 850**.
- Pluri-composantes : 656 → **654**.
- Aucun défaut introduit : 0 dégénéré, 0 non-manifold, 0 doublon, 0 winding inversé.
- G2 scorecard : 1 585 → **1 587**.

## Preuve visuelle

24 captures (3 × 8 angles) comparées aux captures d'avant : changement moyen 0,4 à 0,9 %,
un angle à 4,66 % sur le gluteus droit correspondant à la disparition d'un éclat de 6 triangles.
6 entrées ajoutées à `todolist-fait-a-verifier` avec verdict `verifie`.

## Non corrigé

27 structures restent `multipart_legitime` : leur pluricomposance est anatomiquement
justifiée, aucune suppression n'est appliquée.
