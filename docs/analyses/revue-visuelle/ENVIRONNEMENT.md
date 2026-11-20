# Environnement de travail — revue visuelle et qualité 3D

Ce document décrit les outils mis en place avant de poursuivre les vagues de correction.

## Sources figées

- `docs/SOURCES-3D.md` : provenance, licences, emplacement persistant.
- `docs/analyses/sources-checksums.json` : SHA-256 de 21 fichiers source.
- `npm run sources:check` doit passer avant tout rebuild.
- Sources BP3D : `/home/tasour/.cache/corps-sources/human-atlas/public/models`
  (clone de `ashemag/human-atlas`, commit enregistré dans le fichier d'empreintes).
- Sources Z-Anatomy : `zanatomy-export/` dans le dépôt.

## Suivi de la todolist

- `npm run revue:consolide` régénère `todolist.{md,json}` depuis les revues de lots.
- `npm run revue:db build` importe la todolist et la liste « fait mais à vérifier »
  dans `/home/tasour/.cache/revue-visuelle/revue.sqlite`.
- Exemples (le `--` est nécessaire pour transmettre les arguments à npm) :
  - `npm run revue:db -- query --count`
  - `npm run revue:db -- query --statut a_faire --severite bloquant --limit 20`
  - `npm run revue:db -- query --subject temporal-pole`

## Vérification visuelle

- `npm run test:visuel` compare les paires avant/après avec l'outil perceptuel de la skill
  `screenshot-regression` (seuil 2 % pour le cadrage, 0,1 % pour les micro-composantes).
- Résultat : `docs/analyses/revue-visuelle/visuel-regression.json`.
- Skill dédiée : `.opencode/skills/qualite-3d/SKILL.md` (taxonomie, règles, commandes, seuils).
- Captures : `/home/tasour/.cache/revue-visuelle/qualite-3d/` (avant vague 0),
  `qualite-3d-apres/` (après vague 0), `apres-vague2/` (micro-composantes).

## Orchestration des agents

- `node scripts/worktree-wave.mjs create <nom1>,<nom2>` crée des worktrees isolées.
- `node scripts/worktree-wave.mjs list` / `remove <préfixe>`.
- Fusion centralisée par cherry-pick, puis un seul rebuild/post-traitement par vague.

## Plugins OpenCode

Deux plugins serveur locaux, chargés automatiquement depuis `.opencode/plugins/` et
déclarés dans `.opencode/opencode.json` :

- `corps-quality` (`id: corps.quality`) : outils `corps_todo_query`, `corps_todo_mark`,
  `corps_capture_pair`, `corps_visual_diff`, `corps_sources_check`, `corps_audit` ; commandes
  `/etat-revue`, `/revue-vague`, `/verifier-sujet` ; hook `context` injectant les compteurs
  courants (désactivable avec `injectStatus: false`).
- `corps-worktrees` (`id: corps.worktrees`) : stratégie Git enregistrée via
  `ctx.worktree.transform`, remplace l'outil intégré défaillant.

`@opencode/plugin` est en devDependency. Les plugins sont rechargés par `/reload` sans
redémarrage du service ; les outils `corps_*` apparaissent dans le catalogue Code Mode au
démarrage d'une nouvelle session. Vérification : logs `~/.local/share/opencode/log/opencode.log`
filtrés sur `corps.quality` / `corps.worktrees`.

## Portes

- Locale : `npm run sources:check`, `npm run audit:3d:check`, `npm test`,
  `npm run test:v2`, `npm run test:a11y`, `npm run test:groupes3d`, `npm run test:visuel`.
- CI : un workflow avait été préparé mais **retiré** — le token OAuth local n'a pas le
  `workflow` scope requis par GitHub pour pousser `.github/workflows/*`. Les portes sont donc
  exécutées localement (`sources:check`, `audit:3d:check`, suites de tests, `test:visuel`).
  Pour réactiver la CI il faut soit un PAT avec scope `workflow`, soit pousser le fichier
  via un compte/token autorisé.

## Limites

- Les 16 320 JPEG et les 119 Mo de modèles ne sont pas versionnés ; ils doivent être
  régénérés ou restaurés depuis les caches après un nettoyage de session.
- Les verdicts automatiques sont des filtres ; les relectures indépendantes font foi.
