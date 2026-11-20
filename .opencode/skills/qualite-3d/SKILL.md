---
name: qualite-3d
description: Audit et correction de la qualité des maillages 3D de l'atlas CORPS — taxonomie des défauts, protocole de capture 8 angles, scorecard S0–S4 et vérification avant/après.
---

# Qualité 3D — atlas CORPS

Utiliser dès qu'une tâche porte sur la géométrie v2, la revue visuelle ou la todolist
`docs/analyses/revue-visuelle/`.

## Taxonomie unique

- `geometrie` : trou, bord déchiré, facette, éclairage/envers, détail manquant.
- `assemblage` : couture, fente, chevauchement, pièce flottante, agrégat sous un id singulier.
- `cadrage` : débordement, marge excessive, sujet trop petit.
- `lisibilite` : contraste, transparence, occlusion.
- `materiau` : aspect plastique, spéculaire, couleur tissue.
- `anatomie_a_valider` : question pour un anatomiste, jamais une affirmation.

Sévérité : `bloquant` / `majeur` / `mineur`. Confiance : `elevee` / `moyenne` / `faible`.

## Règles non négociables

1. Aucune correction sans paire **avant/après** et verdict dans
   `docs/analyses/revue-visuelle/todolist-fait-a-verifier.{md,json}`.
2. Aucune géométrie inventée : un trou sans source est documenté, pas comblé.
3. Le harnais lève `controls.minDistance` pendant la capture (artefact connu), pas dans l'app.
4. Les signalements anatomiques restent des questions.
5. Un agent ne touche jamais `public/models/v2` : il modifie le pipeline ou un patch de données ;
   le jeu est régénéré ou post-traité par l'orchestrateur.

## Commandes

```bash
npm run sources:check              # provenance avant tout rebuild
npm run audit:3d && npm run audit:3d:check
npm run scorecard:3d
npm run captures:revue              # 16 320 captures déterministes
npm run revue:consolide            # todolist.md/json
npm run revue:verifie              # comparaison avant/après + IoU
npm run revue:db build              # base SQLite hors dépôt
npm run test:visuel                # test de régression perceptuelle
node scripts/worktree-wave.mjs create <noms>
```

## Seuils

- Cadrage : au moins un angle avec > 2 % de pixels changés (skill `screenshot-regression`).
- Micro-composante : 0,1 % suffit (suppression de quelques milliers de pixels).
- Audit : aucune régression de la baseline structure par structure.
- Tests : `npm test`, 35/35 3D, 19/19 a11y, 52/52 groupes.
- CI GitHub : voir la skill `github-ci-scope` (scope `workflow`, commande `/ci-scope`).

## Références

- Consignes des relecteurs : `/home/tasour/.cache/revue-visuelle/CONSIGNES.md`
- Bilan des vagues : `docs/analyses/revue-visuelle/vagues/`
- Provenance : `docs/SOURCES-3D.md`
