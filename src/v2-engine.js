import * as THREE from "three";
import initWasm, { AnatomyIndex } from "./wasm/corps-core/corps_core.js";

/* Moteur de rendu v2 :lots BatchedMesh + index spatial WASM.
 * Charge le jeu de données 2 104 structures, construit un lot par catégorie,
 * et fournit picking (BVH) et culling/LOD (frustum) pour la boucle de rendu.
 */
const CATEGORY_COLORS = {
  bone: "#cbd5e1",
  muscle: "#b83a4b",
  organ: "#d98f4a",
  skin: "#67e8f9",
};
const CATEGORY_ORDER = ["bone", "muscle", "organ", "skin"];
/* Séreuses et fascias : feuillets sans épaisseur. Rendus opaques, ils masquent
 * les organes qu'ils recouvrent (le grand omentum cachait tout l'abdomen). */
const MEMBRANE_RE = /omentum|mesenter|peritoneum|\bpleura\b|pericardium|serous|fascia|septum|retinacul/i;
function isMembrane(structure) {
  return MEMBRANE_RE.test(`${structure.en || ""} ${structure.fr || ""} ${structure.la || ""}`);
}
/* Nombre maximal de géométries de contour conservées au survol. Au-delà,
 * les plus anciennes sont libérées pour éviter une croissance sans borne. */
const HOVER_CACHE_LIMIT = 20;

/* Couleur d'une structure. Deux bases fusionnées cohabitent :
 *   - Z-Anatomy fournit `materials` (Bone, Cartilage…) en français/anglais ;
 *   - BodyParts3D n'a AUCUN matériau (497/606 vides) et ses 109 matériaux
 *     restants sont hérités du jumeau Z-Anatomy (donc parfois faux : un
 *     tentorium classé « Cartilage »). On ne fait donc JAMAIS confiance à
 *     `materials` pour une structure BodyParts3D.
 * L'ordre des règles est significatif : un vaisseau nommé (« artère spinale »)
 * doit gagner contre le mot « spinal » (qui désigne un nerf), et un organe
 * nommé (« lobe droit du foie ») doit gagner contre son sous-système
 * `arterial`. Les sous-systèmes ne servent qu'en dernier recours, et les
 * valeurs anglaises de BodyParts3D y sont normalisées. */
const SUBSYSTEM_COLORS = {
  arterial: "#b63a40",
  venous: "#4a6ea8",
  cardiovascular: "#b63a40",
  cardiovasculaire: "#b63a40",
  cardiac: "#8e2f3a",
  nervous: "#cbb06a",
  "nerveux et sens": "#cbb06a",
  sensory: "#d9b36a",
  respiratory: "#c47b78",
  digestive: "#c98d7e",
  urinary: "#c2a24a",
  reproductive: "#b4743e",
  endocrine: "#b4743e",
  lymphatic: "#7fbfa8",
  lymphoïde: "#7fbfa8",
  integumentary: "#7fa8a6",
};

function colorFor(structure) {
  const isBp = /BodyParts3D/i.test(structure.source || "");
  const mats = isBp ? "" : (structure.materials || []).join(" ").toLowerCase();
  const name = `${structure.en || ""} ${structure.fr || ""} ${structure.la || ""}`.toLowerCase();
  const sub = (structure.subsystem || "").toLowerCase();
  const cat = structure.category;

  /* 1. Catégories structurelles : la source les renseigne de façon fiable.
   * Le cartilage se reconnaît au NOM, pas à `materials` : Z-Anatomy étiquette
   * parfois la patella « Cartilage » et la couleur d'os doit primer. */
  if (cat === "bone") return /cartilage/.test(name) ? "#c9d6d0" : "#e6dcc9";
  if (cat === "muscle") return "#a83b44";

  /* 2. Vaisseaux explicitement nommés — AVANT les règles « spinal »/« pulmon »
   * qui classeraient à tort une artère spinale en nerf et le tronc pulmonaire
   * en poumon. `trunk`/`truncus` couvre les troncs artériels (pulmonaire,
   * brachio-céphalique) ; le tronc lymphatique est déjà pris par `lymph`. */
  if (/\barter(y|ies|ial)\b|\barteria\b|art[èe]re|\baorta\b|aortic|\btrunk\b|\btruncus\b/.test(name)) return "#b63a40";
  if (/\bvein(s)?\b|\bvena\b|veine|venous\b/.test(name)) return "#4a6ea8";
  if (/\blymph|lymphatic/.test(name)) return "#7fbfa8";

  /* 3. Organes nommés — avant les règles par sous-système, pour qu'un « lobe
   * droit du foie » (subsystem=arterial) reste couleur foie. */
  if (/heart|myocard|ventricl|atrium|auricle|endocard|pericard|tricuspid|mitral/.test(name)) return "#8e2f3a";
  if (/lung|pulmon|bronch|alveol|pleura/.test(name)) return "#c47b78";
  if (/liver|hepat/.test(name)) return "#83423a";
  if (/kidney|renal|nephron|glomerul|calyx/.test(name)) return "#9c4b44";
  if (/ureter|urethra|bladder|vesic|prostat/.test(name)) return "#c2a24a";
  if (/stomach|gastr|intestin|colon|jejun|ileum|duoden|caecum|cecum|rectum|anal|anus|appendix/.test(name)) return "#c98d7e";
  if (/pancrea|spleen|thyroid|gland|adrenal|pituitary|hypophysis|pineal|thymus|parathyroid/.test(name)) return "#b4743e";
  /* `\bretina\b` : sans borne, « retinaculum » (un tendon) serait pris pour
   * la rétine. */
  if (/\bretina\b|retinal\b|choroid|cornea|\biris\b|\blens\b|sclera|vitreous|conjunctiva/.test(name)) return "#d9b36a";
  if (/nerve|nerv|gyrus|sulcus|brain|encephal|cerebell|cerebr|dura|meninx|mening|tentorium|falx|plexus|tract\b|nucleus|ganglion|spinal cord|medulla|pons\b|thalam|hypothalam|hippocamp/.test(name)) return "#cbb06a";
  if (/cartilage/.test(mats + " " + name)) return "#c9d6d0";
  if (/tendon|fascia|ligament|bursa|sheath|aponeuro|retinacul/.test(mats + " " + name)) return "#d8c9a8";
  if (/skin|epiderm|derm\b|cutaneous/.test(name)) return "#7fa8a6";

  /* 3 ter. Organes sans règle dédiée : muqueuses des voies aériennes et
   * digestives hautes, organes génitaux, séreuses. Sans ces règles ils
   * tombaient tous sur la teinte organe générique. */
  if (/trachea|larynx|pharynx|epiglott|vocal|arytenoid/.test(name)) return "#c47b78";
  if (/tongue|gingiva|mucosa|palate|uvula|oral|salivary|tonsil/.test(name)) return "#c9807e";
  if (/testis|epididym|ovary|uterus|vagina|penis|prostat|seminal|scrotum|broad ligament/.test(name)) return "#b4743e";
  if (/omentum|mesenter|peritoneum|pleura|pericardium/.test(name)) return "#d0a05a";

  /* 3 bis. Os classés « organe » par BodyParts3D (viscerocranium, mandibule,
   * vertèbres…) : sans cette règle ils tombaient sur un sous-système
   * `sensory`/`Viscéral` et prenaient une couleur d'organe. */
  if (/\bcranium\b|viscerocranium|neurocranium|mandible|maxilla|vertebra|\brib\b|sternum|scapula|clavicle|humerus|\bradius\b|\bulna\b|femur|tibia|fibula|patella|calcaneus|carpal|tarsal|metacarpal|metatarsal|phalan|sacrum|coccyx|ilium|ischium|\bpubis\b|\bbone\b|\bos\b/.test(name)) return "#e6dcc9";

  /* 4. Repli sur le sous-système, à valeurs anglaises ET françaises. */
  const bySub = SUBSYSTEM_COLORS[sub];
  if (bySub) return bySub;

  /* 5. Dernier repli : la catégorie, avec des teintes organe distinctes pour
   * éviter un bloc monochrome quand le nom n'apprend rien. */
  if (cat === "organ") return "#a85f55";
  return CATEGORY_COLORS[cat] || "#ffffff";
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

  /* ?tex=os-proxy : ancien proxy os uniquement (démonstration technique).
   * ?tex=cc0 : jeux CC0 assemblés pour os, muscle, organe, peau et veines.
   * Le flag reste désactivé par défaut ; chaque tissu manquant conserve son
   * rendu procédural, sans jamais bloquer le chargement de l'atlas. */
  const proxy = typeof window !== "undefined" ? window.__V2_TEXTURE_PROXY : null;
  if (proxy && /^[a-z0-9-]{1,40}$/.test(proxy)) {
    const loader = new THREE.TextureLoader();
    const charger = async (cle, dossier) => {
      const base = `${import.meta.env?.BASE_URL || "./"}textures/${dossier}/`;
      const load = async (file, srgb = false) => {
        const texture = await loader.loadAsync(`${base}${file}`);
        texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
        texture.repeat.set(5, 5);
        if (srgb) texture.colorSpace = THREE.SRGBColorSpace;
        return texture;
      };
      const [map, normal, roughness] = await Promise.all([
        load("albedo.jpg", true),
        load("normal.jpg"),
        load("roughness.jpg"),
      ]);
      let ao = null;
      try { ao = await load("ao.jpg"); } catch { /* carte optionnelle */ }
      out[cle] = { map, normal, roughness, ao };
    };
    const tissus = proxy === "cc0"
      ? [["bone", "bone"], ["muscle", "muscle"], ["organ", "organ"], ["skin", "skin"], ["veins", "veins"]]
      : [["bone", proxy]];
    const resultats = await Promise.allSettled(tissus.map(([cle, dossier]) => charger(cle, dossier)));
    for (const resultat of resultats) {
      if (resultat.status === "rejected") {
        console.warn("[textures] jeu indisponible, fallback procedural", resultat.reason);
      }
    }
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
  /* Garde-fou : les offsets LOD doivent rester dans le chunk chargé. Sans ce
   * contrôle, un chunk manquant ou une course entre changements de LOD lève
   * un RangeError difficile à diagnostiquer. */
  const finPositions = record.positions + record.vertexCount * 3 * 4;
  const finIndices = record.indices + record.indexCount * (record.indexType === "u16" ? 2 : 4);
  if (!buffer || finPositions > buffer.byteLength || finIndices > buffer.byteLength) return null;
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
    this.bySourceId = new Map();
    this.byAlias = new Map();
    this.batches = new Map();
    this.mergedMeshes = new Map();
    this.explodeAmount = 0;
    this._explodeData = null;
    /* Par catégorie : Uint32Array[vertexIndex] = _index de la structure.
     * Permet de remonter d'un hit sur un mesh fusionné (sans instanceId)
     * jusqu'à la structure correspondante. */
    this.mergedVertexMap = new Map();
    /* Par catégorie : Map(_index structure → { start, count }) pour repeindre
     * les vertices d'une structure dans la vue fusionnée (sélection). */
    this.mergedRanges = new Map();
    this.categoryEnabled = new Map();
    this.mergedMode = true;
    this.index = null;
    this.instanceToStructure = new Map();
    this.structureToInstance = new Map();
    this.visibleBuffer = null;
    this.lodBuffers = new Map();
    this.baseBuffers = {};  // buffers 'low' chargés à l'initialisation
    this.geometryIds = new Map();
    /* sourceGeometries suit la géométrie AFFICHÉE (peut être promue en high
     * pour le contour de survol) ; baseGeometries garde la géométrie low
     * d'origine et n'est JAMAIS écrasée, sinon resetLodsToLow() ne peut plus
     * revenir en arrière. */
    this.sourceGeometries = new Map();
    this.baseGeometries = new Map();
    this.globalLod = "low";
    this.currentVisible = new Set();
    this.isolated = null;
    /* La peau est masquée par défaut pour laisser les organes lisibles. */
    this.skinDesired = false;
    this.camera = null;
    this.hoverScene = new THREE.Scene();
    this.hoverMesh = null;
    this.hoverGeometryCache = new Map();
    this.waypointGroup = new THREE.Group();
    this.waypointGroup.visible = false;
    this.waypointsVisible = false;
    this.waypoints = [];
    this.animation = null;
    this.frustum = new THREE.Frustum();
    this.projScreen = new THREE.Matrix4();
    this.ready = false;
    this.stats = { structures: 0, triangles: 0, drawCalls: 0 };
  }

  /* Résout indifféremment l'ID d'affichage ou l'identifiant source immuable
   * (BENCH-008). Le premier conserve la priorité pour ne pas casser les liens
   * déjà partagés. */
  resolveId(id) {
    if (id === null || id === undefined) return null;
    const direct = this.byId.get(id) || this.bySourceId.get(id);
    if (direct) return direct;
    const cible = this.byAlias.get(id);
    return cible ? (this.byId.get(cible) || this.bySourceId.get(cible) || null) : null;
  }

  async load(onProgress = () => {}) {
    await initWasm();
    this.textures = await loadTissueTextures();
    const response = await fetch(`${this.base}manifest.json`);
    if (!response.ok) throw new Error(`manifest -> ${response.status}`);
    this.manifest = await response.json();
    try {
      const reponseAlias = await fetch(`${this.base}../../data/id-aliases.json`);
      if (reponseAlias.ok) {
        const donneesAlias = await reponseAlias.json();
        for (const [ancien, nouveau] of Object.entries(donneesAlias.alias || {})) this.byAlias.set(ancien, nouveau);
      }
    } catch { /* sans alias, seuls les identifiants courants résolvent */ }
    this.structures = this.manifest.structures || [];

    const categories = CATEGORY_ORDER.filter((c) =>
      c === "skin" ? !!this.manifest.skin : this.structures.some((s) => s.category === c),
    );

    let done = 0;
    const total = categories.length + 1;
    const buffers = {};
    for (const category of categories) {
      /* La peau garde son plus haut LOD : les doigts se déforment dès 1,5 k tris. */
      const lodName = category === "skin" ? "high" : this.lod;
      const buffer = await loadBinary(`${this.base}${category}.${lodName}.bin.gz`);
      buffers[category] = buffer;
      this.baseBuffers[category] = buffer;
      done++;
      onProgress(done / total, `géométrie ${category}`);
      /* Apports BodyParts3D CC BY 4.0 : chunks séparés, référencés par
       * `record.chunk`. Sans ce chargement, le moteur lirait leurs offsets
       * dans le chunk Z-Anatomy et afficherait une géométrie aléatoire. */
      try {
        const apport = await loadBinary(`${this.base}bp.${category}.${lodName}.bin.gz`);
        buffers[`bp.${category}`] = apport;
        buffers[`bp.${category}.${lodName}`] = apport;
        this.baseBuffers[`bp.${category}.${lodName}`] = apport;
      } catch { /* aucune apport pour cette catégorie */ }
    }

    this.index = new AnatomyIndex(this.structures.length + 1);
    let idx = 0;
    for (const structure of this.structures) {
      const record = structure.lod?.[this.lod];
      if (!record) continue;
      const cle = record.chunk ? record.chunk.replace(/\.bin$/, "") : structure.category;
      const buffer = this.baseBuffers[cle];
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
      if (structure.source_id) this.bySourceId.set(structure.source_id, structure);
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
      /* MeshStandardMaterial : le clearcoat de MeshPhysicalMaterial ajoute
       * un lobe GGX + IBL par fragment, trop coûteux avec 2104 instances.
       * L'environnement PMREM fournit déjà les reflets. */
      const material = new THREE.MeshStandardMaterial({
        color: 0xffffff,
        map: maps?.map || null,
        normalMap: maps?.normal || null,
        normalScale: new THREE.Vector2(0.5, 0.5),
        roughnessMap: maps?.roughness || null,
        roughness: category === "bone" ? 0.9 : 0.7,
        metalness: 0,
        side: THREE.DoubleSide,
      });
      const batch = new THREE.BatchedMesh(list.length, vertexCount, indexCount, material);
      batch.name = `v2-${category}`;
      /* Cette option force BatchedMesh à recalculer ses paramètres de dessin
       * dans onBeforeRender avec la caméra principale. Sans elle, le passage
       * d'ombre (onBeforeShadow) écrase l'indirect buffer et le rendu principal
       * ne dessine plus rien dès que la caméra bouge. */
      batch.perObjectFrustumCulled = true;
      /* Le culling au niveau du lot (hérité de Mesh) utilise la boundingSphere
       * du géométrie fusionnée, qui devient erronée quand on remplace les
       * géométries (setGeometryAt). On le désactive : le culling fin est déjà
       * fait par le BVH WASM et par BatchedMesh par instance. */
      batch.frustumCulled = false;
      batch.castShadow = true;
      batch.receiveShadow = true;
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
        this.baseGeometries.set(structure.id, structure._geometry);
        structure._geometryId = geometryId;
        structure._activeLod = this.lod;
        this.instanceToStructure.set(`${category}:${instanceId}`, structure);
        this.structureToInstance.set(structure._index, { category, instanceId });
      }
      this.batches.set(category, batch);
      this.stats.drawCalls += 1;
    }

    /* Peau : un lot séparé, translucide. */
    /* Le socle Z-Anatomy n'a pas de maillage cutané dédié. On conserve un
     * skinBatch vide pour que les contrôles d'interface restent stables. */
    if (!this.manifest.skin?.lod?.high) {
      const vide = new THREE.BufferGeometry();
      vide.setAttribute("position", new THREE.Float32BufferAttribute([0, 0, 0], 3));
      vide.setIndex([0, 0, 0]);
      const batch = new THREE.BatchedMesh(1, 3, 3, new THREE.MeshBasicMaterial({ visible: false }));
      const gid = batch.addGeometry(vide);
      batch.addInstance(gid);
      batch.visible = false;
      this.skinBatch = batch;
    }
    if (this.manifest.skin?.lod?.high) {
      const skinRecord = this.manifest.skin.lod.high;
      const skinGeometry = geometryFromRecord(buffers.skin, skinRecord);
      const skinMaps = this.textures.skin || this.textures.organ;
      const material = new THREE.MeshPhysicalMaterial({
        color: CATEGORY_COLORS.skin,
        map: skinMaps?.map || null,
        normalMap: skinMaps?.normal || null,
        roughnessMap: skinMaps?.roughness || null,
        transparent: true,
        opacity: 0.12,
        depthWrite: false,
        side: THREE.DoubleSide,
      });
      const batch = new THREE.BatchedMesh(1, skinGeometry.attributes.position.count, skinGeometry.index.count, material);
      const gid = batch.addGeometry(skinGeometry);
      batch.addInstance(gid);
      batch.setMatrixAt(0, new THREE.Matrix4());
      this.skinBatch = batch;
    }

    this.buildMergedViews(this.lod, buffers);
    this.stats.structures = idx;
    this.stats.triangles = this.structures.reduce(
      (sum, s) => sum + (s.lod?.[this.lod]?.indexCount || 0) / 3, 0,
    );
    this.ready = true;
    return this;
  }

  /* Vue corps entier : UNE géométrie fusionnée par catégorie.
   * Un BatchedMesh émet un draw range par instance (~2100 ranges) même avec
   * multi-draw ; la fusion n'en émet qu'un seul par catégorie. Les batches
   * restent utilisés dès qu'on isole/filtre (quelques dizaines d'instances). */
  buildMergedViews(lod = this.lod, buffers = null) {
    this.mergedMeshes = new Map();
    this.mergedVertexMap = new Map();
    this.mergedRanges = new Map();
    for (const [category, batch] of this.batches) {
      const list = this.structures.filter((s) => s.category === category && s.lod?.[lod]);
      /* Les séreuses (grand omentum, mésentère, péritoine, plèvre) sont des
       * feuillets sans épaisseur : opaques, elles masquent tout l'abdomen et
       * donnent l'impression que les intestins ont disparu. On les rend à part,
       * translucides, pour que la vue « Organes » reste lisible. */
      const solids = list.filter((s) => !isMembrane(s));
      const membranes = list.filter((s) => isMembrane(s));
      this.buildMergedMesh(category, category, solids, batch.material, lod, buffers || this.baseBuffers);
      if (membranes.length) {
        const material = batch.material.clone();
        material.transparent = true;
        /* Très translucide : les séreuses se superposent en plusieurs
         * couches, l'alpha se cumule vite et redeviendrait opaque. */
        material.opacity = 0.15;
        material.depthWrite = false;
        material.roughness = 0.9;
        this.buildMergedMesh(`${category}:membrane`, category, membranes, material, lod, buffers || this.baseBuffers, { membrane: true });
      }
    }
  }

  /* Fusionne une liste de structures en un seul mesh, avec un attribut de
   * couleur par vertex et une carte vertex → structure pour le picking. */
  buildMergedMesh(key, category, list, baseMaterial, lod, buffers = {}, options = {}) {
    const positions = [], normals = [], indices = [], colors = [], vertexMap = [];
    const ranges = new Map();
    let vertexBase = 0;
    const color = new THREE.Color();
    for (const s of list) {
      const rec = s.lod[lod];
      const cle = rec.chunk ? rec.chunk.replace(/\.bin$/, "") : category;
      const buffer = this.lodBuffers.get(`${cle}:${lod}`) || this.baseBuffers?.[cle];
      if (!buffer) continue;
      const p = new Float32Array(buffer, rec.positions, rec.vertexCount * 3);
      const n = new Int16Array(buffer, rec.normals, rec.vertexCount * 3);
      const idxArr = rec.indexType === "u16"
        ? new Uint16Array(buffer, rec.indices, rec.indexCount)
        : new Uint32Array(buffer, rec.indices, rec.indexCount);
      color.set(colorFor(s));
      if (s._index !== undefined) ranges.set(s._index, { start: vertexBase, count: rec.vertexCount });
      for (let v = 0; v < rec.vertexCount; v++) {
        positions.push(p[v * 3], p[v * 3 + 1], p[v * 3 + 2]);
        normals.push(n[v * 3], n[v * 3 + 1], n[v * 3 + 2]);
        colors.push(color.r, color.g, color.b);
        vertexMap.push(s._index ?? 0xffffffff);
      }
      for (let i = 0; i < idxArr.length; i++) indices.push(idxArr[i] + vertexBase);
      vertexBase += rec.vertexCount;
    }
    if (!indices.length) return null;
    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute("position", new THREE.Float32BufferAttribute(positions, 3));
    geometry.setAttribute("normal", new THREE.Int16BufferAttribute(normals, 3, true));
    geometry.setAttribute("color", new THREE.Float32BufferAttribute(colors, 3));
    geometry.setIndex(new THREE.Uint32BufferAttribute(indices, 1));
    geometry.computeBoundingSphere();
    const material = baseMaterial.clone();
    material.vertexColors = true;
    const mesh = new THREE.Mesh(geometry, material);
    mesh.name = `v2-merged-${key}`;
    mesh.userData.category = category;
    mesh.userData.mapKey = key;
    mesh.castShadow = !options.membrane;
    mesh.receiveShadow = true;
    if (options.membrane) mesh.renderOrder = 2;
    this.mergedMeshes.set(key, mesh);
    this.mergedVertexMap.set(key, new Uint32Array(vertexMap));
    this.mergedRanges.set(key, ranges);
    return mesh;
  }

  addTo(scene) {
    /* Les vues fusionnées sont actives par défaut ; les batches sont masqués
     * jusqu'à un isolement ou un filtre. */
    for (const mesh of this.mergedMeshes.values()) scene.add(mesh);
    for (const batch of this.batches.values()) { batch.visible = false; scene.add(batch); }
    if (this.skinBatch) scene.add(this.skinBatch);
    scene.add(this.waypointGroup);
  }

  /* Bascule entre vue fusionnée (corps entier) et lots (isolement). */
  setMergedMode(enabled) {
    this.mergedMode = !!enabled;
    /* Un seul mode de rendu à la fois : sinon la vue fusionnée ET les lots
     * dessinent les mêmes structures (double draw, z-fighting, picking ambigu). */
    for (const mesh of this.mergedMeshes.values()) {
      const category = mesh.userData.category;
      mesh.visible = this.mergedMode && this.categoryEnabled?.get(category) !== false;
    }
    for (const [category, batch] of this.batches) {
      batch.visible = !this.mergedMode && this.categoryEnabled?.get(category) !== false;
    }
  }

  /* Marqueurs de waypoints d'une structure. */
  setWaypointsVisible(visible) {
    this.waypointsVisible = !!visible;
    this.waypointGroup.visible = this.waypointsVisible;
  }

  showWaypoints(waypoints) {
    this.clearWaypoints();
    this.waypoints = waypoints || [];
    /* Marqueurs de taille constante à l'écran : une sphère de 2 mm disparaît
     * dès qu'on recule, et un waypoint doit rester cliquable à toute distance.
     * `sizeAttenuation: false` donne une taille en unités d'écran. */
    if (!this.waypointTexture) {
      const canvas = document.createElement("canvas");
      canvas.width = canvas.height = 64;
      const ctx = canvas.getContext("2d");
      const g = ctx.createRadialGradient(32, 32, 4, 32, 32, 30);
      g.addColorStop(0, "rgba(255,255,255,1)");
      g.addColorStop(0.35, "rgba(126,249,255,1)");
      g.addColorStop(0.7, "rgba(30,127,140,0.85)");
      g.addColorStop(1, "rgba(30,127,140,0)");
      ctx.fillStyle = g;
      ctx.beginPath();
      ctx.arc(32, 32, 30, 0, Math.PI * 2);
      ctx.fill();
      this.waypointTexture = new THREE.CanvasTexture(canvas);
      this.waypointTexture.colorSpace = THREE.SRGBColorSpace;
    }
    for (const wp of this.waypoints) {
      const material = new THREE.SpriteMaterial({
        map: this.waypointTexture,
        depthTest: false,
        transparent: true,
        opacity: 0.95,
        sizeAttenuation: false,
      });
      const marker = new THREE.Sprite(material);
      marker.position.set(...wp.position);
      marker.scale.set(0.026, 0.026, 1);
      marker.renderOrder = 20;
      marker.userData.waypoint = wp;
      this.waypointGroup.add(marker);
    }
  }

  clearWaypoints() {
    for (const child of [...this.waypointGroup.children]) {
      this.waypointGroup.remove(child);
      child.material?.dispose();
    }
    this.waypoints = [];
  }

  pickWaypoint(raycaster) {
    const hits = raycaster.intersectObjects(this.waypointGroup.children, false);
    return hits.length ? hits[0].object.userData.waypoint : null;
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
    /* L'autorité de visibilité est currentVisible (BVH + isolation), pas
     * batch.visible : en vue corps entier tous les lots sont masqués alors
     * que les structures sont bien affichées via les meshes fusionnés. */
    if (!this.currentVisible.has(hit)) return null;
    if (this.isolated && !this.currentVisible.has(structure._index)) return null;
    return structure;
  }

  /* Met en évidence un ensemble de structures (un bloc de l'arborescence). */
  showCollection(ids) {
    const set = new Set(ids);
    const members = ids.map((id) => this.resolveId(id)).filter(Boolean);
    for (const category of new Set(members.map((s) => s.category))) {
      this.setCategoryVisible(category, true);
    }
    this.setMergedMode(false);
    for (const [index, ref] of this.structureToInstance) {
      const batch = this.batches.get(ref.category);
      if (batch) batch.setVisibleAt(ref.instanceId, set.has(this.structures[index].id));
    }
    this.isolated = { ids };
    this.currentVisible = new Set(members.map((s) => s._index));
    if (this.skinBatch) this.skinBatch.visible = false;
    return members.length;
  }

  /* Contour d'une structure au survol : une « coquille » inversée (BackSide).
   * Au lieu d'un scale uniforme (1.035) qui agrandit TOUTES les dimensions
   * d'autant — les vaisseaux/nerfs allongés voient leurs extrémités déborder
   * de plusieurs centimètres et le contour « traverse » l'item — on décale
   * chaque vertex le long de sa normale d'une épaisseur constante, calculée
   * comme une fraction de la PLUS PETITE dimension de la structure. Le contour
   * reste ainsi plaqué sur la silhouette, quelle que soit l'anisotropie. */
  setHover(structure, activeGeometry = null) {
    this.clearHover();
    if (!structure) return;
    const source = activeGeometry || this.sourceGeometries.get(structure.id);
    if (!source) return;
    const b = structure.bounds;
    const center = new THREE.Vector3((b.min[0]+b.max[0])/2, (b.min[1]+b.max[1])/2, (b.min[2]+b.max[2])/2);
    let geometry = this.hoverGeometryCache.get(structure.id);
    if (!geometry) {
      geometry = source.clone();
      /* Épaisseur du contour : 5 % de la plus petite dimension non nulle.
       * Cette valeur est bornée par la plus petite dimension de la silhouette
       * projetée, donc l'agrandissement reste < 25 % (voir visual-collisions).
       * Un plan totalement plat (dimension nulle) retombe sur la plus grande
       * dimension pour éviter un contour inexistant. */
      const dims = [
        Math.abs(b.max[0] - b.min[0]),
        Math.abs(b.max[1] - b.min[1]),
        Math.abs(b.max[2] - b.min[2]),
      ];
      const positive = dims.filter((d) => d > 1e-9);
      const smallest = positive.length ? Math.min(...positive) : Math.max(...dims, 0.01);
      /* 1,5 % seulement : un fin faisceau nerveux (ex. faisceau propre postérieur)
       * a une épaisseur < 1 mm ; à 5 % le contour dépassait de 80 % sa silhouette
       * et « traversait » l'item (collision signalée visuellement). */
      const offset = Math.max(smallest * 0.015, 1e-7);
      const pos = geometry.getAttribute("position");
      if (pos) {
        /* Agrandissement RADIAL depuis le centre : symétrique, le contour
         * entoure l'item au lieu d'être décalé d'un côté (cas des tubes/veines
         * où le décalage par normale donnait un contour asymétrique qui
         * « traversait » la structure). */
        for (let i = 0; i < pos.count; i++) {
          const dx = pos.getX(i) - center.x;
          const dy = pos.getY(i) - center.y;
          const dz = pos.getZ(i) - center.z;
          const len = Math.hypot(dx, dy, dz) || 1;
          const scale = 1 + Math.min(0.02, offset / Math.max(len, 1e-6));
          pos.setXYZ(i,
            center.x + dx * scale,
            center.y + dy * scale,
            center.z + dz * scale,
          );
        }
        pos.needsUpdate = true;
        geometry.computeBoundingSphere();
      }
      geometry.translate(-center.x, -center.y, -center.z);
      this.hoverGeometryCache.set(structure.id, geometry);
      /* Map conserve l'ordre d'insertion : on évince les plus anciennes. */
      while (this.hoverGeometryCache.size > HOVER_CACHE_LIMIT) {
        const oldest = this.hoverGeometryCache.keys().next().value;
        this.hoverGeometryCache.get(oldest)?.dispose();
        this.hoverGeometryCache.delete(oldest);
      }
    }
    /* Les structures en « nappes » (muscles intercostaux, fascia, réseaux de
     * bandes) ont une boîte très anisotrope : un contour plein recouvre tout
     * l'item. On affiche alors un fil de fer, qui ne remplit pas la silhouette. */
    const dims = [b.max[0]-b.min[0], b.max[1]-b.min[1], b.max[2]-b.min[2]];
    const smallestDim = Math.min(...dims.filter((d) => d > 1e-9));
    const largestDim = Math.max(...dims);
    const thin = smallestDim < largestDim * 0.35;
    /* Pour les nappes très fines, tout contour (même wireframe) recouvre
     * l'item : on n'en affiche pas. L'étiquette de survol suffit à l'identifier. */
    if (thin) return;
    const material = new THREE.MeshBasicMaterial({
      color: 0x35d6d6,
      side: THREE.BackSide,
      transparent: true,
      opacity: 0.85,
      depthWrite: false,
      /* Pas de polygonOffset : il faisait passer la coquille devant l'item
       * et recouvrait tout l'os en cyan. Le BackSide suffit à n'afficher que
       * les faces arrière, donc le liseré derrière la silhouette. */
    });
    const mesh = new THREE.Mesh(geometry, material);
    mesh.position.copy(center);
    /* Plus de scale global : l'épaisseur est déjà dans la géométrie. */
    mesh.renderOrder = 10;
    this.hoverMesh = mesh;
    (this.hoverScene || (this.hoverScene = new THREE.Scene())).add(mesh);
  }

  clearHover() {
    if (!this.hoverMesh) return;
    this.hoverScene?.remove(this.hoverMesh);
    this.hoverMesh.material.dispose();
    this.hoverMesh = null;
  }

  /* Picking sur les vues fusionnées VISIBLES (vue corps entier). Un hit sur un
   * Mesh fusionné ne porte ni batchId ni instanceId : on remonte à la structure
   * via mergedVertexMap[hit.face.a], construite dans buildMergedViews(). */
  pickMerged(raycaster) {
    if (!this.mergedMeshes.size) return null;
    const targets = [];
    for (const mesh of this.mergedMeshes.values()) {
      if (mesh.visible) targets.push(mesh);
    }
    if (!targets.length) return null;
    const hits = raycaster.intersectObjects(targets, false);
    for (const hit of hits) {
      const map = this.mergedVertexMap.get(hit.object.userData.mapKey || hit.object.userData.category);
      if (!map || !hit.face) continue;
      const structureIndex = map[hit.face.a];
      const structure = this.structures[structureIndex] || null;
      if (!structure) continue;
      /* Garde-fou cohérent avec pick() : en vue isolée, une structure masquée
       * ne doit jamais produire de survol ni de sélection. */
      if (this.isolated && !this.currentVisible.has(structureIndex)) continue;
      return structure;
    }
    return null;
  }

  /* Picking exact sur les triangles (meshes fusionnés d'abord, puis lots).
   * Plus fiable que l'AABB du BVH pour les structures imbriquées. */
  pickExact(raycaster) {
    /* En vue corps entier les lots sont masqués : les meshes fusionnés sont
     * la seule représentation affichée et doivent être interrogés en premier. */
    const merged = this.pickMerged(raycaster);
    if (merged) return merged;
    if (!this.batches.size) return null;
    /* On ne teste que les catégories actuellement affichées. */
    const targets = [];
    const byBatch = new Map();
    for (const [category, batch] of this.batches) {
      if (batch?.visible) {
        targets.push(batch);
        byBatch.set(batch, category);
      }
    }
    if (!targets.length) return null;
    const hits = raycaster.intersectObjects(targets, false);
    for (const hit of hits) {
      const batch = hit.object;
      const category = byBatch.get(batch);
      if (!category) continue;
      /* Three.js r187 renseigne `batchId` (index d'instance) sur les hits
       * BatchedMesh ; `instanceId` n'est posé que par les Mesh classiques.
       * On accepte les deux pour rester compatible avec les versions voisines. */
      const instanceId = hit.batchId ?? hit.instanceId;
      if (instanceId === undefined || instanceId === null) continue;
      /* Un lot visible peut encore contenir des instances masquées par
       * isolate()/showGroup()/updateVisibility() : on les exclut explicitement. */
      if (batch.getVisibleAt && !batch.getVisibleAt(instanceId)) continue;
      const structure = this.instanceToStructure.get(`${category}:${instanceId}`);
      if (!structure) continue;
      /* Même pour un BatchedMesh, on recoupe avec notre propre état de
       * visibilité (AABB/BVH + isolation) : une instance cullée ou masquée ne
       * doit jamais produire de survol ni de contour. */
      if (!this.currentVisible.has(structure._index)) continue;
      return structure;
    }
    return null;
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
  async ensureLod(cleChunk, lod) {
    const key = `${cleChunk}:${lod}`;
    if (this.lodBuffers.has(key)) return this.lodBuffers.get(key);
    const fichier = cleChunk.startsWith("bp.")
      ? `bp.${cleChunk.slice(3).split(".")[0]}.${lod}` : cleChunk;
    const buffer = await loadBinary(`${this.base}${fichier}.bin.gz`);
    /* Garde-fou : un chunk tronqué produirait des vues TypedArray invalides
     * (RangeError) pendant les changements rapides de groupe. */
    if (buffer.byteLength < 8) throw new Error(`chunk LOD vide : ${fichier}`);
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
    /* Le LOD bas est déjà en mémoire : inutile de re-télécharger le chunk. */
    const cleChunk = record.chunk ? record.chunk.replace(/\.bin$/, "") : ref.category;
    const geometry = lod === "low"
      ? this.baseGeometries.get(structure.id)
      : geometryFromRecord(await this.ensureLod(cleChunk, lod), record);
    if (!geometry) return false;
    const batch = this.batches.get(ref.category);
    if (!batch) return false;
    batch.setGeometryAt(structure._geometryId, geometry);
    /* Le contour de survol doit suivre la géométrie AFFICHÉE (ici le high),
     * pas la source low : sinon il déborde de la silhouette de l'item isolé. */
    this.sourceGeometries.set(structure.id, geometry);
    this.hoverGeometryCache.delete(structure.id);
    /* getBoundingSphereAt() de BatchedMesh recalcule la sphère à la demande ;
     * un computeBoundingSphere() sur un lot de 1000+ instances à chaque
     * promotion coûte plusieurs ms et provoque des stalls GPU. */
    batch.boundingBox = null;
    batch.boundingSphere = null;
    structure._activeLod = lod;
    return true;
  }

  /* Repasse toutes les structures à leur géométrie source (LOD bas), sans
   * téléchargement : le corps entier n'a pas besoin du détail d'isolement. */
  resetLodsToLow() {
    for (const [id, geometry] of this.baseGeometries) {
      const structure = this.resolveId(id);
      const ref = this.geometryIds.get(id);
      if (!structure || !ref || structure._activeLod === "low") continue;
      const batch = this.batches.get(ref.category);
      if (!batch) continue;
      batch.setGeometryAt(structure._geometryId, geometry);
      /* La géométrie affichée redevient la source : le contour de survol doit
       * suivre, sinon il garde la forme high d'une structure revenue en low. */
      this.sourceGeometries.set(id, geometry);
      this.hoverGeometryCache.delete(id);
      structure._activeLod = "low";
    }
    this.globalLod = "low";
  }

  /* Isole une structure : toutes les autres instances sont masquées. */
  isolate(structure) {
    this.isolated = structure || null;
    if (!structure) {
      this.setMergedMode(true);
      /* Rétablit TOUTES les instances (y compris celles laissées visibles par
       * un isolement, un groupe ou une collection) puis réapplique le culling
       * frustum comme lors d'un mouvement de caméra. currentVisible reflète
       * ainsi l'état réel affiché au lieu de rester vide. */
      for (const [, ref] of this.structureToInstance) {
        const batch = this.batches.get(ref.category);
        if (batch) batch.setVisibleAt(ref.instanceId, true);
      }
      this.currentVisible = new Set(this.structureToInstance.keys());
      /* Vue corps entier : on repasse les structures promues au LOD bas.
       * Le détail n'apporte rien à cette échelle et rendrait le rendu logiciel
       * prohibitif (des centaines de milliers de triangles en plus). */
      this.resetLodsToLow();
      if (this.skinBatch) this.skinBatch.visible = this.skinDesired;
      if (this.camera) this.updateVisibility(this.camera, 1);
      return this.currentVisible.size;
    }
    /* Un item isolé ne doit pas rester derrière l'enveloppe de peau, et sa
     * catégorie doit être activée même si elle était masquée (sinon rien
     * n'est rendu et seul le contour de survol apparaît). */
    if (this.skinBatch) this.skinBatch.visible = false;
    this.categoryEnabled.set(structure.category, true);
    this.setMergedMode(false);
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
    const members = group.members.map((id) => this.resolveId(id)).filter(Boolean);
    const ids = new Set(members.map((s) => s.id));
    const categories = new Set(members.map((s) => s.category));
    for (const category of categories) this.setCategoryVisible(category, true);
    this.setMergedMode(false);
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
    const members = group.members.map((id) => this.resolveId(id)).filter(Boolean);
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

  /* Éclaté global BENCH-005 : chaque structure s'éloigne du centre du corps
   * selon un vecteur propre, calculé une seule fois. Contrairement à
   * animateGroup(), deux groupes partageant une structure ne peuvent pas
   * écraser leurs matrices. */
  setExplodeAmount(value) {
    const amount = Math.max(0, Math.min(1, Number.isFinite(value) ? value : 0));
    this.explodeAmount = amount;
    if (!this._explodeData) {
      let sx = 0, sy = 0, sz = 0, n = 0;
      const centres = new Map();
      for (const structure of this.structures) {
        const b = structure.bounds;
        const c = new THREE.Vector3(
          (b.min[0] + b.max[0]) / 2,
          (b.min[1] + b.max[1]) / 2,
          (b.min[2] + b.max[2]) / 2,
        );
        centres.set(structure._index, c);
        sx += c.x; sy += c.y; sz += c.z; n++;
      }
      const centre = new THREE.Vector3(sx / Math.max(1, n), sy / Math.max(1, n), sz / Math.max(1, n));
      this._explodeData = new Map();
      for (const [index, c] of centres) {
        const dir = c.clone().sub(centre);
        this._explodeData.set(index, dir.lengthSq() > 1e-12 ? dir.normalize() : new THREE.Vector3(0, 1, 0));
      }
    }
    const identite = new THREE.Matrix4();
    for (const [index, dir] of this._explodeData) {
      const ref = this.structureToInstance.get(index);
      const batch = ref && this.batches.get(ref.category);
      if (!batch) continue;
      const v = dir.clone().multiplyScalar(0.35 * amount);
      const matrice = amount === 0
        ? identite
        : new THREE.Matrix4().makeTranslation(v.x, v.y, v.z);
      batch.setMatrixAt(ref.instanceId, matrice);
    }
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
  /* Couleur de sélection. `color === null` restaure la couleur anatomique
   * (colorFor) au lieu de repeindre en blanc. La vue fusionnée n'a pas
   * d'instanceColor : on repeint directement la plage de vertices de la
   * structure, sinon la sélection serait invisible en corps entier. */
  highlight(structure, color = "#ffffff") {
    if (!structure) return;
    const target = color === null || color === undefined
      ? new THREE.Color(colorFor(structure))
      : new THREE.Color(color);
    const ref = this.structureToInstance.get(structure._index);
    const batch = ref && this.batches.get(ref.category);
    if (batch) {
      batch.setColorAt(ref.instanceId, target);
      if (batch.instanceColor) batch.instanceColor.needsUpdate = true;
    }
    /* Une structure peut vivre dans le mesh solide ou dans le mesh des
     * séreuses : on repeint celui qui la contient. */
    for (const key of [structure.category, `${structure.category}:membrane`]) {
      const mesh = this.mergedMeshes.get(key);
      const range = this.mergedRanges.get(key)?.get(structure._index);
      if (!mesh || !range) continue;
      const attr = mesh.geometry.getAttribute("color");
      for (let i = 0; i < range.count; i++) {
        attr.setXYZ(range.start + i, target.r, target.g, target.b);
      }
      attr.needsUpdate = true;
    }
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
      const apport = this.batches.keys && `bp.${category}`;
      if (lod !== "low") {
        await this.ensureLod(category, lod);
        if (this.manifest?.structures?.some((s) => s.apport && s.category === category)) {
          await this.ensureLod(`bp.${category}`, lod);
        }
      }
      const batch = this.batches.get(category);
      for (const structure of this.structures) {
        if (structure.category !== category || !structure._geometryId) continue;
        const cle = structure.lod?.[lod]?.chunk?.replace(/\.bin$/, "") || category;
        const geometry = lod === "low"
          ? this.baseGeometries.get(structure.id)
          : geometryFromRecord(this.lodBuffers.get(`${cle}:${lod}`), structure.lod[lod]);
        if (geometry) {
          batch.setGeometryAt(structure._geometryId, geometry);
          this.sourceGeometries.set(structure.id, geometry);
          this.hoverGeometryCache.delete(structure.id);
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
      const structure = this.resolveId(id);
      if (structure && await this.setStructureLod(structure, lod)) count++;
    }
    return count;
  }

  /* Animations de scène appliquées aux instances d'un lot. */
  setSceneAnimation(type, ids = []) {
    this.clearAnimation();
    if (!type) return;
    this.animation = { type, ids: [...ids], t: 0 };
  }

  clearAnimation() {
    if (!this.animation) return;
    const identity = new THREE.Matrix4();
    for (const id of this.animation.ids) {
      const structure = this.resolveId(id);
      const ref = structure && this.structureToInstance.get(structure._index);
      const batch = ref && this.batches.get(ref.category);
      if (!batch) continue;
      batch.setMatrixAt(ref.instanceId, identity);
      batch.setColorAt(ref.instanceId, new THREE.Color(colorFor(structure)));
    }
    this.animation = null;
  }

  updateAnimation(dt, time) {
    if (!this.animation) return;
    const { type, ids } = this.animation;
    this.animation.t += dt;
    for (const id of ids) {
      const structure = this.resolveId(id);
      const ref = structure && this.structureToInstance.get(structure._index);
      const batch = ref && this.batches.get(ref.category);
      if (!batch) continue;
      const b = structure.bounds;
      const center = new THREE.Vector3((b.min[0]+b.max[0])/2, (b.min[1]+b.max[1])/2, (b.min[2]+b.max[2])/2);
      if (type === "bloodflow") {
        const pulse = 0.55 + 0.75 * (0.5 + 0.5 * Math.sin(time * 4 - center.y * 18));
        batch.setColorAt(ref.instanceId, new THREE.Color(colorFor(structure)).multiplyScalar(pulse));
        continue;
      }
      let sx = 1, sy = 1, sz = 1;
      if (type === "heartbeat") {
        const s = 1 + 0.06 * Math.sin(time * Math.PI * 2 * 1.2);
        sx = sy = sz = s;
      } else if (type === "breathing") {
        const s = 1 + 0.05 * Math.sin(time * Math.PI * 2 * 0.25);
        sx = sz = s; sy = 1 + 0.02 * Math.sin(time * Math.PI * 2 * 0.25);
      } else if (type === "blink") {
        sy = 1 - 0.92 * Math.pow(Math.max(0, Math.sin(time * Math.PI * 2 * 0.3)), 18);
      }
      const to = new THREE.Matrix4().makeTranslation(center.x, center.y, center.z);
      const scale = new THREE.Matrix4().makeScale(sx, sy, sz);
      const back = new THREE.Matrix4().makeTranslation(-center.x, -center.y, -center.z);
      batch.setMatrixAt(ref.instanceId, to.multiply(scale).multiply(back));
    }
  }

  setSkinVisible(visible) {
    this.skinDesired = !!visible;
    if (this.skinBatch) this.skinBatch.visible = this.skinDesired && !this.isolated;
  }

  setCategoryVisible(category, visible) {
    this.categoryEnabled.set(category, !!visible);
    const batch = this.batches.get(category);
    if (batch && !this.mergedMode) batch.visible = visible;
    const merged = this.mergedMeshes.get(category);
    if (merged) merged.visible = visible && this.mergedMode;
    /* Les séreuses/fascia sont un mesh séparé (`<catégorie>:membrane`) : sans
     * cette ligne, désactiver « Organes » laissait le péritoine visible et
     * cliquable, et une chasse aux organes pouvait toucher une membrane
     * masquée. */
    const membrane = this.mergedMeshes.get(`${category}:membrane`);
    if (membrane) membrane.visible = visible && this.mergedMode;
    if (category === "skin" && this.skinBatch) this.skinBatch.visible = visible && !this.isolated;
  }
}
