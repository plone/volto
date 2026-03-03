import { expect, test } from '../../../tooling/playwright/test';
import { login } from '../../../tooling/playwright/login';
import { createContent } from '../../../tooling/playwright/content';

const IMAGE_ID = 'halfdome-local-image';
const PAGE_ID = 'image-block-nav-page';

async function setupImageBlockPage(page: Parameters<typeof test>[0]['page']) {
  await createContent(page, {
    contentType: 'Image',
    contentId: IMAGE_ID,
    contentTitle: 'Half Dome Local',
    image: {
      sourceFilename: 'halfdome2022.jpg',
      filename: 'halfdome2022.jpg',
      'content-type': 'image/jpeg',
    },
  });

  await createContent(page, {
    contentType: 'Document',
    contentId: PAGE_ID,
    contentTitle: 'Image block nav page',
    transition: 'publish',
    bodyModifier: (body) => ({
      ...body,
      blocks: {
        __somersault__: {
          '@type': '__somersault__',
          value: [
            {
              type: 'volto_title',
              children: [{ text: 'Image block nav page' }],
            },
            {
              type: 'p',
              children: [{ text: 'Text before image' }],
            },
            {
              type: 'unknown',
              '@type': 'image',
              children: [{ text: '' }],
            },
            {
              type: 'p',
              children: [{ text: 'Text after image' }],
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
  await page.locator('[data-slate-editor]').waitFor({ state: 'visible' });
}

test('Image block can select a pre-uploaded local image URL', async ({
  page,
}) => {
  await login(page);
  await setupImageBlockPage(page);
  await page.getByText('Browse the site, drop an image, or use a URL').click();
  await expect(page.locator('#sidebar form')).toHaveCount(1);

  const urlInput = page.getByPlaceholder('Enter an image URL');
  await urlInput.fill(`/${IMAGE_ID}`);
  await urlInput.press('Enter');

  await expect(
    page.locator(`img[src*="/${IMAGE_ID}/@@images/image"]`).first(),
  ).toBeVisible();
});

test('Image block selection, arrows, enter, and sidebar lifecycle', async ({
  page,
}) => {
  await login(page);
  await setupImageBlockPage(page);
  await page.getByText('Browse the site, drop an image, or use a URL').click();
  await expect(page.locator('#sidebar form')).toHaveCount(1);

  const urlInput = page.getByPlaceholder('Enter an image URL');
  await urlInput.fill(`/${IMAGE_ID}`);
  await urlInput.press('Enter');
  const image = page.locator(`img[src*="/${IMAGE_ID}/@@images/image"]`).first();
  await expect(image).toBeVisible();

  // Enter from selected image should leave image unselected.
  await image.click();
  await page.keyboard.press('Enter');
  await expect(page.locator('#sidebar form')).toHaveCount(0);

  // Select image block and test arrow navigation around it.
  await image.click();
  await expect(page.locator('#sidebar form')).toHaveCount(1);

  // Arrow up from selected image selects previous text block (sidebar unmounts).
  await page.keyboard.press('ArrowUp');
  await expect(page.locator('#sidebar form')).toHaveCount(0);

  // Arrow down from previous text selects image block again (sidebar mounts).
  await page.keyboard.press('ArrowDown');
  await expect(page.locator('#sidebar form')).toHaveCount(1);

  // Arrow down from selected image selects trailing text (sidebar unmounts).
  await page.keyboard.press('ArrowDown');
  await expect(page.locator('#sidebar form')).toHaveCount(0);

  // Click image -> selected/mounted.
  await image.click();
  await expect(page.locator('#sidebar form')).toHaveCount(1);
});
