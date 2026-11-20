# Jeu de données v2 — atlas 3D complet

Le jeu de données v2 est la matière première de la nouvelle architecture
(voir `docs/architecture-performance.md`). Il contient **2 107 structures
anatomiques individuelles**, chacune en **3 niveaux de détail**, contre 47
structures / 1 niveau dans la version actuelle.

## Emplacement

```
public/models/v2/
  manifest.json          index des structures + offsets des 3 LOD
  bone.low.bin.gz        os, vue d'ensemble (seuls les .gz sont versionnés)
  bone.medium.bin.gz     os, vue d'un système
  bone.high.bin.gz       os, structure isolée
  muscle.*.bin.gz        idem pour les muscles
  organ.*.bin.gz         idem pour les organes
  skin.*.bin.gz          peau (commune)
  README.md              attributions CC BY
```

## Format binaire

Identique à `anatomy.bin` pour rester compatible avec le chargeur Three.js :

- positions : `Float32Array` (x, y, z) en mètres, repère Y-up ;
- normales : `Int16Array` normalisées (x, y, z) ;
- indices : `Uint16Array` ou `Uint32Array` selon le nombre de sommets.

Chaque structure possède trois enregistrements dans le manifeste :

```json
"lod": {
  "low":    { "positions": 1234, "normals": 5678, "indices": 9012,
              "vertexCount": 120, "indexCount": 900, "indexType": "u16",
              "bounds": { "min": [...], "max": [...] } },
  "medium": { ... },
  "high":   { ... }
}
```

## Niveaux de détail

| Niveau | Cible | Usage |
|---|---:|---|
| `low` | 300 triangles | vue corps entier, chargée au démarrage |
| `medium` | 1 500 triangles | vue d'un système |
| `high` | 12 000 triangles | structure isolée / zoom |

La simplification utilise `meshoptimizer` avec `LockBorder`, puis un repli
sans contrainte de bord quand le maillage possède trop de frontières libres
(méninges, enveloppes, etc.). Les structures déjà en dessous de la cible ne
sont pas simplifiées.

## Poids

| Catégorie | low gz | medium gz | high gz |
|---|---:|---:|---:|
| Os | 2,3 Mo | 4,8 Mo | 11,3 Mo |
| Muscles | 2,8 Mo | 8,9 Mo | 22,6 Mo |
| Organes | 9,8 Mo | 15,9 Mo | 28,2 Mo |
| Peau | < 0,1 Mo | < 0,1 Mo | 0,2 Mo |
| **Total** | **14,9 Mo** | **29,6 Mo** | **62,3 Mo** |

Seul le niveau `low` est nécessaire au démarrage. Les niveaux supérieurs sont
chargés à la demande, par catégorie.

## Structures exclues

95 concepts sont conservés dans l'inventaire mais **exclus du jeu de données de
rendu** (`excludedAggregates: 95`) :

- les **agrégats « région / système »** de plus de 20 pièces (`Corps humain`,
  `Tronc`, `Système squelettique`, `Membre supérieur gauche`…) ;
- les **catégories morphologiques génériques** (`os plat`, `os court`,
  `os long`, `os irrégulier`, `os sésamoïde`, `fascia engainant`) qui ne
  désignent pas une structure unique ;
- les **régions génériques** (`abdomen`, `dos de l'abdomen`, `cou`, `bassin`,
  `tronc`) qui apparaissaient en double dans la liste sans être des structures ;
- la **peau de BodyParts3D** (`skin`, `skin appendages`) : c'est une enveloppe
  corporelle complète qui recouvrait tout le modèle en orange et doublait le
  lot `skin` dédié.

Sans ces exclusions, le rendu affichait une enveloppe orangée sur tout le corps
et des doublons de structures déjà présentes individuellement.

## Régénération

```bash
# 1. Exporter tous les maillages Z-Anatomy référencés par l'inventaire
cd /home/tasour/corps-humain
INVENTORY_JSON=docs/inventaire-anatomique/structures.json \
ZANATOMY_OUT=zanatomy-export \
blender -b /chemin/vers/Z-Anatomy/Startup.blend \
  --python scripts/export-zanatomy-all.py

# 2. Construire les 3 LOD et les chunks
ANATOMY_SOURCE=/chemin/vers/human-atlas/public/models npm run models:v2
```

`zanatomy-export/` et `zanatomy-objects.json` sont ignorés par Git (fichiers
intermédiaires volumineux). Les fichiers de `public/models/v2/` sont, eux,
versionnés car nécessaires à l'application.

## Licences

BodyParts3D CC BY 4.0 + Z-Anatomy CC BY-SA 4.0 → jeu combiné **CC BY-SA 4.0**.
Voir `public/models/v2/README.md`.

## Identifiants source (BENCH-008, 20 novembre 2026)

Chaque entrée du manifeste porte désormais un `source_id` immuable, dérivé d'une clé
de la source d'origine et non du nom d'affichage :

| Priorité | Clé | Forme |
|---|---|---|
| 1 | Objet Z-Anatomy | `za:<nom d'objet>` |
| 2 | Concept BodyParts3D | `bp:<FMA>` |
| 3 | Code TA2 | `ta2:<code>` |
| 4 | Nom canonique | `canonical:<nom>` (dernier recours) |

Le côté est suffixé `:l` ou `:r` quand il est explicite. Les 2 009 identifiants
sont uniques. La dérivation vit dans `scripts/source-id.mjs` et est partagée par
le rebuild (`build-anatomy-v2.mjs`) et le post-traitement (`add-source-ids.mjs`) :
un rebuild ne peut donc pas faire dériver ces identifiants.

`engine.resolveId()` accepte l'ID d'affichage **ou** le `source_id`. Les deep links
`?vue=…`, le catalogue des vues et les tours guidés l'utilisent : un lien partagé
reste valable même si le libellé d'une structure change.

Le post-traitement est idempotent et atomique : `npm run models:source-ids`.
Vérification : `npm run test:source-id` et `docs/analyses/source-id-2026-11-20.json`.

## Séquence de rebuild canonique (21 novembre 2026)

Le rebuild reproductible suit **exactement** cet ordre :

```bash
npm run sources:check
ANATOMY_SOURCE=/home/tasour/.cache/corps-sources/human-atlas/public/models npm run models:v2
npm run models:source-ids
npm run models:fiches
npm run models:licences
npm run pages:generate
npm run check:modele
```

Les corrections de composantes (`docs/analyses/revue-visuelle/fixes-composantes.json`) sont
appliquées **une seule fois**, par `build-anatomy-v2.mjs`, avant la simplification LOD.
`npm run revue:composantes` est un outil historique de patch : **ne pas l'appliquer après un
rebuild canonique**, sinon les chunks muscle ou organe divergent.

Vérification de reproductibilité : `npm run rebuild:verify` (deux builds dans des dossiers
temporaires, comparaison SHA-256 de 14 fichiers, date de manifeste normalisée). Résultat
consigné dans `docs/analyses/rebuild-verification.json`. Depuis un worktree, renseigner
`SOURCES_ROOT=/home/tasour/corps-humain` pour que `sources:check` retrouve les empreintes BP3D.
