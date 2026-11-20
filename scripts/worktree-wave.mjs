import { execFileSync } from "node:child_process";
import fs from "node:fs";

/* Orchestration fiable des worktrees d'une vague d'agents.
 * L'outil intégré `worktree_create` ayant échoué en cours de session, ce
 * helper utilise directement git, qui fonctionne de façon reproductible.
 *
 * Usage :
 *   node scripts/worktree-wave.mjs create vague3-geometrie,normales,materiaux
 *   node scripts/worktree-wave.mjs list
 *   node scripts/worktree-wave.mjs remove vague3
 */

const ROOT = process.cwd();
const cmd = process.argv[2];
const git = (args) => execFileSync("git", args, { cwd: ROOT, encoding: "utf8" }).trim();

if (cmd === "create") {
  const names = (process.argv[3] || "").split(",").map((s) => s.trim()).filter(Boolean);
  for (const name of names) {
    const dir = `/home/tasour/corps-humain-wt-${name}`;
    const branch = `revue-${name}`;
    if (fs.existsSync(dir)) { console.error(`[worktree] ${dir} existe déjà`); continue; }
    git(["worktree", "add", "-b", branch, dir, "HEAD"]);
    console.log(`[worktree] ${name} -> ${dir} (branche ${branch})`);
  }
} else if (cmd === "list") {
  console.log(git(["worktree", "list"]));
} else if (cmd === "remove") {
  const prefix = process.argv[3];
  const lines = git(["worktree", "list"]).split("\n");
  for (const line of lines) {
    const dir = line.split(/\s+/)[0];
    if (!dir.includes(`-wt-${prefix}`) || dir === ROOT) continue;
    git(["worktree", "remove", "--force", dir]);
    const branch = `revue-${dir.split(`-wt-${prefix}`)[1] ? `${prefix}${dir.split(`-wt-${prefix}`)[1]}` : prefix}`;
    try { git(["branch", "-D", branch]); } catch { /* branche déjà supprimée */ }
    console.log(`[worktree] retiré ${dir}`);
  }
} else {
  console.error("Usage: worktree-wave.mjs create|list|remove <noms>");
  process.exit(1);
}
