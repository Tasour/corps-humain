"""Exporte les structures Z-Anatomy utilisées par l'atlas CORPS.

Z-Anatomy est distribué comme un modèle Blender (Z-Anatomy/Startup.blend).
Ce script extrait les maillages absents de BodyParts3D, applique la conversion
de coordonnées Blender (Z-up) vers l'application (Y-up, avant en +Z), calcule
des normales lissées et écrit un binaire compact lisible par
scripts/build-anatomy-models.mjs.

Prérequis : Blender 3.6+ (testé avec 3.6.23), aucun module externe.

Usage :
    blender -b /chemin/vers/Z-Anatomy/Startup.blend \
        --python scripts/export-zanatomy.py

Variables d'environnement :
    ZANATOMY_OUT   dossier de sortie (défaut : zanatomy-export, relatif au dossier courant)

Sortie :
    zanatomy.json  manifeste (offsets, bornes, nombres de sommets/indices)
    zanatomy.bin   positions Float32, normales Float32, indices Uint32

Source : https://github.com/Z-Anatomy/Models-of-human-anatomy
Licence : Z-Anatomy, CC BY-SA 4.0
"""

import bpy
import json
import os
import struct
from mathutils import Matrix, Vector

OUT = os.environ.get("ZANATOMY_OUT", "zanatomy-export")
os.makedirs(OUT, exist_ok=True)

# Notre entité -> objets Z-Anatomy (gauche et droite fusionnées).
ENTITIES = {
    "thyroide": ["Thyroid gland"],
    "dorsaux": [
        "Latissimus dorsi muscle.l",
        "Latissimus dorsi muscle.r",
    ],
    "abdominaux": [
        "Rectus abdominis muscle.l",
        "Rectus abdominis muscle.r",
    ],
    "obliques": [
        "External abdominal oblique muscle.l",
        "External abdominal oblique muscle.r",
    ],
}

# Blender est Z-up, l'application est Y-up avec l'avant en +Z.
# (x, y, z) Blender -> (x, z, -y) application.
ROT = Matrix.Rotation(-1.5707963267948966, 4, "X")

depsgraph = bpy.context.evaluated_depsgraph_get()
chunks = []
chunks_len = 0
manifest = {
    "version": "Z-Anatomy",
    "source": "https://github.com/Z-Anatomy/Models-of-human-anatomy",
    "license": "Z-Anatomy, CC BY-SA 4.0",
    "bin": "zanatomy.bin",
    "entities": {},
}


def push(buf):
    global chunks_len
    chunks.append(buf)
    chunks_len += len(buf)


for entity_id, names in ENTITIES.items():
    positions = []
    normals = []
    indices = []
    vertex_base = 0

    for name in names:
        obj = bpy.data.objects.get(name)
        if obj is None:
            raise SystemExit("Objet introuvable : " + name)
        if obj.type != "MESH":
            raise SystemExit("Objet non maillé : " + name)

        evaluated = obj.evaluated_get(depsgraph)
        mesh = evaluated.to_mesh()
        mesh.calc_loop_triangles()

        world = ROT @ evaluated.matrix_world
        local_positions = [world @ v.co for v in mesh.vertices]
        local_normals = [Vector((0.0, 0.0, 0.0)) for _ in mesh.vertices]

        for tri in mesh.loop_triangles:
            a, b, c = tri.vertices
            pa, pb, pc = local_positions[a], local_positions[b], local_positions[c]
            face = (pb - pa).cross(pc - pa)
            for vi in (a, b, c):
                local_normals[vi] += face

        for n in local_normals:
            if n.length > 1e-12:
                n.normalize()
            else:
                n[:] = (0.0, 1.0, 0.0)

        for p in local_positions:
            positions.extend((p.x, p.y, p.z))
        for n in local_normals:
            normals.extend((n.x, n.y, n.z))

        for tri in mesh.loop_triangles:
            a, b, c = tri.vertices
            indices.extend((a + vertex_base, b + vertex_base, c + vertex_base))

        vertex_base += len(mesh.vertices)
        vertex_total = len(mesh.vertices)
        triangle_total = len(mesh.loop_triangles)
        evaluated.to_mesh_clear()
        print("EXPORT", entity_id, name, vertex_total, "verts", triangle_total, "tris")

    while chunks_len % 4:
        push(b"\x00")
    positions_offset = chunks_len
    push(struct.pack("<%df" % len(positions), *positions))

    while chunks_len % 4:
        push(b"\x00")
    normals_offset = chunks_len
    push(struct.pack("<%df" % len(normals), *normals))

    while chunks_len % 4:
        push(b"\x00")
    indices_offset = chunks_len
    push(struct.pack("<%dI" % len(indices), *indices))

    vertex_count = vertex_base
    min_b = [min(positions[i::3]) for i in range(3)]
    max_b = [max(positions[i::3]) for i in range(3)]
    manifest["entities"][entity_id] = {
        "positions": positions_offset,
        "normals": normals_offset,
        "indices": indices_offset,
        "vertexCount": vertex_count,
        "indexCount": len(indices),
        "bounds": {"min": min_b, "max": max_b},
    }

with open(os.path.join(OUT, "zanatomy.json"), "w") as f:
    json.dump(manifest, f)
with open(os.path.join(OUT, "zanatomy.bin"), "wb") as f:
    f.write(b"".join(chunks))

print("DONE", os.path.join(OUT, "zanatomy.json"))
