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

describe('Create Type Field', () => {
  test('Successful', async () => {
    const randomId = uuid().replace(/-/g, '');

    const typeFieldData = {
      description: 'Contact information',
      factory: 'fieldset',
      title: `contact${randomId}`,
    };

    const result = await cli.createTypeField({
      contentPath: 'Document',
      data: typeFieldData,
    });

    expect(result.data.id).toBe(typeFieldData.title);
  });
});
