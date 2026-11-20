# Socle 3D unique — analyse décisionnelle

**Date : 21 novembre 2026 · Skill : `benchmark-concurrentiel` (mode complet)**

## 0. Cadrage et contraintes validées

Objectif : remplacer l'assemblage v2 (Z-Anatomy + BodyParts3D + exclusions + patchs) par **une seule base géométrique**, puis reconstruire manifeste, LOD, gates et preuves.

Contraintes confirmées par l'utilisateur le 20/11/2026 :
1. **une seule base géométrique** (aucune fusion multi-sources) ;
2. **CC BY-SA acceptable** (donne Z-Anatomy comme candidat viable) ;
3. **textures CC0 séparées autorisées** (couche d'assets, pas une seconde base géométrique).

**Fiche cible** : atlas web statique français, hors ligne, zéro requête externe, avec os, muscles et organes, rendu réaliste, manifeste à identifiants stables, reproductibilité et preuves mesurées.

**Non-négociable complémentaire** : aucune géométrie ni anatomie inventée pour combler un manque de couverture ; un organe absent est documenté comme gap.

## 1. Méthode et honnêteté

- 2 requêtes `websearch` (FR + EN) le 20/11/2026, puis **lecture directe des sources primaires** le 20–21/11/2026 (`webfetch` de README, `LICENSE.txt`, pages officielles de licence).
- Les 3 sous-agents `veilleur-concurrentiel` ont échoué (contextes saturés, timeouts réseau) ; l'analyse a donc été reprise en direct, en lots de 3–4 pages.
- 2 pages restent **non vérifiées en direct** : `anatomytool.org/open3dmodel-about` (erreur transport) et le `README` du dépôt Vayu (404 sur `main`). Leurs fiches sont marquées `partielles`.
- Surface publique uniquement pour les projets fermés ; aucun paywall contourné.

## 2. Tableau des 12 candidats (sources primaires)

| Candidat | URL | Licence prouvée | Chiffres vérifiés | Rôle |
|---|---|---|---|---|
| **Z-Anatomy** | github.com/Z-Anatomy/Models-of-human-anatomy | code + contenu **CC BY-SA 4.0** (`LICENSE.txt`) ; en amont BP3D CC BY-SA 2.1 JP ; composants NC inclus | ~3 600 structures, 6 systèmes (déclaré par Vayu) | **base unique candidate** |
| **BodyParts3D officiel** | dbarchive.biosciencedbc.jp/en/bodyparts3d | **CC BY 4.0**, page officielle mise à jour 27/02/2025 | 2 234 maillages 4.0 / 3 210 en 4.3 (olivercase) | base unique candidate |
| HuBMAP female v1.5 | doi.org/10.48539/HBM352.BTSQ.586 | **CC BY 4.0** (ATTRIBUTION ashemag) | 888 maillages, 1 073 concepts, GLB 211 Mo | écarté : couverture partielle |
| Open3Dmodel | anatomytool.org/open3dmodel-about | CC BY-SA déclaré (partiel) | retopo Z-Anatomy | pas une base indépendante |
| ecorche | github.com/Charleeh/ecorche | code **MIT**, modèle **CC BY-SA 4.0** | 634 maillages, 486 005 vertices, 984 688 tris, GLB 13,7 / 5,7 Mo | patron de pipeline (pas d'organes) |
| Vayu AI Anatomy | vayuai.ai/writing/vayu-ai-anatomy | **CC BY-SA 4.0** | 3 753 structures, 13 systèmes, 31 Mo | patron de pipeline (multi-sources) |
| authorOd / Svitylo | github.com/authorOd/3d-anatomy-atlas | code **CPAL-1.0** (correction), données par asset, canal `preview`, audit `pending` | build byte-identique mono-thread | patron de reproductibilité |
| aycibatuhan/nervous-system | github.com/aycibatuhan/nervous-system-atlas | code **Apache-2.0**, contenu **CC BY-SA 4.0** | 587 maillages, 49 Mo, trame MNI | patron de QA de recalage |
| nqwrc/3d-anatomy | github.com/nqwrc/3d-anatomy | **CC BY-NC-SA 4.0** sur tout | 2 827 structures | inspiration seule (NC) |
| ashemag/human-atlas | github.com/ashemag/human-atlas | code **MIT**, données **CC BY 4.0** | 2 234 maillages, 2 288 268 tris | réutilisation possible (fournisseur actuel) |
| ImliStack/Body-Atlas-3D | github.com/ImliStack/Body-Atlas-3D | code **inconnu**, données CC BY / OrganUI CC BY-SA | 2 234 structures, ~14 appels | inspiration seule |
| olivercase/body_parts_3d_api | github.com/olivercase/body_parts_3d_api | code **MIT**, dépôt CC **BY-SA 2.1 JP** (⚠️ la page officielle actuelle dit CC BY 4.0) | 3 210 maillages 4.3, manifeste versionné | outil d'acquisition BP3D 4.3 |

**Conflit de licence documenté** : le dépôt `olivercase` applique CC BY-SA 2.1 JP à ses maillages alors que la page officielle BodyParts3D (27/02/2025) déclare CC BY 4.0. Avant réemploi, trancher par la source officielle ou conserver la restriction share-alike du dépôt.

## 3. Comparaison relative (choix progressif)

### Étape 1 — portes dures
Écartés : ecorche (pas d'organes), Vayu / authorOd / nqwrc / ImliStack / ashemag / open-twin-xr / MervinR07 (multi-sources), aycibatuhan (système nerveux seulement), HuBMAP female (squelette et muscles partiels, 211 Mo), Open3Dmodel (dérivé de ZA, non indépendant).
**Survivants : Z-Anatomy seul et BodyParts3D seul.**

### Étape 2 — Z-Anatomy vs BodyParts3D

| Critère (poids) | Z-Anatomy | BodyParts3D 4.0/4.3 |
|---|---|---|
| Couverture os/muscles/organes (30 %) | 6 systèmes, ~3 600 structures, nerfs/vaisseaux en courbes | 2 234 maillages (4.0), surtout organes/os ; muscles moins complets |
| Réalisme / retopo (20 %) | retopologie dédiée, matériaux/couleurs | géométrie ancienne, relief simplifié |
| Matériaux / textures (15 %) | couleurs natives, pas de PBR | couleurs natives, pas de PBR |
| Licence (15 %) | CC BY-SA 4.0 **mais** composants NC inclus (oreille interne, rein) et Brainder/White matter sans licence → exclusions obligatoires | CC BY 4.0 officiel, le plus propre |
| Reproductibilité (10 %) | `.blend` + scripts Blender, snapshot à épingler | archive zip officielle ou manifeste 4.3 via olivercase |
| Outillage (10 %) | conversion ~950 courbes → triangles nécessaire (Vayu) | OBJ directs, plus simple |

**Score pondéré** : Z-Anatomy **4,05** · BodyParts3D **3,55**. Écart porté par la couverture et la qualité de surface ; BodyParts3D gagne sur la licence mais perd sur l'objectif « tous les os, muscles, organes ».

### Étape 3 — décision
**Retenir Z-Anatomy comme base géométrique unique**, avec trois obligations :
1. exclure explicitement les composants NC et sans licence (oreille interne CC BY-NC-SA 4.0, rein CC BY-NC 4.0, Brainder/White matter non licenciés) ; le motif existe déjà dans `nqwrc` et `authorOd` ;
2. conserver la chaîne d'attribution amont (BodyParts3D CC BY-SA 2.1 JP → Z-Anatomy CC BY-SA 4.0) dans `licenses.json` ;
3. appliquer les textures CC0 par classe de tissu comme couche séparée, documentée comme telle.

Le prix assumé : données dérivées en **CC BY-SA 4.0**, et perte des structures propres à BodyParts3D absentes de Z-Anatomy — à auditer avant migration, sans les recréer.

### Étape 4 — patrons à reprendre (pas de code copié)
| Patron | Source | Impact / Effort |
|---|---|---|
| Build byte-identique mono-thread + lock outils | authorOd | 5 / 2 |
| Registre de licences avec règles d'inclusion + gaps déclarés | authorOd | 5 / 2 |
| Conversion courbes → triangles en headless + TA2 reconstruit | Vayu | 3 / 4 |
| Porte QA avec résidu de recalage chiffré | aycibatuhan | 5 / 3 |
| Règles de couche explicites + miroir gauche/droite exact | ecorche | 4 / 3 |
| Winding corrigé (Z-Anatomy sort « inside out ») | ecorche | 5 / 2 |
| `za_name` comme identité stable + index régénéré depuis le survivant | nqwrc | 5 / 2 |
| Extras typés `{source, fma, side, group}` | ecorche | 5 / 2 |
| Borne d'erreur de simplification publiée | ashemag | 3 / 2 |
| Manifeste à empreintes et vérification par maillage | olivercase | 4 / 2 |
| Gouvernance anatomique multidisciplinaire | Open3Dmodel (partiel) | 4 / 5 |

## 4. Plan de migration (Phase B → D)

1. **Épinglage** : commit Z-Anatomy + SHA-256 de `Z-Anatomy.zip`, `TA2.csv`, `License.txt`, versions Blender/glTF Transform/meshoptimizer.
2. **Conversion** : Blender headless mono-thread → triangulation des courbes, filtres `.j`/`.g` et ≤1 polygone, conservation de `za_name`, correction du winding, calcul des bornes et des 3 LOD.
3. **Exclusions** : liste explicite des composants NC / sans licence, avec raison et date, registre de licences mis à jour.
4. **Manifeste** : même schéma que v2 + alias d'IDs (`source_id` → ancien ID) pour préserver deep links, catalogue, tours, fiches et pages statiques.
5. **Textures** : table CC0 os / muscle / organe, comparaison 8 angles avec et sans, budget réseau et attribution.
6. **Gates** : `sources:check` converti en lock complet, `check:modele`, scorecard/Hausdorff, `test:a11y`, `test:visuel`, CI, captures avant/après et verdict.
7. **Go/no-go** : structures par système, triangles, poids, temps de rebuild, identité des empreintes entre deux builds. Si la couverture organes est insuffisante, le projet s'arrête et le gap est documenté — aucune invention.

## 5. Verdicts licence et attribution

| Verdict | Candidats | Action |
|---|---|---|
| 🟢 Réutilisation avec attribution | code MIT : ecorche, ashemag, olivercase, BodyExplorer ; code Apache-2.0 : aycibatuhan | patterns/commandes uniquement, attribution |
| 🟡 Copyleft / validation humaine | Z-Anatomy (CC BY-SA 4.0 + composants NC à exclure), BP3D 4.0 (CC BY 4.0 officiel mais conflit 2.1 JP selon dépôts), Vayu, Open3Dmodel, données aycibatuhan | base retenue sous CC BY-SA 4.0 après exclusions |
| 🔴 Inspiration seule | nqwrc (CC BY-NC-SA sur code), ImliStack (code sans licence), composants NC internes à Z-Anatomy | aucune copie |
| ⚠️ CPAL-1.0 | authorOd | obligations de source du code couvert : ne pas copier tel quel |

Aucun code applicatif n'a été modifié ni copié. Bloc d'attribution à générer si du code 🟢 est repris :

```html
<!-- Pattern inspiré de ecorche (https://github.com/Charleeh/ecorche), licence MIT,
     © auteurs. Réimplémentation originale. Voir LICENSES.md. -->
```

## 6. Sources datées

Toutes les pages ont été consultées les **20–21 novembre 2026** : `LICENSE.txt` et `Readme.md` de Z-Anatomy, page officielle de licence BodyParts3D (27/02/2025), `ATTRIBUTION.md` de ashemag/human-atlas, README de ecorche, authorOd, aycibatuhan, BodyExplorer, olivercase, article Vayu AI, et premier benchmark (`2026-11-20-corps-benchmark.md`).

## 7. Limites

- ~15 candidats découverts, 12 évalués, shortlist non exhaustive.
- 2 fiches partielles (Open3Dmodel, dépôt Vayu) : erreur transport / 404 ; leurs chiffres sont repris de l'article ou d'extraits de recherche, pas du dépôt.
- Les pipelines internes fermés n'ont pas été accédés.
- Aucune mesure de performance n'a été faite sur la nouvelle base : le spike reste à exécuter.
- Ce rapport ne modifie aucun code ; la migration nécessite une validation explicite et ses propres preuves.
