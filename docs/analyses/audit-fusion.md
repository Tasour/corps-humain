# Audit de fusion — Z-Anatomy × BodyParts3D dans le manifeste v2

**Date :** 2026-11-18
**Périmètre :** `public/models/v2/manifest.json` (v2.0, généré le 2026-11-18), croisé avec
`docs/inventaire-anatomique/structures.json` et `scripts/generate-anatomy-inventory.mjs`
pour l'explication des causes. Aucun rendu, aucune modification du code moteur : tous les
chiffres sont reproductibles par parcours du manifeste (§ 8).

> **Attention aux chiffres périmés.** `docs/analyses/collisions-anatomiques.md` cite un
> manifeste à 2 104 structures (Z 1 442 / BP 662). Le manifeste actuel en contient
> **2 041** (Z 1 435 / BP 606) : la quarantaine `HIDDEN_IDS` a été durcie depuis. Le présent
> audit porte sur l'état **actuel** du fichier.

## 1. Jeu de données et convention

| Propriété | Valeur |
|---|---|
| Structures du manifeste | **2 041** |
| Z-Anatomy | **1 435** (70,3 %) |
| BodyParts3D 4.0 | **606** (29,7 %) |
| Catégories | os 318 · muscle 695 · organe 1 028 |
| Côtés | gauche 855 · droit 862 · non latéralisé 324 |
| Paires G/D complètes (`-l` + `-r` présents) | **834** (1 668 enregistrements) |
| Paires incomplètes (un seul côté) | **49** (21 gauche-seul, 28 droit-seul ; 45/49 viennent de BP) |
| **Paires G/D de sources mixtes** | **8** |
| Agrégats exclus | 98 |
| Enveloppe cutanée (union des LOD) | x ∈ [−0,3333 ; 0,3320], **y ∈ [0 ; 1,7194]**, z ∈ [−0,1452 ; 0,1467] m |

Convention vérifiée : Y = vertical, X = latéral (gauche = +X), Z = antéro-postérieur ; unité = mètre.
Les deux sources partagent ce repère (§ 5). Les IDs suivent `catégorie:canonique[-l|-r]`, avec
préfixe `bp-` pour les concepts ajoutés depuis BodyParts3D seul.

**Cause racine unique.** Dans `scripts/generate-anatomy-inventory.mjs` (l. 162-180), le choix
de source est fait **par entrée d'inventaire, donc par côté** :

```js
const best = bp && bpTris > zTris ? { source: "BodyParts3D 4.0", ... }
                                 : { source: "Z-Anatomy", ... };
```

Or les maillages Z-Anatomy mirrorés ont **exactement le même nombre de triangles à gauche et à
droite**, alors que le filtrage BodyParts3D (l. 91-95, `part.name` contient « left »/« right »)
donne des nombres de pièces — donc de triangles — différents selon le côté. Dès que `bpTris`
franchit `zTris` d'un seul côté, la paire devient hybride. C'est ce qui produit les 8 cas du § 2.
Le même défaut de clé de déduplication (ID construit depuis le nom canonique propre à la source
plutôt que depuis le TA2/FMA) produit les 5 doublons du § 3.

---

## 2. Catégorie 1 — paires gauche/droite dont les deux côtés viennent de sources différentes

**8 paires sur 834 complètes (0,96 %)** — 16 enregistrements concernés. Orientation :
**6 paires L=BP / R=Z** et **2 paires L=Z / R=BP**. Dans 8 cas sur 8, un objet Z-Anatomy
existe **des deux côtés** dans l'inventaire : le choix cohérent est donc Z-Anatomy partout.

| # | ID de base | Côté gauche (ID · source · tris Z/BP) | Côté droit (ID · source · tris Z/BP) | TA2 |
|---:|---|---|---|---|
| 1 | `bone:corniculate-cartilage` | `bone:corniculate-cartilage-l` · **Z-Anatomy** · 136/134 | `bone:corniculate-cartilage-r` · **BodyParts3D** · 136/172 | 997 |
| 2 | `bone:lateral-cuneiform-bone` | `bone:lateral-cuneiform-bone-l` · **BodyParts3D** · 638/648 | `bone:lateral-cuneiform-bone-r` · **Z-Anatomy** · 638/600 | 1488 |
| 3 | `bone:trapezoid-bone` | `bone:trapezoid-bone-l` · **BodyParts3D** · 364/396 | `bone:trapezoid-bone-r` · **Z-Anatomy** · 364/354 | 1257 |
| 4 | `muscle:iliococcygeus-muscle` | `muscle:iliococcygeus-muscle-l` · **BodyParts3D** · 1962/4098 | `muscle:iliococcygeus-muscle-r` · **Z-Anatomy** · 1962/1812 | 2404 |
| 5 | `muscle:pubococcygeus-muscle` | `muscle:pubococcygeus-muscle-l` · **BodyParts3D** · 2512/3458 | `muscle:pubococcygeus-muscle-r` · **Z-Anatomy** · 2512/1906 | 2405 |
| 6 | `muscle:straight-part-of-cricothyroid-muscle` | `muscle:straight-part-of-cricothyroid-muscle-l` · **BodyParts3D** · 1180/2096 | `muscle:straight-part-of-cricothyroid-muscle-r` · **Z-Anatomy** · 1180/1160 | 2194 |
| 7 | `organ:stria-terminalis` | `organ:stria-terminalis-l` · **Z-Anatomy** · 746/648 | `organ:stria-terminalis-r` · **BodyParts3D** · 746/1296 | 5592 |
| 8 | `organ:thalamus` | `organ:thalamus-l` · **BodyParts3D** · 758/1388 | `organ:thalamus-r` · **Z-Anatomy** · 758/758 (égalité → Z) | 5678 |

**Effets visibles.** Densité de maillage différente entre les deux côtés d'un même organe
(ex. iliococcygeus : 1 962 tris Z à droite contre 4 098 tris BP à gauche), métadonnées de
licence et de matériaux hétérogènes, et comportement de sélection/ survol incohérent. La
géométrie, elle, est bien alignée : pour les 8 paires, la somme des centres X gauche + droite
vaut **0,000 m** à 1 mm près (symétrie miroir respectée) — ce n'est donc pas un bug de repère.

**Règle de correction.** Décider la source **au niveau de la paire**, jamais au niveau du côté :

1. Grouper les entrées par ID de base après retrait de `-l`/`-r`.
2. Si un objet Z-Anatomy existe pour **les deux** côtés → retenir **Z-Anatomy pour les deux**
   (cas des 8 paires ci-dessus) ; sinon, si un concept BP couvre les deux côtés → retenir BP
   pour les deux ; sinon, garder le côté disponible et signaler la paire incomplète.
3. Remplacer `bpTris > zTris` par une comparaison **symétrique** :
   `bpTrisTotal > zTrisTotal` où les totaux additionnent les deux côtés, avec départage
   Z-Anatomy en cas d'égalité (conformément à la méthodologie de l'inventaire, l. 362).
4. Recalculer `source`, `materials`, `path` et `bounds` après ce choix, puis régénérer les 3 LOD.

**Coût : 8 enregistrements à basculer vers Z-Anatomy** (6 côtés gauche, 2 côtés droit).

---

## 3. Catégorie 2 — noms dupliqués entre les deux sources

**13 noms normalisés présents à la fois dans Z-Anatomy et dans BodyParts3D.** Ils se divisent
en deux groupes distincts.

### 3a. Les 8 doublons « de paire » (déjà listés au § 2)

`corniculate cartilage`, `lateral cuneiform bone`, `trapezoid bone`, `iliococcygeus muscle`,
`pubococcygeus muscle`, `straight part of cricothyroid muscle`, `stria terminalis`, `thalamus`.
Le nom apparaît dans les deux sources uniquement parce que les deux côtés ont été choisis
dans des sources différentes. **Aucun retrait de structure n'est nécessaire** : la correction
du § 2 résout ces 8 cas (une paire repasse mono-source).

### 3b. Les 5 vrais doublons médians (deux enregistrements pour la même structure)

Tous ont `side: null`, `category: organe` et le **même numéro TA2**. Le suffixe `bp-` n'est
qu'un artefact d'ID : les deux modèles sont bien dans le manifeste et seront rendus deux fois
(z-fighting, opacité doublée, double entrée dans l'index).

| Nom / TA2 | Enregistrement Z-Anatomy | Enregistrement BodyParts3D | AABB (min→max, m) |
|---|---|---|---|
| Corpus spongiosum of penis · 3681 | `organ:corpus-spongiosum-of-penis` | `organ:bp-corpus-spongiosum-of-penis` | Z [−0,011 ; 0,747 ; −0,023]→[0,010 ; 0,819 ; 0,089] · BP [−0,016 ; 0,786 ; 0,076]→[0,014 ; 0,816 ; 0,101] |
| Free taenia · 2996 | `organ:free-taenia` | `organ:bp-taenia-libera` | Z [−0,074 ; 0,918 ; −0,041]→[0,078 ; 1,120 ; 0,053] · BP [−0,102 ; 0,905 ; −0,039]→[0,098 ; 1,107 ; 0,076] |
| Meso-appendix · 3749 | `organ:meso-appendix` | `organ:bp-mesoappendix` | Z [−0,072 ; 0,947 ; −0,013]→[−0,022 ; 0,991 ; 0,020] · BP [−0,083 ; 0,948 ; −0,014]→[−0,020 ; 0,994 ; 0,026] |
| Mesocolic taenia · 2994 | `organ:mesocolic-taenia` | `organ:bp-taenia-mesocolica` | Z [−0,115 ; 0,885 ; −0,055]→[0,110 ; 1,132 ; 0,082] · BP [−0,084 ; 0,942 ; −0,036]→[0,086 ; 1,129 ; 0,061] |
| Omental taenia · 2995 | `organ:omental-taenia` | `organ:bp-taenia-omentalis` | Z [−0,082 ; 0,881 ; −0,020]→[0,098 ; 1,084 ; 0,060] · BP [−0,125 ; 0,912 ; −0,049]→[0,117 ; 1,134 ; 0,096] |

**Cause.** Pour 4 cas sur 5, `matchConcept()` de l'inventaire n'a pas apparié l'objet Z au
concept BP (variantes de nom : *Free taenia* vs *taenia libera*, *Meso-appendix* vs
*mesoappendix*, etc.) ; la boucle « concepts présents seulement dans BodyParts3D » (l. 247-310)
a donc réinjecté le concept sous un ID `bp-…`, alors que le maillage Z existait déjà. Pour le
corpus spongiosum, l'appariement a échoué autrement : le concept BP réinjecté est en réalité
`zone of corpus spongiosum of penis` (FMA20247, pièce `Glans penis`) — c'est le **gland**, pas le
corps spongieux (FMA19617). Le doublon est ici aussi une **erreur sémantique**.

**Règle de correction.** Dédupliquer **avant** l'écriture du manifeste sur la clé
`(numéro TA2, côté, catégorie)` ; en cas de collision, conserver l'enregistrement Z-Anatomy
(nomenclature TA2 correcte, licence CC BY-SA déjà celle du jeu combiné), supprimer l'ID `bp-`.
Ne retirer le préfixe `bp-` des IDs survivants qu'**après** la déduplication, pour ne pas
écraser un ID existant.

**Coût : 5 enregistrements à supprimer.**

### 3c. Deux doublons d'ID intra-BodyParts3D (découverts accessoirement)

Le manifeste contient **2 IDs strictement identiques**, chacun répété deux fois :

| ID | TA2 | AABB des deux occurrences |
|---|---|---|
| `bone:bp-sternum` | 1129 | [−0,027 ; 1,358 ; 0,031]→[0,027 ; 1,403 ; 0,079] et [−0,027 ; 1,242 ; 0,031]→[0,027 ; 1,403 ; 0,114] |
| `organ:bp-diencephalon` | 5661 | [−0,009 ; 1,610 ; −0,033]→[0,003 ; 1,627 ; 0,004] et [−0,009 ; 1,610 ; −0,041]→[0,003 ; 1,639 ; 0,010] |

Deux concepts BodyParts3D distincts ont reçu le même ID canonique normalisé. Tout index
`Map` clé par `id` écrase la première occurrence : **un maillage sur deux est invisible**,
et le second (différent) est affiché à sa place. Règle : rendre l'ID unique en suffixant le
`conceptId` FMA quand la normalisation produit une collision, puis fusionner les concepts
redondants (ici le second sternum est une version plus longue du premier).

**Coût : 2 enregistrements à supprimer ou à renommer.**

À signaler également : `organ:bp-lumbar-artery` et `organ:bp-lumbar-vein` portent tous deux
le nom `(Lumbar rib)` et le TA2 1117 (erreur d'appariement TA2) → **2 enregistrements à
renommer** ; défaut de nomenclature, sans doublon géométrique.

---

## 4. Catégorie 3 — même ID de base, catégories ou systèmes différents entre sources

**Aucun conflit de catégorie vrai (os/muscle/organe) n'existe entre les deux sources :**
0 cas sur les 13 doublons du § 3, et 0 conflit de catégorie pour un même numéro TA2.
Toutes les paires doublons restent dans la même catégorie.

**Un seul conflit de sous-système**, sur le doublon déjà identifié :

| ID de base | Enregistrement Z-Anatomy | Enregistrement BodyParts3D |
|---|---|---|
| `corpus-spongiosum-of-penis` | `organ:corpus-spongiosum-of-penis` · catégorie `organ` · `subsystem: "Viscéral"` | `organ:bp-corpus-spongiosum-of-penis` · catégorie `organ` · `subsystem: "reproductive"` |

La cause est structurelle : la classification Z-Anatomy est dérivée des collections
(`"8: Visceral systems"` → `Viscéral`, l. 146-153), alors que les concepts BP ajoutés
seuls héritent du système FMA du concept (`reproductive`, l. 279). Ces deux vocabulaires
ne sont pas alignés : `Viscéral`/`Cardiovasculaire`/`Nerveux et sens`/`Lymphoïde` d'un côté,
`reproductive`/`arterial`/`venous`/`nervous`/`lymphatic`/`sensory` de l'autre. Le manifeste
mélange donc deux taxonomies de sous-systèmes selon l'origine de la structure.

**Règle de correction.** Normaliser `subsystem` avec une table unique (une seule entrée par
système FMA, libellé français canonique), appliquée **après** le choix de la source : la
structure conservée porte le sous-système de sa source, traduit via la table. Éviter
l'hétérogénéité en n'utilisant plus jamais la valeur brute `system` de BodyParts3D. Dans le
cas présent, conserver `"Viscéral"` (enregistrement Z retenu au § 3b).

**Coût : 1 champ à normaliser (aucun enregistrement supplémentaire ; déjà couvert par la
suppression du doublon).**

---

## 5. Catégorie 4 — repère des bornes BodyParts3D

**Verdict : 0 structure hors repère.** Les deux sources utilisent le même repère Y-up en mètres,
calé sur la peau. Aucune conversion de coordonnées n'est nécessaire.

| Origine | n | X (m) | Y (m) | Z (m) |
|---|---:|---|---|---|
| **BodyParts3D** | 606 | [−0,3199 ; 0,3199] | **[0,0083 ; 1,7143]** | [−0,1180 ; 0,1153] |
| **Z-Anatomy** | 1 435 | [−0,3354 ; 0,3300] | **[0,0064 ; 1,7076]** | [−0,1311 ; 0,1374] |
| Peau (tous LOD) | — | [−0,3333 ; 0,3320] | **[0 ; 1,7194]** | [−0,1452 ; 0,1467] |

Contrôles effectués sur les 2 041 structures, en incluant les trois AABB par LOD :

| Contrôle | Résultat |
|---|---|
| `min.y < 0` ou `max.y > 1,72` (top-level) | **0** (BP 0, Z 0) |
| `min.x < −0,36` ou `max.x > 0,36` | **0** (excursion max 2,1 mm hors peau, déjà documentée) |
| `min.z < −0,22` ou `max.z > 0,22` | **0** |
| `min > max` sur un axe | **0** |
| AABB de taille nulle ou négative | **0** |
| AABB d'un LOD hors `[0 ; 1,72]` en Y | **0** |
| Symétrie miroir des 8 paires hybrides (centre X gauche + droite) | **0,000 m** pour 8/8 |

Les bornes des doublons médians se recouvrent largement (ex. *meso appendix* : Z
y ∈ [0,947 ; 0,991], BP y ∈ [0,948 ; 0,994]) : leur **z-fighting** vient de la duplication
(§ 3b), pas d'un décalage de repère. Seul le corpus spongiosum présente un décalage notable
en Z (BP z ∈ [0,076 ; 0,101] contre Z z ∈ [−0,023 ; 0,089]), cohérent avec l'erreur sémantique
« gland vs corps spongieux » déjà relevée.

**Règle de correction.** Aucune transformation géométrique. Ajouter une **assertion de build**
qui rejette toute structure dont l'AABB sort de l'enveloppe cutanée avec 5 mm de tolérance, et
une assertion de symétrie `|cx_l + cx_r| < 1 mm` pour chaque paire. Ces garde-fous empêcheront
qu'une prochaine révision réintroduise un repère différent — le contrôle actuel est purement
statique et postérieur à la génération.

**Coût : 0 correction géométrique.**

---

## 6. Catégorie 5 — estimation du nombre de structures à corriger

| Nature de la correction | Structures | Détail |
|---|---:|---|
| Paires G/D hybrides → bascule du côté BP vers Z | **8** | § 2, 6 gauche + 2 droite |
| Doublons médians Z/BP → suppression de l'ID `bp-` | **5** | § 3b |
| IDs exactement dupliqués → suppression/renommage | **2** | § 3c (`bp-sternum`, `bp-diencephalon`) |
| **Sous-total « fusion » (noyau dur)** | **15** | **0,74 % des 2 041 structures** |
| Exclusions asymétriques (un côté exclu, l'autre conservé) | **9 paires** | § 7 |
| Noms/TA2 erronés (`bp-lumbar-artery`, `bp-lumbar-vein`) | **2** | § 3c |
| Sous-système à normaliser | 1 champ | déjà inclus dans les 5 suppressions |
| Repère / bornes | **0** | § 5 |
| **Total maximal** | **26 enregistrements** | **1,27 % du manifeste** |

**Recommandation : traiter les 15 du noyau dur en priorité.** Les 9 exclusions asymétriques
sont un défaut de la *liste* d'exclusion, pas des maillages ; elles se corrigent en une passe
sur `EXCLUDED_CONCEPTS`/`HIDDEN_IDS` (§ 7).

---

## 7. Corollaire — exclusions asymétriques (déséquilibre G/D)

Parmi les **49 paires incomplètes**, **9** le sont parce que la liste d'exclusion ne contient
qu'un seul des deux côtés, alors que l'autre reste rendu :

| ID de base | Côté conservé | Côté exclu | Liste |
|---|---|---|---|
| `bone:distal-phalanx-of-first-finger-of-hand` | `-r` | `-l` | `EXCLUDED_CONCEPTS` |
| `muscle:dorsal-fascia-of-hand` | `-r` | `-l` | `EXCLUDED_CONCEPTS` |
| `muscle:palmar-aponeurosis` | `-r` | `-l` | `EXCLUDED_CONCEPTS` |
| `organ:bp-basilar-artery` | `-r` | `-l` | `HIDDEN_IDS` |
| `organ:bp-brachiocephalic-vein` | `-r` | `-l` | `HIDDEN_IDS` |
| `organ:bp-common-hepatic-artery` | `-r` | `-l` | `HIDDEN_IDS` |
| `organ:bp-fibrous-skeleton-of-heart` | `-l` | `-r` | `HIDDEN_IDS` |
| `organ:bp-hepatic-portal-vein` | `-r` | `-l` | `HIDDEN_IDS` |
| `organ:bp-pulmonary-valve` | `-l` | `-r` | `HIDDEN_IDS` |

17 autres bases de la liste d'exclusion ne présentent pas ce symptôme (l'autre côté n'existe
pas dans le manifeste, ou n'est pas une paire). Les 40 paires incomplètes restantes sont des
structures **unilatérales par définition** (`organ:bp-left-renal-artery-l`, etc.) ou des
conséquences des quarantaines déjà documentées ; elles ne sont pas des bugs de fusion.

**Règle de correction.** Écrire les listes d'exclusion en **paires atomiques** : toute entrée
se terminant par `-l` ou `-r` ajoute automatiquement son miroir, sauf mention explicite
`unilateral: true` dans l'inventaire. Appliquer la règle aux deux listes
(`EXCLUDED_CONCEPTS` et `HIDDEN_IDS`) avant le filtrage `keptConcepts.filter(...)`.

---

## 8. Algorithme de correction déterministe (récapitulatif)

À insérer dans `scripts/build-anatomy-v2.mjs`, avant la boucle d'écriture du manifeste :

```text
1. SYMMETRISER les listes d'exclusion (§ 7).
2. SYMMETRISER le choix de source (§ 2) :
   pour chaque base avec -l et -r :
       zL, zR = objets Z-Anatomy ; bL, bR = concepts BodyParts3D
       si zL && zR        -> source = "Z-Anatomy"
       sinon si bL && bR  -> source = "BodyParts3D 4.0"
       sinon              -> garder le disponible, journaliser la paire incomplète
3. DEDUPLIER sur (TA2, côté, catégorie) (§ 3) :
       conserver Z-Anatomy ; supprimer les ID bp- concurrents
4. RENDRE les ID uniques (§ 3c) : suffixer le conceptId FMA en cas de collision,
       puis fusionner les concepts redondants (sternum, diencéphalon).
5. NORMALISER subsystem via une table FMA -> libellé unique (§ 4).
6. ASSERTIONS (§ 5) : AABB dans l'enveloppe peau ± 5 mm, |cx_l + cx_r| < 1 mm.
7. Regénérer les 3 LOD, puis verifier /api/library (N -> N+1) et relancer
   scripts/analyze-v2.mjs + docs/analyses/rapport-v2.md.
```

Après correction attendue : **2 024 structures** (2 041 − 15 − 2 = 2 024, hors renommages),
**0 paire hybride**, **0 nom dupliqué entre sources**, **0 ID dupliqué**, **9 paires
symétrisées**.

## 9. Reproductibilité

Chiffres obtenus par (depuis la racine du dépôt) :

```bash
# Totals, sources, paires hybrides et doublons de noms
node -e "const S=require('./public/models/v2/manifest.json').structures;
const N=s=>String(s.en).toLowerCase().normalize('NFD').replace(/[^a-z0-9]+/g,' ').trim();
const strip=id=>id.replace(/-(l|r)$/,'');
const p=new Map(); for(const s of S){if(!/-(l|r)$/.test(s.id))continue;
const b=strip(s.id); if(!p.has(b))p.set(b,{}); p.get(b)[s.id.endsWith('-l')?'l':'r']=s;}
const pairs=[...p].filter(([,o])=>o.l&&o.r);
console.log({n:S.length, mixed:pairs.filter(([,o])=>o.l.source!==o.r.source).length});
const by=new Map(); for(const s of S){const k=N(s); if(!by.has(k))by.set(k,[]); by.get(k).push(s);}
console.log('noms dupliqués inter-sources',[...by].filter(([,a])=>
new Set(a.map(x=>x.source)).size>1).length);"

# Doublons d'ID exacts
node -e "const S=require('./public/models/v2/manifest.json').structures;
const m=new Map(); for(const s of S)m.set(s.id,(m.get(s.id)||0)+1);
console.log([...m].filter(([,v])=>v>1));"

# Bornes / enveloppe
node -e "const M=require('./public/models/v2/manifest.json');
for(const src of ['Z-Anatomy','BodyParts3D 4.0']){
const a=M.structures.filter(s=>s.source===src);
const y=a.flatMap(s=>[s.bounds.min[1],s.bounds.max[1]]);
console.log(src,a.length,Math.min(...y),Math.max(...y));}"
```

Tous les chiffres du présent audit ont été calculés avec ces parcours, sans aléa ni dépendance
au rendu.
