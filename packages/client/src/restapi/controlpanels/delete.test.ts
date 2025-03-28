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

describe('Delete Controlpanel', () => {
  test('Successful - dexterity-types', async () => {
    const path = 'dexterity-types';

    const addControlpanelData = {
      description: 'A custom content-type',
      title: `custom_content_type_delete`,
    };

    await cli.createControlpanel({
      path,
      data: addControlpanelData,
    });

    const deleteControlpanelPath = `${path}/${addControlpanelData.title}`;

    const result = await cli.deleteControlpanel({
      path: deleteControlpanelPath,
    });
    expect(result.status).toBe(204);
  });

  test('Successful - content-rules', async () => {
    const path = 'content-rules';

    const addControlpanelData = {
      cascading: false,
      description: 'New rule added in the testing setup',
      enabled: true,
      event: 'Comment added',
      stop: false,
      title: 'New test rule',
    };

    await cli.createControlpanel({
      path,
      data: addControlpanelData,
    });

    const deleteControlpanelPath = `${path}/rule-1`;

    const result = await cli.deleteControlpanel({
      path: deleteControlpanelPath,
    });
    expect(result.status).toBe(204);
  });
});
