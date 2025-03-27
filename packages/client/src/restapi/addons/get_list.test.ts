import ploneClient from '../../client';
import { describe, test, expect } from 'vitest';

const cli = ploneClient.initialize({
  apiPath: 'http://localhost:55001/plone',
});

await cli.login({ username: 'admin', password: 'secret' });

describe('Get Addons', () => {
  test('Successful', async () => {
    const result = await cli.getAddons();

    expect(result.data.items[0]).toHaveProperty('id');
  });
});
