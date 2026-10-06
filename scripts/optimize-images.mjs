import sharp from 'sharp';
import { mkdir, readdir, stat } from 'node:fs/promises';
import { resolve, parse } from 'node:path';

const source = resolve('public/portfolio-assets');
const target = resolve(source, 'optimized');
await mkdir(target, { recursive: true });
let originalBytes = 0;
let optimizedBytes = 0;
for (const filename of await readdir(source)) {
  if (!/\.(png|jpg)$/i.test(filename) || filename === 'fotoperfil.jpg') continue;
  const file = resolve(source, filename);
  const name = parse(filename).name;
  const logo = name.endsWith('-logo');
  const output = resolve(target, `${name}.webp`);
  await sharp(file).resize({ width: logo ? 96 : 1600, withoutEnlargement: true }).webp({ quality: 86, effort: 6 }).toFile(output);
  if (!logo) await sharp(file).resize({ width: 240, height: 150, fit: 'inside', withoutEnlargement: true }).webp({ quality: 75 }).toFile(resolve(target, `${name}-thumb.webp`));
  originalBytes += (await stat(file)).size;
  optimizedBytes += (await stat(output)).size;
}
console.log(`Imágenes principales: ${Math.round(originalBytes / 1024)} KB → ${Math.round(optimizedBytes / 1024)} KB. Originales conservados.`);
await sharp(resolve(source, 'fotoperfil.jpg')).resize({ width: 1050 }).webp({ quality: 88 }).toFile(resolve(target, 'fotoperfil.webp'));

// A code-authored typographic sharing card, matching the website identity.
const social = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630"><rect width="1200" height="630" fill="#f8f9fb"/><path d="M70 115h1060" stroke="#dde1e8"/><text x="70" y="80" font-family="Segoe UI,Arial,sans-serif" font-size="28" font-weight="700" fill="#20242e">Adrián Vilella<tspan fill="#2456d8">.</tspan></text><text x="70" y="198" font-family="Segoe UI,Arial,sans-serif" font-size="18" fill="#2456d8">DESARROLLADOR DE SOFTWARE JUNIOR · ALICANTE</text><text x="66" y="304" font-family="Segoe UI,Arial,sans-serif" font-size="70" font-weight="600" fill="#20242e">Del problema</text><text x="66" y="388" font-family="Segoe UI,Arial,sans-serif" font-size="70" font-weight="600" fill="#626976">al producto.</text><path d="M70 480h1060" stroke="#dde1e8"/><text x="70" y="538" font-family="Segoe UI,Arial,sans-serif" font-size="22" fill="#626976">Nutrivisor   /   WikiCodex   /   CrowdCompass</text><text x="1130" y="80" text-anchor="end" font-family="Segoe UI,Arial,sans-serif" font-size="16" fill="#626976">PORTFOLIO</text></svg>`;
await sharp(Buffer.from(social)).png().toFile(resolve('public/social-preview.png'));
