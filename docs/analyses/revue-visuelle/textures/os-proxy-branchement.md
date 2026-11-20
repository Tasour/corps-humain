# Branchement expérimental du proxy os — 20 novembre 2026

**Verdict : modification visible et vérifiée, mais non activée par défaut.**

## Correctif

- `src/v2-engine.js` : `loadTissueTextures()` charge `albedo.jpg`, `normal.jpg` et
  `roughness.jpg` depuis `public/textures/<proxy>/` quand `window.__V2_TEXTURE_PROXY` est
  défini, avec `colorSpace = SRGB` pour l'albédo, répétition 5×5 et fallback procédural.
- `v2.html` : le paramètre `?tex=os-proxy` active le flag (validation `^[a-z0-9-]{1,40}$`).
  Sans paramètre, le rendu reste exactement celui d'avant.
- `scripts/captures-revue-visuelle.mjs` : `REVUE_QUERY` permet de capturer avec un query string.

## Preuve visuelle

3 structures osseuses × 8 angles, avant (`qualite-3d-apres`) et après (`apres-texture`) :

| Structure | Δ pixels max | Δ pixels moyen |
|---|---:|---:|
| `bone:femur-l` | 14,19 % | 7,44 % |
| `bone:mandible` | 23,00 % | 15,13 % |
| `bone:patella-r` | 40,11 % | 22,02 % |

Tous les angles dépassent le seuil de 2 % de la skill `screenshot-regression`. La plaque
`os-proxy-avant-apres.jpg` montre face et dos des trois structures.

## Vérifications

- Aucune géométrie modifiée : audit, scorecard et baseline inchangés.
- `npm test` vert · 35/35 tests 3D · 19/19 a11y · 52/52 groupes 3D.
- Flag désactivé par défaut : les tests et l'application normale ne voient aucun changement.

## Limite

Ce proxy est un plâtre argileux CC0, pas une texture osseuse anatomique. Il valide la chaîne
`texture CC0 → assemblage → moteur → preuve visuelle`. Avant activation publique, il faut
choisir une source plus adaptée et faire valider l'aspect par un anatomiste.
