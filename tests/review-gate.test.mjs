import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { spawnSync } from "node:child_process";

/* Gate de revue humaine : vert avec le drapeau éteint, rouge si on tente
 * d'activer ?tex=cc0 sans signatures. Oracle : configuration temporaire. */

const root = path.resolve(import.meta.dirname, "..");
const script = path.join(root, "scripts/check-review-signoffs.mjs");

function executer(dir, report) {
  return spawnSync(process.execPath, [script], {
    cwd: root,
    encoding: "utf8",
    env: { ...process.env, REVIEW_DIR: dir, REVIEW_REPORT: report },
  });
}

const reel = executer(path.join(root, "docs/revues"), path.join(root, "docs/analyses/review-signoffs.json"));
assert.equal(reel.status, 0, reel.stderr || reel.stdout);
const rapportReel = JSON.parse(fs.readFileSync(path.join(root, "docs/analyses/review-signoffs.json"), "utf8"));
assert.equal(rapportReel.textureDefault, false);
assert.equal(rapportReel.verdict, "OK");

const tmp = fs.mkdtempSync(path.join(os.tmpdir(), "corps-review-gate-"));
fs.writeFileSync(path.join(tmp, "config.json"), JSON.stringify({ textureDefault: true }));
fs.writeFileSync(path.join(tmp, "signoffs.json"), JSON.stringify({ entries: [] }));
const rapportTmp = path.join(tmp, "rapport.json");
const tente = executer(tmp, rapportTmp);
assert.equal(tente.status, 1, "le gate doit refuser l'activation sans signatures");
const rapport = JSON.parse(fs.readFileSync(rapportTmp, "utf8"));
assert.equal(rapport.verdict, "ECHEC");
assert.ok(rapport.erreurs.length >= 4, `attendu 4 erreurs de seuil, obtenu ${rapport.erreurs.length}`);

fs.rmSync(tmp, { recursive: true, force: true });
console.log("PASS  gate revue : drapeau éteint OK, activation sans signatures refusée");
