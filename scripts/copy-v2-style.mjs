/* Copie la feuille de style source vers public/ pour qu'elle soit servie
 * et incluse dans dist/ par Vite. Source unique : src/v2-style.css. */
import fs from "node:fs";
import path from "node:path";
const root = path.resolve(import.meta.dirname, "..");
fs.copyFileSync(path.join(root, "src/v2-style.css"), path.join(root, "public/v2-style.css"));
console.log("[style] src/v2-style.css -> public/v2-style.css");
