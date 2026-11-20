import { Plugin } from "@opencode/plugin";
import { execFileSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";

const ROOT = path.resolve(import.meta.dirname, "../..");

function run(command: string, args: string[] = []) {
  return execFileSync(command, args, { cwd: ROOT, encoding: "utf8", maxBuffer: 8 * 1024 * 1024 });
}
function node(script: string, args: string[] = []) {
  return run("node", [path.join(ROOT, "scripts", script), ...args]);
}
function counts() {
  const file = path.join(ROOT, "docs/analyses/revue-visuelle/todolist-fait-a-verifier.json");
  if (!fs.existsSync(file)) return "revue visuelle : aucune donnée";
  const d = JSON.parse(fs.readFileSync(file, "utf8"));
  const v = d.summary?.verdicts || {};
  return `Revue visuelle : ${d.entries?.length || 0} entrées « fait mais à vérifier » — `
    + `${v.verifie || 0} vérifiées, ${v.partiel || 0} partielles, ${v.non_fixe || 0} non fixées.`;
}

export default Plugin.define({
  id: "corps.quality",
  async setup(ctx) {
    const cache = ctx.options?.cache || "/home/tasour/.cache/revue-visuelle";

    await ctx.tool.transform((editor) => {
      editor.namespace({
        name: "corps",
        description: "Todolist visuelle, captures et portes qualité de l'atlas CORPS",
      });

      editor.add({
        name: "todo_query",
        description: "Interroge la base SQLite de la revue visuelle (statut, sévérité, catégorie, sujet).",
        input: {
          type: "object",
          properties: {
            statut: { type: "string" },
            severite: { type: "string" },
            category: { type: "string" },
            subject: { type: "string" },
            limit: { type: "number" },
            count: { type: "boolean" },
          },
          additionalProperties: false,
        },
        options: { namespace: "corps", codemode: true },
        execute: async (input) => {
          const args = ["query"];
          for (const key of ["statut", "severite", "category", "subject", "limit"]) {
            if (input[key] !== undefined && input[key] !== null && input[key] !== "") args.push(`--${key}`, String(input[key]));
          }
          if (input.count) args.push("--count");
          return { content: node("revue-db.mjs", args).trim() || "(aucun résultat)" };
        },
      });

      editor.add({
        name: "todo_mark",
        description: "Marque une entrée VIS-xxxxx avec un verdict et une note de vérification.",
        input: {
          type: "object",
          properties: {
            id: { type: "string" },
            verdict: { type: "string", enum: ["verifie", "partiel", "non_fixe", "regression"] },
            note: { type: "string" },
            before: { type: "string" },
            after: { type: "string" },
          },
          required: ["id", "verdict"],
          additionalProperties: false,
        },
        options: { namespace: "corps", codemode: true },
        execute: async (input) => {
          const args = [input.id, input.verdict, input.note || ""];
          if (input.before) args.push(`--before=${input.before}`);
          if (input.after) args.push(`--after=${input.after}`);
          node("marquer-verdict.mjs", args);
          node("revue-db.mjs", ["build"]);
          return { content: `${input.id} marqué ${input.verdict}` };
        },
      });

      editor.add({
        name: "capture_pair",
        description: "Recalcule les 8 angles d'une structure dans un dossier avant ou après.",
        input: {
          type: "object",
          properties: {
            id: { type: "string" },
            phase: { type: "string", enum: ["avant", "apres"] },
          },
          required: ["id", "phase"],
          additionalProperties: false,
        },
        options: { namespace: "corps", codemode: true },
        execute: async (input) => {
          const out = path.join(cache, input.phase === "avant" ? "qualite-3d" : "apres-verification");
          execFileSync("npm", ["run", "captures:revue"], {
            cwd: ROOT,
            encoding: "utf8",
            env: { ...process.env, REVUE_IDS: input.id, REVUE_OUT: out, REVUE_WORKERS: "1" },
            maxBuffer: 8 * 1024 * 1024,
          });
          return { content: `8 captures ${input.phase} pour ${input.id} -> ${out}` };
        },
      });

      editor.add({
        name: "visual_diff",
        description: "Compare deux JPEG avec la skill screenshot-regression et retourne le pourcentage de pixels changés.",
        input: {
          type: "object",
          properties: { before: { type: "string" }, after: { type: "string" } },
          required: ["before", "after"],
          additionalProperties: false,
        },
        options: { namespace: "corps", codemode: true },
        execute: async (input) => {
          const diff = "/home/tasour/.config/opencode/skills/screenshot-regression/scripts/screenshot_diff.py";
          const out = "/tmp/opencode/corps-diff.png";
          const raw = run("python3", [diff, input.before, input.after, "--out", out, "--threshold", "12"]);
          return { content: raw.trim() };
        },
      });

      editor.add({
        name: "sources_check",
        description: "Vérifie les empreintes des sources 3D avant tout rebuild.",
        input: { type: "object", properties: {}, additionalProperties: false },
        options: { namespace: "corps", codemode: true },
        execute: async () => ({ content: run("npm", ["run", "sources:check"]).trim() }),
      });

      editor.add({
        name: "audit",
        description: "Lance la porte CI, le scorecard et Hausdorff, puis retourne un résumé.",
        input: { type: "object", properties: {}, additionalProperties: false },
        options: { namespace: "corps", codemode: true },
        execute: async () => {
          const parts = [
            run("npm", ["run", "audit:3d:check"]).trim(),
            run("npm", ["run", "scorecard:3d"]).trim(),
            run("npm", ["run", "hausdorff:3d"]).trim(),
          ];
          return { content: parts.join("\n") };
        },
      });
    });

    await ctx.command.transform((editor) => {
      editor.add({
        name: "etat-revue",
        description: "Affiche l'état courant de la revue visuelle et des correctifs.",
        execute: async ({ sessionID }) => {
          await ctx.session.synthetic({ sessionID, text: counts() });
        },
      });
      editor.add({
        name: "ci-scope",
        description: "Vérifie le scope GitHub workflow et rappelle la procédure sans stocker de secret.",
        execute: async ({ sessionID }) => {
          let status = "";
          try { status = execFileSync("gh", ["auth", "status"], { encoding: "utf8" }); } catch { /* gh absent */ }
          const line = status.split("\n").find((l) => l.includes("Token scopes")) || "scopes inconnus";
          const ok = line.includes("workflow");
          await ctx.session.synthetic({
            sessionID,
            text: ok
              ? `CI : scope workflow present. ${line}`
              : `CI : scope workflow absente (${line}). Lancer "gh auth refresh -h github.com -s workflow", puis valider le code affiche sur https://github.com/login/device. Voir la skill github-ci-scope. Ne jamais memoriser le token ni le code.`,
          });
        },
      });
      editor.add({
        name: "revue-vague",
        description: "Orchestre une vague de correction en worktrees isolées, puis consolidation et vérification.",
        execute: async ({ sessionID, prompt }) => {
          await ctx.session.prompt({
            ...prompt,
            sessionID,
            text: `Lance une nouvelle vague de correction visuelle sur le jeu CORPS. Utilise les outils corps_* et le skill qualite-3d. `
              + `Crée des worktrees isolées par famille, applique uniquement des corrections sans inventer de géométrie, `
              + `recapture les sujets touchés, compare avant/après et alimente todolist-fait-a-verifier. ${prompt.text}`,
          });
        },
      });
      editor.add({
        name: "verifier-sujet",
        description: "Capture après, diff visuel et verdict pour un identifiant VIS-xxxxx.",
        execute: async ({ sessionID, prompt }) => {
          await ctx.session.prompt({
            ...prompt,
            sessionID,
            text: `Vérifie visuellement le correctif ${prompt.text.trim()} : récupère l'entrée dans la base, `
              + `recapture le sujet concerné, compare les 8 angles avant/après avec l'outil corps_visual_diff, `
              + `puis marque le verdict avec corps_todo_mark. N'applique aucune autre correction.`,
          });
        },
      });
    });

    if (ctx.options?.injectStatus !== false) {
      await ctx.session.hook("context", (event) => {
        event.system.push({ type: "text", text: counts() });
      });
    }
  },
});
