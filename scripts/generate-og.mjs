/**
 * Genera le immagini Open Graph (1200×630) in public/og/.
 * Utilizza un template SVG semplice + il logo della società.
 * Per immagini finali di qualità sostituire i file in public/og/.
 *
 * Uso: npm run og
 */
import { mkdirSync, readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const outDir = join(root, 'public', 'og');
mkdirSync(outDir, { recursive: true });

const logo = readFileSync(join(root, 'public', 'logo_white.svg'));

const variants = [
  { name: 'default', title: 'ASD JUDO KARATE SOMMAVILLA', subtitle: 'Judo · Karate · Difesa Personale · Psicomotricità' },
  { name: 'judo', title: 'JUDO', subtitle: 'A Villafranca di Verona e Sommacampagna' },
  { name: 'karate', title: 'KARATE', subtitle: 'Tecnica e controllo a Sommacampagna' },
  { name: 'difesa-personale', title: 'DIFESA PERSONALE', subtitle: 'Reagisci · Difenditi · Controlla · Liberati' },
  { name: 'psicomotricita', title: 'PSICOMOTRICITÀ', subtitle: 'Coordinazione e gioco per i 4-5 anni' },
];

function svgTemplate(title, subtitle) {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630">
  <defs>
    <pattern id="grid" width="80" height="80" patternUnits="userSpaceOnUse">
      <path d="M80 0 H0 V80" fill="none" stroke="#ffffff" stroke-opacity="0.04" stroke-width="1"/>
    </pattern>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#1b1e23"/>
      <stop offset="1" stop-color="#0d0f12"/>
    </linearGradient>
  </defs>
  <rect width="1200" height="630" fill="url(#bg)"/>
  <rect width="1200" height="630" fill="url(#grid)"/>
  <rect x="64" y="64" width="96" height="96" fill="none" stroke="#c8102e" stroke-width="5"/>
  <circle cx="940" cy="180" r="130" fill="none" stroke="#f5f3ee" stroke-opacity="0.08" stroke-width="2"/>
  <text x="64" y="430" font-family="Arial, Helvetica, sans-serif" font-size="52" font-weight="800" fill="#f5f3ee" letter-spacing="4">${title}</text>
  <text x="64" y="495" font-family="Arial, Helvetica, sans-serif" font-size="26" fill="#c8102e" font-weight="700" letter-spacing="6">${subtitle}</text>
  <text x="64" y="560" font-family="Arial, Helvetica, sans-serif" font-size="20" fill="#8a919c" letter-spacing="3">ASD Judo Karate Sommavilla · Villafranca di Verona e Sommacampagna</text>
</svg>`;
}

const logoResized = await sharp(logo).resize({ width: 130 }).png().toBuffer();

for (const variant of variants) {
  const svg = svgTemplate(variant.title, variant.subtitle);
  const base = await sharp(Buffer.from(svg)).png().toBuffer();
  await sharp(base)
    .composite([{ input: logoResized, left: 64, top: 96 }])
    .jpeg({ quality: 85 })
    .toFile(join(outDir, `${variant.name}.jpg`));
  console.log(`generato public/og/${variant.name}.jpg`);
}
