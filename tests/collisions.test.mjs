import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { spawnSync } from "node:child_process";

/* Test de non-régression des collisions : exécute le checker et échoue si
 * des structures traversent la peau ou se doublent. */
const root = path.resolve(import.meta.dirname, "..");
const log = path.join(root, "docs", "analyses", "collisions.log");
const result = spawnSync(process.execPath, [path.join(root, "scripts", "check-collisions.mjs")], {
  env: { ...process.env, COLLISIONS_LOG: log },
  encoding: "utf8",
});
const findings = fs.existsSync(log)
  ? fs.readFileSync(log, "utf8").trim().split("\n").filter(Boolean).map((l) => JSON.parse(l))
  : [];
console.log(`Collisions détectées : ${findings.length}`);
for (const f of findings.slice(0, 20)) console.log(`  ${f.type}: ${f.fr}`);
assert.equal(
  findings.length,
  0,
  `${findings.length} collision(s) — voir docs/analyses/collisions.md et ${log}`,
);
assert.equal(result.status, 0, "le checker de collisions a échoué");
