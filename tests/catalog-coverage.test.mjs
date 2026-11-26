import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const root = new URL("..", import.meta.url).pathname;
const catalog = JSON.parse(readFileSync(root + "docs/models/catalog.json"));
const keys = new Set(catalog.map((e) => e.key));
const FACIAL = ["frontalis", "orbicularis_oculi_l", "orbicularis_oculi_r",
  "masseter_l", "masseter_r", "orbicularis_oris"];

for (const key of FACIAL) {
  assert.ok(keys.has(key), `muscle facial absent du catalogue : ${key}`);
  assert.equal(catalog.find((e) => e.key === key).system, "muscles", `${key} mal classé`);
}
const duplicates = catalog.map((e) => e.key).filter((k, i, a) => a.indexOf(k) !== i);
assert.deepEqual(duplicates, [], "clés de catalogue dupliquées");

const FEMALE_ONLY = ["uterus", "ovary", "fallopian", "vagina", "breast"];
for (const file of ["skin", "muscles", "skeleton", "organs", "arteries", "veins", "nerves"]) {
  const raw = readFileSync(root + `docs/models/male/${file}.glb`);
  assert.equal(raw.toString("ascii", 0, 4), "glTF", `${file} n'est pas un GLB`);
  const len = raw.readUInt32LE(12);
  const doc = JSON.parse(raw.subarray(20, 20 + len).toString("utf8").replace(/\0+$/, ""));
  const names = doc.nodes.filter((n) => n.mesh !== undefined).map((n) => n.name || "");
  const repeated = names.filter((n, i, a) => n && a.indexOf(n) !== i);
  assert.deepEqual([...new Set(repeated)], [], `noms de nœuds dupliqués dans ${file}`);
  for (const organ of FEMALE_ONLY) {
    assert.ok(!names.some((n) => n.toLowerCase().includes(organ)),
      `organe féminin présent dans ${file} : ${organ}`);
  }
}
console.log("PASS couverture du catalogue et unicité du modèle masculin");
