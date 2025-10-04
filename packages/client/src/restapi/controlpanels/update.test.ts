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

describe('Update Controlpanel', () => {
  test('Successful - editing', async () => {
    const path = 'editing';
    const updateControlpanelData = {
      default_editor: 'TinyMCE',
      ext_editor: true,
    };

    await cli.updateControlpanel({
      path,
      data: updateControlpanelData,
    });

    const controlpanel = await cli.getControlpanel({ path });
    expect(controlpanel.status).toBe(200);
  });

  test('Successful - dexterity-types', async () => {
    const path = 'dexterity-types';

    const addControlpanelData = {
      description: 'A custom content-type',
      title: `custom_content_type`,
    };

    await cli.createControlpanel({
      path,
      data: addControlpanelData,
    });

    const updateControlpanelPath = `${path}/${addControlpanelData.title}`;

    const updateControlpanelData = {
      description: 'A content-type',
      'plone.richtext': true,
      'plone.versioning': true,
      title: 'Changed Content Type',
    };

    await cli.updateControlpanel({
      path: updateControlpanelPath,
      data: updateControlpanelData,
    });

    const result = await cli.getControlpanel({ path });
    expect(result.status).toBe(200);
  });

  test('Successful - content-rules', async () => {
    const randomId = uuid().replace(/-/g, '');
    const path = 'content-rules';

    const addControlpanelData = {
      cascading: false,
      description: 'New rule added in the testing setup',
      enabled: true,
      event: 'Comment added',
      stop: false,
      title: `New test rule ${randomId}`,
    };

    await cli.createControlpanel({
      path,
      data: addControlpanelData,
    });

    const updateControlpanelPath = `${path}/rule-1`;

    const updateControlpanelData = {
      cascading: true,
      description: 'Description changed',
      enabled: false,
      event: 'Comment removed',
      stop: true,
    };

    await cli.updateControlpanel({
      path: updateControlpanelPath,
      data: updateControlpanelData,
    });

    const controlpanel = await cli.getControlpanel({ path });

    expect(controlpanel.data.items[0][0].description).toBe(
      updateControlpanelData.description,
    );
  });
});
