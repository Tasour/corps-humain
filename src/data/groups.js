/* Groupes anatomiques et mouvements principaux pour l'atlas v2.
 * Les pivots sont des coordonnées monde (mètres, repère Y-up du modèle).
 * Les IDs doivent exister dans public/models/v2/manifest.json : le test
 * `tests/groupes.test.mjs` le vérifie et échoue si un membre a disparu.
 *
 * Convention d'axes : X = gauche/droite, Y = haut, Z = avant.
 * - flexion du coude, du genou, de la cheville, du tronc, du cou, de la
 *   mâchoire : rotation autour de X (plan sagittal) ;
 * - abduction/adduction de l'épaule et élévation de la ceinture scapulaire :
 *   rotation autour de Z (plan frontal), signe opposé à gauche et à droite.
 */

export const QUICK_ACCESS = [
  { label: "Bras gauche", ids: ["bone:clavicle-l", "bone:scapula-l", "bone:humerus-l", "bone:radius-l", "bone:ulna-l", "muscle:long-head-of-biceps-brachii-l", "muscle:short-head-of-biceps-brachii-l"] },
  { label: "Bras droit", ids: ["bone:clavicle-r", "bone:scapula-r", "bone:humerus-r", "bone:radius-r", "bone:ulna-r", "muscle:long-head-of-biceps-brachii-r", "muscle:short-head-of-biceps-brachii-r"] },
  { label: "Poumons", ids: ["organ:superior-lobe-of-left-lung", "organ:inferior-lobe-of-left-lung", "organ:superior-lobe-of-right-lung", "organ:middle-lobe-of-right-lung", "organ:inferior-lobe-of-right-lung"] },
  { label: "Œil droit", ids: ["organ:bp-fibrous-layer-of-eyeball-r", "organ:anterior-segment-of-eyeball-r", "organ:posterior-segment-of-eyeball-r", "muscle:lateral-rectus-muscle-r", "muscle:medial-rectus-muscle-r"] },
  { label: "Cœur", ids: ["organ:bp-heart"], select: "organ:bp-heart" },
  { label: "Jambe gauche", ids: ["bone:hip-bone-l", "bone:femur-l", "bone:patella-l", "bone:tibia-l", "bone:fibula-l"] },
  /* Les reins sont exclus du socle Z-Anatomy (composant rein CC BY-NC 4.0).
   * Ce raccourci est retiré pour ne pas référencer une structure absente. */
  { label: "Encéphale", ids: ["organ:bp-brain", "organ:bp-brainstem", "organ:bp-cerebellum"] },
];

/* ---------- os et muscles réutilisés par les groupes ---------------------- */
const BICEPS = ["muscle:long-head-of-biceps-brachii-l", "muscle:short-head-of-biceps-brachii-l",
  "muscle:long-head-of-biceps-brachii-r", "muscle:short-head-of-biceps-brachii-r"];
const TRICEPS = ["muscle:long-head-of-triceps-brachii-l", "muscle:lateral-head-of-triceps-brachii-l",
  "muscle:medial-head-of-triceps-brachii-l", "muscle:long-head-of-triceps-brachii-r",
  "muscle:lateral-head-of-triceps-brachii-r", "muscle:medial-head-of-triceps-brachii-r"];
const DELTOID = ["muscle:clavicular-part-of-deltoid-muscle-l", "muscle:acromial-part-of-deltoid-muscle-l",
  "muscle:scapular-spinal-part-of-deltoid-muscle-l", "muscle:clavicular-part-of-deltoid-muscle-r",
  "muscle:acromial-part-of-deltoid-muscle-r", "muscle:scapular-spinal-part-of-deltoid-muscle-r"];
const PECTORAL = ["muscle:clavicular-head-of-pectoralis-major-muscle-l",
  "muscle:sternocostal-head-of-pectoralis-major-muscle-l",
  "muscle:abdominal-part-of-pectoralis-major-muscle-l",
  "muscle:clavicular-head-of-pectoralis-major-muscle-r",
  "muscle:sternocostal-head-of-pectoralis-major-muscle-r",
  "muscle:abdominal-part-of-pectoralis-major-muscle-r"];
const LATISSIMUS = ["muscle:latissimus-dorsi-muscle-l", "muscle:latissimus-dorsi-muscle-r"];
const QUADRICEPS = ["muscle:rectus-femoris-muscle-l", "muscle:vastus-lateralis-muscle-l",
  "muscle:vastus-medialis-muscle-l", "muscle:vastus-intermedius-muscle-l",
  "muscle:rectus-femoris-muscle-r", "muscle:vastus-lateralis-muscle-r",
  "muscle:vastus-medialis-muscle-r", "muscle:vastus-intermedius-muscle-r"];
const HAMSTRINGS = ["muscle:long-head-of-biceps-femoris-l", "muscle:short-head-of-biceps-femoris-l",
  "muscle:semitendinosus-muscle-l", "muscle:semimembranosus-muscle-l",
  "muscle:long-head-of-biceps-femoris-r", "muscle:short-head-of-biceps-femoris-r",
  "muscle:semitendinosus-muscle-r", "muscle:semimembranosus-muscle-r"];
const CALF = ["muscle:lateral-head-of-gastrocnemius-l", "muscle:medial-head-of-gastrocnemius-l",
  "muscle:soleus-muscle-l", "muscle:lateral-head-of-gastrocnemius-r",
  "muscle:medial-head-of-gastrocnemius-r", "muscle:soleus-muscle-r"];
const GLUTES = ["muscle:gluteus-maximus-muscle-l", "muscle:gluteus-medius-muscle-l",
  "muscle:gluteus-maximus-muscle-r", "muscle:gluteus-medius-muscle-r"];
const ABDOMINALS = ["muscle:rectus-abdominis-muscle-l", "muscle:external-abdominal-oblique-muscle-l",
  "muscle:internal-abdominal-oblique-muscle-l", "muscle:transversus-abdominis-muscle-l",
  "muscle:rectus-abdominis-muscle-r", "muscle:external-abdominal-oblique-muscle-r",
  "muscle:internal-abdominal-oblique-muscle-r", "muscle:transversus-abdominis-muscle-r"];
const TRAPEZIUS = ["muscle:descending-part-of-trapezius-muscle-l", "muscle:transverse-part-of-trapezius-muscle-l",
  "muscle:ascending-part-of-trapezius-muscle-l", "muscle:levator-scapulae-l",
  "muscle:descending-part-of-trapezius-muscle-r", "muscle:transverse-part-of-trapezius-muscle-r",
  "muscle:ascending-part-of-trapezius-muscle-r", "muscle:levator-scapulae-r"];
const MASTICATION = ["bone:mandible", "muscle:superficial-part-of-masseter-l",
  "muscle:deep-part-of-masseter-l", "muscle:temporalis-muscle-l",
  "muscle:superficial-part-of-masseter-r", "muscle:deep-part-of-masseter-r",
  "muscle:temporalis-muscle-r"];
/* Les agrégats BP3D (bp-lumbar-vertebra, bp-thoracic-vertebra, etc.) ont été
 * exclus en vague 1 : ils contenaient toute une colonne sous un identifiant
 * singulier. Les groupes utilisent désormais des vertèbres individuelles. */
const SPINE = ["bone:vertebra-t8", "bone:vertebra-l3",
  "muscle:multifidus-lumborum-muscle-l", "muscle:multifidus-thoracis-muscle-l",
  "muscle:multifidus-lumborum-muscle-r", "muscle:multifidus-thoracis-muscle-r"];
const NECK = ["bone:vertebra-c3", "bone:vertebra-c4",
  "muscle:sternocleidomastoid-muscle-l", "muscle:sternocleidomastoid-muscle-r",
  "muscle:multifidus-colli-muscle-l", "muscle:multifidus-colli-muscle-r"];
const SHOULDER_GIRDLE_L = ["bone:clavicle-l", "bone:scapula-l", "muscle:levator-scapulae-l",
  "muscle:descending-part-of-trapezius-muscle-l"];
const SHOULDER_GIRDLE_R = ["bone:clavicle-r", "bone:scapula-r", "muscle:levator-scapulae-r",
  "muscle:descending-part-of-trapezius-muscle-r"];

export const GROUPS = [
  /* ---------- membres (groupes d'origine) ---------- */
  {
    id: "arm-l", label: "Membre supérieur gauche",
    members: QUICK_ACCESS[0].ids,
    pivot: [-0.18, 1.39, 0], axis: [0, 0, 1], angle: 0.9,
    movement: "Abduction de l'épaule",
  },
  {
    id: "arm-r", label: "Membre supérieur droit",
    members: QUICK_ACCESS[1].ids,
    pivot: [0.18, 1.39, 0], axis: [0, 0, 1], angle: -0.9,
    movement: "Abduction de l'épaule",
  },
  {
    id: "forearm-l", label: "Avant-bras gauche",
    members: ["bone:radius-l", "bone:ulna-l"],
    pivot: [-0.24, 1.18, 0], axis: [0, 1, 0], angle: 1.2,
    movement: "Pronation / supination",
  },
  {
    id: "forearm-r", label: "Avant-bras droit",
    members: ["bone:radius-r", "bone:ulna-r"],
    pivot: [0.24, 1.18, 0], axis: [0, 1, 0], angle: -1.2,
    movement: "Pronation / supination",
  },
  {
    id: "leg-l", label: "Membre inférieur gauche",
    members: QUICK_ACCESS[5].ids,
    pivot: [-0.09, 0.90, 0], axis: [0, 0, 1], angle: 0.6,
    movement: "Flexion de la hanche",
  },
  {
    id: "leg-r", label: "Membre inférieur droit",
    members: ["bone:hip-bone-r", "bone:femur-r", "bone:patella-r", "bone:tibia-r", "bone:fibula-r"],
    pivot: [0.09, 0.90, 0], axis: [0, 0, 1], angle: -0.6,
    movement: "Flexion de la hanche",
  },
  {
    id: "lungs", label: "Poumons et lobes",
    members: QUICK_ACCESS[2].ids,
    pivot: [0, 1.30, 0], axis: [1, 0, 0], angle: 0.25,
    movement: "Inspiration (expansion)",
  },
  {
    id: "eye-r", label: "Œil droit et muscles",
    members: QUICK_ACCESS[3].ids,
    pivot: [0.035, 1.66, 0.06], axis: [0, 1, 0], angle: 0.7,
    movement: "Rotation latérale du globe oculaire",
  },
  {
    id: "eye-l", label: "Œil gauche et muscles",
    members: ["organ:bp-fibrous-layer-of-eyeball-l", "organ:anterior-segment-of-eyeball-l",
      "organ:posterior-segment-of-eyeball-l", "muscle:lateral-rectus-muscle-l",
      "muscle:medial-rectus-muscle-l"],
    pivot: [-0.035, 1.66, 0.06], axis: [0, 1, 0], angle: -0.7,
    movement: "Rotation latérale du globe oculaire",
  },
  {
    id: "heart", label: "Cœur et cavités",
    members: ["organ:bp-heart", "organ:left-atrium", "organ:right-atrium", "organ:left-ventricle", "organ:right-ventricle"],
    pivot: [0.02, 1.30, 0.03], axis: [0, 0, 1], angle: 0.35,
    movement: "Torsion cardiaque",
  },

  /* ---------- articulations ---------- */
  {
    id: "elbow-l", label: "Coude gauche",
    members: ["bone:humerus-l", "bone:radius-l", "bone:ulna-l", ...BICEPS.filter((id) => id.endsWith("-l")),
      "muscle:brachialis-muscle-l", ...TRICEPS.filter((id) => id.endsWith("-l")), "muscle:anconeus-muscle-l"],
    pivot: [-0.21, 1.09, 0], axis: [1, 0, 0], angle: 1.15,
    movement: "Flexion du coude",
  },
  {
    id: "elbow-r", label: "Coude droit",
    members: ["bone:humerus-r", "bone:radius-r", "bone:ulna-r", ...BICEPS.filter((id) => id.endsWith("-r")),
      "muscle:brachialis-muscle-r", ...TRICEPS.filter((id) => id.endsWith("-r")), "muscle:anconeus-muscle-r"],
    pivot: [0.21, 1.09, 0], axis: [1, 0, 0], angle: 1.15,
    movement: "Flexion du coude",
  },
  {
    id: "wrist-l", label: "Poignet gauche",
    members: ["bone:radius-l", "bone:ulna-l"],
    pivot: [-0.25, 0.86, 0], axis: [1, 0, 0], angle: 0.8,
    movement: "Flexion du poignet",
  },
  {
    id: "wrist-r", label: "Poignet droit",
    members: ["bone:radius-r", "bone:ulna-r"],
    pivot: [0.25, 0.86, 0], axis: [1, 0, 0], angle: 0.8,
    movement: "Flexion du poignet",
  },
  {
    id: "knee-l", label: "Genou gauche",
    members: ["bone:femur-l", "bone:tibia-l", "bone:fibula-l", "bone:patella-l",
      ...QUADRICEPS.filter((id) => id.endsWith("-l")), ...HAMSTRINGS.filter((id) => id.endsWith("-l"))],
    pivot: [-0.09, 0.43, 0], axis: [1, 0, 0], angle: 1.2,
    movement: "Flexion du genou",
  },
  {
    id: "knee-r", label: "Genou droit",
    members: ["bone:femur-r", "bone:tibia-r", "bone:fibula-r", "bone:patella-r",
      ...QUADRICEPS.filter((id) => id.endsWith("-r")), ...HAMSTRINGS.filter((id) => id.endsWith("-r"))],
    pivot: [0.09, 0.43, 0], axis: [1, 0, 0], angle: 1.2,
    movement: "Flexion du genou",
  },
  {
    id: "ankle-l", label: "Cheville gauche",
    members: ["bone:tibia-l", "bone:fibula-l", "bone:talus-l", "bone:calcaneus-l",
      ...CALF.filter((id) => id.endsWith("-l"))],
    pivot: [-0.075, 0.07, -0.03], axis: [1, 0, 0], angle: 0.55,
    movement: "Flexion plantaire",
  },
  {
    id: "ankle-r", label: "Cheville droite",
    members: ["bone:tibia-r", "bone:fibula-r", "bone:talus-r", "bone:calcaneus-r",
      ...CALF.filter((id) => id.endsWith("-r"))],
    pivot: [0.075, 0.07, -0.03], axis: [1, 0, 0], angle: 0.55,
    movement: "Flexion plantaire",
  },
  {
    id: "neck", label: "Cou",
    members: NECK,
    pivot: [0, 1.44, -0.04], axis: [1, 0, 0], angle: 0.45,
    movement: "Flexion du cou",
  },
  {
    id: "jaw", label: "Mâchoire",
    members: MASTICATION,
    pivot: [0, 1.56, 0.01], axis: [1, 0, 0], angle: 0.3,
    movement: "Ouverture de la mâchoire",
  },
  {
    id: "spine", label: "Tronc et colonne",
    members: [...SPINE, ...ABDOMINALS],
    pivot: [0, 0.98, -0.05], axis: [1, 0, 0], angle: 0.35,
    movement: "Flexion du tronc",
  },
  {
    id: "shoulder-girdle-l", label: "Ceinture scapulaire gauche",
    members: SHOULDER_GIRDLE_L,
    pivot: [0.02, 1.41, -0.02], axis: [0, 0, 1], angle: 0.2,
    movement: "Élévation de la ceinture scapulaire",
  },
  {
    id: "shoulder-girdle-r", label: "Ceinture scapulaire droite",
    members: SHOULDER_GIRDLE_R,
    pivot: [-0.02, 1.41, -0.02], axis: [0, 0, 1], angle: -0.2,
    movement: "Élévation de la ceinture scapulaire",
  },

  /* ---------- groupes musculaires ---------- */
  {
    id: "biceps-l", label: "Biceps gauche",
    members: [...BICEPS.filter((id) => id.endsWith("-l")), "muscle:brachialis-muscle-l"],
    pivot: [-0.21, 1.09, 0], axis: [1, 0, 0], angle: 1.2,
    movement: "Flexion du coude",
  },
  {
    id: "biceps-r", label: "Biceps droit",
    members: [...BICEPS.filter((id) => id.endsWith("-r")), "muscle:brachialis-muscle-r"],
    pivot: [0.21, 1.09, 0], axis: [1, 0, 0], angle: 1.2,
    movement: "Flexion du coude",
  },
  {
    id: "triceps-l", label: "Triceps gauche",
    members: [...TRICEPS.filter((id) => id.endsWith("-l")), "muscle:anconeus-muscle-l"],
    pivot: [-0.21, 1.09, 0], axis: [1, 0, 0], angle: -0.9,
    movement: "Extension du coude",
  },
  {
    id: "triceps-r", label: "Triceps droit",
    members: [...TRICEPS.filter((id) => id.endsWith("-r")), "muscle:anconeus-muscle-r"],
    pivot: [0.21, 1.09, 0], axis: [1, 0, 0], angle: -0.9,
    movement: "Extension du coude",
  },
  {
    id: "deltoid-l", label: "Deltoïde gauche",
    members: DELTOID.filter((id) => id.endsWith("-l")),
    pivot: [-0.18, 1.39, 0], axis: [0, 0, 1], angle: 0.8,
    movement: "Abduction de l'épaule",
  },
  {
    id: "deltoid-r", label: "Deltoïde droit",
    members: DELTOID.filter((id) => id.endsWith("-r")),
    pivot: [0.18, 1.39, 0], axis: [0, 0, 1], angle: -0.8,
    movement: "Abduction de l'épaule",
  },
  {
    id: "pectoral-l", label: "Pectoral gauche",
    members: PECTORAL.filter((id) => id.endsWith("-l")),
    pivot: [-0.18, 1.39, 0], axis: [0, 0, 1], angle: -0.6,
    movement: "Adduction de l'épaule",
  },
  {
    id: "pectoral-r", label: "Pectoral droit",
    members: PECTORAL.filter((id) => id.endsWith("-r")),
    pivot: [0.18, 1.39, 0], axis: [0, 0, 1], angle: 0.6,
    movement: "Adduction de l'épaule",
  },
  {
    id: "latissimus-l", label: "Grand dorsal gauche",
    members: [LATISSIMUS[0], "bone:humerus-l"],
    pivot: [-0.18, 1.39, 0], axis: [0, 0, 1], angle: -0.5,
    movement: "Adduction et extension de l'épaule",
  },
  {
    id: "latissimus-r", label: "Grand dorsal droit",
    members: [LATISSIMUS[1], "bone:humerus-r"],
    pivot: [0.18, 1.39, 0], axis: [0, 0, 1], angle: 0.5,
    movement: "Adduction et extension de l'épaule",
  },
  {
    id: "quadriceps-l", label: "Quadriceps gauche",
    members: [...QUADRICEPS.filter((id) => id.endsWith("-l")), "bone:patella-l"],
    pivot: [-0.09, 0.43, 0], axis: [1, 0, 0], angle: -0.9,
    movement: "Extension du genou",
  },
  {
    id: "quadriceps-r", label: "Quadriceps droit",
    members: [...QUADRICEPS.filter((id) => id.endsWith("-r")), "bone:patella-r"],
    pivot: [0.09, 0.43, 0], axis: [1, 0, 0], angle: -0.9,
    movement: "Extension du genou",
  },
  {
    id: "hamstrings-l", label: "Ischio-jambiers gauches",
    members: HAMSTRINGS.filter((id) => id.endsWith("-l")),
    pivot: [-0.09, 0.43, 0], axis: [1, 0, 0], angle: 1.0,
    movement: "Flexion du genou",
  },
  {
    id: "hamstrings-r", label: "Ischio-jambiers droits",
    members: HAMSTRINGS.filter((id) => id.endsWith("-r")),
    pivot: [0.09, 0.43, 0], axis: [1, 0, 0], angle: 1.0,
    movement: "Flexion du genou",
  },
  {
    id: "calf-l", label: "Mollet gauche",
    members: CALF.filter((id) => id.endsWith("-l")),
    pivot: [-0.075, 0.07, -0.03], axis: [1, 0, 0], angle: 0.6,
    movement: "Flexion plantaire",
  },
  {
    id: "calf-r", label: "Mollet droit",
    members: CALF.filter((id) => id.endsWith("-r")),
    pivot: [0.075, 0.07, -0.03], axis: [1, 0, 0], angle: 0.6,
    movement: "Flexion plantaire",
  },
  {
    id: "glutes-l", label: "Fessiers gauches",
    members: GLUTES.filter((id) => id.endsWith("-l")),
    pivot: [-0.09, 0.90, 0], axis: [1, 0, 0], angle: 0.5,
    movement: "Extension de la hanche",
  },
  {
    id: "glutes-r", label: "Fessiers droits",
    members: GLUTES.filter((id) => id.endsWith("-r")),
    pivot: [0.09, 0.90, 0], axis: [1, 0, 0], angle: 0.5,
    movement: "Extension de la hanche",
  },
  {
    id: "abdominals", label: "Abdominaux",
    members: ABDOMINALS,
    pivot: [0, 0.98, -0.05], axis: [1, 0, 0], angle: 0.3,
    movement: "Flexion du tronc",
  },
  {
    id: "trapezius", label: "Trapèzes",
    members: TRAPEZIUS,
    pivot: [0, 1.44, -0.04], axis: [0, 0, 1], angle: 0.15,
    movement: "Élévation des épaules",
  },
];

/* Membres absents du manifeste : le test de données doit échouer, mais on
 * évite qu'un identifiant périmé casse silencieusement une animation. */
export function groupReport(structures) {
  const ids = new Set(structures.map((s) => s.id));
  const missing = [];
  for (const group of GROUPS) {
    for (const id of group.members) {
      if (!ids.has(id)) missing.push({ group: group.id, id });
    }
  }
  return { groups: GROUPS.length, missing };
}
