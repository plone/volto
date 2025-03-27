import ploneClient from '../../client';
import { describe, expect, test } from 'vitest';
import { v4 as uuid } from 'uuid';
import type { RequestError } from '../types';

const cli = ploneClient.initialize({
  apiPath: 'http://localhost:55001/plone',
});

await cli.login({ username: 'admin', password: 'secret' });

describe('Get WorkingCopy', () => {
  test('Successful', async () => {
    // We need to install 'plone.app.iterate' in order to use workingcopy endpoint
    await cli.installAddon({ addonId: '/plone.app.iterate' });

    const randomId = uuid();
    const path = '/';
    const contentData = {
      '@type': 'Document',
      title: `get-workingcopy${randomId}`,
    };

    await cli.createContent({ path, data: contentData });
    await cli.createWorkingcopy({ path: contentData.title });

    const result = await cli.getWorkingcopy({ path: contentData.title });

    expect(result.data.working_copy.title).toBe(contentData.title);
  });

  test('Failure', async () => {
    // We need to install 'plone.app.iterate' in order to use workingcopy endpoint
    await cli.installAddon({ addonId: '/plone.app.iterate' });
    const path = 'blah';

    try {
      await cli.getWorkingcopy({ path });
    } catch (err) {
      expect((err as RequestError).status).toBe(404);
    }
  });
});
