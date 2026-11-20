import { DISEASES, EFFECT_LABELS } from "./data/diseases.js";
import { SYSTEM_MAP } from "./data/systems.js";
import { withArticle, systemColor } from "./ui.js";

const shuffle = (arr) => {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
};

const pick = (arr, n) => shuffle(arr).slice(0, n);

function getBest(key) {
  try {
    return Number(localStorage.getItem(key)) || 0;
  } catch {
    return 0;
  }
}
function setBest(key, value) {
  try {
    const cur = getBest(key);
    if (value > cur) localStorage.setItem(key, String(value));
  } catch {
    /* ignore */
  }
}

export class DiagnosticGame {
  constructor(opts) {
    this.opts = opts;
    this.score = 0;
    this.streak = 0;
    this.caseNo = 0;
    this.answered = 0;
    this.best = getBest("corps.best.diag");
    this.current = null;
    this.recent = [];
    this.active = false;
  }

  start() {
    this.active = true;
    this.score = 0;
    this.streak = 0;
    this.caseNo = 0;
    this.answered = 0;
    this.recent = [];
    this.nextCase();
  }

  nextCase() {
    const pool = DISEASES.filter((d) => !this.recent.includes(d.id));
    const disease = pick(pool.length ? pool : DISEASES, 1)[0];
    this.recent.push(disease.id);
    if (this.recent.length > 6) this.recent.shift();

    const sameSystem = shuffle(
      DISEASES.filter((d) => d.system === disease.system && d.id !== disease.id),
    );
    const others = shuffle(DISEASES.filter((d) => d.id !== disease.id && d.system !== disease.system));
    const distractors = sameSystem.slice(0, 2);
    while (distractors.length < 3) distractors.push(others.pop());

    const options = shuffle([disease, ...distractors.slice(0, 3)]);
    this.current = {
      disease,
      options,
      symptoms: pick(disease.symptoms, 4),
      answered: false,
      chosen: null,
    };
    this.caseNo++;
    this.opts.clearBody();
    this.opts.onChange();
  }

  answer(id) {
    if (!this.current || this.current.answered) return;
    const c = this.current;
    c.answered = true;
    c.chosen = id;
    const correct = id === c.disease.id;
    let points = 0;
    if (correct) {
      points = 10 + this.streak * 2;
      this.score += points;
      this.streak++;
      this.answered++;
      setBest("corps.best.diag", this.score);
      this.best = getBest("corps.best.diag");
    } else {
      this.streak = 0;
    }
    c.points = points;
    c.correct = correct;

    this.opts.showDisease(c.disease, 0.7);
    if (this.opts.focusDisease) this.opts.focusDisease(c.disease);
    else this.opts.focus(c.disease.effects[0].target);
    this.opts.onChange();
    if (correct) this.opts.toast(`Bonne réponse · +${points} pts`, "ok");
    else this.opts.toast("Ce n'était pas le bon diagnostic", "err");
  }

  render(container) {
    if (!this.current) return;
    const { disease, options, symptoms, answered, chosen, correct, points } = this.current;
    const entries = this.opts.entries;
    const v = disease.vitals;
    const organNames = [...new Set(disease.effects.map((e) => entries[e.target]?.name || e.target))];

    const optionHtml = options
      .map((d, i) => {
        let cls = "option";
        if (answered) {
          if (d.id === disease.id) cls += " correct";
          else if (d.id === chosen) cls += " wrong";
          else cls += " faded";
        }
        return `<button class="${cls}" data-answer="${d.id}" ${answered ? "disabled" : ""}>
          <span class="letter">${String.fromCharCode(65 + i)}</span>
          <span class="opt-name">${d.name}</span>
          <span class="opt-sys" style="--c:${systemColor(d.system)}">${SYSTEM_MAP[d.system].name}</span>
        </button>`;
      })
      .join("");

    container.innerHTML = `
      <div class="quiz-head">
        <div>
          <span class="tag teal">PATHOLOGIES SIMULÉES</span>
          <h2>Cas clinique</h2>
        </div>
        <button class="icon-btn" data-quiz-exit aria-label="Quitter">✕</button>
      </div>

      <div class="quiz-stats">
        <div><span>Score</span><b>${this.score}</b></div>
        <div><span>Série</span><b>×${this.streak}</b></div>
        <div><span>Cas</span><b>${this.caseNo}</b></div>
        <div><span>Record</span><b>${this.best}</b></div>
      </div>

      <div class="quiz-case">
        <div class="case-label"><span class="pulse-dot"></span> LE PATIENT PRÉSENTE</div>
        <div class="chips quiz-symptoms">
          ${symptoms.map((s) => `<span class="chip symptom">${s}</span>`).join("")}
        </div>
        <div class="quiz-vitals">
          <div><span>FC</span><b>${v.hr}</b><em>bpm</em></div>
          <div><span>SpO₂</span><b>${v.spo2}</b><em>%</em></div>
          <div><span>FR</span><b>${v.rr}</b><em>/min</em></div>
          <div><span>T°</span><b>${v.temp.toFixed(1).replace(".", ",")}</b><em>°C</em></div>
        </div>
      </div>

      <p class="quiz-question">Quelle affection est décrite ?</p>
      <div class="options">${optionHtml}</div>

      ${
        answered
          ? `<div class="quiz-result ${correct ? "ok" : "bad"}">
              <div class="qr-head">
                <span class="qr-icon">${correct ? "✓" : "✕"}</span>
                <div>
                  <b>${correct ? "Diagnostic exact" : "Diagnostic manqué"}</b>
                  <span>${correct ? `+${points} points` : `La réponse était ${disease.name}`}</span>
                </div>
              </div>
              <p class="qr-mech">${disease.mechanism}</p>
              <div class="qr-organs">
                <span>Organes clés</span>
                ${disease.effects
                  .map((e) => {
                    const name = entries[e.target]?.name || e.target;
                    return `<button data-organ="${e.target}">${name} · ${EFFECT_LABELS[e.type] || e.type}</button>`;
                  })
                  .join("")}
              </div>
              <div class="qr-actions">
                <button class="btn btn-ghost small" data-focus="${disease.effects[0].target}">Voir sur le corps</button>
                <button class="btn btn-primary small" data-next>Cas suivant →</button>
              </div>
            </div>`
          : `<p class="quiz-hint">Une seule réponse. Chaque bonne réponse augmente votre série et votre score.</p>`
      }

      <p class="disclaimer">Cas pédagogiques fictifs. Ne posez jamais de diagnostic sur cette base.</p>
    `;

    container.querySelectorAll("[data-answer]").forEach((btn) => {
      btn.addEventListener("click", () => this.answer(btn.dataset.answer));
    });
    container.querySelector("[data-next]")?.addEventListener("click", () => this.nextCase());
    container.querySelector("[data-quiz-exit]")?.addEventListener("click", () => this.opts.exit());
    container.querySelector("[data-focus]")?.addEventListener("click", (e) => {
      this.opts.focus(e.currentTarget.dataset.focus);
    });
    container.querySelectorAll("[data-organ]").forEach((btn) => {
      btn.addEventListener("click", () => this.opts.openOrgan(btn.dataset.organ));
    });
  }

  finish() {
    this.active = false;
    this.opts.clearBody();
  }
}

export class OrganHunt {
  constructor({ entries, scene, els, toast, onFinish }) {
    this.entries = entries;
    this.scene = scene;
    this.els = els;
    this.toast = toast || (() => {});
    this.onFinish = onFinish || (() => {});
    this.active = false;
    this.lock = false;
    this.timeLeft = 90;
    this.duration = 90;
    this.score = 0;
    this.streak = 0;
    this.found = 0;
    this.target = null;
    this.lastTarget = null;
    const HUNTABLE = new Set([
      "cerveau",
      "cervelet",
      "moelle_epiniere",
      "coeur",
      "aorte",
      "poumons",
      "estomac",
      "foie",
      "intestin_grele",
      "colon",
      "reins",
      "vessie",
      "rate",
      "thyroide",
    ]);
    this.pool = Object.values(entries).filter((e) => e.kind === "organ" && HUNTABLE.has(e.id));
  }

  start() {
    this.active = true;
    this.lock = false;
    this.timeLeft = this.duration;
    this.score = 0;
    this.streak = 0;
    this.found = 0;
    this.lastTarget = null;
    this.els.hud.hidden = false;
    this.els.hud.classList.remove("finished");
    this.nextTarget();
  }

  nextTarget() {
    let candidates = this.pool.filter((e) => e.id !== this.lastTarget?.id);
    const entry = candidates[Math.floor(Math.random() * candidates.length)];
    this.target = entry;
    this.lastTarget = entry;
    this.els.name.textContent = withArticle(entry);
    this.els.sub.textContent = "Cliquez sur l'élément dans le corps 3D";
    this.updateHUD();
  }

  pick(id) {
    if (!this.active || this.lock || !this.target) return;
    const entry = this.entries[id];
    if (!entry) return;
    if (id === this.target.id) {
      this.lock = true;
      const points = 10 + this.streak * 3;
      this.score += points;
      this.streak++;
      this.found++;
      this.scene.flashEntry(id, true);
      this.toast(`Bien vu ! +${points} pts`, "ok");
      this.els.sub.textContent = `Exact — ${this.target.name}`;
      this.updateHUD();
      setTimeout(() => {
        this.lock = false;
        if (this.active) this.nextTarget();
      }, 620);
    } else {
      this.streak = 0;
      this.timeLeft = Math.max(0, this.timeLeft - 2);
      this.scene.flashEntry(id, false);
      const sys = SYSTEM_MAP[this.target.system]?.name || "";
      this.toast(`Raté · ${entry.name} n'est pas ${withArticle(this.target)}`, "err");
      this.els.sub.textContent = `Indice : ${sys} · ${this.target.region}`;
      this.updateHUD();
    }
  }

  update(dt) {
    if (!this.active) return;
    this.timeLeft -= dt;
    if (this.timeLeft <= 0) {
      this.timeLeft = 0;
      this.finish();
    }
    this.updateHUD();
  }

  updateHUD() {
    if (!this.els.hud) return;
    this.els.score.textContent = `${this.score} pt${this.score > 1 ? "s" : ""}`;
    const pct = Math.max(0, (this.timeLeft / this.duration) * 100);
    this.els.bar.style.width = `${pct}%`;
    this.els.bar.classList.toggle("low", this.timeLeft < 20);
    if (this.active && this.els.time) this.els.time.textContent = `${Math.ceil(this.timeLeft)}s`;
  }

  finish() {
    this.active = false;
    if (this.els.name) this.els.name.textContent = "Temps écoulé";
    if (this.els.sub) this.els.sub.textContent = `${this.found} élément${this.found > 1 ? "s" : ""} trouvé${this.found > 1 ? "s" : ""} · ${this.score} points`;
    this.els.hud?.classList.add("finished");
    this.toast(`Partie terminée · ${this.score} points`, "info");
    this.onFinish(this.score, this.found);
  }
}
