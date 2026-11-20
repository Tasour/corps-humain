import fs from "node:fs";
import path from "node:path";
import { spawn } from "node:child_process";
import { chromium } from "playwright";

/* BENCH-002 — garantie « zéro réseau » de l'atlas CORPS.
 *
 * Deux contrôles complémentaires :
 *  1. statique : aucun motif de CDN, police distante ou analytics dans les
 *     fichiers réellement servis (index.html, v2.html et src/**) ;
 *  2. dynamique : aucune requête HTTP(S) vers une origine autre que celle du
 *     serveur local lors du chargement des deux pages.
 *
 * Les <a href="https://…"> de citation sont autorisés : ce sont des liens, pas
 * des requêtes. Les data: sont locales par définition.
 *
 * Usage : npm run test:reseau
 *         TEST_BASE=http://localhost:5199 node tests/reseau-local.mjs
 * Sortie : docs/analyses/reseau-local.json
 */

const ROOT = path.resolve(import.meta.dirname, "..");
const OUT = path.join(ROOT, "docs/analyses/reseau-local.json");
const BASE = process.env.TEST_BASE || "http://127.0.0.1:5199";
let parsedBase;
try { parsedBase = new URL(BASE); } catch { throw new Error(`TEST_BASE invalide : ${BASE}`); }
if (!/^https?:$/.test(parsedBase.protocol)) throw new Error(`TEST_BASE doit être http(s) : ${BASE}`);
const FORBIDDEN = [
  "fonts.googleapis",
  "fonts.gstatic",
  "googletagmanager",
  "gtag(",
  "google-analytics",
  "cloudflareinsights",
  "cdn.jsdelivr.net",
  "unpkg.com",
  "cdnjs.cloudflare.com",
];

function collectFiles(dir, out = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (entry.name === "node_modules" || entry.name === ".git") continue;
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) collectFiles(full, out);
    else if (/\.(html|js|css)$/.test(entry.name)) out.push(full);
  }
  return out;
}

const staticFiles = [
  path.join(ROOT, "index.html"),
  path.join(ROOT, "v2.html"),
  ...collectFiles(path.join(ROOT, "src")),
];
const staticHits = [];
for (const file of staticFiles) {
  const text = fs.readFileSync(file, "utf8");
  for (const needle of FORBIDDEN) {
    if (text.toLowerCase().includes(needle.toLowerCase())) {
      staticHits.push({ file: path.relative(ROOT, file), motif: needle });
    }
  }
}

let server = null;
if (!process.env.TEST_BASE) {
  server = spawn(path.join(ROOT, "node_modules/.bin/vite"), ["--host", "127.0.0.1", "--port", "5199", "--strictPort"], {
    cwd: ROOT,
    stdio: "ignore",
  });
  let ready = false;
  for (let i = 0; i < 60; i++) {
    try {
      const res = await fetch(BASE, { signal: AbortSignal.timeout(2000) });
      if (res.ok) { ready = true; break; }
    } catch { /* serveur pas encore démarré */ }
    await new Promise((r) => setTimeout(r, 300));
  }
  if (!ready) {
    server.kill("SIGTERM");
    throw new Error(`serveur Vite indisponible sur ${BASE}`);
  }
}

const baseOrigin = parsedBase.origin;
const REQUEST_CAP = 500;
const browser = await chromium.launch({
  executablePath: process.env.CI ? undefined : "/usr/bin/chromium",
});
const pages = [];
try {
  for (const route of ["/", "/v2.html"]) {
    const context = await browser.newContext({ viewport: { width: 1360, height: 880 } });
    const page = await context.newPage();
    let requests = 0;
    const external = [];
    page.on("request", (req) => {
      const url = req.url();
      requests++;
      if (/^(data|blob|about):/.test(url)) return;
      let origin;
      try { origin = new URL(url).origin; } catch { return; }
      if (origin !== baseOrigin && external.length < REQUEST_CAP) external.push(url);
    });
    await page.goto(`${BASE}${route}`, { waitUntil: "load", timeout: 120000 });
    if (route === "/v2.html") {
      await page.waitForFunction(() => window.__v2?.ready === true, null, { timeout: 120000 });
    }
    await page.waitForTimeout(800);
    pages.push({ route, totalRequests: requests, external, tronque: external.length >= REQUEST_CAP });
    await context.close();
  }
} finally {
  await browser.close();
  if (server) server.kill("SIGTERM");
}

const externalCount = pages.reduce((n, p) => n + p.external.length, 0);
const report = {
  generated: new Date().toISOString(),
  base: BASE,
  static: { scanned: staticFiles.length, forbidden: staticHits },
  pages,
  externalCount,
  pass: staticHits.length === 0 && externalCount === 0,
};
fs.mkdirSync(path.dirname(OUT), { recursive: true });
fs.writeFileSync(OUT, JSON.stringify(report, null, 1));
console.log(`[reseau] ${report.pass ? "OK" : "ECHEC"} — ${staticFiles.length} fichiers scannés, ${externalCount} requête(s) externe(s), ${staticHits.length} motif(s) interdit(s)`);
for (const p of pages) console.log(`  ${p.route} : ${p.totalRequests} requêtes, ${p.external.length} externe(s)`);
if (!report.pass) {
  for (const h of staticHits.slice(0, 10)) console.log(`  motif ${h.motif} dans ${h.file}`);
  for (const p of pages) for (const u of p.external.slice(0, 10)) console.log(`  externe ${p.route} → ${u}`);
  const restants = externalCount - pages.reduce((n, p) => n + Math.min(10, p.external.length), 0);
  if (restants > 0) console.log(`  … ${restants} autre(s) (plafond d'affichage 10 par page)`);
  process.exit(1);
}
