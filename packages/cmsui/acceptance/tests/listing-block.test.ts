import { expect, test } from '../../../tooling/playwright/test';
import { login } from '../../../tooling/playwright/login';
import { createContent } from '../../../tooling/playwright/content';
import { waitForPlateEditorReady } from '../../../tooling/playwright/plate';
import type { Page } from '@playwright/test';

const PAGE_ID = 'listing-block-page';

async function setupListingBlockPage(page: Page) {
  await createContent(page, {
    contentType: 'Document',
    contentId: 'news-folder',
    contentTitle: 'News Folder',
  });

  await createContent(page, {
    contentType: 'Document',
    contentId: 'news-item-1',
    contentTitle: 'First News Article',
    contentDescription: 'Description of the first article',
    path: '/news-folder',
  });

  await createContent(page, {
    contentType: 'Document',
    contentId: 'news-item-2',
    contentTitle: 'Second News Article',
    contentDescription: 'Description of the second article',
    path: '/news-folder',
  });

  await createContent(page, {
    contentType: 'Document',
    contentId: PAGE_ID,
    contentTitle: 'Listing Block Page',
    transition: 'publish',
    bodyModifier: (body) => ({
      ...body,
      blocks: {
        __somersault__: {
          '@type': '__somersault__',
          value: [
            {
              type: 'title',
              children: [{ text: 'Listing Block Page' }],
            },
            {
              type: 'unknown',
              '@type': 'listing',
              headline: 'Latest News',
              querystring: {
                query: [
                  {
                    i: 'path',
                    o: 'plone.app.querystring.operation.string.path',
                    v: '/news-folder',
                  },
                ],
              },
              children: [{ text: '' }],
            },
          ],
        },
      },
      blocks_layout: {
        items: ['__somersault__'],
      },
    }),
  });

  await page.goto(`/@@edit/${PAGE_ID}`);
  await waitForPlateEditorReady(page);
}

test.describe('Listing block', () => {
  test('displays listing block with headline and items in edit mode', async ({
    page,
  }) => {
    await login(page);
    await setupListingBlockPage(page);

    // Check headline is visible
    await expect(
      page.getByRole('heading', { name: 'Latest News' }),
    ).toBeVisible();

    // Check that items are displayed
    await expect(page.getByText('First News Article')).toBeVisible();
    await expect(page.getByText('Second News Article')).toBeVisible();

    // Check descriptions are visible
    await expect(
      page.getByText('Description of the first article'),
    ).toBeVisible();
    await expect(
      page.getByText('Description of the second article'),
    ).toBeVisible();
  });

  test('shows placeholder when no query is configured', async ({ page }) => {
    await login(page);
    await createContent(page, {
      contentType: 'Document',
      contentId: 'empty-listing-page',
      contentTitle: 'Empty Listing Page',
      transition: 'publish',
      bodyModifier: (body) => ({
        ...body,
        blocks: {
          __somersault__: {
            '@type': '__somersault__',
            value: [
              {
                type: 'title',
                children: [{ text: 'Empty Listing Page' }],
              },
              {
                type: 'unknown',
                '@type': 'listing',
                headline: 'No Query',
                children: [{ text: '' }],
              },
            ],
          },
        },
        blocks_layout: {
          items: ['__somersault__'],
        },
      }),
    });

    await page.goto('/@@edit/empty-listing-page');
    await waitForPlateEditorReady(page);

    await expect(page.getByText('No Results Found')).toBeVisible();
  });

  test('displays listing block items in view', async ({ page }) => {
    await login(page);
    await setupListingBlockPage(page);

    // Wait for items to be fetched by the listing block edit component
    await expect(page.getByText('First News Article')).toBeVisible({
      timeout: 10000,
    });
    await expect(page.getByText('Second News Article')).toBeVisible({
      timeout: 10000,
    });

    // Save using the toolbar button
    const saveButton = page
      .locator('#toolbar')
      .getByRole('button', { name: /save/i })
      .first();
    await saveButton.click();
    await page.waitForLoadState('networkidle');

    // Navigate to the published view
    await page.goto(`/${PAGE_ID}`, { waitUntil: 'networkidle' });

    // Check headline is visible
    await expect(
      page.getByRole('heading', { name: 'Latest News' }),
    ).toBeVisible();

    // Check that items are displayed
    await expect(page.getByText('First News Article')).toBeVisible();
    await expect(page.getByText('Second News Article')).toBeVisible();

    // Check descriptions are visible
    await expect(
      page.getByText('Description of the first article'),
    ).toBeVisible();
    await expect(
      page.getByText('Description of the second article'),
    ).toBeVisible();
  });

  test('items are clickable in view', async ({ page }) => {
    await login(page);
    await setupListingBlockPage(page);

    // Wait for items to be fetched
    await expect(page.getByText('First News Article')).toBeVisible({
      timeout: 10000,
    });

    // Save using the toolbar button
    const saveButton = page
      .locator('#toolbar')
      .getByRole('button', { name: /save/i })
      .first();
    await saveButton.click();
    await page.waitForLoadState('networkidle');

    // Navigate to the published view
    await page.goto(`/${PAGE_ID}`, { waitUntil: 'networkidle' });

    // Click on the first article link
    await page.getByRole('link', { name: 'First News Article' }).click();

    // Should navigate to the article
    await expect(page).toHaveURL(/\/news-folder\/news-item-1$/);
    await expect(
      page.getByRole('heading', { name: 'First News Article' }),
    ).toBeVisible();
  });
});
