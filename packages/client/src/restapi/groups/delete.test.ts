import { setup, teardown } from '../../utils/test';
import { afterEach, beforeEach, describe, expect, test } from 'vitest';
import PloneClient from '../../client';
import { v4 as uuid } from 'uuid';
import type { RequestError } from '../types';

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

describe('Delete Group', () => {
  test('Successful', async () => {
    const randomId = uuid();
    const groupData = {
      groupname: `deletegroup${randomId}`,
    };

    await cli.createGroup({ data: groupData });

    const result = await cli.deleteGroup({ groupId: groupData.groupname });
    expect(result.status).toBe(204);
  });

  test('Failure', async () => {
    const groupId = 'blah';

    try {
      await cli.deleteGroup({ groupId });
    } catch (err) {
      expect((err as RequestError).status).toBe(404);
    }
  });
});
