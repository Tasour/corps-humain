# Stratégie de tests — atlas 3D v2

## Pourquoi 30 tests Playwright

L'atlas v2 charge 2 104 structures réparties en trois lots de rendu, avec LOD, picking, animations et caméra orbitale. Trente scénarios Playwright couvrent les points où une régression reste silencieuse : nombre de draw calls, visibilité des lots après isolement, retour au culling, groupes, LOD, waypoints, animations et rendu mobile. Le chiffre n'est pas un objectif arbitraire : il correspond aux 30 appels à `check()` de `tests/v2-tests.mjs`, soit un contrat par comportement observable. Chaque scénario échoue sur une assertion `node:assert/strict` — la traque des erreurs console (`pageerror`, `console.error` hors favicon) n'est qu'un filet secondaire.

## Structure des fichiers

`tests/v2-tests.mjs` lance Chromium via le Playwright installé localement, ouvre `v2.html` sur `TEST_BASE` (`localhost:5199` par défaut), attend `window.__v2.ready`, puis enchaîne les scénarios. Le helper `check()` collecte les résultats PASS/FAIL et la session termine par `process.exit`. Un second contexte 390×844 avec `hasTouch` valide la sidebar repliable et le tap. `tests/collisions.test.mjs` ne dépend pas du navigateur : il exécute `scripts/check-collisions.mjs` et échoue si des structures traversent la peau ou se doublent, en lisant `docs/analyses/collisions.log`. Les deux commandes sont câblées dans `package.json` (`test:v2`, `test:collisions`).

## À ajouter

- **Visual regression** : captures 1360×880 et 390×844 comparées à une baseline (peau, isolement, éclat, thème clair/sombre), pour attraper ce que les assertions numériques manquent.
- **Picking profond** : sélection d'une structure masquée derrière la peau, picking through-layer, précision sur les bords d'organes.
- **Tactile** : pinch-zoom, rotation à deux doigts, glissement de la sidebar, au-delà du simple tap.

## Éviter la fragilité

Timeout par défaut à 90 s et attente `ready` à 120 s : le chargement des modèles est lent, aucun `waitForTimeout` ne doit être serré. `isolate(null)` entre chaque bloc restaure un état propre — c'est le principal point de fragilité, car l'isolement modifie peau, lots et ensemble des visibles ; on l'accompagne d'un `updateVisibility()`. La boucle rAF est arrêtée via `window.__v2Stop()` avant la fermeture, et les contextes mobiles sont fermés explicitement. Aucun `Math.random()` : graine fixe, donc scénario reproductible. Enfin, le cache mémoire des LOD est vidé entre les tests de sélection multiple, afin qu'un défaut de chargement du maillage `high` ne soit pas masqué par une réutilisation.
