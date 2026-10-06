import { createServer } from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import { resolve, extname, sep } from 'node:path';

// Local verification at the same subdirectory used by GitHub Pages.
const root = resolve(process.env.BUILD_DIR || 'dist');
const mount = '/adrianvilellapro/';
const types = { '.html': 'text/html; charset=utf-8', '.js': 'text/javascript', '.css': 'text/css', '.svg': 'image/svg+xml', '.webp': 'image/webp', '.png': 'image/png', '.jpg': 'image/jpeg', '.woff2': 'font/woff2', '.txt': 'text/plain', '.xml': 'application/xml' };
createServer(async (request, response) => {
  const pathname = decodeURIComponent(new URL(request.url, 'http://localhost').pathname);
  if (pathname === '/') { response.writeHead(302, { Location: mount }); response.end(); return; }
  if (!pathname.startsWith(mount)) { response.writeHead(404); response.end(); return; }
  let filename = resolve(root, pathname.slice(mount.length) || 'index.html');
  if (!filename.startsWith(root + sep)) { response.writeHead(403); response.end(); return; }
  try {
    if ((await stat(filename)).isDirectory()) {
      if (!pathname.endsWith('/')) { response.writeHead(301, { Location: `${pathname}/${new URL(request.url, 'http://localhost').search}` }); response.end(); return; }
      filename = resolve(filename, 'index.html');
    }
    if (!(await stat(filename)).isFile()) throw new Error('Not a file');
    response.writeHead(200, { 'Content-Type': extname(filename) === '.pdf' ? 'application/pdf' : types[extname(filename)] || 'application/octet-stream' });
    response.end(await readFile(filename));
  } catch { response.writeHead(404); response.end('Not found'); }
}).listen(4173, '127.0.0.1', () => console.log(`Build local: http://127.0.0.1:4173${mount}`));
