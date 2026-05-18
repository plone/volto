import { expect, test } from '../../../tooling/playwright/test';
import type { Locator, Page } from '@playwright/test';
import { login } from '../../../tooling/playwright/login';
import { createContent } from '../../../tooling/playwright/content';

async function getInheritedBlockWidth(locator: Locator) {
  return locator.evaluate((element) => {
    let current: HTMLElement | null = element as HTMLElement;

    while (current) {
      const value = getComputedStyle(current).getPropertyValue('--block-width');
      if (value.trim()) return value.trim();
      current = current.parentElement;
    }

    return '';
  });
}

async function getRootVariable(page: Page, name: string) {
  return page.evaluate((variableName: string) => {
    return getComputedStyle(document.documentElement)
      .getPropertyValue(variableName)
      .trim();
  }, name);
}

async function setupSomersaultEditPage(
  page: Page,
  {
    pageId,
    contentTitle,
    paragraph,
  }: {
    pageId: string;
    contentTitle: string;
    paragraph: Record<string, unknown>;
  },
) {
  await login(page);
  await createContent(page, {
    contentType: 'Document',
    contentId: pageId,
    contentTitle,
    transition: 'publish',
    bodyModifier: (body) => ({
      ...body,
      blocks: {
        __somersault__: {
          '@type': '__somersault__',
          value: [
            {
              type: 'title',
              children: [{ text: contentTitle }],
            },
            paragraph,
          ],
        },
      },
    }),
  });

  await page.goto(`/@@edit/${pageId}`);
  await page.locator('[data-slate-editor]').waitFor({ state: 'visible' });
}

test('Somersault edit mode injects the configured CSS custom property for an explicit block width', async ({
  page,
}) => {
  await setupSomersaultEditPage(page, {
    pageId: 'width-explicit-page',
    contentTitle: 'Block width explicit page',
    paragraph: {
      type: 'unknown',
      '@type': 'image',
      blockWidth: 'layout',
      children: [{ text: '' }],
    },
  });

  const imageBlock = page.locator('.image.align.block').first();
  await expect(imageBlock).toBeVisible();

  const expectedWidth = await getRootVariable(page, '--layout-container-width');
  const blockWidth = await getInheritedBlockWidth(imageBlock);

  expect(blockWidth).toBe(expectedWidth);
});

test('Somersault edit mode normalizes paragraph width to the configured default', async ({
  page,
}) => {
  await setupSomersaultEditPage(page, {
    pageId: 'width-default-page',
    contentTitle: 'Block width default page',
    paragraph: {
      type: 'p',
      children: [{ text: 'Paragraph without explicit width' }],
    },
  });

  await expect(
    page.getByText('Paragraph without explicit width'),
  ).toBeVisible();

  const expectedWidth = await getRootVariable(page, '--narrow-container-width');
  const blockWidth = await getInheritedBlockWidth(
    page.getByText('Paragraph without explicit width'),
  );

  expect(blockWidth).toBe(expectedWidth);
});
