import fs from "node:fs";
import path from "node:path";
import { chromium } from "playwright";

/* Détection SYSTÉMIQUE des collisions de contour hover par analyse de pixels.
 * Pour chaque structure : capture A) isolée, B) avec contour. On compare pixel
 * par pixel : tout pixel CYAN du contour doit être dans une zone dilatée autour
 * de la silhouette de base. Un contour qui « traverse » l'item = pixels cyan
 * hors zone dilatée. Seuil : > 5 % des pixels cyan hors zone = anomalie.
 */
const BASE = process.env.TEST_BASE || "http://localhost:5199";
const OUT = process.env.VISUAL_OUT || path.resolve(import.meta.dirname, "../docs/analyses/visual");
const LIMIT = Number(process.env.VISUAL_LIMIT || 60);
const THRESHOLD = Number(process.env.VISUAL_THRESHOLD || 0.05);
fs.mkdirSync(OUT, { recursive: true });

const browser = await chromium.launch({ executablePath: process.env.CI ? undefined : "/usr/bin/chromium" });
const page = await browser.newPage({ viewport: { width: 700, height: 700 } });
page.setDefaultTimeout(120000);
const errors = [];
page.on("pageerror", (e) => errors.push(String(e)));

await page.goto(`${BASE}/v2.html`);
await page.waitForFunction(() => window.__v2?.ready === true, null, { timeout: 180000 });
await page.waitForTimeout(800);

/* Compare deux captures dans le navigateur. Retourne le nb de pixels cyan hors
 * silhouette dilatée, le total cyan, et la croissance de la silhouette. */
async function compare(b64Base, b64Hover) {
  return page.evaluate(async ({ b64Base, b64Hover }) => {
    const load = async (b64) => {
      const img = new Image();
      img.src = `data:image/png;base64,${b64}`;
      await img.decode();
      const c = document.createElement("canvas");
      c.width = img.width; c.height = img.height;
      const ctx = c.getContext("2d");
      ctx.drawImage(img, 0, 0);
      return { d: ctx.getImageData(0, 0, c.width, c.height).data, w: c.width, h: c.height };
    };
    const A = await load(b64Base);
    const B = await load(b64Hover);
    const w = A.w, h = A.h;
    const isBase = new Uint8Array(w * h);
    const isCyan = new Uint8Array(w * h);
    for (let i = 0; i < w * h; i++) {
      const j = i * 4;
      // fond clair #f2ece2 -> (242,236,226)
      const da = Math.abs(A.d[j] - 242) + Math.abs(A.d[j+1] - 236) + Math.abs(A.d[j+2] - 226);
      if (da > 30) isBase[i] = 1;
      // cyan 0x35d6d6 -> R=53, G=214, B=214 (getImageData = R,G,B)
      const R = B.d[j], G = B.d[j + 1], Bl = B.d[j + 2];
      const cyan = R < 140 && G > 150 && Bl > 150 && Math.abs(G - Bl) < 60;
      if (cyan) isCyan[i] = 1;
    }
    // Dilatation de la silhouette de base (rayon 10 px, approximation par blocs)
    /* Dilatation euclidienne complète (pas 1 px) : un pas de 2 px manquait
     * les liserés fins d'1 px et produisait des faux positifs ≈75 %. */
    const R = 8;
    const near = new Uint8Array(w * h);
    const R2 = R * R;
    for (let y = 0; y < h; y++) {
      for (let x = 0; x < w; x++) {
        if (!isBase[y * w + x]) continue;
        const y0 = Math.max(0, y - R), y1 = Math.min(h - 1, y + R);
        const x0 = Math.max(0, x - R), x1 = Math.min(w - 1, x + R);
        for (let yy = y0; yy <= y1; yy++) {
          for (let xx = x0; xx <= x1; xx++) {
            const dx = xx - x, dy = yy - y;
            if (dx * dx + dy * dy <= R2) near[yy * w + xx] = 1;
          }
        }
      }
    }
    let cyanTotal = 0, cyanOutside = 0;
    for (let i = 0; i < w * h; i++) {
      if (!isCyan[i]) continue;
      cyanTotal++;
      if (!near[i]) cyanOutside++;
    }
    return { cyanTotal, cyanOutside, ratio: cyanTotal ? cyanOutside / cyanTotal : 0 };
  }, { b64Base, b64Hover });
}

/* Échantillon : accent sur les structures fines/allongées (vaisseaux, nerfs). */
const sample = await page.evaluate((limit) => {
  const e = window.__v2;
  const all = e.structures;
  const fine = all.filter((s) => /arter|vein|nerve|bronch|trache|duct|ligament|tendon/i.test((s.en || "") + " " + (s.fr || "")));
  const other = all.filter((s) => !fine.includes(s));
  const picked = [];
  for (const src of [fine, other]) {
    const step = Math.max(1, Math.floor(src.length / Math.ceil(limit / 2)));
    for (let i = 0; i < src.length && picked.length < limit; i += step) picked.push(src[i].id);
  }
  return picked.slice(0, limit);
}, LIMIT);

const findings = [];
for (const [idx, id] of sample.entries()) {
  await page.evaluate((id) => {
    const e = window.__v2;
    const s = e.byId.get(id);
    if (!s) return;
    e.isolate(s);
    const b = s.bounds;
    const c = new (e.camera.position.constructor)((b.min[0]+b.max[0])/2, (b.min[1]+b.max[1])/2, (b.min[2]+b.max[2])/2);
    const radius = Math.max((b.max[0]-b.min[0])/2, (b.max[1]-b.min[1])/2, (b.max[2]-b.min[2])/2, 0.02);
    const dir = e.camera.position.clone().sub(c).normalize();
    e.camera.position.copy(c).addScaledVector(dir, Math.max(0.3, radius * 4));
    e.camera.lookAt(c);
    /* Désactive le damping pour que la caméra soit stable entre les captures. */
    if (window.__controls) window.__controls.enableDamping = false;
    e.setHover(null);
  }, id).catch(() => {});
  await page.waitForTimeout(250);

  /* Capture UNIQUEMENT le canvas WebGL (pas les overlays DOM qui changent
   * entre les deux prises et créent des faux positifs). */
  const grab = () => page.evaluate(() => {
    window.__renderer.render(window.__scene, window.__v2.camera);
    return window.__renderer.domElement.toDataURL("image/png").split(",")[1];
  });
  const b64Base = await grab();
  await page.evaluate((id) => {
    const e = window.__v2;
    const s = e.byId.get(id);
    if (s) e.setHover(s);
  }, id);
  await page.waitForTimeout(120);
  const b64Hover = await grab();

  const r = await compare(b64Base, b64Hover);
  const name = id.replace(/[^A-Za-z0-9_-]/g, "_");
  fs.writeFileSync(path.join(OUT, `${String(idx).padStart(3, "0")}-${name}-base.png`), Buffer.from(b64Base, "base64"));
  fs.writeFileSync(path.join(OUT, `${String(idx).padStart(3, "0")}-${name}-hover.png`), Buffer.from(b64Hover, "base64"));

  if (r.cyanTotal > 20 && r.ratio > THRESHOLD) {
    findings.push({ id, ...r, ratio: +r.ratio.toFixed(3) });
  }
}

const report = { generated: new Date().toISOString(), sampled: sample.length, threshold: THRESHOLD, findings, errors };
fs.writeFileSync(path.join(OUT, "..", "visual-collisions.json"), JSON.stringify(report, null, 2));
const md = [
  "# Collisions de contour hover — détection par dilatation",
  "",
  `${sample.length} structures, seuil ${(THRESHOLD * 100).toFixed(0)} % de contour hors silhouette.`,
  `${findings.length} anomalie(s).`,
  "",
];
for (const f of findings.slice(0, 40)) md.push(`- **${f.id}** : ${(f.ratio * 100).toFixed(1)} % hors silhouette (${f.cyanOutside}/${f.cyanTotal} px cyan)`);
if (!findings.length) md.push("- Aucun débordement de contour détecté.");
fs.writeFileSync(path.join(OUT, "rapport-collisions.md"), md.join("\n"));

console.log(`Collisions visuelles : ${sample.length} structures, ${findings.length} anomalie(s)`);
for (const f of findings.slice(0, 20)) console.log(`  ${f.id}: ${(f.ratio * 100).toFixed(1)} %`);
await browser.close();
process.exit(findings.length || errors.length ? 1 : 0);
