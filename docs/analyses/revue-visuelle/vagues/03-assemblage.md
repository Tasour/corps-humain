# Vague 3 — assemblage : fragments connexes négligeables

**Date : 20 novembre 2026 · Statut : terminée et vérifiée.**

## Méthode

- 30 structures `assemblage` prioritaires diagnostiquées par `scripts/diagnostic-composantes.mjs`
  (composantes connexes, aires en cm², triangles, dimensions).
- 3 agents en worktrees isolées (os / muscle / organe) ont classé chaque structure :
  **7 os légitimes**, 13 muscles légitimes, 4 muscles à fragment négligeable, 2 organs à valider,
  2 muscles à valider, 2 organes légitimes.
- Seuls les 4 cas `fragment_negigeable` ont été corrigés, avec un seuil d'aire **juste au-dessus**
  de la plus grande composante à retirer (0,029 cm² pour les tendons, 0,239 cm² pour les fascias).

## Corrections

| Structure | Avant | Après |
|---|---:|---:|
| `muscle:calcaneal-tendon-l/r` | 4 composantes, 4 377 tris | 1 composante, 4 374 tris |
| `muscle:crural-fascia-l/r` | 3 composantes, 10 875 tris | 1 composante, 10 873 tris |

Total : **–8 triangles**, pluri-composantes **660 → 656**, aucun défaut introduit
(dégénérés 0, non-manifold 0, winding 0, doublons 0).

Un bug du script de post-traitement (`Buffer.from(view.buffer)` sur des vues partielles du chunk)
a été trouvé et corrigé pendant la vérification : il pouvait écraser tout un chunk. Le jeu a été
restauré depuis Git puis régénéré proprement.

## Preuve visuelle

32 captures (4 structures × 8 angles) dans `apres-assemblage/` comparées aux captures d'avant :
- calcaneal-tendon-l/r : **0 % de pixels changés** ;
- crural-fascia-l : max 1,56 %, moyenne 0,49 % ;
- crural-fascia-r : max 0,01 %.

Aucune silhouette n'a changé ; la preuve est topologique, pas visuelle.

## Non corrigé

Les 24 autres structures du lot sont `multipart_legitime` (intestin, arbre vasculaire,
viscérocrâne, etc.) ou `a_valider`. Leur reconnecter des segments reviendrait à fabriquer de
l'anatomie : elles restent dans la todolist active avec leur motif.
