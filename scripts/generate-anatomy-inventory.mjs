import fs from "node:fs";
import path from "node:path";

const ZANATOMY = process.env.ZANATOMY_OBJECTS || "/tmp/opencode/zanatomy/objects-full.json";
const TA2 = process.env.TA2_CSV || "/tmp/opencode/zanatomy/TA2.csv";
const ATLAS = process.env.ANATOMY_SOURCE ? path.join(process.env.ANATOMY_SOURCE, "atlas.json") : "/tmp/opencode/human-atlas/public/models/atlas.json";
const OUT = process.env.INVENTORY_OUT || path.resolve(import.meta.dirname, "../docs/inventaire-anatomique");

const objects = JSON.parse(fs.readFileSync(ZANATOMY, "utf8"));
const atlas = JSON.parse(fs.readFileSync(ATLAS, "utf8"));

/* ---------- terminologie TA2 ---------- */
const ta2 = [];
for (const line of fs.readFileSync(TA2, "utf8").replace(/^\uFEFF/, "").split(/\r?\n/)) {
  if (!line.trim()) continue;
  const fields = line.replace(/^"|"$/g, "").split(";");
  if (fields.length >= 4) {
    ta2.push({ id: fields[0], en: fields[1].trim(), la: fields[2].trim(), fr: fields[3].trim() });
  }
}
const norm = (s) =>
  String(s)
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, " ")
    .trim()
    .replace(/^zone of /, "");

const ta2ByEn = new Map();
const ta2ByLa = new Map();
for (const t of ta2) {
  const en = norm(t.en);
  const la = norm(t.la);
  if (en && !ta2ByEn.has(en)) ta2ByEn.set(en, t);
  if (la && !ta2ByLa.has(la)) ta2ByLa.set(la, t);
}
function matchTa2(canonical) {
  const n = norm(canonical);
  if (ta2ByEn.has(n)) return ta2ByEn.get(n);
  if (ta2ByLa.has(n)) return ta2ByLa.get(n);
  const stripped = n.replace(/\b(muscle|bone|gland|artery|vein|nerve|cartilage)\b/g, "").replace(/\s+/g, " ").trim();
  if (stripped && stripped !== n) {
    if (ta2ByEn.has(stripped)) return ta2ByEn.get(stripped);
    if (ta2ByLa.has(stripped)) return ta2ByLa.get(stripped);
  }
  const key = stripped || n;
  for (const [k, v] of ta2ByEn) {
    if (k.length > 9 && Math.abs(k.length - key.length) <= 4 && (k.startsWith(key) || key.startsWith(k))) return v;
  }
  return null;
}

/* ---------- BodyParts3D ---------- */
const partById = new Map(atlas.parts.map((p) => [p.id, p]));
const conceptByName = new Map();
for (const c of atlas.concepts) {
  const k = norm(c.name);
  if (k && !conceptByName.has(k)) conceptByName.set(k, c);
}
function conceptTriangles(concept) {
  let tris = 0;
  let parts = 0;
  for (const id of concept.elements) {
    const p = partById.get(id);
    if (p) {
      tris += p.indexCount / 3;
      parts++;
    }
  }
  return { tris: Math.round(tris), parts };
}
function matchConcept(canonical, side) {
  const n = norm(canonical);
  let c = conceptByName.get(n);
  if (!c) {
    const stripped = n.replace(/\b(muscle|bone|gland|artery|vein|nerve|cartilage)\b/g, "").replace(/\s+/g, " ").trim();
    c = conceptByName.get(stripped) || null;
  }
  if (!c) {
    const key = n.replace(/\b(muscle|bone|gland|artery|vein|nerve|cartilage)\b/g, "").trim();
    for (const [k, v] of conceptByName) {
      if (k.length > 9 && Math.abs(k.length - key.length) <= 4 && (k.startsWith(key) || key.startsWith(k))) {
        c = v;
        break;
      }
    }
  }
  if (!c) return null;
  let parts = c.elements.map((id) => partById.get(id)).filter(Boolean);
  if (side) {
    const sideWord = side === "left" ? "left" : "right";
    const sideParts = parts.filter((p) => new RegExp("\\b" + sideWord + "\\b", "i").test(p.name));
    if (sideParts.length) parts = sideParts;
  }
  const tris = Math.round(parts.reduce((sum, p) => sum + p.indexCount / 3, 0));
  if (tris < 30) return null;
  return {
    concept: c.name,
    conceptId: c.id,
    parts: parts.length,
    triangles: tris,
    partNames: parts.map((p) => p.name),
  };
}

/* ---------- classification ---------- */
const organCols = new Set([
  "5: Cardiovascular system",
  "6: Lymphoid organs",
  "7: Nervous system & Sense organs",
  "8: Visceral systems",
]);
const marker = /\.(j|i|g|ol|or|el|er|o\d+l|o\d+r|e\d+l|e\d+r)$/i;

function classify(o) {
  const cols = o.cols || [];
  const inBonus = cols.some((c) => /Bonus collection/i.test(c));
  if (cols.includes("4: Muscular system") && !cols.includes("2: Muscular insertions") && !inBonus) return "muscle";
  if (cols.includes("1: Skeletal system")) return "bone";
  if (cols.some((c) => organCols.has(c)) && !inBonus) return "organ";
  return null;
}
function parseName(raw) {
  let name = String(raw).trim();
  let side = null;
  const sm = name.match(/\.([lr])$/i);
  if (sm) {
    side = sm[1].toLowerCase() === "l" ? "left" : "right";
    name = name.replace(/\.[lr]$/i, "");
  }
  let canonical = name.replace(/^\((.*)\)$/, "$1").replace(/\*+$/, "").trim();
  return { name, side, canonical };
}

const categories = { bone: [], muscle: [], organ: [] };
let ta2Hits = 0;
let bpHits = 0;

for (const o of objects) {
  const category = classify(o);
  if (!category) continue;
  if (!(o.tris > 0 && o.verts >= 8 && !marker.test(o.name.trim()))) continue;
  const parsed = parseName(o.name);
  let subsystem = "";
  if (category === "organ") {
    const found = [...organCols].find((c) => o.cols.includes(c));
    subsystem = {
      "5: Cardiovascular system": "Cardiovasculaire",
      "6: Lymphoid organs": "Lymphoïde",
      "7: Nervous system & Sense organs": "Nerveux et sens",
      "8: Visceral systems": "Viscéral",
    }[found] || "";
  }
  const ta = matchTa2(parsed.canonical);
  const bp = matchConcept(parsed.canonical, parsed.side);
  if (ta) ta2Hits++;
  if (bp) bpHits++;

  const zTris = o.tris;
  const bpTris = bp?.triangles || 0;
  const best =
    bp && bpTris > zTris
      ? {
          source: "BodyParts3D 4.0",
          model: bp.concept,
          modelId: bp.conceptId,
          triangles: bpTris,
          parts: bp.parts,
          license: "CC BY 4.0",
          url: "https://dbarchive.biosciencedbc.jp/en/bodyparts3d/download.html",
        }
      : {
          source: "Z-Anatomy",
          object: o.name,
          triangles: zTris,
          vertices: o.verts,
          license: "CC BY-SA 4.0",
          url: "https://github.com/Z-Anatomy/Models-of-human-anatomy",
        };

  const alternatives = [];
  if (bp && best.source !== "BodyParts3D 4.0") {
    alternatives.push({
      source: "BodyParts3D 4.0",
      model: bp.concept,
      modelId: bp.conceptId,
      triangles: bpTris,
      parts: bp.parts,
      license: "CC BY 4.0",
    });
  }
  if (best.source !== "Z-Anatomy") {
    alternatives.push({
      source: "Z-Anatomy",
      object: o.name,
      triangles: zTris,
      vertices: o.verts,
      license: "CC BY-SA 4.0",
    });
  }

  categories[category].push({
    id: `${category}:${norm(parsed.canonical).replace(/ /g, "-")}${parsed.side ? "-" + parsed.side[0] : ""}`,
    category,
    canonical: parsed.canonical,
    subsystem,
    object: o.name,
    side: parsed.side,
    english: ta?.en || parsed.canonical,
    latin: ta?.la || "",
    french: ta?.fr || "",
    ta2Id: ta?.id || "",
    collections: o.cols,
    dimensions: o.dims,
    materials: o.mats,
    zAnatomy: { object: o.name, triangles: zTris, vertices: o.verts },
    bodyParts3D: bp,
    best,
    alternatives,
  });
}

/* ---------- structures présentes uniquement dans BodyParts3D ---------- */
const usedConcepts = new Set();
for (const list of Object.values(categories)) {
  for (const entry of list) if (entry.bodyParts3D?.conceptId) usedConcepts.add(entry.bodyParts3D.conceptId);
}
const conceptSystemCategory = {
  skeletal: "bone",
  muscular: "muscle",
  cardiac: "organ",
  endocrine: "organ",
  digestive: "organ",
  respiratory: "organ",
  urinary: "organ",
  reproductive: "organ",
  lymphatic: "organ",
  nervous: "organ",
  sensory: "organ",
  arterial: "organ",
  venous: "organ",
  integumentary: "organ",
};
const genericConcept = /^(vascular tree|segment of|variant|anastomosis|vascular anastomosis|zone of)$/i;

for (const concept of atlas.concepts) {
  if (usedConcepts.has(concept.id)) continue;
  if (genericConcept.test(concept.name)) continue;
  const parts = concept.elements.map((id) => partById.get(id)).filter(Boolean);
  if (!parts.length) continue;
  const countsBySystem = {};
  for (const part of parts) countsBySystem[part.system] = (countsBySystem[part.system] || 0) + 1;
  const system = Object.entries(countsBySystem).sort((a, b) => b[1] - a[1])[0][0];
  const category = conceptSystemCategory[system];
  if (!category) continue;

  const bySide = { none: [], left: [], right: [] };
  for (const part of parts) {
    if (/\bleft\b/i.test(part.name)) bySide.left.push(part);
    else if (/\bright\b/i.test(part.name)) bySide.right.push(part);
    else bySide.none.push(part);
  }
  for (const [sideKey, sideParts] of Object.entries(bySide)) {
    if (!sideParts.length) continue;
    const tris = Math.round(sideParts.reduce((sum, part) => sum + part.indexCount / 3, 0));
    if (tris < 100) continue;
    const side = sideKey === "none" ? null : sideKey;
    const canonical = concept.name.replace(/^zone of /, "").trim();
    const ta = matchTa2(canonical);
    /* On n'ajoute que les concepts canoniques identifiés dans TA2 : les termes
       génériques de BodyParts3D (« abdomen proper », « segment of… ») ne sont
       pas des structures anatomiques au sens de l'inventaire. */
    if (!ta) continue;
    categories[category].push({
      id: `${category}:bp-${norm(canonical).replace(/ /g, "-")}${side ? "-" + side[0] : ""}`,
      category,
      canonical,
      subsystem: category === "organ" ? system : "",
      object: "",
      side,
      english: ta?.en || canonical,
      latin: ta?.la || "",
      french: ta?.fr || canonical,
      ta2Id: ta?.id || "",
      collections: [`BodyParts3D:${system}`],
      dimensions: null,
      materials: [],
      zAnatomy: null,
      bodyParts3D: {
        concept: concept.name,
        conceptId: concept.id,
        parts: sideParts.length,
        triangles: tris,
        partNames: sideParts.map((part) => part.name),
      },
      best: {
        source: "BodyParts3D 4.0",
        model: concept.name,
        modelId: concept.id,
        triangles: tris,
        parts: sideParts.length,
        license: "CC BY 4.0",
        url: "https://dbarchive.biosciencedbc.jp/en/bodyparts3d/download.html",
      },
      alternatives: [],
      onlyInBodyParts3D: true,
    });
  }
}

/* ---------- tri de chaque catégorie ---------- */
for (const list of Object.values(categories)) {
  list.sort((a, b) => a.canonical.localeCompare(b.canonical) || (a.side || "").localeCompare(b.side || ""));
}

const counts = {};
for (const [k, list] of Object.entries(categories)) {
  const canonical = new Set(list.map((e) => norm(e.canonical)));
  counts[k] = {
    objects: list.length,
    canonicalStructures: canonical.size,
    bestModelTriangles: list.reduce((a, e) => a + e.best.triangles, 0),
    withTA2: list.filter((e) => e.ta2Id).length,
    withBodyParts3D: list.filter((e) => e.bodyParts3D).length,
    onlyInBodyParts3D: list.filter((e) => e.onlyInBodyParts3D).length,
    bestFromZAnatomy: list.filter((e) => e.best.source === "Z-Anatomy").length,
    bestFromBodyParts3D: list.filter((e) => e.best.source === "BodyParts3D 4.0").length,
  };
}

const doc = {
  meta: {
    title: "Inventaire anatomique 3D complet — CORPS",
    generated: new Date().toISOString().slice(0, 10),
    objective: "100 % des organes, os et muscles, avec le meilleur modèle 3D disponible pour chacun.",
    sources: [
      {
        name: "Z-Anatomy",
        url: "https://github.com/Z-Anatomy/Models-of-human-anatomy",
        license: "CC BY-SA 4.0",
        role: "Maillages anatomiques principaux (dérivés de BodyParts3D), 2 910 maillages.",
      },
      {
        name: "BodyParts3D 4.0",
        url: "https://dbarchive.biosciencedbc.jp/en/bodyparts3d/download.html",
        license: "CC BY 4.0",
        role: "Source alternative / comparaison de densité de maillage.",
      },
      {
        name: "Terminologia Anatomica 2 (TA2)",
        url: "https://www.ifaa.net/anatomy/terminologia-anatomica/",
        role: "Noms normalisés anglais, latin et français (TA2.csv du dépôt Z-Anatomy).",
      },
    ],
    methodology: [
      "Seuls les objets MESH réels sont retenus (tris > 0, >= 8 sommets) ; les marqueurs .j/.i/.g et les points d'insertion/origine (.ol/.or/.el/.er) sont exclus.",
      "Les collections 'Bonus collection' sont prises en compte pour les os lorsqu'elles portent le seul maillage d'une structure (ex. os du carpe) ; elles n'apportent aucun muscle ni organe supplémentaire.",
      "Chaque objet est classé en os, muscle ou organe selon sa collection principale dans Z-Anatomy.",
      "Les concepts BodyParts3D non représentés dans Z-Anatomy sont ajoutés à l'inventaire lorsqu'ils correspondent à un nom TA2 canonique (union des deux sources).",
      "Les noms TA2 sont appariés au nom Z-Anatomy (anglais puis latin, avec variantes sans 'muscle'/'bone'/'gland').",
      "Les concepts BodyParts3D sont appariés par nom normalisé ; le meilleur modèle est celui qui offre le plus de triangles (Z-Anatomy en cas d'égalité).",
    ],
    counts,
    matching: { ta2Hits, bpHits, total: Object.values(categories).reduce((a, l) => a + l.length, 0) },
  },
  categories,
};

fs.mkdirSync(OUT, { recursive: true });
fs.writeFileSync(path.join(OUT, "structures.json"), JSON.stringify(doc, null, 2));
console.log(JSON.stringify(counts, null, 2));
console.log("MATCHING", JSON.stringify(doc.meta.matching));
