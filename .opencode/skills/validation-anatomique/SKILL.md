---
name: Validation anatomique humaine
description: Préparer, pré-valider et faire signer une relecture anatomique humaine des modèles et textures de l'atlas CORPS.
---

# Validation anatomique humaine

Ce skill transforme la dernière étape bloquante (« il faut un anatomiste ») en un artefact
traçable. **Un agent ne signe jamais à la place d'un humain.**

## Matrice minimale

Cinq structures pour `bone`, `muscle` et `organ` ; **une** fiche `skin:body` suffit pour la peau
(c'est un lot unique, pas 2 009 structures). Les identifiants des structures doivent exister dans
`public/models/v2/manifest.json`.

## Protocole

1. Générer la fiche avec l'outil `corps_review_sheet` (8 angles réels, procédural vs `?tex=cc0`).
2. Lancer l'agent `anatomie-pre-validateur` : pré-verdict `confirme|partiel|a_valider`, deux
   sources indépendantes minimum, jamais de modification de fichier.
3. Faire relire la fiche HTML par un anatomiste. Il coche « géométrie » et/ou « texture illustrative »,
   indique son nom, la date et la portée exacte.
4. Enregistrer la signature avec `corps_review_sign` (nom, date, portée obligatoires).
5. Vérifier avec `npm run test:review`.

## Règles non négociables

- Chaque image est légendée « modèle pédagogique », jamais « scan anatomique ».
- Aucune affirmation diagnostique ou clinique (voir `lint:claims`).
- Une structure absente des sources reste absente : aucune géométrie n'est inventée.
- Le drapeau `?tex=cc0` reste désactivé par défaut tant que 5 fiches signées (1 pour la peau) ne
  couvrent pas la case « texture ».
- Toute signature est datée et nominale ; un `a_valider` bloque l'activation.

## Preuves produites

- `docs/revues/<date>/<tissu>-<structure>/fiche.html`, `sheet.json`, 16 PNG.
- `docs/revues/signoffs.json` (signatures nominales).
- `docs/analyses/review-signoffs.json` (rapport du gate).

## Commandes

```bash
npm run review:sheet -- --structure organ:bp-heart --tissue organ
npm run test:review
```
