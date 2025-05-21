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

describe('Update Group', () => {
  test('Successful', async () => {
    const randomId = uuid();
    const groupData = {
      groupname: `updategroup${randomId}`,
      description: 'new description',
    };

    await cli.createGroup({ data: groupData });

    const updateGroupData = {
      description: 'changed description',
    };
    const result = await cli.updateGroup({
      groupId: groupData.groupname,
      data: updateGroupData,
    });

    const group = await cli.getGroup({
      groupId: groupData.groupname,
    });

    expect(group.data.description).toBe('changed description');
  });

  test('Failure', async () => {
    const groupId = 'blah';
    const updateGroupData = {
      description: 'asd',
    };

    try {
      await cli.updateGroup({ groupId, data: updateGroupData });
    } catch (err) {
      expect((err as RequestError).status).toBe(400);
    }
  });
});
