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

describe('Group', () => {
  test('Successful', async () => {
    const randomId = uuid();

    const groupData = {
      groupname: `addgroup${randomId}`,
    };

    const result = await cli.createGroup({ data: groupData });

    expect(result.data.id).toBe(groupData.groupname);
  });
});
