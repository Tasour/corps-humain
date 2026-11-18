import fs from "node:fs";
import path from "node:path";
import { chromium } from "/home/tasour/.local/share/mise/installs/playwright/latest/node_modules/playwright/index.mjs";

/* Vérification visuelle systémique par screenshots multi-angles.
 *
 * Principe : on place la caméra de la scène (exposée via window.__renderer /
 * window.__scene et window.__v2.camera) à cinq points de vue différents, on
 * capture le canvas WebGL, puis on analyse chaque PNG dans le navigateur
 * (canvas 2D + getImageData) pour :
 *   1. compter les pixels « non-fond » (le modèle) ;
 *   2. mesurer la part de ces pixels qui touche chaque bord du cadre.
 *
 * Un débordement > LIMIT % sur n'importe quel bord est une collision de cadrage
 * et fait échouer le test. Les captures sont conservées dans
 * docs/analyses/visual/ pour relecture humaine.
 */
const BASE = process.env.TEST_BASE || "http://localhost:5199";
const OUT = process.env.VISUAL_OUT || path.resolve(import.meta.dirname, "../docs/analyses/visual");
const LIMIT = Number(process.env.MULTI_EDGE_LIMIT || 2); // pourcentage maxi par bord
fs.mkdirSync(OUT, { recursive: true });

/* OrbitControls.target initial de v2.html : (0, 1, 0). On vise toujours ce
 * point pour que controls.update() ne contredise pas notre lookAt. */
const TARGET = [0, 1.0, 0];

const ANGLES = [
  { name: "face",           pos: [0, 1.2, 2.5],   target: TARGET },
  { name: "dos",            pos: [0, 1.2, -2.5],  target: TARGET },
  { name: "profil-gauche",  pos: [2.5, 1.2, 0],   target: TARGET },
  { name: "profil-droit",   pos: [-2.5, 1.2, 0],  target: TARGET },
  { name: "zoom-thorax",    pos: [0, 1.35, 0.9],  target: TARGET },
];

const browser = await chromium.launch({ executablePath: "/usr/bin/chromium" });
const page = await browser.newPage({ viewport: { width: 1600, height: 1000 } });
page.setDefaultTimeout(120000);
const errors = [];
page.on("pageerror", (e) => errors.push(String(e)));

await page.goto(`${BASE}/v2.html`);
await page.waitForFunction(() => window.__v2?.ready === true, null, { timeout: 180000 });
/* Attendre la fin du réglage LOD automatique (déclenché à 4 s) pour que tous
 * les angles soient capturés dans le même état de rendu. */
await page.waitForTimeout(4500);

const bgHex = await page.evaluate(() => window.__scene?.background?.getHexString?.() || "");

/* Analyse d'un PNG : pixels non-fond et occupation de chaque bande de bord. */
async function analyze(buffer) {
  const b64 = buffer.toString("base64");
  return page.evaluate(async ({ b64, bgHex }) => {
    const img = new Image();
    img.src = `data:image/png;base64,${b64}`;
    await img.decode();
    const c = document.createElement("canvas");
    c.width = img.width;
    c.height = img.height;
    const ctx = c.getContext("2d", { willReadFrequently: true });
    ctx.drawImage(img, 0, 0);
    const { data } = ctx.getImageData(0, 0, c.width, c.height);
    const w = c.width, h = c.height;

    /* Couleur de fond : celle de la scène, ou — à défaut — le pixel du coin. */
    let bg;
    if (/^[0-9a-f]{6}$/i.test(bgHex || "")) {
      bg = [parseInt(bgHex.slice(0, 2), 16), parseInt(bgHex.slice(2, 4), 16), parseInt(bgHex.slice(4, 6), 16)];
    } else {
      bg = [data[0], data[1], data[2]];
    }
    const TH = 30; // tolérance sur la somme des écarts RVB
    const band = Math.max(2, Math.round(Math.min(w, h) * 0.01));
    const area = { haut: w * band, bas: w * band, gauche: h * band, droite: h * band };
    const edges = { haut: 0, bas: 0, gauche: 0, droite: 0 };
    let nonBg = 0;

    for (let y = 0; y < h; y++) {
      for (let x = 0; x < w; x++) {
        const i = (y * w + x) * 4;
        const dist = Math.abs(data[i] - bg[0]) + Math.abs(data[i + 1] - bg[1]) + Math.abs(data[i + 2] - bg[2]);
        if (dist <= TH) continue;
        nonBg++;
        if (y < band) edges.haut++;
        if (y >= h - band) edges.bas++;
        if (x < band) edges.gauche++;
        if (x >= w - band) edges.droite++;
      }
    }
    const pct = {};
    for (const k of Object.keys(edges)) pct[k] = +(100 * edges[k] / area[k]).toFixed(3);
    return {
      w, h, bg, band, nonBg,
      nonBgPct: +(100 * nonBg / (w * h)).toFixed(3),
      edges, edgePct: pct,
    };
  }, { b64, bgHex });
}

const results = [];
for (const angle of ANGLES) {
  /* Positionnement direct de la caméra + rendu synchrone via __renderer/__scene. */
  await page.evaluate(({ pos, target }) => {
    const r = window.__renderer;
    const s = window.__scene;
    const cam = window.__v2.camera;
    cam.position.set(pos[0], pos[1], pos[2]);
    cam.lookAt(target[0], target[1], target[2]);
    r.render(s, cam);
  }, { pos: angle.pos, target: angle.target });

  /* La boucle de rendu à la demande recalcule la visibilité (culling) au
   * changement de caméra : on lui laisse quelques frames avant la capture. */
  await page.waitForTimeout(400);

  /* Capture des pixels WebGL uniquement : un screenshot Playwright de l'élément
   * inclurait les overlays DOM (HUD, barre d'animations) et fausserait le
   * comptage de pixels sur les bords. On rend puis on lit le canvas dans la
   * même frame, avant que le tampon ne soit recomposé. */
  const dataUrl = await page.evaluate(() => {
    const r = window.__renderer;
    r.render(window.__scene, window.__v2.camera);
    return r.domElement.toDataURL("image/png");
  });
  const png = Buffer.from(dataUrl.slice(dataUrl.indexOf(",") + 1), "base64");
  fs.writeFileSync(path.join(OUT, `multi-${angle.name}.png`), png);
  const a = await analyze(png);

  const worst = Object.entries(a.edgePct).reduce((m, e) => (e[1] > m[1] ? e : m), ["", -1]);
  results.push({
    name: angle.name,
    pos: angle.pos,
    ...a,
    worstEdge: worst[0],
    worstPct: worst[1],
    pass: worst[1] <= LIMIT,
  });
}

await page.evaluate(() => window.__v2Stop?.()).catch(() => {});
await browser.close();

const overall = results.every((r) => r.pass) && errors.length === 0;
const verdict = overall ? "PASS" : "FAIL";
const fmt = (n) => n.toFixed(3).replace(".", ",");

const md = [
  "# Analyse visuelle multi-angles — collisions de cadrage",
  "",
  `Généré le ${new Date().toISOString()} · base \`${BASE}\` · seuil **${LIMIT} %** par bord.`,
  "",
  `Caméra positionnée directement via \`window.__renderer\` / \`window.__scene\` (\`window.__v2.camera\`), cible OrbitControls \`(${TARGET.join(", ")})\`.`,
  `Fond de scène : \`#${bgHex}\` · bande de bord : 1 % de la plus petite dimension.`,
  "",
  "## Comptage des pixels",
  "",
  "| Angle | Position caméra | Pixels non-fond | % de l'image | Bande (px) |",
  "|---|---|---:|---:|---:|",
  ...results.map((r) => `| ${r.name} | (${r.pos.join(", ")}) | ${r.nonBg.toLocaleString("fr-FR")} | ${fmt(r.nonBgPct)} % | ${r.band} |`),
  "",
  "## Débordements par bord (% de la bande couverte par le modèle)",
  "",
  "| Angle | Haut | Bas | Gauche | Droite | Pire bord | Verdict |",
  "|---|---:|---:|---:|---:|---|---|",
  ...results.map((r) => `| ${r.name} | ${fmt(r.edgePct.haut)} % | ${fmt(r.edgePct.bas)} % | ${fmt(r.edgePct.gauche)} % | ${fmt(r.edgePct.droite)} % | ${r.worstEdge} (${fmt(r.worstPct)} %) | ${r.pass ? "PASS" : "FAIL"} |`),
  "",
  "## Verdict",
  "",
  `**${verdict}** — ${results.filter((r) => r.pass).length}/${results.length} angles sans débordement.`,
  "",
  ...(errors.length ? [`Erreurs de page (${errors.length}) :`, ...errors.map((e) => `- ${e}`), ""] : []),
  "Captures : `multi-{angle}.png` dans ce dossier.",
  "",
];
fs.writeFileSync(path.join(OUT, "multi-rapport.md"), md.join("\n"));

console.log(`Multi-angles : ${verdict} — ${results.filter((r) => r.pass).length}/${results.length} angles OK (seuil ${LIMIT} %/bord)`);
for (const r of results) {
  console.log(`  ${r.name.padEnd(14)} ${String(r.nonBg).padStart(8)} px non-fond (${fmt(r.nonBgPct)} %) · pire bord ${r.worstEdge} ${fmt(r.worstPct)} % → ${r.pass ? "PASS" : "FAIL"}`);
}
for (const e of errors) console.error(`  pageerror: ${e}`);
process.exit(overall ? 0 : 1);
