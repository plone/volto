import { expect, test } from '../../../tooling/playwright/test';
import { createContent } from '../../../tooling/playwright/content';

const PAGE_ID = 'somersault-renderer-page';

async function setupSomersaultPage(page: Parameters<typeof test>[0]['page']) {
  await createContent(page, {
    contentType: 'Document',
    contentId: PAGE_ID,
    contentTitle: 'Somersault renderer page',
    transition: 'publish',
    bodyModifier: (body) => ({
      ...body,
      blocks: {
        __somersault__: {
          '@type': '__somersault__',
          value: [
            {
              type: 'title',
              children: [{ text: 'Somersault renderer page' }],
            },
            {
              type: 'p',
              children: [{ text: 'Text before teaser' }],
            },
            {
              type: 'unknown',
              '@type': 'teaser',
              title: 'Teaser block title',
              description: 'Teaser block description',
              children: [{ text: '' }],
            },
            {
              type: 'p',
              children: [{ text: 'Text after teaser' }],
            },
          ],
        },
      },
      blocks_layout: {
        items: ['__somersault__'],
      },
    }),
  });
}

test('Somersault page renders teaser block in view mode', async ({ page }) => {
  await setupSomersaultPage(page);
  const response = await page.goto(`/${PAGE_ID}`);
  expect(response?.ok()).toBeTruthy();

  await expect(page.getByRole('heading', { level: 1 })).toHaveText(
    'Somersault renderer page',
  );
  await expect(page.getByText('Text before teaser')).toBeVisible();
  await expect(page.getByRole('heading', { level: 2 })).toHaveText(
    'Teaser block title',
  );
  await expect(page.getByText('Teaser block description')).toBeVisible();
  await expect(page.getByText('Text after teaser')).toBeVisible();
  await expect(
    page.getByText(
      'Plate hooks must be used inside a Plate or PlateController',
    ),
  ).toHaveCount(0);
});

test('Somersault page renders with JavaScript disabled (SSR)', async ({
  page,
  browser,
}) => {
  await setupSomersaultPage(page);

  const noJsContext = await browser.newContext({ javaScriptEnabled: false });
  const noJsPage = await noJsContext.newPage();

  try {
    const response = await noJsPage.goto(`/${PAGE_ID}`);
    expect(response?.ok()).toBeTruthy();

    await expect(noJsPage.getByRole('heading', { level: 1 })).toHaveText(
      'Somersault renderer page',
    );
    await expect(noJsPage.getByText('Text before teaser')).toBeVisible();
    await expect(noJsPage.getByRole('heading', { level: 2 })).toHaveText(
      'Teaser block title',
    );
    await expect(noJsPage.getByText('Teaser block description')).toBeVisible();
    await expect(noJsPage.getByText('Text after teaser')).toBeVisible();
  } finally {
    await noJsContext.close();
  }
});
