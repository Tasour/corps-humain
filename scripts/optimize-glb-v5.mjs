/* Compression meshopt sans fusion de matériaux.
 *
 * `gltf-transform optimize` active par défaut --palette true, ce qui fusionne
 * les six matériaux PBR en une palette de deux. On le désactive explicitement
 * pour conserver peau / squelette / muscles / organes / vaisseaux / nerfs.
 */
import fs from "node:fs";
import path from "node:path";
import { execFileSync } from "node:child_process";

const root = path.resolve(import.meta.dirname, "..");
const dir = path.join(root, "docs", "models");

function metadata(file) {
  const raw = fs.readFileSync(file);
  const len = raw.readUInt32LE(12);
  const json = JSON.parse(raw.subarray(20, 20 + len).toString("utf8"));
  return {
    size: raw.length,
    meshes: json.meshes?.length || 0,
    materials: (json.materials || []).map((m) => m.name),
    animations: json.animations?.length || 0,
    textures: json.textures?.length || 0,
  };
}

for (const sex of ["female", "male"]) {
  const src = path.join(dir, `corps-${sex}.glb`);
  const dst = path.join(dir, `corps-${sex}-opt.glb`);
  const before = metadata(src);
  execFileSync("npx", [
    "--yes", "@gltf-transform/cli@4.5.1", "optimize", src, dst,
    "--compress", "meshopt", "--palette", "false", "--meshopt-level", "high",
  ], { cwd: root, stdio: "inherit" });
  const after = metadata(dst);
  console.log(`[opt] ${sex}: ${(before.size / 1e6).toFixed(1)} Mo -> ${(after.size / 1e6).toFixed(1)} Mo`);
  console.log(`[opt]   materiaux: ${after.materials.join(", ")}`);
  console.log(`[opt]   animations: ${after.animations}, textures: ${after.textures}`);
  if (after.materials.length < 6) {
    throw new Error(`au moins 6 matériaux attendus, ${after.materials.length} obtenus pour ${sex}`);
  }
  if (after.animations !== 6) {
    throw new Error(`6 animations attendues, ${after.animations} obtenues pour ${sex}`);
  }
  if (after.size > 20e6) {
    throw new Error(`${sex}: ${(after.size / 1e6).toFixed(1)} Mo > budget 20 Mo`);
  }
}
