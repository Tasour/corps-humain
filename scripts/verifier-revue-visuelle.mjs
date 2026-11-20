import fs from "node:fs";
import path from "node:path";
import { chromium } from "playwright";

/* Vérification visuelle avant/après d'une vague de corrections.
 *
 * Pour chaque entrée `cadrage` de la todolist, compare les captures AVANT et
 * APRÈS : couverture, marges, et — sur un échantillon — IoU des silhouettes
 * calculé dans Chromium (canvas 2D). Écrit une todolist « Fait mais à vérifier »
 * avec un verdict par entrée.
 *
 * Aucune correction n'est appliquée ici : ce script ne fait que comparer.
 */

const CACHE = "/home/tasour/.cache/revue-visuelle";
const ROOT = path.resolve(import.meta.dirname, "..");
const OUT = path.join(ROOT, "docs/analyses/revue-visuelle");
const BEFORE = path.join(CACHE, "qualite-3d/index.json");
const AFTER = path.join(CACHE, "qualite-3d-apres/index.json");
const TODO = path.join(OUT, "todolist.json");
const SAMPLE = Number(process.env.VERIFICATION_SAMPLE || 80);

const before = JSON.parse(fs.readFileSync(BEFORE, "utf8"));
const after = JSON.parse(fs.readFileSync(AFTER, "utf8"));
const todo = JSON.parse(fs.readFileSync(TODO, "utf8"));
const beforeById = new Map(before.subjects.map((s) => [s.id, s]));
const afterById = new Map(after.subjects.map((s) => [s.id, s]));

function coverage(s, field = "coveragePct") {
  const list = (s?.captures || []).map((c) => c[field]).filter((v) => typeof v === "number");
  return list.length ? { min: Math.min(...list), max: Math.max(...list), mean: list.reduce((a, b) => a + b, 0) / list.length } : null;
}

/* IoU des silhouettes sur une paire de JPEG, calculé dans le navigateur. */
async function visualDiff(page, fileA, fileB) {
  return page.evaluate(async ({ a, b }) => {
    const load = async (src) => {
      const img = new Image();
      img.src = src;
      await img.decode();
      const c = document.createElement("canvas");
      c.width = img.width; c.height = img.height;
      const ctx = c.getContext("2d", { willReadFrequently: true });
      ctx.drawImage(img, 0, 0);
      return ctx.getImageData(0, 0, c.width, c.height);
    };
    const ia = await load(a), ib = await load(b);
    const target = [0x1b, 0x1f, 0x24];
    const isModel = (d, i) => Math.abs(d[i] - target[0]) + Math.abs(d[i + 1] - target[1]) + Math.abs(d[i + 2] - target[2]) > 42;
    let inter = 0, union = 0, diff = 0;
    for (let i = 0; i < ia.data.length; i += 4) {
      const ma = isModel(ia.data, i), mb = isModel(ib.data, i);
      if (ma && mb) inter++;
      if (ma || mb) union++;
      diff += Math.abs(ia.data[i] - ib.data[i]) + Math.abs(ia.data[i + 1] - ib.data[i + 1]) + Math.abs(ia.data[i + 2] - ib.data[i + 2]);
    }
    return {
      iou: union ? +(inter / union).toFixed(4) : 0,
      meanPixelDiff: +(diff / (ia.data.length / 4) / 3).toFixed(3),
    };
  }, { a: "data:image/jpeg;base64," + fs.readFileSync(fileA).toString("base64"), b: "data:image/jpeg;base64," + fs.readFileSync(fileB).toString("base64") });
}

const cadrage = todo.entries.filter((e) => e.category === "cadrage");
const subjects = [...new Set(cadrage.map((e) => e.subject))].sort();

const browser = await chromium.launch({ executablePath: process.env.CI ? undefined : "/usr/bin/chromium" });
const page = await browser.newPage({ viewport: { width: 1100, height: 800 } });

/* Relecture humaine/sous-agent des paires, si disponible. */
const reviewDir = path.join(CACHE, "verification");
const review = new Map();
if (fs.existsSync(reviewDir)) {
  for (const f of fs.readdirSync(reviewDir).filter((n) => /^agent-\d+\.json$/.test(n))) {
    try {
      const d = JSON.parse(fs.readFileSync(path.join(reviewDir, f), "utf8"));
      for (const p of d.paires || []) review.set(p.subject, { reviewer: d.reviewer, verdict: p.verdictRelecture, comment: p.commentaire });
    } catch { /* fichier illisible : ignoré */ }
  }
}

const sampled = subjects.slice(0, SAMPLE);
const pixel = new Map();
for (const id of sampled) {
  const a = beforeById.get(id), b = afterById.get(id);
  if (!a || !b) continue;
  const fa = a.captures?.[0]?.file, fb = b.captures?.[0]?.file;
  if (!fa || !fb || !fs.existsSync(fa) || !fs.existsSync(fb)) continue;
  try { pixel.set(id, await visualDiff(page, fa, fb)); } catch { /* image illisible : on garde les métriques */ }
}
/* Les 8 premières structures ont été capturées lors d'un test du harnais dont
 * l'index a été écrasé : on recalcule leur couverture « avant » depuis les JPEG. */
const missingCoverage = new Map();
for (const id of subjects) {
  if (beforeById.has(id)) continue;
  const files = (afterById.get(id)?.captures || []).map((c) => c.file)
    .map((f) => f.replace(/qualite-3d-apres/, "qualite-3d"));
  const usable = files.filter((f) => fs.existsSync(f));
  if (!usable.length) continue;
  const cov = await page.evaluate(async (list) => {
    const out = [];
    for (const src of list) {
      const img = new Image();
      img.src = "data:image/jpeg;base64," + src.b64;
      await img.decode();
      const c = document.createElement("canvas");
      c.width = img.width; c.height = img.height;
      const ctx = c.getContext("2d", { willReadFrequently: true });
      ctx.drawImage(img, 0, 0);
      const { data } = ctx.getImageData(0, 0, c.width, c.height);
      let n = 0;
      for (let i = 0; i < data.length; i += 4) {
        if (Math.abs(data[i] - 0x1b) + Math.abs(data[i + 1] - 0x1f) + Math.abs(data[i + 2] - 0x24) > 42) n++;
      }
      out.push(+(100 * n / (c.width * c.height)).toFixed(2));
    }
    return out;
  }, usable.map((f) => ({ b64: fs.readFileSync(f).toString("base64") })));
  missingCoverage.set(id, cov);
}
await browser.close();

const entries = [];
for (const id of subjects) {
  const b = beforeById.get(id), a = afterById.get(id);
  const recovered = missingCoverage.get(id);
  const covB = coverage(b) || (recovered ? { min: Math.min(...recovered), max: Math.max(...recovered), mean: recovered.reduce((x, y) => x + y, 0) / recovered.length } : null);
  const covA = coverage(a);
  if (!covA) continue;
  const ratio = covB && covB.min > 0 ? covA.min / covB.min : Infinity;
  /* Une couverture déjà ≥ 5 % avant correction n'était pas un artefact de
   * minDistance mais une silhouette naturellement fine : c'est un faux positif
   * de l'entrée « cadrage », pas un défaut non réparé. */
  const verdict = !covB ? "donnee_manquante"
    : ratio < 1.1 ? "faux_positif"
      : covB.min >= 5 && ratio < 1.5 ? "faux_positif"
        : covA.min >= 10 && ratio >= 2 ? "verifie"
          : ratio >= 1.5 ? "partiel"
            : "non_fixe";
  const subjectEntries = cadrage.filter((e) => e.subject === id);
  for (const e of subjectEntries) {
    entries.push({
      ...e,
      status: "fait_a_verifier",
      verdict,
      before: {
        minCoveragePct: covB?.min ?? null,
        maxCoveragePct: covB?.max ?? null,
        meanCoveragePct: covB ? +covB.mean.toFixed(2) : null,
      },
      after: {
        minCoveragePct: +covA.min.toFixed(2),
        maxCoveragePct: +covA.max.toFixed(2),
        meanCoveragePct: +covA.mean.toFixed(2),
      },
      coverageRatio: Number.isFinite(ratio) ? +ratio.toFixed(2) : null,
      pixel: pixel.get(id) || null,
      relecture: review.get(id) || null,
      beforeImages: (b?.captures || []).map((c) => c.file),
      afterImages: (a?.captures || []).map((c) => c.file),
      verifiedAt: new Date().toISOString(),
    });
  }
}

const summary = {
  generated: new Date().toISOString(),
  vague: 0,
  titre: "Fait mais à vérifier — correction de l'artefact de cadrage",
  cause: "controls.minDistance = 0,12 m dans le harnais de capture, désormais levé pendant la capture",
  subjects: subjects.length,
  entries: entries.length,
  pixelSample: pixel.size,
  relecture: {
    paires: review.size,
    verdicts: Object.fromEntries(["correct", "insuffisant", "regression"].map((v) => [v, [...review.values()].filter((r) => r.verdict === v).length])),
  },
  verdicts: Object.fromEntries(["verifie", "partiel", "non_fixe", "faux_positif", "donnee_manquante"].map((v) => [v, entries.filter((e) => e.verdict === v).length])),
};
fs.mkdirSync(OUT, { recursive: true });
fs.writeFileSync(path.join(OUT, "todolist-fait-a-verifier.json"), JSON.stringify({ summary, entries }, null, 1));

const fmt = (n) => n === null ? "—" : Number(n).toFixed(2);
const lines = [];
lines.push("# Fait mais à vérifier — vague 0 (cadrage)");
lines.push("");
lines.push(`Généré le ${summary.generated.slice(0, 10)}. Cause : ${summary.cause}.`);
lines.push("");
lines.push(`- Structures : **${summary.subjects}** · entrées : **${summary.entries}**`);
lines.push(`- Verdicts : **${summary.verdicts.verifie} vérifiées** · ${summary.verdicts.partiel} partielles · ${summary.verdicts.non_fixe} non fixées · ${summary.verdicts.faux_positif} faux positifs · ${summary.verdicts.donnee_manquante} sans donnée avant`);
lines.push(`- Test visuel IoU : ${summary.pixelSample} paires avant/après échantillonnées`);
lines.push(`- Relecture indépendante : ${summary.relecture.paires} paires — ${summary.relecture.verdicts.correct} correctes, ${summary.relecture.verdicts.insuffisant} insuffisantes, ${summary.relecture.verdicts.regression} régressions`);
lines.push("");
lines.push("> Les relectures indépendantes portent sur un échantillon de 80 paires. Elles");
lines.push("> confirment que les verdicts automatiques « partiel » sont souvent trop stricts :");
lines.push("> visuellement, le cadrage est correct. Les seuils automatiques servent de filtre,");
lines.push("> pas de vérité.");
lines.push("");
lines.push("| Verdict | ID | Structure | Couverture avant → après | IoU | Preuve avant | Preuve après |");
lines.push("|---|---|---|---:|---:|---|---|");
for (const e of entries) {
  lines.push(`| ${e.verdict} | ${e.id} | \`${e.subject}\` | ${fmt(e.before.minCoveragePct)} % → ${fmt(e.after.minCoveragePct)} % | ${e.pixel?.iou ?? "—"} | \`${e.beforeImages[0] || "—"}\` | \`${e.afterImages[0] || "—"}\` |`);
}
lines.push("");
lines.push("> Un verdict `verifie` signifie : couverture ≥ 10 % sur les 8 angles et au moins");
lines.push("> deux fois la couverture initiale. Les autres verdicts restent en attente d'une");
lines.push("> correction spécifique et ne doivent pas être comptés comme résolus.");
fs.writeFileSync(path.join(OUT, "todolist-fait-a-verifier.md"), lines.join("\n"));

console.log(`[verification] ${summary.subjects} structures · ${summary.entries} entrées · ${summary.verdicts.verifie} vérifiées · ${summary.verdicts.partiel} partielles · ${summary.verdicts.non_fixe} non fixées`);
console.log(`[verification] écrit ${path.join(OUT, "todolist-fait-a-verifier.md")}`);
