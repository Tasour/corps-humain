/* Harnais P1 — export Z-Anatomy stock reproductible.
 * Deux exports Blender consécutifs doivent produire des octets identiques.
 */

import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import crypto from "node:crypto";
import { spawnSync } from "node:child_process";

const root = path.resolve(import.meta.dirname, "..");
const blender = process.env.BLENDER_BIN || "blender-3.6";
const blend = process.env.ZANATOMY_BLEND || "/home/tasour/.cache/corps-sources/zanatomy-stock/Z-Anatomy/Startup.blend";
const exporter = path.join(root, "scripts/export-zanatomy-stock.py");
const rapportPath = path.join(root, "docs/analyses/harness-blender-export.json");

if (!fs.existsSync(blend)) throw new Error(`Startup.blend absent : ${blend}`);
const version = spawnSync(blender, ["--version"], { encoding: "utf8" }).stdout.split("\n")[0];
if (!/3\.6\./.test(version)) throw new Error(`Blender incompatible (${version}) : le stock exige 3.6.x`);

const dossiers = [];
for (const nom of ["a", "b"]) {
  const dossier = path.join(os.tmpdir(), `corps-stock-${nom}-${process.pid}`);
  fs.mkdirSync(dossier, { recursive: true });
  const resultat = spawnSync(blender, ["-b", blend, "--python", exporter], {
    cwd: root,
    encoding: "utf8",
    env: { ...process.env, STOCK_OUT: dossier },
    maxBuffer: 16 * 1024 * 1024,
  });
  if (resultat.status !== 0) {
    throw new Error(`export ${nom} échoué : ${(resultat.stderr || resultat.stdout).slice(-800)}`);
  }
  dossiers.push(dossier);
}

const sha = (f) => crypto.createHash("sha256").update(fs.readFileSync(f)).digest("hex");
const empreintes = dossiers.map((d) => ({
  bin: sha(path.join(d, "stock.bin")),
  json: sha(path.join(d, "stock.json")),
}));
const manifest = JSON.parse(fs.readFileSync(path.join(dossiers[0], "stock.json"), "utf8"));
const rapport = {
  generated: new Date().toISOString(),
  blender: version,
  source: {
    url: "https://github.com/Z-Anatomy/Models-of-human-anatomy",
    commit: process.env.ZANATOMY_COMMIT || "0a849e8acf7080f8da3251a926fbc160d2bc3f7a",
    blendSha256: sha(blend),
  },
  objets: Object.keys(manifest.objects).length,
  exclusions: manifest.excluded.length,
  ignores: manifest.skipped.length,
  empreintes,
  byteIdentique: empreintes[0].bin === empreintes[1].bin && empreintes[0].json === empreintes[1].json,
  verdict: empreintes[0].bin === empreintes[1].bin && empreintes[0].json === empreintes[1].json ? "OK" : "ECHEC",
};
fs.mkdirSync(path.dirname(rapportPath), { recursive: true });
fs.writeFileSync(rapportPath, `${JSON.stringify(rapport, null, 1)}\n`);
/* Le dernier export sert de base au build : on le copie dans le dépôt cache. */
const dest = "/home/tasour/.cache/corps-sources/zanatomy-stock/export";
fs.mkdirSync(dest, { recursive: true });
for (const f of ["stock.bin", "stock.json"]) fs.copyFileSync(path.join(dossiers[1], f), path.join(dest, f));
for (const d of dossiers) fs.rmSync(d, { recursive: true, force: true });
console.log(`[stock] ${rapport.objets} objets, ${rapport.exclusions} exclusions, reproductible=${rapport.byteIdentique}`);
if (rapport.verdict !== "OK") process.exit(1);
