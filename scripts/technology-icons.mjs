import * as icons from 'simple-icons';
import { mkdir, writeFile, copyFile } from 'node:fs/promises';

const definitions = {
  React: ['React'], 'Next.js': ['Nextdotjs'], Angular: ['Angular', 'DD0031'], TypeScript: ['Typescript'], JavaScript: ['Javascript'],
  HTML: ['Html5'], CSS: ['Css'], Tailwind: ['Tailwindcss'], Sass: ['Sass'], Vite: ['Vite'],
  'Node.js': ['Nodedotjs'], Express: ['Express'], JWT: ['Jsonwebtokens'], 'Google OAuth': ['Google'],
  PostgreSQL: ['Postgresql'], MySQL: ['Mysql'], MongoDB: ['Mongodb'], Prisma: ['Prisma'], Sequelize: ['Sequelize'], Docker: ['Docker'],
  Git: ['Git'], GitHub: ['Github'], Vercel: ['Vercel'], Render: ['Render'], Supabase: ['Supabase'],
  Cloudinary: ['Cloudinary'], 'Three.js': ['Threedotjs'], WebGL: ['Webgl'], 'Chrome Extensions': ['Googlechrome'], Figma: ['Figma'],
};
const data = {};
await mkdir('public/technology-icons', { recursive: true });
for (const [name, [slug, override]] of Object.entries(definitions)) {
  const icon = icons[`si${slug}`];
  if (!icon) throw new Error(`Missing brand: ${name}`);
  const color = `#${override || icon.hex}`;
  const file = `${icon.slug}.svg`;
  await writeFile(`public/technology-icons/${file}`, `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="${color}"><path d="${icon.path}"/></svg>`);
  data[name] = { file, color, label: name === 'Tailwind' ? 'Tailwind CSS' : name === 'JWT' ? 'JSON Web Tokens (JWT)' : name };
}
data['Open Food Facts'] = { file: 'openfoodfacts.svg', color: '#8b572a', label: 'Open Food Facts' };
await writeFile('src/data/technology-icons.json', JSON.stringify(data, null, 2) + '\n');
await copyFile('node_modules/simple-icons/LICENSE.md', 'public/technology-icons/LICENSE.md');
console.log(`${Object.keys(data).length} logos preparados para servir en local.`);
