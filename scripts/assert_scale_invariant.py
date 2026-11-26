#!/usr/bin/env python3
"""Invariant de repère : la peau masculine est en mètres, Y-up, pieds au sol.

Le modèle n'a plus de GLB combiné ni de rig séparé : la vérification porte sur
les bornes des accesseurs du GLB de peau publié.
"""
import json
import os
import struct

ROOT = os.path.dirname(os.path.dirname(__file__))
PATH = f"{ROOT}/docs/models/male/skin.glb"

with open(PATH, "rb") as f:
    assert f.read(4) == b"glTF", "magic GLB absent"
    version, total = struct.unpack("<II", f.read(8))
    assert version == 2 and total == os.path.getsize(PATH), "en-tête GLB incohérent"
    length, ctype = struct.unpack("<II", f.read(8))
    doc = json.loads(f.read(length).decode("utf-8").rstrip(" "))

accessors = doc["accessors"]
bornes = [a for a in accessors if "min" in a and "max" in a]
assert len(bornes) >= 250, f"bornes d'accesseurs insuffisantes : {len(bornes)}"
top = max(a["max"][1] for a in bornes)
bottom = min(a["min"][1] for a in bornes)
assert 1.70 <= top <= 1.76, f"haut du corps hors repère : {top:.4f} m"
assert -0.02 <= bottom <= 0.02, f"pieds hors sol : {bottom:.4f} m"
print(f"[invariant] peau masculine : {len(bornes)} bornes, Y {bottom:.4f}..{top:.4f} m — OK")
