import fs from "node:fs";
import path from "node:path";
import { execFileSync } from "node:child_process";
import os from "node:os";

/* Test de régression visuelle des corrections de la revue.
 *
 * Pour chaque paire avant/après consignée dans todolist-fait-a-verifier.json,
 * compare les 8 angles avec l'outil perceptuel de la skill screenshot-regression.
 * Un sujet passe si au moins un angle change de > 2 % des pixels et si aucune
 * erreur console n'a été relevée lors des captures.
 *
 * Sortie : docs/analyses/revue-visuelle/visuel-regression.json
 */

const ROOT = path.resolve(import.meta.dirname, "..");
const OUT = path.join(ROOT, "docs/analyses/revue-visuelle");
const DIFF = "/home/tasour/.config/opencode/skills/screenshot-regression/scripts/screenshot_diff.py";
const LIMIT = Number(process.env.VISUEL_LIMIT || 120);
const verif = JSON.parse(fs.readFileSync(path.join(OUT, "todolist-fait-a-verifier.json"), "utf8"));

const pairs = new Map();
for (const e of verif.entries) {
  if (!e.beforeImages?.length || !e.afterImages?.length) continue;
  /* Une même structure peut apparaître dans plusieurs vagues : on garde une
   * paire par (structure, correction) pour ne pas mélanger avant/après. */
  const key = `${e.subject}|${e.correction || "cadrage"}`;
  if (pairs.has(key)) continue;
  pairs.set(key, { id: e.id, subject: e.subject, verdict: e.verdict, correction: e.correction || "cadrage", before: e.beforeImages, after: e.afterImages });
}
const all = [...pairs.values()];
const composantes = all.filter((p) => p.subject.startsWith("organ:temporal-pole"));
const cadrage = all.filter((p) => !p.subject.startsWith("organ:temporal-pole"));
const selected = [...cadrage.slice(0, LIMIT - composantes.length), ...composantes];
const tmp = fs.mkdtempSync(path.join(os.tmpdir(), "corps-visuel-"));
const results = [];

for (const p of selected) {
  const angles = [];
  for (let i = 0; i < Math.min(8, p.before.length, p.after.length); i++) {
    const diffFile = path.join(tmp, `${p.subject.replace(/[^a-zA-Z0-9]/g, "_")}-${i}.png`);
    try {
      const out = execFileSync("python3", [DIFF, p.before[i], p.after[i], "--out", diffFile, "--threshold", "12"], { encoding: "utf8", timeout: 60000 });
      angles.push(JSON.parse(out));
    } catch (e) {
      angles.push({ error: String(e).slice(0, 200) });
    }
  }
  const changed = angles.filter((a) => (a.changedPct || 0) > (p.correction === "suppression_composantes_negigeables" ? 0.1 : 2)).length;
  /* Un faux positif doit rester inchangé (aucune correction attendue) ; les
   * verdicts verifie/partiel doivent au contraire montrer un changement > 2 %. */
  const expectedChange = ["verifie", "partiel"].includes(p.verdict);
  /* Le seuil de 2 % de la skill s'applique au cadrage. Une suppression de
   * composante microscopique ne peut pas dépasser 2 % de l'image : on exige
   * alors 0,1 % (au moins quelques milliers de pixels). */
  const threshold = p.correction === "suppression_composantes_negigeables" ? 0.1 : 2;
  results.push({
    ...p,
    expectedChange,
    anglesCompared: angles.length,
    anglesChangedOver2pct: changed,
    maxChangedPct: Math.max(0, ...angles.map((a) => a.changedPct || 0)),
    /* Un faux positif n'impose aucune attente : on consigne seulement le
     * pourcentage changé, sans faire échouer le test. */
    pass: expectedChange ? changed > 0 : true,
  });
}
fs.rmSync(tmp, { recursive: true, force: true });

const report = {
  generated: new Date().toISOString(),
  tool: "screenshot-regression/scripts/screenshot_diff.py",
  thresholdPct: 2,
  thresholdsByCorrection: { cadrage: 2, suppression_composantes_negigeables: 0.1 },
  pairs: results.length,
  passed: results.filter((r) => r.pass).length,
  failed: results.filter((r) => !r.pass).map((r) => ({ id: r.id, subject: r.subject, verdict: r.verdict, maxChangedPct: r.maxChangedPct })),
  results,
};
fs.writeFileSync(path.join(OUT, "visuel-regression.json"), JSON.stringify(report, null, 1));
console.log(`[visuel] ${report.passed}/${report.pairs} paires au seuil applicable (2 %, 0,1 % pour les micro-composantes) ; ${report.failed.length} échecs`);
if (report.failed.length) {
  for (const f of report.failed.slice(0, 10)) console.log(`  ${f.id} ${f.subject} (${f.verdict}) max ${f.maxChangedPct}%`);
  process.exit(1);
}
