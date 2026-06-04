import type { Page } from '@playwright/test';
import { expect, test } from '../../../tooling/playwright/test';
import { login } from '../../../tooling/playwright/login';
import { createContent } from '../../../tooling/playwright/content';
import { waitForPlateEditorReady } from '../../../tooling/playwright/plate';
import {
  getEditorHandle,
  setSelection,
  clickAtPath,
} from '@platejs/playwright';

const BODY_TEXT = 'Hello toolbar text';

// Paragraph text is at path [1] (after the title node at [0])
async function selectParagraphText(
  page: Page,
  { start, end }: { start: number; end: number },
) {
  const editorHandle = await getEditorHandle(page);
  await clickAtPath(page, editorHandle, [1]);
  await setSelection(page, editorHandle, {
    anchor: { path: [1, 0], offset: start },
    focus: { path: [1, 0], offset: end },
  });
}

function withSomersaultBody(bodyText: string) {
  return (body: Record<string, unknown>): Record<string, unknown> => ({
    ...body,
    blocks: {
      __somersault__: {
        '@type': '__somersault__',
        value: [
          { type: 'title', children: [{ text: (body as any).title ?? '' }] },
          { type: 'p', children: [{ text: bodyText }] },
        ],
      },
    },
    blocks_layout: { items: ['__somersault__'] },
  });
}

function toolbarButton(page: Page, lucideClass: string) {
  return page.locator(`button:has(.${lucideClass})`);
}

async function openToolbarTestPage(
  page: Page,
  {
    contentId,
    contentTitle,
    bodyText = BODY_TEXT,
  }: {
    contentId: string;
    contentTitle: string;
    bodyText?: string;
  },
) {
  await createContent(page, {
    contentType: 'Document',
    contentId,
    contentTitle,
    transition: 'publish',
    bodyModifier: withSomersaultBody(bodyText),
  });

  const contentPath = `/${contentId}`;
  await page.goto(`/@@edit/${contentId}`, { waitUntil: 'networkidle' });
  await waitForPlateEditorReady(page);
  return { contentPath };
}

async function savePage(page: Page, contentPath: string, contentTitle: string) {
  await page.getByRole('button', { name: 'Save' }).click();
  await page.waitForURL(contentPath, { waitUntil: 'load', timeout: 30_000 });
  await expect(page.getByRole('heading', { name: contentTitle })).toBeVisible();
}

test.describe('Plate toolbar — text marks', () => {
  test.beforeEach(async ({ page }) => {
    await login(page);
  });

  test('clicking the Bold button wraps selected text in <strong> and persists after save', async ({
    page,
  }) => {
    const { contentPath } = await openToolbarTestPage(page, {
      contentId: 'toolbar-bold-test',
      contentTitle: 'Toolbar bold test',
    });

    await selectParagraphText(page, { start: 0, end: 5 });

    const boldBtn = toolbarButton(page, 'lucide-bold');
    await expect(boldBtn).toBeVisible();
    await boldBtn.click();

    const editorBoldText = page
      .locator('.slate-editor[data-slate-editor]')
      .locator('strong')
      .first();
    await expect(editorBoldText).toBeVisible();
    await expect(editorBoldText).toHaveText('Hello');

    await savePage(page, contentPath, 'Toolbar bold test');

    const viewBoldText = page
      .locator('strong')
      .filter({ hasText: 'Hello' })
      .first();
    await expect(viewBoldText).toBeVisible();
  });

  test('clicking the Italic button wraps selected text in <em> and persists after save', async ({
    page,
  }) => {
    const { contentPath } = await openToolbarTestPage(page, {
      contentId: 'toolbar-italic-test',
      contentTitle: 'Toolbar italic test',
    });

    await selectParagraphText(page, { start: 0, end: 5 });

    const italicBtn = toolbarButton(page, 'lucide-italic');
    await expect(italicBtn).toBeVisible();
    await italicBtn.click();

    const editorItalicText = page
      .locator('.slate-editor[data-slate-editor]')
      .locator('em')
      .first();
    await expect(editorItalicText).toBeVisible();
    await expect(editorItalicText).toHaveText('Hello');

    await savePage(page, contentPath, 'Toolbar italic test');

    const viewItalicText = page
      .locator('em')
      .filter({ hasText: 'Hello' })
      .first();
    await expect(viewItalicText).toBeVisible();
  });

  test('clicking the Strikethrough button wraps selected text in <s> and persists after save', async ({
    page,
  }) => {
    const { contentPath } = await openToolbarTestPage(page, {
      contentId: 'toolbar-strikethrough-test',
      contentTitle: 'Toolbar strikethrough test',
    });

    await selectParagraphText(page, { start: 0, end: 5 });

    const strikethroughBtn = toolbarButton(page, 'lucide-strikethrough');
    await expect(strikethroughBtn).toBeVisible();
    await strikethroughBtn.click();

    const editorStrikethroughText = page
      .locator('.slate-editor[data-slate-editor]')
      .locator('s')
      .first();
    await expect(editorStrikethroughText).toBeVisible();
    await expect(editorStrikethroughText).toHaveText('Hello');

    await savePage(page, contentPath, 'Toolbar strikethrough test');

    const viewStrikethroughText = page
      .locator('s')
      .filter({ hasText: 'Hello' })
      .first();
    await expect(viewStrikethroughText).toBeVisible();
  });
});
