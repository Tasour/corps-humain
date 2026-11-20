import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { chromium } from "playwright";
import { GROUPS } from "../src/data/groups.js";

/* Contrôle 3D des 43 groupes d'animation.
 *
 * Deux passes, pour ne pas charger 43 fois le LOD high (mémoire) :
 *   A. moteur, sur les 43 groupes : isolement exact des membres, « éclaté »
 *      et « mouvement » produisent des matrices différentes, réinitialisation
 *      à l'identité ;
 *   B. interface, sur 8 groupes représentatifs (coude, genou, mâchoire, tronc,
 *      biceps, quadriceps, trapèzes, cœur) : clic réel sur la pastille,
 *      compte affiché, puis bouton « Éclater ».
 *
 * Usage : node tests/groupes-3d.mjs  (serveur Vite sur TEST_BASE, défaut 5199)
 */

const BASE = process.env.TEST_BASE || "http://localhost:5199";
const OUT = path.resolve(import.meta.dirname, "../docs/analyses/groupes-3d.json");
const UI_SAMPLE = ["elbow-l", "knee-l", "jaw", "spine", "biceps-l", "quadriceps-l", "trapezius", "heart"];
const results = [];

const browser = await chromium.launch({ executablePath: process.env.CI ? undefined : "/usr/bin/chromium" });
const context = await browser.newContext({ viewport: { width: 1360, height: 880 } });
const page = await context.newPage();
page.setDefaultTimeout(90000);
const errors = [];
page.on("pageerror", (e) => errors.push(String(e)));
page.on("console", (m) => {
  if (m.type() !== "error") return;
  if (m.text().includes("Failed to load resource")) return;
  errors.push(m.text());
});

await page.goto(`${BASE}/v2.html`);
await page.waitForFunction(() => window.__v2?.ready === true, null, { timeout: 120000 });
await page.waitForTimeout(800);

/* ---------- A. moteur, 43 groupes --------------------------------------- */
const engineReport = await page.evaluate((ids) => {
  const e = window.__v2;
  const identity = [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1];
  const delta = (m) => {
    let d = 0;
    for (let i = 0; i < 16; i++) d = Math.max(d, Math.abs(m.elements[i] - identity[i]));
    return d;
  };
  const memberMatrices = (group) => {
    const out = [];
    for (const id of group.members) {
      const s = e.byId.get(id);
      if (!s) continue;
      const ref = e.structureToInstance.get(s._index);
      const batch = ref && e.batches.get(ref.category);
      if (!batch) continue;
      const m = e.camera.matrix.clone();
      batch.getMatrixAt(ref.instanceId, m);
      out.push(delta(m));
    }
    return out;
  };
  return ids.map((id) => {
    const group = window.__v2Groups.find((g) => g.id === id);
    const missing = group.members.filter((m) => !e.byId.has(m));
    const expected = group.members.length - missing.length;
    const shown = e.showGroup(group);
    let visibleInstances = 0;
    for (const [index, ref] of e.structureToInstance) {
      if (!e.currentVisible.has(index)) continue;
      const batch = e.batches.get(ref.category);
      if (batch && batch.getVisibleAt(ref.instanceId)) visibleInstances++;
    }
    e.animateGroup(group, 0.5, "explode");
    const explode = memberMatrices(group);
    e.animateGroup(group, 0.5, "movement");
    const movement = memberMatrices(group);
    e.resetGroupTransforms();
    const reset = memberMatrices(group);
    return {
      id,
      expected,
      shown,
      currentVisible: e.currentVisible.size,
      visibleInstances,
      missing,
      maxExplode: Math.max(0, ...explode),
      maxMovement: Math.max(0, ...movement),
      maxReset: Math.max(0, ...reset),
      identical: explode.length === movement.length &&
        explode.every((d, i) => Math.abs(d - movement[i]) < 1e-6),
    };
  });
}, GROUPS.map((g) => g.id));

for (const r of engineReport) {
  try {
    assert.deepEqual(r.missing, [], `membres absents : ${r.missing.join(", ")}`);
    assert.equal(r.shown, r.expected, `showGroup ${r.shown} ≠ ${r.expected}`);
    assert.equal(r.currentVisible, r.expected, `currentVisible ${r.currentVisible} ≠ ${r.expected}`);
    assert.equal(r.visibleInstances, r.expected, `instances visibles ${r.visibleInstances} ≠ ${r.expected}`);
    assert.ok(r.maxExplode > 0.001, `éclaté sans effet (${r.maxExplode.toFixed(5)})`);
    assert.ok(r.maxMovement > 0.001, `mouvement sans effet (${r.maxMovement.toFixed(5)})`);
    assert.equal(r.identical, false, "éclaté et mouvement identiques");
    assert.ok(r.maxReset < 1e-6, `réinitialisation incomplète (${r.maxReset.toExponential(2)})`);
    results.push({ ...r, ok: true });
  } catch (e) {
    results.push({ ...r, ok: false, error: e.message });
  }
}

/* ---------- B. interface, 8 groupes ------------------------------------- */
/* Section repliée par défaut : on l'ouvre comme un utilisateur. */
await page.evaluate(() => { document.getElementById("groups-details").open = true; });
for (const id of UI_SAMPLE) {
  const group = GROUPS.find((g) => g.id === id);
  try {
    const chip = page.locator(`#groups button[data-group="${id}"]`);
    assert.equal(await chip.count(), 1, "pastille absente");
    await chip.click();
    await page.waitForTimeout(500);
    const state = await page.evaluate(() => ({
      isolated: window.__v2.isolated?.id,
      label: document.getElementById("sel-name").textContent,
      meta: document.getElementById("sel-meta").textContent,
      actions: getComputedStyle(document.getElementById("group-actions")).display,
    }));
    assert.equal(state.isolated, id, `groupe isolé ${state.isolated}`);
    assert.equal(state.label, group.label, `libellé « ${state.label} »`);
    assert.match(state.meta, new RegExp(`^${group.members.length} structures`), `compte « ${state.meta} »`);
    assert.notEqual(state.actions, "none", "actions de groupe masquées");

    await page.click("#explode");
    const started = Date.now();
    let maxd = 0;
    while (Date.now() - started < 5000 && maxd <= 0.001) {
      await page.waitForTimeout(200);
      maxd = await page.evaluate(() => {
        const e = window.__v2;
        const identity = [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1];
        let d = 0;
        for (const id of e.isolated.members) {
          const s = e.byId.get(id);
          if (!s) continue;
          const ref = e.structureToInstance.get(s._index);
          const batch = ref && e.batches.get(ref.category);
          if (!batch) continue;
          const m = e.camera.matrix.clone();
          batch.getMatrixAt(ref.instanceId, m);
          for (let i = 0; i < 16; i++) d = Math.max(d, Math.abs(m.elements[i] - identity[i]));
        }
        return d;
      });
    }
    assert.ok(maxd > 0.001, `bouton Éclater sans effet (${maxd.toFixed(5)})`);
    await page.click("#group-reset");
    results.push({ id: `ui:${id}`, ok: true, maxExplode: maxd });
  } catch (e) {
    results.push({ id: `ui:${id}`, ok: false, error: e.message });
  }
}

/* Aucune erreur console pendant la traversée. */
results.push({ id: "console", ok: errors.length === 0, error: errors.join(" | ") });

const passed = results.filter((r) => r.ok).length;
const failures = results.filter((r) => !r.ok).map((r) => `${r.id} : ${r.error}`);
fs.writeFileSync(OUT, JSON.stringify({
  generated: new Date().toISOString(),
  groups: GROUPS.length,
  passed,
  total: results.length,
  failures,
  results,
}, null, 2));

for (const f of failures) console.log(`FAIL  ${f}`);
console.log(`\n${passed}/${results.length} contrôles 3D de groupes réussis · ${GROUPS.length} groupes`);
process.exitCode = passed === results.length ? 0 : 1;

/* Fermeture après impression : le résumé ne dépend plus du succès de close(). */
await browser.close().catch(() => {});
