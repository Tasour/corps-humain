/* Stock Z-Anatomy + apports BodyParts3D 4.0 (CC BY 4.0) pour les 465
 * structures sans équivalent. Licence combinée : CC BY-SA 4.0 (partage
 * à l'identique imposé par le socle). Aucune géométrie inventée. */

import fs from "node:fs";
import path from "node:path";
import zlib from "node:zlib";

const root = path.resolve(import.meta.dirname, "..");
const stockDir = process.env.STOCK_BUILD_OUT || "/tmp/opencode/stock-build4";
const apportsPath = process.env.APPORTS_MANIFEST || "/tmp/opencode/manifest-avant-stock.json";
const apportsDir = process.env.APPORTS_DIR || path.join(root, "public/models/v2");
const out = process.env.MERGE_OUT || "/tmp/opencode/stock-merge";
fs.mkdirSync(out, { recursive: true });

const stock = JSON.parse(fs.readFileSync(path.join(stockDir, "manifest.json"), "utf8"));
const apports = JSON.parse(fs.readFileSync(apportsPath, "utf8"));
const alias = JSON.parse(fs.readFileSync(path.join(stockDir, "id-aliases.json"), "utf8"));
const gaps = new Set(alias.gaps.map((g) => g.id));
const parId = new Map(apports.structures.map((s) => [s.id, s]));
const ajoutes = [];
const nonAjoutes = [];

for (const id of gaps) {
  const source = parId.get(id);
  if (!source || source.source !== "BodyParts3D 4.0" || !source.lod?.high) {
    nonAjoutes.push(id);
    continue;
  }
  const copie = { ...source, id, source_id: `bp:${id}`, apport: "BodyParts3D 4.0 (CC BY 4.0)" };
  stock.structures.push(copie);
  ajoutes.push(id);
}

/* Réécriture des chunks : on reprend les chunks stock et on ajoute les
 * chunks BP3D originaux sous un préfixe distinct, avec des offsets décalés. */
const offsets = new Map();
for (const entree of stock.structures) {
  if (!entree.apport) continue;
  for (const [niveau, rec] of Object.entries(entree.lod || {})) {
    const cle = `bp.${entree.category}.${niveau}`;
    const fichier = path.join(out, `${cle}.bin`);
    let source = path.join(apportsDir, `${entree.category}.${niveau}.bin`);
    if (!fs.existsSync(source)) source = path.join(apportsDir, `${niveau}.${entree.category}.bin`);
    if (!fs.existsSync(source)) throw new Error(`chunk apport absent : ${cle}`);
    if (!fs.existsSync(fichier)) {
      fs.copyFileSync(source, fichier);
      fs.writeFileSync(`${fichier}.gz`, zlib.gzipSync(fs.readFileSync(fichier)));
    }
    /* Le fichier apport est réutilisé tel quel : les offsets du manifeste
     * source restent valides, seul le nom du chunk change. */
    rec.chunk = `${cle}.bin`;
  }
}

stock.sources = [
  { name: "Z-Anatomy", license: "CC BY-SA 4.0", url: "https://github.com/Z-Anatomy/Models-of-human-anatomy" },
  { name: "BodyParts3D 4.0 (apports)", license: "CC BY 4.0", url: "https://dbarchive.biosciencedbc.jp/en/bodyparts3d/download.html" },
];
stock.license = "CC BY-SA 4.0 (socle Z-Anatomy + apports CC BY 4.0)";
stock.merge = { stock: 1524, apports: ajoutes.length, nonAjoutes: nonAjoutes.length };
fs.writeFileSync(path.join(out, "manifest.json"), JSON.stringify(stock));
fs.writeFileSync(path.join(out, "merge-report.json"), `${JSON.stringify({ stock: 1524, apports: ajoutes.length, nonAjoutes, total: stock.structures.length }, null, 1)}\n`);
console.log(`[merge] ${stock.structures.length} structures = 1524 stock + ${ajoutes.length} apports, ${nonAjoutes.length} non ajoutées`);
