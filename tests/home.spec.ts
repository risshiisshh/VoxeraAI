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
  await expect(page.locator('text=VoxeraAI Assistant')).toBeVisible();
});
