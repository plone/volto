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

describe('Delete Rules', () => {
  test.skip('Successful', async () => {
    const randomId = uuid();
    const ruleId = `delete-rule${randomId}`;

    await cli.createRule({ ruleId });

    const deleteRuleData = {
      rules_ids: [ruleId],
    };

    const result = await cli.deleteRules({ data: deleteRuleData });
    expect(result.status).toBe(204);
  });
});
