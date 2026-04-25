import { chromium } from 'playwright';

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  
  const errors: string[] = [];
  page.on('pageerror', exception => {
    errors.push(`Uncaught exception: "${exception}"`);
  });
  page.on('console', msg => {
    if (msg.type() === 'error') {
      errors.push(`Console error: "${msg.text()}"`);
    }
  });

  console.log('Navigating to /learn...');
  await page.goto('http://localhost:3000/learn');
  await page.waitForLoadState('networkidle');
  console.log('Initial URL:', page.url());

  console.log('Clicking the featured article...');
  const link = await page.$('a[href^="/learn/voter-registration"]');
  if (link) {
    const href = await link.getAttribute('href');
    console.log(`Found link: ${href}`);
    await link.click();
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(2000);
    console.log('URL after click:', page.url());
    console.log('Title after click:', await page.title());
  }

  console.log('Errors encountered:');
  console.log(errors);

  await browser.close();
})();
