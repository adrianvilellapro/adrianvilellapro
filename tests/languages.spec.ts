import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

test('English is complete, directly addressable and readable without JavaScript', async ({ browser, baseURL, page, request }) => {
  const response = await request.get('index.en.html');
  expect(response.ok()).toBe(true);
  const html = await response.text();
  expect(html).toContain('<html lang="en">');
  const graph = JSON.parse(html.match(/<script type="application\/ld\+json">(.*?)<\/script>/s)![1])['@graph'];
  expect(graph.find((entry: { '@type': string }) => entry['@type'] === 'ProfilePage').inLanguage).toBe('en');
  expect(graph.find((entry: { '@type': string }) => entry['@type'] === 'Person').knowsAbout).toContain('Vue.js');
  expect(graph.filter((entry: { '@type': string }) => entry['@type'] === 'SoftwareSourceCode')).toHaveLength(4);
  for (const project of graph.filter((entry: { '@type': string }) => entry['@type'] === 'SoftwareSourceCode')) {
    expect(project.inLanguage).toBe('en');
    expect(project.url).toContain('index.en.html#');
  }
  const context = await browser.newContext({ baseURL, javaScriptEnabled: false, reducedMotion: 'reduce' });
  try {
    const staticPage = await context.newPage();
    await staticPage.goto('index.en.html');
    await expect(staticPage).toHaveTitle('Adrián Vilella | Software Developer');
    const main = staticPage.locator('main');
    for (const content of ['Understand the problem.', 'Build the solution.', 'From problem to product', 'How I work', 'Experience and education', 'Bachelor’s Degree in Multimedia Engineering', 'Vue.js', 'Shall we talk']) {
      await expect(main).toContainText(content);
    }
    for (const id of ['nutrivisor', 'mappleo', 'wikicodex', 'crowdcompass']) {
      await expect(staticPage.locator(`#${id}`)).toBeVisible();
      await staticPage.locator(`#${id} summary`).click();
    }
    expect(await main.innerText()).not.toMatch(/Qué aprendí|Mi siguiente paso|Las herramientas cambian|Candidaturas|Desarrollo full stack|Especialización|¿Hablamos/);
    await expect(staticPage.locator('#mappleo').getByRole('link', { name: 'View demo' })).toHaveAttribute('href', 'https://adrianvilellapro.github.io/Mappleo_App/en/index.html');
    await expect(staticPage.getByRole('link', { name: 'Leer en español' })).toBeVisible();
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.goto('index.en.html');
    await expect(page.locator('html')).toHaveAttribute('lang', 'en');
    for (const id of ['nutrivisor', 'mappleo', 'wikicodex', 'crowdcompass']) await page.locator(`#${id} summary`).click();
    expect(await page.locator('main').innerText()).toBe(await main.innerText());
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute('href', 'https://adrianvilellapro.github.io/adrianvilellapro/index.en.html');
    expect(await (await request.get('sitemap.xml')).text()).toContain('index.en.html');
  } finally { await context.close(); }
});

test('header language selector preserves section and theme, works on narrow screens and with keyboard', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('./#mappleo');
  await page.getByRole('button', { name: 'Activar modo oscuro' }).click();
  const english = page.getByRole('link', { name: 'Read in English' });
  await english.focus();
  await page.keyboard.press('Enter');
  await expect(page).toHaveURL(/index\.en\.html#mappleo$/);
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark');
  await expect(page.getByRole('link', { name: 'Read in English' })).toHaveAttribute('aria-current', 'page');
  await expect(page.locator('#mappleo-title')).toBeInViewport();
  for (const width of [320, 360, 390, 600, 768, 960, 961, 1024, 1440]) {
    await page.setViewportSize({width, height:900});
    await expect(page.getByRole('link', { name: 'Read in English' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'Leer en español' })).toBeVisible();
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= document.documentElement.clientWidth)).toBe(true);
  }
  const menu = page.getByRole('button', { name: 'Open menu' });
  await page.setViewportSize({ width:390, height:844 });
  await menu.click();
  await expect(page.getByRole('navigation').getByRole('link', {name:'Experience',exact:true})).toBeVisible();
  await page.keyboard.press('Escape');
  await page.getByRole('link', { name: 'Leer en español' }).click();
  await expect(page.locator('html')).toHaveAttribute('lang', 'es');
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark');
  await expect(page).toHaveURL(/\/adrianvilellapro\/#mappleo$/);
  await page.getByRole('button', {name:'Activar modo claro'}).click();
});

test('English gallery, email dialog and accessibility in both themes', async ({ page, context, browserName }) => {
  if (browserName === 'chromium') await context.grantPermissions(['clipboard-read', 'clipboard-write']);
  const errors: string[] = [];
  page.on('pageerror', error => errors.push(error.message));
  page.on('response', response => {if (response.status() >= 400) errors.push(`${response.status()} ${response.url()}`);});
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('index.en.html');
  await page.evaluate(async () => { await document.fonts.ready; await Promise.all([...document.images].map(img => {img.loading = 'eager'; return img.decode();})); });
  await expect(page.locator('.tech-list').getByText('Vue.js', {exact:true})).toBeVisible();
  expect((await new AxeBuilder({page}).withTags(['wcag2a','wcag2aa','wcag21aa']).analyze()).violations).toEqual([]);
  await page.getByRole('button', {name:'Switch to dark mode'}).click();
  expect((await new AxeBuilder({page}).withTags(['wcag2a','wcag2aa','wcag21aa']).analyze()).violations).toEqual([]);
  const project = page.locator('#mappleo');
  await project.getByRole('button', {name:'Show kanban board',exact:true}).click();
  await project.getByRole('button', {name:'Enlarge screenshot of Mappleo: Kanban board',exact:true}).click();
  const gallery = page.getByRole('dialog', {name:'Screenshots of Mappleo'});
  await expect(gallery).toBeVisible();
  await page.keyboard.press('ArrowRight');
  await expect(gallery).toContainText('Saved job offers');
  await page.keyboard.press('Escape');
  await page.getByRole('button', {name:'Write to me',exact:true}).click();
  const contact = page.getByRole('dialog', {name:'Write to me'});
  await expect(contact.getByRole('link', {name:/Open Gmail/})).toBeVisible();
  expect((await new AxeBuilder({page}).withTags(['wcag2a','wcag2aa','wcag21aa']).analyze()).violations).toEqual([]);
  await contact.getByRole('button', {name:'Copy address'}).click();
  if (browserName === 'chromium') await expect(contact.getByRole('status')).toHaveText('Email copied');
  await page.keyboard.press('Escape');
  expect(errors).toEqual([]);
  await page.locator('.hero').scrollIntoViewIfNeeded();
  await page.screenshot({path:`test-results/${test.info().project.name}-english-header.png`});
});
