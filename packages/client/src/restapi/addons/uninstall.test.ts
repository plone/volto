import { setup, teardown } from '../../utils/test';
import { afterEach, beforeEach, describe, expect, test } from 'vitest';
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

describe('Uninstall Addon', () => {
  test('Successful', async () => {
    const addonId = '/plone.app.session';

    const result = await cli.uninstallAddon({ addonId });
    expect(result.status).toBe(204);
  });
});
