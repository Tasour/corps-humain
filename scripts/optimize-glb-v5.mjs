/* Compression meshopt sans perte de structures.
 *
 * `gltf-transform optimize` supprimait 39 maillages musculaires (139 -> 100)
 * à cause de ses étapes prune/join. On utilise donc `copy` puis `meshopt`,
 * qui ne touchent ni aux nœuds ni aux matériaux.
 */
import fs from "node:fs";
import path from "node:path";
import os from "node:os";
import { execFileSync } from "node:child_process";

const root = path.resolve(import.meta.dirname, "..");
const dir = path.join(root, "docs", "models");
const tmpRoot = path.join(root, ".cache", "opt");
fs.mkdirSync(tmpRoot, { recursive: true });
const tmp = fs.mkdtempSync(path.join(tmpRoot, "corps-opt-"));
const CLI = ["--yes", "@gltf-transform/cli@4.5.1"];

function metadata(file) {
  const raw = fs.readFileSync(file);
  const len = raw.readUInt32LE(12);
  const json = JSON.parse(raw.subarray(20, 20 + len).toString("utf8"));
  return {
    size: raw.length,
    meshes: json.meshes?.length || 0,
    materials: (json.materials || []).map((m) => m.name),
    animations: json.animations?.length || 0,
  };
}

function run(args) {
  execFileSync("npx", [...CLI, ...args], { cwd: root, stdio: "inherit" });
}

try {
  for (const sex of ["female", "male"]) {
    const src = path.join(dir, `corps-${sex}.glb`);
    const dst = path.join(dir, `corps-${sex}-opt.glb`);
    const middle = path.join(tmp, `corps-${sex}-copy.glb`);
    const before = metadata(src);
    run(["copy", src, middle]);
    run(["meshopt", middle, dst]);
    const after = metadata(dst);
    console.log(`[opt] ${sex}: ${(before.size / 1e6).toFixed(1)} Mo -> ${(after.size / 1e6).toFixed(1)} Mo`);
    console.log(`[opt]   maillages: ${before.meshes} -> ${after.meshes}, matériaux: ${after.materials.length}`);
    console.log(`[opt]   animations: ${after.animations}`);
    if (after.meshes !== before.meshes) throw new Error(`${sex}: maillages perdus`);
    if (after.materials.length < 6) throw new Error(`${sex}: moins de 6 matériaux`);
    if (after.animations !== 0) throw new Error(`${sex}: aucune animation attendue`);
    if (after.size > 20e6) throw new Error(`${sex}: budget 20 Mo dépassé`);
  }
} finally {
  fs.rmSync(tmp, { recursive: true, force: true });
}
