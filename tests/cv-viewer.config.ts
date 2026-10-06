import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: '.', testMatch: 'cv-viewer.check.ts', outputDir: '../.local/cv-test-results', fullyParallel: true, workers: 2, reporter: 'list',
  use: { baseURL: 'http://127.0.0.1:5174', screenshot: 'only-on-failure', trace: 'retain-on-failure' },
  projects: [
    { name: 'chrome-mobile', use: { browserName: 'chromium', channel: 'chrome', viewport: { width: 390, height: 664 }, isMobile: true, hasTouch: true } },
    { name: 'webkit-mobile', use: { browserName: 'webkit', viewport: { width: 390, height: 664 }, isMobile: true, hasTouch: true } },
    { name: 'firefox-desktop', use: { browserName: 'firefox', viewport: { width: 1440, height: 900 } } },
  ],
  webServer: { command: 'npm.cmd run dev -- --port 5174', url: 'http://127.0.0.1:5174/tests/fixtures/cv-viewer.html', reuseExistingServer: false },
});
