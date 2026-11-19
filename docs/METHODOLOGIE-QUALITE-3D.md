# Méthodologie qualité 3D — atlas CORPS

**Version 1.0 — 19 novembre 2026**
**Statut : normative.** Ce document définit ce que « détaillé, de haute qualité, sous tous les
angles, avec un détail de qualité militaire » veut dire *mesurablement* pour l'atlas CORPS.
Aucune structure ne peut être déclarée terminée sans satisfaire les portes définies ici.

> **« Qualité militaire » n'est pas un adjectif marketing.** C'est un régime de preuve :
> critères chiffrés, mesure reproductible, traçabilité de la source, revue visuelle à angles
> fixes, et interdiction de déclarer « corrigé » sans rapport avant/après. Le jour où un chiffre
> n'est pas disponible, on écrit « non mesuré », jamais « bon ».

Public cible : **étudiants en médecine** qui doivent apprendre chaque élément du corps humain.
Conséquence : la barre n'est pas « joli aperçu », c'est « utilisable pour réviser une structure
isolée, sous n'importe quel angle, sans qu'une forme fausse induise en erreur ».

Limite de responsabilité : l'atlas est un outil d'apprentissage, **pas un dispositif de
diagnostic**. Aucune sortie de l'application ne doit être présentée comme un avis médical.

---

## 1. Les huit dimensions de la qualité

Une structure est jugée sur huit axes indépendants. Un axe réussi ne compense jamais un axe
échoué : une géométrie dense mais retournée reste un défaut bloquant.

| # | Dimension | Question à laquelle elle répond | Métrique principale |
|---|---|---|---|
| D1 | **Complétude** | Tous les éléments attendus sont-ils présents, nommés, latéralisés ? | couverture de l'inventaire, paires G/D, TA2 |
| D2 | **Exactitude anatomique** | La forme, la position, les rapports sont-ils justes ? | revue experte + écarts mesurés |
| D3 | **Résolution géométrique** | La forme est-elle assez fine pour lire le détail ? | densité tri/cm², longueur d'arête P99, écart de silhouette |
| D4 | **Intégrité topologique** | Le maillage est-il sain, sans trou ni couture ? | arêtes libres, non-manifold, composantes |
| D5 | **Normales et orientation** | La surface est-elle orientée vers l'extérieur et éclairée juste ? | winding, faces inversées, normales nulles |
| D6 | **Assemblage** | Les structures se raccordent-elles sans fente ni traversée ? | fentes aux articulations, interpénétrations |
| D7 | **Matériaux et rendu** | Les tissus ont-ils l'aspect du tissu, sous tous les angles ? | cartes PBR, réponse à la lumière, albédo |
| D8 | **Performance et traçabilité** | Reste-t-il utilisable, et sait-on d'où vient chaque triangle ? | fps, mémoire, source/licence par structure |

---

## 2. Portes d'acceptation

Chaque porte est **bloquante** pour le statut correspondant. Les valeurs de référence sont
mesurées par `npm run audit:3d` (voir §6) et publiées dans
[`docs/analyses/qualite-3d.md`](analyses/qualite-3d.md).

### G0 — Traçabilité (bloquante pour toute structure)

- 100 % des structures ont une **source**, une **licence**, un **chemin hiérarchique** et un
  identifiant de source.
- Un code TA2 est exigé, sauf absence documentée dans la fiche de la structure.
- Toute correction de géométrie est consignée : date, cause, méthode, métriques avant/après.

### G1 — Complétude

- 100 % des éléments de l'inventaire anatomique sont présents dans le manifeste.
- Les paires latérales sont complètes, ou l'asymétrie est documentée.
- Les éléments médians majeurs sont présents (ex. **œsophage**, poumons entiers, hémisphères).
- Aucun élément n'est présent en double sous deux identifiants.

### G2 — Intégrité topologique

| Contrôle | Seuil |
|---|---|
| Arêtes non-manifold | **0** par structure |
| Faces dupliquées | **0** par structure |
| Triangles dégénérés (aire < 10⁻⁶ mm²) | **< 0,01 %** |
| Arêtes libres sur une structure *fermée* (os plein, organe plein, ventre musculaire) | **0** |
| Arêtes libres sur une structure *ouverte* (séreuse, fascia, peau, vaisseau coupé) | autorisées **si** chaque boucle correspond à un plan de coupe déclaré |
| Composantes connexes | **1** pour une structure solide ; > 1 seulement avec justification anatomique (dents, sésamoïdes, ganglions) |

### G3 — Normales et orientation

| Contrôle | Seuil |
|---|---|
| Structures à volume signé négatif (winding inversé) | **0** |
| Faces dont la normale s'oppose aux normales de sommet | **< 0,05 %** |
| Normales nulles ou non finies | **0** |
| Indices hors bornes, positions NaN | **0** |

### G4 — Résolution géométrique

- Le LOD `high` ne simplifie **jamais** en dessous du nombre de triangles de la source.
- Le LOD `high` est dérivé de la **source la plus fine disponible**, pas d'un LOD intermédiaire.
- Cibles de densité à terme (après acquisition de sources haute résolution) :

| Classe | Densité cible | Arête P99 cible |
|---|---:|---:|
| Os (détail cortical, foramens) | ≥ 150 tri/cm² | ≤ 1,5 mm |
| Muscle (fibres, insertions) | ≥ 80 tri/cm² | ≤ 2,0 mm |
| Organe (lobes, hile, vaisseaux) | ≥ 200 tri/cm² | ≤ 1,5 mm |
| Main, pied, face, encéphale | ≥ 400 tri/cm² | ≤ 0,8 mm |

- Écart de silhouette entre la source et le LOD `high` : **≤ 0,5 mm** (distance de Hausdorff
  échantillonnée), à mesurer avant toute publication d'une structure prioritaire.

### G5 — Assemblage

- Aucune fente visible **> 0,5 mm** aux articulations sur les captures à angles fixes.
- Aucune ligne médiane visible sur les muscles abdominaux, le rachis ou la face.
- Aucune interpénétration **> 2 mm** entre structures qui ne doivent pas se traverser.
- Les contacts légitimes (séreuse contre organe, cartilage contre os) sont déclarés, pas corrigés.

### G6 — Matériaux et rendu

- Au moins une carte **albédo**, une carte **rugosité** et une carte **normale** par famille de
  tissus (os, muscle, organe, peau, cartilage, vaisseau, nerf).
- Pas d'albédo saturé uniforme de type « plastique rouge » : variation spatiale mesurable.
- Réponse à la lumière vérifiée sous **8 angles** et sous deux températures de lumière.
- Aucune information portée par la seule couleur (accessibilité).

### G7 — Performance

- 60 fps sur desktop à 1658 × 1150 avec un système anatomique visible.
- Chargement initial ≤ 5 s sur 4G simulée ; LOD supérieurs chargés à la demande.
- Budget mémoire GPU et taille de dépôt respectés (cible ≤ 350 Mo pour `public/models`).
- Aucune régression des tests de performance existants.

### G8 — Revue visuelle

- **8 angles** par structure prioritaire : face, dos, gauche, droite, dessus, dessous,
  trois-quarts avant-gauche, trois-quarts arrière-droit.
- **4 angles** minimum pour toutes les autres structures.
- Caméra, focale, distance, éclairage, fond et exposition **fixes** et versionnés.
- Chaque capture est relue avec une grille de défauts (D-COMP…D-PERF) et un niveau de sévérité.
- Une structure n'est « production » qu'après revue des 8 angles.

---

## 3. Niveaux de finition d'une structure

| Statut | Nom | Critère d'entrée |
|---|---|---|
| S0 | Importée | présente dans le manifeste avec source et licence |
| S1 | Mesurée | métriques `audit:3d` disponibles |
| S2 | Saine | G0, G2, G3 satisfaits |
| S3 | Production | S2 + G4 (résolution) + G5 (assemblage) + 8 angles relus |
| S4 | Référence pédagogique | S3 + validation par un anatomiste + fiche vérifiée |

**Aujourd'hui, aucune structure n'est officiellement S3.** Le statut réel est S1 pour les
2 039 structures, S2 pour une partie seulement. C'est la vérité que le tableau de bord doit
afficher, pas une moyenne flatteuse.

---

## 4. Taxonomie des défauts

| Code | Défaut | Exemple observé | Sévérité par défaut |
|---|---|---|---|
| D-COMP | élément manquant, en double ou mal latéralisé | œsophage absent | S1 |
| D-TOPO | trou, arête non-manifold, couture, face dupliquée | 124 structures non-manifold | S1 |
| D-NORM | winding inversé, faces retournées, normales nulles | 466 structures retournées | S1 |
| D-RES | silhouette facettée, détail insuffisant | 24 structures plafonnées à 12 000 tris | S2 |
| D-ASSEMBLY | fente, ligne médiane, traversée | épaules, hanches, ligne blanche | S2 |
| D-MAT | aspect plastique, albédo uniforme, rugosité absente | rendu rouge plat | S2 |
| D-PERF | chute de fps, surcharge mémoire | LOD high sur tout le corps | S2 |
| D-PROV | source ou licence manquante | — | S1 |

Sévérités : **S1** bloquant (forme fausse ou invisible), **S2** majeur (gêne l'apprentissage),
**S3** mineur (esthétique), **S4** cosmétique.

---

## 5. Règles de correction

1. **Ne jamais simplifier sous la source** pour le LOD `high`.
2. Construire la chaîne LOD **à partir du maillage le plus fin**, du `high` vers le `medium`
   puis le `low` — pas trois simplifications indépendantes depuis la source.
3. **Souder** les sommets confondus à 0,01 mm, **à l'intérieur d'une même structure uniquement**.
   On ne soude jamais deux structures anatomiques distinctes.
4. **Orienter chaque composante connexe** par son volume signé, puis recalculer les normales.
   Une structure peut contenir des composantes d'orientations opposées.
5. Préserver les arêtes vives par angle seuil lors du recalcul de normales ; ne pas lisser un
   bord osseux ou un sillon.
6. **Recoudre une fente intra-structure** (couture de symétrie, bord de coupe) ; ne pas recoudre
   une fente inter-structures : c'est un défaut d'assemblage, traité en D6.
7. Aucune opération booléenne entre structures ; aucune texture générée qui inventerait du détail
   anatomique absent de la source.
8. Toute correction produit : métriques avant/après, captures avant/après, et une entrée dans le
   journal de la structure.

---

## 6. Protocole de mesure

### 6.1 Audit topologique

```bash
npm run audit:3d                 # LOD high (défaut)
npm run audit:3d -- --lod=all    # les trois LOD
```

Sorties :

- `docs/analyses/qualite-3d.json` — une entrée par structure et par LOD ;
- `docs/analyses/qualite-3d.md` — synthèse, classements des pires cas, limites.

Métriques calculées : triangles, sommets, arêtes libres, arêtes non-manifold, composantes
connexes, triangles dégénérés, faces dupliquées, faces inversées, normales nulles, indices hors
bornes, aire (cm²), volume signé (cm³), longueurs d'arête min/médiane/P99/max (mm), densité
(tri/cm²), winding inversé.

### 6.2 Captures multi-angles

Le protocole de capture est **déterministe** et implémenté par
`scripts/captures-qualite-3d.mjs` (`npm run captures:3d`) :

- canvas forcé à **1024 × 1024**, `pixelRatio = 1`, aucun overlay DOM ;
- fond neutre fixe `#1b1f24`, ombres et sol masqués, exposition `1.15`, LOD `high` promu
  pour chaque structure du sujet ;
- huit directions canoniques : face, dos, gauche, droite, dessus, dessous,
  trois-quarts avant-gauche, trois-quarts arrière-droit ;
- cadrage calculé sur les **huit coins** de la boîte englobante projetés sur la base de vue
  (pas un simple rayon), marge de 12 % ;
- sujets « région » (genou) recadrés sur une structure focale avec **plans de coupe locaux**,
  pour ne pas compter les os longs comme débordants ;
- analyse de pixels par image : couverture, marges, débordement (marge < 2 %) ;
- **SHA-256** tronqué par image, pour détecter une dérive silencieuse du rendu.

Sorties : `docs/analyses/qualite-3d/<sujet>/<angle>.jpg` et un index
`docs/analyses/qualite-3d/index.json`. Un rendu qui change sans que la géométrie change est un
signal d'instabilité du moteur, pas une amélioration.

### 6.3 Écart de silhouette (Hausdorff)

`npm run hausdorff:3d` compare chaque LOD à la référence `high` :

- distance **point-triangle exacte** via un BVH de triangles, dans les deux directions ;
- échantillon déterministe de 256 sommets par direction ;
- sorties `docs/analyses/qualite-3d/hausdorff.json` et `.md`.

Limite : la mesure compare **LOD contre LOD**, pas source contre LOD. Elle prouve la fidélité
de la simplification, pas la fidélité au réel.

### 6.4 Statuts et tableau de bord

`npm run scorecard:3d` produit `docs/analyses/qualite-3d/scorecard.md` (statut S0–S4 par
structure, portes G0/G2/G3, bloqueurs) et la classification provisoire ouvert/fermé
`docs/qualite/classification-structures.provisional.json`.

### 6.5 Porte CI

`npm run audit:3d:baseline` écrit `docs/analyses/qualite-3d-baseline.json` (versionnée).
`npm run audit:3d:check` compare **structure par structure**, pas seulement les totaux : une
structure qui passe de saine à défectueuse est une régression même si la moyenne s'améliore
ailleurs. Le check échoue si les arêtes libres, arêtes non-manifold, faces dupliquées,
composantes, faces inversées, normales nulles, indices hors bornes ou positions NaN
augmentent, ou si le nombre de triangles d'une structure baisse de plus de 2 %.

### 6.6 Reproductibilité

- Graine et version du pipeline affichées dans le rapport.
- Toute mesure cite la version du manifeste et le commit.
- Les chiffres de ce document sont ceux des rapports `qualite-3d.md`, `scorecard.md`,
  `hausdorff.md` et `index.json` du 19 novembre 2026.

---

## 7. État des lieux mesuré — 19 novembre 2026

Jeu de données : **2 039 structures**, **6 509 477 triangles** au LOD `high`
(source complète, sans plafond ; jeu reconstruit, orientation et faces dupliquées
corrigées le 19 novembre 2026).

| Porte | Mesure | Verdict |
|---|---|---|
| G0 Traçabilité | 2 039/2 039 sources et licences ; 1 979/2 039 TA2 (97,1 %) | 🟡 |
| G1 Complétude | œsophage absent ; poumons entiers absents ; hémisphères absents ; myocarde absent de `organ:bp-heart` | ❌ |
| G2 Intégrité | 1 346/2 039 étanches et manifold (66,0 %) ; 690 avec bords ; 90 non-manifold ; 623 pluri-composantes ; 0 face dupliquée ; 0 dégénéré | ❌ |
| G3 Normales | 0 winding inversé ; 10 937 faces inversées (0,168 %) ; 0 normale nulle ; 0 indice hors bornes | 🟡 |
| G4 Résolution | `high` = source complète ; médiane 1 118 tris ; 954 structures < 1 000 tris (limite des sources) ; 0 structure plafonnée ; +1,44 M tris récupérés | 🟡 |
| G5 Assemblage | non mesuré ; défauts connus par captures (épaules, hanches, ligne médiane) | ❌ |
| G6 Matériaux | procédural uniquement, pas de cartes PBR par tissu | ❌ |
| G7 Performance | LOD et lots en place ; fps réels non mesurables en CI (SwiftShader) | 🟡 |
| G8 Revue visuelle | 4 angles sur 63 groupes ; pas de revue 8 angles par structure | ❌ |

**Lecture honnête :** deux portes sont partiellement tenues, sept sont échouées ou non mesurées.
Le problème n'est donc pas cosmétique. Il est structurel : sources grossières, plafond de
simplification, orientations incohérentes, absence de revue par structure.

### 7.1 Ce que la mesure dit des causes

- **Le plafond de 12 000 triangles est réel.** 24 structures sont exactement à 12 000 ; les
  objets sources contiennent **1 165 088 triangles Z-Anatomy** et **137 464 triangles
  BodyParts3D** au-delà de ce plafond. C'est une **borne supérieure** du gain : une partie de
  ces objets sont des agrégats exclus du rendu et ne sera pas récupérée telle quelle.
- **L'orientation est le défaut le plus répandu.** 442 des 1 443 structures Z-Anatomy (30,6 %)
  et 24 des 596 structures BodyParts3D (4,0 %) ont un volume signé négatif. Pour 274 d'entre
  elles, normales et winding sont inversés ensemble : la surface est éclairée comme si la
  lumière venait de l'intérieur.
- **La résolution est limitée par la source, pas seulement par le pipeline.** La longueur
  d'arête P99 médiane est de **9,0 mm** pour les os, **12,4 mm** pour les muscles et **6,9 mm**
  pour les organes. Même sans plafond, les sources actuelles ne permettent pas un détail
  sub-millimétrique sur la main, la face ou le cœur.
- **Les bords ne sont pas tous des défauts.** Les séreuses, fascias, la peau et les vaisseaux
  coupés sont légitimement ouverts. Il faut les **classer** avant de les corriger, sinon on
  « répare » une anatomie correcte.
- **Les composantes multiples ne sont pas toutes des défauts.** Les dents, les sésamoïdes et
  certains ganglions sont naturellement disjoints. Là encore, classification avant correction.

### 7.2 Résultats de l'instrumentation P0 (19 novembre 2026)

**Statuts (source complète).** 1 084 structures en S1, 955 en S2, **0 en S3**.
G0 : 1 979/2 039 (97,1 %). G2 : 1 534 (75,2 %) avec la classification provisoire,
1 949 (95,6 %) hors étanchéité. G3 : 1 295 (63,5 %). Aucune structure n'atteint S3
tant que G4 (résolution qualitative) et G5 (assemblage) ne sont pas mesurés.

**Captures.** 5 sujets pilotes × 8 angles = **40 images**, **0 débordement**. Le protocole a
immédiatement révélé un défaut de complétude : `organ:bp-heart` ne contient que **11 pièces
BodyParts3D** (valves, sinus coronaire, veines cardiaques) — **pas de myocarde**. Le sujet
« cœur » a donc été redéfini comme l'union des quatre chambres Z-Anatomy
(`organ:left-ventricle`, `organ:right-ventricle`, `organ:left-atrium`, `organ:right-atrium`)
et des valves.

**Écart de silhouette.** Référence `high`, 2 039 structures, 256 sommets par direction :

| Comparaison | Médiane | P90 | P99 | Max | > 0,5 mm | > 2 mm |
|---|---:|---:|---:|---:|---:|---:|
| `medium` → `high` | 0,00 mm | 0,63 mm | 4,20 mm | 126,30 mm | 274 | 58 |
| `low` → `high` | 0,41 mm | 2,79 mm | 17,39 mm | 126,30 mm | 920 | 323 |

Le maximum (~121 mm) signale une simplification qui déplace la silhouette, pas un simple
allègement.

**Défaut de pipeline trouvé et corrigé pendant P0.** Le manifeste initial *était* bien produit
par le script, mais `removeDegenerate()` y employait un seuil `cross² ≥ 1e-16`, soit une aire
de **0,005 mm²**. Sur les maillages finement tessellés de Z-Anatomy, ce seuil tombait au
milieu de la distribution des tailles de triangles : par exemple **9 216 triangles sur 9 728**
du sinus caverneux droit étaient supprimés *après* simplification. Effets mesurés :

- `organ:cavernous-sinus-r` : `high` 512 → **9 728** triangles (source complète) après correction ;
- **16 LOD non monotones** (`medium > high` ou `low > medium`) → **0** ;
- structures étanches : **1 107 (54,3 %) → 1 341 (65,8 %)** ; structures avec bords :
  **907 → 667**. Les triangles « manquants » n'étaient pas du bruit mais la peau des maillages.

Corrections apportées à `scripts/build-anatomy-v2.mjs` :

1. seuil de dégénérescence exprimé en **aire** (`1e-12 m²`), aligné sur l'audit ;
2. chaîne LOD dérivée du plus fin au plus grossier (`high` → `medium` → `low`) au lieu de
   trois simplifications indépendantes depuis la source ; cela garantit `low ≤ medium ≤ high` ;
3. baseline CI régénérée après reconstruction (changement de données voulu et tracé).

Attention : l'inventaire `docs/inventaire-anatomique/structures.json` surestime le nombre de
triangles de certains objets Z-Anatomy (ex. `bone:cricoid-cartilage` : 3 028 annoncés,
1 882 réels dans l'export). Les « pertes de détail » déduites de l'inventaire ne sont donc pas
une mesure fiable ; seule la comparaison au maillage source l'est. Les mains restent décalées
d'environ 2,5 cm par rapport à l'enveloppe cutanée grossière : signalée en avertissement, à
traiter en P5 (assemblage).

### 7.3 Correction de l'orientation et des faces dupliquées (P2, 19 novembre 2026)

`scripts/build-anatomy-v2.mjs` corrige désormais la géométrie **à la source**, avant
simplification :

- **orientation par composante** : composantes connexes fermées dont le volume signé, calculé
  dans le repère local de la composante, est négatif → inversion des indices **et** des
  normales. Les surfaces ouvertes (fascias, séreuses, vaisseaux coupés) sont exclues de la
  correction : leur volume signé n'a pas de sens anatomique.
- **faces dupliquées** : suppression après chaque étape de simplification, car
  `MeshoptSimplifier` peut en réintroduire.

Résultats mesurés, mêmes paramètres d'audit :

| Indicateur | Avant | Après |
|---|---:|---:|
| Structures à winding inversé | 566 | **0** |
| Faces dupliquées | 521 | **0** |
| Faces inversées (normales de sommets) | 14 055 | 13 793 |
| S2 (scorecard) | 684 | **943** |
| G3 normales | 950 | **1 269** |
| Structures étanches | 1 341 | 1 324 |
| Structures avec bords | 667 | 712 |

La baisse de 17 structures étanches est le prix de la suppression des faces dupliquées qui
« collaient » deux feuillets : elle sera récupérée par la soudure intra-structure prévue en
P2. Une capture avant/après de `organ:white-matter-of-telencephalon-r` (8 angles) confirme
que le rendu reste cohérent ; les écarts de teinte sont locaux et attendus après inversion
des normales.

### 7.4 Suppression du plafond de résolution (P3, 19 novembre 2026)

`LOD.high.target` passe de 12 000 à `null` : le `high` est désormais la source complète.
88 objets dépassaient 12 000 triangles (1 506 958 triangles au-delà du plafond), dont
`organ:white-matter-of-telencephalon-l/r` (135 288 tris chacun) et `organ:pleura`
(112 288 tris). Le `medium` et le `low` sont dérivés de ce `high` complet.

| Indicateur | 12 000 plafonnés | Source complète |
|---|---:|---:|
| Triangles `high` | 5 066 169 | **6 509 477** |
| Poids gzip du jeu | 101,4 Mo | 119,0 Mo |
| Structures étanches | 1 324 | **1 346** |
| Structures avec bords | 712 | **690** |
| Arêtes non-manifold | 128 | **90** |
| Faces inversées | 13 793 | **10 937** |
| LOD non monotones | 0 | 0 |

Une passe complémentaire (`repairVertexNormals`) ne recalcule que les normales de sommets
franchement opposées aux faces incidentes ; 130 faces inversées de moins (11 067 → 10 937),
sans modifier le shading du reste des maillages.

Le surcoût de téléchargement est supportable car le `high` est chargé par catégorie
uniquement à la sélection d'une structure ; la vue d'ensemble reste en `low`. Les risques
restants sont la bande passante initiale et la mémoire sur mobile : à mesurer avant
déploiement large (G7).

---

## 8. Gouvernance

- Toute modification de seuil, de métrique ou de protocole se fait **d'abord ici**, puis dans
  `scripts/audit-qualite-3d.mjs`, **dans le même commit**.
- Un rapport de qualité est **daté** et **versionné** ; il n'est jamais réécrit après coup.
- Une correction ne peut être annoncée que si elle cite : la métrique, la valeur avant, la
  valeur après, le rapport, et les captures.
- Le tableau de bord des chantiers doit refléter le statut réel (S0–S4), pas le statut rêvé.
- Les limites sont publiées avec les résultats, pas cachées en note de bas de page.

---

## 9. Limites assumées de la version 1.0

1. L'audit mesure la **topologie**, pas la **vérité anatomique**. Un maillage étanche peut être
   faux. La fidélité exige une revue experte.
2. L'écart de silhouette est instrumenté **LOD contre LOD** ; la comparaison source contre
   LOD reste à faire.
3. Les fentes inter-structures et les lignes médianes ne sont **pas encore** mesurées
   automatiquement ; elles sont constatées par captures.
4. Les matériaux ne sont **pas encore** évalués par métrique objective (albédo, rugosité,
   réponse angulaire).
5. Les sources ouvertes actuelles ont un plafond de résolution qui rend la cible G4
   inatteignable sans nouvelles sources. C'est un problème d'acquisition, pas de code.
6. Aucune validation par un anatomiste n'a encore été réalisée à ce jour.

---

## 10. Documents liés

- [`docs/analyses/qualite-3d.md`](analyses/qualite-3d.md) — mesures du 19 novembre 2026.
- [`docs/plan-qualite-3d.md`](plan-qualite-3d.md) — plan de route et prochaine étape.
- [`docs/chantiers-prioritaires.md`](chantiers-prioritaires.md) — statut des chantiers.
- [`docs/jeu-de-donnees-v2.md`](jeu-de-donnees-v2.md) — format, LOD et sources.
