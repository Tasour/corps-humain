import assert from "node:assert/strict";
import { readFileSync, statSync } from "node:fs";
import { createHash } from "node:crypto";
import zlib from "node:zlib";

const root = new URL("..", import.meta.url).pathname;

/* Coiffure CC0 importée de CharacterCreator (MakeHuman long01). */
const hair = readFileSync(root + "docs/models/hair-cc0/hair_long01.glb");
const sha = createHash("sha256").update(hair).digest("hex");
assert.equal(sha, "d340fff458f920dd16dcc80493a1a33207b00c6bbfb08c4c53aba54704a78818",
  "empreinte de la coiffure modifiée");
assert.ok(statSync(root + "docs/models/hair-cc0/hair_long01.glb").size > 1_000_000,
  "coiffure incomplète");
const readme = readFileSync(root + "README.md", "utf8");
assert.ok(/CC0/.test(readme), "licence CC0 non documentée");
assert.ok(/kblood\/CharacterCreator/.test(readme), "source GitHub non documentée");
const rebuild = readFileSync(root + "scripts/rebuild-female-supplements.py", "utf8");
assert.ok(rebuild.includes("hair-cc0/hair_long01.glb"), "coiffure CC0 non utilisée");

/* Patch cutané de l'aine masculine. */
const manifest = JSON.parse(readFileSync(root + "docs/models/male-genitalia/skin-patch.json", "utf8"));
const binary = zlib.gunzipSync(readFileSync(root + "docs/models/male-genitalia/skin-patch.bin.gz"));
let offset = 0;
const pad = () => { const r = offset % 4; if (r) offset += 4 - r; };
for (const part of manifest.parts) {
  pad(); assert.equal(part.positions, offset, "offset positions invalide");
  offset += part.vertexCount * 3 * 4;
  pad(); assert.equal(part.normals, offset, "offset normales invalide");
  offset += part.vertexCount * 3 * 4;
  pad(); assert.equal(part.indices, offset, "offset indices invalide");
  offset += part.indexCount * 4;
  pad();
  const indices = new Uint32Array(binary.buffer, binary.byteOffset + part.indices, part.indexCount);
  for (const value of indices) assert.ok(value < part.vertexCount, "indice hors limites");
}
assert.equal(offset, binary.length, "taille du patch incohérente");

const extract = readFileSync(root + "scripts/extract-modesty-cover.mjs", "utf8");
assert.ok(extract.includes("0.055"), "ouverture elliptique absente");
const viewer = readFileSync(root + "src/corps-viewer.js", "utf8");
assert.ok(viewer.includes("buildMaleSkinPatch"), "patch non intégré au modèle mâle");

console.log("PASS actifs : coiffure CC0 verrouillée, patch cutané cohérent");
