import { expect, test as base } from '@playwright/test';

import { setup, teardown } from './reset-fixture';

export const test = base.extend({});

test.beforeEach(async ({ request }) => {
  await teardown(request);
  await setup(request);
});

// In Seven, the teardown after the test cause to unwanted refresh
// in views to errors that mislead about the actual test result.
// So we do the teardown and setup before each test only.
// test.afterEach(async ({ request }) => {
//  await teardown(request);
// });

export { expect };
