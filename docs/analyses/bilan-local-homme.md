# Bilan local — homme — 2026-11-24

Aucun commit, aucun push, aucun changement de modèle publié. La femme reste
figée sur `158ebf8`. L'état courant des GLB est revenu à `29e4f8a`.

## Pointes musculaires

Mesure initiale (`docs/analyses/pointes-musculaires-male.json`) : le ratio
arête max / médiane atteint 166 sur `rotator_cuff_r`, 155 sur
`rotator_cuff_l`, 123 sur `deltoid_l`. Ce défaut est déjà présent dans le
maillage source `158ebf8` : il n'a pas été créé par le confinement.

Trois tentatives ont été faites :

1. lissage Smooth facteur 1,0 / 8 itérations puis reprojection : le ratio a
   explosé jusqu'à 324 607 (géométrie dégénérée) ;
2. champ de déplacement lissé sur la topologie, 12 itérations : le ratio est
   redescendu à ~108 mais le rendu est devenu plus pointu ;
3. lissage doux facteur 0,2 / 3 itérations : le ratio est resté à ~159.

Conclusion : le lissage postérieur ne corrige pas la source. Toutes ces
modifications ont été annulées. Les scripts restent dans `scripts/` comme
outils de mesure, pas comme correctifs retenus.

## Association muscles ↔ squelette

Mesure sans modification (`docs/analyses/muscles-sur-squelette-male.json`) :

| Muscle | Écart d'axe |
|---|---:|
| adductors_l | 1,3° |
| quadriceps_l | 4,5° |
| hand_muscles_l | 5,7° |
| forearm_muscles_l | 6,7° |
| upper_arm_muscles_l | 8,9° |
| foot_muscles_l | 10,7° |
| hamstrings_l | 11,2° |
| shin_muscles_l | 16,3° |

Les muscles des membres sont donc déjà correctement associés à leurs os.
Les angles élevés (diaphragme 85°, plancher pelvien 80°, pectoraux 79°)
viennent de l'axe PCA de structures plates et ne sont pas significatifs.
Une rotation rigide appliquée sur ces muscles a fortement dégradé le
confinement (jusqu'à 69 % de sommets hors peau) ; elle a été annulée.

## Volume thoracique

`docs/analyses/volume-thorax-male.json` : ratio moyen peau/os de 4,60 sur les
coupes y = 0,95–1,35 m. `docs/analyses/reduction-thorax-male.json` : une
réduction locale n'a déplacé que 320 sommets de peau et n'a pas changé
l'écart muscle→peau (p95 67 mm avant et après). Cet écart mesure la
profondeur des muscles internes, pas un excès de peau. La réduction a été
annulée.

## État final

- GLB homme et homme optimisé : identiques à `29e4f8a`.
- Invariant peau/rig : OK.
- `npm test`, intégrité des références, gate de publication, gate design :
  verts.
- Aucune FIX ouverte n'est fermée par cette passe : les pointes musculaires
  demandent une reconstruction des maillages à partir du squelette, pas un
  lissage après coup.

Prochaine approche recommandée : construire chaque muscle comme une enveloppe
paramétrée autour de l'os correspondant (rayon issu des mensurations
anthropométriques), puis remplacer le maillage source, au lieu de déformer
le maillage existant.
