# Todolist — idées du benchmark 3D

Généré le 2026-11-20 à partir du [benchmark](2026-11-20-corps-benchmark.md).

20 idées : **8 P0**, 9 P1, 3 P2. Aucune correction appliquée.

| ID | Idée | Source | Cat. | Impact | Effort | Priorité | Niveau | Dépendances | Vérification | Statut |
|---|---|---|---|---:|---:|---:|---|---|---|---|
| BENCH-001 | Deep links vers waypoints et vues | [Cogni Anatomy](https://cogni.cards/anatomy) | UX | 5 | 1 | **25** | P0 | BENCH-009 | npm run test:v2 + capture avec query | a_faire |
| BENCH-002 | Polices inline, zéro CDN ni analytics | [SirwanAfifi/anatomy-atlas](https://github.com/SirwanAfifi/anatomy-atlas) | Distribution | 5 | 1 | **25** | P0 | — | grep fonts.googleapis analytics dans dist/ | a_faire |
| BENCH-003 | radiogroup au lieu d'aria-pressed sur modes exclusifs | [LearnAnatomy3D](https://learnanatomy3d.com/) | Accessibilité | 5 | 1 | **25** | P0 | — | npm run test:a11y | a_faire |
| BENCH-004 | Coupes frontale, sagittale, transversale | [Cogni Anatomy](https://cogni.cards/anatomy) | UX | 5 | 2 | **20** | P0 | — | capture 8 angles + npm run test:visuel | a_faire |
| BENCH-005 | Curseur explode réutilisant les 43 groupes | [ImliStack/Body-Atlas-3D](https://github.com/ImliStack/Body-Atlas-3D) | UX | 5 | 2 | **20** | P0 | — | npm run test:groupes3d | a_faire |
| BENCH-006 | Fiche de vérité par structure (source, licence, limite) | [ashemag/human-atlas](https://github.com/ashemag/human-atlas) | Qualité | 5 | 2 | **20** | P0 | — | npm run scorecard:3d + docs/SOURCES-3D.md | a_faire |
| BENCH-007 | Lint CI des affirmations médicales lint:claims | [Opening-Science/open-twin-xr](https://github.com/Opening-Science/open-twin-xr) | Qualité | 5 | 2 | **20** | P0 | — | npm run lint:claims | a_faire |
| BENCH-008 | Identifiant stable indépendant du nom exporté | [nqwrc/3d-anatomy](https://github.com/nqwrc/3d-anatomy) | Architecture | 5 | 2 | **20** | P0 | — | npm run audit:3d:check | a_faire |
| BENCH-009 | Catalogue de vues prêtes branché sur les waypoints | [Cogni Anatomy](https://cogni.cards/anatomy) | Pédagogie | 4 | 2 | **16** | P1 | — | npm run test:waypoints | a_faire |
| BENCH-010 | Registre licences machine-readable et attribution in-app | [Opening-Science/open-twin-xr](https://github.com/Opening-Science/open-twin-xr) | Architecture | 4 | 2 | **16** | P1 | BENCH-006 | npm run sources:check | a_faire |
| BENCH-011 | Tours guidés enchaînant les waypoints | [LearnAnatomy3D](https://learnanatomy3d.com/) | Pédagogie | 5 | 3 | **15** | P1 | BENCH-009 | npm run test:v2 | a_faire |
| BENCH-012 | check du modèle livré : identités, côtés, licences | [SirwanAfifi/anatomy-atlas](https://github.com/SirwanAfifi/anatomy-atlas) | Qualité | 5 | 3 | **15** | P1 | BENCH-008 | node scripts/check-modele.mjs | a_faire |
| BENCH-013 | Quiz multi-modes sur la chasse aux organes | [JINTAI 3D](https://jintai3d.com/en) | Pédagogie | 4 | 3 | **12** | P1 | — | npm run test:chasse | a_faire |
| BENCH-014 | Pages statiques par structure + sitemap | [Layered Body Atlas](https://bodyatlas.github.io/) | Distribution | 4 | 3 | **12** | P1 | BENCH-006, BENCH-008 | npm run build + sitemap | a_faire |
| BENCH-015 | Étiquettes ancrées sur la surface + leader lines | [JINTAI 3D](https://jintai3d.com/en) | UX | 4 | 3 | **12** | P1 | — | capture 8 angles | a_faire |
| BENCH-016 | Rendu sale (dirty flag) hors animations | [ashemag/human-atlas](https://github.com/ashemag/human-atlas) | Performance | 4 | 3 | **12** | P1 | — | profil rAF avant/après | a_faire |
| BENCH-017 | DPR plafonné à 2 et rendu adaptatif restauré | [SirwanAfifi/anatomy-atlas](https://github.com/SirwanAfifi/anatomy-atlas) | Performance | 4 | 3 | **12** | P1 | — | grep setPixelRatio + capture mobile | a_faire |
| BENCH-018 | Identité par vertex en un seul draw call | [Opening-Science/open-twin-xr](https://github.com/Opening-Science/open-twin-xr) | Performance | 4 | 4 | **8** | P2 | BENCH-008 | npm run test:groupes3d + profil | a_faire |
| BENCH-019 | Comparaison homme/femme côte à côte | [ImliStack/Body-Atlas-3D](https://github.com/ImliStack/Body-Atlas-3D) | Pédagogie | 3 | 5 | **3** | P2 | — | capture comparaison | a_faire |
| BENCH-020 | Dermatomes 3D et coupes gyri | [JINTAI 3D](https://jintai3d.com/en) | Contenu | 3 | 5 | **3** | P2 | BENCH-004 | acquisition source + validation | a_faire |

Les idées 🔴/🟡 restent **inspiration seule** : aucune copie de code ni de géométrie sans validation de licence.
JSON : `todolist-benchmark-3d.json`.