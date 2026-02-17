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

describe('Relations', () => {
  test('Successful', async () => {
    const randomId = uuid();
    const contentData1 = {
      '@type': 'Document',
      title: `page1${randomId}`,
    };
    const contentData2 = {
      '@type': 'Document',
      title: `page2${randomId}`,
    };

    await cli.createContent({ path: '/', data: contentData1 });
    await cli.createContent({ path: '/', data: contentData2 });

    const relationsData = {
      items: [
        {
          relation: 'addRelatedItems',
          source: `/${contentData1.title}`,
          target: `/${contentData2.title}`,
        },
      ],
    };

    await cli.createRelations({ data: relationsData });
    const relationName = relationsData.items[0].relation;

    const relation = await cli.getRelations({
      relation: relationName,
    });

    expect(relation.data['@id']).toBe(
      `http://localhost:55001/plone/@relations?relation=${relationName}`,
    );
    expect(relation.data.relations[relationName].items_total).toBe(1);
  });
});
