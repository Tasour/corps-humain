import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { chromium } from "playwright";
import { HUNT_MODES, HUNT_TARGETS } from "../src/data/hunt.js";

/* BENCH-013 — cinq modes de quiz dérivés du manifeste. L'oracle est le
 * manifeste lui-même : on calcule la bonne réponse avant de cliquer. */

const root = path.resolve(import.meta.dirname, "..");
const manifest = JSON.parse(fs.readFileSync(path.join(root, "public/models/v2/manifest.json"), "utf8"));
const parId = new Map(manifest.structures.map((s) => [s.id, s]));
const SYSTEMES = { bone: "Os", muscle: "Muscles", organ: "Organes", skin: "Peau" };

const BASE = process.env.TEST_BASE || "http://127.0.0.1:5199";
let parsed;
try { parsed = new URL(BASE); } catch { throw new Error(`TEST_BASE invalide : ${BASE}`); }
if (!/^https?:$/.test(parsed.protocol)) throw new Error(`TEST_BASE doit être http(s) : ${BASE}`);

const browser = await chromium.launch({
  executablePath: process.env.CI ? undefined : "/usr/bin/chromium",
});
const ctx = await browser.newContext({ viewport: { width: 1360, height: 880 } });
const page = await ctx.newPage();
page.setDefaultTimeout(90000);
const errors = [];
page.on("pageerror", (e) => errors.push(String(e)));
const resultats = [];
const verifier = async (nom, fn) => {
  try { await fn(); resultats.push({ nom, ok: true }); }
  catch (e) { resultats.push({ nom, ok: false, erreur: e.message }); }
};

await page.goto(`${BASE}/v2.html`);
await page.waitForFunction(() => window.__v2?.ready === true, null, { timeout: 120000 });
await page.evaluate(() => window.__hunt.start());

function ciblePour(mode) {
  return HUNT_TARGETS.find((t) => {
    const s = parId.get(t.id);
    if (!s) return false;
    if (mode === "cote") return !!s.side;
    if (mode === "ta2") return !!s.ta2;
    return true;
  });
}

function reponseAttendue(mode, structure) {
  if (mode === "nommer") return structure.fr || structure.en;
  if (mode === "systeme") return SYSTEMES[structure.category] || structure.category;
  if (mode === "cote") return structure.side === "left" ? "Gauche" : "Droite";
  if (mode === "ta2") return structure.ta2;
  return null;
}

await verifier("5 modes, un seul coché, cibles tactiles", async () => {
  const d = await page.evaluate(() => ({
    boutons: [...document.querySelectorAll('#hunt-modes [data-mode]')].map((b) => ({
      id: b.dataset.mode, checked: b.getAttribute('aria-checked'), h: b.getBoundingClientRect().height,
    })),
    modese: window.__hunt.state().mode,
  }));
  assert.deepEqual(d.boutons.map((b) => b.id), HUNT_MODES.map((m) => m.id));
  assert.equal(d.boutons.filter((b) => b.checked === 'true').length, 1);
  assert.equal(d.modese, 'trouver');
  assert.ok(d.boutons.every((b) => b.h >= 36));
});

for (const mode of HUNT_MODES) {
  await verifier(`mode ${mode.id} : question et bonne réponse`, async () => {
    await page.locator(`#hunt-modes [data-mode="${mode.id}"]`).click();
    const cible = ciblePour(mode.id);
    assert.ok(cible, `${mode.id} : aucune cible valide`);
    assert.equal(await page.evaluate((id) => window.__hunt.forceTarget(id), cible.id), true);
    const structure = parId.get(cible.id);
    const d = await page.evaluate((modeId) => ({
      mode: window.__hunt.state().mode,
      question: document.getElementById('hunt-target').textContent,
      choix: [...document.querySelectorAll('#hunt-choices button')].map((b) => b.textContent),
      score: window.__hunt.state().score,
      coche: document.querySelector(`#hunt-modes [data-mode="${modeId}"]`).getAttribute('aria-checked'),
    }), mode.id);
    assert.equal(d.mode, mode.id);
    assert.equal(d.coche, 'true');
    assert.equal(d.question, mode.id === 'trouver' ? `Trouvez ${cible.label}` : mode.question);
    if (mode.id === 'trouver') {
      assert.equal(d.choix.length, 0, 'le mode trouver ne doit pas avoir de QCM');
      assert.equal(await page.evaluate(() => window.__hunt.pick(window.__v2.resolveId(window.__hunt.state().target))), true);
    } else {
      assert.ok(d.choix.length >= 2, `${mode.id} : pas de choix`);
      const attendu = reponseAttendue(mode.id, structure);
      assert.ok(d.choix.includes(attendu), `${mode.id} : ${attendu} absent des choix ${d.choix.join(" / ")}`);
      await page.locator('#hunt-choices button', { hasText: attendu }).first().click();
    }
    const apres = await page.evaluate(() => window.__hunt.state());
    assert.ok(apres.score > d.score, `${mode.id} : score non incrémenté`);
    await page.waitForTimeout(760);
  });
}

await verifier("mauvaise réponse : série remise à zéro", async () => {
  await page.locator('#hunt-modes [data-mode="systeme"]').click();
  const cible = ciblePour('systeme');
  await page.evaluate((id) => window.__hunt.forceTarget(id), cible.id);
  const structure = parId.get(cible.id);
  const bon = reponseAttendue('systeme', structure);
  const mauvais = ['Os', 'Muscles', 'Organes'].find((s) => s !== bon);
  await page.locator('#hunt-choices button', { hasText: mauvais }).first().click();
  const etat = await page.evaluate(() => window.__hunt.state());
  assert.equal(etat.streak, 0);
});

await verifier("aucune erreur console", async () => {
  assert.deepEqual(errors, []);
});

await page.evaluate(() => window.__hunt.stop());
await ctx.close();
await browser.close();
const reussis = resultats.filter((r) => r.ok).length;
for (const r of resultats) console.log(`${r.ok ? "PASS" : "FAIL"}  ${r.nom}${r.ok ? "" : ` — ${r.erreur}`}`);
console.log(`\n${reussis}/${resultats.length} contrôles de quiz multi-modes réussis`);
process.exitCode = reussis === resultats.length ? 0 : 1;
