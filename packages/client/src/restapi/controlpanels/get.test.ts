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

describe('Get Controlpanel', () => {
  test('Successful - editing', async () => {
    const path = 'editing';

    const result = await cli.getControlpanel({ path });

    expect(result.data['@id']).toBe(
      `http://localhost:55001/plone/@controlpanels/${path}`,
    );
    expect(result.data.group).toBe('Content');
  });

  test('Successful - content-rules', async () => {
    const path = 'content-rules';

    const result = await cli.getControlpanel({ path });

    expect(result.data['@id']).toBe(
      `http://localhost:55001/plone/@controlpanels/${path}`,
    );
    expect(result.data.title).toBe('Content Rules');
  });

  test('Successful - dexterity-types', async () => {
    const path = 'dexterity-types';

    const result = await cli.getControlpanel({ path });

    expect(result.data['@id']).toBe(
      `http://localhost:55001/plone/@controlpanels/${path}`,
    );
    expect(result.data.title).toBe('Content Types');
  });
});
