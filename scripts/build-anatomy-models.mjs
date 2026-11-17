import fs from "node:fs";
import path from "node:path";
import zlib from "node:zlib";
import { MeshoptSimplifier } from "meshoptimizer";

/* Génère public/models/anatomy.json + anatomy.bin (.gz) à partir des maillages
 * BodyParts3D 4.0 déjà convertis (mètres / Y-up) du dépôt human-atlas, complétés
 * par les maillages Z-Anatomy pour les structures absentes de BodyParts3D
 * (thyroïde, grand dorsal, abdominaux, obliques).
 *
 * Sources :
 *   https://github.com/ashemag/human-atlas (public/models) — BodyParts3D
 *   https://github.com/Z-Anatomy/Models-of-human-anatomy — Z-Anatomy
 * Licences :
 *   BodyParts3D, © The Database Center for Life Science, CC BY 4.0
 *   Z-Anatomy, CC BY-SA 4.0
 *
 * Usage :
 *   ANATOMY_SOURCE=/chemin/vers/human-atlas/public/models \
 *   ZANATOMY_SOURCE=/chemin/vers/zanatomy-export npm run models
 */
const SRC = process.env.ANATOMY_SOURCE || "/tmp/opencode/human-atlas/public/models";
const ZANATOMY_SRC = process.env.ZANATOMY_SOURCE || path.resolve(import.meta.dirname, "../zanatomy-export");
const OUT = process.env.ANATOMY_OUT || path.resolve(import.meta.dirname, "../public/models");

/* Export Blender de Z-Anatomy : positions/normales Float32, indices Uint32,
 * déjà convertis en mètres / Y-up (x, z, -y). */
let zanatomy = null;
try {
  const manifest = JSON.parse(fs.readFileSync(path.join(ZANATOMY_SRC, "zanatomy.json"), "utf8"));
  const buffer = fs.readFileSync(path.join(ZANATOMY_SRC, manifest.bin));
  zanatomy = { manifest, buffer };
} catch (error) {
  console.warn(`Export Z-Anatomy introuvable (${ZANATOMY_SRC}) : ${error.message}`);
}

const atlas = JSON.parse(fs.readFileSync(path.join(SRC, "atlas.json"), "utf8"));
const chunkBuffers = atlas.chunks.map((c) =>
  fs.readFileSync(path.join(SRC, c.url.split("/").pop())),
);
const partById = new Map(atlas.parts.map((p) => [p.id, p]));
const conceptByName = new Map(atlas.concepts.map((c) => [c.name.toLowerCase(), c]));

/* Notre entité -> concepts BodyParts3D et/ou motifs de noms de pièces. */
const ENTITIES = {
  cerveau: { concepts: ["forebrain"], target: 26000 },
  cervelet: { concepts: ["cerebellum"], target: 6000 },
  tronc_cerebral: { concepts: ["midbrain", "pons", "medulla oblongata"], target: 8000 },
  moelle_epiniere: { concepts: ["spinal cord"], target: 4000 },
  coeur: { concepts: ["heart"], target: 22000 },
  coronaires: { patterns: [/coronary artery/i], systems: ["arterial"], target: 6000 },
  aorte: { concepts: ["aorta"], target: 3000 },
  poumons: { concepts: ["right lung", "left lung"], target: 28000 },
  bronches: {
    concepts: ["trachea", "bronchus", "main bronchus", "right main bronchus", "left main bronchus"],
    target: 6000,
  },
  oesophage: { concepts: ["esophagus"], target: 1200 },
  estomac: { concepts: ["stomach"], target: 3000 },
  foie: { concepts: ["liver"], target: 22000 },
  vesicule: { concepts: ["gallbladder"], target: 1500 },
  pancreas: { concepts: ["pancreas"], target: 5000 },
  intestin_grele: { concepts: ["small intestine"], target: 12000 },
  colon: { concepts: ["large intestine"], target: 14000 },
  reins: { concepts: ["kidney"], target: 4000 },
  ureteres: { concepts: ["ureter"], target: 2000 },
  vessie: { concepts: ["urinary bladder"], target: 1200 },
  rate: { concepts: ["spleen"], target: 1500 },
  surrenales: { concepts: ["adrenal gland"], target: 2500 },
  thyroide: { zanatomy: "thyroide", target: 1600 },

  crane: { concepts: ["skull"], systems: ["skeletal"], target: 24000 },
  colonne: { concepts: ["vertebral column"], target: 22000 },
  cotes: { concepts: ["rib", "sternum"], target: 16000 },
  bassin: { concepts: ["pelvis"], systems: ["skeletal"], target: 8000 },
  omoplate: { concepts: ["scapula"], target: 6000 },
  clavicule: { concepts: ["clavicle"], target: 1500 },
  humerus: { concepts: ["humerus"], target: 2500 },
  avant_bras: { concepts: ["radius", "ulna"], target: 2500 },
  main: {
    patterns: [
      /metacarpal bone/i,
      /phalanx of (left|right) (thumb|index|middle|ring|little) finger/i,
      /(scaphoid|lunate|triquetral|pisiform|trapezium|trapezoid|capitate|hamate)/i,
    ],
    systems: ["skeletal"],
    target: 6000,
  },
  femur: { concepts: ["femur"], target: 2500 },
  rotule: { concepts: ["patella"], target: 1000 },
  tibia: { concepts: ["tibia", "fibula"], target: 3000 },
  pied: {
    patterns: [
      /metatarsal bone/i,
      /phalanx of (left|right).*(toe)/i,
      /(calcaneus|talus|cuboid bone|navicular bone of (left|right) foot)/i,
    ],
    systems: ["skeletal"],
    target: 6000,
  },

  trapezes: { concepts: ["zone of trapezius"], target: 3000 },
  deltoides: { concepts: ["zone of deltoid"], target: 4000 },
  pectoraux: { concepts: ["zone of pectoralis major"], target: 5000 },
  biceps: { concepts: ["short head of biceps brachii", "long head of biceps brachii"], target: 2500 },
  triceps: {
    concepts: ["long head of triceps brachii", "medial head of triceps brachii", "lateral head of triceps brachii"],
    target: 3000,
  },
  fessiers: { concepts: ["gluteus maximus"], target: 2500 },
  quadriceps: { concepts: ["zone of quadriceps femoris"], target: 6000 },
  ischio_jambiers: { patterns: [/semitendinosus|semimembranosus|biceps femoris/i], target: 3500 },
  mollets: { concepts: ["soleus"], patterns: [/gastrocnemius/i], target: 4000 },
  dorsaux: { zanatomy: "dorsaux", target: 8000 },
  abdominaux: { zanatomy: "abdominaux", target: 14000 },
  obliques: { zanatomy: "obliques", target: 9000 },
};

const SKIN = { concepts: ["skin"], target: 22000 };

function collectParts(spec) {
  const ids = new Set();
  for (const name of spec.concepts || []) {
    const concept = conceptByName.get(name.toLowerCase());
    if (!concept) {
      console.warn(`Concept introuvable : ${name}`);
      continue;
    }
    for (const id of concept.elements) ids.add(id);
  }
  if (spec.patterns) {
    for (const part of atlas.parts) {
      if (spec.systems && !spec.systems.includes(part.system)) continue;
      if (spec.patterns.some((pattern) => pattern.test(part.name))) ids.add(part.id);
    }
  }
  const parts = [];
  for (const id of ids) {
    const part = partById.get(id);
    if (!part) continue;
    if (spec.systems && !spec.systems.includes(part.system)) continue;
    parts.push(part);
  }
  return parts;
}

function readPart(part) {
  const buffer = chunkBuffers[part.chunk];
  return {
    positions: new Float32Array(buffer.buffer, buffer.byteOffset + part.positions, part.vertexCount * 3),
    normals: new Int16Array(buffer.buffer, buffer.byteOffset + part.normals, part.vertexCount * 3),
    indices: new Uint32Array(buffer.buffer, buffer.byteOffset + part.indices, part.indexCount),
  };
}

function readZanatomy(id) {
  const record = zanatomy.manifest.entities[id];
  if (!record) throw new Error(`entité Z-Anatomy absente : ${id}`);
  const arrayBuffer = zanatomy.buffer.buffer;
  const base = zanatomy.buffer.byteOffset;
  const positions = new Float32Array(arrayBuffer, base + record.positions, record.vertexCount * 3);
  const sourceNormals = new Float32Array(arrayBuffer, base + record.normals, record.vertexCount * 3);
  const normals = new Int16Array(sourceNormals.length);
  for (let i = 0; i < sourceNormals.length; i++) {
    const value = Math.round(sourceNormals[i] * 32767);
    normals[i] = Math.max(-32767, Math.min(32767, value));
  }
  const indices = new Uint32Array(arrayBuffer, base + record.indices, record.indexCount);
  return { positions, normals, indices, vertexCount: record.vertexCount, indexCount: record.indexCount };
}

function mergeParts(parts) {
  let vertexCount = 0;
  let indexCount = 0;
  for (const part of parts) {
    vertexCount += part.vertexCount;
    indexCount += part.indexCount;
  }
  const positions = new Float32Array(vertexCount * 3);
  const normals = new Int16Array(vertexCount * 3);
  const indices = new Uint32Array(indexCount);
  let vOffset = 0;
  let iOffset = 0;
  for (const part of parts) {
    const data = readPart(part);
    positions.set(data.positions, vOffset * 3);
    normals.set(data.normals, vOffset * 3);
    for (let i = 0; i < data.indices.length; i++) indices[iOffset + i] = data.indices[i] + vOffset;
    vOffset += part.vertexCount;
    iOffset += data.indices.length;
  }
  return { positions, normals, indices, vertexCount, indexCount };
}

function compact(indices, positions, normals) {
  const map = new Int32Array(positions.length / 3).fill(-1);
  let vertexCount = 0;
  for (let i = 0; i < indices.length; i++) {
    const v = indices[i];
    if (map[v] < 0) map[v] = vertexCount++;
  }
  const outPositions = new Float32Array(vertexCount * 3);
  const outNormals = new Int16Array(vertexCount * 3);
  for (let v = 0; v < map.length; v++) {
    const nv = map[v];
    if (nv < 0) continue;
    outPositions[nv * 3] = positions[v * 3];
    outPositions[nv * 3 + 1] = positions[v * 3 + 1];
    outPositions[nv * 3 + 2] = positions[v * 3 + 2];
    outNormals[nv * 3] = normals[v * 3];
    outNormals[nv * 3 + 1] = normals[v * 3 + 1];
    outNormals[nv * 3 + 2] = normals[v * 3 + 2];
  }
  const outIndices = new Uint32Array(indices.length);
  for (let i = 0; i < indices.length; i++) outIndices[i] = map[indices[i]];
  return { positions: outPositions, normals: outNormals, indices: outIndices, vertexCount };
}

function simplifyGeometry(geometry, targetTriangles) {
  const triangleCount = geometry.indices.length / 3;
  if (triangleCount <= targetTriangles) return geometry;
  const targetIndexCount = Math.max(3, Math.floor(targetTriangles) * 3);
  const [simplified] = MeshoptSimplifier.simplify(
    geometry.indices,
    geometry.positions,
    3,
    targetIndexCount,
    0.02,
    ["LockBorder"],
  );
  if (!simplified || simplified.length < 3) return geometry;
  return compact(simplified, geometry.positions, geometry.normals);
}

function computeBounds(positions) {
  const min = [Infinity, Infinity, Infinity];
  const max = [-Infinity, -Infinity, -Infinity];
  for (let i = 0; i < positions.length; i += 3) {
    for (let a = 0; a < 3; a++) {
      const v = positions[i + a];
      if (v < min[a]) min[a] = v;
      if (v > max[a]) max[a] = v;
    }
  }
  return { min, max };
}

function pad4() {
  while (binaryLength % 4) {
    binary.push(Buffer.from([0]));
    binaryLength += 1;
  }
}

function pushBuffer(buffer) {
  binary.push(buffer);
  binaryLength += buffer.length;
}

function writeEntity(geometry) {
  pad4();
  const positionsOffset = binaryLength;
  pushBuffer(Buffer.from(geometry.positions.buffer, geometry.positions.byteOffset, geometry.positions.byteLength));
  pad4();
  const normalsOffset = binaryLength;
  pushBuffer(Buffer.from(geometry.normals.buffer, geometry.normals.byteOffset, geometry.normals.byteLength));
  pad4();
  const indicesOffset = binaryLength;
  const useU16 = geometry.vertexCount <= 65535;
  const indices = useU16 ? Uint16Array.from(geometry.indices) : geometry.indices;
  pushBuffer(Buffer.from(indices.buffer, indices.byteOffset, indices.byteLength));
  return {
    positions: positionsOffset,
    normals: normalsOffset,
    indices: indicesOffset,
    vertexCount: geometry.vertexCount,
    indexCount: indices.length,
    indexType: useU16 ? "u16" : "u32",
    bounds: computeBounds(geometry.positions),
  };
}

await MeshoptSimplifier.ready;

const binary = [];
let binaryLength = 0;
const manifest = {
  version: "BodyParts3D 4.0 + Z-Anatomy",
  sources: [
    {
      name: "BodyParts3D 4.0",
      url: "https://dbarchive.biosciencedbc.jp/en/bodyparts3d/download.html",
      license: "CC BY 4.0",
    },
    {
      name: "Z-Anatomy",
      url: "https://github.com/Z-Anatomy/Models-of-human-anatomy",
      license: "CC BY-SA 4.0",
    },
  ],
  source: "https://dbarchive.biosciencedbc.jp/en/bodyparts3d/download.html",
  license:
    "BodyParts3D, © The Database Center for Life Science, CC BY 4.0 ; Z-Anatomy, CC BY-SA 4.0",
  bin: "anatomy.bin",
  entities: {},
};
let totalTriangles = 0;

for (const [id, spec] of Object.entries(ENTITIES)) {
  let geometry;
  let partCount;
  if (spec.zanatomy) {
    if (!zanatomy) {
      console.warn(`Z-Anatomy indisponible pour ${id}`);
      continue;
    }
    geometry = readZanatomy(spec.zanatomy);
    partCount = 1;
  } else {
    const parts = collectParts(spec);
    if (!parts.length) {
      console.warn(`Aucune géométrie pour ${id}`);
      continue;
    }
    geometry = mergeParts(parts);
    partCount = parts.length;
  }
  const simplified = simplifyGeometry(geometry, spec.target);
  const record = writeEntity(simplified);
  record.parts = partCount;
  if (spec.zanatomy) record.source = "Z-Anatomy";
  manifest.entities[id] = record;
  totalTriangles += record.indexCount / 3;
  console.log(
    `${id.padEnd(18)} ${String(partCount).padStart(3)} pièces  ${String(record.indexCount / 3).padStart(6)} tris  ${(record.vertexCount / 1000).toFixed(1)}k verts${spec.zanatomy ? "  [Z-Anatomy]" : ""}`,
  );
}

const skinParts = collectParts(SKIN);
const skinMerged = mergeParts(skinParts);
const skinSimplified = simplifyGeometry(skinMerged, SKIN.target);
const skinRecord = writeEntity(skinSimplified);
skinRecord.parts = skinParts.length;
manifest.skin = skinRecord;
totalTriangles += skinRecord.indexCount / 3;
console.log(
  `skin               ${String(skinParts.length).padStart(3)} pièces  ${String(skinRecord.indexCount / 3).padStart(6)} tris  ${(skinRecord.vertexCount / 1000).toFixed(1)}k verts`,
);

fs.mkdirSync(OUT, { recursive: true });
fs.writeFileSync(path.join(OUT, "anatomy.json"), JSON.stringify(manifest));
const binaryBuffer = Buffer.concat(binary);
fs.writeFileSync(path.join(OUT, "anatomy.bin"), binaryBuffer);
fs.writeFileSync(path.join(OUT, "anatomy.bin.gz"), zlib.gzipSync(binaryBuffer, { level: 9 }));

const size = fs.statSync(path.join(OUT, "anatomy.bin")).size;
console.log(`\nTotal: ${totalTriangles} triangles, ${(size / 1024 / 1024).toFixed(2)} MB`);
