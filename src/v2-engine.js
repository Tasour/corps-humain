import * as THREE from "three";
import initWasm, { AnatomyIndex } from "./wasm/corps-core/corps_core.js";

/* Moteur de rendu v2 :lots BatchedMesh + index spatial WASM.
 * Charge le jeu de données 2 107 structures, construit un lot par catégorie,
 * et fournit picking (BVH) et culling/LOD (frustum) pour la boucle de rendu.
 */
const CATEGORY_COLORS = {
  bone: "#cbd5e1",
  muscle: "#b83a4b",
  organ: "#d98f4a",
  skin: "#67e8f9",
};
const CATEGORY_ORDER = ["bone", "muscle", "organ", "skin"];

function colorFor(structure) {
  const mats = (structure.materials || []).join(" ").toLowerCase();
  if (/cartilage/.test(mats)) return "#cbd8d4";
  if (/bone/.test(mats)) return "#ded5c3";
  if (/tendon|fascia|ligament/.test(mats)) return "#d8cbb0";
  if (/gland/.test(mats)) return "#d98f4a";
  if (structure.category !== "organ") return CATEGORY_COLORS[structure.category];
  const sub = (structure.subsystem || "").toLowerCase();
  const name = (structure.en || "").toLowerCase();
  if (/nerv|sens|gyrus|sulcus|brain|nerve|spinal|dura|meninx|plexus/.test(sub + " " + name)) return "#7a76a8";
  if (/cardiac|arter|vein|venous|lymph/.test(sub + " " + name)) return "#d45a63";
  if (/respirat|digest|urinary|reproduct|endocrine|visceral/.test(sub)) return "#d98f4a";
  return CATEGORY_COLORS.organ;
}

/* Textures PBR : albedos générés, puis cartes normal/roughness dérivées
 * localement (aucun téléchargement supplémentaire, compatible hors ligne). */
function derivePbrMaps(image) {
  const canvas = document.createElement("canvas");
  canvas.width = image.width;
  canvas.height = image.height;
  const ctx = canvas.getContext("2d", { willReadFrequently: true });
  ctx.drawImage(image, 0, 0);
  const { data } = ctx.getImageData(0, 0, canvas.width, canvas.height);
  const w = canvas.width, h = canvas.height;
  const height = new Float32Array(w * h);
  for (let i = 0; i < w * h; i++) {
    height[i] = (data[i * 4] * 0.299 + data[i * 4 + 1] * 0.587 + data[i * 4 + 2] * 0.114) / 255;
  }
  const normalCanvas = document.createElement("canvas");
  normalCanvas.width = w; normalCanvas.height = h;
  const nctx = normalCanvas.getContext("2d");
  const normalData = nctx.createImageData(w, h);
  const roughCanvas = document.createElement("canvas");
  roughCanvas.width = w; roughCanvas.height = h;
  const rctx = roughCanvas.getContext("2d");
  const roughData = rctx.createImageData(w, h);
  const at = (x, y) => height[((y + h) % h) * w + ((x + w) % w)];
  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      const dx = at(x + 1, y) - at(x - 1, y);
      const dy = at(x, y + 1) - at(x, y - 1);
      const nx = -dx * 3, ny = -dy * 3, nz = 1;
      const len = Math.hypot(nx, ny, nz);
      const i = (y * w + x) * 4;
      normalData.data[i] = ((nx / len) * 0.5 + 0.5) * 255;
      normalData.data[i + 1] = ((ny / len) * 0.5 + 0.5) * 255;
      normalData.data[i + 2] = ((nz / len) * 0.5 + 0.5) * 255;
      normalData.data[i + 3] = 255;
      const rough = Math.round(255 - Math.min(1, Math.abs(dx) + Math.abs(dy) + 0.25) * 255);
      roughData.data[i] = roughData.data[i + 1] = roughData.data[i + 2] = rough;
      roughData.data[i + 3] = 255;
    }
  }
  nctx.putImageData(normalData, 0, 0);
  rctx.putImageData(roughData, 0, 0);
  const make = (canvas) => {
    const tex = new THREE.CanvasTexture(canvas);
    tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
    tex.repeat.set(6, 6);
    return tex;
  };
  return { normal: make(normalCanvas), roughness: make(roughCanvas) };
}

/* Albedos procéduraux tissu-spécifiques (aucun fichier externe). */
function generateAlbedo(kind) {
  const size = 256;
  const canvas = document.createElement("canvas");
  canvas.width = canvas.height = size;
  const ctx = canvas.getContext("2d");
  let seed = kind.length * 7919;
  const rnd = () => ((seed = (seed * 1664525 + 1013904223) >>> 0) / 4294967296);

  if (kind === "bone") {
    ctx.fillStyle = "#e6dccb";
    ctx.fillRect(0, 0, size, size);
    for (let i = 0; i < 900; i++) {
      const x = rnd() * size, y = rnd() * size, r = 0.4 + rnd() * 1.6;
      ctx.fillStyle = `rgba(120,105,85,${0.08 + rnd() * 0.18})`;
      ctx.beginPath(); ctx.arc(x, y, r, 0, Math.PI * 2); ctx.fill();
    }
    ctx.strokeStyle = "rgba(255,250,240,.18)";
    ctx.lineWidth = 1;
    for (let y = 0; y < size; y += 9) {
      ctx.beginPath();
      for (let x = 0; x <= size; x += 8) {
        const yy = y + Math.sin(x * 0.06 + y) * 1.5;
        x === 0 ? ctx.moveTo(x, yy) : ctx.lineTo(x, yy);
      }
      ctx.stroke();
    }
  } else if (kind === "muscle") {
    ctx.fillStyle = "#9d3540";
    ctx.fillRect(0, 0, size, size);
    for (let i = 0; i < 240; i++) {
      const x = rnd() * size;
      const w = 1 + rnd() * 4;
      const shade = 120 + Math.floor(rnd() * 90);
      ctx.strokeStyle = `rgba(${shade + 40},${Math.floor(shade * 0.45)},${Math.floor(shade * 0.5)},.45)`;
      ctx.lineWidth = w;
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.bezierCurveTo(x + (rnd() - 0.5) * 14, size * 0.33, x + (rnd() - 0.5) * 14, size * 0.66, x + (rnd() - 0.5) * 8, size);
      ctx.stroke();
    }
  } else {
    ctx.fillStyle = "#c07a70";
    ctx.fillRect(0, 0, size, size);
    for (let i = 0; i < 90; i++) {
      const x = rnd() * size, y = rnd() * size, r = 6 + rnd() * 20;
      const grad = ctx.createRadialGradient(x, y, 1, x, y, r);
      grad.addColorStop(0, `rgba(220,150,135,${0.1 + rnd() * 0.18})`);
      grad.addColorStop(1, "rgba(150,80,75,0)");
      ctx.fillStyle = grad;
      ctx.beginPath(); ctx.arc(x, y, r, 0, Math.PI * 2); ctx.fill();
    }
    ctx.strokeStyle = "rgba(110,45,55,.35)";
    for (let i = 0; i < 45; i++) {
      ctx.lineWidth = 0.4 + rnd();
      ctx.beginPath();
      let x = rnd() * size, y = rnd() * size;
      ctx.moveTo(x, y);
      for (let k = 0; k < 6; k++) {
        x += (rnd() - 0.5) * 26; y += (rnd() - 0.5) * 26;
        ctx.lineTo(x, y);
      }
      ctx.stroke();
    }
  }
  return canvas;
}

async function loadTissueTextures() {
  const out = {};
  for (const key of ["bone", "muscle", "organ"]) {
    const canvas = generateAlbedo(key);
    const tex = new THREE.CanvasTexture(canvas);
    tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
    tex.repeat.set(5, 5);
    out[key] = { map: tex, ...derivePbrMaps(canvas) };
  }
  return out;
}

async function loadBinary(url) {
  const response = await fetch(url);
  if (!response.ok) throw new Error(`${url} -> ${response.status}`);
  const payload = await response.arrayBuffer();
  const signature = new Uint8Array(payload, 0, 2);
  if (signature[0] === 0x1f && signature[1] === 0x8b) {
    return new Response(new Blob([payload]).stream().pipeThrough(new DecompressionStream("gzip"))).arrayBuffer();
  }
  return payload;
}

function geometryFromRecord(buffer, record) {
  const positions = new Float32Array(buffer, record.positions, record.vertexCount * 3);
  const normals = new Int16Array(buffer, record.normals, record.vertexCount * 3);
  const indices = record.indexType === "u16"
    ? new Uint16Array(buffer, record.indices, record.indexCount)
    : new Uint32Array(buffer, record.indices, record.indexCount);
  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
  geometry.setAttribute("normal", new THREE.BufferAttribute(normals, 3, true));
  geometry.setIndex(new THREE.BufferAttribute(indices, 1));
  const uvs = new Float32Array(record.vertexCount * 2);
  for (let i = 0; i < record.vertexCount; i++) {
    uvs[i * 2] = positions[i * 3] * 2 + 0.5;
    uvs[i * 2 + 1] = positions[i * 3 + 1] * 0.6;
  }
  geometry.setAttribute("uv", new THREE.BufferAttribute(uvs, 2));
  geometry.computeBoundingSphere();
  return geometry;
}

export class AnatomyV2Engine {
  constructor({ base = "./models/v2/", lod = "low" } = {}) {
    this.base = base;
    this.lod = lod;
    this.manifest = null;
    this.structures = [];
    this.byId = new Map();
    this.batches = new Map();
    this.index = null;
    this.instanceToStructure = new Map();
    this.structureToInstance = new Map();
    this.visibleBuffer = null;
    this.lodBuffers = new Map();
    this.geometryIds = new Map();
    this.sourceGeometries = new Map();
    this.globalLod = "low";
    this.currentVisible = new Set();
    this.isolated = null;
    this.skinDesired = true;
    this.frustum = new THREE.Frustum();
    this.projScreen = new THREE.Matrix4();
    this.ready = false;
    this.stats = { structures: 0, triangles: 0, drawCalls: 0 };
  }

  async load(onProgress = () => {}) {
    await initWasm();
    this.textures = await loadTissueTextures();
    const response = await fetch(`${this.base}manifest.json`);
    if (!response.ok) throw new Error(`manifest -> ${response.status}`);
    this.manifest = await response.json();
    this.structures = this.manifest.structures || [];

    const categories = CATEGORY_ORDER.filter((c) =>
      c === "skin" ? !!this.manifest.skin : this.structures.some((s) => s.category === c),
    );

    let done = 0;
    const total = categories.length + 1;
    const buffers = {};
    for (const category of categories) {
      /* La peau reste lisse même en vue d'ensemble : on prend son niveau medium. */
      /* La peau garde son plus haut LOD : les doigts se déforment dès 1,5 k tris. */
      const lodName = category === "skin" ? "high" : this.lod;
      const buffer = await loadBinary(`${this.base}${category}.${lodName}.bin.gz`);
      buffers[category] = buffer;
      done++;
      onProgress(done / total, `géométrie ${category}`);
    }

    this.index = new AnatomyIndex(this.structures.length + 1);
    let idx = 0;
    for (const structure of this.structures) {
      const record = structure.lod?.[this.lod];
      if (!record) continue;
      const buffer = buffers[structure.category];
      if (!buffer) continue;
      const geometry = geometryFromRecord(buffer, record);
      structure._geometry = geometry;
      structure._index = idx;
      const b = record.bounds || geometry.boundingSphere
        ? record.bounds
        : null;
      const min = b?.min || [-0.4, 0, -0.3];
      const max = b?.max || [0.4, 1.8, 0.3];
      const center = [
        (min[0] + max[0]) / 2,
        (min[1] + max[1]) / 2,
        (min[2] + max[2]) / 2,
      ];
      const radius = Math.max(
        (max[0] - min[0]) / 2,
        (max[1] - min[1]) / 2,
        (max[2] - min[2]) / 2,
        0.004,
      );
      this.index.push(
        idx, center[0], center[1], center[2], radius,
        min[0], min[1], min[2], max[0], max[1], max[2],
      );
      this.byId.set(structure.id, structure);
      idx++;
    }
    this.index.build(8);
    this.visibleBuffer = new Uint32Array(this.structures.length);
    done++;
    onProgress(1, "index spatial");

    /* Une géométrie par structure dans un lot par catégorie. */
    for (const category of categories) {
      const list = this.structures.filter((s) => s.category === category && s._geometry);
      if (!list.length) continue;
      let vertexCount = 0, indexCount = 0;
      for (const s of list) {
        /* On réserve la place du plus gros LOD pour pouvoir remplacer la
         * géométrie d'une instance sans reconstruire le lot. */
        const levels = Object.values(s.lod || {});
        vertexCount += Math.max(...levels.map((r) => r.vertexCount || 0));
        indexCount += Math.max(...levels.map((r) => r.indexCount || 0));
      }
      const maps = this.textures[category] || this.textures.organ;
      const material = new THREE.MeshPhysicalMaterial({
        color: 0xffffff,
        map: maps?.map || null,
        normalMap: maps?.normal || null,
        normalScale: new THREE.Vector2(0.5, 0.5),
        roughnessMap: maps?.roughness || null,
        roughness: category === "bone" ? 0.9 : 0.7,
        metalness: 0,
        clearcoat: category === "organ" ? 0.35 : 0.12,
        clearcoatRoughness: 0.45,
        side: THREE.DoubleSide,
      });
      const batch = new THREE.BatchedMesh(list.length, vertexCount, indexCount, material);
      batch.name = `v2-${category}`;
      batch.perObjectFrustumCulled = true;
      const matrix = new THREE.Matrix4();
      for (const structure of list) {
        const levels = Object.values(structure.lod || {});
        const maxVertices = Math.max(...levels.map((r) => r.vertexCount || 0));
        const maxIndices = Math.max(...levels.map((r) => r.indexCount || 0));
        const geometryId = batch.addGeometry(structure._geometry, maxVertices, maxIndices);
        const instanceId = batch.addInstance(geometryId);
        batch.setMatrixAt(instanceId, matrix);
        batch.setColorAt(instanceId, new THREE.Color(colorFor(structure)));
        this.geometryIds.set(structure.id, { category, geometryId });
        this.sourceGeometries.set(structure.id, structure._geometry);
        structure._geometryId = geometryId;
        structure._activeLod = this.lod;
        this.instanceToStructure.set(`${category}:${instanceId}`, structure);
        this.structureToInstance.set(structure._index, { category, instanceId });
      }
      this.batches.set(category, batch);
      this.stats.drawCalls += 1;
    }

    /* Peau : un lot séparé, translucide. */
    if (this.manifest.skin?.lod?.high) {
      const skinRecord = this.manifest.skin.lod.high;
      const skinGeometry = geometryFromRecord(buffers.skin, skinRecord);
      const skinMaps = this.textures.organ;
      const material = new THREE.MeshPhysicalMaterial({
        color: CATEGORY_COLORS.skin,
        map: skinMaps?.map || null,
        normalMap: skinMaps?.normal || null,
        roughnessMap: skinMaps?.roughness || null,
        transparent: true,
        opacity: 0.22,
        depthWrite: false,
        side: THREE.DoubleSide,
      });
      const batch = new THREE.BatchedMesh(1, skinGeometry.attributes.position.count, skinGeometry.index.count, material);
      const gid = batch.addGeometry(skinGeometry);
      batch.addInstance(gid);
      batch.setMatrixAt(0, new THREE.Matrix4());
      this.skinBatch = batch;
    }

    this.stats.structures = idx;
    this.stats.triangles = this.structures.reduce(
      (sum, s) => sum + (s.lod?.[this.lod]?.indexCount || 0) / 3, 0,
    );
    this.ready = true;
    return this;
  }

  addTo(scene) {
    for (const batch of this.batches.values()) scene.add(batch);
    if (this.skinBatch) scene.add(this.skinBatch);
  }

  /* Renvoie la structure la plus proche sous le rayon, ou null. */
  pick(raycaster) {
    if (!this.index) return null;
    const origin = raycaster.ray.origin;
    const dir = raycaster.ray.direction;
    const hit = this.index.raycast(origin.x, origin.y, origin.z, dir.x, dir.y, dir.z, 8);
    if (hit < 0) return null;
    const structure = this.structures[hit] || null;
    if (!structure) return null;
    const batch = this.batches.get(structure.category);
    if (batch && !batch.visible) return null;
    return structure;
  }

  /* Culling frustum + LOD. Appelé quand la caméra bouge. */
  updateVisibility(camera, lodBias = 1) {
    if (!this.index) return 0;
    if (this.isolated) return this.currentVisible.size;
    camera.updateMatrixWorld();
    const planes = [];
    this.projScreen.multiplyMatrices(camera.projectionMatrix, camera.matrixWorldInverse);
    this.frustum.setFromProjectionMatrix(this.projScreen);
    for (const plane of this.frustum.planes) {
      planes.push(plane.normal.x, plane.normal.y, plane.normal.z, plane.constant);
    }
    const count = this.index.visible_into(
      planes, camera.position.x, camera.position.y, camera.position.z,
      lodBias, this.visibleBuffer,
    );
    const next = new Set();
    for (let i = 0; i < count; i++) next.add(this.visibleBuffer[i]);
    for (const structureIndex of this.currentVisible) {
      if (next.has(structureIndex)) continue;
      const ref = this.structureToInstance.get(structureIndex);
      const batch = ref && this.batches.get(ref.category);
      if (batch) batch.setVisibleAt(ref.instanceId, false);
    }
    for (const structureIndex of next) {
      if (this.currentVisible.has(structureIndex)) continue;
      const ref = this.structureToInstance.get(structureIndex);
      const batch = ref && this.batches.get(ref.category);
      if (batch) batch.setVisibleAt(ref.instanceId, true);
    }
    this.currentVisible = next;
    return count;
  }

  /* Charge (une seule fois) le chunk d'un niveau de détail pour une catégorie. */
  async ensureLod(category, lod) {
    const key = `${category}:${lod}`;
    if (this.lodBuffers.has(key)) return this.lodBuffers.get(key);
    const buffer = await loadBinary(`${this.base}${category}.${lod}.bin.gz`);
    this.lodBuffers.set(key, buffer);
    return buffer;
  }

  /* Remplace la géométrie d'une structure par un niveau plus fin. */
  async setStructureLod(structure, lod) {
    if (!structure?._geometryId || structure._activeLod === lod) return false;
    const record = structure.lod?.[lod];
    if (!record) return false;
    const ref = this.geometryIds.get(structure.id);
    if (!ref) return false;
    const buffer = await this.ensureLod(ref.category, lod);
    const geometry = geometryFromRecord(buffer, record);
    const batch = this.batches.get(ref.category);
    if (!batch) return false;
    batch.setGeometryAt(structure._geometryId, geometry);
    batch.computeBoundingBox();
    batch.computeBoundingSphere();
    structure._activeLod = lod;
    return true;
  }

  /* Isole une structure : toutes les autres instances sont masquées. */
  isolate(structure) {
    this.isolated = structure || null;
    if (!structure) {
      this.currentVisible = new Set();
      if (this.skinBatch) this.skinBatch.visible = this.skinDesired;
      return 0;
    }
    /* Un item isolé ne doit pas rester derrière l'enveloppe de peau. */
    if (this.skinBatch) this.skinBatch.visible = false;
    for (const [structureIndex, ref] of this.structureToInstance) {
      const batch = this.batches.get(ref.category);
      if (batch) batch.setVisibleAt(ref.instanceId, structureIndex === structure._index);
    }
    this.currentVisible = new Set([structure._index]);
    return 1;
  }

  /* Affiche uniquement les membres d'un groupe, en réactivant leurs catégories. */
  showGroup(group) {
    if (!group) return 0;
    const members = group.members.map((id) => this.byId.get(id)).filter(Boolean);
    const ids = new Set(members.map((s) => s.id));
    const categories = new Set(members.map((s) => s.category));
    for (const category of categories) this.setCategoryVisible(category, true);
    const memberIndices = new Set(members.map((s) => s._index));
    for (const [structureIndex, ref] of this.structureToInstance) {
      const batch = this.batches.get(ref.category);
      if (batch) batch.setVisibleAt(ref.instanceId, memberIndices.has(structureIndex));
    }
    this.isolated = group;
    this.currentVisible = memberIndices;
    if (this.skinBatch) this.skinBatch.visible = false;
    return members.length;
  }

  /* Anime un groupe : éclaté (t : 0→1) ou mouvement articulaire. */
  animateGroup(group, t, mode = "explode") {
    if (!group) return;
    const members = group.members.map((id) => this.byId.get(id)).filter(Boolean);
    const centers = members.map((s) => {
      const b = s.bounds;
      return new THREE.Vector3((b.min[0]+b.max[0])/2, (b.min[1]+b.max[1])/2, (b.min[2]+b.max[2])/2);
    });
    const center = centers.reduce((a, c) => a.add(c), new THREE.Vector3()).multiplyScalar(1 / Math.max(1, centers.length));
    const axis = new THREE.Vector3(...(group.axis || [0, 1, 0])).normalize();
    const pivot = new THREE.Vector3(...(group.pivot || center.toArray()));
    const identity = new THREE.Matrix4();
    const rotate = new THREE.Matrix4().makeRotationAxis(axis, (group.angle || 0.5) * Math.sin(t * Math.PI));
    const toPivot = new THREE.Matrix4().makeTranslation(pivot.x, pivot.y, pivot.z);
    const fromPivot = new THREE.Matrix4().makeTranslation(-pivot.x, -pivot.y, -pivot.z);
    const movement = new THREE.Matrix4().multiplyMatrices(toPivot, rotate).multiply(fromPivot);

    members.forEach((structure, i) => {
      const ref = this.structureToInstance.get(structure._index);
      const batch = ref && this.batches.get(ref.category);
      if (!batch) return;
      let matrix = identity;
      if (mode === "explode") {
        const dir = centers[i].clone().sub(center).normalize().multiplyScalar(0.18 * t);
        matrix = new THREE.Matrix4().makeTranslation(dir.x, dir.y, dir.z);
      } else if (mode === "movement") {
        matrix = movement;
      }
      batch.setMatrixAt(ref.instanceId, matrix);
    });
    /* setMatrixAt marque déjà la texture de matrices comme à mettre à jour. */
  }

  resetGroupTransforms() {
    const identity = new THREE.Matrix4();
    for (const [structureIndex, ref] of this.structureToInstance) {
      const batch = this.batches.get(ref.category);
      if (batch) batch.setMatrixAt(ref.instanceId, identity);
    }
    /* setMatrixAt marque déjà la texture de matrices comme à mettre à jour. */
  }

  /* Colorie une instance (sélection). La couleur par défaut est blanche. */
  highlight(structure, color = "#ffffff") {
    if (!structure) return;
    const ref = this.structureToInstance.get(structure._index);
    const batch = ref && this.batches.get(ref.category);
    if (batch) batch.setColorAt(ref.instanceId, new THREE.Color(color));
  }

  /* Centre et rayon d'une structure, pour le cadrage. */
  focusTarget(structure) {
    const b = structure?.bounds;
    if (!b) return null;
    return {
      center: new THREE.Vector3(
        (b.min[0] + b.max[0]) / 2,
        (b.min[1] + b.max[1]) / 2,
        (b.min[2] + b.max[2]) / 2,
      ),
      radius: Math.max(
        (b.max[0] - b.min[0]) / 2,
        (b.max[1] - b.min[1]) / 2,
        (b.max[2] - b.min[2]) / 2,
        0.02,
      ),
    };
  }

  /* Passe TOUTES les structures à un niveau de détail (vue globale). */
  async setGlobalLod(lod) {
    if (!["low", "medium", "high"].includes(lod) || this.globalLod === lod) return false;
    for (const category of this.batches.keys()) {
      if (lod !== "low") await this.ensureLod(category, lod);
      const batch = this.batches.get(category);
      for (const structure of this.structures) {
        if (structure.category !== category || !structure._geometryId) continue;
        const geometry = lod === "low"
          ? this.sourceGeometries.get(structure.id)
          : geometryFromRecord(this.lodBuffers.get(`${category}:${lod}`), structure.lod[lod]);
        if (geometry) {
          batch.setGeometryAt(structure._geometryId, geometry);
          structure._activeLod = lod;
        }
      }
    }
    this.globalLod = lod;
    for (const batch of this.batches.values()) {
      batch.computeBoundingBox();
      batch.computeBoundingSphere();
    }
    return true;
  }

  /* Détail maximal pour un groupe entier (à l'isolement). */
  async setGroupLod(group, lod) {
    if (!group) return 0;
    let count = 0;
    for (const id of group.members) {
      const structure = this.byId.get(id);
      if (structure && await this.setStructureLod(structure, lod)) count++;
    }
    return count;
  }

  setSkinVisible(visible) {
    this.skinDesired = !!visible;
    if (this.skinBatch) this.skinBatch.visible = this.skinDesired && !this.isolated;
  }

  setCategoryVisible(category, visible) {
    const batch = this.batches.get(category);
    if (batch) batch.visible = visible;
    if (category === "skin" && this.skinBatch) this.skinBatch.visible = visible;
  }
}
