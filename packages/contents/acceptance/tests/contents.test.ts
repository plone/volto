import { expect, test } from '../../../tooling/playwright/test';
import { login } from '../../../tooling/playwright/login';
import { createContent } from '../../../tooling/playwright/content';

test.describe('Contents view', () => {
  test.beforeEach(async ({ page }) => {
    await createContent(page, {
      contentType: 'Document',
      contentId: 'root-document',
      contentTitle: 'Root Document',
    });
    await createContent(page, {
      contentType: 'Document',
      contentId: 'inside-news',
      contentTitle: 'Inside News',
      path: '/news',
    });
  });

  test('redirects anonymous users to login', async ({ page }) => {
    await page.goto('/@@contents', { waitUntil: 'networkidle' });

    await expect(page).toHaveURL(/\/login$/);
    await expect(page.getByRole('heading', { name: /sign in/i })).toBeVisible();
  });

  test('lists existing content for authenticated users', async ({ page }) => {
    await login(page);
    await page.goto('/@@contents', { waitUntil: 'networkidle' });

    await expect(
      page.getByRole('heading', { name: /Welcome to Plone/i }),
    ).toBeVisible();
    await expect(page.getByRole('link', { name: /^Home$/i })).toBeVisible();
    await expect(page.getByRole('link', { name: /News/i })).toBeVisible();
    await expect(
      page.getByRole('link', { name: /Root Document/i }),
    ).toBeVisible();
  });

  test('navigates into a folder from the contents listing', async ({
    page,
  }) => {
    await login(page);
    await page.goto('/@@contents', { waitUntil: 'networkidle' });

    await page.getByRole('link', { name: /^News$/i }).click();

    await expect(page).toHaveURL(/\/@@contents\/news$/);
    await expect(page.getByRole('heading', { name: 'News' })).toBeVisible();
    await expect(
      page.getByRole('link', { name: /Inside News/i }),
    ).toBeVisible();
  });

  test('navigates to the content view for non-folder items', async ({
    page,
  }) => {
    await login(page);
    await page.goto('/@@contents', { waitUntil: 'networkidle' });

    await page.getByRole('link', { name: /Root Document/i }).click();

    await expect(page).toHaveURL(/\/root-document$/);
    await expect(
      page.getByRole('heading', { name: 'Root Document' }),
    ).toBeVisible();
  });
});
