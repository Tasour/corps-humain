import { Plugin } from "@opencode/plugin";
import { execFileSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import crypto from "node:crypto";

const ROOT = path.resolve(import.meta.dirname, "../..");
const REVUES = path.join(ROOT, "docs/revues");
const DIFF = "/home/tasour/.config/opencode/skills/screenshot-regression/scripts/screenshot_diff.py";

function node(script: string, args: string[] = []) {
  return execFileSync("node", [path.join(ROOT, "scripts", script), ...args], {
    cwd: ROOT, encoding: "utf8", maxBuffer: 8 * 1024 * 1024,
  });
}
function lireJson<T>(chemin: string, defaut: T): T {
  try { return JSON.parse(fs.readFileSync(chemin, "utf8")) as T; } catch { return defaut; }
}
function ecrireAtomique(chemin: string, valeur: unknown) {
  fs.mkdirSync(path.dirname(chemin), { recursive: true });
  const temporaire = `${chemin}.tmp`;
  fs.writeFileSync(temporaire, `${JSON.stringify(valeur, null, 1)}\n`);
  fs.renameSync(temporaire, chemin);
}
function trouverFeuille(structure: string) {
  if (!fs.existsSync(REVUES)) return null;
  for (const date of fs.readdirSync(REVUES)) {
    const dossier = path.join(REVUES, date);
    if (!fs.statSync(dossier).isDirectory()) continue;
    for (const nom of fs.readdirSync(dossier)) {
      const feuille = path.join(dossier, nom, "sheet.json");
      if (!fs.existsSync(feuille)) continue;
      const meta = lireJson<{ structure?: string }>(feuille, {});
      if (meta.structure === structure) return { dossier: path.join(dossier, nom), feuille, meta };
    }
  }
  return null;
}

export default Plugin.define({
  id: "corps.review",
  async setup(ctx) {
    await ctx.tool.transform((editor) => {
      editor.namespace({
        name: "corps",
        description: "Revue anatomique humaine, fiches signables et preuves de textures",
      });

      editor.add({
        name: "review_sheet",
        description: "Génère une fiche HTML signable avec les 8 angles réels (procédural vs ?tex=cc0).",
        input: {
          type: "object",
          properties: {
            structure: { type: "string", description: "ID du manifeste, ou skin:body pour la peau" },
            tissue: { type: "string", enum: ["bone", "muscle", "organ", "skin"] },
          },
          required: ["structure", "tissue"],
          additionalProperties: false,
        },
        options: { namespace: "corps", codemode: true },
        execute: async (input) => {
          const sortie = node("review-sheet.mjs", ["--structure", String(input.structure), "--tissue", String(input.tissue)]).trim();
          return { content: sortie };
        },
      });

      editor.add({
        name: "texture_compare",
        description: "Mesure le delta perceptuel entre les 8 angles procéduraux et CC0 d'une fiche.",
        input: {
          type: "object",
          properties: { structure: { type: "string" } },
          required: ["structure"],
          additionalProperties: false,
        },
        options: { namespace: "corps", codemode: true },
        execute: async (input) => {
          const trouve = trouverFeuille(String(input.structure));
          if (!trouve) return { content: `Aucune fiche pour ${input.structure}` };
          const deltas: string[] = [];
          for (let i = 0; i < 8; i++) {
            const avant = path.join(trouve.dossier, `avant-angle-${i}.png`);
            const apres = path.join(trouve.dossier, `apres-angle-${i}.png`);
            if (!fs.existsSync(avant) || !fs.existsSync(apres)) continue;
            const sortie = execFileSync("python3", [
              DIFF, avant, apres,
              "--out", path.join(trouve.dossier, `diff-angle-${i}.png`), "--threshold", "12",
            ], { encoding: "utf8", cwd: ROOT });
            const j = JSON.parse(sortie) as { changedPct?: number };
            deltas.push(`${i}:${(j.changedPct ?? 0).toFixed(2)}%`);
          }
          return { content: `${input.structure} — ${deltas.join(" ")}` };
        },
      });

      editor.add({
        name: "review_sign",
        description: "Enregistre la signature humaine d'une fiche (nom, date, portée). Ne jamais signer soi-même.",
        input: {
          type: "object",
          properties: {
            structure: { type: "string" },
            relecteur: { type: "string" },
            date: { type: "string", description: "AAAA-MM-JJ" },
            portee: { type: "string", description: "ex. géométrie 8 angles, texture illustrative uniquement" },
            geometrie: { type: "boolean", default: false },
            texture: { type: "boolean", default: false },
            notes: { type: "string", default: "" },
          },
          required: ["structure", "relecteur", "date", "portee"],
          additionalProperties: false,
        },
        options: { namespace: "corps", codemode: true },
        execute: async (input) => {
          const trouve = trouverFeuille(String(input.structure));
          if (!trouve) return { content: `Aucune fiche pour ${input.structure} — signature refusée` };
          if (!/^\d{4}-\d{2}-\d{2}$/.test(String(input.date))) return { content: "Date invalide (AAAA-MM-JJ)" };
          if (!String(input.relecteur).trim() || !String(input.portee).trim()) return { content: "Relecteur et portée obligatoires" };
          const chemin = path.join(REVUES, "signoffs.json");
          const donnees = lireJson<{ entries: unknown[] }>(chemin, { entries: [] });
          const entrees = Array.isArray(donnees.entries) ? donnees.entries : [];
          const doublon = entrees.find((e) => (e as { structure?: string }).structure === input.structure
            && (e as { relecteur?: string }).relecteur === input.relecteur);
          if (doublon) return { content: `Signature déjà enregistrée pour ${input.structure} par ${input.relecteur}` };
          entrees.push({
            structure: input.structure,
            tissu: (trouve.meta as { tissu?: string }).tissu || "unknown",
            feuille: path.relative(REVUES, path.join(trouve.dossier, "fiche.html")),
            relecteur: String(input.relecteur).trim(),
            date: String(input.date),
            portee: String(input.portee).trim(),
            geometrie: !!input.geometrie,
            texture: !!input.texture,
            notes: String(input.notes || ""),
          });
          ecrireAtomique(chemin, { entries: entrees });
          return { content: `Signature enregistrée : ${input.structure} par ${input.relecteur} (${input.date})` };
        },
      });

      editor.add({
        name: "review_status",
        description: "Affiche l'état des fiches et le nombre de signatures par tissu.",
        input: { type: "object", properties: {}, additionalProperties: false },
        options: { namespace: "corps", codemode: true },
        execute: async () => {
          const rapport = node("check-review-signoffs.mjs").trim();
          return { content: rapport };
        },
      });

      editor.add({
        name: "license_verify",
        description: "Vérifie une licence depuis sa page réelle et consigne extrait + SHA-256 + date.",
        input: {
          type: "object",
          properties: { url: { type: "string" } },
          required: ["url"],
          additionalProperties: false,
        },
        options: { namespace: "corps", codemode: true },
        execute: async (input) => {
          const url = new URL(String(input.url));
          if (url.protocol !== "https:") return { content: "Seules les URL https sont acceptées" };
          try {
            const reponse = await fetch(url.toString(), { signal: AbortSignal.timeout(15000), redirect: "error" });
            if (!reponse.ok) return { content: `HTTP ${reponse.status}` };
            const texte = (await reponse.text()).replace(/\s+/g, " ").slice(0, 4000);
            const licence = /CC0|Creative Commons Zero|public domain/i.test(texte)
              ? "CC0" : /CC BY-SA/i.test(texte) ? "CC BY-SA" : /CC BY/i.test(texte) ? "CC BY" : "inconnue";
            const extrait = texte.slice(Math.max(0, texte.search(/CC0|Creative Commons|license/i) - 120), 400);
            const sha256 = crypto.createHash("sha256").update(texte).digest("hex");
            const chemin = path.join(REVUES, "licenses-verified.json");
            const donnees = lireJson<{ entries: unknown[] }>(chemin, { entries: [] });
            const entrees = Array.isArray(donnees.entries) ? donnees.entries : [];
            entrees.push({ url: url.toString(), licence, extrait, sha256, date: new Date().toISOString().slice(0, 10) });
            ecrireAtomique(chemin, { entries: entrees });
            return { content: `${url.toString()} → ${licence} (${sha256.slice(0, 12)})` };
          } catch (e) {
            return { content: `Échec de vérification : ${(e as Error).message}` };
          }
        },
      });
    });
  },
});
