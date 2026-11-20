import { Plugin, Worktree } from "@opencode/plugin";
import { execFile } from "node:child_process";
import { promisify } from "node:util";

const exec = promisify(execFile);

async function git(cwd: string, args: string[], signal?: AbortSignal) {
  const { stdout } = await exec("git", args, { cwd, signal, maxBuffer: 8 * 1024 * 1024 });
  return stdout.trim();
}

export default Plugin.define({
  id: "corps.worktrees",
  async setup(ctx) {
    await ctx.worktree.transform((editor) => {
      editor.add({
        id: "corps-git",
        async create(input, context) {
          const branch = input.branch || `revue-${Date.now()}`;
          try {
            await git(input.sourceDirectory, ["worktree", "add", "-b", branch, input.directory, "HEAD"], context.signal);
          } catch (error) {
            throw new Worktree.OperationError({
              message: `git worktree add a échoué : ${String(error)}`,
              forceRequired: false,
            });
          }
          return { directory: input.directory };
        },
        async remove(input, context) {
          await git(input.sourceDirectory, ["worktree", "remove", ...(input.force ? ["--force"] : []), input.directory], context.signal);
          const name = input.directory.split(/[-/]/).filter(Boolean).pop() || "";
          if (name.startsWith("revue-")) {
            try { await git(input.sourceDirectory, ["branch", "-D", name], context.signal); } catch { /* branche déjà absente */ }
          }
        },
        async list(sourceDirectory, context) {
          const raw = await git(sourceDirectory, ["worktree", "list", "--porcelain"], context.signal);
          const out: { directory: string; type: "root" | "worktree" }[] = [];
          let current = "";
          for (const line of raw.split("\n")) {
            if (line.startsWith("worktree ")) current = line.slice(9);
            else if (line === "bare") out.push({ directory: current, type: "root" });
            else if (line === "") {
              if (current && current !== sourceDirectory) out.push({ directory: current, type: "worktree" });
              current = "";
            }
          }
          return out;
        },
      });
    });
  },
});
