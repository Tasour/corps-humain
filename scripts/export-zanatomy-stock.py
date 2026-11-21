"""Exporte tous les maillages Z-Anatomy stock depuis Startup.blend.

Usage :
    BLENDER -b Startup.blend --python scripts/export-zanatomy-stock.py

Variables :
    STOCK_OUT        dossier de sortie (défaut : zanatomy-export-stock)
    STOCK_EXCLUDE    motifs d'exclusion séparés par des virgules

Aucune géométrie n'est créée : on exporte uniquement les objets MESH présents.
"""

import bpy
import json
import os
import struct
from mathutils import Matrix, Vector

# Z-up (Blender) -> Y-up (atlas), rotation propre qui preserve le winding.
ROT = Matrix.Rotation(-1.5707963267948966, 4, "X")

OUT = os.environ.get("STOCK_OUT", "zanatomy-export-stock")
os.makedirs(OUT, exist_ok=True)

EXCLUDE_DEFAULT = (
    "inner ear,oreille interne,brainder,white matter,substance blanche,"
    "kidney,rein,renal"
)
EXCLUDE = [m.strip().lower() for m in os.environ.get("STOCK_EXCLUDE", EXCLUDE_DEFAULT).split(",") if m.strip()]

objects = []
excluded = []
skipped = []
for obj in bpy.data.objects:
    if obj.type != "MESH":
        continue
    name = obj.name
    lower = name.lower()
    if any(m in lower for m in EXCLUDE):
        excluded.append({"name": name, "reason": "licence NC ou sans licence amont"})
        continue
    if lower.endswith((".j", ".g")):
        skipped.append({"name": name, "reason": "étiquette texte Z-Anatomy"})
        continue
    mesh = obj.data
    if len(mesh.polygons) <= 1:
        skipped.append({"name": name, "reason": "marqueur d'insertion ≤ 1 polygone"})
        continue
    objects.append(obj)

objects.sort(key=lambda o: o.name)
bin_path = os.path.join(OUT, "stock.bin")
manifest = {
    "version": "Z-Anatomy stock",
    "source": "https://github.com/Z-Anatomy/Models-of-human-anatomy",
    "license": "CC BY-SA 4.0",
    "bin": "stock.bin",
    "excluded": excluded,
    "skipped": skipped,
    "objects": {},
}

def pad4(out):
    while out.tell() % 4:
        out.write(b"\x00")

with open(bin_path, "wb") as out:
    for obj in objects:
        mesh = obj.data
        world = ROT @ obj.matrix_world
        verts = [world @ v.co for v in mesh.vertices]
        pad4(out)
        p0 = out.tell()
        for v in verts:
            out.write(struct.pack("<3f", v.x, v.y, v.z))
        mesh.calc_loop_triangles()
        triangles = [tuple(tri.vertices) for tri in mesh.loop_triangles]
        # Normales de sommets pondérées par l'aire des faces (identique à
        # export-zanatomy-all.py) : indispensable pour l'audit face/sommet.
        normals = [Vector((0.0, 0.0, 0.0)) for _ in verts]
        coords = [(v.x, v.y, v.z) for v in verts]
        for a, b, c in triangles:
            pa, pb, pc = Vector(coords[a]), Vector(coords[b]), Vector(coords[c])
            face = (pb - pa).cross(pc - pa)
            for vi in (a, b, c):
                normals[vi] += face
        for n in normals:
            if n.length > 1e-12:
                n.normalize()
            else:
                n[:] = (0.0, 1.0, 0.0)
        pad4(out)
        n0 = out.tell()
        for n in normals:
            out.write(struct.pack("<3h", int(max(-1, min(1, n.x)) * 32767), int(max(-1, min(1, n.y)) * 32767), int(max(-1, min(1, n.z)) * 32767)))
        pad4(out)
        i0 = out.tell()
        itype = "u32" if len(verts) > 65535 else "u16"
        fmt = "<3I" if itype == "u32" else "<3H"
        for a, b, c in triangles:
            out.write(struct.pack(fmt, a, b, c))
        manifest["objects"][obj.name] = {
            "collection": obj.users_collection[0].name if obj.users_collection else "",
            "positions": p0,
            "normals": n0,
            "indices": i0,
            "vertexCount": len(verts),
            "indexCount": len(mesh.loop_triangles) * 3,
            "indexType": itype,
            "bounds": {
                "min": [min(c[i] for c in coords) for i in range(3)],
                "max": [max(c[i] for c in coords) for i in range(3)],
            },
        }

with open(os.path.join(OUT, "stock.json"), "w", encoding="utf8") as f:
    json.dump(manifest, f, ensure_ascii=False, indent=1)

print(f"[stock] {len(objects)} objets exportés, {len(excluded)} exclus, {len(skipped)} ignorés")
