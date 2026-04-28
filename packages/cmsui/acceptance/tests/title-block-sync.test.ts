import { expect, test } from '../../../tooling/playwright/test';
import { login } from '../../../tooling/playwright/login';
import { createContent } from '../../../tooling/playwright/content';
import { waitForPlateEditorReady } from '../../../tooling/playwright/plate';
import {
  clickAtPath,
  getEditorHandle,
  getNodeByPath,
  getSelection,
  setSelection,
} from '@platejs/playwright';

test('Title block and metadata title stay in sync', async ({ page }) => {
  const initialTitle = 'Original title';
  await login(page);
  await createContent(page, {
    contentType: 'Document',
    contentId: 'title-sync-page',
    contentTitle: initialTitle,
    transition: 'publish',
    bodyModifier: (body) => ({
      ...body,
      blocks: {
        __somersault__: {
          '@type': '__somersault__',
          value: [
            {
              type: 'title',
              children: [{ text: initialTitle }],
            },
            {
              type: 'p',
              children: [{ text: '' }],
            },
          ],
        },
      },
    }),
  });

  await page.goto('/@@edit/title-sync-page');
  await waitForPlateEditorReady(page);

  await page.getByRole('tab', { name: 'Content' }).click();
  const metadataTitleInput = page.locator('input[name="title"]').first();
  await metadataTitleInput.fill('Metadata updated title');

  await page.getByRole('tab', { name: 'Blocks' }).click();
  const editorTitle = page.locator('[data-slate-editor] h1').first();
  await expect(editorTitle).toHaveText('Metadata updated title');
  await editorTitle.fill('Editor updated title');

  await page.getByRole('tab', { name: 'Content' }).click();
  await expect(metadataTitleInput).toHaveValue('Editor updated title');
});

test('Newly created title block is initialized from metadata title', async ({
  page,
}) => {
  const initialTitle = 'Initial title';
  await login(page);
  await createContent(page, {
    contentType: 'Document',
    contentId: 'title-sync-no-title-block',
    contentTitle: initialTitle,
    transition: 'publish',
    bodyModifier: (body) => ({
      ...body,
      blocks: {
        __somersault__: {
          '@type': '__somersault__',
          value: [
            {
              type: 'title',
              children: [{ text: initialTitle }],
            },
            {
              type: 'p',
              children: [{ text: '' }],
            },
          ],
        },
      },
    }),
  });

  await page.goto('/@@edit/title-sync-no-title-block');
  await waitForPlateEditorReady(page);

  const editorTitle = page.locator('[data-slate-editor] h1').first();
  await expect(editorTitle).toHaveText('Initial title');

  await page.getByRole('tab', { name: 'Content' }).click();
  const metadataTitleInput = page.locator('input[name="title"]').first();
  await metadataTitleInput.fill('Seeded metadata title');

  await page.getByRole('tab', { name: 'Blocks' }).click();
  await expect(editorTitle).toHaveText('Seeded metadata title');
});

test('Reloading edit view with no stored title block does not trigger hydration mismatch', async ({
  page,
}) => {
  const initialTitle = 'Reload title';
  const pageErrors: string[] = [];
  const consoleErrors: string[] = [];

  page.on('pageerror', (error) => {
    pageErrors.push(error.message);
  });

  page.on('console', (message) => {
    if (message.type() === 'error') {
      consoleErrors.push(message.text());
    }
  });

  await login(page);
  await createContent(page, {
    contentType: 'Document',
    contentId: 'title-sync-reload-no-title-block',
    contentTitle: initialTitle,
    transition: 'publish',
    bodyModifier: (body) => ({
      ...body,
      blocks: {
        __somersault__: {
          '@type': '__somersault__',
          value: [
            {
              type: 'title',
              children: [{ text: initialTitle }],
            },
            {
              type: 'p',
              children: [{ text: '' }],
            },
          ],
        },
      },
    }),
  });

  await page.goto('/@@edit/title-sync-reload-no-title-block');
  await waitForPlateEditorReady(page);
  await page.reload();
  await waitForPlateEditorReady(page);

  const editorTitle = page.locator('[data-slate-editor] h1').first();
  await expect(editorTitle).toHaveText('Reload title');

  expect(
    pageErrors.filter((message) => message.includes('Hydration failed')),
  ).toEqual([]);
  expect(
    consoleErrors.filter((message) => message.includes('Hydration failed')),
  ).toEqual([]);
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

test('Empty title block keeps showing its placeholder when another block is selected', async ({
  page,
}) => {
  const contentId = 'title-placeholder-visibility';
  const titleText = 'Placeholder seed title';

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
              children: [{ text: 'Paragraph after title' }],
            },
          ],
        },
      },
    }),
  });

  await page.goto(`/@@edit/${contentId}`);
  await waitForPlateEditorReady(page);
  const editorTitle = page.locator('[data-slate-editor] h1').first();
  await editorTitle.fill('');

  const titlePlaceholder = page
    .locator('[data-slate-editor] h1')
    .getByText('Type the title...');
  await expect(titlePlaceholder).toBeVisible();

  const editorHandle = await getEditorHandle(page);
  await clickAtPath(page, editorHandle, [1]);

  await expect(titlePlaceholder).toBeVisible();
});

test('Add view title placeholder is aligned to the constrained title container', async ({
  page,
}) => {
  await login(page);
  await page.goto('/@@add?type=Document');
  await waitForPlateEditorReady(page);

  const editorTitle = page.locator('[data-slate-editor] h1').first();
  const titlePlaceholder = editorTitle.getByText('Type the title...');
  const innerContainer = editorTitle.locator('.block-inner-container').first();

  await expect(titlePlaceholder).toBeVisible();

  const placeholderBox = await titlePlaceholder.boundingBox();
  const innerContainerBox = await innerContainer.boundingBox();

  expect(placeholderBox).not.toBeNull();
  expect(innerContainerBox).not.toBeNull();

  expect(
    Math.abs((placeholderBox?.x ?? 0) - (innerContainerBox?.x ?? 0)),
  ).toBeLessThanOrEqual(1);
  expect(
    Math.abs((placeholderBox?.width ?? 0) - (innerContainerBox?.width ?? 0)),
  ).toBeLessThanOrEqual(1);
});

test('Fast typing in add view keeps the caret in the title block', async ({
  page,
}) => {
  const typedTitle = 'Quick typing should stay in the title block';

  await login(page);
  await page.goto('/@@add?type=Document');
  await waitForPlateEditorReady(page);

  const editorHandle = await getEditorHandle(page);
  await clickAtPath(page, editorHandle, [0]);
  await setSelection(page, editorHandle, {
    path: [0, 0],
    offset: 0,
  });

  await page.keyboard.type(typedTitle, { delay: 0 });

  const selection = await getSelection(page, editorHandle);
  expect(selection).not.toBeNull();
  expect(selection?.anchor.path).toEqual([0, 0]);
  expect(selection?.focus.path).toEqual([0, 0]);

  const titleNodeHandle = await getNodeByPath(page, editorHandle, [0]);
  const titleNode = (await titleNodeHandle.jsonValue()) as Record<
    string,
    unknown
  >;
  expect(titleNode.type).toBe('title');
  expect(titleNode.children).toEqual([{ text: typedTitle }]);

  const nextNodeHandle = await getNodeByPath(page, editorHandle, [1]);
  const nextNode = (await nextNodeHandle.jsonValue()) as Record<
    string,
    unknown
  >;
  expect(nextNode.type).toBe('p');
  expect(nextNode.children).toEqual([{ text: '' }]);
});
