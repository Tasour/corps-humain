import { SYSTEMS, SYSTEM_MAP } from "./data/systems.js";
import { DISEASES, EFFECT_LABELS, NORMAL_VITALS } from "./data/diseases.js";

export const ARTICLE = {
  cerveau: "le",
  cervelet: "le",
  tronc_cerebral: "le",
  moelle_epiniere: "la",
  coeur: "le",
  coronaires: "les",
  aorte: "l'",
  poumons: "les",
  bronches: "les",
  oesophage: "l'",
  estomac: "l'",
  foie: "le",
  vesicule: "la",
  pancreas: "le",
  intestin_grele: "l'",
  colon: "le",
  reins: "les",
  ureteres: "les",
  vessie: "la",
  rate: "la",
  thyroide: "la",
  surrenales: "les",
  crane: "le",
  colonne: "la",
  cotes: "les",
  bassin: "le",
  omoplate: "l'",
  clavicule: "la",
  humerus: "l'",
  avant_bras: "l'",
  main: "la",
  femur: "le",
  rotule: "la",
  tibia: "le",
  pied: "le",
  trapezes: "les",
  deltoides: "les",
  pectoraux: "les",
  dorsaux: "les",
  abdominaux: "les",
  obliques: "les",
  biceps: "le",
  triceps: "le",
  fessiers: "les",
  quadriceps: "le",
  ischio_jambiers: "les",
  mollets: "les",
};

export function withArticle(entry) {
  const art = ARTICLE[entry.id] || "le";
  const name = entry.name.charAt(0).toLowerCase() + entry.name.slice(1);
  return art === "l'" ? `l'${name}` : `${art} ${name}`;
}

export function diseasesForEntity(id) {
  return DISEASES.filter((d) => d.effects.some((e) => e.target === id));
}

export function systemName(id) {
  return SYSTEM_MAP[id]?.name || id;
}

export function systemColor(id) {
  return SYSTEM_MAP[id]?.color || "#67e8f9";
}

export function vitalsAt(disease, severity) {
  if (!disease || severity <= 0.01) return { ...NORMAL_VITALS };
  const t = Math.max(0, Math.min(1, severity));
  const lerp = (a, b) => Math.round((a + (b - a) * t) * 10) / 10;
  return {
    hr: Math.round(lerp(NORMAL_VITALS.hr, disease.vitals.hr)),
    spo2: Math.round(lerp(NORMAL_VITALS.spo2, disease.vitals.spo2)),
    rr: Math.round(lerp(NORMAL_VITALS.rr, disease.vitals.rr)),
    sbp: Math.round(lerp(NORMAL_VITALS.sbp, disease.vitals.sbp)),
    dbp: Math.round(lerp(NORMAL_VITALS.dbp, disease.vitals.dbp)),
    temp: Math.round(lerp(NORMAL_VITALS.temp, disease.vitals.temp) * 10) / 10,
  };
}

export function renderSystemChips(active) {
  const all = `
    <button class="sys-chip ${active === "all" ? "active" : ""}" data-system="all">
      <i style="--c:#94a3b8"></i>Tous
    </button>`;
  return (
    all +
    SYSTEMS.map(
      (s) => `
      <button class="sys-chip ${active === s.id ? "active" : ""}" data-system="${s.id}" style="--c:${s.color}">
        <i></i>${s.name}
      </button>`,
    ).join("")
  );
}

export function renderEntityList({ entries, activeId, system, query, kind }) {
  const q = query.trim().toLowerCase();
  const filtered = entries.filter((e) => {
    if (system !== "all" && e.system !== system) return false;
    if (q && !`${e.name} ${e.latin} ${systemName(e.system)}`.toLowerCase().includes(q)) return false;
    return true;
  });

  const matchesDisease = q
    ? DISEASES.filter(
        (d) =>
          (system === "all" || d.system === system) &&
          `${d.name} ${d.tagline} ${d.symptoms.join(" ")}`.toLowerCase().includes(q),
      )
    : [];

  let html = "";
  if (matchesDisease.length) {
    html += `<div class="list-subhead">Maladies · ${matchesDisease.length}</div>`;
    html += matchesDisease
      .slice(0, 8)
      .map(
        (d) => `
      <button class="entity-item disease ${activeId === d.id ? "active" : ""}" data-disease="${d.id}">
        <span class="entity-dot" style="--c:${systemColor(d.system)}"></span>
        <span class="entity-main"><strong>${d.name}</strong><em>${SYSTEM_MAP[d.system].name} · pathologie</em></span>
        <span class="chev">›</span>
      </button>`,
      )
      .join("");
  }

  if (filtered.length) {
    html += q || matchesDisease.length ? `<div class="list-subhead">Anatomie · ${filtered.length}</div>` : "";
    html += filtered
      .map((e) => {
        const count = diseasesForEntity(e.id).length;
        const meta =
          e.kind === "organ"
            ? `${e.region} · ${count} maladie${count > 1 ? "s" : ""}`
            : `${e.region} · ${e.kind === "bone" ? "os" : "muscle"}`;
        return `
        <button class="entity-item ${activeId === e.id ? "active" : ""}" data-organ="${e.id}">
          <span class="entity-dot" style="--c:${e.color}"></span>
          <span class="entity-main"><strong>${e.name}</strong><em>${meta}</em></span>
          <span class="chev">›</span>
        </button>`;
      })
      .join("");
  }

  if (!html) {
    const what = q ? `« ${query} »` : "ce filtre";
    html = `<div class="empty-state"><span>⌕</span><p>Aucun résultat pour ${what}.</p><small>Essayez un autre système ou l'onglet « Tout ».</small></div>`;
  }
  return html;
}

export function countMatches(entries, { system, query, kind }) {
  const q = query.trim().toLowerCase();
  const anatomy = entries.filter((e) => {
    if (kind !== "all" && e.kind !== kind) return false;
    if (system !== "all" && e.system !== system) return false;
    if (q && !`${e.name} ${e.latin} ${systemName(e.system)}`.toLowerCase().includes(q)) return false;
    return true;
  }).length;
  const diseases = q
    ? DISEASES.filter(
        (d) =>
          (system === "all" || d.system === system) &&
          `${d.name} ${d.tagline} ${d.symptoms.join(" ")}`.toLowerCase().includes(q),
      ).length
    : 0;
  return anatomy + Math.min(diseases, 8);
}

export function renderHome({ stats, featured, bestDiag, bestHunt }) {
  return `
    <div class="home-hero">
      <div class="eyebrow"><span class="eyebrow-line"></span>ATLAS INTERACTIF · 3D</div>
      <h2>Explorez le corps.<br /><span>Voyez la maladie.</span></h2>
      <p>
        Un jumeau numérique pour comprendre l'anatomie et visualiser, organe par organe,
        ce qu'une pathologie modifie vraiment.
      </p>
      <div class="stats">
        <div class="stat"><b>${stats.organs}</b><span>organes</span></div>
        <div class="stat"><b>${stats.diseases}</b><span>pathologies</span></div>
        <div class="stat"><b>${stats.systems}</b><span>systèmes</span></div>
      </div>
    </div>

    <section class="panel-block">
      <div class="block-head"><h3>Cas d'étude</h3><span class="muted">cliquez pour simuler</span></div>
      <div class="case-list">
        ${featured
          .map(
            (d) => `
          <button class="case-card" data-disease="${d.id}" style="--c:${systemColor(d.system)}">
            <span class="case-top"><i></i>${SYSTEM_MAP[d.system].name}</span>
            <strong>${d.name}</strong>
            <em>${d.tagline}</em>
            <span class="case-cta">Visualiser l'effet <b>→</b></span>
          </button>`,
          )
          .join("")}
      </div>
    </section>

    <section class="panel-block">
      <div class="block-head"><h3>Comment explorer</h3></div>
      <ol class="steps">
        <li><b>1</b><div><strong>Tournez le corps</strong><span>Glissez pour l'orbite, molette pour zoomer, cliquez un organe.</span></div></li>
        <li><b>2</b><div><strong>Changez de couche</strong><span>Peau, muscles, squelette ou organes : chaque système se révèle.</span></div></li>
        <li><b>3</b><div><strong>Simulez une maladie</strong><span>Réglez la gravité et observez l'organe atteint en temps réel.</span></div></li>
        <li><b>4</b><div><strong>Éclatez, isolez, comparez</strong><span>Vue éclatée, isolement d'un organe et bascule sain / malade.</span></div></li>
      </ol>
    </section>

    <section class="panel-block games-block">
      <div class="block-head"><h3>Apprendre en jouant</h3></div>
      <div class="game-card">
        <div><span class="tag">DIAGNOSTIC</span><strong>Le patient présente…</strong><p>Identifiez la maladie à partir des symptômes et des constantes.</p></div>
        <button class="btn btn-primary small" data-quiz>Jouer</button>
      </div>
      <div class="game-card">
        <div><span class="tag teal">ANATOMIE</span><strong>Chasse aux organes</strong><p>Retrouvez l'organe demandé sur le corps en 90 secondes.</p></div>
        <button class="btn btn-ghost small" data-hunt>Jouer</button>
      </div>
      <div class="best-scores">
        <span>Meilleurs scores</span>
        <b>Diagnostic ${bestDiag}</b>
        <b>Chasse ${bestHunt}</b>
      </div>
    </section>

    <section class="panel-block install-block" data-install-block>
      <div class="block-head"><h3>Sur votre téléphone</h3><span class="muted">PWA</span></div>
      <p class="muted small">
        Installez CORPS sur l'écran d'accueil : ouverture plein écran, icône dédiée
        et accès hors ligne après la première visite.
      </p>
      <button class="btn btn-ghost small" data-install>
        <svg viewBox="0 0 24 24" width="14" height="14" fill="none"><path d="M12 3v12m0 0 4-4m-4 4-4-4" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/><path d="M5 17v2.5h14V17" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg>
        Installer l'application
      </button>
    </section>

    <section class="panel-block credits-block">
      <div class="block-head"><h3>Sources &amp; crédits</h3></div>
      <p class="muted small">
        Anatomie 3D dérivée de <strong>BodyParts3D 4.0</strong> (Database Center for Life Science,
        licence CC BY 4.0), complétée pour la thyroïde, le grand dorsal, les abdominaux et les
        obliques par des maillages <strong>Z-Anatomy</strong> (licence CC BY-SA 4.0), avec une
        anatomie procédurale de secours. Les maillages combinés sont distribués sous CC BY-SA 4.0&nbsp;;
        le code reste sous MIT. Contenus pédagogiques originaux. Inspiré par des projets libres
        d'anatomie 3D&nbsp;:
      </p>
      <ul class="credit-list">
        <li>
          <a href="https://dbarchive.biosciencedbc.jp/en/bodyparts3d/download.html" target="_blank" rel="noopener noreferrer">BodyParts3D 4.0</a>
          <span>maillages anatomiques — © The Database Center for Life Science, CC BY 4.0</span>
        </li>
        <li>
          <a href="https://github.com/ashemag/human-atlas" target="_blank" rel="noopener noreferrer">ashemag/human-atlas</a>
          <span>vue éclatée, isolement, comparaison sain / malade</span>
        </li>
        <li>
          <a href="https://github.com/Z-Anatomy/Models-of-human-anatomy" target="_blank" rel="noopener noreferrer">Z-Anatomy</a>
          <span>thyroïde, grand dorsal, abdominaux, obliques — CC BY-SA 4.0</span>
        </li>
        <li>
          <a href="https://anatomyatelier.org/" target="_blank" rel="noopener noreferrer">anatomyatelier.org</a>
          <span>inspiration pédagogique</span>
        </li>
      </ul>
      <p class="muted small">
        Code source&nbsp;:
        <a href="https://github.com/Tasour/corps-humain" target="_blank" rel="noopener noreferrer">github.com/Tasour/corps-humain</a>
      </p>
    </section>

    <p class="disclaimer">Outil pédagogique de visualisation. Il ne remplace ni un diagnostic ni un avis médical.</p>
  `;
}

export function renderEntity(entry, related, { isolated = false } = {}) {
  const isBone = entry.kind === "bone";
  const isMuscle = entry.kind === "muscle";
  const sys = SYSTEM_MAP[entry.system];
  const role = isBone ? entry.role : isMuscle ? entry.role : entry.function;

  return `
    <button class="back-link" data-back>← Retour</button>
    <div class="entity-head">
      <div class="entity-mark ${entry.kind}" style="--c:${entry.color}">
        ${isBone ? "OS" : isMuscle ? "MU" : "OR"}
      </div>
      <div>
        <div class="badges">
          <span class="badge" style="--c:${sys.color}"><i></i>${sys.name}</span>
          <span class="badge ghost">${isBone ? "Squelette" : isMuscle ? "Muscle" : entry.region}</span>
        </div>
        <h2>${entry.name}</h2>
        <span class="latin">${entry.latin}</span>
      </div>
    </div>

    <div class="entity-actions">
      <button class="btn btn-ghost small" data-focus="${entry.id}">
        <svg viewBox="0 0 24 24" width="14" height="14" fill="none"><circle cx="12" cy="12" r="3" stroke="currentColor" stroke-width="1.8"/><path d="M12 2v4M12 18v4M2 12h4M18 12h4" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg>
        Focaliser
      </button>
      <button class="btn btn-ghost small ${isolated ? "active" : ""}" data-isolate="${entry.id}" aria-pressed="${isolated}">
        <svg viewBox="0 0 24 24" width="14" height="14" fill="none"><path d="M12 3 20 7v10l-8 4-8-4V7l8-4Z" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/><path d="m4 7 8 4 8-4M12 11v10" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/></svg>
        ${isolated ? "Tout afficher" : "Isoler"}
      </button>
      <button class="btn btn-ghost small" data-system-jump="${entry.system}">
        Voir le système
      </button>
    </div>

    <section class="panel-block tight">
      <h3>${isBone ? "Rôle" : isMuscle ? "Rôle" : "Fonction"}</h3>
      <p class="lead">${role}</p>
      <p>${entry.description}</p>
    </section>

    <div class="funfact">
      <span class="ff-label">LE SAVIEZ-VOUS ?</span>
      <p>${entry.funFact}</p>
    </div>

    <section class="panel-block">
      <div class="block-head"><h3>Pathologies associées</h3><span class="muted">${related.length}</span></div>
      ${
        related.length
          ? `<div class="mini-list">${related
              .map(
                (d) => `
              <button class="mini-disease" data-disease="${d.id}" style="--c:${systemColor(d.system)}">
                <span class="mini-dot"></span>
                <span><strong>${d.name}</strong><em>${d.tagline}</em></span>
                <b>›</b>
              </button>`,
              )
              .join("")}</div>`
          : `<p class="muted small">Aucune pathologie de cette démonstration ne cible directement cet élément. Explorez les autres organes du système ${sys.name.toLowerCase()}.</p>`
      }
    </section>

    ${
      entry.kind === "organ"
        ? `<section class="panel-block tight"><h3>Repères</h3><div class="meta-grid">
            <div><span>Région</span><b>${entry.region}</b></div>
            <div><span>Système</span><b>${sys.name}</b></div>
            <div><span>Nom latin</span><b>${entry.latin}</b></div>
            <div><span>Pathologies</span><b>${related.length}</b></div>
          </div></section>`
        : ""
    }
  `;
}

function stageIndex(severity) {
  if (severity <= 0.01) return -1;
  return Math.min(2, Math.floor(severity * 3));
}

export function renderDisease(disease, severity, entries, { comparing = false } = {}) {
  const sys = SYSTEM_MAP[disease.system];
  const stages = disease.stages;
  const idx = stageIndex(severity);
  const v = vitalsAt(disease, severity);
  const stage = idx >= 0 ? stages[idx] : null;

  return `
    <button class="back-link" data-back>← Retour</button>

    <div class="disease-head">
      <div class="badges">
        <span class="badge" style="--c:${sys.color}"><i></i>${sys.name}</span>
        <span class="badge ghost">${disease.course}</span>
        <span class="badge ghost">${disease.frequency}</span>
      </div>
      <h2>${disease.name}</h2>
      <p class="tagline">${disease.tagline}</p>
    </div>

    <div class="severity-card">
      <div class="sev-head">
        <span>Gravité simulée</span>
        <b><span id="sev-value">${Math.round(severity * 100)}</span> %</b>
      </div>
      <input id="severity" class="range" type="range" min="0" max="100" step="1" value="${Math.round(severity * 100)}" aria-label="Gravité de la pathologie" />
      <div class="sev-track-labels">
        <span class="${idx < 0 ? "on" : ""}">Sain</span>
        ${stages.map((s, i) => `<span class="${idx === i ? "on" : ""}">${s.label}</span>`).join("")}
      </div>
      <div class="sev-note" id="sev-note">
        ${
          stage
            ? `<b>${stage.label}</b><p>${stage.text}</p>`
            : `<b>État physiologique normal</b><p>Faites glisser le curseur pour déclencher la pathologie sur le modèle.</p>`
        }
      </div>
      <button class="btn btn-ghost small compare-btn ${comparing ? "active" : ""}" data-compare aria-pressed="${comparing}">
        <svg viewBox="0 0 24 24" width="14" height="14" fill="none"><path d="M12 3v18M7 7 3 12l4 5M17 7l4 5-4 5" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/></svg>
        ${comparing ? "Revoir la pathologie" : "Comparer sain / malade"}
      </button>
    </div>

    <div class="vitals-inline">
      <div><span>FC</span><b class="${v.hr > 100 ? "rose" : ""}">${v.hr}</b><em>bpm</em></div>
      <div><span>SpO₂</span><b class="${v.spo2 < 92 ? "rose" : ""}">${v.spo2}</b><em>%</em></div>
      <div><span>FR</span><b class="${v.rr > 20 ? "amber" : ""}">${v.rr}</b><em>/min</em></div>
      <div><span>TA</span><b>${v.sbp}/${v.dbp}</b><em>mmHg</em></div>
      <div><span>T°</span><b class="${v.temp > 37.6 ? "amber" : ""}">${v.temp.toFixed(1).replace(".", ",")}</b><em>°C</em></div>
    </div>

    <section class="panel-block">
      <div class="block-head"><h3>Impact sur le corps</h3><span class="muted">temps réel</span></div>
      <div class="effects">
        ${disease.effects
          .map((e) => {
            const entry = e.target;
            const pct = Math.round(e.amount * severity * 100);
            return `
            <div class="effect" data-organ="${entry}">
              <div class="effect-head">
                <strong>${entries[entry]?.name || entry}</strong>
                <span class="effect-tag">${EFFECT_LABELS[e.type] || e.type}</span>
                <b class="effect-pct">${pct}%</b>
              </div>
              <div class="bar"><i class="effect-bar" data-amount="${e.amount}" style="width:${pct}%"></i></div>
              <p>${e.note}</p>
            </div>`;
          })
          .join("")}
      </div>
      <p class="sim-hint">
        <span class="pulse-dot"></span> Le modèle 3D et le moniteur se mettent à jour avec la gravité.
      </p>
    </section>

    <section class="panel-block">
      <h3>Ce qui se passe</h3>
      <p>${disease.mechanism}</p>
      <p class="muted">${disease.description}</p>
    </section>

    <section class="panel-block">
      <h3>Symptômes</h3>
      <div class="chips">
        ${disease.symptoms.map((s) => `<span class="chip symptom">${s}</span>`).join("")}
      </div>
    </section>

    <div class="folds">
      <details class="fold">
        <summary><span>Causes</span><b>${disease.causes.length}</b></summary>
        <ul>${disease.causes.map((c) => `<li>${c}</li>`).join("")}</ul>
      </details>
      <details class="fold">
        <summary><span>Prises en charge</span><b>${disease.treatments.length}</b></summary>
        <ul class="check">${disease.treatments.map((c) => `<li>${c}</li>`).join("")}</ul>
        <p class="fold-note">Information pédagogique, pas une prescription.</p>
      </details>
      <details class="fold">
        <summary><span>Prévention</span><b>${disease.prevention.length}</b></summary>
        <ul class="shield">${disease.prevention.map((c) => `<li>${c}</li>`).join("")}</ul>
      </details>
    </div>

    <div class="funfact">
      <span class="ff-label">À RETENIR</span>
      <p>${disease.fact}</p>
    </div>

    <div class="entity-actions end">
      <button class="btn btn-ghost small" data-focus="${disease.effects[0].target}">Voir l'organe atteint</button>
      <button class="btn btn-primary small" data-quiz>Me tester</button>
    </div>

    <p class="disclaimer">Outil pédagogique. En cas de symptômes réels, consultez un professionnel de santé.</p>
  `;
}

export function diseaseStageText(disease, severity) {
  const idx = stageIndex(severity);
  return idx >= 0
    ? { title: disease.stages[idx].label, text: disease.stages[idx].text }
    : { title: "État physiologique normal", text: "Faites glisser le curseur pour déclencher la pathologie sur le modèle." };
}
