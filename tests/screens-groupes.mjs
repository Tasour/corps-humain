import fs from "node:fs";
import path from "node:path";
import { chromium } from "/home/tasour/.local/share/mise/installs/playwright/latest/node_modules/playwright/index.mjs";
import { GROUPS } from "../src/data/groups.js";
import { AnatomyTree } from "../src/data/hierarchy.js";

/* Un groupe = un screen par orientation.
 *
 * Les groupes ne sont PAS devinés par des filtres de coordonnées (un filtre
 * `y ∈ [0.75, 1.05]` faisait apparaître des avant-bras dans l'abdomen) : on
 * utilise les vrais groupes de l'interface (`src/data/groups.js`) et les
 * nœuds de l'explorateur hiérarchique (`src/data/hierarchy.js`). Chaque
 * groupe est isolé, cadré sur ses propres bornes, puis capturé sous quatre
 * orientations (face, dos, profil gauche, profil droit).
 *
 * Les PNG sont le support de relecture des agents de correction : chaque
 * groupe doit pouvoir être jugé sans connaître le code. */
const BASE = process.env.TEST_BASE || "http://localhost:5199";
const OUT = process.env.SCREENS_OUT || path.resolve(import.meta.dirname, "../docs/analyses/screens-groupes");
const ONLY = process.env.SCREENS_ONLY ? new Set(process.env.SCREENS_ONLY.split(",")) : null;

const manifest = JSON.parse(
  fs.readFileSync(path.resolve(import.meta.dirname, "../public/models/v2/manifest.json"), "utf8"),
);
const tree = new AnatomyTree(manifest.structures);
const byId = new Map(manifest.structures.map((s) => [s.id, s]));

/* --- Définition des groupes ------------------------------------------------
 * 1. les trois grands blocs de l'explorateur ;
 * 2. leurs sous-blocs directs (organes par système, muscles, squelette) ;
 * 3. les groupes d'animation de l'interface (bras, jambes, cœur, poumons…). */
const groups = [];
const seen = new Set();
function addGroup(id, label, ids, kind) {
  if (!ids || !ids.length || seen.has(id)) return;
  seen.add(id);
  groups.push({ id, label, ids, kind });
}

addGroup("bloc-organes", "Bloc Organes et systèmes", tree.root.children.find((n) => /Organes/.test(n.label))?.ids, "bloc");
addGroup("bloc-muscles", "Bloc Système musculaire", tree.root.children.find((n) => /musculaire/.test(n.label))?.ids, "bloc");
addGroup("bloc-squelette", "Bloc Système squelettique", tree.root.children.find((n) => /squelettique/.test(n.label))?.ids, "bloc");

function addNode(node, kind) {
  const slug = node.id.replace(/^root\//, "").replace(/[^a-zA-Z0-9]+/g, "-").toLowerCase();
  addGroup(slug, node.label, node.ids, kind);
}

for (const top of tree.root.children) {
  for (const sub of top.children) addNode(sub, "sous-bloc");
}

/* Les appareils (digestif, urinaire) sont un niveau plus bas que les grands
 * systèmes : sans cela ils n'auraient aucun screen dédié et leurs défauts
 * visuels resteraient invisibles. On descend jusqu'aux appareils, pas plus. */
const viscera = tree.get("root/Organes et systèmes/Systèmes viscéraux");
if (viscera) {
  for (const sub of viscera.children) {
    addNode(sub, "appareil");
    if (sub.label === "Abdomen") for (const leaf of sub.children) addNode(leaf, "appareil");
  }
}

for (const g of GROUPS) addGroup(`ui-${g.id}`, g.label, g.members, "groupe-ui");

/* --- Orientations ---------------------------------------------------------
 * `dir` est la direction unitaire de la caméra depuis le centre du groupe. */
const ANGLES = [
  { name: "face", dir: [0, 0, 1] },
  { name: "dos", dir: [0, 0, -1] },
  { name: "profil-gauche", dir: [1, 0, 0] },
  { name: "profil-droit", dir: [-1, 0, 0] },
];

fs.mkdirSync(OUT, { recursive: true });

const browser = await chromium.launch({ executablePath: "/usr/bin/chromium" });
const page = await browser.newPage({ viewport: { width: 900, height: 900 } });
page.setDefaultTimeout(180000);
const errors = [];
page.on("pageerror", (e) => errors.push(String(e)));
await page.goto(`${BASE}/v2.html`);
await page.waitForFunction(() => window.__v2?.ready === true, null, { timeout: 240000 });
await page.waitForTimeout(1200);

const report = { generated: new Date().toISOString(), groups: [], errors };
for (const group of groups) {
  if (ONLY && !ONLY.has(group.id)) continue;
  /* Bornes du groupe, calculées sur les structures réellement présentes. */
  let min = [Infinity, Infinity, Infinity];
  let max = [-Infinity, -Infinity, -Infinity];
  const ids = group.ids.filter((id) => byId.has(id));
  for (const id of ids) {
    const b = byId.get(id).bounds;
    for (let i = 0; i < 3; i++) {
      min[i] = Math.min(min[i], b.min[i]);
      max[i] = Math.max(max[i], b.max[i]);
    }
  }
  if (!ids.length || !Number.isFinite(min[0])) continue;
  const center = [(min[0] + max[0]) / 2, (min[1] + max[1]) / 2, (min[2] + max[2]) / 2];
  const radius = Math.max(
    (max[0] - min[0]) / 2,
    (max[1] - min[1]) / 2,
    (max[2] - min[2]) / 2,
    0.05,
  );
  const dist = radius * 3.4;

  await page.evaluate((ids) => {
    const e = window.__v2;
    /* Active TOUTES les catégories du groupe : sans cela un groupe musculaire
     * restait vide car les muscles sont masqués par défaut. */
    const cats = new Set(ids.map((id) => e.byId.get(id)?.category).filter(Boolean));
    for (const cat of cats) e.setCategoryVisible(cat, true);
    e.setSkinVisible(false);
    e.showCollection(ids);
  }, ids);

  const files = [];
  for (const angle of ANGLES) {
    const dataUrl = await page.evaluate(({ center, dist, dir }) => {
      const cam = window.__v2.camera;
      cam.position.set(
        center[0] + dir[0] * dist,
        center[1] + dir[1] * dist,
        center[2] + dir[2] * dist,
      );
      cam.lookAt(center[0], center[1], center[2]);
      if (window.__controls) {
        window.__controls.target.set(center[0], center[1], center[2]);
        window.__controls.enableDamping = false;
      }
      window.__renderer.render(window.__scene, cam);
      return window.__renderer.domElement.toDataURL("image/jpeg", 0.85).split(",")[1];
    }, { center, dist, dir: angle.dir });
    const file = path.join(OUT, `${group.id}-${angle.name}.jpg`);
    fs.writeFileSync(file, Buffer.from(dataUrl, "base64"));
    files.push(path.basename(file));
  }
  report.groups.push({ id: group.id, label: group.label, kind: group.kind, count: ids.length, center, radius, files });
  console.log(`${group.id} (${group.label}) : ${ids.length} structures, 4 orientations`);
}

fs.writeFileSync(path.join(OUT, "index.json"), JSON.stringify(report, null, 2));
console.log(`GROUPES ${report.groups.length} · SCREENS ${report.groups.length * ANGLES.length} · ERREURS ${errors.length ? errors.join(" | ") : "aucune"}`);
await browser.close();
