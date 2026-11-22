"""Compte les sommets dont la somme des poids est presque nulle."""
import bpy

total = 0
bad_total = 0
for ob in bpy.data.objects:
    if ob.type != "MESH":
        continue
    total += len(ob.data.vertices)
    bad = 0
    for v in ob.data.vertices:
        if sum(g.weight for g in v.groups) < 0.1:
            bad += 1
    if bad:
        bad_total += bad
        print("ORPHANS", ob.name, bad, "/", len(ob.data.vertices))
print("TOTAL vertices", total, "orphans", bad_total)
