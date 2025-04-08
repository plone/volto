import ploneClient from '../../client';
import { setup, teardown } from '../../utils/test';
import { afterEach, beforeEach, describe, expect, test } from 'vitest';
import { v4 as uuid } from 'uuid';

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

describe('Get Rules', () => {
  test.skip('Successful', async () => {
    const randomId = uuid();
    const ruleId = `get-rule${randomId}`;

    await cli.createRule({ ruleId });

    const result = await cli.getRules();

    expect(result.data['content-rules']?.assigned_rules.length).toBeGreaterThan(
      0,
    );
  });
});
