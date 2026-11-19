import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { HUNT_TARGETS } from "../src/data/hunt.js";

/* Contrôle du vivier de la « Chasse aux organes ».
 *
 * Une cible absente du manifeste rendrait la partie impossible à gagner :
 * le jeu tirerait une structure que le picking ne peut jamais renvoyer.
 * On vérifie donc l'existence, la catégorie et la lisibilité des indices.
 */

const manifest = JSON.parse(
  fs.readFileSync(path.resolve(import.meta.dirname, "../public/models/v2/manifest.json"), "utf8"),
);
const byId = new Map(manifest.structures.map((s) => [s.id, s]));
const results = [];
const check = (name, fn) => {
  try { fn(); results.push({ name, ok: true }); }
  catch (e) { results.push({ name, ok: false, error: e.message }); }
};

check("toutes les cibles existent dans le manifeste", () => {
  const dead = HUNT_TARGETS.filter((t) => !byId.has(t.id)).map((t) => t.id);
  assert.deepEqual(dead, [], `cibles mortes : ${dead.join(", ")}`);
});

check("au moins 20 cibles", () => {
  assert.ok(HUNT_TARGETS.length >= 20, `${HUNT_TARGETS.length} cibles`);
});

check("identifiants uniques", () => {
  const ids = HUNT_TARGETS.map((t) => t.id);
  assert.equal(new Set(ids).size, ids.length, "doublon dans HUNT_TARGETS");
});

check("libellés et indices renseignés", () => {
  for (const t of HUNT_TARGETS) {
    assert.ok(t.label.trim().length >= 3, `${t.id} : libellé vide`);
    assert.ok(t.hint.trim().length >= 10, `${t.id} : indice trop court`);
  }
});

check("libellés uniques", () => {
  const labels = HUNT_TARGETS.map((t) => t.label);
  assert.equal(new Set(labels).size, labels.length, "deux cibles portent le même libellé");
});

check("trois catégories représentées (organe, os, muscle)", () => {
  const cats = new Set(HUNT_TARGETS.map((t) => byId.get(t.id).category));
  for (const cat of ["organ", "bone", "muscle"]) {
    assert.ok(cats.has(cat), `catégorie absente : ${cat}`);
  }
});

check("les cibles organes ont une géométrie non vide", () => {
  /* Une cible organe doit appartenir au lot affiché par défaut et posséder
   * des triangles, sinon le joueur ne pourrait pas la cliquer. */
  for (const t of HUNT_TARGETS) {
    const s = byId.get(t.id);
    if (s.category !== "organ") continue;
    const count = s.lod?.low?.indexCount || 0;
    assert.ok(count >= 12, `${t.id} : ${count} indices`);
  }
});

const passed = results.filter((r) => r.ok).length;
for (const r of results) console.log(`${r.ok ? "PASS" : "FAIL"}  ${r.name}${r.ok ? "" : ` — ${r.error}`}`);
console.log(`\n${passed}/${results.length} contrôles de la chasse réussis · ${HUNT_TARGETS.length} cibles`);
process.exitCode = passed === results.length ? 0 : 1;
