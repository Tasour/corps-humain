import { Plugin } from "@opencode/plugin";
import fs from "node:fs";
import path from "node:path";
import crypto from "node:crypto";

const ROOT = path.resolve(import.meta.dirname, "../..");
const SKILLS = path.join(ROOT, ".opencode/skills");
const EVIDENCE = path.join(ROOT, "docs/analyses/preuves");
const TEXTURE_CACHE = "/home/tasour/.cache/corps-sources/textures";

function sha256(buffer: Buffer) {
  return crypto.createHash("sha256").update(buffer).digest("hex");
}
function slug(value: string) {
  return value.replace(/[^a-zA-Z0-9_-]/g, "_").slice(0, 120);
}

export default Plugin.define({
  id: "corps.research",
  async setup(ctx) {
    await ctx.tool.transform((editor) => {
      editor.namespace({
        name: "corps",
        description: "Recherche anatomique, licences et preuves pour l'atlas CORPS",
      });

      editor.add({
        name: "web_search",
        description: "Recherche sur le web et retourne les meilleures sources avec URL.",
        input: {
          type: "object",
          properties: { query: { type: "string" } },
          required: ["query"],
          additionalProperties: false,
        },
        options: { namespace: "corps", codemode: true },
        execute: async (input, context) => {
          const results = await ctx.websearch.query({ query: String(input.query) }, { signal: context.signal });
          const top = (results || []).slice(0, 6).map((r: any) => ({
            title: r.title || r.name || "",
            url: r.url || "",
            excerpt: String(r.content || r.description || "").slice(0, 240),
          }));
          return { content: JSON.stringify(top, null, 1) };
        },
      });

      editor.add({
        name: "web_source",
        description: "Ouvre une URL et retourne un extrait verifiable avec la date d'acces.",
        input: {
          type: "object",
          properties: { url: { type: "string" } },
          required: ["url"],
          additionalProperties: false,
        },
        options: { namespace: "corps", codemode: true },
        execute: async (input, context) => {
          const response = await fetch(String(input.url), { signal: context.signal });
          if (!response.ok) return { content: `HTTP ${response.status} pour ${input.url}` };
          const text = (await response.text()).replace(/<script[\s\S]*?<\/script>/g, " ").replace(/<style[\s\S]*?<\/style>/g, " ").replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
          return { content: JSON.stringify({ url: input.url, accessed: new Date().toISOString().slice(0, 10), excerpt: text.slice(0, 4000) }, null, 1) };
        },
      });

      editor.add({
        name: "license_check",
        description: "Verifie une source de texture contre la liste blanche et noire documentee.",
        input: {
          type: "object",
          properties: { source: { type: "string" }, license: { type: "string" } },
          required: ["source"],
          additionalProperties: false,
        },
        options: { namespace: "corps", codemode: true },
        execute: async (input) => {
          const file = path.join(SKILLS, "textures-web/references/licences.md");
          const table = fs.readFileSync(file, "utf8");
          const source = String(input.source).toLowerCase();
          const line = table.split("\n").find((l) => l.toLowerCase().includes(source));
          const allowed = line ? !line.includes("interdite") && !line.includes("payant") : false;
          const license = input.license || (line ? (line.includes("CC0") ? "CC0" : "inconnue") : "inconnue");
          return { content: JSON.stringify({ source: input.source, license, allowed, reason: line || "source absente de la liste verifiee" }, null, 1) };
        },
      });

      editor.add({
        name: "evidence_add",
        description: "Ecrit une preuve anatomique datee et la lie a une entree VIS-xxxxx.",
        input: {
          type: "object",
          properties: {
            visId: { type: "string" },
            claim: { type: "string" },
            verdict: { type: "string" },
            confidence: { type: "string" },
            sources: { type: "array", items: { type: "object" } },
          },
          required: ["visId", "claim", "sources"],
          additionalProperties: false,
        },
        options: { namespace: "corps", codemode: true },
        execute: async (input) => {
          fs.mkdirSync(EVIDENCE, { recursive: true });
          const record = {
            ...input,
            id: input.visId,
            recordedAt: new Date().toISOString(),
            accessed: new Date().toISOString().slice(0, 10),
          };
          const file = path.join(EVIDENCE, `${slug(String(input.visId))}.json`);
          fs.writeFileSync(file, JSON.stringify(record, null, 1));
          fs.appendFileSync(path.join(EVIDENCE, "index.md"), `\n- ${input.visId} : ${input.claim} — ${input.verdict || "a_valider"} (${input.confidence || "moyenne"}) [${file}]\n`);
          return { content: `preuve ecrite : ${file}` };
        },
      });

      editor.add({
        name: "texture_fetch",
        description: "Telecharge une texture CC0 depuis Poly Haven ou ambientCG dans le cache, avec empreinte.",
        input: {
          type: "object",
          properties: {
            provider: { type: "string", enum: ["polyhaven", "ambientcg"] },
            assetId: { type: "string" },
            url: { type: "string" },
          },
          required: ["provider", "assetId"],
          additionalProperties: false,
        },
        options: { namespace: "corps", codemode: true },
        execute: async (input, context) => {
          const provider = String(input.provider);
          const id = slug(String(input.assetId));
          let urls: string[] = [];
          if (input.url) urls = [String(input.url)];
          else if (provider === "polyhaven") {
            const meta = await fetch(`https://api.polyhaven.com/files/${encodeURIComponent(id)}`, { signal: context.signal });
            if (!meta.ok) return { content: `Poly Haven API: HTTP ${meta.status}` };
            const data: any = await meta.json();
            const diff = data?.Diffuse || data?.diffuse || data?.albedo || {};
            urls = Object.values(diff).flatMap((v: any) => Object.values(v || {})).flatMap((v: any) => (v?.url ? [String(v.url)] : [])).slice(0, 1);
          } else {
            const meta = await fetch(`https://ambientcg.com/api/v2/full_json?id=${encodeURIComponent(id)}`, { signal: context.signal });
            if (!meta.ok) return { content: `ambientCG API: HTTP ${meta.status}` };
            const data: any = await meta.json();
            const found: string[] = [];
            const walk = (v: any) => { if (!v || typeof v !== "object") return; if (typeof v.DownloadLink === "string") found.push(v.DownloadLink); for (const child of Object.values(v)) walk(child); };
            walk(data);
            urls = found.slice(0, 1);
          }
          if (!urls.length) return { content: "aucune URL de telechargement trouvee ; fournir --url" };
          const dir = path.join(TEXTURE_CACHE, provider, id);
          fs.mkdirSync(dir, { recursive: true });
          const downloaded = [];
          for (const url of urls) {
            const response = await fetch(url, { signal: context.signal });
            if (!response.ok) continue;
            const buffer = Buffer.from(await response.arrayBuffer());
            const file = path.join(dir, path.basename(new URL(url).pathname) || "texture.bin");
            fs.writeFileSync(file, buffer);
            downloaded.push({ file, bytes: buffer.length, sha256: sha256(buffer) });
          }
          return { content: JSON.stringify({ provider, assetId: id, downloaded, license: "CC0" }, null, 1) };
        },
      });
    });

    await ctx.command.transform((editor) => {
      editor.add({
        name: "source-anatomique",
        description: "Demander a l'agent anatomie-web de prouver une structure ou un FMAID.",
        execute: async ({ sessionID, prompt }) => {
          await ctx.session.prompt({
            ...prompt,
            sessionID,
            text: `Utilise l'agent anatomie-web et la skill anatomie-web pour prouver : ${prompt.text.trim()}. `
              + `Croise au moins deux sources, consigne FMAID, URL, licence et date, puis ecris la preuve avec corps_evidence_add. Ne modifie pas la geometrie.`,
          });
        },
      });
      editor.add({
        name: "texture-web",
        description: "Construire une texture tissulaire CC0 avec la skill textures-web.",
        execute: async ({ sessionID, prompt }) => {
          await ctx.session.prompt({
            ...prompt,
            sessionID,
            text: `Utilise la skill textures-web pour le tissu : ${prompt.text.trim()}. Verifie la licence avec corps_license_check, `
              + `telecharge via corps_texture_fetch, assemble avec assemble-texture.py, puis compare 8 angles avant/apres. Aucune correction de geometrie.`,
          });
        },
      });
      editor.add({
        name: "prouver",
        description: "Lier une entree VIS-xxxxx a ses preuves et a la paire avant/apres.",
        execute: async ({ sessionID, prompt }) => {
          await ctx.session.prompt({
            ...prompt,
            sessionID,
            text: `Pour ${prompt.text.trim()}, recupere la preuve dans docs/analyses/preuves, verifie la paire avant/apres, `
              + `puis marque le verdict avec corps_todo_mark. Sans preuve ni paire, le verdict reste a_valider.`,
          });
        },
      });
    });
  },
});
