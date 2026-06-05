import { expect, test } from '../../../tooling/playwright/test';
import { login } from '../../../tooling/playwright/login';
import { createContent } from '../../../tooling/playwright/content';
import { waitForPlateEditorReady } from '../../../tooling/playwright/plate';
import { getEditorHandle, getNodeByPath } from '@platejs/playwright';

const EMPTY_PAGE_ID = 'maps-block-empty-page';
const VIEW_PAGE_ID = 'maps-block-view-page';
const MAP_IFRAME_SRC =
  'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d182321.8188500324!2d25.929831387943064!3d44.43770726012982!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40b1f93abf3cad4f%3A0xac0632e37c9ca628!2sBucharest%2C%20Romania!5e0!3m2!1sen!2sde!4v1773825155685!5m2!1sen!2sde';
const MAP_EMBED_CODE = `<iframe src="${MAP_IFRAME_SRC}" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy"></iframe>`;
const MAP_TITLE = 'Bucharest map';

async function createMapsEditPage(
  page: Parameters<typeof test>[0]['page'],
  mapsBlockData: Record<string, unknown> = {},
) {
  await createContent(page, {
    contentType: 'Document',
    contentId: EMPTY_PAGE_ID,
    contentTitle: 'Maps block edit page',
    transition: 'publish',
    bodyModifier: (body) => ({
      ...body,
      blocks: {
        __somersault__: {
          '@type': '__somersault__',
          value: [
            {
              type: 'title',
              children: [{ text: 'Maps block edit page' }],
            },
            {
              type: 'p',
              children: [{ text: 'Text before maps block' }],
            },
            {
              type: 'unknown',
              '@type': 'maps',
              children: [{ text: '' }],
              ...mapsBlockData,
            },
            {
              type: 'p',
              children: [{ text: 'Text after maps block' }],
            },
          ],
        },
      },
      blocks_layout: {
        items: ['__somersault__'],
      },
    }),
  });

  await page.goto(`/@@edit/${EMPTY_PAGE_ID}`);
  await page.locator('[data-slate-editor]').waitFor({ state: 'visible' });
  await waitForPlateEditorReady(page);
}

async function createMapsViewPage(page: Parameters<typeof test>[0]['page']) {
  await createContent(page, {
    contentType: 'Document',
    contentId: VIEW_PAGE_ID,
    contentTitle: 'Maps block view page',
    transition: 'publish',
    bodyModifier: (body) => ({
      ...body,
      blocks: {
        __somersault__: {
          '@type': '__somersault__',
          value: [
            {
              type: 'title',
              children: [{ text: 'Maps block view page' }],
            },
            {
              type: 'p',
              children: [{ text: 'Text before maps block' }],
            },
            {
              type: 'unknown',
              '@type': 'maps',
              title: MAP_TITLE,
              url: MAP_IFRAME_SRC,
              align: 'full',
              children: [{ text: '' }],
            },
            {
              type: 'p',
              children: [{ text: 'Text after maps block' }],
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

test('Maps block shows placeholder and embed instructions while empty', async ({
  page,
}) => {
  await login(page);
  await createMapsEditPage(page);

  await expect(page.getByPlaceholder('Enter map Embed Code')).toBeVisible();
  await expect(
    page.getByText(/Please enter the Embed Code provided by Google Maps/i),
  ).toBeVisible();
  await expect(page.locator('.maps iframe.google-map')).toHaveCount(0);
});

test('Maps block shows an error for invalid embed code', async ({ page }) => {
  await login(page);
  await createMapsEditPage(page);

  const input = page.getByPlaceholder('Enter map Embed Code');
  await input.fill('https://example.com/not-an-iframe');
  await input.press('Enter');

  await expect(
    page.getByText(
      'Embed code error, please follow the instructions and try again.',
    ),
  ).toBeVisible();
  await expect(page.locator('.maps iframe.google-map')).toHaveCount(0);
});

test('Maps block extracts iframe src and switches to iframe edit mode', async ({
  page,
}) => {
  await login(page);
  await createMapsEditPage(page);
  const editorHandle = await getEditorHandle(page);

  const input = page.getByPlaceholder('Enter map Embed Code');
  await input.fill(MAP_EMBED_CODE);
  await input.press('Enter');

  const iframe = page.locator('.maps iframe.google-map');
  await expect(iframe).toBeVisible();
  await expect(iframe).toHaveAttribute('src', MAP_IFRAME_SRC);
  await expect(input).toHaveCount(0);

  const mapsNodeHandle = await getNodeByPath(page, editorHandle, [2]);
  const mapsNode = (await mapsNodeHandle.jsonValue()) as Record<
    string,
    unknown
  >;
  expect(mapsNode.type).toBe('unknown');
  expect(mapsNode['@type']).toBe('maps');
  expect(mapsNode.url).toBe(MAP_IFRAME_SRC);
});

test('Maps block renders iframe in published view mode', async ({ page }) => {
  await createMapsViewPage(page);
  const response = await page.goto(`/${VIEW_PAGE_ID}`);
  expect(response?.ok()).toBeTruthy();

  await expect(page.getByText('Text before maps block')).toBeVisible();
  await expect(page.getByText('Text after maps block')).toBeVisible();

  const iframe = page.locator('.maps iframe.google-map');
  await expect(iframe).toBeVisible();
  await expect(iframe).toHaveAttribute('src', MAP_IFRAME_SRC);
  await expect(iframe).toHaveAttribute('title', MAP_TITLE);
  await expect(page.locator('.maps .maps-inner.w-full')).toHaveCount(1);
});
