import { expect, test } from 'vitest';

import { action, loader } from './reset-fetcher';

test('action function returns a response null', async () => {
  const response = await action();
  expect(response).toBe(null);
});

test('loader function returns a response null', async () => {
  const response = await loader();
  expect(response).toBe(null);
});
