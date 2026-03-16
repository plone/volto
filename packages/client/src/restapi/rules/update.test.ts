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

describe('Update Rules', () => {
  test.skip('Successful - apply subfolder', async () => {
    const randomId = uuid();
    const ruleId = `update-rule${randomId}`;

    await cli.createRule({ ruleId });

    const updateRuleData = {
      'form.button.Bubble': true,
      rules_ids: [ruleId],
    };

    const result = await cli.updateRules({
      data: updateRuleData,
    });

    expect(result.data.message).toBe(
      `Successfully applied ['${ruleId}'] to subfolders`,
    );
  });

  test.skip('Successful - enable', async () => {
    const randomId = uuid();
    const ruleId = `update-rule${randomId}`;

    await cli.createRule({ ruleId });

    const updateRuleData = {
      'form.button.Enable': true,
      rules_ids: [ruleId],
    };

    const result = await cli.updateRules({
      data: updateRuleData,
    });

    expect(result.data.message).toBe(
      `Successfully enabled rules ['${ruleId}']`,
    );
  });

  test.skip('Successful - moveup', async () => {
    const randomId = uuid();
    const ruleId = `update-rule${randomId}`;

    await cli.createRule({ ruleId });

    const updateRuleData = {
      operation: 'move_up',
      rule_id: ruleId,
    };

    const result = await cli.updateRules({
      data: updateRuleData,
    });

    expect(result.data.message).toBe('Successfully applied the move_up');
  });
});
