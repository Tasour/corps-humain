# ADR-0001 — Fusion v1/v2 sous le moteur v2

- Statut : proposé
- Date : 2026-11-21
- Décideurs : à désigner
- Drivers : à préciser

## Contexte

v1 apporte 30 pathologies, symptômes et moniteur ; v2 apporte 2009 structures, rendu batché et garde-fous. L'utilisateur veut une seule app avec les features des deux et un seul raccourci Omarchy.

## Options envisagées

| Option | Avantages | Inconvénients | Coût | Réversibilité |
|---|---|---|---|---|
| Porter v1 dans v2 | undefined | undefined | moyen | élevée |
| Porter v2 dans v1 | undefined | undefined | élevé | faible |

## Décision

Porter les fonctionnalités pathologies/moniteur/quiz de v1 dans v2, puis déployer la build fusionnée comme index.html racine.

## Conséquences

- Positives : moteur optimisé conservé ; jeu de données 2009 intact ; gates existants réutilisés
- Négatives acceptées : mapping imparfait : thyroïde absente du manifeste
- À surveiller : garde-fou lint:claims ; signature humaine des textures

## Preuves

- `src/data/diseases.js:12 (30 pathologies)`
- `src/v2-engine.js (BatchedMesh)`
- `docs/analyses/rebuild-propre.json`

## Révision

Condition de révision à définir (métrique ou date).
