// Verifica veloce dei link interni nei file HTML generati.
import { readdirSync, readFileSync, statSync, existsSync } from 'node:fs';
import { join } from 'node:path';

const dist = join(process.cwd(), 'dist');
const files = [];
(function walk(d) {
  for (const f of readdirSync(d)) {
    const p = join(d, f);
    if (statSync(p).isDirectory()) walk(p);
    else if (p.endsWith('.html')) files.push(p);
  }
})(dist);

const bad = [];
const seen = new Set();
for (const f of files) {
  const html = readFileSync(f, 'utf8');
  const hrefs = [...html.matchAll(/href="([^"#][^"]*)"/g)].map((m) => m[1]);
  for (const h of hrefs) {
    if (
      h.startsWith('http') || h.startsWith('mailto') || h.startsWith('tel') ||
      h.startsWith('wa.me') || h.startsWith('data:') || h.startsWith('//')
    ) continue;
    if (!h.startsWith('/')) continue;
    const key = h.split('?')[0];
    if (seen.has(key)) continue;
    seen.add(key);
    const target = join(dist, key);
    const ok =
      existsSync(target) ||
      existsSync(target + '/index.html') ||
      existsSync(target + '.html') ||
      existsSync(target + '.svg') ||
      existsSync(target + '.jpg') ||
      existsSync(target + '.png') ||
      existsSync(target + '.webp') ||
      existsSync(target + '.avif');
    if (!ok) bad.push(f.replace(dist, '') + ' -> ' + h);
  }
}
console.log('Link interni rotti:');
console.log(bad.length ? bad.join('\n') : 'nessuno');
