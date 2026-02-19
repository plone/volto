import { expect, test } from '../../../tooling/playwright/test';
import { login } from '../../../tooling/playwright/login';
import { createContent } from '../../../tooling/playwright/content';
import { waitForPlateEditorReady } from '../../../tooling/playwright/plate';
import { clickAtPath, getEditorHandle } from '@platejs/playwright';

async function insertTitleBlock(page: Parameters<typeof test>[0]['page']) {
  const editorHandle = await getEditorHandle(page);
  await clickAtPath(page, editorHandle, [0]);
  await page.keyboard.type('/');

  const titleOption = page
    .getByLabel('Basic blocks')
    .getByRole('option', { name: 'Title' });
  await expect(titleOption).toBeVisible();
  await titleOption.click();
}

test('Title block and metadata title stay in sync', async ({ page }) => {
  await login(page);
  await createContent(page, {
    contentType: 'Document',
    contentId: 'title-sync-page',
    contentTitle: 'Original title',
    transition: 'publish',
    bodyModifier: (body) => ({
      ...body,
      blocks: {
        '1a2b3c4d5e': {
          '@type': 'slate',
          value: [{ type: 'p', children: [{ text: '' }] }],
        },
      },
      blocks_layout: {
        items: ['1a2b3c4d5e'],
      },
    }),
  });

  await page.goto('/@@edit/title-sync-page');
  await waitForPlateEditorReady(page);

  await insertTitleBlock(page);

  const metadataTitleInput = page.locator('input[name="title"]').first();
  const editorTitle = page.locator('[data-slate-editor] h1').first();

  await metadataTitleInput.fill('Metadata updated title');
  await expect(editorTitle).toHaveText('Metadata updated title');

  await editorTitle.fill('Editor updated title');
  await expect(metadataTitleInput).toHaveValue('Editor updated title');
});

test('Newly created title block is initialized from metadata title', async ({
  page,
}) => {
  await login(page);
  await createContent(page, {
    contentType: 'Document',
    contentId: 'title-sync-no-title-block',
    contentTitle: 'Initial title',
    transition: 'publish',
    bodyModifier: (body) => ({
      ...body,
      blocks: {
        '1a2b3c4d5e': {
          '@type': 'slate',
          value: [{ type: 'p', children: [{ text: '' }] }],
        },
      },
      blocks_layout: {
        items: ['1a2b3c4d5e'],
      },
    }),
  });

  await page.goto('/@@edit/title-sync-no-title-block');
  await waitForPlateEditorReady(page);

  const metadataTitleInput = page.locator('input[name="title"]').first();
  await metadataTitleInput.fill('Seeded metadata title');

  await insertTitleBlock(page);

  await expect(page.locator('[data-slate-editor] h1').first()).toHaveText(
    'Seeded metadata title',
  );
});
