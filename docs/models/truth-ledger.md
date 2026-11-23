# Registre de vérité anatomique — v1

## Règles non négociables

1. **Aucune donnée sans provenance scellée.** Toute valeur externe est transcrite
   avec sa source, sa page, son tableau, sa ligne et sa date de consultation.
   Le fichier de référence est haché ; un script de mesure refuse de tourner si
   le hash ne correspond pas. Aucun script de mesure n'écrit dans une référence.
2. **Deux chaînes indépendantes doivent concorder.** Un repère n'est accepté que
   si la géométrie de la peau et les centres articulaires du rig, prédits par une
   table publiée, tombent à moins de 3 mm. Sinon il est `ambiguous`.
3. **Tout ce qui n'est pas mesurable est `notMeasured`.** Un proxy porte le
   statut `proxy`, jamais `ok`. Aucune valeur n'est estimée ni interpolée pour
   combler un trou.

## Ce qui n'est pas une vérité

Un chiffre sans source. Une tolérance assouplie après coup. Un référentiel
recalibré sur la mesure qu'il était censé juger. Une case « validé » qui
fusionne des canaux de natures différentes.

## Canaux de validation

| Canal | Référence | Statut de sortie |
|---|---|---|
| `metric` | De Leva 1996 + ANSUR II, cibles hachées | `comparable`, `contested`, `outlier` |
| `topologique` | Graphe anatomique FMA, haché | `ok`, `mismatch` |
| `provenance` | Manifeste du maillage source, haché | `ok`, `mismatch` |
| `containment` | Enveloppe cutanée + squelette | `ok`, `violation` |

Les quatre canaux sont publiés séparément. Aucun champ agrégé « validé ».

## Un seul champ de déformation

Le facteur global règle la stature une fois pour toutes. La correction de
proportion est un champ de déformation **partagé** `W(x)` appliqué à tous les
sommets de toutes les couches. Ce n'est pas une mise à l'échelle par couche.
L'alignement inter-couches est préservé par construction.

## Critères d'acceptation

| Critère | Seuil |
|---|---|
| Segment ciblé vs référence | \|z\| ≤ 2, ou 95 % d'au moins une référence si \|z\| > 2 |
| Deux références en désaccord | `contested`, jamais `ok` |
| Accord des deux chaînes de repères | < 3 mm |
| Étirement maximal d'arête | ≤ 15 % |
| Auto-intersection aux cinq articulations | 0 |
| Résidu Kabsch après correction | < 2° |
| Invariant peau/rig après export | < 1 mm |
| Déplacement induit par l'optimiseur | < 0,5 mm, publié |

Le registre est la source de vérité procédurale. Les rapports qui en
découlent sont horodatés et liés au hash de géométrie qu'ils jugent.
