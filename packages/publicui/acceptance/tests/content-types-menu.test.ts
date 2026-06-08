import { expect, test } from '../../../tooling/playwright/test';
import { login } from '../../../tooling/playwright/login';
import { createContent } from '../../../tooling/playwright/content';

const addTrigger = (page: Parameters<typeof login>[0]) =>
  page.getByRole('navigation', { name: 'Toolbar' }).getByRole('button');

test.describe('ContentTypesMenu', () => {
  test('is not visible to anonymous users', async ({ page }) => {
    await page.goto('/');
    // shouldShowToolbar requires an edit action in @components.actions, which
    // is only present for authenticated users — so the Toolbar is not rendered.
    await expect(page.locator('#toolbar')).not.toBeAttached();
  });

  test('is visible to logged-in editors on folderish content', async ({
    page,
  }) => {
    await login(page);
    await page.goto('/');
    await expect(addTrigger(page)).toBeVisible();
  });

  test('is not visible on non-folderish content', async ({ page }) => {
    await login(page);
    await createContent(page, {
      contentType: 'Document',
      contentId: 'test-doc',
      contentTitle: 'Test Document',
    });
    await page.goto('/test-doc');
    await expect(
      page.getByRole('heading', { name: 'Test Document' }),
    ).toBeVisible();

    // For a non-container, @components.types is empty so ContentTypesMenu
    // renders null. If shouldShowToolbar also returns false, the whole toolbar
    // is absent — either way the add trigger must not be present.
    await expect(addTrigger(page)).not.toBeAttached();
  });

  test('shows "Add content" header and menu items when opened', async ({
    page,
  }) => {
    await login(page);
    await page.goto('/');

    await addTrigger(page).click();

    await expect(page.getByRole('menu')).toBeVisible();
    await expect(page.getByText('Add content')).toBeVisible();
    await expect(page.getByRole('menuitem').first()).toBeVisible();
  });

  test('places most-used types in the top section and others below', async ({
    page,
  }) => {
    await login(page);
    await page.goto('/');

    await addTrigger(page).click();

    const menu = page.getByRole('menu');

    await expect(
      menu.locator('.most-used').getByRole('menuitem', { name: /Page/ }),
    ).toBeVisible();
    await expect(
      menu.locator('.most-used').getByRole('menuitem', { name: /File/ }),
    ).toBeVisible();

    // Event is not in mostUsedTypes (by default)
    await expect(
      menu.locator('.types').getByRole('menuitem', { name: /Event/ }),
    ).toBeVisible();
  });

  test('CSS passed via the styles prop is scoped to the shadow root', async ({
    page,
  }) => {
    await login(page);
    await page.goto('/');

    const result = await page.evaluate(() => {
      const host = document.getElementById('toolbar');
      const shadowRoot = host?.shadowRoot;

      const inShadow = Array.from(
        shadowRoot?.querySelectorAll('style') ?? [],
        (s) => s.textContent ?? '',
      ).some((t) => t.includes('.most-used'));

      const inDocument = Array.from(
        document.querySelectorAll('style'),
        (s) => s.textContent ?? '',
      ).some((t) => t.includes('.most-used'));

      return { inShadow, inDocument };
    });

    expect(result.inShadow).toBe(true);
    expect(result.inDocument).toBe(false);
  });

  test('navigates to the add form when a content type is selected', async ({
    page,
  }) => {
    await login(page);
    await page.goto('/');

    await addTrigger(page).click();
    await expect(page.getByRole('menu')).toBeVisible();
    await page.getByRole('menuitem', { name: /Page/ }).click();

    await expect(page).toHaveURL(/\/@@add.*\?type=Document/);
  });
});
