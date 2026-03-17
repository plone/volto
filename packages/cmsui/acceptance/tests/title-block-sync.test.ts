import { expect, test } from '../../../tooling/playwright/test';
import { login } from '../../../tooling/playwright/login';
import { createContent } from '../../../tooling/playwright/content';
import { waitForPlateEditorReady } from '../../../tooling/playwright/plate';
import {
  clickAtPath,
  getEditorHandle,
  getNodeByPath,
  setSelection,
} from '@platejs/playwright';

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
  const editorTitle = page.locator('[data-slate-editor] h1').first();

  await expect(editorTitle).toHaveText('Initial title');
  await metadataTitleInput.fill('Seeded metadata title');

  await expect(editorTitle).toHaveText('Seeded metadata title');
});

test('Enter on title inserts a new empty paragraph before existing next block', async ({
  page,
}) => {
  const contentId = 'title-enter-behavior';
  const titleText = 'Title enter behavior';
  const existingNextText = 'Existing next paragraph';

  await login(page);
  await createContent(page, {
    contentType: 'Document',
    contentId,
    contentTitle: titleText,
    transition: 'publish',
    bodyModifier: (body) => ({
      ...body,
      blocks: {
        __somersault__: {
          '@type': '__somersault__',
          value: [
            {
              type: 'title',
              children: [{ text: titleText }],
            },
            {
              type: 'p',
              children: [{ text: existingNextText }],
            },
          ],
        },
      },
      blocks_layout: {
        items: ['__somersault__'],
      },
    }),
  });

  await page.goto(`/@@edit/${contentId}`);
  await waitForPlateEditorReady(page);

  const editorHandle = await getEditorHandle(page);
  await clickAtPath(page, editorHandle, [0]);
  await setSelection(page, editorHandle, {
    anchor: { path: [0, 0], offset: titleText.length },
    focus: { path: [0, 0], offset: titleText.length },
  });
  await page.keyboard.press('Enter');

  const insertedNodeHandle = await getNodeByPath(page, editorHandle, [1]);
  const insertedNode = (await insertedNodeHandle.jsonValue()) as Record<
    string,
    unknown
  >;
  expect(insertedNode.type).toBe('p');
  expect(insertedNode.children).toEqual([{ text: '' }]);

  const nextNodeHandle = await getNodeByPath(page, editorHandle, [2]);
  const nextNode = (await nextNodeHandle.jsonValue()) as Record<
    string,
    unknown
  >;
  expect(nextNode.type).toBe('p');
  expect(nextNode.children).toEqual([{ text: existingNextText }]);
});
