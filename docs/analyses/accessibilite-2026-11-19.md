# Accessibilité et responsive — atlas CORPS v2

Date : 19 novembre 2026 · Mis à jour le 20 novembre 2026 (BENCH-003) ·
Page : `/v2.html` · Preuve : `npm run test:a11y` → **22/22**,
`npm run test:v2` → **30/30**. Captures : `docs/analyses/a11y/`.

Ce document ne décrit pas des intentions mais des mesures : les contrastes sont calculés
sur les couleurs rendues, les cibles tactiles mesurées en pixels dans un viewport de
390 × 844, et la navigation clavier exercée sur le canvas.

## 1. Contrastes (WCAG 2.1 AA, seuil 4,5:1)

| Élément | Avant | Après | Mesure après |
|---|---|---|---|
| Texte secondaire `--muted` sur papier | `#6f7f88` · 3,75:1 | `#5f6f78` | **4,71:1** |
| Texte secondaire sur panneau | `#6f7f88` · 4,08:1 | `#5f6f78` | **5,13:1** |
| Compteurs de liste (`.item small`) | `#9aa7ad` · 2,43:1 | `#5f6f78` | **5,13:1** |
| En-têtes de groupe (`.group`) | `#9aa7ad` · 2,43:1 | `#5f6f78` | **5,13:1** |
| HUD de performance (`.perf`) | `#8b979e` · 2,71:1 | `--muted` | **4,71:1** |
| Compteurs de l'arbre (`.tree-count`) | `#9aa7ad` · 2,43:1 | `--small` | **5,13:1** |

Le thème sombre était déjà conforme (6,24 à 13,25:1) : aucune modification.

## 2. Structure et sémantique

- Un seul `<main>` ; `<aside>` explorateur et `<aside>` détails nommés par `aria-label`.
- Fil d'Ariane dans `<nav aria-label="Fil d'Ariane">`, page courante en `aria-current="page"`.
- Titres de sections en `<h2>` (avant : des `<div>`).
- Lien d'évitement « Aller à la vue 3D » visible au focus, cible `main[tabindex="-1"]`.
- Canvas : `tabindex="0"`, `role="application"`, `aria-label`, `aria-describedby` vers une
  aide clavier en `.sr-only`.
- Chargement en `role="status" aria-live="polite" aria-busy`, remis à `false` à la fin.
- Aucun bouton visible sans nom accessible (vérifié sur la page entière).

## 3. États et annonces

| Contrôle | Attribut | Vérification |
|---|---|---|
| Couches Peau/Os/Muscles/Organes | `aria-pressed` | suit la classe `active` avant et après clic |
| Item de la liste | `role="radio"` + `aria-checked` | un seul item coché, `tabindex` mobile, flèches, remis à `false` à `Échap` |
| Tour du monde | `aria-pressed` | reflète l'état de rotation |
| Tiroir mobile | `aria-expanded` + `aria-controls` | `false` → `true` → `false` |
| Nœuds de l'arbre | `aria-expanded` | présent sur les nœuds qui descendent d'un niveau |
| Sélection | région `role="status" aria-live="polite"` | annonce « X sélectionné » |
| Waypoints | `role="status" aria-live="polite"` | annonce le titre et le texte |

## 4. Navigation clavier

| Touche | Effet |
|---|---|
| `Tab` / `Maj+Tab` | parcourt le lien d'évitement, l'en-tête, l'explorateur, le canvas, les animations, la fiche |
| `←` / `→` | orbite de 6° autour du corps |
| `↑` / `↓` | incline la caméra de 6° (polaire borné) |
| `+` / `-` | zoom avant / arrière |
| `Entrée` / `Espace` | sélectionne la structure au centre de la vue (raycast) |
| `Échap` | ferme le tiroir mobile, sinon efface la sélection, sinon vide la recherche |
| `/` | place le focus dans la recherche |
| `Début` (`Home`) | recadre la vue |

Le focus est rendu visible par `:focus-visible` (contour 2 px, décalage 2 px, couleur
`--focus`, `#7ee7c7` en thème sombre). Mesuré : contour 2 px sur le premier bouton atteint
par `Tab`.

## 5. Responsive et tactile

- **Fiche mobile** : elle n'est plus `display:none`. C'est une feuille inférieure
  (max 46 vh, défilement interne) ouverte à la sélection, avec bouton de fermeture 44 × 44.
  Hors sélection, elle est `inert` et `aria-hidden="true"`.
- **Tiroir** : voile cliquable, `Échap` le ferme, le focus revient sur « Explorer ».
- **Cibles** : 44 px minimum sur pointeur grossier pour l'en-tête, les couches, la liste,
  l'arbre, les raccourcis, les groupes et les animations (mesuré).
- **Débordement** : `scrollWidth ≤ innerWidth` à 390 px.
- **Barre d'animations** : défilement horizontal sur une ligne au lieu d'un empilement qui
  recouvrait le corps.
- **Groupes anatomiques** : section repliable (`<details>`) avec compteur ; elle s'ouvre
  au clavier (`Entrée` sur le résumé), ses 43 pastilles mesurent 44 px et son ouverture
  ne pousse plus la liste des structures hors de l'écran.
- **Fiche** : les valeurs longues (nom latin) reviennent à la ligne au lieu d'être coupées.

## 6. Mouvement réduit

Sous `prefers-reduced-motion: reduce` : transitions neutralisées (durée < 0,02 s mesurée),
interpolations de caméra instantanées, rotation continue désactivée avec annonce
« Rotation continue désactivée par la préférence système ». Les animations demandées
explicitement (battement, respiration) restent disponibles : elles sont déclenchées par
l'utilisateur, pas automatiques.

## 7. Limites connues

- L'audit est ciblé (contrastes, noms, focus, clavier, mobile) et **ne remplace pas** un
  passage axe-core ou NVDA/VoiceOver sur matériel réel.
- `role="application"` sur le canvas est volontaire (les flèches doivent piloter la vue) ;
  il faut vérifier sur VoiceOver que la sortie du mode application reste possible.
- Le HUD de performance est masqué aux lecteurs d'écran (`aria-hidden`) mais reste visible.
- Les waypoints 3D ne sont pas atteignables au clavier individuellement : `Entrée` donne
  accès à la structure, pas à chaque point d'intérêt.

## 8. Amendement du 20 novembre 2026 — choix exclusifs (BENCH-003)

Le benchmark concurrentiel signalait l'anti-pattern `aria-pressed` sur des modes mutuellement
exclusifs (observé chez LearnAnatomy3D). L'audit du code CORPS nuance le constat : les boutons
`[data-cat]` de v2 sont de **vraies bascules indépendantes** (plusieurs calques peuvent être
visibles en même temps), donc `aria-pressed` y est correct et a été conservé, de même que le
thème, l'explode, la coupe, l'isolement, la comparaison, la chasse et le tour.

Deux choix réellement exclusifs ont été corrigés :

| Contrôle | Avant | Après |
|---|---|---|
| Filtre de type v1 (`#kind-filter`) | `.seg.active` seule, aucun attribut ARIA | `role="radiogroup"`, `role="radio"`, `aria-checked`, `tabindex` mobile, flèches `← → ↑ ↓`, `Début`, `Fin` |
| Sélection de structure v2 (`#list`) | `aria-pressed` sur chaque item | `role="radiogroup"` sur le conteneur, `role="radio"` + `aria-checked` sur les items, `tabindex` mobile, flèches `↑ ↓`, `Début`, `Fin` |

Preuve : `npm run test:a11y` passe de **19/19 à 21/21** (deux nouveaux cas : un seul coché par
groupe et navigation par flèches, sur v1 et v2). Suite complète verte : `npm test`,
`npm run test:v2` (30/30), `npm run test:groupes3d` (52/52), `npm run test:a11y` (21/21),
`npm run test:reseau` (0 requête externe). Aucune capture visuelle n'était nécessaire : le
changement est purement sémantique et n'altère pas le rendu.
