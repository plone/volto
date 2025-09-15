import { setup, teardown } from '../../utils/test';
import PloneClient from '../../client';
import { afterEach, beforeEach, describe, expect, test } from 'vitest';

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

describe('Install Addon Profile', () => {
  test('Successful', async () => {
    const addonId = '/plone.restapi';
    const profile = 'import/testing-workflows';

    const result = await cli.installAddonProfile({ addonId, profile });
    expect(result.status).toBe(204);
  });
});
