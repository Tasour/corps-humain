const TAU = Math.PI * 2;

function gauss(x, c, w) {
  const d = (x - c) / w;
  return Math.exp(-d * d);
}

export class VitalsMonitor {
  constructor(canvas, els) {
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d");
    this.w = canvas.width;
    this.h = canvas.height;
    this.els = els;
    this.samples = new Array(272).fill(0);
    this.respSamples = new Array(272).fill(0.5);
    this.phase = 0.32;
    this.respPhase = 0;
    this.display = { hr: 72, spo2: 98, rr: 14, sbp: 120, dbp: 80, temp: 36.8 };
    this.time = 0;
    this.uiTimer = 0;
    this.irregular = false;
    this.severity = 0;
    this.diseaseName = "";

    for (let i = 0; i < 60; i++) this._step(1 / 60);
  }

  setDisease(disease, severity) {
    this.diseaseName = disease ? disease.name : "";
    this.severity = severity;
    this.irregular = !!(
      disease &&
      ["infarctus", "insuffisance_cardiaque", "epilepsie"].includes(disease.id) &&
      severity > 0.35
    );
    this._note();
  }

  _note() {
    const note = this.els.note;
    if (!note) return;
    if (!this.diseaseName) {
      note.textContent = "Sujet sain · valeurs de repos";
      note.classList.remove("warn");
    } else if (this.severity <= 0.02) {
      note.textContent = "Gravité 0 % · état physiologique normal";
      note.classList.remove("warn");
    } else {
      note.textContent = `${this.diseaseName} · gravité ${Math.round(this.severity * 100)} %`;
      note.classList.toggle("warn", this.severity > 0.55);
    }
  }

  update(dt, vitals, disease, severity) {
    this.severity = severity;
    this.irregular = !!(
      disease &&
      ["infarctus", "insuffisance_cardiaque", "epilepsie"].includes(disease.id) &&
      severity > 0.35
    );
    const k = Math.min(1, dt * 4);
    const target = vitals || this.display;
    for (const key of Object.keys(this.display)) {
      this.display[key] += (target[key] - this.display[key]) * k;
    }

    this.time += dt;
    const steps = Math.max(1, Math.min(8, Math.round(dt * 120)));
    for (let i = 0; i < steps; i++) this._step(dt / steps);

    this.uiTimer += dt;
    if (this.uiTimer > 0.18) {
      this.uiTimer = 0;
      this._updateUI();
    }

    this._draw();
  }

  _step(dt) {
    const hr = this.display.hr || 72;
    let jitter = 1;
    if (this.irregular) {
      jitter = 1 + Math.sin(this.time * 5.3) * 0.22 + Math.sin(this.time * 2.1) * 0.12;
    } else {
      jitter = 1 + Math.sin(this.time * 0.55) * 0.02;
    }
    this.phase += (dt * hr * jitter) / 60;
    this.phase %= 1;
    const p = this.phase;

    let v =
      0.09 * gauss(p, 0.14, 0.026) -
      0.07 * gauss(p, 0.268, 0.012) +
      0.95 * gauss(p, 0.302, 0.0125) -
      0.26 * gauss(p, 0.335, 0.014) +
      0.24 * gauss(p, 0.6, 0.042);
    if (this.irregular && p > 0.05 && p < 0.12) v += Math.sin(this.time * 24) * 0.05;
    this.samples.push(v);
    this.samples.shift();

    const rr = this.display.rr || 14;
    this.respPhase += (dt * rr * TAU) / 60;
    this.respSamples.push(Math.sin(this.respPhase));
    this.respSamples.shift();
  }

  _updateUI() {
    const d = this.display;
    if (!this.els.hr) return;
    this.els.hr.textContent = Math.round(d.hr);
    this.els.spo2.textContent = Math.round(d.spo2);
    this.els.rr.textContent = Math.round(d.rr);
    this.els.bp.textContent = `${Math.round(d.sbp)}/${Math.round(d.dbp)}`;
    this.els.temp.textContent = d.temp.toFixed(1).replace(".", ",");
    this.els.hr.style.color = d.hr > 100 ? "var(--rose)" : d.hr < 60 ? "var(--blue)" : "";
    this.els.spo2.style.color = d.spo2 < 92 ? "var(--rose)" : "";
    this.els.temp.style.color = d.temp > 37.6 ? "var(--amber)" : "";
    this._note();
  }

  _draw() {
    const ctx = this.ctx;
    const w = this.w;
    const h = this.h;
    ctx.clearRect(0, 0, w, h);

    /* grid */
    ctx.strokeStyle = "rgba(103, 232, 249, 0.075)";
    ctx.lineWidth = 1;
    for (let x = 0; x <= w; x += 26) {
      ctx.beginPath();
      ctx.moveTo(x + 0.5, 0);
      ctx.lineTo(x + 0.5, h);
      ctx.stroke();
    }
    for (let y = 0; y <= h; y += 26) {
      ctx.beginPath();
      ctx.moveTo(0, y + 0.5);
      ctx.lineTo(w, y + 0.5);
      ctx.stroke();
    }

    /* ECG trace */
    const mid = h * 0.49;
    const amp = h * 0.33;
    const len = this.samples.length;
    const stepX = w / (len - 1);
    ctx.save();
    ctx.strokeStyle = "#5ef2d0";
    ctx.lineWidth = 2;
    ctx.shadowColor = "rgba(94, 242, 208, 0.85)";
    ctx.shadowBlur = 9;
    ctx.beginPath();
    for (let i = 0; i < len; i++) {
      const x = i * stepX;
      const y = mid - this.samples[i] * amp;
      if (i === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }
    ctx.stroke();
    ctx.restore();

    /* respiration trace */
    const rMid = h * 0.875;
    const rAmp = h * 0.055;
    ctx.save();
    ctx.strokeStyle = "rgba(103, 232, 249, 0.45)";
    ctx.lineWidth = 1.6;
    ctx.beginPath();
    for (let i = 0; i < len; i++) {
      const x = i * stepX;
      const y = rMid - this.respSamples[i] * rAmp;
      if (i === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }
    ctx.stroke();
    ctx.restore();

    /* head dot */
    const last = this.samples[len - 1];
    const dotY = mid - last * amp;
    ctx.fillStyle = "#d9fff6";
    ctx.shadowColor = "#5ef2d0";
    ctx.shadowBlur = 12;
    ctx.beginPath();
    ctx.arc(w - 2, dotY, 2.6, 0, TAU);
    ctx.fill();
    ctx.shadowBlur = 0;

    /* scale labels */
    ctx.fillStyle = "rgba(126, 148, 171, 0.75)";
    ctx.font = "10px ui-monospace, SFMono-Regular, monospace";
    ctx.fillText("ECG", 3, 12);
    ctx.fillText("RESP", 3, h - 4);
  }
}
