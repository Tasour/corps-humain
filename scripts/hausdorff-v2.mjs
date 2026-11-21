import fs from "node:fs";
import path from "node:path";
import zlib from "node:zlib";

/* Écart de silhouette entre niveaux de détail (Hausdorff échantillonné).
 *
 * Référence : LOD `high`. Approximation : `medium` puis `low`.
 * On mesure les deux directions (approximation → référence et référence →
 * approximation) sur un échantillon déterministe de sommets, avec un BVH de
 * triangles pour une distance point-surface exacte (pas un proxy sommet).
 *
 * Sortie : docs/analyses/qualite-3d/hausdorff.json + hausdorff.md
 * Usage :
 *   node scripts/hausdorff-v2.mjs
 *   HAUSDORFF_LIMIT=20 node scripts/hausdorff-v2.mjs   (échantillon)
 */

const BASE = process.env.V2_DIR || path.resolve(import.meta.dirname, "../public/models/v2");
const OUT = process.env.QUALITE_OUT || path.resolve(import.meta.dirname, "../docs/analyses/qualite-3d");
const LIMIT = Number(process.env.HAUSDORFF_LIMIT || 0);
const SAMPLES = Number(process.env.HAUSDORFF_SAMPLES || 256);
const manifest = JSON.parse(fs.readFileSync(path.join(BASE, "manifest.json"), "utf8"));

const chunkCache = new Map();
function chunkFor(category, lod, record) {
  const cle = record?.chunk ? record.chunk.replace(/\.bin$/, "") : `${category}.${lod}`;
  const key = `${cle}:${lod}`;
  if (!chunkCache.has(key)) {
    chunkCache.set(key, zlib.gunzipSync(fs.readFileSync(path.join(BASE, `${cle}.bin.gz`))));
  }
  return chunkCache.get(key);
}
function views(buf, rec) {
  const pos = new Float32Array(buf.buffer, buf.byteOffset + rec.positions, rec.vertexCount * 3);
  const idx = rec.indexType === "u16"
    ? new Uint16Array(buf.buffer, buf.byteOffset + rec.indices, rec.indexCount)
    : new Uint32Array(buf.buffer, buf.byteOffset + rec.indices, rec.indexCount);
  return { pos, idx };
}

/* --- Distance point-triangle au carré (Real-Time Collision Detection) ---- */
function pointTriangleDistance2(px, py, pz, ax, ay, az, bx, by, bz, cx, cy, cz) {
  const abx = bx - ax, aby = by - ay, abz = bz - az;
  const acx = cx - ax, acy = cy - ay, acz = cz - az;
  const apx = px - ax, apy = py - ay, apz = pz - az;
  const d1 = abx * apx + aby * apy + abz * apz;
  const d2 = acx * apx + acy * apy + acz * apz;
  if (d1 <= 0 && d2 <= 0) return apx * apx + apy * apy + apz * apz;

  const bpx = px - bx, bpy = py - by, bpz = pz - bz;
  const d3 = abx * bpx + aby * bpy + abz * bpz;
  const d4 = acx * bpx + acy * bpy + acz * bpz;
  if (d3 >= 0 && d4 <= d3) return bpx * bpx + bpy * bpy + bpz * bpz;

  const vc = d1 * d4 - d3 * d2;
  if (vc <= 0 && d1 >= 0 && d3 <= 0) {
    const v = d1 / (d1 - d3);
    const dx = px - (ax + v * abx), dy = py - (ay + v * aby), dz = pz - (az + v * abz);
    return dx * dx + dy * dy + dz * dz;
  }

  const cpx = px - cx, cpy = py - cy, cpz = pz - cz;
  const d5 = abx * cpx + aby * cpy + abz * cpz;
  const d6 = acx * cpx + acy * cpy + acz * cpz;
  if (d6 >= 0 && d5 <= d6) return cpx * cpx + cpy * cpy + cpz * cpz;

  const vb = d5 * d2 - d1 * d6;
  if (vb <= 0 && d2 >= 0 && d6 <= 0) {
    const w = d2 / (d2 - d6);
    const dx = px - (ax + w * acx), dy = py - (ay + w * acy), dz = pz - (az + w * acz);
    return dx * dx + dy * dy + dz * dz;
  }

  const va = d3 * d6 - d5 * d4;
  if (va <= 0 && (d4 - d3) >= 0 && (d5 - d6) >= 0) {
    const w = (d4 - d3) / ((d4 - d3) + (d5 - d6));
    const dx = px - (bx + w * (cx - bx)), dy = py - (by + w * (cy - by)), dz = pz - (bz + w * (cz - bz));
    return dx * dx + dy * dy + dz * dz;
  }

  const denom = 1 / (va + vb + vc);
  const v = vb * denom, w = vc * denom;
  const dx = px - (ax + abx * v + acx * w);
  const dy = py - (ay + aby * v + acy * w);
  const dz = pz - (az + abz * v + acz * w);
  return dx * dx + dy * dy + dz * dz;
}

/* --- BVH de triangles ----------------------------------------------------- */
function aabbDistance2(node, px, py, pz) {
  let d = 0;
  for (let k = 0; k < 3; k++) {
    const p = k === 0 ? px : k === 1 ? py : pz;
    const lo = node.min[k], hi = node.max[k];
    if (p < lo) d += (lo - p) * (lo - p);
    else if (p > hi) d += (p - hi) * (p - hi);
  }
  return d;
}

function nearestDistance2(bvh, px, py, pz) {
  if (!bvh.root) return Infinity;
  const { pos, idx } = bvh;
  let best = Infinity;
  const stack = [bvh.root];
  while (stack.length) {
    const node = stack.pop();
    if (aabbDistance2(node, px, py, pz) >= best) continue;
    if (node.leaf) {
      for (let i = node.start; i < node.end; i++) {
        const t = bvh.tris ? bvh.tris[i] : i;
        const a = idx[t * 3] * 3, b = idx[t * 3 + 1] * 3, c = idx[t * 3 + 2] * 3;
        const d = pointTriangleDistance2(
          px, py, pz,
          pos[a], pos[a + 1], pos[a + 2],
          pos[b], pos[b + 1], pos[b + 2],
          pos[c], pos[c + 1], pos[c + 2],
        );
        if (d < best) best = d;
      }
    } else {
      const dl = aabbDistance2(node.left, px, py, pz);
      const dr = aabbDistance2(node.right, px, py, pz);
      /* Empile le plus lointain d'abord : le plus proche est visité en premier
       * et élague davantage. */
      if (dl < dr) { stack.push(node.right); stack.push(node.left); }
      else { stack.push(node.left); stack.push(node.right); }
    }
  }
  return best;
}

/* Le BVH doit retrouver l'indice réel du triangle : `tris` est trié sur place
 * par la construction, il faut donc le conserver. */
function buildBVHWithTris(pos, idx) {
  const triCount = idx.length / 3;
  const tris = new Uint32Array(triCount);
  const centroids = new Float32Array(triCount * 3);
  for (let t = 0; t < triCount; t++) {
    tris[t] = t;
    const a = idx[t * 3] * 3, b = idx[t * 3 + 1] * 3, c = idx[t * 3 + 2] * 3;
    centroids[t * 3] = (pos[a] + pos[b] + pos[c]) / 3;
    centroids[t * 3 + 1] = (pos[a + 1] + pos[b + 1] + pos[c + 1]) / 3;
    centroids[t * 3 + 2] = (pos[a + 2] + pos[b + 2] + pos[c + 2]) / 3;
  }
  function bounds(start, end) {
    const min = [Infinity, Infinity, Infinity];
    const max = [-Infinity, -Infinity, -Infinity];
    for (let i = start; i < end; i++) {
      const t = tris[i];
      for (let k = 0; k < 3; k++) {
        const v = idx[t * 3 + k] * 3;
        for (let j = 0; j < 3; j++) {
          min[j] = Math.min(min[j], pos[v + j]);
          max[j] = Math.max(max[j], pos[v + j]);
        }
      }
    }
    return { min, max };
  }
  function build(start, end) {
    const { min, max } = bounds(start, end);
    if (end - start <= 8) return { min, max, start, end, leaf: true };
    const ext = [max[0] - min[0], max[1] - min[1], max[2] - min[2]];
    const axis = ext[0] >= ext[1] && ext[0] >= ext[2] ? 0 : ext[1] >= ext[2] ? 1 : 2;
    tris.subarray(start, end).sort((a, b) => centroids[a * 3 + axis] - centroids[b * 3 + axis]);
    const mid = (start + end) >> 1;
    return { min, max, left: build(start, mid), right: build(mid, end), leaf: false };
  }
  return { root: triCount ? build(0, triCount) : null, pos, idx, tris };
}

function sampleVertices(pos, vertexCount, maxSamples) {
  const stride = Math.max(1, Math.floor(vertexCount / maxSamples));
  const out = [];
  for (let v = 0; v < vertexCount; v += stride) out.push(v);
  return out;
}

function hausdorff(coarse, fine) {
  const coarseBVH = buildBVHWithTris(coarse.pos, coarse.idx);
  const fineBVH = buildBVHWithTris(fine.pos, fine.idx);
  const cSamples = sampleVertices(coarse.pos, coarse.pos.length / 3, SAMPLES);
  const fSamples = sampleVertices(fine.pos, fine.pos.length / 3, SAMPLES);
  let maxCF = 0, sumCF = 0;
  for (const v of cSamples) {
    const d2 = nearestDistance2(fineBVH, coarse.pos[v * 3], coarse.pos[v * 3 + 1], coarse.pos[v * 3 + 2]);
    const d = Math.sqrt(d2);
    maxCF = Math.max(maxCF, d); sumCF += d;
  }
  let maxFC = 0, sumFC = 0;
  for (const v of fSamples) {
    const d2 = nearestDistance2(coarseBVH, fine.pos[v * 3], fine.pos[v * 3 + 1], fine.pos[v * 3 + 2]);
    const d = Math.sqrt(d2);
    maxFC = Math.max(maxFC, d); sumFC += d;
  }
  return {
    maxMm: Math.max(maxCF, maxFC) * 1000,
    meanMm: ((sumCF / cSamples.length) + (sumFC / fSamples.length)) / 2 * 1000,
    coarseToFineMaxMm: maxCF * 1000,
    fineToCoarseMaxMm: maxFC * 1000,
    samples: cSamples.length + fSamples.length,
  };
}

const rows = [];
const list = LIMIT ? manifest.structures.slice(0, LIMIT) : manifest.structures;
for (const s of list) {
  const high = s.lod?.high, medium = s.lod?.medium, low = s.lod?.low;
  if (!high?.indexCount || !medium?.indexCount) continue;
  const fine = views(chunkFor(s.category, "high", high), high);
  const med = views(chunkFor(s.category, "medium", medium), medium);
  const row = {
    id: s.id, fr: s.fr, category: s.category,
    triangles: { high: high.indexCount / 3, medium: medium.indexCount / 3, low: (low?.indexCount || 0) / 3 },
  };
  if (medium.indexCount === high.indexCount) {
    row.medium = { maxMm: 0, meanMm: 0, coarseToFineMaxMm: 0, fineToCoarseMaxMm: 0, samples: 0 };
  } else {
    row.medium = hausdorff(med, fine);
  }
  if (low?.indexCount) {
    if (low.indexCount === high.indexCount) {
      row.low = { maxMm: 0, meanMm: 0, coarseToFineMaxMm: 0, fineToCoarseMaxMm: 0, samples: 0 };
    } else {
      row.low = hausdorff(views(chunkFor(s.category, "low", low), low), fine);
    }
  }
  rows.push(row);
}

const q = (arr, p) => {
  const a = [...arr].sort((x, y) => x - y);
  return a.length ? a[Math.floor(p * (a.length - 1))] : 0;
};
const mediumMax = rows.map((r) => r.medium.maxMm);
const lowMax = rows.map((r) => r.low?.maxMm || 0);
const summary = {
  generated: new Date().toISOString(),
  structures: rows.length,
  samplesPerDirection: SAMPLES,
  medium: {
    medianMm: +q(mediumMax, 0.5).toFixed(3),
    p90Mm: +q(mediumMax, 0.9).toFixed(3),
    p99Mm: +q(mediumMax, 0.99).toFixed(3),
    maxMm: +Math.max(...mediumMax).toFixed(3),
    over05: mediumMax.filter((d) => d > 0.5).length,
    over2: mediumMax.filter((d) => d > 2).length,
  },
  low: {
    medianMm: +q(lowMax, 0.5).toFixed(3),
    p90Mm: +q(lowMax, 0.9).toFixed(3),
    p99Mm: +q(lowMax, 0.99).toFixed(3),
    maxMm: +Math.max(...lowMax).toFixed(3),
    over05: lowMax.filter((d) => d > 0.5).length,
    over2: lowMax.filter((d) => d > 2).length,
  },
};

fs.mkdirSync(OUT, { recursive: true });
fs.writeFileSync(path.join(OUT, "hausdorff.json"), JSON.stringify({ summary, structures: rows }, null, 1));

const fmt = (n, d = 2) => Number(n).toLocaleString("fr-FR", { minimumFractionDigits: d, maximumFractionDigits: d });
const lines = [];
lines.push("# Écart de silhouette entre LOD — Hausdorff échantillonné");
lines.push("");
lines.push(`Généré le ${new Date().toISOString().slice(0, 10)} par \`npm run hausdorff:3d\`.`);
lines.push(`Référence : LOD \`high\`. ${rows.length} structures, ${SAMPLES} sommets échantillonnés par direction.`);
lines.push("");
lines.push("## Synthèse");
lines.push("");
lines.push("| Comparaison | Médiane | P90 | P99 | Max | > 0,5 mm | > 2 mm |");
lines.push("|---|---:|---:|---:|---:|---:|---:|");
lines.push(`| medium → high | ${fmt(summary.medium.medianMm)} mm | ${fmt(summary.medium.p90Mm)} mm | ${fmt(summary.medium.p99Mm)} mm | ${fmt(summary.medium.maxMm)} mm | ${summary.medium.over05} | ${summary.medium.over2} |`);
lines.push(`| low → high | ${fmt(summary.low.medianMm)} mm | ${fmt(summary.low.p90Mm)} mm | ${fmt(summary.low.p99Mm)} mm | ${fmt(summary.low.maxMm)} mm | ${summary.low.over05} | ${summary.low.over2} |`);
lines.push("");
lines.push("## 20 écarts medium → high les plus grands");
lines.push("");
lines.push("| Structure | Cat. | Tris high | Tris medium | Écart max (mm) | Écart moyen (mm) |");
lines.push("|---|---|---:|---:|---:|---:|");
for (const r of [...rows].sort((a, b) => b.medium.maxMm - a.medium.maxMm).slice(0, 20)) {
  lines.push(`| \`${r.id}\` | ${r.category} | ${fmt(r.triangles.high, 0)} | ${fmt(r.triangles.medium, 0)} | ${fmt(r.medium.maxMm)} | ${fmt(r.medium.meanMm)} |`);
}
lines.push("");
lines.push("## Limites");
lines.push("");
lines.push("- Mesure **LOD contre LOD**, pas source contre LOD : elle prouve la fidélité de la chaîne");
lines.push("  de simplification, pas la fidélité au réel. La comparaison source → high reste à faire.");
lines.push("- Échantillonnage déterministe de sommets : un détail omis entre deux sommets peut échapper.");
lines.push("- La distance est une distance point-surface exacte via BVH, mais le maximum est estimé sur");
lines.push("  un échantillon, pas sur tous les sommets.");
lines.push("");
lines.push("JSON : `docs/analyses/qualite-3d/hausdorff.json`.");
fs.writeFileSync(path.join(OUT, "hausdorff.md"), lines.join("\n"));

console.log(`[hausdorff] ${rows.length} structures · medium médian ${summary.medium.medianMm} mm · low médian ${summary.low.medianMm} mm`);
console.log(`[hausdorff] medium > 0,5 mm : ${summary.medium.over05} · > 2 mm : ${summary.medium.over2}`);
console.log(`[hausdorff] écrit ${path.join(OUT, "hausdorff.md")}`);
