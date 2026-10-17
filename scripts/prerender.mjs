import { readFile, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { createServer } from 'vite';

// Generate the same React content at build time, without a browser or a server in production.
const output = process.argv[2];
if (!['dist', 'docs'].includes(output)) throw new Error('Expected build directory: dist or docs');
const server = await createServer({ server: { middlewareMode: true, hmr: false }, appType: 'custom' });
try {
  const { render, siteUrl } = await server.ssrLoadModule('/src/entry-server.tsx');
  for (const language of ['es', 'en']) {
    const { html, structuredData } = render(language);
    const filename = resolve(output, language === 'es' ? 'index.html' : 'index.en.html');
    const template = (await readFile(filename, 'utf8')).replace(/\r\n?/g, '\n');
    if (!template.includes('<div id="root"></div>')) throw new Error('Missing empty React root in build');
    const json = JSON.stringify(structuredData).replaceAll('<', '\\u003c');
    const page = template.replace('<div id="root"></div>', () => `<div id="root">${html}</div>`)
      .replace('</head>', () => `<script type="application/ld+json">${json}</script></head>`);
    await writeFile(filename, page);
  }
  const { render: renderCard } = await server.ssrLoadModule('/src/card/entry-server.tsx');
  const cardFile = resolve(output, 'card/index.html');
  const cardTemplate = (await readFile(cardFile, 'utf8')).replace(/\r\n?/g, '\n');
  if (!cardTemplate.includes('<div id="root"></div>')) throw new Error('Missing empty card root in build');
  await writeFile(cardFile, cardTemplate.replace('<div id="root"></div>', () => `<div id="root">${renderCard()}</div>`));
  await writeFile(resolve(output, 'sitemap.xml'), `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"><url><loc>${siteUrl}</loc></url><url><loc>${siteUrl}index.en.html</loc></url></urlset>\n`);
  console.log(`HTML completo en español e inglés, perfiles estructurados y sitemap generados en ${output}/.`);
} finally {
  await server.close();
}
