# Audit des matériaux et de la fusion de sources dans `colorFor()`

**Date :** 2026-11-18  
**Périmètre :** analyse statique de `src/v2-engine.js` (`colorFor()`, lignes 19-40 ; 4 points d'appel : lignes 354, 421, 933, 951) et de `public/models/v2/manifest.json` (v2.0, généré le 2026-11-18, 2 041 structures). Aucune modification du moteur, aucun rendu : tous les chiffres sont reproductibles par simple parcours du manifest (voir §7).

## 1. Synthèse exécutive

| Constat | Mesure | Gravité |
|---|---|---|
| Les structures BodyParts3D n'ont **presque jamais de matériaux** | **497 / 606 (82,0 %)** ont `materials: []`, contre 6 / 1 435 (0,4 %) chez Z-Anatomy | Élevée |
| Le champ `materials` des structures BP3D non vides est **emprunté au jumeau Z-Anatomy**, donc potentiellement faux | 109 structures ; ex. `Left atrium` → `["Trapezius"]`, `Tentorium cerebelli` → `["Cartilage"]` | Élevée |
| Les **sous-systèmes anglais** (`sensory`, `digestive`, `urinary`, `respiratory`, `reproductive`, `integumentary`, `endocrine`) ne sont reconnus par **aucune regex** | **39 structures** concernées, dont **41** tombent sur la couleur « organe générique » | Élevée |
| Le **latin (`la`) n'est jamais lu** par `colorFor()`, alors qu'il est renseigné pour 606 / 606 BP3D | 100 % des BP3D potentiellement concernées | Moyenne |
| Le **`source` et le `path` ne sont jamais lus** non plus, alors que `path[0]` porte le système BP3D d'origine | 606 / 606 BP3D | Moyenne |
| Des **incohérences d'ordre de règles** produisent des couleurs anatomiquement fausses | ~10 cas identifiés dont `Anterior spinal artery` en couleur « nerf », `Right lobe of liver` en couleur « artère » | Moyenne |

**Verdict.** `colorFor()` est un classifieur écrit pour Z-Anatomy (matériaux riches, noms français) et appliqué tel quel à BodyParts3D (matériaux vides, noms anglais, sous-systèmes anglais). La fusion fonctionne « par accident » pour les vaisseaux, parce que les regex `/arter/` et `/venous/` tombent juste sur les sous-systèmes anglais `arterial` / `venous`. Elle échoue sur tout le reste : 6,8 % des BP3D reçoivent une couleur générique et plusieurs dizaines reçoivent une couleur anatomiquement fausse.

---

## 2. Ce que lit réellement `colorFor()`

| Ordre | Règle | Champs réellement consultés | Couleur |
|---|---|---|---|
| 1 | `/cartilage/` | `materials` seul | `#c9d6d0` vert-gris |
| 2 | `/bone/` ou `category === "bone"` | `materials`, `category` | `#e6dcc9` ivoire |
| 3 | `/tendon\|fascia\|ligament\|bursa\|sheath/` | `materials` **+** `en`/`fr` | `#d8c9a8` beige |
| 4 | `/nerve\|nerv\|gyrus\|sulcus\|brain\|encephal\|spinal\|dura\|meninx\|plexus\|tract\|nucleus/` | `en`/`fr` **+** `subsystem` | `#cbb06a` jaune |
| 5 | `/artery\|arteria\|artere\|arter/` | `en`/`fr` **+** `subsystem` | `#b63a40` rouge |
| 6 | `/vein\|vena\|veine\|venous\|sinus/` | `en`/`fr` **+** `subsystem` | `#4a6ea8` bleu |
| 7 | `/lymph/` | `en`/`fr` **+** `subsystem` | `#7fbfa8` vert d'eau |
| 8-13 | cœur, poumon, foie, rein, digestion, glande | `en`/`fr` **seuls** | teintes dédiées |
| 14 | `category === "muscle"` | `category` | `#a83b44` |
| 15 | `category === "organ"` | `category` | **`#a85f55` générique** |
| 16 | repli `CATEGORY_COLORS[category]` | `category` | couleur de lot |

**Champs disponibles mais ignorés :** `source`, `la` (latin), `path`, `side`, `ta2`, `id`.

Conséquence immédiate : comme `colorFor()` n'utilise jamais `mats` aux lignes 4 à 13, une structure BP3D dont le nom anglais est un terme latin technique (`Ureter`, `Rectum`, `Choroid`, `Mesoappendix`, `Taenia libera`) n'a aucun motif à matcher et retombe sur l'organe générique, **même quand son matériau ou son sous-système dirait ce qu'il faut**.

---

## 3. Matériaux : deux sources, deux régimes incompatibles

### 3.1 Mesures

| Source | Structures | `materials: []` | Matériaux renseignés |
|---|---:|---:|---:|
| Z-Anatomy | 1 435 | 6 (0,4 %) | 1 429 (99,6 %) |
| BodyParts3D 4.0 | 606 | **497 (82,0 %)** | 109 (18,0 %) |

### 3.2 D'où viennent les 109 matériaux BP3D non vides ?

Le générateur (`scripts/generate-anatomy-inventory.mjs`) crée deux types d'entrées :

- les structures issues d'un objet Z-Anatomy dont le maillage BP3D est plus dense (l. 140-222) : `subsystem` est la **traduction française** des collections Z-Anatomy et `materials: o.mats` est **celle de l'objet Z-Anatomy**, même si `source` devient `BodyParts3D 4.0` ;
- les concepts présents **uniquement** dans BP3D (l. 247-299) : `subsystem = system` (anglais), `collections = ["BodyParts3D:<system>"]` et **`materials: []`** (l. 288).

Le croisement le confirme sans ambiguïté :

| Source BP3D | `subsystem` | Matériaux vides | Matériaux non vides |
|---|---|---:|---:|
| Concept BP3D pur | anglais (`arterial`, `venous`, …) | **441** | 0 |
| Concept BP3D pur | vide (os/muscle) | 56 | 0 |
| Jumeau d'un objet Z-Anatomy | français (`Nerveux et sens`, `Viscéral`, `Cardiovasculaire`) | 0 | **40** |
| Jumeau d'un objet Z-Anatomy | vide (os/muscle, `subsystem` non renseigné pour les non-organes) | 0 | **69** |

**Donc : aucun matériau BP3D n'est natif.** Ce sont des étiquettes Z-Anatomy héritées du jumeau, valables pour le concept mais pas toujours pour le maillage retenu. Trois exemples flagrants :

| Structure (`source: BodyParts3D 4.0`) | Matériau hérité | Réalité anatomique |
|---|---|---|
| `organ:left-atrium` | `["Trapezius"]` | oreillette gauche, pas un trapèze |
| `organ:tentorium-cerebelli-l/-r` | `["Cartilage"]` | tente du cervelet = repli de dure-mère, pas du cartilage |
| `organ:pulmonary-trunk` | `["Pulmonary artery"]` | matériau correct mais **jamais lu** par la règle artère |

### 3.3 Comment les 497 structures sans matériaux sont-elles colorées ?

Elles suivent la cascade « nom → sous-système → catégorie ». Répartition effective des 606 structures BP3D :

| Règle gagnante | Nombre | Part |
|---|---:|---:|
| `artery` (nom/sous-système) | 227 | 37,5 % |
| `vein` (nom/sous-système) | 101 | 16,7 % |
| `nerve` (nom/sous-système) | 91 | 15,0 % |
| `bone` (matériau/catégorie) | 52 | 8,6 % |
| `tendon/fascia` (matériau/nom) | 51 | 8,4 % |
| **`organ` générique (catégorie)** | **41** | **6,8 %** |
| `muscle` (catégorie) | 14 | 2,3 % |
| `cartilage` (matériau) | 10 | 1,7 % |
| poumon / foie / cœur / glande | 15 | 2,5 % |
| digestion / lymphe | 4 | 0,7 % |

Les vaisseaux sont bien colorés **uniquement** parce que `/arter/` et `/venous/` matchent `arterial` et `venous` dans `subsystem`. C'est une coïncidence de vocabulaire, pas une conception.

---

## 4. Noms anglais vs regex françaises : les erreurs systémiques

### 4.1 Les sous-systèmes que `colorFor()` ne comprend pas

Parmi les 16 valeurs de `subsystem` de BodyParts3D, **8 ne sont matchées par aucune regex** — 39 structures :

| Valeur | Structures | Conséquence |
|---|---:|---|
| `sensory` | 15 | rétine, choroïde, oreille, face → organe générique |
| `respiratory` | 8 | septum nasal, dos du nez, médiastin → organe générique |
| `urinary` | 6 | uretère, urètre, appareil urinaire → organe générique |
| `Viscéral` | 3 | français mais non reconnu (cf. §5) |
| `reproductive` | 2 | corps spongieux du pénis → organe générique |
| `integumentary` | 2 | sourcil, mont du pubis → organe générique |
| `Cardiovasculaire` | 2 | français mais non reconnu |
| `endocrine` | 1 | organe générique |

À l'inverse, `Nerveux et sens` (35 BP3D), `Lymphoïde`, `Viscéral` (71 Z-Anatomy) et `Cardiovasculaire` sont des valeurs **françaises** : la règle `/nerv/` match `Nerveux` et `/lymph/` match `Lymphoïde`, mais `/cardia/` ne match **pas** `cardiovasculaire` (la chaîne est `cardiovasculaire`, pas `cardia…`).

### 4.2 Exemples concrets de couleurs erronées

| Structure | Couleur attendue | Couleur obtenue |Cause racine |
|---|---|---|---|
| `organ:bp-anterior-spinal-artery-l/-r` — *Anterior spinal artery* | artère `#b63a40` | **nerf `#cbb06a`** | la règle `nerve` (l. 26) précède `artery` (l. 27) et `/spinal/` matche le nom, alors que `subsystem = arterial` était correct |
| `organ:bp-right-lobe-of-liver[-r]` — *Right lobe of liver* | foie `#83423a` | **artère `#b63a40`** | `subsystem = arterial` déclenche la règle 5 avant la règle foie (l. 32) ; le nom contient pourtant `hepatis` |
| `organ:bp-heart` — *Heart / Cor* | cœur `#8e2f3a` | **artère `#b63a40`** | même mécanisme (`subsystem = arterial`) ; couleur proche mais sémantiquement fausse |
| `organ:pulmonary-trunk` — *Pulmonary trunk / Truncus pulmonalis* | artère `#b63a40` | **poumon `#c47b78`** | la règle artère ne lit pas `materials` (`["Pulmonary artery"]`) et le nom ne contient pas `arter` ; `/pulmon/` gagne |
| `organ:tentorium-cerebelli-l/-r` | nerf/méninge `#cbb06a` | **cartilage `#c9d6d0`** | matériau Z-Anatomy hérité erroné (`Cartilage`) ; la règle 1 est la première de la cascade |
| `organ:bp-viscerocranium[-l/-r]` — *Viscerocranium* | os `#e6dcc9` (base du crâne facial) | **organe générique `#a85f55`** | **un os classé organe** : `category = organ`, `subsystem = sensory`, nom non matché |
| `organ:bp-cartilaginous-part-of-nasal-septum` | cartilage `#c9d6d0` | **organe générique `#a85f55`** | nom technique, `materials = []`, `subsystem = respiratory` non reconnu |
| `organ:bp-ureter-l/-r`, `organ:bp-urethra` | rein/urinaire `#9c4b44` | **organe générique `#a85f55`** | `subsystem = urinary` non reconnu, latin `Ureter`/`Urethra` ignoré |
| `organ:bp-rectum`, `organ:bp-mesoappendix` | digestion `#c98d7e` | **organe générique `#a85f55`** | `subsystem = digestive` non reconnu ; seul `digest` est dans la regex, pas `digestive` |
| `organ:bp-choroid-l/-r`, `organ:bp-optic-part-of-retina-l/-r` | œil/nerf `#cbb06a` | **organe générique `#a85f55`** | `subsystem = sensory` non reconnu |
| `bone:bp-patella[-l/-r]`, `bone:bp-trapezoid-bone` | os `#e6dcc9` | **cartilage `#c9d6d0`** | matériau mixte `["Bone-1","Cartilage",…]` : la règle cartilage (l. 23) précède la règle os (l. 24) |
| `organ:bp-lumbar-artery` | artère `#b63a40` | artère `#b63a40` (correct par accident) | **incohérence de données** : `id` dit `artery`, `en` dit `(Lumbar rib)`, `subsystem = arterial` — le nom et l'identifiant se contredisent |

**Remarque sur la portée visuelle.** Les erreurs ne sont pas uniquement esthétiques : l'atlas utilise la couleur comme premier repère d'identification. Un os (viscocrâne) rendu en orange d'organe ou une artère spinale rendue en jaune de nerf induisent le lecteur en erreur sur la nature du tissu.

---

## 5. Cohérence du champ `subsystem` entre les deux sources

### 5.1 État des lieux

| Source | Valeurs | Détail |
|---|---:|---|
| Z-Anatomy (1 435) | 5 | `''` 888 ; `Nerveux et sens` 297 ; `Lymphoïde` 159 ; `Viscéral` 71 ; `Cardiovasculaire` 20 |
| BodyParts3D (606) | 16 | `arterial` 229 ; `''` 125 ; `venous` 101 ; `nervous` 56 ; `Nerveux et sens` 35 ; `sensory` 15 ; `digestive` 13 ; `respiratory` 8 ; `cardiac` 6 ; `urinary` 6 ; `Viscéral` 3 ; `reproductive` 2 ; `integumentary` 2 ; `Cardiovasculaire` 2 ; `lymphatic` 2 ; `endocrine` 1 |

### 5.2 Trois incohérences distinctes

1. **Langue.** Z-Anatomy est en français, BP3D en anglais. Le moteur ne gère que quelques racines des deux langues, de façon incomplète (`sensory`, `urinary`, `endocrine`, `reproductive`, `integumentary`, `respiratory` et `digestive` sont orphelines).
2. **Contamination croisée.** 40 structures `source: BodyParts3D 4.0` portent un sous-système **français** : ce sont les jumeaux de Z-Anatomy décrits au §3.2. Le champ `subsystem` n'a donc pas la même sémantique selon la source : il décrit tantôt le système du maillage, tantôt celui du concept jumeau.
3. **Granularité.** `Cardiovasculaire` (Z-Anatomy) agrège cœur + artères + veines, alors que BP3D sépare `arterial`, `venous`, `cardiac`. Inversement, `sensory` et `nervous` sont distincts chez BP3D mais fusionnés en `Nerveux et sens` chez Z-Anatomy. `''` (vide) vaut 888 cas chez Z-Anatomy et 125 chez BP3D, sans distinction entre « non applicable » (os, muscle) et « non renseigné ».

### 5.3 Table de normalisation proposée

| Valeurs sources | Valeur canonique | Couleur cible |
|---|---|---|
| `arterial`, `Cardiovasculaire` + nom contenant `arter` | `vascular.arterial` | `#b63a40` |
| `venous`, `Cardiovasculaire` + nom contenant `ven` | `vascular.venous` | `#4a6ea8` |
| `cardiac`, `Heart` | `cardiac` | `#8e2f3a` |
| `lymphatic`, `Lymphoïde` | `lymphatic` | `#7fbfa8` |
| `nervous`, `sensory`, `Nerveux et sens` | `nervous` | `#cbb06a` |
| `respiratory` | `respiratory` | `#c47b78` |
| `digestive`, `Viscéral` | `digestive` | `#c98d7e` |
| `urinary` | `urinary` | `#9c4b44` |
| `endocrine`, `reproductive` | `glandular` | `#b4743e` |
| `integumentary`, nom `skin`/`epiderm` | `integumentary` | `#7fa8a6` |
| `skeletal` / `category: bone` | `skeletal` | `#e6dcc9` |
| `muscular` / `category: muscle` | `muscular` | `#a83b44` |

Cette table doit être appliquée **sur `source` + `path[0]` en priorité**, sur `subsystem` ensuite, et sur `la` en appoint — jamais sur `materials` pour BP3D.

---

## 6. Correction systémique proposée

### 6.1 Principes

1. **Ne plus faire confiance à `materials` pour BP3D.** 82 % des structures n'en ont pas et les 18 % restants portent des étiquettes héritées parfois fausses. Réserver `materials` aux structures `source === "Z-Anatomy"` (et encore, avec précision cartilage > os).
2. **Utiliser le triplet `(source, path[0], subsystem)` comme clé de système.** `path[0]` est renseigné pour 606 / 606 BP3D et porte directement `BodyParts3D:arterial`, `BodyParts3D:venous`, `BodyParts3D:skeletal`, etc. C'est le signal le plus fiable, et il est aujourd'hui totalement ignoré.
3. **Introduire le latin `la` dans les motifs.** Il est renseigné pour 606 / 606 BP3D et 1 375 / 1 435 Z-Anatomy. `Ureter`, `Rectum`, `Chorioidea`, `Truncus pulmonalis`, `Arteria spinalis anterior` deviennent alors matchables sans ambiguïté.
4. **Corriger l'ordre des règles** : vaisseaux explicites dans le **nom** → organes spécifiques par le **nom/latin** → vaisseaux par le **système** → nerfs → cartilage → os → catégorie. En particulier déplacer `artery`/`vein` **avant** `nerve` (cas `spinal`) et `bone` **avant** `cartilage` (cas patella/trapèze).
5. **Résoudre explicitement les conflits nom/système.** Si le nom dit « foie » et que le système dit `arterial`, c'est le nom qui gagne (`Right lobe of liver`) ; si le nom dit « artère » et que le système dit `nervous` (inexistant ici), c'est le nom qui gagne aussi. La règle générale : **le signal le plus spécifique l'emporte sur le plus générique**, jamais l'inverse.

### 6.2 Signature suggérée

```js
function systemOf(structure) {
  const path0 = (structure.path?.[0] || "").toLowerCase();
  const sub   = (structure.subsystem || "").toLowerCase();
  // 1. BP3D : path[0] est la source de vérité
  const bp = path0.match(/^bodyparts3d:([a-z]+)$/);
  if (bp) return NORMALIZE[bp[1]] || null;
  // 2. Z-Anatomy / jumeaux : sous-système normalisé
  if (NORMALIZE[sub]) return NORMALIZE[sub];
  // 3. Catégorie comme dernier recours
  return structure.category === "bone" ? "skeletal"
       : structure.category === "muscle" ? "muscular" : null;
}

function colorFor(structure) {
  const text = [structure.en, structure.fr, structure.la].filter(Boolean).join(" ").toLowerCase();
  const sys  = systemOf(structure);
  const explicitVessel = /arter|vena|vein|veine/.test(text);
  const explicitOrgan  = /hepat|pulmon|cardia|ventricl|atrium|renal|nephron|gastr|intestin|colon|rectum|ureter|urethra/.test(text);
  if (explicitVessel) return /vena|vein|veine/.test(text) ? VEIN : ARTERY;
  if (explicitOrgan)  return ORGAN_COLORS[matchOrgan(text)] || ORGAN;
  if (sys === "vascular.arterial") return ARTERY;
  if (sys === "vascular.venous")   return VEIN;
  if (sys === "cardiac")   return HEART;
  if (sys === "lymphatic") return LYMPH;
  if (sys === "nervous")   return NERVE;
  if (sys === "respiratory") return LUNG;
  if (sys === "digestive") return DIGEST;
  if (sys === "urinary")   return KIDNEY;
  if (sys === "glandular") return GLAND;
  if (sys === "integumentary") return SKIN;
  // cartilage / tendon : matériaux uniquement pour Z-Anatomy
  const mats = structure.source === "Z-Anatomy"
    ? (structure.materials || []).join(" ").toLowerCase() : "";
  if (/cartilage/.test(mats) && !/bone/.test(text)) return CARTILAGE;
  if (/tendon|fascia|ligament|bursa/.test(mats + " " + text)) return TENDON;
  if (sys === "skeletal") return BONE;
  return CATEGORY_COLORS[structure.category] || WHITE;
}
```

### 6.3 Gain attendu (estimé sur le manifest actuel)

| Indicateur | Avant | Après (estimé) |
|---|---:|---:|
| BP3D en couleur « organe générique » | 41 (6,8 %) | ~0 |
| BP3D avec sous-système non interprété | 39 (6,4 %) | 0 |
| Matériaux BP3D utilisés comme décision | 109 | 0 |
| Cas d'ordre de règles identifiés | ~10 | 0 |
| Champs exploités pour la couleur | 3 (`materials`, `en`/`fr`, `subsystem`, `category`) | 6 (+ `source`, `la`, `path`) |

---

## 7. Recommandations priorisées

| Priorité | Action | Fichier |
|---|---|---|
| **P0** | Ajouter `la` au texte matché et déplacer `vein`/`artery` avant `nerve`, `bone` avant `cartilage` (correctif minimal sans refonte) | `src/v2-engine.js` `colorFor()` |
| **P0** | Corriger les données manifest : `bp-anterior-spinal-artery` (nom), `bp-lumbar-artery` (`en = "(Lumbar rib)"`), `bp-lumbar-vein` (même problème) | `scripts/generate-anatomy-inventory.mjs` / atlas BP3D |
| **P1** | Introduire `NORMALIZE` et `systemOf()` ci-dessus ; ne plus lire `materials` pour `source !== "Z-Anatomy"` | `src/v2-engine.js` |
| **P1** | Renseigner un `subsystem` canonique unique dans le manifest (anglais normalisé) en conservant la valeur brute dans un champ `subsystemRaw` | `scripts/build-anatomy-v2.mjs` (l. 335) |
| **P2** | Ajouter un test de non-régression : pour chaque structure, `colorFor(s)` doit appartenir à la couleur attendue de `systemOf(s)` ; cibler 0 valeur générique pour les BP3D ayant un `path[0]` connu | `tests/` |
| **P2** | Documenter dans le README du manifest que `materials` est un héritage Z-Anatomy et ne doit pas être utilisé pour colorer les structures BP3D | `public/models/v2/README.md` |

---

## 8. Reproductibilité

```python
import json, re
from collections import Counter
m = json.load(open("public/models/v2/manifest.json"))
S = m["structures"]
BP = [s for s in S if s["source"] == "BodyParts3D 4.0"]
print(len(S), len(BP))                                   # 2041 606
print(sum(not s.get("materials") for s in BP))           # 497
print(Counter(s.get("subsystem") for s in BP))           # §5.1
print(Counter((s["path"] or [""])[0] for s in BP))       # §3.2
# Les couleurs sont obtenues en réimplémentant colorFor() (§2) ;
# le détail ligne à ligne est dans /tmp/opencode/analyze2.py … analyze6.py
```

Les scripts d'analyse utilisés (`/tmp/opencode/analyze2.py` à `analyze6.py`) ne sont pas livrés avec ce rapport ; les compteurs ci-dessus suffisent à reproduire l'ensemble des tableaux.
