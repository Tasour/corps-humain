import fs from "node:fs";
import path from "node:path";
import { DatabaseSync } from "node:sqlite";

/* Base SQLite de la revue visuelle : remplace le Markdown de 4,5 Mo pour le
 * tri, le comptage et le suivi des verdicts. Les fichiers Markdown/JSON
 * versionnés restent la preuve ; la base est un cache hors dépôt, reconstructible.
 *
 * Usage :
 *   node scripts/revue-db.mjs build
 *   node scripts/revue-db.mjs query --statut a_faire --severite bloquant --limit 20
 *   node scripts/revue-db.mjs query --count
 */

const ROOT = path.resolve(import.meta.dirname, "..");
const OUT = path.join(ROOT, "docs/analyses/revue-visuelle");
const DB_PATH = process.env.REVUE_DB || "/home/tasour/.cache/revue-visuelle/revue.sqlite";
fs.mkdirSync(path.dirname(DB_PATH), { recursive: true });
const db = new DatabaseSync(DB_PATH);
const cmd = process.argv[2] || "query";

function arg(name, fallback = null) {
  const i = process.argv.indexOf(`--${name}`);
  if (i < 0) return fallback;
  const value = process.argv[i + 1];
  /* Option booléenne : --count sans valeur. */
  if (value === undefined || value.startsWith("--")) return true;
  return value;
}

if (cmd === "build") {
  db.exec(`
    DROP TABLE IF EXISTS entries;
    DROP TABLE IF EXISTS meta;
    CREATE TABLE entries (
      key TEXT PRIMARY KEY, id TEXT NOT NULL, source TEXT NOT NULL,
      subject TEXT NOT NULL, fr TEXT, category TEXT, gate TEXT, severity TEXT,
      confidence TEXT, status TEXT, verdict TEXT, description TEXT,
      angles TEXT, evidence TEXT, beforeImages TEXT, afterImages TEXT
    );
    CREATE TABLE meta (key TEXT PRIMARY KEY, value TEXT);
    CREATE INDEX idx_severity ON entries(severity);
    CREATE INDEX idx_status ON entries(status);
    CREATE INDEX idx_category ON entries(category);
    CREATE INDEX idx_subject ON entries(subject);
  `);
  const insert = db.prepare(`INSERT INTO entries VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`);
  const todo = JSON.parse(fs.readFileSync(path.join(OUT, "todolist.json"), "utf8"));
  const verifPath = path.join(OUT, "todolist-fait-a-verifier.json");
  const v = fs.existsSync(verifPath) ? JSON.parse(fs.readFileSync(verifPath, "utf8")) : { entries: [] };
  db.exec("BEGIN");
  todo.entries.forEach((e, i) => {
    insert.run(`todo:${i}`, e.id, "todo", e.subject, e.fr, e.category, e.gate, e.severity,
      e.confidence, "a_faire", null, e.description, JSON.stringify(e.angles || []),
      JSON.stringify(e.evidence || []), null, null);
  });
  v.entries.forEach((e, i) => {
    insert.run(`verif:${i}`, e.id, "verification", e.subject, e.fr, e.category, e.gate, e.severity,
      e.confidence, e.status || "fait_a_verifier", e.verdict, e.description,
      JSON.stringify(e.angles || []), e.evidence ? JSON.stringify(e.evidence) : null,
      JSON.stringify(e.beforeImages || []), JSON.stringify(e.afterImages || []));
  });
  db.exec("COMMIT");
  db.prepare("INSERT INTO meta VALUES (?,?)").run("built", new Date().toISOString());
  db.prepare("INSERT INTO meta VALUES (?,?)").run("todoEntries", String(todo.entries.length));
  console.log(`[revue-db] ${todo.entries.length} entrées importées dans ${DB_PATH}`);
} else {
  const where = [], params = [];
  for (const key of ["statut", "severite", "category", "verdict", "source"]) {
    const value = arg(key);
    if (value) { where.push(`${key === "statut" ? "status" : key} = ?`); params.push(value); }
  }
  const subject = arg("subject");
  if (subject) { where.push("subject LIKE ?"); params.push(`%${subject}%`); }
  const clause = where.length ? `WHERE ${where.join(" AND ")}` : "";
  if (arg("count") !== null) {
    const rows = db.prepare(`SELECT status, severity, COUNT(*) AS n FROM entries ${clause} GROUP BY status, severity ORDER BY n DESC`).all(...params);
    console.log(JSON.stringify(rows));
  } else {
    const limit = Math.min(Number(arg("limit", "30")), 500);
    const rows = db.prepare(`SELECT id, subject, category, severity, status, verdict, substr(description,1,90) AS description FROM entries ${clause} ORDER BY id LIMIT ?`).all(...params, limit);
    for (const r of rows) console.log(`${r.id}\t${r.severity}\t${r.status}\t${r.verdict || "-"}\t${r.subject}\t${r.description}`);
  }
}
db.close();
