# Architecture cible — CORPS unifié

Date : 2026-11-21. Décision : ADR-0001 (fusion v1/v2 sous le moteur v2).

## Contexte
Deux applications coexistaient : v1 (pathologies, moniteur, quiz) et v2 (2 009 structures, rendu batché, gates). L'utilisateur veut une seule application conservant les fonctionnalités des deux.

## Drivers
1. Conserver le moteur v2 et son budget (4 appels de rendu).
2. Conserver la base de 30 pathologies / 27 cibles sans inventer d'anatomie.
3. Une seule URL publique et un seul raccourci Omarchy.

## Options écartées
- Porter v2 dans v1 : perte des gates et des LOD, réversibilité faible (ADR-0001).
- Garder deux apps : double cache, double raccourci, confusion utilisateur.

## Cible
- `src/v2-engine.js` : moteur de rendu unique (BatchedMesh, identity GPU, 3 LOD).
- `src/data/diseases.js` : base de pathologies importée telle quelle (30 entrées, 19 types d'effets).
- `src/data/disease-targets.js` : table de correspondance 27 cibles → IDs du manifeste ; gap `thyroide` documenté.
- `v2.html` : interface unique ; `postbuild-unify.mjs` la sert comme `index.html`, l'ancienne v1 devient `classique.html`.
- garde-fous : `lint:claims`, `test:review`, `rebuild:verify`, `test:pathologies`.

## Contrats
- Aucune API réseau : tout est local (PWA, service worker `corps-v44`).
- Formats : manifeste JSON 2 009 entrées, chunks gzip, fiches et licences JSON, pages statiques.

## Budgets
- Textures : ≤ 8 Mo par tissu, ~4,2 Mo au total ; drapeau `?tex=cc0` éteint par défaut.
- Rendu : 4 appels mesurés ; 0 requête externe ; aucune signature de revue simulée.

## Migration
P0 (fait) : mapping, HUD pathologies, quiz, build unifié, raccourci unique.
P1 : relecture humaine des 16 fiches via `corps_review_sign`.
P2 : activation de `?tex=cc0` par défaut uniquement après signatures (5/5/5/1).

## Définition de terminée
`npm test`, `test:pathologies`, `test:review`, `lint:claims`, `rebuild:verify`, `build`, captures 8 angles et verdict daté.
