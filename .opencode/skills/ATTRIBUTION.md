# Skills importés — attribution (corps-humain)

Récupérés le 2026-11-21 depuis le catalogue **opencodeskills.dev** (licence MIT déclarée dans le
frontmatter de chaque `SKILL.md`). Copie locale, zéro requête réseau au chargement dans OpenCode.

| Skill local | Source | Licence |
|---|---|---|
| `threejs` | https://opencodeskills.dev/catalog/threejs/SKILL.md | MIT |
| `performance-profiling` | https://opencodeskills.dev/catalog/performance-profiling/SKILL.md | MIT |
| `accessibility-testing` | https://opencodeskills.dev/catalog/accessibility-testing/SKILL.md | MIT |

Ces trois skills ne recouvrent pas les skills locaux existants (`anatomie-web`, `qualite-3d`,
`textures-web`, `validation-anatomique`, `github-ci-scope`) : ils couvrent l'API Three.js, le
profilage et les tests WCAG 2.2 AA / axe-core.

Outils externes liés, installés dans la configuration OpenCode globale (pas dans ce dépôt) :

| Outil | Source | Licence | État |
|---|---|---|---|
| `threejs-devtools-mcp` 0.5.0 | github.com/DmitriyGolub/threejs-devtools-mcp | MIT | chargé (69 outils) ; pont navigateur à connecter manuellement |
| `mcp-for-blender` | github.com/ahujasid/mcp-for-blender | MIT | chargé (10 outils) ; add-on installé pour Blender 3.6 et 5.0, serveur à démarrer dans l'UI |
| `EL4CTEO/blender-skills` (28 skills) | github.com/EL4CTEO/blender-skills | MIT | **non installé** : exige Blender 5.2 LTS+ (machine : 3.6.23) |

Pour vérifier : `npm test && npm run test:a11y && npm run audit:3d:check && npm run build`.
