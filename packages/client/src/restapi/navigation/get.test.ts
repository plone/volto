import ploneClient from '../../client';
import { afterEach, beforeEach, describe, expect, test } from 'vitest';
import { setup, teardown } from '../../utils/test';
import type { RequestError } from '../types';

const cli = ploneClient.initialize({
  apiPath: 'http://localhost:55001/plone',
});

await cli.login({ username: 'admin', password: 'secret' });

beforeEach(async () => {
  await setup();
});

afterEach(async () => {
  await teardown();
});

describe('Get Navigation', () => {
  test('Successful', async () => {
    const path = '/';
    const result = await cli.getNavigation({ path });

    expect(result.data['@id']).toBe('http://localhost:55001/plone/@navigation');
  });

  test('Failure', async () => {
    const path = '/blah';

    try {
      await cli.getNavigation({ path });
    } catch (err) {
      expect((err as RequestError).status).toBe(404);
    }
  });

  test('Depth parameter', async () => {
    await cli.createContent({
      path: '/',
      data: {
        '@type': 'Document',
        title: 'Level 1',
      },
    });
    await cli.createContent({
      path: '/level-1',
      data: {
        '@type': 'Document',
        title: 'Level 2',
      },
    });
    await cli.createContent({
      path: '/level-1/level-2',
      data: {
        '@type': 'Document',
        title: 'Level 3',
      },
    });

    const depth2 = await cli.getNavigation({ path: '/', depth: 2 });
    expect(depth2.status).toBe(200);

    const level1_1 = depth2.data.items.find((item) => item.title === 'Level 1');
    expect(level1_1?.items[0].title).toBe('Level 2');
    expect(level1_1?.items[0].items.length).toBe(0);

    const depth3 = await cli.getNavigation({ path: '/', depth: 3 });
    expect(depth3.status).toBe(200);

    const level1_2 = depth3.data.items.find((item) => item.title === 'Level 1');
    expect(level1_2?.items[0].items.length).toBe(1);
    expect(level1_2?.items[0].items[0].title).toBe('Level 3');
  });
});
