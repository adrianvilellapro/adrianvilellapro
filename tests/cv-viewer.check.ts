import { test, expect } from '@playwright/test';

// A tiny valid PDF exists only in the intercepted test response, never on the site.
function samplePdf() {
  const stream = 'BT /F1 18 Tf 30 150 Td (PDF viewer test) Tj ET';
  const objects = [
    '<< /Type /Catalog /Pages 2 0 R >>',
    '<< /Type /Pages /Kids [3 0 R] /Count 1 >>',
    '<< /Type /Page /Parent 2 0 R /MediaBox [0 0 300 200] /Resources << /Font << /F1 4 0 R >> >> /Contents 5 0 R >>',
    '<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>',
    `<< /Length ${stream.length} >>\nstream\n${stream}\nendstream`,
  ];
  let pdf = '%PDF-1.4\n';
  const offsets = [0];
  objects.forEach((object, index) => { offsets.push(Buffer.byteLength(pdf)); pdf += `${index + 1} 0 obj\n${object}\nendobj\n`; });
  const xref = Buffer.byteLength(pdf);
  pdf += `xref\n0 6\n0000000000 65535 f \n${offsets.slice(1).map(offset => `${String(offset).padStart(10, '0')} 00000 n \n`).join('')}trailer\n<< /Size 6 /Root 1 0 R >>\nstartxref\n${xref}\n%%EOF\n`;
  return Buffer.from(pdf);
}

test('PDF solo al abrir; descarga real, fallback y salida del visor', async ({ page }) => {
  const pdf = samplePdf();
  let requests = 0;
  await page.route('**/test-cv.pdf', route => { requests++; return route.fulfill({ contentType: 'application/pdf', body: pdf }); });
  await page.goto('/tests/fixtures/cv-viewer.html');
  expect(requests).toBe(0);
  await page.getByRole('button', { name: 'Ver CV', exact: true }).click();
  await expect(page.getByRole('dialog')).toBeVisible();
  await expect.poll(() => requests).toBeGreaterThan(0);
  await expect(page.locator('iframe')).toHaveAttribute('src', '/test-cv.pdf#view=FitH&navpanes=0');
  await expect(page.getByRole('link', { name: 'Abrir en otra pestaña' })).toHaveAttribute('href', '/test-cv.pdf');
  await expect(page.getByRole('link', { name: 'Abrir en otra pestaña' })).toHaveAttribute('target', '_blank');
  await expect(page.getByText('Si tu navegador no muestra el PDF completo, ábrelo en otra pestaña.')).toBeVisible();
  const pendingDownload = page.waitForEvent('download');
  await page.getByRole('button', { name: 'Descargar CV' }).click();
  const download = await pendingDownload;
  expect(download.suggestedFilename()).toBe('Adrian-Vilella-CV.pdf');
  expect(await download.failure()).toBeNull();
  const stream = await download.createReadStream();
  const chunks: Buffer[] = [];
  for await (const chunk of stream!) chunks.push(Buffer.from(chunk));
  expect(Buffer.concat(chunks)).toEqual(pdf);
  await page.getByRole('button', { name: 'Cerrar', exact: true }).focus();
  await page.keyboard.press('Escape');
  await expect(page.getByRole('dialog')).toHaveCount(0);
});

test('fallo de descarga conserva salida y alternativa accesible', async ({ page }) => {
  await page.route('**/test-cv.pdf', route => route.fulfill({ status: 404, contentType: 'text/plain', body: 'Not found' }));
  await page.goto('/tests/fixtures/cv-viewer.html');
  await page.getByRole('button', { name: 'Ver CV', exact: true }).click();
  await page.getByRole('button', { name: 'Descargar CV' }).click();
  await expect(page.getByRole('alert')).toContainText('No se ha podido descargar el CV.');
  await expect(page.getByRole('link', { name: 'Abrir en otra pestaña' })).toBeVisible();
  await page.getByRole('button', { name: 'Cerrar', exact: true }).click();
  await expect(page.getByRole('dialog')).toHaveCount(0);
});

test('visor en poca altura y landscape mantiene los controles accesibles', async ({ page }) => {
  await page.route('**/test-cv.pdf', route => route.fulfill({ contentType: 'application/pdf', body: samplePdf() }));
  await page.goto('/tests/fixtures/cv-viewer.html');
  await page.getByRole('button', { name: 'Ver CV', exact: true }).click();
  for (const size of [{ width: 568, height: 320 }, { width: 844, height: 390 }, { width: 320, height: 480 }]) {
    await page.setViewportSize(size);
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= document.documentElement.clientWidth)).toBe(true);
    await expect(page.getByRole('button', { name: 'Cerrar', exact: true })).toBeInViewport();
    await page.getByRole('button', { name: 'Descargar CV' }).scrollIntoViewIfNeeded();
    await expect(page.getByRole('button', { name: 'Descargar CV' })).toBeInViewport();
  }
  await page.getByRole('button', { name: 'Cerrar', exact: true }).click();
  await expect(page.getByRole('dialog')).toHaveCount(0);
});
