# Reconstruction musculaire — homme — 2026-11-24

## Objectif

Remplacer les maillages musculaires pointus par des enveloppes paramétriques
construites autour de l'os correspondant, avec rayons issus des circonférences
ANSUR II et topologie régulière.

## Outils développés

- `docs/models/muscle-radii.json` : circonférences ANSUR II, formule de rayon,
  mapping muscle→mesure, hash du CSV.
- `docs/models/muscle-classification-male.json` : 40 muscles classés
  `tubulaire`, diaphragme classé `plaque`.
- `scripts/rebuild_muscle_envelopes.py` : 24 anneaux × 16 segments radiaux,
  taper cosinus, matériau conservé, nom de maillage conservé.
- `scripts/rebuild_diaphragm.py` : enveloppe convexe du diaphragme.
- `scripts/remesh_muscles.py` : essai de remesh voxelique 4 mm.
- `scripts/classify_muscles.py`, `scripts/analyze_muscle_quality.py`,
  `scripts/confine_muscles_smooth.py` : outils de mesure et de confinement.

## Résultats chiffrés

| Méthode | Ratio arête max/médiane | Sommets hors peau |
|---|---:|---:|
| Source `29e4f8a` | 166 (rotator cuff) | < 1 % après confinement |
| Enveloppes paramétriques + confinement | 8,7–11,3 | < 5 % |
| Enveloppes + rayons +20 % | 10,7–11,7 | jusqu'à 6,7 % |
| Remesh voxelique 4 mm | 37–82 | jusqu'à 5,4 % |

Les enveloppes paramétriques améliorent nettement la métrique de topologie,
mais la relecture des captures `male-rebuilt-muscles-1658.png` et
`male-rebuilt-all-1658.png` montre une perte de lisibilité anatomique :
cellules tubulaires disjointes, patch abdominal trop clair, excroissance
rectangulaire à la hanche. Le remesh voxelique aggrave l'aspect.

## Décision

Les modifications géométriques sont **rejetées**. Les GLB homme et homme
optimisé sont restaurés à l'état `29e4f8a` (empreinte `8efbe6807559e155`).
Les outils et rapports restent versionnés comme base de travail pour une
reconstruction future, mais aucun modèle publié n'est dégradé.

Aucune FIX n'est fermée par cette passe. La femme reste figée sur `158ebf8`.
