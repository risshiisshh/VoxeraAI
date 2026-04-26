import { chromium } from 'playwright';

(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  try {
    const response = await page.goto('https://voxeraai-965293624421.asia-south1.run.app', { waitUntil: 'networkidle', timeout: 15000 });
    console.log("Status:", response.status());
    console.log("Title:", await page.title());
  } catch (e) {
    console.error("Navigation failed:", e.message);
  } finally {
    await browser.close();
  }
})();
