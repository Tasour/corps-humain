# Règles de repères anatomiques — v1

## Repère
- glTF Y-up, mètres, origine au sol, X positif à droite du sujet.
- Un repère = identifiant, maillage source, coordonnée nominale, tolérance.
- Table canonique : `docs/models/landmarks.json` (80 repères, générée par
  `scripts/build_landmarks.py` depuis les centroïdes du squelette).

## Objectif mathématique
Pour chaque couche, on cherche la transformation rigide `(R,t)` qui minimise
`Σ‖R·pᵢ + t − qᵢ‖²` sur les repères appariés. Résolution fermée par SVD
(Kabsch), `det(R)=+1`, donc isométrie stricte : aucune mise à l'échelle ni
étirement par couche.

## Tolérances
- Repères internes : 2 mm.
- Mensurations et ratios : 2 %.
- Symétrie gauche/droite : 2 mm.
- Reproductibilité : deux exécutions produisent des octets identiques.

## Règles interdites
- Aucune graine aléatoire, aucun seuil visuel, aucune décision manuelle.
- Aucune mise à l'échelle par couche : un seul facteur global par corps.
- Aucune couche modifiée si un de ses repères dépasse la tolérance.

## Règles d'enveloppe
- Peau à 2–20 mm des muscles là où un muscle existe.
- Peau jamais à l'intérieur d'un muscle ; muscle jamais à l'extérieur de la peau.
- Zones sans muscle autorisées : crâne, paumes, plantes.
- Yeux ↔ orbites ↔ paupières < 2 mm ; testicules ↔ scrotum < 2 mm ;
  phalanges main/pied ↔ muscle ↔ peau < 2 mm.
- Vaisseaux et nerfs dans les couloirs musculaires, sous l'enveloppe cutanée.
