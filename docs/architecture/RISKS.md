# Risques et angles morts — CORPS unifié

Date : 2026-11-21.

| Risque | Impact | Mesure |
|---|---|---|
| Mapping pathologie cible → structure imparfait | effet visuel manquant | test `test:pathologies` vérifie 27/27 cibles et tous les IDs du manifeste |
| Glande thyroïde absente du manifeste v2 | pathologies thyroïdiennes textuelles seulement | `TARGET_GAPS` documenté, aucun maillage inventé |
| Activation des textures sans validation humaine | image anatomique trompeuse | `textureDefault: false`, gate `test:review`, 16 fiches non signées |
| Ancien service worker côté utilisateur | version obsolète affichée | diagnostic en cours : `updateViaCache: 'none'` et badge de version à ajouter |
| PWA Brave régénérée par le navigateur | deux raccourcis réapparaissent | `.desktop` maison conservé ; vérifier après mise à jour du navigateur |
| Aucun adaptateur d'architecture disponible | scorecard 0/100, confiance low | ne pas conclure sur le score ; s'appuyer sur les gates exécutés |

Hypothèses à valider : relecture anatomiste des 16 fiches ; stabilité du WM class Omarchy après redémarrage.
