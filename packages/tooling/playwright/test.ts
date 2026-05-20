import { expect, test as base } from '@playwright/test';

import { setup, teardown } from './reset-fixture';

type TestFixtures = {
  resetBackend: void;
};

export const test = base.extend<TestFixtures>({
  resetBackend: [
    async ({ page, request }, use) => {
      await teardown(request);
      await setup(request);

      try {
        await use();
      } finally {
        // Close the live page before resetting the backend so teardown does
        // not trigger refresh noise that obscures the real test failure.
        await page.close().catch(() => {});
        await teardown(request);
      }
    },
    { auto: true },
  ],
});

export { expect };
