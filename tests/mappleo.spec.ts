import { test, expect } from '@playwright/test';

test('Mappleo conserva el formato de los proyectos y enlaza demo, código e instalador', async ({ page, request }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('./');
  const project = page.locator('#mappleo');
  await project.scrollIntoViewIfNeeded();
  await expect(project.getByRole('heading', { name: 'Mappleo', exact: true })).toBeVisible();
  await expect(project.getByRole('link', { name: 'Ver demo' })).toHaveAttribute('href', 'https://adrianvilellapro.github.io/Mappleo_App/es/index.html');
  await expect(project.getByRole('link', { name: 'GitHub' })).toHaveAttribute('href', 'https://github.com/adrianvilellapro/Mappleo_App');
  await expect(project.getByRole('link', { name: 'Descargar para Windows' })).toHaveAttribute('href', 'https://github.com/adrianvilellapro/Mappleo_App/releases/latest');
  const technologyBadges = project.getByRole('list', { name: 'Tecnologías de Mappleo' });
  for (const technology of ['Next.js', 'Electron', 'SQLite', 'Docker', 'Neon', 'Vitest', 'Playwright', 'GitHub Actions']) {
    await expect(technologyBadges).toContainText(technology);
    await expect(page.locator('.tech-list')).toContainText(technology);
  }
  const thumbnails = project.locator('.gallery-thumbnails button');
  await expect(thumbnails).toHaveCount(16);
  for (let index = 0; index < 16; index++) {
    await thumbnails.nth(index).click();
    await expect(thumbnails.nth(index)).toHaveAttribute('aria-pressed', 'true');
    const image = project.locator('.gallery-main img');
    await image.evaluate((element: HTMLImageElement) => element.decode());
    expect(await image.evaluate((element: HTMLImageElement) => element.naturalWidth)).toBeGreaterThan(0);
  }
  await thumbnails.first().click();
  await project.locator('.gallery-main').click();
  const dialog = page.getByRole('dialog', { name: 'Capturas de Mappleo' });
  await expect(dialog).toBeVisible();
  await page.keyboard.press('ArrowRight');
  await expect(dialog).toContainText('Tablero Kanban');
  await page.keyboard.press('Escape');
  await expect(dialog).toHaveCount(0);
  await expect(project.locator('.gallery-main')).toBeFocused();
  await project.locator('summary').click();
  await expect(project.getByRole('heading', { name: 'Trabajar sin conexión' })).toBeVisible();
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= document.documentElement.clientWidth)).toBe(true);
  await page.screenshot({ path: `test-results/${test.info().project.name}-mappleo.png` });
  const response = await request.get('./');
  const html = await response.text();
  const graph = JSON.parse(html.match(/<script type="application\/ld\+json">(.*?)<\/script>/s)![1])['@graph'];
  const entry = graph.find((item: { name: string }) => item.name === 'Mappleo');
  expect(entry.codeRepository).toBe('https://github.com/adrianvilellapro/Mappleo_App');
  expect(entry.keywords).toContain('Docker');
});
