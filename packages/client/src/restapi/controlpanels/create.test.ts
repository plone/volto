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

describe('Controlpanel', () => {
  test('Successful - content-rules', async () => {
    const randomId = uuid().replace(/-/g, '');
    const path = 'content-rules';

    const contentruleData = {
      cascading: false,
      description: 'New rule added in the testing setup',
      enabled: true,
      event: 'Comment added',
      stop: false,
      title: `New test rule ${randomId}`,
    };

    const result = await cli.createControlpanel({
      path,
      data: contentruleData,
    });
    expect(result.status).toBe(201);
  });

  test('Successful - dexterity-types', async () => {
    const randomId = uuid().replace(/-/g, '');
    const path = 'dexterity-types';

    const dexteritytypeData = {
      description: 'A custom content-type',
      title: `My Custom Content ${randomId}`,
    };

    const result = await cli.createControlpanel({
      path,
      data: dexteritytypeData,
    });
  });
});
