import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { CURATED_IDS, getWaypoints } from "../src/data/waypoints.js";

/* Contrôle des waypoints : un identifiant curé qui n'existe plus dans le
 * manifeste produisait des anecdotes invisibles, sans aucune erreur. C'est
 * arrivé avec « organ:bp-left-lung », absent du jeu de données. */

const manifest = JSON.parse(
  fs.readFileSync(path.resolve(import.meta.dirname, "../public/models/v2/manifest.json"), "utf8"),
);
const byId = new Map(manifest.structures.map((s) => [s.id, s]));
const results = [];
const check = (name, fn) => {
  try { fn(); results.push({ name, ok: true }); }
  catch (e) { results.push({ name, ok: false, error: e.message }); }
};

check("chaque identifiant curé existe dans le manifeste", () => {
  const dead = CURATED_IDS.filter((id) => !byId.has(id));
  assert.deepEqual(dead, [], `curés morts : ${dead.join(", ")}`);
});

check("2 à 6 waypoints par structure curée", () => {
  for (const id of CURATED_IDS) {
    const w = getWaypoints(byId.get(id));
    assert.ok(w.length >= 2 && w.length <= 6, `${id} : ${w.length}`);
  }
});

check("libellés, titres et textes renseignés", () => {
  for (const id of CURATED_IDS) {
    for (const w of getWaypoints(byId.get(id))) {
      assert.ok(w.label.trim().length >= 2, `${id} : libellé vide`);
      assert.ok(w.title.trim().length >= 2, `${id} : titre vide`);
      assert.ok(w.text.trim().length >= 40, `${id}/${w.label} : texte trop court (${w.text.length})`);
      assert.ok(w.text.length <= 320, `${id}/${w.label} : texte trop long (${w.text.length})`);
    }
  }
});

check("libellés uniques dans une structure", () => {
  for (const id of CURATED_IDS) {
    const labels = getWaypoints(byId.get(id)).map((w) => w.label);
    assert.equal(new Set(labels).size, labels.length, `${id} : doublon ${labels.join(", ")}`);
  }
});

check("positions dans la boîte englobante", () => {
  for (const id of CURATED_IDS) {
    const s = byId.get(id);
    for (const w of getWaypoints(s)) {
      for (let i = 0; i < 3; i++) {
        assert.ok(w.position[i] >= s.bounds.min[i] - 1e-9 && w.position[i] <= s.bounds.max[i] + 1e-9,
          `${id}/${w.label} : axe ${i} hors bornes`);
      }
    }
  }
});

check("structure non curée : 3 waypoints génériques dans ses bornes", () => {
  const s = byId.get("bone:clavicle-l");
  const w = getWaypoints(s);
  assert.equal(w.length, 3);
  for (const p of w) {
    for (let i = 0; i < 3; i++) {
      assert.ok(p.position[i] >= s.bounds.min[i] - 1e-9 && p.position[i] <= s.bounds.max[i] + 1e-9);
    }
    assert.match(p.text, /TA2/);
  }
});

check("couverture curée minimale", () => {
  assert.ok(CURATED_IDS.length >= 20, `${CURATED_IDS.length} structures curées`);
});

const passed = results.filter((r) => r.ok).length;
for (const r of results) console.log(`${r.ok ? "PASS" : "FAIL"}  ${r.name}${r.ok ? "" : ` — ${r.error}`}`);
console.log(`\n${passed}/${results.length} contrôles de waypoints réussis · ${CURATED_IDS.length} structures curées`);
process.exitCode = passed === results.length ? 0 : 1;
