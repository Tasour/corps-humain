import { createHash } from 'node:crypto';
import { readFileSync, readdirSync, statSync } from 'node:fs';
import { join } from 'node:path';

const root = new URL('..', import.meta.url).pathname;
const checks = JSON.parse(readFileSync(join(root, 'docs/models/reference-checksums.json')));
for (const [key, expected] of Object.entries(checks.files)) {
  const ref = join(root, 'docs/models', key);
  const digest = createHash('sha256').update(readFileSync(ref)).digest('hex');
  if (digest !== expected) {
    throw new Error(`référence externe modifiée : ${key} ${digest} != ${expected}`);
  }
}

const writePattern = /(?:open|write|writeFileSync|dump)\([^)]*external-anatomy\.json[^)]*['"]w['"]/i;
for (const dir of ['scripts', 'tests']) {
  for (const name of readdirSync(join(root, dir))) {
    const path = join(root, dir, name);
    if (!statSync(path).isFile()) continue;
    const source = readFileSync(path, 'utf8');
    if (writePattern.test(source)) {
      throw new Error(`écriture interdite de la référence dans ${dir}/${name}`);
    }
  }
}

console.log('PASS intégrité de la référence externe');
