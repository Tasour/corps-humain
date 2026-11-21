# Refonte de l’interface v2 autour du 3D — 21 novembre 2026

## Objectif
Faire du canvas 3D l’élément central, deux thèmes commutables (sombre v1 / clair), optimisation PC + smartphone.

## Réalisé
- **CSS extrait** : `v2.html` passe de 2 537 à ~2 100 lignes ; ~420 lignes de CSS déplacées dans `src/v2-style.css`.
- **Design system à deux thèmes** : tokens partagés + `[data-theme="dark"|"light"]` sur `<html>`, bascule via le bouton Thème existant, persistance `localStorage` (`corps-theme`), `window.__v2UI.theme` exposé.
- **Cohérence visuelle** : tous les fonds codés en dur des HUD (clairs et sombres) remplacés par les tokens — un seul jeu de couleurs par thème.
- **Dock unifié** : `.anim-bar` devient une barre horizontale compacte en bas, scrollable, une seule rangée, boutons 44 px au toucher, utilisant les tokens.
- **Éclaté** repositionné au-dessus du dock (`bottom: 66px`) pour ne plus le chevaucher.
- **Responsive mobile** : en-tête compact (badges masqués, boutons 40–52 px), hauteur 58 px, drawer/scrim ajustés, `safe-area-inset`, pas de débordement horizontal (`scrollWidth = innerWidth = 390`).
- **Garde-fou moteur** : `geometryFromRecord` refuse les vues TypedArray hors bornes (suppression du `RangeError`), `ensureLod` vérifie les chunks vides, `skinBatch` synthétique quand le socle n’a pas de peau.

## Preuves visuelles
- `desktop-clair.png`, `desktop-sombre.png`, `mobile-clair.png`, `mobile-sombre.png`, `mobile-sombre-v2.png`.
- Thème sombre : fond `#04080f`, accent cyan, HUD cohérents.
- Thème clair : fond crème, HUD cohérents.
- Mobile : canvas plein écran, dock en bas, éclaté au-dessus, zéro débordement.

## Tests
- `test:a11y` : **22/22** vert (après correction cible 44 px).
- `npm test`, `lint:claims`, `build` : verts.
- `test:v2` : 26/35 — 9 échecs restants sont des **assertions figées sur l’ancien modèle** (waypoints « estomac » attachés à un ID supprimé, attente de > 2000 structures visibles, peau absente du socle Z-Anatomy). Adaptation partielle effectuée (`Femur`, seuil dynamique, estomac par source_id) ; le solde nécessite une passe dédiée.

## Limites
- Le dock n’est pas encore un contrôleur `src/v2-ui.js` séparé : la logique reste dans `v2.html` (P2 du plan).
- Les thèmes sont appliqués aux HUD ; la vérification AA automatisée des deux thèmes reste à ajouter à `test:a11y`.
- Jeu de données 1 989 structures et recette `rebuild:verify` inchangés.
