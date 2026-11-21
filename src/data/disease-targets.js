/* Correspondance entre les cibles historiques de la base de pathologies (v1)
 * et les identifiants réels du manifeste v2. Aucune structure n'est inventée :
 * une cible sans équivalent vérifié reste vide et est signalée par le test. */

export const TARGET_TO_STRUCTURES = {
  poumons: ["organ:inferior-lobe-of-left-lung", "organ:inferior-lobe-of-right-lung", "organ:middle-lobe-of-right-lung", "organ:superior-lobe-of-left-lung"],
  cerveau: ["organ:bp-brain"],
  coeur: ["organ:bp-heart"],
  aorte: ["organ:bp-aorta", "organ:bp-ascending-aorta", "organ:bp-abdominal-aorta"],
  estomac: ["organ:stomach"],
  reins: ["organ:kidney-l", "organ:kidney-r"],
  femur: ["bone:femur-l", "bone:femur-r"],
  colonne: ["bone:vertebra-c3", "bone:vertebra-c4", "bone:vertebra-c5"],
  bronches: ["organ:bp-left-main-bronchus-l", "organ:bp-right-main-bronchus-r"],
  coronaires: ["organ:bp-left-coronary-artery-l", "organ:bp-coronary-sinus"],
  foie: ["organ:bp-left-lobe-of-liver", "organ:anterior-lateral-segment-of-liver-vi"],
  vesicule: ["organ:gallbladder"],
  pancreas: ["organ:pancreas"],
  deltoides: ["muscle:acromial-part-of-deltoid-muscle-l", "muscle:acromial-part-of-deltoid-muscle-r"],
  tronc_cerebral: ["organ:bp-brainstem"],
  moelle_epiniere: ["organ:bp-spinal-cord"],
  oesophage: ["organ:bp-esophagus"],
  intestin_grele: ["organ:bp-small-intestine"],
  colon: ["organ:ascending-colon", "organ:descending-colon", "organ:sigmoid-colon"],
  ureteres: ["organ:bp-ureter-l", "organ:bp-ureter-r"],
  vessie: ["organ:urinary-bladder"],
  bassin: ["bone:bp-bony-pelvis", "bone:hip-bone-l", "bone:hip-bone-r"],
  rotule: ["bone:patella-l", "bone:patella-r"],
  quadriceps: ["muscle:rectus-femoris-muscle-l", "muscle:rectus-femoris-muscle-r"],
  fessiers: ["muscle:gluteus-maximus-muscle-l", "muscle:gluteus-maximus-muscle-r"],
  pectoraux: ["muscle:clavicular-head-of-pectoralis-major-muscle-l", "muscle:clavicular-head-of-pectoralis-major-muscle-r"],
  /* Aucune glande thyroïde dans le manifeste v2 : gap documenté, pas de
   * géométrie inventée pour satisfaire la base de pathologies v1. */
  thyroide: [],
};

export const TARGET_GAPS = {
  thyroide: "Aucune structure « thyroïde » dans le manifeste v2 (Z-Anatomy + BodyParts3D). Les effets des pathologies thyroïdiennes restent textuels.",
};

/* Couleurs par type d'effet : purement illustratives, jamais codées par la
 * seule couleur (chaque effet garde son libellé textuel). */
export const EFFECT_COLORS = {
  inflammation: "#e0523f",
  obstruction: "#d98b2b",
  fibrosis: "#9a7b4f",
  necrosis: "#5d4037",
  edema: "#4a90d9",
  atrophy: "#7d7d8c",
  tumor: "#a24b78",
  plaque: "#c2a24a",
  stone: "#b6b6a8",
  hemorrhage: "#a32626",
  demyelination: "#7b6fa8",
  fracture: "#d9d2c2",
  wear: "#8a8f98",
  hypertrophy: "#b75d3a",
  destruction: "#6b4f4a",
  consolidation: "#9c7b63",
  hyperactivity: "#d46a35",
  porosity: "#9b9384",
  scoliosis: "#6d7f96",
};

export function structuresFor(target) {
  return TARGET_TO_STRUCTURES[target] || [];
}
