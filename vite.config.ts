import { defineConfig, type PreviewServer, type ViteDevServer } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'node:path';

// Match static hosting's directory redirect when checking /card locally as well.
function redirectCardDirectory(server: ViteDevServer | PreviewServer) {
  server.middlewares.use((request, response, next) => {
    if (request.url?.split('?')[0] !== '/card') { next(); return; }
    response.writeHead(301, { Location: request.url.replace('/card', '/card/') });
    response.end();
  });
}

export default defineConfig({
  plugins: [react(), { name: 'card-directory', configureServer: redirectCardDirectory, configurePreviewServer: redirectCardDirectory }],
  base: './',
  build: {
    rollupOptions: {
      input: { portfolio: resolve(__dirname, 'index.html'), english: resolve(__dirname, 'index.en.html'), card: resolve(__dirname, 'card/index.html') },
    },
  },
  server: { port: 5173, strictPort: true },
});
