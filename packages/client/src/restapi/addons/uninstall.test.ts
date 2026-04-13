import { setup, teardown } from '../../utils/test';
import { afterEach, beforeEach, describe, expect, test } from 'vitest';
import PloneClient from '../../client';

const cli = PloneClient.initialize({
  apiPath: 'http://localhost:55001/plone',
});

await cli.login({ data: { login: 'admin', password: 'secret' } });

beforeEach(async () => {
  await setup();
});

afterEach(async () => {
  await teardown();
});

describe('Uninstall Addon', () => {
  test('Successful', async () => {
    const id = '/plone.app.session';

    const result = await cli.uninstallAddon({ id });
    expect(result.status).toBe(204);
  });
});
