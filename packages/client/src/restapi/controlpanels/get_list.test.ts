import ploneClient from '../../client';
import { setup, teardown } from '../../utils/test';
import { afterEach, beforeEach, describe, expect, test } from 'vitest';

const cli = ploneClient.initialize({
  apiPath: 'http://localhost:55001/plone',
});

await cli.login({ username: 'admin', password: 'secret' });

beforeEach(async () => {
  await setup();
});

afterEach(async () => {
  await teardown();
});

describe('Get ControlpanelList', () => {
  test('Successful', async () => {
    const result = await cli.getControlpanels();

    expect(result.data[0]).toHaveProperty('@id');
    expect(result.data[0]).toHaveProperty('title');
    expect(result.data[1]).toHaveProperty('@id');
    expect(result.data[1]).toHaveProperty('title');
  });
});
