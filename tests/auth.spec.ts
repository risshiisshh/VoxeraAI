import { test, expect } from '@playwright/test';

test.describe('Authentication Modal', () => {
  test('should open auth modal when guest tries to sign in', async ({ page }) => {
    await page.goto('/');
    
    // Find "Sign In" button in navbar (visible on desktop)
    const signInButton = page.locator('button:has-text("Sign In")').first();
    
    if (await signInButton.isVisible()) {
      await signInButton.click();
      // Ensure the modal title is visible
      await expect(page.locator('h2', { hasText: 'Welcome back' })).toBeVisible();
      // Ensure Google sign-in is available
      await expect(page.locator('text=Continue with Google')).toBeVisible();
      // Ensure email input exists
      await expect(page.locator('input[type="email"]')).toBeVisible();
    }
  });

  test('should toggle to sign up mode', async ({ page }) => {
    await page.goto('/assistant');
    
    const signInButton = page.locator('button:has-text("Sign In")').first();
    await signInButton.click();

    const signUpLink = page.locator('button:has-text("Sign up free")');
    await signUpLink.click();

    await expect(page.locator('h2', { hasText: 'Create account' })).toBeVisible();
    await expect(page.locator('input[type="text"]')).toBeVisible(); // Name field
  });
});
