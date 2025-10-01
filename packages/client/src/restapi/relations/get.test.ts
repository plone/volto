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

describe('Get Relations', () => {
  test('Successful - relation', async () => {
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
          relation: 'relatedItems1',
          source: `/${contentData1.title}`,
          target: `/${contentData2.title}`,
        },
      ],
    };

    await cli.createRelations({ data: relationsData });

    const relation = relationsData.items[0].relation;

    const result = await cli.getRelations({ relation });

    expect(result.data['@id']).toBe(
      `http://localhost:55001/plone/@relations?relation=${relation}`,
    );
    expect(result.data.relations?.[relation]?.items_total).toBe(1);
  });

  test('Successful - source', async () => {
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
          relation: 'relatedItems2',
          source: `/${contentData1.title}`,
          target: `/${contentData2.title}`,
        },
      ],
    };

    await cli.createRelations({ data: relationsData });

    const relation = relationsData.items[0].relation;
    const source = relationsData.items[0].source;

    const result = await cli.getRelations({ source });

    expect(result.data['@id']).toBe(
      `http://localhost:55001/plone/@relations?source=%2F${contentData1.title}`,
    );
    expect(result.data.relations?.[relation]?.items_total).toBe(1);
  });

  test('Successful - source and relation', async () => {
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
          relation: 'relatedItems3',
          source: `/${contentData1.title}`,
          target: `/${contentData2.title}`,
        },
      ],
    };

    await cli.createRelations({ data: relationsData });

    const relation = relationsData.items[0].relation;
    const source = relationsData.items[0].source;

    const result = await cli.getRelations({
      source: source,
      relation: relation,
    });

    expect(result.data['@id']).toBe(
      `http://localhost:55001/plone/@relations?relation=${relation}&source=%2F${contentData1.title}`,
    );
    expect(result.data.relations?.[relation]?.items_total).toBe(1);
  });

  test('Failure', async () => {
    const relationName = 'blah';

    const result = await cli.getRelations({ relation: relationName });

    expect(result.data.relations?.[relationName]?.items_total).toBe(0);
  });
});
