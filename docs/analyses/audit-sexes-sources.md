# Audit des sexes des sources — 2026-11-24

## Constat

Les modèles féminins n'ont pas été supprimés par la géométrie : le problème
venait d'un libellé `Homme` appliqué par défaut à toutes les sources, alors que
leur contenu réel diffère.

| Source | Organes génitaux observés | Libellé corrigé |
|---|---|---|
| `seema` (3D Human Body Anatomy) | aucun organe génital explicite dans les maillages | Anatomie générique |
| `nqwrc` (3D Anatomy) | pénis, testicules, prostate | Homme |
| `wangzh` (Human Atlas 3D) | pénis, testicules, prostate **et** vagin, utérus, ovaires, clitoris | Mixte ♂/♀ |

Le libellé « Homme » appliqué à `wangzh` était donc faux. La source contient
les deux appareils génitaux dans un même jeu de données. Aucun maillage n'a été
supprimé ni remplacé : seul le libellé est corrigé, conformément à la décision
« auditer et corriger les libellés ».

## Échelle

La source `wangzh` est fournie en millimètres : sa boîte englobante mesurait
`667 × 1730 × 308` avant correction, contre environ `0,68 × 1,74 × 0,30` m
pour les autres sources. Un facteur uniforme de `0,001` est appliqué au groupe
après décodage Meshopt. Aucune déformation locale.

## Pivot de rotation

Le pivot n'est plus le centre du viewport : il est placé au centre de la boîte
englobante du modèle. Les carrés du sol sont exclus du calcul du pivot mais
conservés dans le cadrage global. Le double-clic et le double-tap déplacent le
pivot sur le point cliqué ; `CADRER` recentre sur le modèle entier et `RESET`
revient à la vue initiale centrée sur le modèle.
