---
name: GitHub CI — scope workflow
description: Vérifier et obtenir le scope GitHub `workflow` nécessaire pour pousser un fichier .github/workflows/* sur le dépôt corps-humain.
---

# GitHub CI — autorisation `workflow`

Utiliser avant tout commit/push qui touche `.github/workflows/`, ou quand un push est refusé
avec « refusing to allow an OAuth App to create or update workflow files without `workflow` scope ».

## État connu

- Compte GitHub local : **Tasour** (`gh auth status`).
- Protocole : `https`.
- Scopes observés avant correction : `gist`, `read:org`, `repo`.
- Scope requis pour les workflows : **`workflow`**.
- Le token OAuth local (`gho_…`) ne doit **jamais** être copié dans un fichier, un skill,
  un rapport ou un message. Le code device ci-dessous est éphémère et change à chaque appel.

## Vérification

```sh
gh auth status | grep 'Token scopes'
```

Si `workflow` est absent, lancer :

```sh
gh auth refresh -h github.com -s workflow
```

La CLI affiche un code à usage unique et l'URL `https://github.com/login/device`.
Demander à l'utilisateur de saisir ce code dans un navigateur, **sans le mémoriser**.
Le code n'est valable que quelques minutes ; en générer un nouveau si nécessaire.

## Après validation

1. `gh auth status | grep 'Token scopes'` doit contenir `workflow`.
2. Réintégrer `.github/workflows/qualite-3d.yml` si absent.
3. `git status --porcelain`, `git diff --check`, puis commit `ci(...)`.
4. `git push origin main`.
5. Vérifier le workflow dans l'onglet Actions du dépôt `Tasour/corps-humain`.

## Repli

Sans ce scope, les portes sont exécutées localement (`npm run audit:3d:check`, `npm test`,
`npm run test:v2`, `npm run test:a11y`, `npm run test:groupes3d`, `npm run test:visuel`) et
le fichier de workflow reste hors du dépôt. Ce n'est pas un blocage fonctionnel.

Référence : `docs/analyses/revue-visuelle/ENVIRONNEMENT.md`.
