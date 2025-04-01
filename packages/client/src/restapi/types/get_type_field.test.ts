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

describe('Get Type', () => {
  test('Successful', async () => {
    const contentPath = 'Document';
    const randomId = uuid().replace(/-/g, '');
    // We need to remove hyphens because they are replaced by underscores in title

    const typeFieldData = {
      description: 'Contact information',
      factory: 'fieldset',
      title: `contact${randomId}`,
    };

    await cli.createTypeField({
      contentPath,
      data: typeFieldData,
    });

    const result = await cli.getTypeField({
      contentFieldPath: `${contentPath}/${typeFieldData.title}`,
    });

    expect(result.data.title).toBe(typeFieldData.title);
  });

  test('Failure', async () => {
    try {
      await cli.getTypeField({ contentFieldPath: 'blah' });
    } catch (err) {
      expect((err as RequestError).status).toBe(404);
    }
  });
});
