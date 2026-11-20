# Plans détaillés — idées du benchmark 3D

**Date : 20 novembre 2026 · Source : [benchmark](2026-11-20-corps-benchmark.md) et [todolist](todolist-benchmark-3d.md).**

20 plans, un par entrée `BENCH-001`…`BENCH-020`. Chaque plan est ancré dans l'état réel du dépôt
(lecture seule de `src/`, `v2.html`, `index.html`, `package.json`, CI et `docs/`).

## Règles transversales

- Un item = **une worktree, un commit, une capture avant/après, un verdict** écrit dans la todolist.
- Statut : `a_faire` → `en_cours` → `verifie` **uniquement sur preuve** (test + capture).
- Zéro copie de code ni de géométrie des candidats 🔴/🟡 : réimplémentation originale obligatoire.
- Toute idée 🟢 réutilisée plus tard doit produire une entrée `LICENSES.md` (composant, URL exacte,
  licence, auteurs, date de consultation, fichiers concernés, nature de l'adaptation).
- Un rebuild du jeu de données passe toujours par `npm run sources:check` d'abord
  (`docs/SOURCES-3D.md:37`).

## Constat d'état — plusieurs idées existent déjà partiellement

| Idée | État réel |
|---|---|
| BENCH-002 | Aucun `fonts.googleapis`, `analytics` ou `@font-face` trouvé ; `--sans` = `"Inter", "Segoe UI", system-ui…` sans webfont chargée → repli système déjà actif. |
| BENCH-003 | `aria-pressed` sur vraies bascules (thème, `v2.html:299`) **et** sur choix exclusifs (`data-cat` `v2.html:315-318`, chasse `v2.html:895-904`) ; v1 `#kind-filter` n'a que `.active` (`index.html:95-100`). |
| BENCH-004 | `localClippingEnabled = true` (`scene.js:147`) mais **un seul** plan `new THREE.Plane(new THREE.Vector3(0,0,-1), 0.12)` (`scene.js:116`), appliqué en `scene.js:688-705`. |
| BENCH-005 | v1 : `#explode-range` 0–100 (`index.html:140`) + ~43 `explodeData` (`scene.js:647`) ; v2 : `animateGroup(..., "explode")` (`v2-engine.js:1015`) mais pas de curseur global. |
| BENCH-011 | `waypointTour` existe déjà (`v2.html:850-854`, timer 2.1 s, une seule structure). |
| BENCH-015 | `CSS2DRenderer` déjà en place (`scene.js:154`), ancrage au centre de boîte probable. |
| BENCH-016 | v2 a déjà `needsRender` (`v2.html:906`) et une boucle rAF unique ; v1 utilise `setAnimationLoop` (`scene.js:136`) continu. |
| BENCH-017 | v1 `Math.min(devicePixelRatio, 2)` (`scene.js:146`) ✓ ; v2 `Math.min(devicePixelRatio, 1.5)` (`v2.html:391`) puis adaptatif (`v2.html:1421,1493`) → divergence. |

---

# P0 — quick wins (priorité ≥ 20)

## BENCH-001 — Deep links vers waypoints et vues (25) · Cogni Anatomy
- **Source** : https://cogni.cards/anatomy · 🟡 données / 🟢 inspiration.
- **État** : seul `?tex=os-proxy` est lu (`v2.html:446`) ; aucun deep link. Waypoints dans
  `src/data/waypoints.js` (CURATED + générés), test `npm run test:waypoints`.
- **Objectif** : `?vue=cœur&wp=2` ouvre v2.html, sélectionne la structure, applique le cadrage
  et affiche le waypoint n°2 ; URL copiable depuis le bouton « Waypoints ».
- **Fichiers** : `v2.html` (parse `URLSearchParams` après création de `engine`),
  `src/data/waypoints.js` (index clé→liste), `tests/waypoints.test.mjs`,
  `docs/veille/todolist-benchmark-3d.json`.
- **Étapes** : 1) `applyDeepLink()` appelé une fois `engine.byId` prêt ; 2) résoudre `vue`
  via un slug stable (pas le nom d'affichage) ; 3) réutiliser `engine.focusEntry()` +
  `setWaypointsVisible(true)` ; 4) bouton « Copier le lien » via `navigator.clipboard.writeText()` ;
  5) comportement sans paramètre strictement identique.
- **Vérification** : `npm run test:waypoints` + capture avant/après sur
  `?vue=organ:bp-heart&wp=2` en 1658×1150 et 390×844 ; verdict.
- **Piège** : ne pas casser `?tex` ; borner `wp` à la longueur de la liste.

## BENCH-002 — Polices inline, zéro CDN ni analytics (25) · SirwanAfifi/anatomy-atlas
- **Source** : https://github.com/SirwanAfifi/anatomy-atlas · 🔴 code / 🟡 modèle.
- **État** : aucune requête externe trouvée dans les sources ; le test manque.
- **Objectif** : transformer l'absence de réseau en **garde-fou prouvé** en CI.
- **Fichiers** : nouveau `tests/reseau-local.mjs`, `package.json` (script `test:reseau`),
  `.github/workflows/qualite-3d.yml`, `docs/veille/todolist-benchmark-3d.json`.
- **Étapes** : 1) `npm run build` ; 2) Playwright intercepte les requêtes et échoue si
  `new URL(req.url()).origin !== origin local` ; 3) `grep -R "fonts.googleapis\|gtag\|analytics" dist/` ;
  4) documenter le repli système dans le README.
- **Vérification** : `npm run test:reseau` → 0 requête externe ; capture du log réseau avant/après.
- **Piège** : ne pas embarquer une police binaire « au cas où » sans mesure de budget.

## BENCH-003 — `radiogroup` au lieu d'`aria-pressed` sur modes exclusifs (25) · LearnAnatomy3D
- **Source** : https://learnanatomy3d.com/ · 🟡 données / 🟢 inspiration.
- **État** : voir tableau de constat. Le thème est une vraie bascule ; les catégories et
  les modes de chasse sont exclusifs.
- **Objectif** : distinguer bascules indépendantes (`aria-pressed` conservé) et choix uniques
  (`role="radiogroup"` + `role="radio" aria-checked`, navigation flèches, tabindex roving).
- **Fichiers** : `v2.html`, `index.html`, `src/main.js:185-200`, `src/ui.js`,
  `tests/a11y-v2.mjs`, `docs/analyses/accessibilite-2026-11-19.md`.
- **Étapes** : 1) inventarier les occurrences d'`aria-pressed` et classer bascule / exclusif ;
  2) convertir les exclusifs ; 3) consignes gestuelles dans l'aria-label ; 4) étendre `test:a11y`
  d'un cas « un seul coché par groupe ».
- **Vérification** : `npm run test:a11y` (19/19 + nouveaux cas) ; capture du focus clavier.
- **Piège** : ne pas convertir le thème (bascule légitime) — c'est le piège du benchmark.

## BENCH-004 — Coupes frontale, sagittale, transversale (20) · Cogni Anatomy
- **Source** : https://cogni.cards/anatomy · 🟡 données / 🟢 inspiration.
- **État** : un seul plan de coupe (voir constat).
- **Objectif** : 3 plans orientables X/Y/Z avec sélecteur et curseur de position, en réutilisant
  le mécanisme existant `_applyClipping()`.
- **Fichiers** : `src/scene.js` (`clipPlane` → tableau, `_applyClipping`, `setCrossSection`),
  `src/main.js:340+`, `index.html:142-149`, `src/style.css`, `tests/v2-tests.mjs`.
- **Étapes** : 1) `clipPlanes = {x,y,z}` + `setClipAxis(axis)` ; 2) conserver
  `material.userData._clipSide` pour restaurer `side` ; 3) UI 3 boutons `radiogroup` + range −1..1 ;
  4) garder l'incompatibilité coupe/explode (`main.js:317-320`) ; 5) annonce ARIA axe + position.
- **Vérification** : `npm run test:visuel` + 8 captures (une par axe) ; verdict.
- **Piège** : restaurer `_clipSide` à la désactivation sinon les faces internes restent inversées.

## BENCH-005 — Curseur « explode » réutilisant les 43 groupes (20) · ImliStack/Body-Atlas-3D
- **Source** : https://github.com/ImliStack/Body-Atlas-3D · 🔴 code / 🟡 organes (inspiration seule).
- **État** : v1 complet, v2 partiel (voir constat).
- **Objectif** : porter le curseur global dans v2 et vérifier les 43 groupes sans régression.
- **Fichiers** : `v2.html` (UI dock + état), `src/v2-engine.js:1015-1050`, `src/data/groups.js`,
  `tests/groupes-3d.mjs`, `docs/analyses/groupes-3d.json`.
- **Étapes** : 1) recenser les 43 groupes et leur centre ; 2) vecteur d'éloignement radial pondéré ;
  3) bouton binaire + range continu synchronisés ; 4) interdire coupe + explode simultanés ;
  5) test « 43 groupes déplacés à 100 %, 0 à 0 % ».
- **Vérification** : `npm run test:groupes3d` (52/52) + capture 8 angles ; verdict.
- **Piège** : ne pas créer un second système d'animation parallèle à v1.

## BENCH-006 — Fiche de vérité par structure (20) · ashemag/human-atlas 🟢
- **Source** : https://github.com/ashemag/human-atlas · 🟢 MIT + CC BY 4.0 (attribution à conserver).
- **État** : `docs/SOURCES-3D.md`, `docs/analyses/sources-checksums.json`,
  `docs/inventaire-anatomique/structures.json` ; aucune fiche par structure.
- **Objectif** : pour chacune des 2 009 structures, afficher source, licence, identifiant
  FMA/TA2 et limite connue dans le panneau détail, sans réseau.
- **Fichiers** : `scripts/generate-anatomy-report.mjs`, nouveau `public/data/fiches-verite.json`,
  `v2.html`, `src/ui.js`, `docs/SOURCES-3D.md`, `README.md`.
- **Étapes** : 1) schéma `{id, source, licence, fma, ta2, limite, date}` ; 2) généré depuis
  l'inventaire + checksums (jamais à la main) ; 3) test de couverture 2 009/2 009 ; 4) rendu avec
  mention « modèle pédagogique, pas un diagnostic » ; 5) attribution du benchmark.
- **Vérification** : `npm run scorecard:3d` + `node scripts/check-fiches.mjs` ; verdict.
- **Piège** : ne pas copier les fiches Cogni/Learn (🟡) ; générer depuis nos sources.

## BENCH-007 — Lint CI des affirmations médicales (20) · open-twin-xr
- **Source** : https://github.com/Opening-Science/open-twin-xr · 🟡 MIT code / assets NC.
- **État** : posture « sans prétention diagnostique » dans les textes, aucun garde-fou automatique.
- **Objectif** : `npm run lint:claims` échoue sur tout wording diagnostique ou promotionnel.
- **Fichiers** : nouveau `scripts/lint-claims.mjs`, `package.json`,
  `.github/workflows/qualite-3d.yml` (étape après « Tests données »).
- **Étapes** : 1) lexique FR interdit (« diagnostiquez », « vous avez », « traitement »,
  « prescription », « fiable à 100 % »…) ; 2) scanner `src/data/*.js`, `index.html`, `v2.html`,
  `docs/SOURCES-3D.md` ; 3) allowlist documentée pour les citations ; 4) erreur fichier:ligne ;
  5) intégrer à `npm test`.
- **Vérification** : `npm run lint:claims` vert + test négatif (phrase interdite injectée dans un
  tmp → échec attendu) ; capture du log.
- **Piège** : ne pas confondre « pathologie active » (moniteur v1 simulé) avec une affirmation clinique.

## BENCH-008 — Identifiant stable indépendant du nom exporté (20) · nqwrc/3d-anatomy
- **Source** : https://github.com/nqwrc/3d-anatomy · 🔴 CC BY-NC-SA + 2 composants sans licence
  (inspiration seule).
- **État** : IDs (`organ:bp-heart`, `bone:femur-l`) dérivés des noms de nodes ; l'export glTF
  réécrit espaces/points et peut fusionner des paires.
- **Objectif** : champ `source_id` immuable, distinct du libellé, conservé après rebuild.
- **Fichiers** : `scripts/build-anatomy-v2.mjs`, `scripts/generate-anatomy-inventory.mjs`,
  `public/models/v2/manifest.json`, `src/v2-engine.js` (`byId`), `tests/coherence-modeles.mjs`.
- **Étapes** : 1) ajouter `source_id` (FMA/`za_name`) au manifeste ; 2) garder `id` d'affichage
  inchangé (compatibilité waypoints) ; 3) `byId` indexe sur les deux ; 4) test « 0 perte
  d'identité après rebuild propre depuis sources vérifiées » ; 5) documenter dans
  `docs/jeu-de-donnees-v2.md`.
- **Vérification** : `npm run audit:3d:check` + `npm run sources:check` avant rebuild +
  `node tests/coherence-modeles.mjs` ; verdict.
- **Piège** : tout rebuild passe par `npm run sources:check` d'abord.

---

# P1 — différenciation (12–16)

## BENCH-009 — Catalogue de vues prêtes sur les waypoints (16) · Cogni Anatomy
- **Dépend** : BENCH-006 ; utile à BENCH-001 et BENCH-011.
- **État** : waypoints curvés + `getWaypoints()` ; aucun catalogue navigateur.
- **Objectif** : panneau « Vues remarquables » listant les waypoints par système ; clic =
  sélection + cadrage + deep link.
- **Fichiers** : `src/data/waypoints.js`, `v2.html`, `src/style.css`, `tests/waypoints.test.mjs`.
- **Étapes** : 1) aplatir `CURATED` en `{structure, waypoint, label}` ; 2) filtrer par système ;
  3) vignettes textuelles (aucune image distante) ; 4) réutiliser le cadrage BENCH-001 ;
  5) annonce ARIA du changement de vue.
- **Vérification** : `npm run test:waypoints` + capture du catalogue ; verdict.

## BENCH-010 — Registre licences machine-readable + attribution in-app (16) · open-twin-xr
- **Dépend** : BENCH-006.
- **État** : `SOURCES-3D.md` + checksums JSON, mais pas d'attribution visible dans l'app.
- **Objectif** : `licenses.json` généré + page « Sources & licences » accessible depuis l'UI.
- **Fichiers** : `scripts/sources-checksums.mjs`, nouveau `public/data/licenses.json`,
  `v2.html`, `docs/SOURCES-3D.md`.
- **Étapes** : 1) schéma `{asset, licence, auteurs, url, date, modification}` ; 2) généré depuis
  les manifests sources ; 3) bouton dans le panneau ; 4) test de parité empreintes ↔ licences.
- **Vérification** : `npm run sources:check` + capture de la page ; verdict.

## BENCH-011 — Tours guidés enchaînant les waypoints (15) · LearnAnatomy3D
- **Dépend** : BENCH-009.
- **État** : `waypointTour` mono-structure (`v2.html:850-854`).
- **Objectif** : séquence multi-structures (ex. cœur → poumons → rein) avec pause, suivant,
  précédent et sortie clavier.
- **Fichiers** : `v2.html` (étendre `waypointTour`), `src/data/waypoints.js` (parcours),
  `src/style.css`, `tests/waypoints.test.mjs`.
- **Étapes** : 1) parcours `[{structure, wp}]` ; 2) état `tour.{index, playing}` ; 3) `Esc` = sortie ;
  4) respect `prefers-reduced-motion` (déjà utilisé `v2.html:846`) ; 5) annonce « étape 2/7 »
  en `aria-live`.
- **Vérification** : `npm run test:v2` + capture du parcours complet ; verdict.

## BENCH-012 — `check` du modèle livré (15) · SirwanAfifi/anatomy-atlas
- **Dépend** : BENCH-008.
- **État** : `audit:3d:check` = topologie, `sources:check` = fichiers sources ; rien ne vérifie
  le **manifeste distribué**.
- **Objectif** : `node scripts/check-modele.mjs` décode le manifeste/chunks livrés et valide
  identités, côtés, groupes et licences.
- **Fichiers** : nouveau `scripts/check-modele.mjs`, `package.json`, CI.
- **Étapes** : 1) lire `public/models/v2/manifest.json` + chunks ; 2) 2 009 IDs uniques,
  `source_id` présents, gauche/droite cohérents ; 3) empreintes ↔ `sources-checksums.json` ;
  4) échec si licence absente ; 5) intégrer en CI avant le build.
- **Vérification** : `node scripts/check-modele.mjs` vert + test négatif (ID dupliqué) ; verdict.

## BENCH-013 — Quiz multi-modes sur la chasse (12) · JINTAI 3D
- **Source** : https://jintai3d.com/en · 🟡 données / 🔴 code (inspiration seule).
- **État** : chasse native v2 (`HUNT_TARGETS`, score, 90 s, picking exact), un seul mode.
- **Objectif** : ajouter « nommer », « forme », « système », « gauche/droite » sans toucher au
  moteur de picking.
- **Fichiers** : `src/data/hunt.js`, `src/games.js`, `v2.html:872-1050`, `tests/chasse.test.mjs`.
- **Étapes** : 1) extraire le moteur de partie de l'UI ; 2) 5 générateurs partageant `huntPool` ;
  3) sélecteur en `radiogroup` (cohérent BENCH-003) ; 4) score conservé par mode ;
  5) test « 5 modes × 1 partie ».
- **Vérification** : `npm run test:chasse` + capture HUD ; verdict.
- **Piège** : ne pas importer les 6 modes JINTAI (🟡).

## BENCH-014 — Pages statiques par structure + sitemap (12) · Layered Body Atlas
- **Source** : https://bodyatlas.github.io/ · 🔴 licence inconnue (inspiration seule).
- **Dépend** : BENCH-006 + BENCH-008.
- **Objectif** : 2 009 pages HTML générées, indexables, lisibles sans JS.
- **Fichiers** : nouveau `scripts/generate-pages-structures.mjs`, `vite.config.js`,
  `public/sitemap.xml`, `public/robots.txt`.
- **Étapes** : 1) générer depuis manifeste + fiches de vérité ; 2) un `<main>` par page, texte
  sémantique, meta description 150–250 car ; 3) lien « Voir en 3D » vers BENCH-001 ;
  4) CI de dérive : échec si pages obsolètes ; 5) mesurer le budget total.
- **Vérification** : `npm run build` + test « 2 009 pages, 0 lien mort » ; verdict.
- **Piège** : ne pas transformer CORPS en site de pathologies.

## BENCH-015 — Étiquettes ancrées sur la surface + leader lines (12) · JINTAI 3D
- **État** : `CSS2DRenderer` (`scene.js:154`) ; ancrage au centre de boîte probable.
- **Objectif** : ancrage à un point de surface (fractions de bbox comme les waypoints), leader
  line SVG, anti-chevauchement 30 px.
- **Fichiers** : `src/scene.js`, `src/v2-engine.js`, `src/style.css`,
  `tests/visuel-regression.mjs`.
- **Étapes** : 1) réutiliser les fractions `[0..1]` des waypoints ; 2) projection écran + décalage ;
  3) polyligne SVG ; 4) empilement déterministe (aucun `Math.random`) ; 5) test sur 8 angles.
- **Vérification** : capture 8 angles ; verdict « étiquettes lisibles sous tous les angles ».

## BENCH-016 — Rendu sale / dirty flag (12) · ashemag/human-atlas 🟢
- **État** : v2 a `needsRender` (`v2.html:906`) et une boucle rAF unique ; v1 `setAnimationLoop`
  continu (`scene.js:136`).
- **Objectif** : auditer puis étendre le dirty flag à v1 et aux animations sans casser
  battement/respiration.
- **Fichiers** : `src/scene.js:136,1560+`, `v2.html` (boucle), `docs/audit-fps.md`.
- **Étapes** : 1) mesurer les FPS au repos (avant) ; 2) avancer la scène seulement si
  `dirty || animActive || damping` ; 3) garder pause sur `document.hidden` ; 4) re-mesurer ;
  5) documenter le gain.
- **Vérification** : profil rAF avant/après + `npm run test:visuel` ; verdict chiffré.
- **Piège** : une seule boucle rAF et pause sur onglet caché sont non négociables.

## BENCH-017 — DPR ≤ 2 et rendu adaptatif restauré (12) · SirwanAfifi/anatomy-atlas
- **État** : v1 conforme, v2 divergent (voir constat).
- **Objectif** : uniformiser à ≤ 2, garantir le retour à la pleine résolution après mouvement,
  tester sur GPU lent émulé.
- **Fichiers** : `src/scene.js`, `v2.html`, `tests/visual-collisions.mjs`, `docs/audit-rendu.md`.
- **Étapes** : 1) utilitaire partagé `dprFor(mode)` ; 2) test « DPR réduit puis restauré » ;
  3) plafond dur à 2 ; 4) capture 390×844 avant/après.
- **Vérification** : `grep setPixelRatio` + capture mobile + verdict. **Statut probable :
  déjà conforme à vérifier**, pas une implémentation from scratch.

---

# P2 — à arbitrer

## BENCH-018 — Identité par vertex, un seul draw call (8) · open-twin-xr
- **Dépend** : BENCH-008, BENCH-012.
- **Objectif** : garder un picking exact à 2 009 structures sans explosion des draw calls,
  via un identifiant par vertex + table.
- **Fichiers** : `src/v2-engine.js`, `scripts/build-anatomy-v2.mjs`, `tests/groupes-3d.mjs`.
- **Étapes** : 1) mesurer les draw calls (avant) ; 2) encoder `uint16` par vertex + LUT ;
  3) shader de sélection/surlignage ; 4) re-mesurer ; 5) arbitrer au vu du gain.
- **Vérification** : profil avant/après + picking exact sur 10 structures ; verdict.
  **À faire seulement si le gain est mesuré.**

## BENCH-019 — Comparaison homme/femme côte à côte (3) · ImliStack/Body-Atlas-3D
- **Objectif** : deux corps alignés avec caméra synchronisée, sans géométrie inventée.
- **Fichiers** : `src/data/*`, `v2.html`, nouveaux modèles féminins **sourcés**.
- **Étapes** : 1) vérifier une source féminine licenciée (HuBMAP CC BY 4.0) ; 2) si aucune
  source vérifiée → **plan bloqué**, documenté comme limite ; 3) sinon recalage sur repères
  osseux + caméra synchronisée ; 4) capture.
- **Vérification** : capture comparaison + `sources:check`.
  **Risque majeur : géométrie féminine non disponible → ne jamais la fabriquer.**

## BENCH-020 — Dermatomes 3D et coupes gyri (3) · JINTAI 3D
- **Dépend** : BENCH-004.
- **Objectif** : couche thématique dermatomes sur un jeu de données externe identifié.
- **Étapes** : 1) source open prouvée (licence + attributs) ; 2) validation humaine avant
  incorporation ; 3) recalage sur le corps existant ; 4) mention « educational preview,
  pending medical review » ; 5) capture.
- **Vérification** : `sources:check` + validation anatomiste.
  **Verdict ⚪ bloqué tant que la source n'est pas prouvée.**

---

## Lecture transversale et ordre suggéré

- **Vrais quick wins immédiats** : BENCH-002 et BENCH-017 (déjà conformes → juste le prouver),
  BENCH-003 (audit ARIA), BENCH-016 (déjà partiel). Quatre items sont surtout des **audits avec
  preuve**, pas des développements.
- **Déjà partiels** : BENCH-004 (1 axe sur 3), BENCH-005 (v1 complet, v2 à porter),
  BENCH-011 (tour mono-structure), BENCH-015 (labels projetés mais non ancrés).
- **Risque licence** : BENCH-006/009/010/014/016 réimplémentent des idées 🟢/🟡, sans copie ;
  BENCH-019/020 dépendent de sources externes non encore prouvées.
- **Ordre suggéré** : 002 → 003 → 017 → 016 (audits rapides) puis 001 → 009 → 011
  (fil waypoints) puis 004 → 005 (scène). Les autres restent en attente de validation explicite.
