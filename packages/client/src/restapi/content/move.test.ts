import { setup, teardown } from '../../utils/test';
import {
  afterEach,
  beforeEach,
  beforeAll,
  describe,
  expect,
  test,
} from 'vitest';
import ploneClient from '../../client';
import { v4 as uuid } from 'uuid';

const cli = ploneClient.initialize({
  apiPath: 'http://localhost:55001/plone',
});

beforeAll(async () => {
  await cli.login({ username: 'admin', password: 'secret' });
});

beforeEach(async () => {
  await setup();
});

afterEach(async () => {
  await teardown();
});

describe('MoveContent', () => {
  test('Successful', async () => {
    const randomId = uuid();

    const contentData = {
      '@type': 'Document',
      title: 'frontpage',
    };

    await cli.createContent({
      path: '/',
      data: contentData,
    });

    const moveContentData = {
      '@type': 'Document',
      title: `move-page${randomId}`,
    };

    await cli.createContent({
      path: '/',
      data: moveContentData,
    });

    const moveData = {
      source: `http://localhost:55001/plone/${moveContentData.title}`,
    };

    const result = await cli.moveContent({
      path: contentData.title,
      data: moveData,
    });

    expect(result.data[0]['target']).toBe(
      `http://localhost:55001/plone/${contentData.title}/${moveContentData.title}`,
    );
  });

  test('Successful - multiple', async () => {
    const randomId = uuid();

    const contentData = {
      '@type': 'Document',
      title: 'frontpage',
    };

    await cli.createContent({
      path: '/',
      data: contentData,
    });

    const moveContentData1 = {
      '@type': 'Document',
      title: `copy-multi-1-${randomId}`,
    };
    const moveContentData2 = {
      '@type': 'Document',
      title: `copy-multi-2-${randomId}`,
    };

    await cli.createContent({
      path: '/',
      data: moveContentData1,
    });
    await cli.createContent({
      path: '/',
      data: moveContentData2,
    });

    const moveMultipleData = {
      source: [
        `http://localhost:55001/plone/${moveContentData1.title}`,
        `http://localhost:55001/plone/${moveContentData2.title}`,
      ],
    };

    const result = await cli.moveContent({
      path: contentData.title,
      data: moveMultipleData,
    });

    expect(result.data[0]['target']).toBe(
      `http://localhost:55001/plone/${contentData.title}/${moveContentData1.title}`,
    );
    expect(result.data[1]['target']).toBe(
      `http://localhost:55001/plone/${contentData.title}/${moveContentData2.title}`,
    );
  });
});
