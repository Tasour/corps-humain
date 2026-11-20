# Benchmark concurrentiel — atlas CORPS

**Date : 20 novembre 2026 · Skill : `benchmark-concurrentiel` (mode complet)**

## 0. Cible et requêtes

**Cible retenue** : CORPS — atlas anatomique 3D web, français natif, 2 009 structures,
Three.js + Vite, PWA hors ligne sur GitHub Pages, explorateur hiérarchique, 43 groupes animés,
waypoints, chasse aux organes, méthodologie qualité chiffrée, finalité pédagogique **sans
prétention diagnostique**.

Requêtes utilisées (FR + EN) :
`atlas anatomie 3D interactive explorateur corps humain open source web` ·
`3D anatomy atlas interactive viewer open source GitHub three.js human body` ·
`alternative Visible Body Complete Anatomy Kenhub AnatomyZone 3D anatomy atlas web app` ·
`open source anatomy viewer Z-Anatomy BodyParts3D OpenAnatomy web 3D alternatives`.

**Périmètre** : ~20 candidats découverts, **12 analysés** (ceux qui recouvraient le plus la
cible). Ce n'est **pas** un scan exhaustif. Les produits fermés sont étudiés uniquement sur
leur surface publique (site Marketing, FAQ, docs) — aucun accès au produit, aucun contournement.

## 1. Tableau des candidats (12 analysés)

| Candidat | URL | Ouvert | Licence prouvée | Stack | Chiffres déclarés | Verdict |
|---|---|---|---|---|---|---|
| ashemag/human-atlas | github.com/ashemag/human-atlas | ✅ | code MIT, données CC BY 4.0 | React + Three.js + Vite | 2 234 meshes, 15 systèmes, 3 432 concepts, ~33 Mo | 🟢 |
| ImliStack/Body-Atlas-3D | github.com/ImliStack/Body-Atlas-3D | ⚠️ | code **inconnu** ; données CC BY 4.0 / OrganUI 🟡 | R3F + BVH + Vite, PWA | 2 234 structures, 14 deep-dives, ~31 Mo, ~14 draw calls | 🔴 code / 🟡 organes |
| wangzh12023/human-atlas-3d | github.com/wangzh12023/human-atlas-3d | ✅ | code MIT, données CC BY 4.0 | JS natif + Three.js + GLSL | 2 298 structures, 28 gros plans, 15,3 MiB | 🟢 |
| Opening-Science/open-twin-xr | github.com/Opening-Science/open-twin-xr | ✅ | code MIT, assets CC BY-SA ; bundle **non-commercial de fait** | TS + R3F + WebXR | 7 atlas, 5 donneurs, couverture ontology générée | 🟡 |
| MervinR07/open-anatomy-3d | github.com/MervinR07/open-anatomy-3d | ✅ | code MIT, modèles CC BY 4.0 | glTF + React, npm | 147 structures, ~1 M tris/corps, 7,6/8,1 Mo | 🟢 |
| nqwrc/3d-anatomy | github.com/nqwrc/3d-anatomy | ✅ | **CC BY-NC-SA 4.0** sur tout, 2 composants sans licence | JS + Three.js + Draco | 2 827 structures, 7 systèmes, ~21 Mo | 🔴 |
| Cogni Anatomy | cogni.cards/anatomy | ❌ (viewer) | données CC BY 4.0 / CC BY-SA / MIT | SPA + viewer Vite | 2 831 pièces, 81 vues, 3 987 269 tris | 🟡 données / 🟢 inspiration |
| Complete Anatomy | elsevier.com/products/complete-anatomy | ❌ | propriétaire, non publiée | non visible | 30 modèles microscopiques, 45 coupes cerveau | 🔴 |
| LearnAnatomy3D | learnanatomy3d.com | ❌ | données CC BY / CC BY-SA, code propriétaire | Next.js + Tailwind | ~2 900/corps, 350+ pages, 182 maladies, 15 langues | 🟡 données / 🟢 inspiration |
| Layered Body Atlas | bodyatlas.github.io | ✅ dépôt | **inconnue** | JS natif + Three.js r160 via CDN | 1 285 annoncées / 849 pages indexées | 🔴 |
| JINTAI 3D | jintai3d.com/en | ❌ | données CC BY 4.0 + CC BY-SA 4.0, textes/design réservés | non documentée | 2 234 meshes, 3 432 concepts, 3 582 pages Book | 🟡 données / 🔴 code |
| SirwanAfifi/anatomy-atlas | github.com/SirwanAfifi/anatomy-atlas | ✅ dépôt | code **inconnu**, modèle CC BY-SA 4.0, photos Unlicense | Three.js + Vite + Playwright | 126 structures, 18 groupes, 2 246 073 tris | 🔴 code / 🟡 modèle |

Scores pondérés (similarité 30 %, recouvrement 30 %, stack 15 %, maturité 15 %, différenciation
10 %) : ImliStack **4,60** · Cogni **4,60** · LearnAnatomy3D **4,55** · ashemag **4,35** ·
nqwrc **4,20** · Complete Anatomy **4,15** · wangzh **4,15** · JINTAI **4,10** · open-twin-xr
**3,80** · Layered **3,30** · MervinR07 **2,95** · SirwanAfifi **2,80**. Les poids n'ont pas été
modifiés : la contrainte « hors ligne / French-first » est traitée dans la matrice des gaps.

## 2. Matrice des gaps — chez eux / chez nous

| Fonctionnalité | Meilleur candidat | Chez eux | Chez CORPS | Écart |
|---|---|---|---|---|
| Français natif | Cogni, Learn (traduit) | partiel, souvent automatique | **oui, natif** | ✅ avantage |
| PWA hors ligne prouvée | ImliStack (code 🔴) | oui | **oui, GitHub Pages + SW** | ✅ avantage à documenter |
| Méthodologie qualité chiffrée | open-twin-xr (lint généré) | partiel | **oui (8 portes, baseline CI)** | ✅ avantage |
| Explorateur hiérarchique | ImliStack, nqwrc | oui | oui (arbre FR) | ≈ |
| Groupes animés (43) | Cogni (explode 2 temps) | partiel | **oui** | ✅ avantage |
| Waypoints / visites guidées | LearnAnatomy3D | tours guidés | waypoints seuls | ❌ manque |
| Quiz multi-modes | JINTAI (6), Learn (3) | oui | chasse aux organes seule | ❌ manque |
| Coupes frontales/sagittales | Cogni, Layered, Learn | oui | seulement en capture (genou) | ❌ manque |
| Deep links vers vues | Cogni, Complete, Layered | oui | non | ❌ manque |
| Pages statiques indexables | Layered, ImliStack (plugin) | oui | non | ❌ manque |
| Comparaison M/F | ImliStack, Learn, wangzh | oui | non | ❌ manque (arbitrer) |
| Traçabilité licence par asset | ashemag, JINTAI, Cogni | oui | `SOURCES-3D.md` + empreintes | ≈ |
| Lint des affirmations médicales | open-twin-xr (`lint:claims`) | oui | non | ❌ manque |
| Zéro CDN / zéro analytics | SirwanAfifi (requêtes locales testées) | oui | oui (hors polices ? à vérifier) | ⚠️ à confirmer |

## 3. Idées priorisées

`priorité = impact × (6 − effort)`, impact et effort notés 1–5. Quick win = impact ≥ 4 et effort ≤ 2.

| # | Idée (source) | Impact | Effort | Priorité |
|---:|---|---:|---:|---:|
| 1 | Deep links vers waypoints/vues (Cogni, Layered) | 5 | 1 | **25** |
| 2 | Polices inline, zéro CDN/analytics (SirwanAfifi, Learn) | 5 | 1 | **25** |
| 3 | `radiogroup`/onglets au lieu d'`aria-pressed` sur modes exclusifs (Learn anti-pattern) | 5 | 1 | **25** |
| 4 | Coupes clipping planes 3 axes (Cogni, Learn) | 5 | 2 | **20** |
| 5 | Curseur explode réutilisant les 43 groupes (Cogni, ImliStack) | 5 | 2 | **20** |
| 6 | Fiche de vérité par structure : source, licence, limite (ashemag, Learn) | 5 | 2 | **20** |
| 7 | Lint CI des claims médicaux `lint:claims` (open-twin-xr) | 5 | 2 | **20** |
| 8 | Identifiant stable indépendant du nom exporté (nqwrc `za_name`) | 5 | 2 | **20** |
| 9 | Catalogue de vues prêtes branché sur waypoints (Cogni 81 vues) | 4 | 2 | 16 |
| 10 | Registre licences machine-readable + attribution in-app (open-twin-xr) | 4 | 2 | 16 |
| 11 | Tours guidés enchaînant les waypoints (Learn) | 5 | 3 | 15 |
| 12 | `check` modèle livré + licences (SirwanAfifi) | 5 | 3 | 15 |
| 13 | Quiz multi-modes sur la chasse (JINTAI 6 modes, Learn 3) | 4 | 3 | 12 |
| 14 | Pages statiques par structure + sitemap (Layered, ImliStack) | 4 | 3 | 12 |
| 15 | Étiquettes ancrées sur la surface + leader lines (JINTAI, ImliStack) | 4 | 3 | 12 |
| 16 | Rendu sale (dirty flag) hors animations (ashemag) | 4 | 3 | 12 |
| 17 | DPR ≤ 2 et rendu adaptatif restauré (SirwanAfifi) | 4 | 3 | 12 |
| 18 | Identity par vertex un seul draw call (open-twin-xr) | 4 | 4 | 8 |
| 19 | Comparaison M/F côte à côte (ImliStack, Learn) | 3 | 5 | 3 |
| 20 | Dermatomes 3D / coupes gyri (JINTAI, Complete) | 3 | 5 | 3 |

## 4. Directions d'amélioration

- **UX** : deep links, coupes, catalogue de vues, tours guidés, quiz multi-modes, étiquettes ancrées.
- **Performance** : dirty flag, DPR plafonné, identity GPU, chunks + BVH, rendu adaptatif.
- **Architecture** : identifiant stable, `check` modèle/licences, catalogue typé vérifié, pages statiques générées, SW network-first/cache-first.
- **Accessibilité** : corriger le pattern exclusif `aria-pressed`, garder le clavier-first et le fallback sans WebGL.
- **Distribution** : polices inline, zéro analytics, schémas `WebApplication`, sitemap, attribution visible.

## 5. Anti-patterns observés — à ne pas reproduire

- `aria-pressed` sur des modes mutuellement exclusifs (LearnAnatomy3D) → utiliser `radiogroup`/onglets.
- Polices Google,analytics et publicité dans un atlas « gratuit » (Learn, Cogni) → casse l'offline.
- Traductions automatiques non relues médicalement (Learn DE/ES/PT, Cogni) → CORPS reste FR-native.
- Compteurs de couverture écrits à la main puis faux (open-twin-xr l'admet) → générer depuis les assets.
- Licence du code absente alors que les données sont ouvertes (ImliStack, SirwanAfifi, Layered) → séparer code MIT et données CC.
- Encyclopédie de pathologies liée aux organes (Learn) → tension directe avec « sans prétention diagnostique ».
- LMS/analytics serveur et contenu vidéo payant (Elsevier, Visible Body) → hors architecture statique.

## 6. Verdicts licence et appropriation

| Verdict | Candidats | Action autorisée |
|---|---|---|
| 🟢 Permissif prouvé | ashemag/human-atlas (MIT + CC BY 4.0), wangzh12023 (MIT + CC BY 4.0), MervinR07 (MIT + CC BY 4.0) | Réutilisation code/données **avec attribution** ; générer `LICENSES.md` et le bloc ci-dessous |
| 🟡 Copyleft / données | open-twin-xr (MIT code, assets CC BY-SA + non-commercial de fait), Cogni/Learn/JINTAI (données CC BY-SA), ImliStack organes, SirwanAfifi modèle | **Arrêt et validation humaine** avant tout prélèvement de géométrie |
| 🔴 Fermé ou incertain | Complete Anatomy, ImliStack code, nqwrc (CC BY-NC-SA + 2 sans licence), Layered, SirwanAfifi code | **Aucune copie** ; inspiration fonctionnelle et réimplémentation originale |
| ⚪ Non vérifié | — | Verdict bloqué tant que la preuve n'est pas rapportée |

Aucun code n'a été copié dans CORPS lors de ce benchmark. Si l'un des 🟢 est réutilisé plus tard :

```html
<!-- Code adapté de <nom> (<URL>), licence <LICENCE>, © <auteurs>.
     Voir LICENSES.md à la racine du projet. -->
```

Entrée `LICENSES.md` à créer alors : composant, URL exacte, licence, auteurs, date de
consultation, fichiers concernés, nature de l'adaptation.

## 7. Sources datées

Toutes les pages ont été consultées le **20 novembre 2026** via `webfetch`, en lecture seule.
URLs principales : voir le tableau §1. Recherches complémentaires : Medscape « 8 interactive
anatomy apps » (2025-05-21), Humanome comparisons (2026-10-13), Poly Haven/ambientCG licences
pour la piste textures (déjà documentée dans `~/.opencode/skills/textures-web`).

## 8. Limites du scan

- ~20 candidats découverts, 12 analysés ; shortlist non exhaustive.
- Les chiffres sont ceux déclarés par les projets ; ils n'ont pas été re-mesurés.
- Pour les produits fermés, seule la surface publique a été lue ; stack et chiffres internes
  sont « non vérifié ».
- Aucune mesure de performance comparable n'a été produite (pas de benchmark d'exécution).
- Ce rapport ne modifie aucun code applicatif. Toute idée 🟢 nécessite une validation explicite
  et une session d'implémentation ultérieure.
