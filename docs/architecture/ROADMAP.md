# Roadmap — CORPS unifié

Date : 2026-11-21.

| Phase | Contenu | Critère de sortie | Rollback |
|---|---|---|---|
| **P0 — fait** | Fusion pathologies dans v2, mapping 27 cibles, HUD, quiz, build unifié, raccourci unique | `test:pathologies` 6/6, build unifié, une seule fenêtre Omarchy | `classique.html` et backups des configs |
| **P1 — à faire par l'humain** | Signer 16 fiches de revue (`corps_review_sign`) | 5 os / 5 muscles / 5 organes / 1 peau signés | `signoffs.json` restaurable depuis backup |
| **P2 — conditionnel** | Activer `?tex=cc0` par défaut | Gate `test:review` vert avec signatures et relecture anatomiste | Remettre `textureDefault: false` dans `docs/revues/config.json` |

Décisions associées : ADR-0001. Risques : `RISKS.md`.
