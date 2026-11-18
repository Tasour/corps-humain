/* Groupes anatomiques et mouvements principaux pour l'atlas v2.
 * Les pivots sont des coordonnées monde (mètres, repère Y-up du modèle).
 * Les IDs doivent exister dans public/models/v2/manifest.json.
 */

export const QUICK_ACCESS = [
  { label: "Bras gauche", ids: ["bone:clavicle-l", "bone:scapula-l", "bone:humerus-l", "bone:radius-l", "bone:ulna-l", "muscle:long-head-of-biceps-brachii-l", "muscle:short-head-of-biceps-brachii-l"] },
  { label: "Bras droit", ids: ["bone:clavicle-r", "bone:scapula-r", "bone:humerus-r", "bone:radius-r", "bone:ulna-r", "muscle:long-head-of-biceps-brachii-r", "muscle:short-head-of-biceps-brachii-r"] },
  { label: "Poumons", ids: ["organ:bp-left-lung", "organ:superior-lobe-of-left-lung", "organ:inferior-lobe-of-left-lung", "organ:superior-lobe-of-right-lung", "organ:middle-lobe-of-right-lung", "organ:inferior-lobe-of-right-lung"] },
  { label: "Œil droit", ids: ["organ:bp-fibrous-layer-of-eyeball-r", "organ:anterior-segment-of-eyeball-r", "organ:posterior-segment-of-eyeball-r", "muscle:lateral-rectus-muscle-r", "muscle:medial-rectus-muscle-r"] },
  { label: "Cœur", ids: ["organ:bp-heart"], select: "organ:bp-heart" },
  { label: "Jambe gauche", ids: ["bone:hip-bone-l", "bone:femur-l", "bone:patella-l", "bone:tibia-l", "bone:fibula-l"] },
  { label: "Reins", ids: ["organ:kidney-l", "organ:kidney-r"] },
  { label: "Encéphale", ids: ["organ:bp-brain", "organ:bp-brainstem", "organ:cerebellum-l", "organ:cerebellum-r"] },
];

export const GROUPS = [
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
    id: "heart", label: "Cœur et cavités",
    members: ["organ:bp-heart", "organ:left-atrium", "organ:right-atrium", "organ:left-ventricle", "organ:right-ventricle"],
    pivot: [0.02, 1.30, 0.03], axis: [0, 0, 1], angle: 0.35,
    movement: "Torsion cardiaque",
  },
];
