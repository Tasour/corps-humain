import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import zlib from "node:zlib";

const root = new URL("..", import.meta.url).pathname;

/* Région génitale : le « Modesty cover » du modèle est conservé tel quel
 * (rétracté de 4 % pour ne plus flotter au-dessus de la peau). Le patch
 * découpé qui le remplaçait laissait un trou en étoile : il est supprimé. */
const viewer = readFileSync(root + "src/corps-viewer.js", "utf8");
assert.ok(!viewer.includes("buildMaleSkinPatch"), "ancien patch découpé encore chargé");
assert.ok(!viewer.includes("skin-patch"), "assets du patch encore référencés");
assert.ok(/modesty[ _]?cover/i.test(viewer), "couvreur cutané non reconnu");
assert.ok(viewer.includes("conformCover"), "couvreur non rétracté sur la peau");
assert.ok(/const scale = 0\.96/.test(viewer), "rétraction du couvreur absente");

/* La génitalité est masquée tant que la peau est visible. */
const genitalia = readFileSync(root + "docs/models/male-genitalia/male-genitalia.json", "utf8");
const manifest = JSON.parse(genitalia);
const binary = zlib.gunzipSync(readFileSync(root + "docs/models/male-genitalia/male-genitalia.bin.gz"));
let offset = 0;
const pad = () => { const r = offset % 4; if (r) offset += 4 - r; };
for (const part of manifest.parts) {
  pad(); assert.equal(part.positions, offset, "offset positions invalide");
  offset += part.vertexCount * 3 * 4;
  pad(); assert.equal(part.normals, offset, "offset normales invalide");
  offset += part.vertexCount * 3 * 4;
  pad(); assert.equal(part.indices, offset, "offset indices invalide");
  offset += part.indexCount * 4;
}
pad();
assert.equal(offset, binary.length, "taille de la génitalité incohérente");
assert.ok(manifest.parts.length >= 12, "organes génitaux incomplets");
assert.ok(viewer.includes("m.userData.hideWithSkin = true"), "génitalité non masquée sous la peau");

console.log("PASS actifs : région génitale couverte, génitalité masquée sous la peau");
