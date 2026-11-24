# Corrections géométriques — homme — 2026-11-24

## Périmètre

La femme reste figée sur le build `158ebf8`. Les outils écrits ici sont
paramétrés par `sex` et seront réexécutés sur la femme après validation de
l'homme.

## FIX-58 — organes crâniens proéminents

Mesure initiale (normale de peau au point cutané le plus proche) :

| Maillage | Sommet | Hors peau | Dépassement max |
|---|---:|---:|---:|
| brain | 37 746 | 93,8 % | 75,4 mm |
| skull | 21 231 | 90,0 % | 65,7 mm |
| eye_l | 23 079 | 73,4 % | 74,2 mm |
| eye_r | 25 816 | 87,9 % | 73,7 mm |
| cerebellum | 3 597 | 91,7 % | 74,8 mm |
| brainstem | 6 894 | 96,2 % | 73,9 mm |

Correction en deux temps :

1. `scripts/fix_head_organs.py` — translation rigide commune du groupe crânien,
   delta `[0,00981, -0,01647, -0,19326]` m.
2. `scripts/confine_head.py` — deux passes de confinement à 2 mm sous la
   surface cutanée, topologie conservée.

Résultat final : brain 0,5 %, skull 0,4 %, yeux 0,0 %, cerebellum 0,7 %,
brainstem 0,2 %, larynx 0,4 % de sommets hors peau ; dépassement max 3,5 mm.

Preuve : `docs/analyses/head-fix-male.json`,
`docs/analyses/head-confinement-male.json`,
capture `docs/harness/male-fixed-all-1658.png`.

## FIX-57 — lambeaux roses sous les bras et aux hanches

Les muscles dépassaient largement l'enveloppe cutanée, par exemple :
`upper_arm_muscles` 77 %, `shoulder_muscles` 77 %, `rotator_cuff` 91 %,
`quadriceps` 91 % de sommets hors peau, avec des dépassements jusqu'à 94 mm.

Correction : `scripts/confine_muscles.py`, deux passes de confinement à 2 mm
sous la surface cutanée, 41 maillages musculaires conservés.

Résultat final : `upper_arm_muscles` 0,0 %, `trapezius` 0,0–0,1 %,
`shoulder_muscles` 0,3–0,4 %, dépassement maximal résiduel 14,7 mm sur un
maillage, la majorité sous 3 mm.

Preuve : `docs/analyses/muscle-confinement-male.json`,
capture `docs/harness/male-fixed-muscles-1658.png`.

## Invariant

Après chaque correction, `scripts/scale_rig.py` réaligne les 66 os du rig et
`scripts/assert_scale_invariant.py` vérifie la cohérence peau/rig à 1 mm près.
