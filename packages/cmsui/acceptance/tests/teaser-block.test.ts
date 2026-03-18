import { expect, test } from '../../../tooling/playwright/test';
import { login } from '../../../tooling/playwright/login';
import { createContent } from '../../../tooling/playwright/content';
import { waitForPlateEditorReady } from '../../../tooling/playwright/plate';

const TARGET_ID = 'teaser-target-document';
const TARGET_TITLE = 'Teaser target document';
const TARGET_DESCRIPTION = 'Teaser target description';
const PAGE_ID = 'teaser-block-edit-page';

async function setupTeaserBlockPage(page: Parameters<typeof test>[0]['page']) {
  await createContent(page, {
    contentType: 'Document',
    contentId: TARGET_ID,
    contentTitle: TARGET_TITLE,
    contentDescription: TARGET_DESCRIPTION,
    transition: 'publish',
  });

  await createContent(page, {
    contentType: 'Document',
    contentId: PAGE_ID,
    contentTitle: 'Teaser block edit page',
    transition: 'publish',
    bodyModifier: (body) => ({
      ...body,
      blocks: {
        __somersault__: {
          '@type': '__somersault__',
          value: [
            {
              type: 'title',
              children: [{ text: 'Teaser block edit page' }],
            },
            {
              type: 'p',
              children: [{ text: 'Text before teaser' }],
            },
            {
              type: 'unknown',
              '@type': 'teaser',
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

  await page.goto(`/@@edit/${PAGE_ID}`);
  await waitForPlateEditorReady(page);
  await page
    .locator('#toolbar')
    .getByRole('button', { name: 'Settings' })
    .click();
}

test('Teaser block shows placeholder while source is not selected', async ({
  page,
}) => {
  await login(page);
  await setupTeaserBlockPage(page);

  await expect(
    page.getByText(
      'Please choose an existing content as source for this element',
    ),
  ).toBeVisible();
});

test('Teaser block integrates seven object browser trigger in edit mode', async ({
  page,
}) => {
  await login(page);
  await setupTeaserBlockPage(page);

  await expect(
    page.getByRole('button', { name: /select content/i }),
  ).toHaveCount(1);
});
