import { test, expect } from '@playwright/test';

test.describe('Homepage', () => {
  test('has correct title and VoxeraAI branding', async ({ page }) => {
    await page.goto('/');
    await expect(page).toHaveTitle(/VoxeraAI/);
    await expect(page.locator('text=VoxeraAI').first()).toBeVisible();
  });

  test('has a working primary navigation', async ({ page }) => {
    await page.goto('/');
    const nav = page.getByRole('navigation', { name: 'Primary navigation' });
    await expect(nav).toBeVisible();
  });

  test('navigation to Find Booths works', async ({ page }) => {
    await page.goto('/');
    await page.click('text=Find Booths');
    await expect(page).toHaveURL(/.*booths/);
    await expect(page.getByRole('heading', { name: 'Find Your Voting Booth' })).toBeVisible();
  });

  test('navigation to Learn works', async ({ page }) => {
    await page.goto('/');
    await page.click('text=Learn');
    await expect(page).toHaveURL(/.*learn/);
  });

  test('navigation to Timeline works', async ({ page }) => {
    await page.goto('/');
    await page.click('text=Timeline');
    await expect(page).toHaveURL(/.*timeline/);
  });

  test('has skip to content link accessible via keyboard', async ({ page }) => {
    await page.goto('/');
    // Tab once to reveal skip link
    await page.keyboard.press('Tab');
    const skipLink = page.locator('a:has-text("Skip to main content")');
    await expect(skipLink).toBeFocused();
  });
});

test.describe('Assistant Page', () => {
  test('loads and shows heading', async ({ page }) => {
    await page.goto('/assistant');
    await expect(page.getByRole('heading', { name: 'VoxeraAI Assistant' })).toBeVisible();
  });

  test('has accessible chat input', async ({ page }) => {
    await page.goto('/assistant');
    const input = page.getByLabel('Ask anything about elections');
    await expect(input).toBeVisible();
  });

  test('has accessible Send button', async ({ page }) => {
    await page.goto('/assistant');
    const sendBtn = page.getByRole('button', { name: 'Send message' });
    await expect(sendBtn).toBeVisible();
    await expect(sendBtn).toBeDisabled(); // disabled when input is empty
  });

  test('suggestion chips are visible', async ({ page }) => {
    await page.goto('/assistant');
    await expect(page.locator('text=How do I register to vote online?')).toBeVisible();
  });
});

test.describe('Language Selector', () => {
  test('language selector is visible in navbar', async ({ page }) => {
    await page.goto('/');
    const langBtn = page.getByRole('button', { name: /Language:/i });
    await expect(langBtn).toBeVisible();
  });

  test('language dropdown opens and lists Indian languages', async ({ page }) => {
    await page.goto('/');
    await page.getByRole('button', { name: /Language:/i }).click();
    await expect(page.getByRole('listbox', { name: 'Select language' })).toBeVisible();
    await expect(page.locator('text=हिन्दी')).toBeVisible();
    await expect(page.locator('text=தமிழ்')).toBeVisible();
    await expect(page.locator('text=বাংলা')).toBeVisible();
  });

  test('can select Hindi and dropdown closes', async ({ page }) => {
    await page.goto('/');
    await page.getByRole('button', { name: /Language:/i }).click();
    await page.locator('text=हिन्दी').click();
    // Dropdown should close
    await expect(page.getByRole('listbox', { name: 'Select language' })).not.toBeVisible();
    // Button should now show HI
    await expect(page.getByRole('button', { name: /Language: Hindi/i })).toBeVisible();
  });

  test('language selector closes on Escape', async ({ page }) => {
    await page.goto('/');
    await page.getByRole('button', { name: /Language:/i }).click();
    await expect(page.getByRole('listbox', { name: 'Select language' })).toBeVisible();
    await page.keyboard.press('Escape');
    await expect(page.getByRole('listbox', { name: 'Select language' })).not.toBeVisible();
  });
});

test.describe('404 Page', () => {
  test('returns 404 for unknown routes', async ({ page }) => {
    const response = await page.goto('/page-that-does-not-exist-xyz');
    expect(response?.status()).toBe(404);
  });
});

test.describe('Mobile Viewport', () => {
  test.use({ viewport: { width: 375, height: 812 } });

  test('homepage renders correctly on mobile', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('text=VoxeraAI').first()).toBeVisible();
    // Language selector should still be visible on mobile
    await expect(page.getByRole('button', { name: /Language:/i })).toBeVisible();
  });

  test('assistant page renders on mobile', async ({ page }) => {
    await page.goto('/assistant');
    await expect(page.getByRole('heading', { name: 'VoxeraAI Assistant' })).toBeVisible();
    await expect(page.getByLabel('Ask anything about elections')).toBeVisible();
  });
});
