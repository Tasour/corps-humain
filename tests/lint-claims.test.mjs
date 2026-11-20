import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { spawnSync } from "node:child_process";

/* BENCH-007 — le lint doit réussir sur le dépôt et échouer sur une assertion
 * clinique injectée, tout en acceptant une formulation niée. */

const racine = path.resolve(import.meta.dirname, "..");
const script = path.join(racine, "scripts/lint-claims.mjs");
const cibles = [
  "index.html", "v2.html", "src/main.js", "src/ui.js", "src/games.js",
  "src/data/hunt.js", "src/data/waypoints.js", "src/data/groups.js",
  "scripts/generate-pages-structures.mjs",
];
const tmp = fs.mkdtempSync(path.join(os.tmpdir(), "corps-claims-"));

for (const cible of cibles) {
  const destination = path.join(tmp, cible);
  fs.mkdirSync(path.dirname(destination), { recursive: true });
  fs.copyFileSync(path.join(racine, cible), destination);
}

function executer() {
  return spawnSync(process.execPath, [script], {
    cwd: racine,
    encoding: "utf8",
    env: { ...process.env, CLAIMS_ROOT: tmp, CLAIMS_REPORT: path.join(tmp, "rapport.json") },
  });
}

const propre = executer();
assert.equal(propre.status, 0, propre.stderr || propre.stdout);
assert.equal(JSON.parse(fs.readFileSync(path.join(tmp, "rapport.json"), "utf8")).verdict, "OK");

/* Une négation explicite ne doit pas être signalée. */
fs.appendFileSync(path.join(tmp, "src/main.js"), "\n// Cet outil ne diagnostique pas et ne remplace pas un avis médical.\n");
assert.equal(executer().status, 0, "une formulation niée a été signalée");

/* Une affirmation clinique doit faire échouer le lint. */
fs.appendFileSync(path.join(tmp, "src/main.js"), "\n// Diagnostiquez-vous en un clic avec CORPS, fiable à 100 %.\n");
const corrompu = executer();
assert.equal(corrompu.status, 1, "le lint n'a pas détecté l'affirmation injectée");
const rapport = JSON.parse(fs.readFileSync(path.join(tmp, "rapport.json"), "utf8"));
assert.equal(rapport.verdict, "ECHEC");
assert.ok(rapport.constats.some((c) => c.regle === "verbe-diagnostique" || c.regle === "fiabilite"));

fs.rmSync(tmp, { recursive: true, force: true });
console.log(`PASS  lint:claims — dépôt propre OK, négation acceptée, affirmation détectée (${rapport.constats.length} constat)`);
