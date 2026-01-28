import { expect, test } from '../../../tooling/playwright/test';
import { login } from '../../../tooling/playwright/login';
import { createContent } from '../../../tooling/playwright/content';
import { waitForPlateEditorReady } from '../../../tooling/playwright/plate';
import {
  getEditorHandle,
  clickAtPath,
  setSelection,
} from '@platejs/playwright';

test('GET / shows Homepage', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByText('Home')).toBeVisible();
});

test('GET /mypage shows a document', async ({ page }) => {
  await createContent(page, {
    contentType: 'Document',
    contentId: 'mypage',
    contentTitle: 'My page',
    transition: 'publish',
  });
  await page.goto('/mypage');
  await expect(page.locator('h1', { hasText: 'My page' })).toBeVisible();
});

test('As an editor, I can edit /mypage and interact with the editor', async ({
  page,
}) => {
  await login(page);
  await createContent(page, {
    contentType: 'Document',
    contentId: 'mypage',
    contentTitle: 'My page',
    transition: 'publish',
  });
  await page.goto('/@@edit/mypage');
  await expect(page.locator('h1', { hasText: 'My page' })).toBeVisible();
  await waitForPlateEditorReady(page);
  const editorHandle = await getEditorHandle(page);
  await clickAtPath(page, editorHandle, [0]);
  await page.keyboard.type('Hello world!');
});

test('As an editor, I can edit /mypage and interact with the editor - Selects a text and the floating toolbar shows up', async ({
  page,
}) => {
  await login(page);
  await createContent(page, {
    contentType: 'Document',
    contentId: 'mypage',
    contentTitle: 'My page',
    transition: 'publish',
  });
  await page.goto('/@@edit/mypage');
  await expect(page.locator('h1', { hasText: 'My page' })).toBeVisible();
  await waitForPlateEditorReady(page);
  const editorHandle = await getEditorHandle(page);
  await clickAtPath(page, editorHandle, [0]);
  await page.keyboard.type('Hello world!');
  await setSelection(page, editorHandle, {
    anchor: { path: [0, 0], offset: 0 },
    focus: { path: [0, 0], offset: 5 },
  });
  await expect(page.getByLabel('Editor toolbar')).toBeVisible();
});
