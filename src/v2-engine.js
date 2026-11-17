import * as THREE from "three";
import initWasm, { AnatomyIndex } from "./wasm/corps-core/corps_core.js";

/* Moteur de rendu v2 :lots BatchedMesh + index spatial WASM.
 * Charge le jeu de données 2 131 structures, construit un lot par catégorie,
 * et fournit picking (BVH) et culling/LOD (frustum) pour la boucle de rendu.
 */
const CATEGORY_COLORS = {
  bone: "#cbd5e1",
  muscle: "#b83a4b",
  organ: "#d98f4a",
  skin: "#67e8f9",
};
const CATEGORY_ORDER = ["bone", "muscle", "organ", "skin"];

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
    this.currentVisible = new Set();
    this.frustum = new THREE.Frustum();
    this.projScreen = new THREE.Matrix4();
    this.ready = false;
    this.stats = { structures: 0, triangles: 0, drawCalls: 0 };
  }

  async load(onProgress = () => {}) {
    await initWasm();
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
      const lodName = category === "skin" ? "medium" : this.lod;
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
      const material = new THREE.MeshStandardMaterial({
        color: CATEGORY_COLORS[category] || "#ffffff",
        roughness: 0.68,
        metalness: 0.02,
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
        this.geometryIds.set(structure.id, { category, geometryId });
        structure._geometryId = geometryId;
        structure._activeLod = this.lod;
        this.instanceToStructure.set(`${category}:${instanceId}`, structure);
        this.structureToInstance.set(structure._index, { category, instanceId });
      }
      this.batches.set(category, batch);
      this.stats.drawCalls += 1;
    }

    /* Peau : un lot séparé, translucide. */
    if (this.manifest.skin?.lod?.medium) {
      const skinRecord = this.manifest.skin.lod.medium;
      const skinGeometry = geometryFromRecord(buffers.skin, skinRecord);
      const material = new THREE.MeshStandardMaterial({
        color: CATEGORY_COLORS.skin,
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

  setCategoryVisible(category, visible) {
    const batch = this.batches.get(category);
    if (batch) batch.visible = visible;
    if (category === "skin" && this.skinBatch) this.skinBatch.visible = visible;
  }
}
