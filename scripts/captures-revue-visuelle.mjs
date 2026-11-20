import fs from "node:fs";
import path from "node:path";
import crypto from "node:crypto";
import { chromium } from "/home/tasour/.local/share/mise/installs/playwright/latest/node_modules/playwright/index.mjs";

/* Revue visuelle — captures déterministes de TOUTES les structures.
 *
 * Protocole identique à scripts/captures-qualite-3d.mjs : 1024×1024, pixel
 * ratio 1, fond #1b1f24, ombres et sol masqués, LOD high, 8 directions
 * canoniques, cadrage sur les 8 coins de la boîte, JPEG 0.92, SHA-256.
 *
 * Les images sont stockées HORS du dépôt (disque /home, pas le tmpfs /tmp).
 *
 * Usage :
 *   npm run captures:revue
 *   REVUE_WORKERS=8 npm run captures:revue
 *   REVUE_IDS=organ:bp-heart,bone:femur-l npm run captures:revue
 *   REVUE_LIMIT=20 REVUE_OFFSET=0 npm run captures:revue
 *   REVUE_RESUME=1 npm run captures:revue     (saute les sujets déjà complets)
 */

const BASE = process.env.TEST_BASE || "http://localhost:5199";
const OUT = process.env.REVUE_OUT || "/home/tasour/.cache/revue-visuelle/qualite-3d";
const SIZE = Number(process.env.REVUE_SIZE || 1024);
const BG = process.env.REVUE_BG || "1b1f24";
const WORKERS = Math.max(1, Number(process.env.REVUE_WORKERS || 4));
const LIMIT = Number(process.env.REVUE_LIMIT || 0);
const OFFSET = Number(process.env.REVUE_OFFSET || 0);
const RESUME = process.env.REVUE_RESUME === "1";
const FLUSH = Number(process.env.REVUE_FLUSH || 25);
const CATEGORY = process.env.REVUE_CATEGORY || "";

const ROOT = path.resolve(import.meta.dirname, "..");
const manifest = JSON.parse(fs.readFileSync(path.join(ROOT, "public/models/v2/manifest.json"), "utf8"));

const ANGLES = [
  { name: "face", dir: [0, 0, 1] },
  { name: "dos", dir: [0, 0, -1] },
  { name: "gauche", dir: [1, 0, 0] },
  { name: "droite", dir: [-1, 0, 0] },
  { name: "dessus", dir: [0, 1, 0] },
  { name: "dessous", dir: [0, -1, 0] },
  { name: "trois-quarts-avant-gauche", dir: [1, 0.45, 1] },
  { name: "trois-quarts-arriere-droit", dir: [-1, 0.45, -1] },
].map((a) => {
  const n = Math.hypot(...a.dir);
  return { ...a, dir: a.dir.map((v) => v / n) };
});

let structures = manifest.structures.slice();
if (process.env.REVUE_IDS) {
  const wanted = new Set(process.env.REVUE_IDS.split(",").map((s) => s.trim()).filter(Boolean));
  structures = structures.filter((s) => wanted.has(s.id));
}
if (CATEGORY) structures = structures.filter((s) => s.category === CATEGORY);
structures = structures.slice(OFFSET, LIMIT ? OFFSET + LIMIT : undefined);
fs.mkdirSync(OUT, { recursive: true });

/* Une structure déjà pourvue de ses 8 JPEG et d'une entrée dans un index est
 * sautée en mode reprise : permet de reprendre après une interruption. */
if (RESUME) {
  structures = structures.filter((s) => {
    const dir = path.join(OUT, s.id);
    return !ANGLES.every((a) => fs.existsSync(path.join(dir, `${a.name}.jpg`)));
  });
}

const buckets = Array.from({ length: WORKERS }, () => []);
structures.forEach((s, i) => buckets[i % WORKERS].push(s));

const started = Date.now();
const stamp = () => `${((Date.now() - started) / 1000).toFixed(0)}s`;

async function analyze(page, dataUrl) {
  return page.evaluate(async ({ dataUrl, bg }) => {
    const img = new Image();
    img.src = dataUrl;
    await img.decode();
    const c = document.createElement("canvas");
    c.width = img.width; c.height = img.height;
    const ctx = c.getContext("2d", { willReadFrequently: true });
    ctx.drawImage(img, 0, 0);
    const { data } = ctx.getImageData(0, 0, c.width, c.height);
    const w = c.width, h = c.height;
    const target = [parseInt(bg.slice(0, 2), 16), parseInt(bg.slice(2, 4), 16), parseInt(bg.slice(4, 6), 16)];
    const TH = 42;
    let n = 0, minX = w, minY = h, maxX = -1, maxY = -1;
    for (let y = 0; y < h; y++) {
      for (let x = 0; x < w; x++) {
        const i = (y * w + x) * 4;
        const d = Math.abs(data[i] - target[0]) + Math.abs(data[i + 1] - target[1]) + Math.abs(data[i + 2] - target[2]);
        if (d <= TH) continue;
        n++;
        if (x < minX) minX = x;
        if (x > maxX) maxX = x;
        if (y < minY) minY = y;
        if (y > maxY) maxY = y;
      }
    }
    const margins = maxX < 0
      ? { gauche: 0, droite: 0, haut: 0, bas: 0 }
      : {
        gauche: +(100 * minX / w).toFixed(2),
        droite: +(100 * (w - 1 - maxX) / w).toFixed(2),
        haut: +(100 * minY / h).toFixed(2),
        bas: +(100 * (h - 1 - maxY) / h).toFixed(2),
      };
    return {
      coveragePct: +(100 * n / (w * h)).toFixed(2),
      margins,
      clipped: maxX < 0 || Math.min(...Object.values(margins)) < 2,
      empty: n === 0,
    };
  }, { dataUrl, bg: BG });
}

async function worker(index, list) {
  const browser = await chromium.launch({ executablePath: "/usr/bin/chromium" });
  const page = await browser.newPage({ viewport: { width: 1280, height: 1280 } });
  page.setDefaultTimeout(300000);
  const errors = [];
  page.on("pageerror", (e) => errors.push(String(e)));
  const query = process.env.REVUE_QUERY || "";
  await page.goto(`${BASE}/v2.html${query}`);
  await page.waitForFunction(() => window.__v2?.ready === true, null, { timeout: 300000 });
  await page.waitForTimeout(500);

  await page.evaluate(({ bg, size }) => {
    const r = window.__renderer, s = window.__scene;
    s.background?.setHex?.(parseInt(bg, 16));
    r.toneMappingExposure = 1.15;
    r.shadowMap.enabled = false;
    r.setPixelRatio(1);
    r.setSize(size, size, false);
    /* Le harnais ne doit jamais imposer la distance minimale de l'application
     * (0,12 m dans v2.html) : sur un os de 3 mm, la caméra reste à 12 cm et
     * l'objet occupe 0,06 % du cadre. On désactive la contrainte uniquement
     * pendant la capture, pas dans l'application. */
    if (window.__controls) {
      window.__controls.minDistance = 1e-6;
      window.__controls.maxDistance = 60;
    }
    window.__v2.camera.aspect = 1;
    window.__v2.camera.updateProjectionMatrix();
    s.traverse((o) => { if (o.material?.type === "ShadowMaterial") o.visible = false; });
    window.__v2.setSkinVisible(false);
    window.__v2.clearHover?.();
    window.__v2.setWaypointsVisible?.(false);
  }, { bg: BG, size: SIZE });

  const fov = await page.evaluate(() => window.__v2.camera.fov);
  const fovRad = fov * Math.PI / 180;
  const records = [];
  const indexFile = path.join(OUT, `.index-${index}.json`);

  for (let i = 0; i < list.length; i++) {
    const s = list[i];
    const b = s.bounds;
    const center = b.min.map((v, k) => (v + b.max[k]) / 2);
    const half = b.max.map((v, k) => (v - b.min[k]) / 2);
    let promoted = 0;
    try {
      promoted = await page.evaluate(async (id) => {
        const e = window.__v2;
        e.setSkinVisible(false);
        e.showCollection([id]);
        e.clearHover?.();
        e.setWaypointsVisible?.(false);
        const target = e.byId.get(id);
        return target && await e.setStructureLod(target, "high") ? 1 : 0;
      }, s.id);
      await page.waitForTimeout(60);

      const dirOut = path.join(OUT, s.id);
      fs.mkdirSync(dirOut, { recursive: true });
      const captures = [];
      for (const angle of ANGLES) {
        const geometry = await page.evaluate(({ center, half, dir, fovRad }) => {
          const dot = (a, b) => a[0] * b[0] + a[1] * b[1] + a[2] * b[2];
          const cross = (a, b) => [a[1] * b[2] - a[2] * b[1], a[2] * b[0] - a[0] * b[2], a[0] * b[1] - a[1] * b[0]];
          const norm = (a) => { const n = Math.hypot(...a); return a.map((v) => v / n); };
          let right = cross([0, 1, 0], dir);
          if (Math.hypot(...right) < 1e-6) right = [1, 0, 0];
          right = norm(right);
          const up = norm(cross(dir, right));
          let maxR = 0, maxU = 0, maxD = 0;
          for (const sx of [-1, 1]) for (const sy of [-1, 1]) for (const sz of [-1, 1]) {
            const p = [half[0] * sx, half[1] * sy, half[2] * sz];
            maxR = Math.max(maxR, Math.abs(dot(p, right)));
            maxU = Math.max(maxU, Math.abs(dot(p, up)));
            maxD = Math.max(maxD, Math.abs(dot(p, dir)));
          }
          const tan = Math.tan(fovRad / 2);
          return { up, dist: (Math.max(maxR, maxU) / tan + maxD) * 1.12 };
        }, { center, half, dir: angle.dir, fovRad });

        const dataUrl = await page.evaluate(({ center, dir, dist, up }) => {
          const cam = window.__v2.camera;
          cam.near = Math.max(0.0005, dist / 200);
          cam.far = Math.max(30, dist * 12);
          cam.up.set(up[0], up[1], up[2]);
          cam.position.set(center[0] + dir[0] * dist, center[1] + dir[1] * dist, center[2] + dir[2] * dist);
          cam.lookAt(center[0], center[1], center[2]);
          cam.updateProjectionMatrix();
          if (window.__controls) {
            window.__controls.target.set(center[0], center[1], center[2]);
            window.__controls.enableDamping = false;
            window.__controls.enabled = false;
            window.__controls.update?.();
          }
          window.__renderer.render(window.__scene, cam);
          return window.__renderer.domElement.toDataURL("image/jpeg", 0.92);
        }, { center, dir: angle.dir, dist: geometry.dist, up: geometry.up });

        const buf = Buffer.from(dataUrl.slice(dataUrl.indexOf(",") + 1), "base64");
        const file = path.join(dirOut, `${angle.name}.jpg`);
        fs.writeFileSync(file, buf);
        const a = await analyze(page, dataUrl);
        captures.push({
          angle: angle.name,
          file,
          bytes: buf.length,
          sha256: crypto.createHash("sha256").update(buf).digest("hex").slice(0, 16),
          ...a,
        });
      }
      records.push({
        id: s.id, fr: s.fr, en: s.en, category: s.category, source: s.source,
        bounds: b, promoted, captures,
      });
    } catch (e) {
      records.push({ id: s.id, fr: s.fr, category: s.category, error: String(e) });
      console.error(`[revue:${index}] ${s.id} : ${e}`);
    }
    if ((i + 1) % FLUSH === 0 || i === list.length - 1) {
      fs.writeFileSync(indexFile, JSON.stringify({ worker: index, done: i + 1, total: list.length, records }));
    }
    if ((i + 1) % 10 === 0 || i === list.length - 1) {
      console.log(`[revue:${index}] ${i + 1}/${list.length} structures · ${stamp()}`);
    }
  }
  fs.writeFileSync(indexFile, JSON.stringify({ worker: index, done: list.length, total: list.length, records, errors }));
  await browser.close();
  return records;
}

const results = await Promise.all(buckets.map((list, i) => worker(i, list)));
const all = results.flat();
const index = {
  generated: new Date().toISOString(),
  protocol: {
    viewport: SIZE, pixelRatio: 1, background: `#${BG}`, fov: 50,
    shadows: false, groundHidden: true, lod: "high", format: "jpeg", quality: 0.92,
    angles: ANGLES.map((a) => ({ name: a.name, dir: a.dir })),
  },
  workers: WORKERS,
  structures: all.length,
  images: all.reduce((n, s) => n + (s.captures?.length || 0), 0),
  errors: all.filter((s) => s.error).length,
  clipped: all.reduce((n, s) => n + (s.captures?.filter((c) => c.clipped || c.empty).length || 0), 0),
  subjects: all,
};
fs.writeFileSync(path.join(OUT, "index.json"), JSON.stringify(index, null, 1));
console.log(`REVUE ${index.images} images · ${index.structures} structures · ${index.errors} erreurs · ${index.clipped} cadrages suspects · ${stamp()}`);
