import { test, expect, type Locator } from '@playwright/test';

test('disposición uniforme, enlace de trabajo y separadores de secciones', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('./');
  for (const width of [320, 390, 600, 768, 960, 1440]) {
    await page.setViewportSize({ width, height: 900 });
    await expect(page.locator('.hero-footnote')).toHaveCSS('border-top-width', '0px');
    await expect(page.locator('.hero-footnote')).toHaveCSS('border-bottom-width', '1px');
    const link = page.getByRole('link', { name: 'Ver mi trabajo', exact: true });
    await expect(link).toHaveCSS('font-size', '14px');
    await expect(link).toHaveAttribute('href', '#proyectos');
    await expect(page.locator('.tech-section')).toHaveCSS('border-top-width', '1px');
    for (const project of await page.locator('.project').all()) {
      const image = await project.locator('.project-gallery').boundingBox();
      const overview = await project.locator('.project-overview').boundingBox();
      if (width <= 960) {
        expect(image!.y + image!.height).toBeLessThan(overview!.y);
        expect(Math.abs(image!.width - overview!.width)).toBeLessThan(1);
        expect(image!.width).toBeGreaterThanOrEqual(width - 48);
        await expect(project.locator('.project-gallery')).toHaveCSS('position', 'static');
      } else {
        expect(image!.x + image!.width).toBeLessThan(overview!.x);
      }
    }
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= document.documentElement.clientWidth)).toBe(true);
  }
});

// Dispatch pointer sequences across engines. Native touch scrolling is tested separately below.
async function gesture(target: Locator, x: number, y: number, cancel = false, multiTouch = false) {
  await target.evaluate((element, { x, y, cancel, multiTouch }) => {
    const capture = element.setPointerCapture;
    // Synthetic events do not allocate a hardware pointer that can be captured.
    element.setPointerCapture = () => {};
    const fire = (type: string, dx: number, dy: number, primary = true) => element.dispatchEvent(new PointerEvent(type, {
      pointerId: primary ? 7 : 8, pointerType: 'touch', isPrimary: primary,
      clientX: 180 + dx, clientY: 200 + dy, bubbles: true,
    }));
    fire('pointerdown', 0, 0);
    if (multiTouch) fire('pointerdown', 10, 0, false);
    fire('pointermove', x, y);
    fire(cancel ? 'pointercancel' : 'pointerup', x, y);
    element.dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true, detail: 1 }));
    element.setPointerCapture = capture;
  }, { x, y, cancel, multiTouch });
}

test('deslizar cambia capturas sin abrir el visor y conserva los controles', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('./');
  for (const id of ['nutrivisor', 'wikicodex', 'crowdcompass']) {
    const project = page.locator(`#${id}`);
    const main = project.locator('.gallery-main');
    const thumbnails = project.locator('.gallery-thumbnails button');
    await gesture(main, -80, 4);
    await expect(thumbnails.nth(1)).toHaveAttribute('aria-pressed', 'true');
    await expect(page.getByRole('dialog')).toHaveCount(0);
    await gesture(main, 80, 4);
    await expect(thumbnails.first()).toHaveAttribute('aria-pressed', 'true');
    await gesture(main, 80, 4);
    await expect(thumbnails.last()).toHaveAttribute('aria-pressed', 'true');
    for (const [x, y, cancel, multi] of [[3, 90, false, false], [-80, 0, true, false], [-80, 0, false, true], [-20, 0, false, false]] as const) {
      await gesture(main, x, y, cancel, multi);
      await expect(thumbnails.last()).toHaveAttribute('aria-pressed', 'true');
      await expect(page.getByRole('dialog')).toHaveCount(0);
    }
    await main.click();
    await expect(page.getByRole('dialog')).toBeVisible();
    await gesture(page.locator('.dialog-image'), -80, 2);
    await expect(thumbnails.first()).toHaveAttribute('aria-pressed', 'true');
    await expect(page.getByRole('dialog')).toBeVisible();
    await page.keyboard.press('Escape');
    await expect(main).toBeFocused();
  }
});

test('gestos táctiles nativos: deslizar, tocar y hacer scroll', async ({ page, context, browserName, isMobile }) => {
  test.skip(browserName !== 'chromium' || !isMobile, 'Native multi-point touch input uses Chromium CDP.');
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('./');
  const main = page.locator('#nutrivisor .gallery-main');
  await main.scrollIntoViewIfNeeded();
  const client = await context.newCDPSession(page);
  const swipe = async (target: Locator, dx: number, dy: number) => {
    const box = (await target.boundingBox())!;
    const x = box.x + box.width / 2 - dx / 2;
    const y = box.y + box.height / 2;
    await client.send('Input.dispatchTouchEvent', { type: 'touchStart', touchPoints: [{ x, y, id: 1 }] });
    for (let i = 1; i <= 8; i++) {
      await client.send('Input.dispatchTouchEvent', { type: 'touchMove', touchPoints: [{ x: x + dx * i / 8, y: y + dy * i / 8, id: 1 }] });
      await page.evaluate(() => new Promise(requestAnimationFrame));
    }
    await client.send('Input.dispatchTouchEvent', { type: 'touchEnd', touchPoints: [] });
    await page.evaluate(() => new Promise(resolve => requestAnimationFrame(() => requestAnimationFrame(resolve))));
  };
  await swipe(main, -70, 0);
  await expect(main).toHaveAttribute('aria-label', /Indicadores nutricionales/);
  await expect(page.getByRole('dialog')).toHaveCount(0);
  await swipe(main, 70, 0);
  await expect(main).toHaveAttribute('aria-label', /Filtros y preferencias/);
  const before = await page.evaluate(() => scrollY);
  await swipe(main, 0, -90);
  await expect.poll(() => page.evaluate(() => scrollY)).toBeGreaterThan(before);
  await expect(main).toHaveAttribute('aria-label', /Filtros y preferencias/);
  await main.tap();
  await expect(page.getByRole('dialog')).toBeVisible();
  await swipe(page.locator('.dialog-image'), -100, 0);
  await expect(page.locator('.dialog-bottom')).toContainText('Indicadores nutricionales');
  await page.keyboard.press('Escape');
  await expect(page.getByRole('dialog')).toHaveCount(0);
});
