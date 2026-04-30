import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

/**
 * Automated accessibility tests using axe-core.
 * Runs WCAG 2.1 AA checks on every major page.
 */

test.describe('Accessibility — Homepage', () => {
  test('has no critical axe violations', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    const results = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
      .analyze();

    // Log any violations to help debugging
    if (results.violations.length > 0) {
      console.log('A11y violations on /:', JSON.stringify(results.violations.map(v => ({
        id: v.id, impact: v.impact, description: v.description, nodes: v.nodes.length
      })), null, 2));
    }

    expect(results.violations).toHaveLength(0);
  });

  test('has a skip-to-content link', async ({ page }) => {
    await page.goto('/');
    const skipLink = page.locator('a[href="#main-content"]');
    await expect(skipLink).toBeAttached();
  });

  test('main landmark is present', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('#main-content')).toBeAttached();
  });

  test('all images have alt text', async ({ page }) => {
    await page.goto('/');
    const images = page.locator('img:not([alt])');
    await expect(images).toHaveCount(0);
  });
});

test.describe('Accessibility — Booths Page', () => {
  test('has no critical axe violations', async ({ page }) => {
    await page.goto('/booths');
    await page.waitForLoadState('networkidle');

    const results = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa'])
      .exclude('iframe') // Google Maps iframes may have their own a11y limitations
      .analyze();

    expect(results.violations).toHaveLength(0);
  });

  test('search input has aria-label', async ({ page }) => {
    await page.goto('/booths');
    const searchInput = page.getByLabel('Search city, constituency or PIN code');
    await expect(searchInput).toBeVisible();
  });
});

test.describe('Accessibility — Assistant Page', () => {
  test('has no critical axe violations', async ({ page }) => {
    await page.goto('/assistant');
    await page.waitForLoadState('networkidle');

    const results = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa'])
      .analyze();

    expect(results.violations).toHaveLength(0);
  });

  test('chat log has role=log and aria-live', async ({ page }) => {
    await page.goto('/assistant');
    const chatLog = page.locator('[role="log"][aria-live]');
    await expect(chatLog).toBeAttached();
  });
});

test.describe('Accessibility — Language Selector', () => {
  test('language selector button has aria-label', async ({ page }) => {
    await page.goto('/');
    const langBtn = page.getByRole('button', { name: /Language:/i });
    await expect(langBtn).toBeVisible();
    await expect(langBtn).toHaveAttribute('aria-haspopup', 'listbox');
  });

  test('listbox items have role=option with aria-selected', async ({ page }) => {
    await page.goto('/');
    await page.getByRole('button', { name: /Language:/i }).click();
    const options = page.locator('[role="option"]');
    const count = await options.count();
    expect(count).toBeGreaterThanOrEqual(7); // at least 7 languages
    // First option (English) should be selected
    const firstOption = options.first();
    await expect(firstOption).toHaveAttribute('aria-selected', 'true');
  });
});
