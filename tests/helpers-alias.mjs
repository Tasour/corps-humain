import { ANCIEN_VERS_NOUVEAU } from "../src/data/id-aliases.js";

/* Résout un identifiant historique vers le manifeste courant. */
export function resoudre(id, byId) {
  return byId.get(id) || byId.get(ANCIEN_VERS_NOUVEAU[id] || "") || null;
}
