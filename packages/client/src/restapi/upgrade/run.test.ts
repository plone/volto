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

describe('Upgrade', () => {
  test('Successful', async () => {
    const upgradeDryData = {
      dry_run: true,
    };

    const result = await cli.runUpgrade({ data: upgradeDryData });

    expect(result.data['@id']).toBe('http://localhost:55001/plone/@upgrade');
    expect(result.data.dry_run).toBe(true);
  });

  test('Successful', async () => {
    const upgradeData = {
      dry_run: false,
    };

    const result = await cli.runUpgrade({
      data: upgradeData,
    });

    expect(result.data['@id']).toBe('http://localhost:55001/plone/@upgrade');
    expect(result.data.dry_run).toBe(false);
    expect(result.data.upgraded).toBe(true);
  });
});
