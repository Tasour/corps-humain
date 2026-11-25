/* Vérifie la transition d'observation de façon déterministe via stepTween. */
import { chromium } from 'playwright';

const browser = await chromium.launch({ headless: true });
const page = await browser.newPage({ viewport: { width: 1200, height: 900 } });
await page.goto('http://127.0.0.1:8901/?sex=f&capture=1', { waitUntil: 'domcontentloaded' });
await page.waitForFunction(() => window.__corps && /visible/.test(
  document.getElementById('corps-info').textContent), { timeout: 120000 });

const result = await page.evaluate(() => {
  const c = window.__corps;
  const read = () => ({
    y: +c.controls.target.toArray()[1].toFixed(4),
    zoom: +c.camera.zoom.toFixed(4),
    pivot: document.getElementById('pivot-indicator').textContent,
  });
  const initial = read();
  c.observe('head');
  const started = read();
  const mid = (c.stepTween(350), read());
  const final = (c.stepTween(700), read());
  return { initial, started, mid, final };
});

console.log(JSON.stringify(result, null, 1));
const { initial, started, mid, final } = result;
const ok = [];
ok.push(['départ inchangé', Math.abs(initial.y - started.y) < 1e-6]);
ok.push(['transition intermédiaire', mid.y > initial.y + 0.05 && mid.y < final.y - 0.05]);
ok.push(['zoom intermédiaire', mid.zoom > initial.zoom + 0.05 && mid.zoom < final.zoom - 0.05]);
ok.push(['cible finale tête', Math.abs(final.y - 1.553) < 0.02]);
ok.push(['zoom final plein cadre', final.zoom > 6 && final.zoom <= 20]);
ok.push(['indicateur', final.pivot.includes('tête')]);
let failed = false;
for (const [label, pass] of ok) {
  console.log(`${pass ? 'OK' : 'ECHEC'} — ${label}`);
  if (!pass) failed = true;
}
await browser.close();
if (failed) process.exitCode = 1;
else console.log("OK transition d'observation vérifiée");
