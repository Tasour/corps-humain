"""Exporte TOUS les maillages Z-Anatomy référencés dans l'inventaire CORPS.

Complément de export-zanatomy.py (qui ne sortait que 4 structures) : ce script
écrit chaque objet dans un binaire unique avec un manifeste d'offsets. Il est
consommé par scripts/build-anatomy-v2.mjs pour fabriquer le jeu de données
multi-résolution.

Prérequis : Blender 3.6+ (testé 3.6.23).

Usage :
    blender -b /chemin/vers/Z-Anatomy/Startup.blend \
        --python scripts/export-zanatomy-all.py

Variables d'environnement :
    INVENTORY_JSON  inventaire (défaut : docs/inventaire-anatomique/structures.json)
    ZANATOMY_OUT    dossier de sortie (défaut : zanatomy-export)
"""

import bpy
import json
import os
import struct
from mathutils import Matrix, Vector

INVENTORY = os.environ.get(
    "INVENTORY_JSON", "docs/inventaire-anatomique/structures.json"
)
OUT = os.environ.get("ZANATOMY_OUT", "zanatomy-export")
os.makedirs(OUT, exist_ok=True)

with open(INVENTORY) as f:
    inventory = json.load(f)
names = sorted(
    {
        entry["object"]
        for group in inventory["categories"].values()
        for entry in group
        if entry.get("object")
    }
)

# Blender Z-up -> application Y-up, avant en +Z.
ROT = Matrix.Rotation(-1.5707963267948966, 4, "X")
depsgraph = bpy.context.evaluated_depsgraph_get()

manifest = {
    "version": "Z-Anatomy all",
    "source": "https://github.com/Z-Anatomy/Models-of-human-anatomy",
    "license": "CC BY-SA 4.0",
    "bin": "zanatomy-all.bin",
    "objects": {},
}

path = os.path.join(OUT, manifest["bin"])
with open(path, "wb") as out:
    for index, name in enumerate(names):
        obj = bpy.data.objects.get(name)
        if obj is None or obj.type != "MESH":
            print("SKIP", name)
            continue
        evaluated = obj.evaluated_get(depsgraph)
        mesh = evaluated.to_mesh()
        mesh.calc_loop_triangles()
        world = ROT @ evaluated.matrix_world

        coords = [world @ v.co for v in mesh.vertices]
        normals = [Vector((0.0, 0.0, 0.0)) for _ in mesh.vertices]
        for tri in mesh.loop_triangles:
            a, b, c = tri.vertices
            face = (coords[b] - coords[a]).cross(coords[c] - coords[a])
            for vi in (a, b, c):
                normals[vi] += face
        for n in normals:
            if n.length > 1e-12:
                n.normalize()
            else:
                n[:] = (0.0, 1.0, 0.0)

        positions = []
        norm_data = []
        for p, n in zip(coords, normals):
            positions.extend((p.x, p.y, p.z))
            norm_data.extend((n.x, n.y, n.z))
        indices = []
        for tri in mesh.loop_triangles:
            a, b, c = tri.vertices
            indices.extend((a, b, c))

        # Le fichier est ouvert en binaire ; on écrit les trois blocs à la suite.
        pos_offset = out.tell()
        out.write(struct.pack("<%df" % len(positions), *positions))
        norm_offset = out.tell()
        out.write(struct.pack("<%df" % len(norm_data), *norm_data))
        idx_offset = out.tell()
        out.write(struct.pack("<%dI" % len(indices), *indices))

        vertex_count = len(mesh.vertices)
        mn = [min(positions[i::3]) for i in range(3)]
        mx = [max(positions[i::3]) for i in range(3)]
        manifest["objects"][name] = {
            "positions": pos_offset,
            "normals": norm_offset,
            "indices": idx_offset,
            "vertexCount": vertex_count,
            "indexCount": len(indices),
            "bounds": {"min": mn, "max": mx},
        }
        evaluated.to_mesh_clear()
        if (index + 1) % 100 == 0:
            print("PROGRESS", index + 1, "/", len(names))

with open(os.path.join(OUT, "zanatomy-all.json"), "w") as f:
    json.dump(manifest, f)

print("DONE", len(manifest["objects"]), "objects ->", path)
