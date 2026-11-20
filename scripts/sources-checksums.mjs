import fs from "node:fs";
import path from "node:path";
import crypto from "node:crypto";
import { execFileSync } from "node:child_process";

/* Vérifie ou régénère les empreintes des sources 3D.
 * node scripts/sources-checksums.mjs --refresh
 * node scripts/sources-checksums.mjs --check
 */

const ROOT = path.resolve(import.meta.dirname, "..");
const BP = process.env.ANATOMY_SOURCE || "/home/tasour/.cache/corps-sources/human-atlas/public/models";
const FILE = path.join(ROOT, "docs/analyses/sources-checksums.json");
const REFRESH = process.argv.includes("--refresh");

function sha256(file) {
  const h = crypto.createHash("sha256");
  h.update(fs.readFileSync(file));
  return h.digest("hex");
}
function bpCommit() {
  try { return execFileSync("git", ["-C", path.dirname(path.dirname(BP)), "rev-parse", "HEAD"], { encoding: "utf8" }).trim(); }
  catch { return null; }
}
function list() {
  const files = [
    "zanatomy-export/zanatomy-all.json", "zanatomy-export/zanatomy-all.bin",
    "zanatomy-export/zanatomy.json", "zanatomy-export/zanatomy.bin",
    "docs/inventaire-anatomique/structures.json",
  ].map((f) => path.join(ROOT, f));
  const atlas = JSON.parse(fs.readFileSync(path.join(BP, "atlas.json"), "utf8"));
  files.push(path.join(BP, "atlas.json"));
  for (const chunk of atlas.chunks || []) {
    const f = path.join(BP, path.basename(chunk.url));
    if (fs.existsSync(f)) files.push(f);
  }
  return files;
}

if (REFRESH) {
  const files = list();
  const out = {
    generated: new Date().toISOString(),
    bpSource: BP,
    bpCommit: bpCommit(),
    files: Object.fromEntries(files.map((f) => [path.relative(ROOT, f).startsWith("/") ? path.relative(ROOT, f) : path.relative(ROOT, f), sha256(f)])),
  };
  fs.mkdirSync(path.dirname(FILE), { recursive: true });
  fs.writeFileSync(FILE, JSON.stringify(out, null, 1));
  console.log(`[sources] ${files.length} empreintes écrites dans ${path.relative(ROOT, FILE)}`);
} else {
  const data = JSON.parse(fs.readFileSync(FILE, "utf8"));
  const missing = [], changed = [];
  for (const [rel, expected] of Object.entries(data.files)) {
    const file = path.isAbsolute(rel) ? rel : path.join(ROOT, rel);
    if (!fs.existsSync(file)) { missing.push(rel); continue; }
    if (sha256(file) !== expected) changed.push(rel);
  }
  if (missing.length || changed.length) {
    console.error(`[sources] ÉCHEC — ${missing.length} manquants, ${changed.length} modifiés`);
    for (const m of missing.slice(0, 10)) console.error(`  manquant : ${m}`);
    for (const c of changed.slice(0, 10)) console.error(`  modifié  : ${c}`);
    process.exit(1);
  }
  console.log(`[sources] OK — ${Object.keys(data.files).length} fichiers vérifiés (commit BP3D ${data.bpCommit || "inconnu"})`);
}
