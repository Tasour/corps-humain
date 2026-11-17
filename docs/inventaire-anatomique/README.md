# Inventaire anatomique 3D complet

Ce dossier contient l'inventaire exhaustif des organes, os et muscles de Z-Anatomy,
avec pour chaque structure le meilleur modèle 3D disponible.

- `rapport.md` — rapport lisible : méthode, statistiques et tableaux par catégorie.
- `structures.json` — données complètes (2 202 maillages individuels, 1 251
  structures canoniques) : noms TA2 anglais/latin/français, collections d'origine,
  maillage Z-Anatomy, concept BodyParts3D éventuel, meilleur modèle et alternatives.
  L'inventaire est l'**union** de Z-Anatomy et de BodyParts3D ; les structures
  propres à BodyParts3D sont signalées par `onlyInBodyParts3D: true`.

## Régénération

Les fichiers sont produits par deux scripts, à partir de l'export Blender de
Z-Anatomy, du fichier `TA2.csv` du dépôt Z-Anatomy et des données BodyParts3D
déjà converties du dépôt human-atlas :

```bash
# 1. Dump de tous les maillages Z-Anatomy (Blender 3.6+)
blender -b /chemin/vers/Z-Anatomy/Startup.blend \
  --python scripts/dump-zanatomy-objects.py

# 2. Inventaire JSON
ZANATOMY_OBJECTS=zanatomy-objects.json \
TA2_CSV=/chemin/vers/Z-Anatomy/TA2.csv \
ANATOMY_SOURCE=/chemin/vers/human-atlas/public/models \
node scripts/generate-anatomy-inventory.mjs

# 3. Rapport Markdown
node scripts/generate-anatomy-report.mjs
```

Le dump intermédiaire `zanatomy-objects.json` est volumineux et n'est pas versionné.
