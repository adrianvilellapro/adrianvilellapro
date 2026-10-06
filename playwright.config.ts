import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  workers: 3,
  reporter: 'list',
  use: { baseURL: 'http://127.0.0.1:4173/adrianvilellapro/', colorScheme: 'light', screenshot: 'only-on-failure', trace: 'retain-on-failure' },
  projects: [
    { name: 'chrome-desktop', use: { browserName: 'chromium', channel: 'chrome', viewport: { width: 1440, height: 1000 } } },
    { name: 'chrome-tablet', use: { browserName: 'chromium', channel: 'chrome', viewport: { width: 768, height: 1024 }, hasTouch: true } },
    { name: 'chrome-mobile', use: { browserName: 'chromium', channel: 'chrome', viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true } },
    { name: 'edge-desktop', use: { browserName: 'chromium', channel: 'msedge', viewport: { width: 1366, height: 900 } } },
    { name: 'firefox-desktop', use: { browserName: 'firefox', viewport: { width: 1440, height: 1000 } } },
    { name: 'webkit-desktop', use: { browserName: 'webkit', viewport: { width: 1440, height: 1000 } } },
    { name: 'webkit-mobile', use: { browserName: 'webkit', viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true } },
  ],
  webServer: { command: 'node scripts/serve-build.mjs', url: 'http://127.0.0.1:4173/adrianvilellapro/', reuseExistingServer: false },
});
