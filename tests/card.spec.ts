import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import { readFile } from 'node:fs/promises';
import { resolve } from 'node:path';

test('entrada directa, contenido estático y enlaces de la tarjeta', async ({ page, request, browser, baseURL }) => {
  const response = await request.get('card');
  expect(response.ok()).toBe(true);
  expect(response.url()).toMatch(/\/card\/$/);
  expect(await response.text()).toContain('Adrián Vilella Espony');
  const errors: string[] = [];
  const resources: string[] = [];
  page.on('pageerror', error => errors.push(error.message));
  page.on('request', request => resources.push(request.url()));
  await page.goto('card');
  await expect(page).toHaveTitle('Adrián Vilella | Contacto profesional');
  await expect(page.locator('h1')).toHaveText('Adrián Vilella Espony');
  await expect(page.getByText('Desarrollador de software junior', { exact: true })).toBeVisible();
  await expect(page.getByRole('link', { name: 'Portfolio' })).toHaveAttribute('href', 'https://adrianvilellapro.github.io/adrianvilellapro/');
  await expect(page.getByRole('link', { name: 'LinkedIn' })).toHaveAttribute('href', 'https://www.linkedin.com/in/adri%C3%A1n-vilella-espony-40a046410/?isSelfProfile=true');
  await expect(page.getByRole('link', { name: 'GitHub' })).toHaveAttribute('href', 'https://github.com/adrianvilellapro');
  await expect(page.getByRole('button', { name: 'Copiar email: adrian.vilella.pro@gmail.com' })).toBeVisible();
  await expect(page.getByText('Pulsa para copiar', { exact: true })).toBeVisible();
  await expect(page.getByRole('img', { name: 'Adrián Vilella Espony' })).toBeVisible();
  expect(await page.locator('.card-portrait img').evaluate((img: HTMLImageElement) => img.complete && img.naturalWidth > 0)).toBe(true);
  await expect(page.getByRole('link', { name: '640 652 203' })).toHaveAttribute('href', 'tel:+34640652203');
  for (const link of await page.locator('.card-professional-links a').all()) {
    await expect(link).toHaveAttribute('target', '_blank');
    await expect(link).toHaveAttribute('rel', 'noopener noreferrer');
  }
  expect(resources.some(url => /portfolio-.*\.(js|css)|CvViewer|\.pdf/.test(url))).toBe(false);
  expect(resources.filter(url => url.includes('portfolio-assets'))).toEqual([expect.stringMatching(/\/fotoperfil\.webp$/)]);
  expect(errors).toEqual([]);
  await expect(page.locator('meta[name="robots"]')).toHaveAttribute('content', 'noindex, follow');
  const context = await browser.newContext({ javaScriptEnabled: false, baseURL });
  try {
    const staticPage = await context.newPage();
    await staticPage.goto('card');
    await expect(staticPage.locator('h1')).toHaveText('Adrián Vilella Espony');
    await expect(staticPage.getByRole('link', { name: '640 652 203' })).toBeVisible();
  } finally { await context.close(); }
});

test('tarjeta compacta, reflow y tamaño táctil', async ({ page }) => {
  await page.goto('card/');
  for (const size of [{ width: 320, height: 568 }, { width: 360, height: 640 }, { width: 390, height: 664 }, { width: 430, height: 932 }, { width: 768, height: 1024 }, { width: 1440, height: 900 }, { width: 844, height: 390 }, { width: 568, height: 320 }]) {
    await page.setViewportSize(size);
    const dimensions = await page.evaluate(() => ({ width: document.documentElement.clientWidth, scrollWidth: document.documentElement.scrollWidth, scrollHeight: document.documentElement.scrollHeight }));
    expect(dimensions.scrollWidth).toBeLessThanOrEqual(dimensions.width);
    if (size.height >= 640) expect(dimensions.scrollHeight).toBeLessThanOrEqual(size.height);
    if (size.width === 320) expect(dimensions.scrollHeight).toBeLessThanOrEqual(size.height + 70);
    expect(await page.locator('.digital-card a, .digital-card button').evaluateAll(elements => elements.every(element => {
      const box = element.getBoundingClientRect();
      return box.width >= 44 && box.height >= 44;
    }))).toBe(true);
  }
  await page.setViewportSize({ width: 320, height: 568 });
  await page.addStyleTag({ content: '.digital-card h1, .digital-card p, .digital-card a, .digital-card button { font-size: 200% !important; }' });
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= document.documentElement.clientWidth)).toBe(true);
  expect(await page.locator('.card-professional-links a').evaluateAll(links => links.every(link => {
    const range = document.createRange();
    const label = [...link.childNodes].find(node => node.nodeType === Node.TEXT_NODE)!;
    range.selectNodeContents(label);
    return range.getBoundingClientRect().right <= link.getBoundingClientRect().right;
  }))).toBe(true);
  await expect(page.getByRole('link', { name: '640 652 203' })).toBeVisible();
});

test('CV real, descarga, teclado, foco, modo oscuro y accesibilidad', async ({ page, request }) => {
  await page.goto('card/');
  await expect(page.getByRole('dialog')).toHaveCount(0);
  await page.getByRole('button', { name: 'Ver CV', exact: true }).click();
  await expect(page.getByRole('dialog')).toBeVisible();
  await expect(page.locator('iframe')).toHaveAttribute('src', '../CV_Adrian_Vilella_Espony.pdf#view=FitH&navpanes=0');
  await expect(page.getByRole('button', { name: 'Descargar CV' })).toBeEnabled();
  const pdf = await request.get('CV_Adrian_Vilella_Espony.pdf');
  expect(pdf.ok()).toBe(true);
  expect(pdf.headers()['content-type']).toBe('application/pdf');
  const expectedPdf = await readFile(resolve('public/CV_Adrian_Vilella_Espony.pdf'));
  expect(await pdf.body()).toEqual(expectedPdf);
  await expect(page.getByRole('link', { name: 'Abrir en otra pestaña' })).toHaveAttribute('href', '../CV_Adrian_Vilella_Espony.pdf');
  const close = page.getByRole('button', { name: 'Cerrar', exact: true });
  await close.focus();
  await expect(close).toBeFocused();
  await close.press('Escape');
  await expect(page.getByRole('dialog')).toHaveCount(0);
  await expect(page.getByRole('button', { name: 'Ver CV', exact: true })).toBeFocused();
  await expect(page.locator('body')).not.toHaveCSS('overflow', 'hidden');
  const light = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21aa']).analyze();
  expect(light.violations).toEqual([]);
  await page.getByRole('button', { name: 'Activar modo oscuro' }).click();
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark');
  const dark = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21aa']).analyze();
  expect(dark.violations).toEqual([]);
  await page.getByRole('button', { name: 'Ver CV', exact: true }).click();
  const modal = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21aa']).analyze();
  expect(modal.violations).toEqual([]);
  await close.focus();
  await page.keyboard.press('Tab');
  expect(await page.evaluate(() => document.activeElement === document.body || !!document.activeElement?.closest('dialog'))).toBe(true);
  // Native PDF readers handle their own keyboard focus; the close button stays outside them.
  const pendingDownload = page.waitForEvent('download');
  await page.getByRole('button', { name: 'Descargar CV' }).click();
  const download = await pendingDownload;
  expect(await download.failure()).toBeNull();
  const stream = await download.createReadStream();
  const chunks: Buffer[] = [];
  for await (const chunk of stream!) chunks.push(Buffer.from(chunk));
  expect(Buffer.concat(chunks)).toEqual(expectedPdf);
  await page.getByRole('button', { name: 'Cerrar', exact: true }).click();
  await expect(page.getByRole('button', { name: 'Ver CV', exact: true })).toBeFocused();
  await page.screenshot({ path: `test-results/${test.info().project.name}-card-dark.png`, fullPage: true });
});

test('email copiado al pulsar y confirmación visible', async ({ page, context, browserName }) => {
  if (browserName === 'chromium') await context.grantPermissions(['clipboard-read', 'clipboard-write']);
  else await page.addInitScript(() => {
    let clipboard = '';
    Object.defineProperty(navigator, 'clipboard', { configurable: true, value: {
      writeText: async (value: string) => { clipboard = value; }, readText: async () => clipboard,
    } });
  });
  await page.goto('card/');
  const copy = page.getByRole('button', { name: 'Copiar email: adrian.vilella.pro@gmail.com' });
  await copy.focus();
  await page.keyboard.press('Enter');
  await expect(page.getByRole('status')).toHaveText('Email copiado');
  expect(await page.evaluate(() => navigator.clipboard.readText())).toBe('adrian.vilella.pro@gmail.com');
  await expect(copy).toBeFocused();
  await expect(page.getByRole('status')).toHaveText('Pulsa para copiar', { timeout: 6000 });
});

test('email con API bloqueada y error honesto si no se puede copiar', async ({ page }) => {
  await page.addInitScript(() => {
    Object.defineProperty(navigator, 'clipboard', { configurable: true, value: { writeText: async () => { throw new Error('Clipboard blocked'); } } });
    document.execCommand = () => {
      document.documentElement.dataset.copiedText = window.getSelection()?.toString();
      return true;
    };
  });
  await page.goto('card/');
  const copy = page.getByRole('button', { name: 'Copiar email: adrian.vilella.pro@gmail.com' });
  await copy.focus();
  await page.keyboard.press('Enter');
  await expect(page.getByRole('status')).toHaveText('Email copiado');
  await expect(page.locator('html')).toHaveAttribute('data-copied-text', 'adrian.vilella.pro@gmail.com');
  await expect(copy).toBeFocused();
  await page.evaluate(() => { document.execCommand = () => false; });
  await copy.click();
  await expect(page.getByRole('status')).toHaveText('No se pudo copiar. Selecciona el email para copiarlo.');
  expect(await page.evaluate(() => window.getSelection()?.toString())).toBe('adrian.vilella.pro@gmail.com');
});
