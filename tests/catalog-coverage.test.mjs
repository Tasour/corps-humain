import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const root = new URL("..", import.meta.url).pathname;
const catalog = JSON.parse(readFileSync(root + "docs/models/catalog.json"));
const keys = new Set(catalog.map((e) => e.key));
const FACIAL = ["frontalis", "orbicularis_oculi_l", "orbicularis_oculi_r",
  "masseter_l", "masseter_r", "orbicularis_oris"];

for (const key of FACIAL) {
  assert.ok(keys.has(key), `muscle facial absent du catalogue : ${key}`);
  const entry = catalog.find((e) => e.key === key);
  assert.equal(entry.system, "muscles", `${key} n'est pas classé muscles`);
}

const duplicates = catalog.map((e) => e.key)
  .filter((k, i, a) => a.indexOf(k) !== i);
assert.deepEqual(duplicates, [], "clés de catalogue dupliquées");

for (const sex of ["male", "female"]) {
  const raw = readFileSync(root + `docs/models/corps-${sex}.glb`);
  const len = raw.readUInt32LE(12);
  const doc = JSON.parse(raw.subarray(20, 20 + len).toString("utf8").replace(/\0+$/, ""));
  const nodeNames = doc.nodes.filter((n) => n.mesh !== undefined).map((n) => n.name || "");
  const repeated = nodeNames.filter((n, i, a) => n && a.indexOf(n) !== i);
  assert.deepEqual([...new Set(repeated)], [], `noms de nœuds dupliqués chez ${sex}`);
  const femaleOnly = ["uterus", "ovary_l", "ovary_r", "fallopian_tubes", "vagina", "breast_l", "breast_r"];
  const maleOnly = ["prostate", "reproductive"];
  for (const organ of sex === "male" ? femaleOnly : maleOnly) {
    assert.ok(!nodeNames.some((n) => n.toLowerCase().includes(organ)),
      `organe de l'autre sexe présent chez ${sex} : ${organ}`);
  }
}
console.log("PASS couverture du catalogue et sexes");
