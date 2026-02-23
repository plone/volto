import { setup, teardown } from '../../utils/test';
import { afterEach, beforeEach, describe, expect, test } from 'vitest';
import type { RequestError } from '../types';

import PloneClient from '../../client';

const cli = PloneClient.initialize({
  apiPath: 'http://localhost:55001/plone',
});

await cli.login({ username: 'admin', password: 'secret' });

beforeEach(async () => {
  await setup();
});

afterEach(async () => {
  await teardown();
});

describe('Revert Transactions', () => {
  test('Successful', async () => {
    const transactionsData = {
      transaction_ids: ['sample'],
    };

    try {
      await cli.revertTransactions({
        data: transactionsData,
      });
    } catch (err) {
      expect((err as RequestError).status).toBe(500);
    }
  });
});
