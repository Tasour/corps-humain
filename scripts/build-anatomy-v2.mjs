import fs from "node:fs";
import path from "node:path";
import zlib from "node:zlib";
import { MeshoptSimplifier } from "meshoptimizer";

/* Fabrique le jeu de données v2 : 2 202 structures × 3 niveaux de détail.
 * Sources : Z-Anatomy (export complet) + BodyParts3D (human-atlas).
 * Format binaire identique à anatomy.bin : positions F32, normales I16
 * normalisées, indices U16/U32. Chunks par catégorie et par LOD.
 */
const INVENTORY = process.env.INVENTORY_JSON || path.resolve(import.meta.dirname, "../docs/inventaire-anatomique/structures.json");
const ZANATOMY = process.env.ZANATOMY_ALL || path.resolve(import.meta.dirname, "../zanatomy-export");
const BP = process.env.ANATOMY_SOURCE || "/tmp/opencode/human-atlas/public/models";
const OUT = process.env.V2_OUT || path.resolve(import.meta.dirname, "../public/models/v2");
const CURRENT_MODELS = path.resolve(import.meta.dirname, "../public/models");

const inventory = JSON.parse(fs.readFileSync(INVENTORY, "utf8"));
const zManifest = JSON.parse(fs.readFileSync(path.join(ZANATOMY, "zanatomy-all.json"), "utf8"));
const zBuffer = fs.readFileSync(path.join(ZANATOMY, zManifest.bin));
const atlas = JSON.parse(fs.readFileSync(path.join(BP, "atlas.json"), "utf8"));
const bpChunks = atlas.chunks.map((c) => fs.readFileSync(path.join(BP, c.url.split("/").pop())));
const currentManifest = JSON.parse(fs.readFileSync(path.join(CURRENT_MODELS, "anatomy.json"), "utf8"));
const currentBuffer = fs.readFileSync(path.join(CURRENT_MODELS, "anatomy.bin"));

const partByName = new Map(atlas.parts.map((p) => [p.name, p]));
const allStructures = Object.values(inventory.categories).flat();
/* Concepts à exclure du rendu :
 *  - agrégats « région / système » (> 20 pièces) déjà couverts individuellement ;
 *  - catégories morphologiques génériques (« os plat », « os court »…) qui ne
 *    sont pas une structure anatomique unique ;
 *  - la peau de BodyParts3D, qui est une enveloppe corporelle complète et
 *    doublerait notre lot `skin` dédié. */
const EXCLUDED_CONCEPTS = new Set([
  "organ:bp-skin",
  "organ:bp-skin-appendage",
  "bone:bp-investing-fascia-l",
  "bone:bp-investing-fascia-r",
  "bone:bp-flat-bone",
  "bone:bp-flat-bone-l",
  "bone:bp-flat-bone-r",
  "bone:bp-short-bone-l",
  "bone:bp-short-bone-r",
  "bone:bp-irregular-bone",
  "bone:bp-irregular-bone-l",
  "bone:bp-irregular-bone-r",
  "bone:bp-long-bone-l",
  "bone:bp-long-bone-r",
  "bone:bp-sesamoid-bone-l",
  "bone:bp-sesamoid-bone-r",
  /* Régions anatomiques génériques, pas des structures individuelles. */
  "bone:bp-abdomen",
  "bone:bp-abdomen-l",
  "bone:bp-abdomen-r",
  "bone:bp-back-of-abdomen",
  "bone:bp-neck",
  "muscle:bp-pelvis",
  "muscle:bp-pelvis-l",
  "muscle:bp-pelvis-r",
  "organ:bp-nerve-trunk",
  "organ:bp-nerve-trunk-l",
  "organ:bp-nerve-trunk-r",
  /* Structures hors enveloppe cutanée (détectées par check-collisions.mjs). */
  "bone:distal-phalanx-of-first-finger-of-hand-l",
  "muscle:dorsal-fascia-of-hand-l",
  "muscle:palmar-aponeurosis-l",
]);

/* Structures mises en quarantaine par l'audit des collisions anatomiques
 * (docs/analyses/collisions-anatomiques.md, §§4-6 et §8.2) : 63 IDs uniques.
 * Elles restent dans l'inventaire source mais sont retirées du jeu généré :
 * doublons d'AABB (z-fighting), côté déclaré inversé et dimensions impossibles.
 * Les 960 structures vasculaires/nerveuses anatomiquement normales sont gardées. */
const HIDDEN_IDS = new Set([
  /* 43 IDs « non spécifiques » des 30 groupes d'AABB identiques : dans chaque
   * groupe on conserve le nom le plus spécifique (73 identifiants − 30 = 43). */
  "bone:bp-lower-limb",
  "bone:bp-lower-limb-l",
  "bone:bp-lower-limb-r",
  "bone:bp-nose",
  "bone:bp-pelvic-girdle",
  "bone:bp-pelvic-girdle-l",
  "bone:bp-pelvic-girdle-r",
  "organ:bp-anterior-mediastinum-l",
  "organ:bp-anterior-mediastinum-r",
  "organ:bp-aortic-valve-l",
  "organ:bp-aortic-valve-r",
  "organ:bp-basilar-artery",
  "organ:bp-basilar-artery-l",
  "organ:bp-bile-duct",
  "organ:bp-bile-duct-l",
  "organ:bp-bile-duct-r",
  "organ:bp-brachiocephalic-vein-l",
  "organ:bp-bronchus-l",
  "organ:bp-bronchus-r",
  "organ:bp-cerebral-arterial-circle-l",
  "organ:bp-cerebral-arterial-circle-r",
  "organ:bp-external-iliac-artery",
  "organ:bp-extrahepatic-bile-duct",
  "organ:bp-extrahepatic-bile-duct-l",
  "organ:bp-extrahepatic-bile-duct-r",
  "organ:bp-inferior-mesenteric-artery-l",
  "organ:bp-left-hepatic-artery-l",
  "organ:bp-main-bronchus-l",
  "organ:bp-parasympathetic-ganglion-l",
  "organ:bp-parasympathetic-ganglion-r",
  "organ:bp-peritoneum",
  "organ:bp-posterior-mediastinum-l",
  "organ:bp-posterior-mediastinum-r",
  "organ:bp-posterior-tibial-artery",
  "organ:bp-pubic-hair",
  "organ:bp-right-subclavian-artery",
  "organ:bp-subclavian-vein-l",
  "organ:bp-subclavian-vein-r",
  "organ:bp-superior-mesenteric-artery-r",
  "organ:bp-testicular-artery-l",
  "organ:bp-testicular-artery-r",
  "organ:bp-thymus-l",
  "organ:bp-thymus-r",
  /* 16 IDs dont le côté déclaré contredit le centre X réel (écart > 5 mm).
   * 4 d'entre eux figurent aussi dans les doublons ; le Set les déduplique :
   * 43 doublons + 16 côtés + 8 dimensions − 4 chevauchements = 63 IDs. */
  "muscle:bp-flexor-pollicis-brevis-l",
  "muscle:bp-flexor-pollicis-brevis-r",
  "organ:bp-aortic-valve-r",
  "organ:bp-bile-duct-l",
  "organ:bp-brachium-of-superior-colliculus-l",
  "organ:bp-brachium-of-superior-colliculus-r",
  "organ:bp-common-hepatic-artery-l",
  "organ:bp-extrahepatic-bile-duct-l",
  "organ:bp-fibrous-skeleton-of-heart-r",
  "organ:bp-hepatic-portal-vein-l",
  "organ:bp-left-ascending-lumbar-vein-l",
  "organ:bp-left-hepatic-artery-l",
  "organ:bp-left-hepatic-duct-l",
  "organ:bp-left-lobe-of-liver-l",
  "organ:bp-pulmonary-valve-r",
  "organ:bp-right-ascending-lumbar-vein-r",
  /* 8 IDs aux dimensions absurdes du §5, jusqu'à correction de la source. */
  "organ:hypothalamus",           // 0,476 m de haut au lieu de ~1 cm
  "organ:bp-left-lung",           // 0,081 m de haut au lieu de ~0,25 m
  "organ:spinal-ganglion-l",      // 0,466 m (mesh agrégé, pas un ganglion)
  "organ:spinal-ganglion-r",      // idem, côté droit
  "organ:intercostal-nodes-l",    // 0,298 m : chaîne, pas un nœud
  "organ:intercostal-nodes-r",    // idem, côté droit
  "organ:juxta-oesophageal-nodes", // 0,216 m : chaîne de ganglions
  "organ:prevertebral-nodes",      // 0,216 m : chaîne de ganglions
  /* 5 doublons inter-sources (docs/analyses/coherence.json, check
   * `duplicate-fr-source`) : la même structure anatomique existe à la fois
   * dans BodyParts3D (IDs `bp-*`) et dans Z-Anatomy. On retire la version
   * BodyParts3D et on garde Z-Anatomy, plus détaillée. */
  "organ:bp-corpus-spongiosum-of-penis", // corps spongieux du pénis
  "organ:bp-mesoappendix",               // méso-appendice
  "organ:bp-taenia-libera",              // ténia libre
  "organ:bp-taenia-mesocolica",          // ténia mésocolique
  "organ:bp-taenia-omentalis",           // ténia omental

  /* Fragments contradictoires des 4 artères dont le suffixe d'ID (-l/-r)
   * contredit le nom TA2 : ce sont des éclats de quelques millimètres
   * (certains de hauteur nulle) superposés à l'artère complète. On garde la
   * version dont le suffixe correspond au nom. */
  "organ:bp-left-common-carotid-artery-r",
  "organ:bp-left-subclavian-artery-r",
  "organ:bp-right-common-carotid-artery-l",
  "organ:bp-right-subclavian-artery-l",
  /* Variante nue de la même artère, sans côté, doublon de la version -l. */
  "organ:bp-left-subclavian-artery",
]);

/* Certains identifiants BodyParts3D portent un suffixe -l/-r erroné : le côté
 * réel est celui indiqué par le nom TA2 (« Left/Right ... artery », TA2 4181 à
 * 4184), pas par le suffixe de l'ID. On corrige le champ `side` du manifeste en
 * conséquence (contrôle `ta2-name-side` de tests/coherence-modeles.mjs). */
const SIDE_OVERRIDES = {
  "organ:bp-left-common-carotid-artery-r": "left",
  "organ:bp-left-subclavian-artery-r": "left",
  "organ:bp-right-common-carotid-artery-l": "right",
  "organ:bp-right-subclavian-artery-l": "right",
};

/* Un « agrégat » est un concept qui regroupe plusieurs structures (système,
 * région, membre, type d'os générique). Le seuil brut « plus de 20 pièces »
 * utilisé auparavant excluait aussi de VRAIS organes fragmentés en nombreux
 * morceaux — dont l'intestin grêle (54 pièces), d'où un abdomen vide. On
 * n'exclut donc que les noms qui désignent réellement un agrégat. */
const AGGREGATE_NAME = new RegExp(
  "^(human body|body|skeletal systems?|musculoskeletal systems?|cardiovascular systems?|" +
  "nervous systems?|respiratory systems?|.*mediastinum|face|head|neck|abdomen|pelvis|" +
  "thorax|back of thorax|trunk|axial skeleton|vertebral column|vertebra|" +
  "(long|short|flat|irregular|sesamoid) bone|(left|right) (upper|lower) limb|" +
  "liver|(left|right) lung|heart|brain)$",
  "i",
);
function isAggregateConcept(s) {
  if (!(s.bodyParts3D?.parts > 20)) return false;
  const names = [s.english, s.french, s.canonical].filter(Boolean);
  return names.some((n) => AGGREGATE_NAME.test(String(n).trim()));
}
/* L'intestin grêle contient déjà duodénum + jéjunum + iléon : garder en plus
 * l'iléon et le jéjunum séparés superposerait trois fois la même géométrie. */
const SUBSET_DUPLICATES = new Set(["organ:bp-ileum", "organ:bp-jejunum"]);

/* Exclusions validées par la revue visuelle (vague 1) : agrégats présentés
 * sous un identifiant singulier, ou pièces rompues, avec des structures
 * individuelles de remplacement vérifiées par les agents. Les patchs sont des
 * données versionnées, pas du code : voir docs/inventaire-anatomique/patches/. */
const PATCH_DIR = path.resolve(import.meta.dirname, "../docs/inventaire-anatomique/patches");
const REVIEW_EXCLUSIONS = new Set();
if (fs.existsSync(PATCH_DIR)) {
  for (const file of fs.readdirSync(PATCH_DIR).filter((f) => f.endsWith(".json")).sort()) {
    const patch = JSON.parse(fs.readFileSync(path.join(PATCH_DIR, file), "utf8"));
    for (const e of patch.exclusions || []) REVIEW_EXCLUSIONS.add(e.id);
  }
}

const keptConcepts = allStructures.filter(
  (s) => !EXCLUDED_CONCEPTS.has(s.id)
    && !SUBSET_DUPLICATES.has(s.id)
    && !REVIEW_EXCLUSIONS.has(s.id)
    && !isAggregateConcept(s),
);
/* L'inventaire contient parfois DEUX concepts FMA pour la même structure
 * (« small intestine » et « zone of small intestine »), donc deux entrées de
 * même id. Un id dupliqué casse byId() et le mapping _index → structure du
 * moteur : on ne garde que le concept le plus détaillé. */
const bestById = new Map();
for (const s of keptConcepts) {
  const prev = bestById.get(s.id);
  const tris = s.bodyParts3D?.triangles || 0;
  const prevTris = prev?.bodyParts3D?.triangles || 0;
  if (!prev || tris > prevTris) bestById.set(s.id, s);
}
const dedupedConcepts = [...bestById.values()];

/* BodyParts3D contient plusieurs concepts FMA pour la MÊME structure
 * (« Left subclavian artery » en version nue, -l et -r ; « Tracheobronchial
 * tree » entier + gauche + droit). Ils se superposent à l'écran et faussent
 * le picking. On déduplique par (nom, côté) en gardant le maillage le plus
 * détaillé ; le côté est déduit du champ `side` ou du suffixe d'ID. */
function dedupeKey(s) {
  const name = String(s.french || s.english || s.canonical || s.id).toLowerCase().trim();
  /* Le côté vient du champ `side`, du suffixe d'ID, ou à défaut du nom
   * ANGLAIS (« Left … »). On n'utilise pas le français : « droit » y signifie
   * aussi « rectus » (muscle droit de l'abdomen). */
  const side = s.side
    || (/-(l|r)$/.test(s.id) ? s.id.slice(-1) : "")
    || (/\bleft\b/i.test(s.english || "") ? "l" : /\bright\b/i.test(s.english || "") ? "r" : "");
  return `${name}|${side}`;
}
function triCount(s) {
  return (s.bodyParts3D?.triangles || 0) + (s.zAnatomy?.triangles || 0);
}
/* À nom égal, on préfère Z-Anatomy sauf si BodyParts3D est nettement plus
 * détaillé (> 30 % de triangles en plus) : c'est la politique de la fusion. */
function preferCandidate(candidate, current) {
  const tc = triCount(candidate);
  const tp = triCount(current);
  const cz = /Z-Anatomy/.test(candidate.best?.source || "");
  const pz = /Z-Anatomy/.test(current.best?.source || "");
  if (cz && !pz && tc >= tp * 0.7) return true;
  if (!cz && pz && tp >= tc * 0.7) return false;
  return tc > tp;
}

/* HIDDEN_IDS est appliqué AVANT la déduplication : sinon un doublon BodyParts3D
 * explicitement masqué pouvait gagner la déduplication puis disparaître,
 * emportant avec lui la version Z-Anatomy qu'on voulait garder. */
const preFiltered = dedupedConcepts.filter((s) => !HIDDEN_IDS.has(s.id));
const bestByName = new Map();
const dedupedAway = [];
for (const s of preFiltered) {
  const key = dedupeKey(s);
  const prev = bestByName.get(key);
  if (!prev) { bestByName.set(key, s); continue; }
  if (preferCandidate(s, prev)) {
    dedupedAway.push(prev.id);
    bestByName.set(key, s);
  } else {
    dedupedAway.push(s.id);
  }
}
const visibleStructures = [...bestByName.values()];
if (dedupedAway.length) {
  console.log(`Doublons de nom fusionnés : ${dedupedAway.length} (${dedupedAway.join(", ")})`);
}

const excludedAggregates = allStructures.length - keptConcepts.length;

/* Paires gauche/droite dont les deux côtés doivent provenir de la même source.
 * Le contrôle `source-pair` de tests/coherence-modeles.mjs exige qu'une paire
 * -l/-r ne mélange pas Z-Anatomy et BodyParts3D. Règle : privilégier Z-Anatomy
 * (géométrie lue via readZObject). Si les deux côtés disposent d'un objet
 * Z-Anatomy, la paire est gardée et son étiquette de source alignée sur
 * Z-Anatomy ; si un seul côté existe en Z-Anatomy et l'autre uniquement dans
 * BodyParts3D, la paire entière est exclue plutôt que de garder une paire
 * asymétrique. */
const MIXED_SOURCE_BASES = new Set([
  "bone:corniculate-cartilage",
  "bone:lateral-cuneiform-bone",
  "bone:trapezoid-bone",
  "muscle:iliococcygeus-muscle",
  "muscle:pubococcygeus-muscle",
  "muscle:straight-part-of-cricothyroid-muscle",
  "organ:stria-terminalis",
  "organ:thalamus",
]);

const SOURCE_OVERRIDES = new Map();  // id -> source imposée dans le manifeste
const MISMATCH_DROP_IDS = new Set(); // ids des paires asymétriques à exclure

const structuresById = new Map(visibleStructures.map((s) => [s.id, s]));
const hasZGeometry = (s) => Boolean(s && s.object && zManifest.objects[s.object]);
for (const base of MIXED_SOURCE_BASES) {
  const left = structuresById.get(`${base}-l`);
  const right = structuresById.get(`${base}-r`);
  const leftZ = hasZGeometry(left);
  const rightZ = hasZGeometry(right);
  if (leftZ && rightZ) {
    // Deux objets Z-Anatomy : on garde la paire (la géométrie est déjà lue
    // depuis Z) et on aligne l'étiquette de source des deux côtés.
    if (left) SOURCE_OVERRIDES.set(left.id, "Z-Anatomy");
    if (right) SOURCE_OVERRIDES.set(right.id, "Z-Anatomy");
  } else if (leftZ !== rightZ) {
    // Un seul côté en Z-Anatomy : mieux vaut perdre les deux qu'une paire
    // asymétrique.
    if (left) MISMATCH_DROP_IDS.add(left.id);
    if (right) MISMATCH_DROP_IDS.add(right.id);
  }
  // Aucun côté en Z-Anatomy : les deux viennent de BodyParts3D, déjà cohérents.
}

const structures = visibleStructures.filter((s) => !MISMATCH_DROP_IDS.has(s.id));

const LOD = {
  low: { target: 300, label: "vue d'ensemble" },
  medium: { target: 1500, label: "vue d'un système" },
  /* P3 : le `high` est la source complète, sans plafond arbitraire. Le
   * maillage fin n'est chargé qu'à l'isolement d'une structure, jamais pour
   * tout le corps en même temps. `null` = aucune simplification. */
  high: { target: null, label: "source complète (structure isolée)" },
};
const CATEGORIES = ["bone", "muscle", "organ", "skin"];

/* ---------- lecture des sources ---------- */
function readZObject(name) {
  const rec = zManifest.objects[name];
  if (!rec) return null;
  const base = zBuffer.buffer;
  const off = zBuffer.byteOffset;
  const positions = new Float32Array(base, off + rec.positions, rec.vertexCount * 3);
  const srcNormals = new Float32Array(base, off + rec.normals, rec.vertexCount * 3);
  const normals = new Int16Array(srcNormals.length);
  for (let i = 0; i < srcNormals.length; i++) {
    const v = Math.round(srcNormals[i] * 32767);
    normals[i] = Math.max(-32767, Math.min(32767, v));
  }
  const indices = new Uint32Array(base, off + rec.indices, rec.indexCount);
  return { positions, normals, indices, vertexCount: rec.vertexCount, indexCount: rec.indexCount, bounds: rec.bounds };
}

function readBPParts(names) {
  const parts = names.map((n) => partByName.get(n)).filter(Boolean);
  if (!parts.length) return null;
  let vertexCount = 0, indexCount = 0;
  for (const p of parts) { vertexCount += p.vertexCount; indexCount += p.indexCount; }
  const positions = new Float32Array(vertexCount * 3);
  const normals = new Int16Array(vertexCount * 3);
  const indices = new Uint32Array(indexCount);
  let vo = 0, io = 0;
  for (const p of parts) {
    const buf = bpChunks[p.chunk];
    positions.set(new Float32Array(buf.buffer, buf.byteOffset + p.positions, p.vertexCount * 3), vo * 3);
    normals.set(new Int16Array(buf.buffer, buf.byteOffset + p.normals, p.vertexCount * 3), vo * 3);
    const idx = new Uint32Array(buf.buffer, buf.byteOffset + p.indices, p.indexCount);
    for (let i = 0; i < idx.length; i++) indices[io + i] = idx[i] + vo;
    vo += p.vertexCount; io += p.indexCount;
  }
  return { positions, normals, indices, vertexCount, indexCount, bounds: computeBounds(positions) };
}

function readCurrentSkin() {
  const rec = currentManifest.skin;
  return {
    positions: new Float32Array(currentBuffer.buffer, currentBuffer.byteOffset + rec.positions, rec.vertexCount * 3),
    normals: new Int16Array(currentBuffer.buffer, currentBuffer.byteOffset + rec.normals, rec.vertexCount * 3),
    indices: rec.indexType === "u16"
      ? new Uint16Array(currentBuffer.buffer, currentBuffer.byteOffset + rec.indices, rec.indexCount)
      : new Uint32Array(currentBuffer.buffer, currentBuffer.byteOffset + rec.indices, rec.indexCount),
    vertexCount: rec.vertexCount,
    indexCount: rec.indexCount,
    bounds: rec.bounds,
  };
}

function computeBounds(positions) {
  const min = [Infinity, Infinity, Infinity], max = [-Infinity, -Infinity, -Infinity];
  for (let i = 0; i < positions.length; i += 3) {
    for (let a = 0; a < 3; a++) {
      const v = positions[i + a];
      if (v < min[a]) min[a] = v;
      if (v > max[a]) max[a] = v;
    }
  }
  return { min, max };
}

function compact(indices, positions, normals) {
  const map = new Int32Array(positions.length / 3).fill(-1);
  let n = 0;
  for (let i = 0; i < indices.length; i++) {
    const v = indices[i];
    if (map[v] < 0) map[v] = n++;
  }
  const p = new Float32Array(n * 3), no = new Int16Array(n * 3);
  for (let v = 0; v < map.length; v++) {
    const nv = map[v];
    if (nv < 0) continue;
    p[nv * 3] = positions[v * 3]; p[nv * 3 + 1] = positions[v * 3 + 1]; p[nv * 3 + 2] = positions[v * 3 + 2];
    no[nv * 3] = normals[v * 3]; no[nv * 3 + 1] = normals[v * 3 + 1]; no[nv * 3 + 2] = normals[v * 3 + 2];
  }
  const idx = new Uint32Array(indices.length);
  for (let i = 0; i < indices.length; i++) idx[i] = map[indices[i]];
  return { positions: p, normals: no, indices: idx, vertexCount: n, indexCount: idx.length };
}

/* Seuil de dégénérescence, exprimé en AIRE (m²), identique à celui de
 * `scripts/audit-qualite-3d.mjs` (1e-12 m² = 1e-6 mm²).
 *
 * Historique : le seuil était `cross² >= 1e-16`, soit une aire de 0,005 mm².
 * Sur les maillages Z-Anatomy tessellés à ~0,1 mm, 95 % des triangles d'un
 * petit objet (sinus caverneux) tombaient sous ce seuil et étaient supprimés
 * *après* simplification : le LOD `high` perdait 9 216 triangles sur 9 728,
 * ce qui rendait les LOD non monotones (`medium` > `high`). Un seuil d'aire
 * absolu doit rester très en dessous de la taille caractéristique des
 * triangles de la source. */
const DEGENERATE_AREA_M2 = 1e-12;

function removeDegenerate(geometry) {
  const kept = [];
  const { positions, indices } = geometry;
  for (let i = 0; i < indices.length; i += 3) {
    const a = indices[i] * 3, b = indices[i + 1] * 3, c = indices[i + 2] * 3;
    const ux = positions[b] - positions[a], uy = positions[b + 1] - positions[a + 1], uz = positions[b + 2] - positions[a + 2];
    const vx = positions[c] - positions[a], vy = positions[c + 1] - positions[a + 1], vz = positions[c + 2] - positions[a + 2];
    const cx = uy * vz - uz * vy, cy = uz * vx - ux * vz, cz = ux * vy - uy * vx;
    const cross = Math.sqrt(cx * cx + cy * cy + cz * cz);
    if (cross / 2 >= DEGENERATE_AREA_M2) kept.push(indices[i], indices[i + 1], indices[i + 2]);
  }
  if (kept.length === indices.length) return geometry;
  if (kept.length < 3) return geometry;
  return compact(Uint32Array.from(kept), geometry.positions, geometry.normals);
}

/* Correction de l'orientation PAR COMPOSANTE.
 *
 * Un volume signé négatif sur toute une structure peut masquer des
 * composantes internes inversées (et inversement). On calcule donc le volume
 * de chaque composante connexe dans son propre repère (centroïde local), et
 * on ne retourne que les composantes **fermées** dont le volume est
 * négatif de façon significative. Les surfaces ouvertes (fascias, séreuses,
 * vaisseaux coupés) sont laissées telles quelles : leur « volume » n'a pas de
 * sens anatomique et le retourner serait une correction fantaisiste. */
function repairOrientation(geometry) {
  const { positions, normals, indices } = geometry;
  const vertexCount = positions.length / 3;
  const triCount = indices.length / 3;
  if (!triCount) return geometry;

  const parent = new Int32Array(vertexCount);
  for (let i = 0; i < vertexCount; i++) parent[i] = i;
  const find = (x) => { while (parent[x] !== x) { parent[x] = parent[parent[x]]; x = parent[x]; } return x; };
  const union = (a, b) => { const ra = find(a), rb = find(b); if (ra !== rb) parent[rb] = ra; };
  for (let i = 0; i < indices.length; i += 3) {
    union(indices[i], indices[i + 1]);
    union(indices[i + 1], indices[i + 2]);
  }

  const groups = new Map();
  for (let t = 0; t < triCount; t++) {
    const root = find(indices[t * 3]);
    let g = groups.get(root);
    if (!g) { g = { tris: [], cx: 0, cy: 0, cz: 0, n: 0 }; groups.set(root, g); }
    g.tris.push(t);
    for (let k = 0; k < 3; k++) {
      const v = indices[t * 3 + k] * 3;
      g.cx += positions[v]; g.cy += positions[v + 1]; g.cz += positions[v + 2]; g.n++;
    }
  }

  let flippedComponents = 0;
  for (const g of groups.values()) {
    g.cx /= g.n; g.cy /= g.n; g.cz /= g.n;
    let area = 0, volume = 0, diag = 0;
    const mn = [Infinity, Infinity, Infinity], mx = [-Infinity, -Infinity, -Infinity];
    const vertices = new Set();
    const edgeCounts = new Map();
    for (const t of g.tris) {
      const ia = indices[t * 3], ib = indices[t * 3 + 1], ic = indices[t * 3 + 2];
      vertices.add(ia); vertices.add(ib); vertices.add(ic);
      for (const [a, b] of [[ia, ib], [ib, ic], [ic, ia]]) {
        const key = a < b ? a * vertexCount + b : b * vertexCount + a;
        edgeCounts.set(key, (edgeCounts.get(key) || 0) + 1);
      }
      const a = ia * 3, b = ib * 3, c = ic * 3;
      const ax = positions[a] - g.cx, ay = positions[a + 1] - g.cy, az = positions[a + 2] - g.cz;
      const bx = positions[b] - g.cx, by = positions[b + 1] - g.cy, bz = positions[b + 2] - g.cz;
      const cx = positions[c] - g.cx, cy = positions[c + 1] - g.cy, cz = positions[c + 2] - g.cz;
      area += 0.5 * Math.hypot(
        (by - ay) * (cz - az) - (bz - az) * (cy - ay),
        (bz - az) * (cx - ax) - (bx - ax) * (cz - az),
        (bx - ax) * (cy - ay) - (by - ay) * (cx - ax),
      );
      volume += (ax * (by * cz - bz * cy) + ay * (bz * cx - bx * cz) + az * (bx * cy - by * cx)) / 6;
      for (const v of [a, b, c]) for (let k = 0; k < 3; k++) {
        mn[k] = Math.min(mn[k], positions[v + k]);
        mx[k] = Math.max(mx[k], positions[v + k]);
      }
    }
    diag = Math.hypot(mx[0] - mn[0], mx[1] - mn[1], mx[2] - mn[2]);
    const closed = [...edgeCounts.values()].every((n) => n === 2);
    const tolerance = Math.max(1e-18, 1e-9 * diag ** 3);
    if (!closed || volume >= -tolerance) continue;
    for (const t of g.tris) {
      const b = indices[t * 3 + 1], c = indices[t * 3 + 2];
      indices[t * 3 + 1] = c; indices[t * 3 + 2] = b;
    }
    for (const v of vertices) {
      if (!normals) continue;
      for (let k = 0; k < 3; k++) {
        const value = -normals[v * 3 + k];
        normals[v * 3 + k] = Math.max(-32767, Math.min(32767, value));
      }
    }
    flippedComponents++;
  }
  if (process.env.DEBUG_ORIENTATION === "1") {
    console.log(`[orientation] ${groups.size} composantes, ${flippedComponents} retournées`);
  }
  return geometry;
}

/* Normales de sommets franchement opposées aux faces incidentes.
 *
 * Certaines sources (feuillets méningés, muscles intercostaux) exportent des
 * normales de sommets tournées vers l'intérieur sur une partie du maillage. On
 * ne recalcule QUE ces sommets-là, à partir de la moyenne des normales de
 * faces incidentes : le reste du shading d'origine est préservé. */
function repairVertexNormals(geometry) {
  const { positions, normals, indices } = geometry;
  if (!normals) return geometry;
  const vertexCount = positions.length / 3;
  const accum = new Float64Array(vertexCount * 3);
  for (let i = 0; i < indices.length; i += 3) {
    const a = indices[i] * 3, b = indices[i + 1] * 3, c = indices[i + 2] * 3;
    const ux = positions[b] - positions[a], uy = positions[b + 1] - positions[a + 1], uz = positions[b + 2] - positions[a + 2];
    const vx = positions[c] - positions[a], vy = positions[c + 1] - positions[a + 1], vz = positions[c + 2] - positions[a + 2];
    const nx = uy * vz - uz * vy, ny = uz * vx - ux * vz, nz = ux * vy - uy * vx;
    for (const v of [a, b, c]) { accum[v] += nx; accum[v + 1] += ny; accum[v + 2] += nz; }
  }
  let repaired = 0;
  for (let v = 0; v < vertexCount; v++) {
    const o = v * 3;
    const len = Math.hypot(accum[o], accum[o + 1], accum[o + 2]);
    if (len < 1e-20) continue;
    const ax = accum[o] / len, ay = accum[o + 1] / len, az = accum[o + 2] / len;
    const dot = normals[o] * ax + normals[o + 1] * ay + normals[o + 2] * az;
    if (dot >= 0) continue;
    normals[o] = Math.round(Math.max(-32767, Math.min(32767, ax * 32767)));
    normals[o + 1] = Math.round(Math.max(-32767, Math.min(32767, ay * 32767)));
    normals[o + 2] = Math.round(Math.max(-32767, Math.min(32767, az * 32767)));
    repaired++;
  }
  if (process.env.DEBUG_NORMALS === "1") console.log(`[normales] ${repaired} sommets recalculés`);
  return geometry;
}

/* Séparation des feuillets partageant un sommet de façon non-manifold.
 *
 * Deux faces qui traversent une arête commune en sens contraires appartiennent
 * au même feuillet : on les réunit. Les faces qui se touchent seulement le long
 * d'une arête (trois faces ou plus sur la même arête) appartiennent à des
 * feuillets distincts. On duplique alors les sommets par feuillet : la
 * géométrie, les normales et le rendu restent strictement identiques, mais le
 * maillage devient manifold. Les bords peuvent augmenter — c'est le prix
 * honnête d'une surface ouverte correctement séparée. */
function splitNonManifoldSheets(geometry) {
  const { positions, normals, indices } = geometry;
  const vertexCount = positions.length / 3;
  const triCount = indices.length / 3;
  if (!triCount) return geometry;

  const edges = new Map();
  for (let t = 0; t < triCount; t++) {
    for (let k = 0; k < 3; k++) {
      const a = indices[t * 3 + k], b = indices[t * 3 + (k + 1) % 3];
      const key = a < b ? a * vertexCount + b : b * vertexCount + a;
      let list = edges.get(key);
      if (!list) { list = []; edges.set(key, list); }
      list.push([t, a < b]);
    }
  }
  let nonManifold = false;
  for (const list of edges.values()) if (list.length > 2) { nonManifold = true; break; }
  if (!nonManifold) return geometry;

  const parent = new Int32Array(triCount);
  for (let i = 0; i < triCount; i++) parent[i] = i;
  const find = (x) => { while (parent[x] !== x) { parent[x] = parent[parent[x]]; x = parent[x]; } return x; };
  const union = (a, b) => { const ra = find(a), rb = find(b); if (ra !== rb) parent[rb] = ra; };
  for (const list of edges.values()) {
    if (list.length !== 2 || list[0][1] === list[1][1]) continue;
    union(list[0][0], list[1][0]);
  }

  const sheetOf = new Int32Array(triCount);
  for (let t = 0; t < triCount; t++) sheetOf[t] = find(t);

  /* Certaines faces restent dans le même feuillet bien qu'elles partagent
   * une arête avec plus de deux faces (le feuillet se referme sur lui-même).
   * On les sépare de force : la géométrie ne change pas, seul l'indexage des
   * sommets est dupliqué. */
  let nextSheet = 0;
  for (let t = 0; t < triCount; t++) nextSheet = Math.max(nextSheet, sheetOf[t] + 1);
  for (const list of edges.values()) {
    if (list.length <= 2) continue;
    const seen = new Map();
    for (const [t] of list) {
      const s = sheetOf[t];
      if (seen.has(s)) sheetOf[t] = nextSheet++;
      else seen.set(s, t);
    }
  }

  const remap = new Map();
  const outPos = [];
  const outNorm = normals ? [] : null;
  let next = 0;
  for (let t = 0; t < triCount; t++) {
    for (let k = 0; k < 3; k++) {
      const old = indices[t * 3 + k];
      /* Base = triCount+1 : sheetOf[t] ∈ [0, triCount[, donc pas de collission
       * entre (sommet, feuillet) distincts. */
      const key = old * (triCount + 1) + sheetOf[t];
      let nv = remap.get(key);
      if (nv === undefined) {
        nv = next++;
        remap.set(key, nv);
        outPos.push(positions[old * 3], positions[old * 3 + 1], positions[old * 3 + 2]);
        if (outNorm) outNorm.push(normals[old * 3], normals[old * 3 + 1], normals[old * 3 + 2]);
      }
      indices[t * 3 + k] = nv;
    }
  }
  if (process.env.DEBUG_SPLIT === "1") {
    console.log(`[split] ${triCount} faces, ${new Set(sheetOf).size} feuillets, ${vertexCount} -> ${next} sommets`);
  }
  return {
    positions: new Float32Array(outPos),
    normals: outNorm ? Int16Array.from(outNorm) : null,
    indices,
    vertexCount: next,
    indexCount: indices.length,
  };
}

/* Suppression des faces dupliquées (même triplet de sommets, ordre ignoré). */
function removeDuplicateFaces(geometry) {
  const { indices } = geometry;
  const seen = new Set();
  const kept = [];
  for (let i = 0; i < indices.length; i += 3) {
    const a = indices[i], b = indices[i + 1], c = indices[i + 2];
    const lo = Math.min(a, b, c), hi = Math.max(a, b, c);
    const mid = a + b + c - lo - hi;
    const key = (lo * geometry.positions.length / 3 + mid) * geometry.positions.length / 3 + hi;
    if (seen.has(key)) continue;
    seen.add(key);
    kept.push(a, b, c);
  }
  if (kept.length === indices.length) return geometry;
  return compact(Uint32Array.from(kept), geometry.positions, geometry.normals);
}

/* Corrections visuelles intégrées au pipeline : suppression de composantes
 * connexes négligeables (vague 2). Appliquée à la source AVANT la chaîne LOD,
 * pour que medium/low dérivent du maillage corrigé. */
const COMPONENT_FIXES = (() => {
  const file = path.resolve(import.meta.dirname, "../docs/analyses/revue-visuelle/fixes-composantes.json");
  if (!fs.existsSync(file)) return new Map();
  return new Map(JSON.parse(fs.readFileSync(file, "utf8")).fixes.map((f) => [f.id, f.minAreaCm2]));
})();

function dropTinyComponents(geometry, minAreaCm2) {
  if (!Number.isFinite(minAreaCm2)) return geometry;
  const { positions, normals, indices } = geometry;
  const vertexCount = positions.length / 3, triCount = indices.length / 3;
  if (!triCount) return geometry;
  const parent = new Int32Array(vertexCount);
  for (let i = 0; i < vertexCount; i++) parent[i] = i;
  const find = (x) => { while (parent[x] !== x) { parent[x] = parent[parent[x]]; x = parent[x]; } return x; };
  const union = (a, b) => { const ra = find(a), rb = find(b); if (ra !== rb) parent[rb] = ra; };
  for (let t = 0; t < triCount; t++) {
    union(indices[t * 3], indices[t * 3 + 1]);
    union(indices[t * 3 + 1], indices[t * 3 + 2]);
  }
  const area = new Map();
  for (let t = 0; t < triCount; t++) {
    const r = find(indices[t * 3]);
    const a = indices[t * 3] * 3, b = indices[t * 3 + 1] * 3, c = indices[t * 3 + 2] * 3;
    const ux = positions[b] - positions[a], uy = positions[b + 1] - positions[a + 1], uz = positions[b + 2] - positions[a + 2];
    const vx = positions[c] - positions[a], vy = positions[c + 1] - positions[a + 1], vz = positions[c + 2] - positions[a + 2];
    area.set(r, (area.get(r) || 0) + 0.5 * Math.hypot(uy * vz - uz * vy, uz * vx - ux * vz, ux * vy - uy * vx));
  }
  const keep = new Set([...area.entries()].filter(([, a]) => a * 1e4 >= minAreaCm2).map(([r]) => r));
  if (keep.size === area.size) return geometry;
  const kept = [];
  for (let t = 0; t < triCount; t++) if (keep.has(find(indices[t * 3]))) kept.push(indices[t * 3], indices[t * 3 + 1], indices[t * 3 + 2]);
  return compact(Uint32Array.from(kept), geometry.positions, geometry.normals);
}

function makeLod(geometry, targetTriangles) {
  const triangles = geometry.indexCount / 3;
  if (targetTriangles == null || triangles <= targetTriangles) return geometry;
  const target = Math.max(3, Math.floor(targetTriangles) * 3);
  try {
    const [simplified] = MeshoptSimplifier.simplify(
      geometry.indices, geometry.positions, 3, target, 0.02, ["LockBorder"],
    );
    if (!simplified || simplified.length < 3) return geometry;
    return compact(simplified, geometry.positions, geometry.normals);
  } catch {
    return geometry;
  }
}

/* ---------- accumulateurs de chunks ---------- */
const chunks = {};
for (const cat of CATEGORIES) {
  chunks[cat] = {};
  for (const lod of Object.keys(LOD)) chunks[cat][lod] = { parts: [], length: 0 };
}

function pad4(acc) {
  while (acc.length % 4) { acc.parts.push(Buffer.from([0])); acc.length++; }
}
function push(acc, buffer) { acc.parts.push(buffer); acc.length += buffer.length; }

function writeGeometry(acc, input) {
  const geometry = removeDegenerate(input);
  pad4(acc);
  const positions = acc.length;
  push(acc, Buffer.from(geometry.positions.buffer, geometry.positions.byteOffset, geometry.positions.byteLength));
  pad4(acc);
  const normals = acc.length;
  push(acc, Buffer.from(geometry.normals.buffer, geometry.normals.byteOffset, geometry.normals.byteLength));
  pad4(acc);
  const indicesOffset = acc.length;
  const useU16 = geometry.vertexCount <= 65535;
  const indices = useU16 ? Uint16Array.from(geometry.indices) : geometry.indices;
  push(acc, Buffer.from(indices.buffer, indices.byteOffset, indices.byteLength));
  return {
    positions, normals, indices: indicesOffset,
    vertexCount: geometry.vertexCount,
    indexCount: indices.length,
    indexType: useU16 ? "u16" : "u32",
    bounds: computeBounds(geometry.positions),
  };
}

await MeshoptSimplifier.ready;

const manifest = {
  version: "2.0",
  generated: new Date().toISOString().slice(0, 10),
  format: "positions F32, normales I16 normalisées, indices U16/U32",
  sources: [
    { name: "BodyParts3D 4.0", license: "CC BY 4.0", url: "https://dbarchive.biosciencedbc.jp/en/bodyparts3d/download.html" },
    { name: "Z-Anatomy", license: "CC BY-SA 4.0", url: "https://github.com/Z-Anatomy/Models-of-human-anatomy" },
  ],
  license: "CC BY-SA 4.0 (jeu de données combiné)",
  excludedAggregates,
  lod: LOD,
  structures: [],
};

let missing = 0;
for (const s of structures) {
  const geometry = s.object ? readZObject(s.object) : readBPParts(s.bodyParts3D?.partNames || []);
  if (!geometry) { missing++; continue; }
  const entry = {
    id: s.id,
    fr: s.french,
    en: s.english,
    la: s.latin,
    ta2: s.ta2Id,
    category: s.category,
    subsystem: s.subsystem || "",
    side: SIDE_OVERRIDES[s.id] || s.side || null,
    source: SOURCE_OVERRIDES.get(s.id) || s.best.source,
    materials: s.materials || [],
    path: (s.collections || []).filter((c) => !/Bonus|Joints|Muscular insertions|Regions/i.test(c)),
    bounds: geometry.bounds,
    lod: {},
  };
  /* Chaîne de LOD du plus fin au plus grossier : `high` depuis la source,
   * puis `medium` depuis `high`, puis `low` depuis `medium`. Simplifier chaque
   * niveau depuis la source indépendamment laissait des LOD non monotones
   * (`low` > `medium`) quand la simplification s'arrêtait avant la cible :
   * dériver chaque niveau du précédent garantit `low ≤ medium ≤ high`. */
  const cleaned = removeDegenerate(geometry);
  const minArea = COMPONENT_FIXES.get(s.id);
  const componentFixed = minArea ? dropTinyComponents(cleaned, minArea) : cleaned;
  const oriented = repairOrientation(componentFixed);
  const deduped = removeDuplicateFaces(oriented);
  const normalsFixed = splitNonManifoldSheets(repairVertexNormals(deduped));
  /* La simplification peut réintroduire des faces dupliquées : on déduplique
   * chaque niveau après simplification, pas seulement la source. */
  /* La simplification peut réintroduire de petites composantes : le filtre est
   * appliqué à chaque niveau, comme la déduplication. */
  const highGeometry = dropTinyComponents(removeDuplicateFaces(makeLod(normalsFixed, LOD.high.target)), minArea ?? Infinity);
  const mediumGeometry = dropTinyComponents(removeDuplicateFaces(makeLod(highGeometry, LOD.medium.target)), minArea ?? Infinity);
  const lowGeometry = dropTinyComponents(removeDuplicateFaces(makeLod(mediumGeometry, LOD.low.target)), minArea ?? Infinity);
  entry.lod.low = writeGeometry(chunks[s.category].low, lowGeometry);
  entry.lod.medium = writeGeometry(chunks[s.category].medium, mediumGeometry);
  entry.lod.high = writeGeometry(chunks[s.category].high, highGeometry);
  manifest.structures.push(entry);
}

/* La peau, commune à toutes les vues. */
manifest.skin = { lod: {} };
const skin = readCurrentSkin();
const skinHigh = makeLod(skin, LOD.high.target);
const skinMedium = makeLod(skinHigh, LOD.medium.target);
const skinLow = makeLod(skinMedium, LOD.low.target);
manifest.skin.lod.low = writeGeometry(chunks.skin.low, skinLow);
manifest.skin.lod.medium = writeGeometry(chunks.skin.medium, skinMedium);
manifest.skin.lod.high = writeGeometry(chunks.skin.high, skinHigh);

fs.mkdirSync(OUT, { recursive: true });
let totalRaw = 0, totalGzip = 0;
for (const cat of CATEGORIES) {
  for (const [lodName, acc] of Object.entries(chunks[cat])) {
    const buffer = Buffer.concat(acc.parts);
    const gz = zlib.gzipSync(buffer, { level: 6 });
    const name = `${cat}.${lodName}.bin`;
    /* On ne versionne que le .gz (le navigateur le décompresse avec
     * DecompressionStream). KEEP_RAW=1 permet de garder le binaire brut. */
    if (process.env.KEEP_RAW === "1") fs.writeFileSync(path.join(OUT, name), buffer);
    fs.writeFileSync(path.join(OUT, name + ".gz"), gz);
    totalRaw += buffer.length; totalGzip += gz.length;
    console.log(`${name.padEnd(22)} ${(buffer.length / 1048576).toFixed(1)} Mo -> ${(gz.length / 1048576).toFixed(1)} Mo gz`);
  }
}
fs.writeFileSync(path.join(OUT, "manifest.json"), JSON.stringify(manifest));
fs.copyFileSync(path.join(CURRENT_MODELS, "README.md"), path.join(OUT, "README.md"));

console.log(`\nStructures: ${manifest.structures.length} (manquantes: ${missing})`);
console.log(`Total brut: ${(totalRaw / 1048576).toFixed(1)} Mo, gzip: ${(totalGzip / 1048576).toFixed(1)} Mo`);
