import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { GROUPS, QUICK_ACCESS, groupReport } from "../src/data/groups.js";

/* Contrôle des groupes d'animation : un identifiant périmé ne doit pas
 * produire une animation silencieusement vide. */

const manifest = JSON.parse(
  fs.readFileSync(path.resolve(import.meta.dirname, "../public/models/v2/manifest.json"), "utf8"),
);
const byId = new Map(manifest.structures.map((s) => [s.id, s]));
const results = [];
const check = (name, fn) => {
  try { fn(); results.push({ name, ok: true }); }
  catch (e) { results.push({ name, ok: false, error: e.message }); }
};

check("identifiants de groupe uniques", () => {
  const ids = GROUPS.map((g) => g.id);
  assert.equal(new Set(ids).size, ids.length, `doublons : ${ids.filter((id, i) => ids.indexOf(id) !== i)}`);
});

check("chaque groupe a un libellé, un mouvement et au moins 2 membres", () => {
  for (const g of GROUPS) {
    assert.ok(g.label && g.label.trim(), `${g.id} sans libellé`);
    assert.ok(g.movement && g.movement.trim(), `${g.id} sans mouvement`);
    assert.ok(g.members.length >= 2, `${g.id} : ${g.members.length} membre(s)`);
  }
});

check("tous les membres existent dans le manifeste", () => {
  const missing = [];
  for (const g of GROUPS) for (const id of g.members) if (!byId.has(id)) missing.push(`${g.id} → ${id}`);
  assert.deepEqual(missing, [], missing.join(" | "));
});

check("aucun membre dupliqué dans un groupe", () => {
  for (const g of GROUPS) {
    const dup = g.members.filter((id, i) => g.members.indexOf(id) !== i);
    assert.deepEqual(dup, [], `${g.id} : ${dup.join(", ")}`);
  }
});

check("pivots et axes valides", () => {
  for (const g of GROUPS) {
    assert.equal(g.pivot.length, 3, `${g.id} pivot`);
    assert.equal(g.axis.length, 3, `${g.id} axe`);
    assert.ok(g.pivot.every(Number.isFinite), `${g.id} pivot non numérique`);
    assert.ok(g.axis.every(Number.isFinite), `${g.id} axe non numérique`);
    assert.ok(Math.hypot(...g.axis) > 0.5, `${g.id} axe nul`);
    assert.ok(Number.isFinite(g.angle) && Math.abs(g.angle) > 0.01, `${g.id} angle nul`);
  }
});

check("pivots dans l'enveloppe du corps", () => {
  /* Le corps tient dans x ∈ [-0.35, 0.35], y ∈ [0, 1.85], z ∈ [-0.2, 0.2]. */
  for (const g of GROUPS) {
    const [x, y, z] = g.pivot;
    assert.ok(x >= -0.35 && x <= 0.35, `${g.id} pivot x=${x}`);
    assert.ok(y >= 0 && y <= 1.85, `${g.id} pivot y=${y}`);
    assert.ok(z >= -0.25 && z <= 0.25, `${g.id} pivot z=${z}`);
  }
});

check("raccourcis d'accès rapide valides", () => {
  for (const q of QUICK_ACCESS) {
    assert.ok(q.ids.length > 0, `${q.label} vide`);
    for (const id of q.ids) assert.ok(byId.has(id), `${q.label} → ${id} absent`);
  }
});

check("groupReport ne signale rien", () => {
  const r = groupReport(manifest.structures);
  assert.equal(r.groups, GROUPS.length);
  assert.deepEqual(r.missing, []);
});

const passed = results.filter((r) => r.ok).length;
for (const r of results) console.log(`${r.ok ? "PASS" : "FAIL"}  ${r.name}${r.ok ? "" : ` — ${r.error}`}`);
console.log(`\n${passed}/${results.length} contrôles de groupes réussis · ${GROUPS.length} groupes`);
process.exitCode = passed === results.length ? 0 : 1;
