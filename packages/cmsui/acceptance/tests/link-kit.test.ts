import { expect, test } from '../../../tooling/playwright/test';
import { login } from '../../../tooling/playwright/login';
import { createContent } from '../../../tooling/playwright/content';
import { waitForPlateEditorReady } from '../../../tooling/playwright/plate';
import {
  clickAtPath,
  getEditorHandle,
  setSelection,
} from '@platejs/playwright';

const TARGET_TITLE = 'Link target document';
const SECOND_TARGET_TITLE = 'Second link target document';
const PAGE_TITLE = 'Link kit edit page';
const SELECTED_TEXT = 'Hello';

async function setupLinkPage(page: Parameters<typeof test>[0]['page']) {
  const suffix = `${Date.now()}-${Math.round(Math.random() * 1_000_000)}`;
  const targetId = `link-target-document-${suffix}`;
  const secondTargetId = `second-link-target-document-${suffix}`;
  const pageId = `link-kit-edit-page-${suffix}`;

  await createContent(page, {
    contentType: 'Document',
    contentId: targetId,
    contentTitle: TARGET_TITLE,
    transition: 'publish',
  });

  await createContent(page, {
    contentType: 'Document',
    contentId: secondTargetId,
    contentTitle: SECOND_TARGET_TITLE,
    transition: 'publish',
  });

  await createContent(page, {
    contentType: 'Document',
    contentId: pageId,
    contentTitle: PAGE_TITLE,
    transition: 'publish',
    bodyModifier: (body) => ({
      ...body,
      blocks: {
        __somersault__: {
          '@type': '__somersault__',
          value: [
            {
              type: 'title',
              children: [{ text: PAGE_TITLE }],
            },
            {
              type: 'p',
              children: [{ text: 'Hello world!' }],
            },
          ],
        },
      },
      blocks_layout: {
        items: ['__somersault__'],
      },
    }),
  });

  await page.goto(`/@@edit/${pageId}`);
  await waitForPlateEditorReady(page);

  return {
    pageId,
    targetId,
    secondTargetId,
  };
}

async function openLinkToolbar(page: Parameters<typeof test>[0]['page']) {
  const editorHandle = await getEditorHandle(page);
  await clickAtPath(page, editorHandle, [1]);
  await setSelection(page, editorHandle, {
    anchor: { path: [1, 0], offset: 0 },
    focus: { path: [1, 0], offset: SELECTED_TEXT.length },
  });

  const toolbar = page.getByLabel('Editor toolbar');
  await expect(toolbar).toBeVisible();
  await toolbar.locator('button:has(.lucide-link)').click();
}

async function selectHelloLink(page: Parameters<typeof test>[0]['page']) {
  const editorHandle = await getEditorHandle(page);
  await setSelection(page, editorHandle, {
    anchor: { path: [1, 0, 0], offset: 0 },
    focus: { path: [1, 0, 0], offset: SELECTED_TEXT.length },
  });
}

test('Link kit browse button opens the object browser', async ({ page }) => {
  await login(page);
  await setupLinkPage(page);
  await openLinkToolbar(page);

  await page.getByRole('button', { name: 'Browse content' }).click();

  await expect(
    page.getByRole('heading', { name: 'Select content' }),
  ).toBeVisible();
});

test('Link kit can create an internal link from object browser selection', async ({
  page,
}) => {
  await login(page);
  const { targetId } = await setupLinkPage(page);
  await openLinkToolbar(page);

  await page.getByRole('button', { name: 'Browse content' }).click();
  await expect(
    page.getByRole('heading', { name: 'Select content' }),
  ).toBeVisible();

  await page.getByText(TARGET_TITLE, { exact: true }).click();

  await expect(
    page.getByRole('heading', { name: 'Select content' }),
  ).toHaveCount(0);
  await expect(
    page.locator(`[data-slate-editor] a[href="/${targetId}"]`),
  ).toHaveText(SELECTED_TEXT);
});

test('Link kit can create an internal link from inline search results', async ({
  page,
}) => {
  await login(page);
  const { targetId } = await setupLinkPage(page);
  await openLinkToolbar(page);

  const input = page.getByPlaceholder('Paste link or search content');
  await input.fill(TARGET_TITLE);
  await expect(page.getByText('Search results')).toBeVisible();
  await page.getByText(TARGET_TITLE, { exact: true }).click();

  await expect(
    page.locator(`[data-slate-editor] a[href="/${targetId}"]`),
  ).toHaveText(SELECTED_TEXT);
});

test('Link kit edit Browse button opens the object browser and updates the link', async ({
  page,
}) => {
  await login(page);
  const { targetId, secondTargetId } = await setupLinkPage(page);
  await openLinkToolbar(page);

  const input = page.getByPlaceholder('Paste link or search content');
  await input.fill(TARGET_TITLE);
  await expect(page.getByText('Search results')).toBeVisible();
  await page.getByText(TARGET_TITLE, { exact: true }).click();

  await expect(
    page.locator(`[data-slate-editor] a[href="/${targetId}"]`),
  ).toHaveText(SELECTED_TEXT);

  await selectHelloLink(page);
  await expect(page.getByRole('button', { name: 'Browse' })).toBeVisible();
  await page.getByRole('button', { name: 'Browse' }).click();

  await expect(
    page.getByRole('heading', { name: 'Select content' }),
  ).toBeVisible();
  await page.locator(`[role="row"][id*="/${secondTargetId}"]`).click();

  await expect(
    page.getByRole('heading', { name: 'Select content' }),
  ).toHaveCount(0);
  await expect(
    page.locator(`[data-slate-editor] a[href="/${secondTargetId}"]`),
  ).toHaveText(SELECTED_TEXT);
});
