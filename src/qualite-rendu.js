/* BENCH-017 — politique de résolution de rendu (cœur pur, sans IO).
 *
 * Le plafond matériel est 2. L'atlas utilise un plafond plus bas par défaut
 * (1,5) parce que le rendu logiciel ne suit pas à 4K. La résolution peut être
 * dégradée temporairement quand le coût moyen d'un rendu dépasse 8 ms, puis
 * doit être restaurée après plusieurs fenêtres calmes (< 4 ms), avec
 * hystérésis pour éviter l'oscillation.
 */

export const MAX_DPR = 2;
export const DPR_CAP = 1.5;
export const MIN_DPR = 1;
export const PAS_DPR = 0.25;
export const SEUIL_DEGRADE_MS = 8;
export const SEUIL_RESTAURE_MS = 4;
export const FENETRES_RESTAURATION = 3;

function clampBase(base) {
  if (!Number.isFinite(base)) return DPR_CAP;
  return Math.min(Math.max(base, MIN_DPR), MAX_DPR);
}

function clampDpr(value, base) {
  if (!Number.isFinite(value)) return MIN_DPR;
  return Math.min(Math.max(value, MIN_DPR), clampBase(base));
}

/** Résolution de départ, bornée à [1, min(cap, 2)]. */
export function basePixelRatio(devicePixelRatio, cap = DPR_CAP) {
  if (!Number.isFinite(devicePixelRatio) || devicePixelRatio <= 0) return MIN_DPR;
  return Math.min(devicePixelRatio, clampBase(cap));
}

/** Prochain état de résolution. Retourne toujours un objet borné. */
export function dprSuivant({ pixelRatio, base, avgMs, bonnesFenetres = 0 }) {
  const plafond = clampBase(base);
  const courant = clampDpr(pixelRatio, plafond);
  if (!Number.isFinite(avgMs)) {
    return { pixelRatio: courant, bonnesFenetres: 0, action: "aucune" };
  }
  if (avgMs > SEUIL_DEGRADE_MS && courant > MIN_DPR) {
    return {
      pixelRatio: clampDpr(courant - PAS_DPR, plafond),
      bonnesFenetres: 0,
      action: "degrade",
    };
  }
  if (avgMs < SEUIL_RESTAURE_MS && courant < plafond) {
    const n = Number.isFinite(bonnesFenetres) ? Math.max(0, bonnesFenetres) + 1 : 1;
    if (n >= FENETRES_RESTAURATION) {
      return {
        pixelRatio: clampDpr(courant + PAS_DPR, plafond),
        bonnesFenetres: 0,
        action: "restaure",
      };
    }
    return { pixelRatio: courant, bonnesFenetres: n, action: "attend" };
  }
  return { pixelRatio: courant, bonnesFenetres: 0, action: "aucune" };
}
