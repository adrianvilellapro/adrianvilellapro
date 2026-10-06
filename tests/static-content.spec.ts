import { test, expect } from '@playwright/test';

test('HTML legible sin JavaScript y metadatos coherentes', async ({ browser, page, request, baseURL }) => {
  const response = await request.get('./');
  expect(response.ok()).toBe(true);
  const html = await response.text();
  const json = html.match(/<script type="application\/ld\+json">(.*?)<\/script>/s);
  expect(json).not.toBeNull();
  const graph = JSON.parse(json![1])['@graph'];
  const person = graph.find((item: { '@type': string }) => item['@type'] === 'Person');
  expect(person.name).toBe('Adrián Vilella Espony');
  expect(person.knowsAbout).toEqual(expect.arrayContaining(['Next.js', 'MongoDB', 'Docker']));
  expect(graph.filter((item: { '@type': string }) => item['@type'] === 'SoftwareSourceCode')).toHaveLength(3);
  expect(await (await request.get('sitemap.xml')).text()).toContain('<loc>https://adrianvilellapro.github.io/adrianvilellapro/</loc>');
  expect(await (await request.get('robots.txt')).text()).toContain('User-agent: *');

  const context = await browser.newContext({ javaScriptEnabled: false, baseURL, reducedMotion: 'reduce' });
  try {
    const staticPage = await context.newPage();
    await staticPage.goto('./');
    const main = staticPage.locator('main');
    for (const text of ['NTT DATA', 'GESPROMOS / HP', 'Universidad de Alicante', 'Grado en Ingeniería Multimedia', 'Next.js', 'MongoDB', 'Docker', 'adrian.vilella.pro@gmail.com']) {
      await expect(main).toContainText(text, { ignoreCase: true });
    }
    for (const id of ['nutrivisor', 'wikicodex', 'crowdcompass']) {
      await expect(staticPage.locator(`#${id}`)).toBeVisible();
    }
    const staticText = await main.innerText();
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.goto('./');
    expect(await page.locator('main').innerText()).toBe(staticText);
    await staticPage.locator('#nutrivisor summary').click();
    await expect(staticPage.getByText('Conectar los datos', { exact: true })).toBeVisible();
    expect(await staticPage.getByRole('link', { name: 'adrian.vilella.pro@gmail.com' }).getAttribute('href')).toBe('mailto:adrian.vilella.pro@gmail.com');
  } finally {
    await context.close();
  }
});

test('botones en una línea y separadores solo entre proyectos en móvil', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('./');
  await expect(page.getByText('En búsqueda de una oportunidad junior', { exact: true })).toHaveCount(0);
  for (const width of [320, 360, 375, 390, 414, 540, 600, 601, 640, 700, 740, 768, 844, 932, 960]) {
    await page.setViewportSize({ width, height: 844 });
    const bounds = await page.locator('.hero .actions > a').evaluateAll(links => links.map(link => {
      const box = link.getBoundingClientRect();
      return { top: box.top, bottom: box.bottom, right: box.right };
    }));
    expect(bounds).toHaveLength(3);
    expect(Math.max(...bounds.map(box => box.top)) - Math.min(...bounds.map(box => box.top))).toBeLessThan(2);
    expect(Math.max(...bounds.map(box => box.right))).toBeLessThanOrEqual(width);
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= document.documentElement.clientWidth)).toBe(true);
    expect(await page.locator('.project-story, .project-details, .project-result').evaluateAll(elements => elements.every(element => {
      const style = getComputedStyle(element);
      return ['borderTopWidth', 'borderBottomWidth', 'borderLeftWidth', 'borderRightWidth'].every(side => style[side as keyof CSSStyleDeclaration] === '0px');
    }))).toBe(true);
    await expect(page.locator('.project').first()).toHaveCSS('border-top-width', '0px');
    await expect(page.locator('.project').nth(1)).toHaveCSS('border-top-width', '1px');
    await expect(page.locator('.project').nth(2)).toHaveCSS('border-top-width', '1px');
  }
});
