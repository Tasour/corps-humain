# Architecture cible — socle Z-Anatomy stock

Date : 2026-11-21. ADR : ADR-0002.

## 1. Contexte
Reprise à zéro du modèle 3D : remplacer l'assemblage BodyParts3D + Z-Anatomy par un socle unique Z-Anatomy stock, exporté avec Blender compatible, sans anatomie inventée. Voir `docs/veille/2026-11-21-socle-propre-benchmark.md`.

## 2. Drivers
1. Source unique et provenance amont vérifiable (CC BY-SA 4.0).
2. Export reproductible byte-identique.
3. Aucune géométrie ni organe fabriqué.
4. Compatibilité avec les fonctionnalités existantes (pathologies, waypoints, quiz, PWA).

## 3. État des lieux
- Modèle actuel : 2 009 structures, 3 LOD, chunks gzip, rebuild canonique (`npm run rebuild:verify` : 14 fichiers identiques).
- Artefacts visuels documentés dans `docs/analyses/collisions-anatomiques.md` : peau sans doigts, 926 arêtes ouvertes, vaisseaux visibles dans les mains.
- Métriques : 10 863 faces retournées (0,172 %), 654 structures pluri-composantes (`docs/analyses/qualite-3d.json`).
- `tools.arch.profile` : aucun adaptateur d'analyse disponible → scorecard 0/100, confiance low (mesure honnête).

## 4. Options comparées
| Option | Avantages | Inconvénients | Décision |
|---|---|---|---|
| Z-Anatomy stock | source unique, collections amont, CC BY-SA | licence code à revoir, Blender 3.6–4.4 requis | retenue |
| Assemblage actuel | 2 009 structures, gates verts | artefacts main/torse, complexité | écartée |
| BodyParts3D seul | CC BY 4.0 | couverture musculaire insuffisante | écartée |

## 5. Architecture cible
- `scripts/export-zanatomy-stock.py` : export Blender headless de tous les objets stock.
- `zanatomy-export-stock/` : binaire + manifeste brut (noms, collections, bornes, offsets).
- `public/models/v2/manifest.json` : `source_id = za:<nom stock>`, TA2 depuis `TA2.csv`.
- Table d'alias ancien ID → nouvel ID pour préserver deep links, groupes, waypoints, pathologies.
- Exclusions NC documentées : oreille interne, rein, Brainder/White matter.

## 6. Contrats
- Aucune API réseau : fichiers locaux, service worker `corps-v44`.
- Formats : manifeste JSON, chunks gzip 3 LOD, fiches et licences JSON, pages statiques.
- Chaque exclusion porte une raison, une date et une URL source.

## 7. Budgets
- Export ≤ budget disque courant (~118 Mo de modèles).
- Textures CC0 ~4,2 Mo, flag éteint par défaut.
- Rendu : 4 appels, 0 requête externe.

## 8. Migration
P0 source → P1 export → P2 application → P3 preuve et déploiement. Détail : `ROADMAP.md`.

## 9. Risques
Voir `RISKS.md` : licence du code (issue amont #6), compatibilité Blender, gaps de couverture.

## 10. Définition de terminée
`harness-blender-export` byte-identique, `check:modele` vert, captures 8 angles avant/après, tests dynamiques, CI verte, validation humaine de la licence du code.

## 11. Décisions
ADR-0001 (fusion v1/v2 sous moteur v2) et ADR-0002 (socle Z-Anatomy stock).
