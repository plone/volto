import ploneClient from '../../client';
import { setup, teardown } from '../../utils/test';
import { v4 as uuid } from 'uuid';
import { afterEach, beforeEach, describe, expect, test } from 'vitest';
import type { RequestError } from '../types';

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

describe('Get Group', () => {
  test('Successful', async () => {
    const groupId = '/Administrators';

    const result = await cli.getGroup({ groupId });
    expect(result.data.id).toBe('Administrators');
  });

  test('Successful - with create', async () => {
    const randomId = uuid();
    const groupData = {
      groupname: `getgroup${randomId}`,
    };

    await cli.createGroup({ data: groupData });

    const result = await cli.getGroup({ groupId: groupData.groupname });
    expect(result.data.id).toBe(groupData.groupname);
  });

  test('Failure', async () => {
    const groupId = 'blah';

    try {
      await cli.getGroup({ groupId });
    } catch (err) {
      expect((err as RequestError).status).toBe(404);
    }
  });
});
