/* Identifiant source immuable (BENCH-008).
 *
 * L'ID d'affichage (`bone:bp-femur`) dérive du nom canonical et peut changer
 * si la nomenclature évolue. Le `source_id` dérive uniquement de clés stables
 * de la source d'origine : nom d'objet Z-Anatomy, concept ID BodyParts3D,
 * code TA2 en dernier recours — plus le côté quand il est explicite.
 *
 * Partagé entre le rebuild et le post-traitement pour éviter toute dérive.
 */

export function sourceIdFor(entry) {
  const source = entry?.best?.source || "";
  let base;
  if (/Z-Anatomy/i.test(source) && entry.object) {
    base = `za:${entry.object}`;
  } else if (entry?.bodyParts3D?.conceptId) {
    base = `bp:${entry.bodyParts3D.conceptId}`;
  } else if (entry?.best?.modelId) {
    base = `bp:${entry.best.modelId}`;
  } else if (entry?.ta2Id) {
    base = `ta2:${entry.ta2Id}`;
  } else if (entry?.canonical) {
    base = `canonical:${entry.canonical}`;
  } else {
    throw new Error(`aucune clé source stable pour ${entry?.id || "<inconnu>"}`);
  }
  const cote = entry.side === "left" || entry.side === "l" ? ":l"
    : entry.side === "right" || entry.side === "r" ? ":r" : "";
  return base + cote;
}
