# Roadmap — socle Z-Anatomy stock

Date : 2026-11-21. ADR : ADR-0002. Benchmark : `docs/veille/2026-11-21-socle-propre-benchmark.md`.

## P0 — source
- Installer Blender compatible (3.6–4.4, >= 4.5 incompatible avec le `Startup.blend` stock).
- Épingler commit amont + SHA-256 de `Z-Anatomy.zip`, `TA2.csv`, `License.txt`.
- Critère : `harness-blender-export` vert (headless OK, empreintes conformes).
- Rollback : conserver `zanatomy-export/` actuel.

## P1 — export
- Exporter tous les objets stock, exclure NC (oreille interne, rein, Brainder/White matter), corriger mécaniquement winding/normales/dégénérés.
- Critère : deux exports byte-identiques, rapport `docs/analyses/socle-stock.json`.
- Rollback : dossier d'export temporaire supprimable.

## P2 — application
- Nouveau manifeste (`source_id = za:<nom stock>`, TA2 amont), alias IDs, régénération fiches/licences/pages/waypoints/pathologies.
- Critère : `check:modele` vert, tests dynamiques sans compteur figé.
- Rollback : ancien manifeste archivé.

## P3 — preuve et déploiement
- Captures 8 angles + mains/torse avant/après, scorecard, a11y, PWA, revue humaine, déploiement.
- Critère : `screenshot_diff` > 2 % sur les zones corrigées, CI verte, `main → gh-pages`.
- Rollback : branche `gh-pages` précédente.

## Condition bloquante
Le propriétaire amont (issue #6) demande que le code de l'application soit publié sous CC BY-SA 4.0 si le modèle est utilisé. Le code CORPS est MIT : validation humaine obligatoire avant P3.

## Livrables
`docs/analyses/socle-stock.json`, `docs/analyses/harness-blender-export.json`, captures `docs/analyses/socle-stock/`, ADR-0002, benchmark daté.
