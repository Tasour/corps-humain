import fs from "node:fs";
import path from "node:path";
import crypto from "node:crypto";
import { chromium } from "/home/tasour/.local/share/mise/installs/playwright/latest/node_modules/playwright/index.mjs";

/* Captures qualité 3D — 8 angles par sujet, protocole déterministe.
 *
 * Sujets par défaut : les 5 structures pilotes du plan qualité
 * (cœur, encéphale, main droite, face, genou droit).
 *
 * Protocole :
 *  - canvas forcé à 1024 × 1024, pixel ratio 1 ;
 *  - fond neutre fixe, ombres et sol masqués ;
 *  - caméra placée sur les 8 directions canoniques, cadrage calculé sur les
 *    8 coins de la boîte englobante projetée (pas un simple rayon) ;
 *  - LOD `high` promu pour chaque structure du sujet ;
 *  - capture du canvas WebGL seul (aucun overlay DOM) en JPEG 0.92 ;
 *  - analyse de pixels : couverture, marges, débordement ;
 *  - SHA-256 de chaque fichier pour détecter une dérive silencieuse.
 *
 * Usage :
 *   node scripts/captures-qualite-3d.mjs
 *   QUALITE_SUBJECTS=coeur,main-droite node scripts/captures-qualite-3d.mjs
 *   QUALITE_IDS=organ:bp-heart,bone:patella-r node scripts/captures-qualite-3d.mjs
 */

const BASE = process.env.TEST_BASE || "http://localhost:5199";
const OUT = process.env.QUALITE_CAPTURES_OUT || path.resolve(import.meta.dirname, "../docs/analyses/qualite-3d");
const SIZE = Number(process.env.QUALITE_CAPTURE_SIZE || 1024);
const BG = process.env.QUALITE_BG || "1b1f24";
const ONLY = process.env.QUALITE_SUBJECTS ? new Set(process.env.QUALITE_SUBJECTS.split(",")) : null;

const manifest = JSON.parse(
  fs.readFileSync(path.resolve(import.meta.dirname, "../public/models/v2/manifest.json"), "utf8"),
);
const byId = new Map(manifest.structures.map((s) => [s.id, s]));

/* Les 5 pilotes du plan. Les identifiants sont vérifiés à l'exécution : un
 * pilote absent doit faire échouer la capture, pas produire une image vide. */
const PRIORITY = [
  {
    id: "coeur",
    label: "Cœur",
    /* `organ:bp-heart` ne contient que les valves, le sinus coronaire et des
     * veines cardiaques (11 pièces BodyParts3D) : pas de myocarde. Le sujet
     * « cœur » doit donc réunir les quatre chambres Z-Anatomy et les valves. */
    ids: [
      "organ:left-ventricle",
      "organ:right-ventricle",
      "organ:left-atrium",
      "organ:right-atrium",
      "organ:bp-heart",
      "organ:bp-fibrous-skeleton-of-heart",
    ],
  },
  { id: "encephale", label: "Encéphale", ids: ["organ:bp-brain"] },
  {
    id: "main-droite",
    label: "Main droite",
    ids: manifest.structures
      .filter((s) => /(hand|carpal|metacarpal|finger-of-hand|scaphoid|lunate|triquetrum|pisiform|trapezium|trapezoid|capitate|hamate)/.test(s.id)
        && /-r$/.test(s.id) && !/sulcus/.test(s.id))
      .map((s) => s.id),
  },
  { id: "face", label: "Face", ids: ["organ:bp-face"] },
  {
    id: "genou-droit",
    label: "Genou droit",
    ids: ["bone:femur-r", "bone:tibia-r", "bone:patella-r"],
    focus: "bone:patella-r",
    pad: 0.10,
    clipPad: 0.09,
  },
];

const SUBJECTS = process.env.QUALITE_IDS
  ? [{ id: "custom", label: "Sujet personnalisé", ids: process.env.QUALITE_IDS.split(",").map((s) => s.trim()).filter(Boolean) }]
  : PRIORITY;

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

function boundsFor(subject) {
  const ids = subject.ids.filter((id) => byId.has(id));
  const missing = subject.ids.filter((id) => !byId.has(id));
  if (!ids.length) return { ids, missing, error: "aucune structure présente" };
  if (subject.focus) {
    const focus = byId.get(subject.focus);
    if (!focus) return { ids, missing, error: `focus absent : ${subject.focus}` };
    const pad = subject.pad || 0;
    const clipPad = subject.clipPad ?? null;
    return {
      ids,
      missing,
      min: focus.bounds.min.map((v) => v - pad),
      max: focus.bounds.max.map((v) => v + pad),
      focus: subject.focus,
      clip: clipPad === null ? null : {
        axis: "y",
        min: focus.bounds.min[1] - clipPad,
        max: focus.bounds.max[1] + clipPad,
      },
    };
  }
  const min = [Infinity, Infinity, Infinity];
  const max = [-Infinity, -Infinity, -Infinity];
  for (const id of ids) {
    const b = byId.get(id).bounds;
    for (let i = 0; i < 3; i++) {
      min[i] = Math.min(min[i], b.min[i]);
      max[i] = Math.max(max[i], b.max[i]);
    }
  }
  return { ids, missing, min, max };
}

fs.mkdirSync(OUT, { recursive: true });

const browser = await chromium.launch({ executablePath: "/usr/bin/chromium" });
const page = await browser.newPage({ viewport: { width: 1280, height: 1280 } });
page.setDefaultTimeout(300000);
const errors = [];
page.on("pageerror", (e) => errors.push(String(e)));
page.on("console", (m) => { if (m.type() === "error") errors.push(m.text()); });

await page.goto(`${BASE}/v2.html`);
await page.waitForFunction(() => window.__v2?.ready === true, null, { timeout: 300000 });
await page.waitForTimeout(800);

/* Fond, sol, ombres : on fixe l'état de rendu une fois pour toutes. */
const original = await page.evaluate(({ bg, size }) => {
  const r = window.__renderer;
  const s = window.__scene;
  const original = {
    bg: s.background?.getHexString?.() || null,
    exposure: r.toneMappingExposure,
    shadows: r.shadowMap.enabled,
    pixelRatio: r.getPixelRatio(),
  };
  s.background?.setHex?.(parseInt(bg, 16));
  r.toneMappingExposure = 1.15;
  r.shadowMap.enabled = false;
  r.setPixelRatio(1);
  r.setSize(size, size, false);
  window.__v2.camera.aspect = 1;
  window.__v2.camera.updateProjectionMatrix();
  const hidden = [];
  s.traverse((o) => {
    if (o.material?.type === "ShadowMaterial") {
      hidden.push(o);
      o.visible = false;
    }
  });
  window.__qualiteHidden = hidden;
  window.__v2.setSkinVisible(false);
  window.__v2.clearHover?.();
  window.__v2.setWaypointsVisible?.(false);
  return original;
}, { bg: BG, size: SIZE });

const fov = await page.evaluate(() => window.__v2.camera.fov);
const fovRad = fov * Math.PI / 180;

/* Analyse d'une capture JPEG : couverture, boîte du modèle, marges. */
async function analyze(dataUrl) {
  return page.evaluate(async ({ dataUrl, bg }) => {
    const img = new Image();
    img.src = dataUrl;
    await img.decode();
    const c = document.createElement("canvas");
    c.width = img.width;
    c.height = img.height;
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
    const minMargin = Math.min(...Object.values(margins));
    return {
      width: w, height: h,
      coveragePct: +(100 * n / (w * h)).toFixed(2),
      bbox: maxX < 0 ? null : { minX, minY, maxX, maxY },
      margins,
      clipped: maxX < 0 || minMargin < 2,
      empty: n === 0,
    };
  }, { dataUrl, bg: BG });
}

const report = {
  generated: new Date().toISOString(),
  base: BASE,
  protocol: {
    viewport: SIZE,
    pixelRatio: 1,
    background: `#${BG}`,
    fov,
    shadows: false,
    groundHidden: true,
    lod: "high",
    format: "jpeg",
    quality: 0.92,
    angles: ANGLES.map((a) => ({ name: a.name, dir: a.dir })),
  },
  subjects: [],
  errors,
};

for (const subject of SUBJECTS) {
  if (ONLY && !ONLY.has(subject.id)) continue;
  const b = boundsFor(subject);
  if (b.error) {
    report.subjects.push({ id: subject.id, label: subject.label, ids: subject.ids, error: b.error });
    console.error(`[captures] ${subject.id} : ${b.error}`);
    continue;
  }
  const center = [
    (b.min[0] + b.max[0]) / 2,
    (b.min[1] + b.max[1]) / 2,
    (b.min[2] + b.max[2]) / 2,
  ];
  const half = [
    (b.max[0] - b.min[0]) / 2,
    (b.max[1] - b.min[1]) / 2,
    (b.max[2] - b.min[2]) / 2,
  ];

  /* Isolation + promotion au LOD high de chaque structure du sujet. */
  const promoted = await page.evaluate(async (ids) => {
    const e = window.__v2;
    e.setSkinVisible(false);
    e.showCollection(ids);
    e.clearHover?.();
    e.setWaypointsVisible?.(false);
    let count = 0;
    for (const id of ids) {
      const s = e.byId.get(id);
      if (s && await e.setStructureLod(s, "high")) count++;
    }
    return count;
  }, b.ids);
  await page.waitForTimeout(250);

  /* Coupe locale pour les sujets « région » (genou) : sans elle, les os longs
   * traversent le cadre et le sujet est compté comme débordant. */
  await page.evaluate((clip) => {
    const THREE = window.__THREE;
    const r = window.__renderer;
    for (const batch of window.__v2.batches.values()) {
      batch.material.clippingPlanes = null;
      batch.material.needsUpdate = true;
    }
    if (!clip || !THREE) { r.localClippingEnabled = false; return; }
    r.localClippingEnabled = true;
    const planes = [
      new THREE.Plane(new THREE.Vector3(0, 1, 0), -clip.min),
      new THREE.Plane(new THREE.Vector3(0, -1, 0), clip.max),
    ];
    for (const batch of window.__v2.batches.values()) {
      batch.material.clippingPlanes = planes;
      batch.material.clipShadows = true;
      batch.material.needsUpdate = true;
    }
  }, b.clip || null);

  const dirOut = path.join(OUT, subject.id);
  fs.mkdirSync(dirOut, { recursive: true });
  const captures = [];

  for (const angle of ANGLES) {
    const geometry = await page.evaluate(({ center, half, dir, fovRad }) => {
      /* Base de vue : right = up_monde × dir, up = dir × right. Le repli
       * (1,0,0) évite la dégénérescence quand la caméra est verticale. */
      const dot = (a, b) => a[0] * b[0] + a[1] * b[1] + a[2] * b[2];
      const cross = (a, b) => [a[1] * b[2] - a[2] * b[1], a[2] * b[0] - a[0] * b[2], a[0] * b[1] - a[1] * b[0]];
      const norm = (a) => { const n = Math.hypot(...a); return a.map((v) => v / n); };
      let right = cross([0, 1, 0], dir);
      if (Math.hypot(...right) < 1e-6) right = [1, 0, 0];
      right = norm(right);
      const up = norm(cross(dir, right));
      /* Les 8 coins de la boîte, projetés sur right/up/dir. */
      let maxR = 0, maxU = 0, maxD = 0;
      for (const sx of [-1, 1]) for (const sy of [-1, 1]) for (const sz of [-1, 1]) {
        const p = [half[0] * sx, half[1] * sy, half[2] * sz];
        maxR = Math.max(maxR, Math.abs(dot(p, right)));
        maxU = Math.max(maxU, Math.abs(dot(p, up)));
        maxD = Math.max(maxD, Math.abs(dot(p, dir)));
      }
      const tan = Math.tan(fovRad / 2);
      const dist = (Math.max(maxR, maxU) / tan + maxD) * 1.12;
      return { right, up, dist };
    }, { center, half, dir: angle.dir, fovRad });

    const dataUrl = await page.evaluate(({ center, dir, dist, up }) => {
      const cam = window.__v2.camera;
      const near = Math.max(0.0005, dist / 200);
      cam.near = near;
      cam.far = Math.max(30, dist * 12);
      cam.up.set(up[0], up[1], up[2]);
      cam.position.set(
        center[0] + dir[0] * dist,
        center[1] + dir[1] * dist,
        center[2] + dir[2] * dist,
      );
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
    const analysis = await analyze(dataUrl);
    captures.push({
      angle: angle.name,
      dir: angle.dir,
      distance: +geometry.dist.toFixed(5),
      file: path.relative(path.resolve(import.meta.dirname, ".."), file),
      bytes: buf.length,
      sha256: crypto.createHash("sha256").update(buf).digest("hex").slice(0, 16),
      ...analysis,
    });
    console.log(`[captures] ${subject.id}/${angle.name} · couverture ${analysis.coveragePct}% · marge min ${Math.min(...Object.values(analysis.margins))}%${analysis.clipped ? " · DÉBORDEMENT" : ""}`);
  }

  report.subjects.push({
    id: subject.id,
    label: subject.label,
    ids: b.ids,
    missing: b.missing,
    focus: b.focus || null,
    clip: b.clip || null,
    center,
    half,
    promoted,
    captures,
  });
}

/* Restaure l'état de la page (utile si le script est importé ou relancé). */
await page.evaluate(({ bg, exposure, shadows, pixelRatio }) => {
  const r = window.__renderer;
  const s = window.__scene;
  if (bg) s.background?.setHex?.(parseInt(bg, 16));
  r.toneMappingExposure = exposure;
  r.shadowMap.enabled = shadows;
  r.setPixelRatio(pixelRatio);
  for (const o of window.__qualiteHidden || []) o.visible = true;
}, original).catch(() => {});

fs.writeFileSync(path.join(OUT, "index.json"), JSON.stringify(report, null, 2));
const total = report.subjects.reduce((a, s) => a + (s.captures?.length || 0), 0);
const clipped = report.subjects.reduce((a, s) => a + (s.captures?.filter((c) => c.clipped).length || 0), 0);
console.log(`CAPTURES ${total} · SUJETS ${report.subjects.length} · DÉBORDEMENTS ${clipped} · ERREURS ${errors.length ? errors.join(" | ") : "aucune"}`);
await browser.close();
