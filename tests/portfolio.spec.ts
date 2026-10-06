import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

test('contenido, imágenes, enlaces internos y ancho de página', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  const errors: string[] = [];
  page.on('pageerror', error => errors.push(error.message));
  page.on('console', message => { if (message.type() === 'error') errors.push(message.text()); });
  page.on('response', response => { if (response.status() >= 400) errors.push(`${response.status()} ${response.url()}`); });
  await page.goto('./');
  await expect(page).toHaveTitle('Adrián Vilella | Desarrollador de Software');
  await expect(page.locator('h1')).toHaveCount(1);
  await expect(page.locator('h1')).toHaveText('Entiendo el problema. Construyo la solución.');
  await expect(page.getByText('FORMACIÓN PROFESIONAL', { exact: true })).toHaveCount(0);
  await expect(page.getByRole('img', { name: 'Adrián Vilella Espony', exact: true })).toBeVisible();
  for (const id of ['nutrivisor', 'wikicodex', 'crowdcompass', 'sobre-mi', 'experiencia', 'contacto']) {
    await page.locator(`#${id}`).scrollIntoViewIfNeeded();
    await expect(page.locator(`#${id}`)).toBeVisible();
  }
  await page.evaluate(async () => { await Promise.all([...document.images].map(img => { img.loading = 'eager'; return img.decode(); })); });
  expect(await page.locator('a[href^="#"]').evaluateAll(links => links.map(a => a.getAttribute('href')!).filter(href => !document.getElementById(href.slice(1))))).toEqual([]);
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= document.documentElement.clientWidth)).toBe(true);
  expect(errors).toEqual([]);
  await page.screenshot({ path: `test-results/${test.info().project.name}-full.png`, fullPage: true });
});

test('galerías, ampliación, teclado y devolución del foco', async ({ page }) => {
  await page.goto('./');
  const project = page.locator('#nutrivisor');
  const thumbnail = project.getByRole('button', { name: 'Mostrar indicadores nutricionales' });
  await thumbnail.click();
  await expect(thumbnail).toHaveAttribute('aria-pressed', 'true');
  const trigger = project.getByRole('button', { name: 'Ampliar captura de Nutrivisor: Indicadores nutricionales' });
  await expect(trigger.locator('img')).toHaveAttribute('src', /collage-nutrivisor-2.webp$/);
  await trigger.click();
  await expect(page.getByRole('dialog')).toBeVisible();
  await expect(page.getByRole('button', { name: 'Cerrar captura' })).toBeFocused();
  await page.keyboard.press('ArrowRight');
  await expect(page.getByRole('dialog')).toContainText('Información en la tienda');
  await page.keyboard.press('Tab');
  await page.keyboard.press('Tab');
  await page.keyboard.press('Tab');
  await expect(page.getByRole('button', { name: 'Cerrar captura' })).toBeFocused();
  await page.keyboard.press('Escape');
  await expect(page.getByRole('dialog')).toHaveCount(0);
  await expect(project.locator('.gallery-main')).toBeFocused();
  await expect(page.locator('body')).not.toHaveCSS('overflow', 'hidden');
  await project.locator('summary').click();
  await expect(project.getByText('Conectar los datos', { exact: true })).toBeVisible();
});

test('menú y navegación a proyectos', async ({ page }) => {
  await page.goto('./');
  const menu = page.getByRole('button', { name: 'Abrir menú' });
  if (await menu.isVisible()) {
    await menu.click();
    await expect(page.getByRole('button', { name: 'Cerrar menú' })).toHaveAttribute('aria-expanded', 'true');
    await page.keyboard.press('Escape');
    await expect(menu).toBeFocused();
    await expect(menu).toHaveAttribute('aria-expanded', 'false');
    await menu.click();
  }
  await page.getByRole('navigation').getByRole('link', { name: 'Proyectos', exact: true }).click();
  await expect(page).toHaveURL(/#proyectos$/);
  if (await menu.isVisible()) await expect(menu).toHaveAttribute('aria-expanded', 'false');
  await expect(page.locator('#nutrivisor')).toBeInViewport();
});

test('accesibilidad de la página y del visor', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('./');
  await page.evaluate(() => document.fonts.ready);
  const result = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21aa']).analyze();
  expect(result.violations).toEqual([]);
  await page.getByRole('button', { name: 'Activar modo oscuro' }).click();
  await page.locator('.skip-link').focus();
  const dark = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21aa']).analyze();
  expect(dark.violations).toEqual([]);
  await page.locator('#nutrivisor .gallery-main').click();
  const modal = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21aa']).analyze();
  expect(modal.violations).toEqual([]);
});

test('contacto, copia de correo y movimiento reducido', async ({ page, context, browserName }) => {
  if (browserName === 'chromium') await context.grantPermissions(['clipboard-read', 'clipboard-write']);
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('./');
  await expect(page.locator('html')).toHaveCSS('scroll-behavior', 'auto');
  await page.getByRole('button', { name: 'Copiar correo electrónico' }).click();
  await expect(page.getByRole('status')).toHaveText('Correo copiado');
  if (browserName === 'chromium') expect(await page.evaluate(() => navigator.clipboard.readText())).toBe('adrian.vilella.pro@gmail.com');
  const contactButton = page.getByRole('button', { name: 'Escríbeme' });
  await contactButton.click();
  const dialog = page.getByRole('dialog', { name: 'Escríbeme' });
  await expect(dialog).toBeVisible();
  await expect(dialog.getByRole('link', { name: /Abrir Gmail/ })).toHaveAttribute('href', /https:\/\/mail.google.com\/mail\/.*to=adrian.vilella.pro%40gmail.com/);
  await expect(dialog.getByRole('link', { name: /Abrir Outlook/ })).toHaveAttribute('href', /https:\/\/outlook.live.com\/.*to=adrian.vilella.pro%40gmail.com/);
  await expect(dialog.getByRole('link', { name: 'Abrir mi aplicación de correo' })).toHaveCount(0);
  await expect(dialog.getByRole('button', { name: 'Cerrar opciones de contacto' })).toBeFocused();
  await page.keyboard.press('Shift+Tab');
  await expect(dialog.getByRole('button', { name: 'Copiar dirección' })).toBeFocused();
  expect((await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21aa']).analyze()).violations).toEqual([]);
  await page.keyboard.press('Escape');
  await expect(dialog).toHaveCount(0);
  await expect(contactButton).toBeFocused();
});

test('pantalla estrecha y enlace para saltar al contenido', async ({ page }) => {
  await page.setViewportSize({ width: 320, height: 740 });
  await page.goto('./');
  await expect(page.getByRole('link', { name: 'Saltar al contenido' })).toBeAttached();
  await page.keyboard.press('Tab');
  await expect(page.getByRole('link', { name: 'Saltar al contenido' })).toBeFocused();
  await page.keyboard.press('Enter');
  await expect(page.locator('main')).toBeFocused();
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= document.documentElement.clientWidth)).toBe(true);
});

test('modo oscuro persistente y adaptación al sistema', async ({ page }) => {
  await page.emulateMedia({ colorScheme: 'dark', reducedMotion: 'reduce' });
  await page.goto('./');
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark');
  await page.getByRole('button', { name: 'Activar modo claro' }).click();
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'light');
  await page.reload();
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'light');
  await page.getByRole('button', { name: 'Activar modo oscuro' }).click();
  await page.reload();
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark');
  await page.screenshot({ path: `test-results/${test.info().project.name}-dark.png` });
});

test('animaciones al entrar en pantalla y preferencia de movimiento reducido', async ({ page }) => {
  await page.goto('./');
  const method = page.locator('.method').first();
  await expect(method).toHaveClass(/reveal-pending/);
  await method.scrollIntoViewIfNeeded();
  await expect(method).not.toHaveClass(/reveal-pending/);
  await expect(method).toHaveCSS('opacity', '1');
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await expect(page.locator('.reveal-pending')).toHaveCount(0);
  await expect(page.locator('html')).toHaveCSS('scroll-behavior', 'auto');
});

test('contacto sin acceso al portapapeles y tema sin almacenamiento', async ({ page }) => {
  // This test isolates denied APIs; entry animations are exercised separately.
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.addInitScript(() => {
    Object.defineProperty(window, 'localStorage', { get() { throw new Error('Storage unavailable'); } });
    Object.defineProperty(navigator, 'clipboard', { value: { writeText: () => Promise.reject(new Error('Permission denied')) } });
  });
  await page.goto('./');
  await page.getByRole('button', { name: 'Activar modo oscuro' }).click();
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark');
  await page.getByRole('button', { name: 'Escríbeme' }).click();
  await page.getByRole('button', { name: 'Copiar dirección' }).click();
  await expect(page.getByRole('status')).toContainText('No se pudo copiar');
  await expect(page.getByRole('link', { name: /Abrir Gmail/ })).toBeVisible();
});
