import { test, expect } from '@playwright/test';

test.describe('Authentication Modal', () => {
  test('Sign In button is visible in the navbar', async ({ page }) => {
    await page.goto('/');
    // Wait for auth state to load (navbar renders Sign In when not logged in)
    const signInBtn = page.locator('#nav-sign-in');
    await expect(signInBtn).toBeVisible({ timeout: 10000 });
  });

  test('clicking Sign In opens the auth modal', async ({ page }) => {
    await page.goto('/');
    const signInBtn = page.locator('#nav-sign-in');
    await expect(signInBtn).toBeVisible({ timeout: 10000 });
    await signInBtn.click();

    // Auth modal should appear
    const dialog = page.getByRole('dialog', { name: /sign in|welcome back/i });
    await expect(dialog).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Welcome back' })).toBeVisible();
  });

  test('auth modal contains Google sign-in and email input', async ({ page }) => {
    await page.goto('/');
    await page.locator('#nav-sign-in').click();

    await expect(page.locator('#auth-google-btn')).toBeVisible();
    await expect(page.locator('text=Continue with Google')).toBeVisible();
    await expect(page.locator('#auth-email')).toBeVisible();
    await expect(page.locator('#auth-password')).toBeVisible();
  });

  test('closes modal when clicking backdrop', async ({ page }) => {
    await page.goto('/');
    await page.locator('#nav-sign-in').click();
    await expect(page.getByRole('dialog')).toBeVisible();

    // Click outside the modal card (the backdrop div)
    await page.mouse.click(5, 5);
    await expect(page.getByRole('dialog')).not.toBeVisible();
  });

  test('closes modal on Escape key', async ({ page }) => {
    await page.goto('/');
    await page.locator('#nav-sign-in').click();
    await expect(page.getByRole('dialog')).toBeVisible();

    await page.keyboard.press('Escape');
    await expect(page.getByRole('dialog')).not.toBeVisible();
  });

  test('can toggle to sign up mode', async ({ page }) => {
    await page.goto('/');
    await page.locator('#nav-sign-in').click();
    await expect(page.getByRole('heading', { name: 'Welcome back' })).toBeVisible();

    await page.locator('button:has-text("Sign up free")').click();
    await expect(page.getByRole('heading', { name: 'Create account' })).toBeVisible();
    await expect(page.locator('#auth-name')).toBeVisible();
  });

  test('can navigate to reset password mode', async ({ page }) => {
    await page.goto('/');
    await page.locator('#nav-sign-in').click();
    await page.locator('button:has-text("Forgot password?")').click();
    await expect(page.getByRole('heading', { name: 'Reset password' })).toBeVisible();
    await expect(page.locator('#reset-email')).toBeVisible();
  });
});
