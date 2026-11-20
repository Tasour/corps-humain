import fs from "node:fs";
import path from "node:path";

/* Marque une entrée de la todolist « fait mais à vérifier ».
 * Usage : node scripts/marquer-verdict.mjs VIS-00001 verifie "note" [--before=...] [--after=...]
 */

const ROOT = path.resolve(import.meta.dirname, "..");
const OUT = path.join(ROOT, "docs/analyses/revue-visuelle");
const JSON_FILE = path.join(OUT, "todolist-fait-a-verifier.json");
const MD_FILE = path.join(OUT, "todolist-fait-a-verifier.md");
const [id, verdict, ...rest] = process.argv.slice(2);
if (!id || !verdict) {
  console.error("Usage: marquer-verdict.mjs <VIS-id> <verifie|partiel|non_fixe|regression> [note] [--before=...] [--after=...]");
  process.exit(1);
}
const note = rest.filter((a) => !a.startsWith("--")).join(" ") || "";
const before = rest.find((a) => a.startsWith("--before="))?.slice(9) || null;
const after = rest.find((a) => a.startsWith("--after="))?.slice(8) || null;

const data = JSON.parse(fs.readFileSync(JSON_FILE, "utf8"));
const todo = JSON.parse(fs.readFileSync(path.join(OUT, "todolist.json"), "utf8"));
let entry = data.entries.find((e) => e.id === id && e.status === "fait_a_verifier");
if (!entry) {
  const source = todo.entries.find((e) => e.id === id);
  if (!source) { console.error(`Entrée ${id} introuvable`); process.exit(1); }
  entry = { ...source, status: "fait_a_verifier", beforeImages: [], afterImages: [] };
  data.entries.push(entry);
}
const previous = entry.verdict;
entry.verdict = verdict;
entry.note = note;
entry.verifiedAt = new Date().toISOString();
if (before) entry.beforeImages = [before];
if (after) entry.afterImages = [after];
if (!data.summary.verdicts) data.summary.verdicts = {};
data.summary.verdicts[verdict] = (data.summary.verdicts[verdict] || 0) + 1;
fs.writeFileSync(JSON_FILE, JSON.stringify(data, null, 1));
fs.appendFileSync(MD_FILE, `\n- ${id} : ${previous || "sans verdict"} → **${verdict}** — ${note}\n`);

console.log(`[verdict] ${id}: ${previous || "—"} -> ${verdict}${note ? ` (${note})` : ""}`);
