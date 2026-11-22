import { chromium } from 'playwright';
import assert from 'node:assert/strict';

const url = process.env.DEMO_URL || 'http://127.0.0.1:8899/demo-corps.html';
const browser = await chromium.launch({ headless: true });
const page = await browser.newPage({ viewport: { width: 800, height: 900 } });
const errors = [];
page.on('pageerror', (e) => errors.push(e.message));
await page.goto(url, { waitUntil: 'load' });
await page.waitForFunction(() => /animation\(s\)/.test(
  document.getElementById('info')?.textContent || ''), null, { timeout: 30000 });
const info = await page.textContent('#info');
assert.match(info, /6 animation\(s\)/);
assert.equal(errors.length, 0, errors.join('\n'));
await page.screenshot({ path: 'docs/harness/demo-corps.png', fullPage: true });
await browser.close();
console.log('OK — démo web vérifiée');
