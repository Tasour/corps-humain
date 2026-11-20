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

## Repli SSH

Quand le token OAuth manque du scope `workflow` et que le refresh device est indésirable,
un **push SSH explicite** contourne la restriction sans stocker de secret :

```sh
ssh -T git@github.com                                   # vérifie « Hi Tasour! »
git push git@github.com:Tasour/corps-humain.git main
```

GitHub n'applique la règle de scope `workflow` qu'aux pushes authentifiés par token OAuth
(HTTPS). Une clé SSH déjà enregistrée sur le compte n'a pas ce scope : le push du fichier
`.github/workflows/*` est donc accepté. Aucun PAT supplémentaire n'est créé, aucun token ni
code n'est écrit dans le dépôt : le token OAuth reste dans le keyring, inchangé. Le remote
HTTPS `origin` n'est **pas** modifié — seul le push explicite par URL SSH est utilisé.

Vérification après push :

```sh
git ls-remote git@github.com:Tasour/corps-humain.git refs/heads/main
gh api repos/Tasour/corps-humain/actions/workflows --jq '.workflows[].name'
```

Sans ce repli, les portes restent exécutables localement (`npm run audit:3d:check`, `npm test`,
`npm run test:v2`, `npm run test:a11y`, `npm run test:groupes3d`, `npm run test:visuel`).

Référence : `docs/analyses/revue-visuelle/ENVIRONNEMENT.md`.
