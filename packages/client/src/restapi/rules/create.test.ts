import { setup, teardown } from '../../utils/test';
import { afterEach, beforeEach, describe, expect, test } from 'vitest';
import PloneClient from '../../client';
import { v4 as uuid } from 'uuid';

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

describe('Rule', () => {
  test.skip('Successful', async () => {
    const randomId = uuid();
    const ruleId = `add-rule${randomId}`;

    const result = await cli.createRule({ ruleId });

    expect(result.data.message).toBe(
      `Successfully assigned the rule ${ruleId}`,
    );
  });
});
