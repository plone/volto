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

describe('Search', () => {
  test('Successful', async () => {
    const randomId = uuid();
    const contentData = {
      '@type': 'Document',
      title: `page1${randomId}`,
      description: 'some-unique-data',
    };

    await cli.createContent({ path: '/', data: contentData });

    const query = {
      SearchableText: contentData.description,
    };

    const result = await cli.search({ query });

    expect(result.data.items[0].description).toBe(contentData.description);
  });

  test('Successful - metadata', async () => {
    const randomId = uuid();
    const contentData = {
      '@type': 'Document',
      title: `page1${randomId}`,
      description: 'some-unique-data',
    };

    await cli.createContent({ path: '/', data: contentData });

    const query = {
      SearchableText: contentData.description,
      metadata_fields: ['created', 'modified'],
    };

    const result = await cli.search({ query });

    expect(result.data.items[0]).toHaveProperty('created');
    expect(result.data.items[0]).toHaveProperty('modified');
  });
});
