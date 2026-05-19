import { expect, test } from '../../../tooling/playwright/test';
import { login } from '../../../tooling/playwright/login';
import { createContent } from '../../../tooling/playwright/content';
import { waitForPlateEditorReady } from '../../../tooling/playwright/plate';
import {
  clickAtPath,
  getEditorHandle,
  setSelection,
} from '@platejs/playwright';

const TARGET_ID = 'link-target-document';
const TARGET_TITLE = 'Link target document';
const PAGE_ID = 'link-kit-edit-page';
const PAGE_TITLE = 'Link kit edit page';
const SELECTED_TEXT = 'Hello';

async function setupLinkPage(page: Parameters<typeof test>[0]['page']) {
  await createContent(page, {
    contentType: 'Document',
    contentId: TARGET_ID,
    contentTitle: TARGET_TITLE,
    transition: 'publish',
  });

  await createContent(page, {
    contentType: 'Document',
    contentId: PAGE_ID,
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

  await page.goto(`/@@edit/${PAGE_ID}`);
  await waitForPlateEditorReady(page);
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

test('Link kit browse button opens the object browser', async ({ page }) => {
  await login(page);
  await setupLinkPage(page);
  await openLinkToolbar(page);

  await page.getByRole('button', { name: 'Browse content' }).click();

  await expect(page.getByRole('heading', { name: 'Select content' })).toBeVisible();
});

test('Link kit can create an internal link from object browser selection', async ({
  page,
}) => {
  await login(page);
  await setupLinkPage(page);
  await openLinkToolbar(page);

  await page.getByRole('button', { name: 'Browse content' }).click();
  await expect(page.getByRole('heading', { name: 'Select content' })).toBeVisible();

  await page.getByText(TARGET_TITLE).click();

  await expect(page.getByRole('heading', { name: 'Select content' })).toHaveCount(0);
  await expect(
    page.locator(`[data-slate-editor] a[href="/${TARGET_ID}"]`),
  ).toHaveText(SELECTED_TEXT);
});

test('Link kit can create an internal link from inline search results', async ({
  page,
}) => {
  await login(page);
  await setupLinkPage(page);
  await openLinkToolbar(page);

  const input = page.getByPlaceholder('Paste link or search content');
  await input.fill(TARGET_TITLE);
  await expect(page.getByText('Search results')).toBeVisible();
  await page.getByText(TARGET_TITLE).click();

  await expect(
    page.locator(`[data-slate-editor] a[href="/${TARGET_ID}"]`),
  ).toHaveText(SELECTED_TEXT);
});
