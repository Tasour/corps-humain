import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { spawnSync } from "node:child_process";

/* BENCH-012 — le garde-fou doit échouer sur un manifeste corrompu, pas
 * seulement réussir sur le bon. Oracle : un ID dupliqué injecté dans une copie. */

const root = path.resolve(import.meta.dirname, "..");
const script = path.join(root, "scripts/check-modele.mjs");
const dir = path.join(root, "public/models/v2");
const manifeste = JSON.parse(fs.readFileSync(path.join(dir, "manifest.json"), "utf8"));
const tmp = fs.mkdtempSync(path.join(os.tmpdir(), "corps-check-modele-"));

function executer(manifestPath, reportPath) {
  return spawnSync(process.execPath, [script], {
    cwd: root,
    encoding: "utf8",
    env: {
      ...process.env,
      CHECK_MODELE_DIR: dir,
      CHECK_MODELE_MANIFEST: manifestPath,
      CHECK_MODELE_REPORT: reportPath,
    },
  });
}

const rapportOK = path.join(tmp, "ok.json");
const ok = executer(path.join(dir, "manifest.json"), rapportOK);
assert.equal(ok.status, 0, ok.stderr || ok.stdout);
const donneesOK = JSON.parse(fs.readFileSync(rapportOK, "utf8"));
assert.equal(donneesOK.verdict, "OK");
assert.equal(donneesOK.anomalies.length, 0);
assert.equal(donneesOK.structures, manifeste.structures.length);

const manifestCorrompu = JSON.parse(JSON.stringify(manifeste));
manifestCorrompu.structures[1].id = manifestCorrompu.structures[0].id;
const cheminCorrompu = path.join(tmp, "manifest-duplique.json");
fs.writeFileSync(cheminCorrompu, JSON.stringify(manifestCorrompu));
const rapportKO = path.join(tmp, "ko.json");
const ko = executer(cheminCorrompu, rapportKO);
assert.equal(ko.status, 1, "le check doit échouer sur un ID dupliqué");
const donneesKO = JSON.parse(fs.readFileSync(rapportKO, "utf8"));
assert.equal(donneesKO.verdict, "ECHEC");
assert.ok(donneesKO.anomalies.some((a) => a.controle === "identite" && /dupliqué/.test(a.message)));

fs.rmSync(tmp, { recursive: true, force: true });
console.log(`PASS  check du modèle livré : ${donneesOK.structures} structures OK, détection négative d'un ID dupliqué`);
