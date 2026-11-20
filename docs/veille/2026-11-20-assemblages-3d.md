# Benchmark — assemblages de modèles 3D humains

**Date : 20 novembre 2026 · Skill : `benchmark-concurrentiel` (mode complet)**

> ⚠️ **Limite méthodologique majeure** : les 3 sous-agents `veilleur-concurrentiel` lancés pour
> l'analyse parallèle ont tous échoué (dépassements de contexte puis timeouts réseau), y compris
> après relance en lots réduits. **Les 12 fiches ci-dessous sont donc `partielles`** : elles
> reposent uniquement sur les extraits de `websearch` consultés le 20/11/2026 et, pour cinq
> candidats, sur l'analyse détaillée du premier benchmark
> ([2026-11-20-corps-benchmark.md](2026-11-20-corps-benchmark.md)). Aucun détail non vérifié
> n'a été inventé ; les champs absents sont notés `non vérifié`.

## 0. Cible et requêtes

**Cible retenue** : l'**assemblage** dans CORPS — fusion de Z-Anatomy (CC BY-SA 4.0) et
BodyParts3D 4.0 (CC BY 4.0 via `ashemag/human-atlas`) en 2 009 structures, avec correspondances
FMA/TA2, exclusions d'agrégats, corrections de composantes, 3 LOD, `source_id` immuable,
checksums sources et rebuild reproductible. Contraintes : web statique, hors ligne, zéro réseau
externe, French-first, aucune prétention diagnostique.

Requêtes utilisées (FR + EN) :
`assemblage modèles 3D anatomie humaine fusion BodyParts3D Z-Anatomy recalage ontologie FMA open source` ·
`open source 3D anatomy atlas merge BodyParts3D Z-Anatomy mesh alignment deduplication pipeline GitHub`.

**Périmètre** : ~15 candidats découverts, **12 shortlistés** sur la similarité d'assemblage.
Ce n'est pas un scan exhaustif.

## 1. Candidats (12)

| Candidat | URL | Ouvert | Licence déclarée | Stack / indice d'activité | Verdict |
|---|---|---|---|---|---|
| authorOd/3d-anatomy-atlas | github.com/authorOd/3d-anatomy-atlas | ✅ | code `non vérifié`, données CC BY-SA | Blender 4.0.2 + glTF Transform + meshoptimizer | 🟢 données / ⚪ code |
| Vayu AI Anatomy | vayuai.ai/writing/vayu-ai-anatomy | ❌ (surface publique) | CC BY-SA 4.0 + 3D Slicer Section B | Blender headless + React/Three + Draco | 🟡 |
| Charleeh/ecorche | github.com/Charleeh/ecorche | ✅ | code MIT, modèle CC BY-SA 4.0 | glTF / meshopt, 1 commit | 🟢 code / 🟡 modèle |
| Opening-Science/open-twin-xr | github.com/Opening-Science/open-twin-xr | ✅ | code MIT, assets CC BY-SA, bundle NC de fait | TS + R3F + WebXR | 🟡 |
| nqwrc/3d-anatomy | github.com/nqwrc/3d-anatomy | ✅ | CC BY-NC-SA 4.0 sur tout | JS + Three + Draco, 21 commits | 🔴 |
| ashemag/human-atlas | github.com/ashemag/human-atlas | ✅ | code MIT, données CC BY 4.0 | React + Three + Vite | 🟢 |
| ImliStack/Body-Atlas-3D | github.com/ImliStack/Body-Atlas-3D | ✅ dépôt | code inconnu, données CC BY / OrganUI CC BY-SA | R3F + BVH, PWA | 🔴 code / 🟡 organes |
| aycibatuhan/nervous-system-atlas | github.com/aycibatuhan/nervous-system-atlas | ✅ | `non vérifié` (jeux restreints) | Python pipeline + manifeste généré | ⚪ |
| JohanBellander/BodyExplorer | github.com/JohanBellander/BodyExplorer | ✅ | code MIT, données CC BY-SA 2.1 JP + 4.0 | Three + Vite, 4 commits | 🟢 code / 🟡 données |
| Open3Dmodel (AnatomyTOOL) | anatomytool.org/open3dmodel-about | ⚠️ éducatif | CC BY-SA déclaré | retopologie Blender, LUMC/UMCU | 🟡 |
| MervinR07/open-anatomy-3d | github.com/MervinR07/open-anatomy-3d | ✅ | code MIT, modèles CC BY 4.0 | glTF + React, npm | 🟢 |
| olivercase/body_parts_3d_api | github.com/olivercase/body_parts_3d_api | ✅ | données CC BY-SA 2.1 JP (site amont), code `non vérifié` | Python + Git LFS + trimesh | 🟡 |

Scores pondérés (similarité 30 %, recouvrement 30 %, stack 15 %, maturité 15 %, différenciation
10 %) : authorOd **4,85** · Vayu **4,55** · ashemag **4,50** · ImliStack **4,40** ·
open-twin-xr **4,25** · nqwrc **4,15** · ecorche **4,10** · nervous-system **3,95** ·
BodyExplorer **3,60** · Open3Dmodel **3,55** · olivercase **3,40** · MervinR07 **3,40**.
Les poids n'ont pas été adaptés : la contrainte « hors ligne » est traitée dans la matrice des gaps.

## 2. Fiches d'analyse (toutes `partielles`)

### authorOd/3d-anatomy-atlas — 🟢 données / ⚪ code
- **Assemblage** : snapshot Z-Anatomy épinglé (commit `e38ea5e6…`, 2026-09-24), SHA-256 de chaque
  entrée et versions d'outils dans `zanatomy.lock.json` ; Blender 4.0.2 **mono-thread** pour
  obtenir des exports byte-identiques (le multithread fait varier le dernier bit des normales).
- **Licences** : registre `licenses.json` avec auteurs, source, `commercialUse` et règles
  `subtreeOf`/`underGroup` ; un asset non autorisé reste dans l'arbre comme **gap déclaré** sans
  géométrie. IDs stables dans `ids.json`, renommages par alias.
- **QA** : intégrité référentielle, checksums, ID ↔ mesh, échelle/orientation, cohérence de licence,
  corrections géométriques aux deux niveaux de qualité.
- **Transférable** : lock + registre de règles + gaps déclarés + IDs aliasés.
- **Lacune** : licence du code non vérifiée ; reproductibilité byte-identique confirmée seulement
  sur la même plateforme (les derniers bits de normales diffèrent entre plateformes).

### Vayu AI Anatomy — 🟡
- **Assemblage** : Z-Anatomy (3 659 structures) + SPL Abdominal Atlas (94 organes CT segmentés) ;
  pipeline Blender headless convertit ~950 courbes (vaisseaux/nerfs) en triangles, reconstruit la
  hiérarchie TA2 depuis les chaînes de parenté, exporte un glTF Draco par système ; transformée
  affine aligne l'espace CT sur Z-Anatomy ; un script Node dédupie, préfère SPL en cas de chevauchement,
  supprime les paquets mal alignés et émet le manifeste. `npm run pipeline` unique et re-jouable.
- **Chiffres** : 3 753 structures, 13 systèmes, 31 Mo compressés, 6 Mo pour le squelette, ~300 Ko
  de JS, < 3 s au premier rendu interactif (déclaré, non re-mesuré).
- **Transférable** : déduplication inter-sources avec règle de préférence ; manifeste régénéré ;
  chunk par système ; reconstruction TA2.
- **Lacune** : pas de peau réaliste ni de visage (les jeux CC BY-SA ne les contiennent pas) ;
  licence SPL = 3D Slicer Section B à vérifier avant réemploi ; surface publique seulement.

### Charleeh/ecorche — 🟢 code / 🟡 modèle
- **Assemblage** : ~575 maillages BodyParts3D (os, cartilages, dents, yeux, muscles squelettiques)
  complétés par Z-Anatomy pour les muscles absents ; les deux jeux « n'ont jamais été conçus pour
  s'assembler » : les croisements sont corrigés par des **règles anatomiques explicites**, et les
  moitiés gauche/droite sont des **miroirs exacts**.
- **Chiffres** : 634 maillages nommés (198 os, 42 cartilages, 28 dents), 159 muscles profonds,
  203 superficiels, 486 005 vertices, 984 688 triangles, GLB 13,7 Mo / meshopt 5,7 Mo (4,2 Mo gzip).
- **Identity** : `extras` par nœud `{name, layer, source, fma, side, group}` — l'avertissement
  explicite « read this field instead of the node name » car les chargeurs réécrivent les noms.
- **Transférable** : extras typés + miroir exact + règle de préférence de couche.
- **Lacune** : 1 commit seulement ; modèle CC BY-SA 4.0 (partage obligatoire).

### Opening-Science/open-twin-xr — 🟡
- **Assemblage** : 7 atlas et 5 donneurs comparés côte à côte, couverture ontologique **mesurée**
  (BodyParts3D 1838/1838, Z-Anatomy 1840/3614, HRA 89 %, CT 100 %) ; identité par structure via
  `uint16` par vertex + table ; « absence de donnée » affichée explicitement, jamais 0 ni médiane.
- **Documentation générée** : `ONTOLOGY_MAP`, `LICENCE_LOG`, `DECISIONS` (y compris les approches
  rejetées) ; garde-fous `check:licences` et `lint:claims`.
- **Transférable** : mesure de couverture ontologique, log de licences généré, lint des claims.
- **Lacune** : bundle non-commercial de fait (Z-Anatomy CC BY-NC + CC BY-NC-SA) ; un composant
  sans licence déclarée est retiré par un build `--publishable`.

### nqwrc/3d-anatomy — 🔴
- **Assemblage** : 2 827 structures Z-Anatomy, 7 systèmes ; `za_name` comme identité stable car
  l'export glTF réécrit espaces/points et fusionne des paires ; **aplatissement au chargement** de
  868 structures imbriquées avec conservation de la relation de contenance ; partage des matériaux
  avec clone-on-modify puis restauration ; optimiseur qui **réécrit `systems.json` depuis ce qui a
  réellement survécu**.
- **Transférable** : identité stable, index jamais désynchronisé du modèle, clone-on-modify.
- **Lacune** : CC BY-NC-SA sur le code lui-même et deux composants NC → **inspiration seule**.

### ashemag/human-atlas — 🟢
- **Assemblage** : BodyParts3D 4.0, 2 234 maillages, 3 432 concepts FMA, 2 288 268 triangles,
  ~33 Mo ; simplification bornée à **0,2 % d'erreur relative** par structure ; géométrie fusionnée
  en batches, textures GPU par structure pour translation/visibilité/sélection, rendu à la demande.
- **Transférable** : borne d'erreur documentée, séparation code MIT / données CC BY 4.0.
- **Lacune** : une seule source anatomique, pas de fusion inter-sources.

### ImliStack/Body-Atlas-3D — 🔴 code / 🟡 organes
- **Assemblage** : 2 234 structures BodyParts3D + organes OrganUI + assembly féminin HuBMAP ;
  15 systèmes + 4 régions, ~31 Mo, ~14 draw calls (BatchedMesh), PWA hors ligne, SW
  network-first/cache-first, plugin Vite générant pages statiques et sitemap.
- **Transférable** : BatchedMesh, SW, pages générées.
- **Lacune** : **aucune licence de code déclarée** (`private: true`) ; OrganUI parfois CC BY-SA.

### aycibatuhan/nervous-system-atlas — ⚪
- **Assemblage** : BodyParts3D sélectionné, enregistré dans l'espace MNI par transformation affine,
  puis **post-correction monotone cubique** calée à 0 au joint vertébrobasilaire ; résidu mesuré
  passant de 17,6 mm à 1,95 mm, avec **porte QA à 1 mm** de déplacement crânien. Jeux restreints
  téléchargés seulement sur branche privée ou avec variable d'environnement.
- **Transférable** : recalage avec résidu chiffré et porte QA ; exclusion des assets restreints.
- **Lacune** : périmètre système nerveux, pas un corps entier ; licence non vérifiée.

### JohanBellander/BodyExplorer — 🟢 code / 🟡 données
- **Assemblage** : 401 maillages BodyParts3D + 66 Z-Anatomy, décimés à ~4 000 faces chacun,
  alignés par **décalages Y et Z calibrés** ; 467 muscles/tendons + 201 os, GLB 24 Mo + 9,4 Mo.
- **Transférable** : calibration explicite des offsets, script de décimation dédié, mapping JSON.
- **Lacune** : licence de données amont CC BY-SA 2.1 JP ancienne ; 4 commits.

### Open3Dmodel (AnatomyTOOL) — 🟡
- **Assemblage** : retopologie de toutes les structures Z-Anatomy pour supprimer les artefacts
  « crochetés » dus à l'éclairage, avec collaboration d'anatomistes (LUMC, UMCU, Maastricht, KU Leuven).
- **Transférable** : critère de qualité de surface vérifiable visuellement, gouvernance anatomique.
- **Lacune** : modèle CC BY-SA ; surface publique seulement, pas de pipeline machine lisible.

### MervinR07/open-anatomy-3d — 🟢
- **Assemblage** : BodyParts3D + HuBMAP + MakeHuman, 2 corps, 147 structures, 7 systèmes,
  ~1 M triangles/corps, GLB 7,6 et 8,1 Mo, catalogue typé et `verify` catalogue ↔ modèles.
- **Transférable** : catalogue typé + commande `verify`, pins sémantiques.
- **Lacune** : couverture très inférieure à CORPS (147 vs 2 009).

### olivercase/body_parts_3d_api — 🟡
- **Assemblage** : 3 210 maillages BP3D 4.3, manifeste **versionné** `FMA2Obj.txt`
  (`# Data Version 4.3`), correspondances FJ ↔ BP ↔ FMA, téléchargeur reprenable et vérificateur
  `trimesh`, `MANIFEST.csv` par maillage.
- **Transférable** : horodatage de version du manifeste, vérification de chaque maillage, dédup par ID FJ.
- **Lacune** : la version 4.3 n'est pas la 4.0 utilisée par CORPS ; licence code non vérifiée.

## 3. Matrice des gaps — chez eux / chez nous

| Pratique d'assemblage | Meilleur candidat | Chez eux | Chez CORPS | Écart |
|---|---|---|---|---|
| Lock sources + SHA-256 + outils | authorOd | oui, byte-identique même plateforme | `sources:check` (21 empreintes) | ❌ pas de lock de versions d'outils |
| Registre licences avec règles d'inclusion | authorOd | oui, exclusion automatique | `licenses.json` généré, pas de règles | ❌ |
| Gaps déclarés quand licence interdit | authorOd | oui | 2 idées `bloque` documentées | ≈ |
| IDs stables + alias | authorOd, nqwrc | oui | `source_id` depuis BENCH-008 | ✅ |
| Extras typés par structure | ecorche | `{source,fma,side,group}` | manifeste + fiches de vérité | ✅ |
| Miroir gauche/droite exact | ecorche | oui, règles explicites | non | ❌ |
| Manifeste régénéré depuis le survivant | nqwrc | oui | rebuild depuis inventaire vérifié | ≈ |
| Déduplication inter-sources avec préférence | Vayu | oui (SPL > ZA) | exclusions par patchs `fixes-composantes.json` | ≈ |
| Recalage avec résidu chiffré + porte QA | nervous-system | 17,6 → 1,95 mm, gate 1 mm | scorecard topologique, pas de recalage CT | ❌ |
| Couverture ontologique mesurée | open-twin-xr | 4 atlas chiffrés | 2 009 structures, pas de couverture FMA/TA2 | ❌ |
| Chunk par système + Draco | Vayu | oui | chunks par catégorie + LOD | ≈ |
| Batching / draw calls | ImliStack, ashemag | ~14 appels | 4 appels (BENCH-018) | ✅ |
| Pages statiques générées | ImliStack, Vayu | oui | BENCH-014 fait | ✅ |
| PWA hors ligne | ImliStack | oui | oui, SW + zéro requête externe | ✅ |
| Français natif | — | aucun | oui | ✅ |

## 4. Idées priorisées

`priorité = impact × (6 − effort)`, impact/effort 1–5.

| # | Idée (source) | Impact | Effort | Priorité |
|---:|---|---:|---:|---:|
| 1 | Lock sources + versions d'outils + SHA-256 (authorOd) | 5 | 2 | **20** |
| 2 | Registre licences avec règles d'inclusion automatiques (authorOd) | 5 | 2 | **20** |
| 3 | IDs stables + alias de renommage (authorOd, nqwrc) | 5 | 2 | **20** |
| 4 | Extras typés source/FMA/côté/groupe par structure (ecorche) | 5 | 2 | **20** |
| 5 | Manifeste régénéré depuis ce qui a survécu (nqwrc) | 5 | 2 | **20** |
| 6 | Gaps déclarés quand la licence interdit l'asset (authorOd) | 4 | 2 | 16 |
| 7 | Log de licences généré + lint des claims (open-twin-xr) | 4 | 2 | 16 |
| 8 | Mesure de couverture ontologique FMA/TA2 (open-twin-xr) | 4 | 3 | 12 |
| 9 | Déduplication inter-sources à préférence explicite (Vayu) | 5 | 3 | 15 |
| 10 | Porte QA avec résidu de recalage chiffré (nervous-system) | 5 | 3 | 15 |
| 11 | Pipeline `npm run pipeline` unique et re-jouable (Vayu) | 5 | 3 | 15 |
| 12 | Miroir gauche/droite exact (ecorche) | 4 | 3 | 12 |
| 13 | Chunk par système + Draco (Vayu) | 4 | 3 | 12 |
| 14 | Batching par catégorie (ImliStack, ashemag) | 4 | 3 | 12 |
| 15 | Borne d'erreur de simplification publiée (ashemag, ecorche) | 3 | 2 | 12 |
| 16 | Gouvernance anatomique multidisciplinaire (Open3Dmodel) | 4 | 5 | 4 |
| 17 | Conversion de courbes en triangles en headless (Vayu) | 3 | 4 | 6 |

**Déjà réalisé dans CORPS** : #3 (`source_id`), #4 (manifeste + fiches), #5 (rebuild depuis
inventaire), #6 (2 idées `bloque`), #7 (`licenses.json` + `lint:claims`), #11 (`npm run models:v2`),
#14 (4 appels de rendu). Le vrai reste à faire est **#1, #2, #8, #10**.

## 5. Directions et anti-patterns

- **Architecture** : transformer `sources-checksums.json` en lock complet avec versions d'outils
  et export mono-thread ; transformer `licenses.json` en registre de règles avec `commercialUse`
  et gaps déclarés.
- **Qualité** : mesurer la couverture FMA/TA2 du manifeste et ajouter une porte de résidu de
  recalage quand une nouvelle source est intégrée.
- **UX** : les extras typés et le miroir exact amélioreraient la lisibilité des paires gauche/droite.
- **Anti-patterns à ne pas reproduire** : licence de code absente (ImliStack), CC BY-NC caché dans
  un bundle (nqwrc, open-twin-xr), versions de données ambiguës (avertissement officiel BodyParts3D
  sur les coordonnées entre versions), fichiers de licence non générés, index désynchronisé du jeu
  de données, et modèles « miroirs » approximatifs non documentés.

## 6. Verdicts licence et appropriation

| Verdict | Candidats | Action |
|---|---|---|
| 🟢 Permissif prouvé | ashemag/human-atlas (MIT + CC BY 4.0), MervinR07 (MIT + CC BY 4.0), code de ecorche / BodyExplorer (MIT) | Réutilisation **avec attribution** ; créer `LICENSES.md` |
| 🟡 Copyleft / données | ecorche modèle, Vayu, ImliStack organes, aycibatuhan, Open3Dmodel, olivercase | **Validation humaine obligatoire** avant tout prélèvement |
| 🔴 Fermé ou sans preuve | nqwrc (CC BY-NC-SA sur code), ImliStack code, Sketchfab (licence non prouvée) | **Inspiration seule**, réimplémentation originale |
| ⚪ Incertain | code authorOd, code olivercase, nervous-system | Verdict bloqué tant que la preuve n'est pas rapportée |

Blocs d'attribution à générer **uniquement si** du code 🟢 est réutilisé plus tard :

```html
<!-- Code adapté de ashemag/human-atlas (https://github.com/ashemag/human-atlas), licence MIT,
     © auteurs du dépôt. Voir LICENSES.md à la racine du projet. -->
```

```html
<!-- Code adapté de MervinR07/open-anatomy-3d (https://github.com/MervinR07/open-anatomy-3d),
     licence MIT, © MervinR07. Voir LICENSES.md à la racine du projet. -->
```

Entrée `LICENSES.md` à créer alors : composant, URL exacte, licence, auteurs, date de consultation,
fichiers concernés, nature de l'adaptation. **Aucun code n'a été copié dans cette session.**

## 7. Sources datées

Toutes les pages et extraits ont été consultés le **20 novembre 2026** :
requêtes `websearch` citées en §0, pages GitHub/README des candidats, article
`vayuai.ai/writing/vayu-ai-anatomy`, page `anatomytool.org/open3dmodel-about`, et
[premier benchmark](2026-11-20-corps-benchmark.md) pour les cinq candidats déjà analysés en détail.

## 8. Limites du scan

- ~15 candidats découverts, 12 shortlistés, shortlist non exhaustive.
- **12 fiches partielles** : échec des sous-agents (contexte saturé puis timeouts réseau), aucune
  relecture directe des dépôts pour les lot 2 et 3 ; seuls les extraits de recherche et le premier
  benchmark ont été utilisés. Une vérification humaine ou une session ultérieure devra confirmer
  les chiffres avant toute décision d'appropriation.
- Aucun produit fermé n'a été accédé au-delà de sa surface publique.
- Les chiffres annoncés par les projets n'ont pas été re-mesurés.
- Ce rapport ne modifie aucun code applicatif ; toute idée nécessite une validation explicite.
