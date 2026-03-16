import { expect, test } from '../../../../packages/tooling/playwright/test';

test.describe('Basic Playwright Test', () => {
  test('should visit the root URL', async ({ page }) => {
    await page.goto('/');
    await expect(page).toHaveURL(/\/$/);
    await expect(page.getByText('Home')).toBeVisible();
  });

  test('html tag has the lang attr', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('html')).toHaveAttribute('lang', 'en');
  });
});
