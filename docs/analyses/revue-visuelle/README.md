# Revue visuelle exhaustive — atlas CORPS

**Statut : revue terminée le 20 novembre 2026. Aucune correction appliquée.**

## Périmètre

- **2 040 structures × 8 angles = 16 320 captures JPEG**, protocole déterministe
  (1024 × 1024, fond `#1b1f24`, ombres et sol masqués, LOD `high`, 8 directions canoniques,
  cadrage sur les 8 coins de la boîte, SHA-256 par image).
- Images stockées **hors dépôt** : `/home/tasour/.cache/revue-visuelle/qualite-3d/<id>/<angle>.jpg`
  (environ 371 Mo). Elles ne sont pas versionnées.
- Revue par **204 lots de 10 structures**, chacun relu par un sous-agent avec une grille
  unique (géométrie, assemblage, cadrage, lisibilité, matériau, anatomie à valider).
- Observations brutes : 21 546 → **17 205 entrées dédupliquées** dans `todolist.json`.

## Fichiers

- `todolist.md` — liste lisible, triée par sévérité puis par structure (état initial).
- `todolist-fait-a-verifier.{md,json}` — corrections proposées, paires avant/après et verdicts.
- `todolist-active.{md,json}` — vue de pilotage : 15 454 entrées actives après retrait des
  778 vérifiées et des 991 faux positifs (`npm run revue:active`).
- `vagues/00.md` — bilan de la vague 0 (artefact de cadrage du harnais).
- `vagues/01.md` — bilan de la vague 1 (31 agrégats exclus, 2 009 structures).
- `vagues/02.md` — bilan de la vague 2 (composantes flottantes retirées sur 2 structures).
- `vagues/03-05.md` — état des 16 427 entrées restantes et raisons de non-correction.
- `preuves-anatomie.md` — 12 premières questions prouvées par sources croisées.
- `textures/os-proxy.md` — pilote de texture CC0 (asset produit).
- `textures/os-proxy-branchement.md` — branchement expérimental `?tex=os-proxy` et preuve avant/après.
- `vagues/03-assemblage.md` — 4 structures à fragments négligeables corrigées, 26 classées non corrigeables.
- `vagues/04-assemblage.md` — lot 2 : 3 muscles corrigés, 27 classés non corrigeables.
- `todolist.json` — machine-readable : `summary` (couverture, compteurs, limites) et
  `entries` (id `VIS-xxxxx`, statut `a_faire`, structure, catégorie, porte G0–G8, sévérité,
  confiance, description, angles, preuves avec chemin absolu).
- Consignes des relecteurs : `/home/tasour/.cache/revue-visuelle/CONSIGNES.md`.

## Limites à connaître avant d'utiliser la liste

1. **Artefact outil** : `controls.minDistance = 0,12 m` dans `v2.html` force la caméra à
   12 cm minimum. Les structures plus petites sont donc capturées trop loin. Les entrées
   « cadrage » sur ces objets sont des **artefacts du harnais**, pas des défauts de
   l'application ; il faut corriger le harnais puis recapturer avant de les traiter.
2. Les signalements `anatomie_a_valider` sont des questions pour un anatomiste, jamais des
   diagnostics. Aucune affirmation de vérité anatomique n'est faite ici.
3. La déduplication regroupe les descriptions proches par structure et catégorie : une
   entrée peut couvrir plusieurs angles, listés dans le champ `angles`.
4. La sévérité est celle du relecteur, avec une échelle calibrée sur les 5 pilotes ; elle
   doit être confirmée avant toute priorisation de correction.

Régénération : `npm run revue:consolide` (lit `reviews/lot-*.json` du cache et réécrit les
deux fichiers ci-dessus). Nouvelles captures : `npm run captures:revue`.
