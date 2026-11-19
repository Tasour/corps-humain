# Complétude du jeu de données v2 — 19 novembre 2026

Généré pendant la phase P1. Source : `public/models/v2/manifest.json` (2 040 structures),
`docs/inventaire-anatomique/structures.json`, export Z-Anatomy
`zanatomy-export/zanatomy-all.json` et atlas BodyParts3D 4.0
`/tmp/opencode/human-atlas/public/models/atlas.json`.

## 1. État

| Indicateur | Valeur |
|---|---:|
| Structures rendues | **2 040** (2 039 avant ajout de l'œsophage) |
| Triangles au `high` | 6 509 773 |
| TA2 renseigné | 1 979 / 2 040 (96,9 %) |
| Structures sans TA2 | 61, dont l'œsophage nouvellement ajouté |

## 2. Trous comblés

### Œsophage — `organ:bp-esophagus`

La pièce `Esophagus` existe dans BodyParts3D 4.0 (concept **FMA7131**, système digestif,
296 triangles) mais n'avait **aucun concept dans l'inventaire** : le pipeline ne pouvait donc
pas la générer. Une entrée a été ajoutée à l'inventaire et le jeu reconstruit.

Limites assumées : maillage grossier (296 triangles, arête médiane 14 mm), 4 composantes,
52 arêtes libres, TA2 non renseigné. Il est classé *ouvert* (conduit) : ces bords ne sont pas
comptés comme un défaut de fermeture. Une meilleure source reste à trouver en P4.

## 3. Trous confirmés dans les deux sources

Pour chaque élément, la recherche a porté sur les identifiants, les libellés français et
anglais du manifeste, les noms d'objets de l'export Z-Anatomy et les noms de pièces de
l'atlas BodyParts3D.

| Élément attendu | Z-Anatomy | BodyParts3D | Manifest | Verdict |
|---|---|---|---|---|
| Myocarde | aucun objet `myocard*` | aucune pièce | 4 chambres + valves | **Absent** — `organ:bp-heart` ne contient que 11 pièces (valves, sinus coronaire, veines) |
| Poumon entier | 5 lobes seulement | aucune pièce `lung` | 5 lobes | **Absent** — seul l'assemblage des lobes pourrait le représenter (non fait : changerait l'identité des structures) |
| Hémisphères cérébraux | aucun objet `hemispher*` | pièces « White matter of left/right cerebral hemisphere » | `organ:bp-telencephalon-l/r` (54 552 / 54 920 tris) | **Présent sous un autre nom** — les télencéphales gauche et droit sont les hémisphères ; pas de doublon à créer |
| Ménisques | aucun objet `menisc*` | aucune pièce | 0 | **Absent** |
| Ligaments croisés du genou | aucun objet `cruciate*` | aucune pièce | 0 | **Absent** |
| Veines caves | — | « Superior/inferior vena cava » | `organ:bp-superior-vena-cava`, `organ:bp-inferior-vena-cava` | **Présent** |
| Uretères | — | « Left/right ureter » | `organ:bp-ureter-l/r` | **Présent** |
| Surrénales | « Suprarenal gland.l/r » | « Left/right adrenal gland » | `organ:suprarenal-gland-l/r` | **Présent** |

## 4. Travail restant

1. **Réconciliation systématique** des noms de pièces BodyParts3D sans concept dans
   l'inventaire (l'œsophage en est un exemple concret ; un balayage complet reste à faire).
2. **Acquisition de sources** pour le myocarde, les ménisques et les ligaments croisés :
   aucune des deux sources ouvertes actuelles ne les contient. Ne pas fabriquer une forme
   plausible.
3. **Décision explicite** pour le poumon entier : créer un agrégat ou documenter que seuls
   les lobes sont des structures anatomiques individuelles.
4. **TA2** : renseigner les 60 structures sans identifiant TA2, ou documenter chaque absence.

## 5. Limites

Ce rapport mesure la **présence**, pas la fidélité anatomique. Une structure présente peut
être grossière ou fausse ; l'audit topologique et la revue 8 angles sont des portes distinctes.
Aucune géométrie n'a été inventée pour combler un trou.
