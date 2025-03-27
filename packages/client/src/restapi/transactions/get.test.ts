import ploneClient from '../../client';
import { describe, expect, test } from 'vitest';

const cli = ploneClient.initialize({
  apiPath: 'http://localhost:55001/plone',
});

await cli.login({ username: 'admin', password: 'secret' });

describe('Get Transactions', () => {
  test('Successful', async () => {
    const result = await cli.getTransactions();
    expect(result.status).toBe(200);
  });
});
