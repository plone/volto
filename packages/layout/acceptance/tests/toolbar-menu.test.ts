import { expect, test } from '../../../tooling/playwright/test';
import { login } from '../../../tooling/playwright/login';

const addTrigger = (page: Parameters<typeof login>[0]) =>
  page.getByRole('navigation', { name: 'Toolbar' }).getByRole('button');

test.describe('ToolbarMenu', () => {
  test.beforeEach(async ({ page }) => {
    await login(page);
    await page.goto('/');
    await expect(page.locator('#toolbar')).toBeAttached();
  });

  test('opens when the trigger is clicked', async ({ page }) => {
    await addTrigger(page).click();
    await expect(page.getByRole('menu')).toBeVisible();
  });

  test('closes when the trigger is clicked again', async ({ page }) => {
    await addTrigger(page).click();
    await expect(page.getByRole('menu')).toBeVisible();
    await addTrigger(page).click();
    await expect(page.getByRole('menu')).not.toBeVisible();
  });

  test('closes on Escape and restores focus to the trigger button', async ({
    page,
  }) => {
    await addTrigger(page).click();
    await expect(page.getByRole('menu')).toBeVisible();

    await page.keyboard.press('Escape');

    await expect(page.getByRole('menu')).not.toBeVisible();
    const triggerIsFocused = await page.evaluate(() => {
      const host = document.getElementById('toolbar');
      return host?.shadowRoot?.activeElement?.tagName === 'BUTTON';
    });
    expect(triggerIsFocused).toBe(true);
  });

  test('closes when clicking outside the toolbar', async ({ page }) => {
    await addTrigger(page).click();
    await expect(page.getByRole('menu')).toBeVisible();

    // Click in the middle of the viewport, well clear of the left-side toolbar
    await page.mouse.click(640, 400);

    await expect(page.getByRole('menu')).not.toBeVisible();
  });

  test('traps Tab while the menu is open', async ({ page }) => {
    await addTrigger(page).click();
    await expect(page.getByRole('menu')).toBeVisible();

    await page.keyboard.press('Tab');

    await expect(page.getByRole('menu')).toBeVisible();
  });

  test('moves focus into the menu after opening', async ({ page }) => {
    await addTrigger(page).click();
    await expect(page.getByRole('menu')).toBeVisible();

    // ToolbarMenu uses requestAnimationFrame to move focus to the menu element
    // after the trigger click lands on the button instead of the menu.
    const activeRole = await page.evaluate(() => {
      const host = document.getElementById('toolbar');
      return host?.shadowRoot?.activeElement?.getAttribute('role');
    });
    expect(activeRole).toBe('menuitem');
  });
});
