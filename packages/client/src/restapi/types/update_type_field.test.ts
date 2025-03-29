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

describe('Update Type', () => {
  test('Successful - field', async () => {
    const randomId = uuid().replace(/-/g, '');
    // We need to remove hyphens because they are replaced by underscores in title

    const createTypeFieldData = {
      description: 'Contact information',
      factory: 'fieldset',
      title: `contact_info${randomId}`,
    };

    await cli.createTypeField({
      contentPath: 'Document',
      data: createTypeFieldData,
    });

    const contentPath = `Document/${createTypeFieldData.title}`;

    const updateTypeFieldData = {
      fields: ['author_email'],
      title: `Sample info${randomId}`,
    };

    const result = await cli.updateTypeField({
      contentPath,
      data: updateTypeFieldData,
    });

    const typeField = await cli.getTypeField({
      contentFieldPath: contentPath,
    });

    expect(typeField.data.title).toBe(updateTypeFieldData.title);
  });

  test('Successful - fieldset', async () => {
    const randomId = uuid();

    const updateTypeFieldData = {
      fieldsets: [
        {
          fields: ['author_email'],
          id: `contact_info${randomId}`,
          title: `Contact info${randomId}`,
        },
      ],
    };

    await cli.updateTypeField({
      contentPath: 'Document',
      data: updateTypeFieldData,
    });

    const type = await cli.getType({ contentType: 'Document' });
    const lastIndex = type.data.fieldsets.length - 1;

    expect(type.data.fieldsets?.[lastIndex].id).toBe(
      updateTypeFieldData.fieldsets[0].id,
    );
  });
});
