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

describe('Workingcopy', () => {
  test('Successful', async () => {
    // We need to install 'plone.app.iterate' in order to use workingcopy endpoint
    await cli.installAddon({ addonId: '/plone.app.iterate' });

    const randomId = uuid();
    const path = '/';
    const contentData = {
      '@type': 'Document',
      title: `add-workingcopy${randomId}`,
    };

    await cli.createContent({ path, data: contentData });

    const result = await cli.createWorkingcopy({ path: contentData.title });

    expect(result.data['@id']).toBe(
      `http://localhost:55001/plone/working_copy_of_${contentData.title}`,
    );
  });

  test('Failure', async () => {
    // We need to install 'plone.app.iterate' in order to use workingcopy endpoint
    await cli.installAddon({ addonId: '/plone.app.iterate' });

    const path = 'blah';

    try {
      await cli.createWorkingcopy({ path });
    } catch (err) {
      expect((err as RequestError).status).toBe(404);
    }
  });
});
