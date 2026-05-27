import { setup, teardown, getUniqueEntityName } from '../../utils/test';
import { afterEach, beforeEach, describe, expect, test } from 'vitest';
import PloneClient from '../../client';

const cli = PloneClient.initialize({
  apiPath: 'http://localhost:55001/plone',
});

await cli.login({ data: { login: 'admin', password: 'secret' } });

beforeEach(async () => {
  await setup();
  await cli.updateRegistry({
    data: {
      'recyclebin-controlpanel.recycling_enabled': true,
    },
  });
});

afterEach(async () => {
  await teardown();
});

const createDeletedDocument = async (title: string) => {
  const created = await cli.createContent({
    path: '/',
    data: {
      '@type': 'Document',
      title,
    },
  });

  await cli.deleteContent({ path: `/${created.data.id}` });

  const recycleBin = await cli.getRecycleBin({
    query: { title, sort_on: 'deletion_date', sort_order: 'descending' },
  });
  const deletedItem = recycleBin.data.items.find(
    (item) => item.title === title,
  );

  expect(deletedItem).toBeDefined();

  return deletedItem!;
};

describe('Recycle bin client', () => {
  test('gets recycle bin items with query parameters', async () => {
    const matchingTitle = getUniqueEntityName('Deleted recycle page');
    const otherTitle = getUniqueEntityName('Other recycle page');

    await createDeletedDocument(matchingTitle);
    await createDeletedDocument(otherTitle);

    const result = await cli.getRecycleBin({
      query: {
        title: matchingTitle,
        has_subitems: false,
        sort_on: 'deletion_date',
        sort_order: 'descending',
        b_start: 0,
        b_size: '10',
      },
    });

    expect(result.status).toBe(200);
    expect(result.data.items_total).toBe(1);
    expect(result.data.items[0].title).toBe(matchingTitle);
    expect(result.data.items[0].has_children).toBe(false);
  });

  test('gets one recycle bin item', async () => {
    const title = getUniqueEntityName('Deleted detail page');
    const deletedItem = await createDeletedDocument(title);

    const result = await cli.getRecycleBinItem({
      id: deletedItem.recycle_id,
      query: { b_start: 0, b_size: 5 },
    });

    expect(result.status).toBe(200);
    expect(result.data.title).toBe(title);
    expect(result.data.recycle_id).toBe(deletedItem.recycle_id);
    expect(result.data.items_total).toBe(0);
  });

  test('restores a recycle bin item', async () => {
    const title = getUniqueEntityName('Deleted restore page');
    const deletedItem = await createDeletedDocument(title);

    const result = await cli.restoreRecycleBinItem({
      id: deletedItem.recycle_id,
      data: {},
    });

    expect(result.status).toBe(200);
    expect(result.data.status).toBe('success');
    expect(result.data.restored_item.title).toBe(title);

    const restored = await cli.getContent({ path: `/${deletedItem.id}` });
    expect(restored.data.title).toBe(title);
  });

  test('purges a recycle bin item', async () => {
    const title = getUniqueEntityName('Deleted purge page');
    const deletedItem = await createDeletedDocument(title);

    const result = await cli.purgeRecycleBinItem({
      id: deletedItem.recycle_id,
    });

    expect(result.status).toBe(204);

    const recycleBin = await cli.getRecycleBin({ query: { title } });
    expect(recycleBin.data.items_total).toBe(0);
  });

  test('empties the recycle bin', async () => {
    const firstTitle = getUniqueEntityName('Deleted empty first page');
    const secondTitle = getUniqueEntityName('Deleted empty second page');

    await createDeletedDocument(firstTitle);
    await createDeletedDocument(secondTitle);

    const result = await cli.emptyRecycleBin();

    expect(result.status).toBe(204);

    const recycleBin = await cli.getRecycleBin({ query: {} });
    expect(recycleBin.data.items_total).toBe(0);
  });

  test('validates ids before making a request', async () => {
    await expect(cli.purgeRecycleBinItem({ id: '' })).rejects.toThrow();
  });

  test('validates supported sort values before making a request', async () => {
    await expect(
      cli.getRecycleBin({
        query: { sort_on: 'size' as 'title' },
      }),
    ).rejects.toThrow();
  });
});
