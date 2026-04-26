import { test, expect } from '@playwright/test';

test('homepage has correct branding', async ({ page }) => {
  await page.goto('/');
  await expect(page).toHaveTitle(/VoxeraAI/);
  await expect(page.locator('text=VoxeraAI').first()).toBeVisible();
});

test('navigation links work correctly', async ({ page }) => {
  await page.goto('/');
  await page.click('text=Find Booths');
  await expect(page).toHaveURL(/.*booths/);
  await expect(page.locator('text=Find Your Voting Booth')).toBeVisible();
});

test('assistant page loads without crashing', async ({ page }) => {
  await page.goto('/assistant');
  await expect(page.locator('text=VoxeraAI Assistant').first()).toBeVisible();
});

test.describe('Mobile Viewport', () => {
  test.use({ viewport: { width: 375, height: 812 } });

  test('navbar renders correctly on mobile', async ({ page }) => {
    await page.goto('/');
    // Check that desktop links are hidden or hamburger menu appears if implemented
    // For now just check branding fits
    await expect(page.locator('text=VoxeraAI').first()).toBeVisible();
  });
});

test('handles 404 gracefully', async ({ page }) => {
  const response = await page.goto('/some-random-page-that-does-not-exist');
  expect(response?.status()).toBe(404);
});
