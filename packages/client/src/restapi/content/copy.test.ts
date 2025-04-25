import { setup, teardown } from '../../utils/test';
import ploneClient from '../../client';
import {
  afterEach,
  beforeEach,
  beforeAll,
  describe,
  expect,
  test,
} from 'vitest';
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

describe('Copy', () => {
  test('Successful', async () => {
    const randomId = uuid();

    const contentData = {
      '@type': 'Document',
      title: `copy-page${randomId}`,
    };

    await cli.createContent({ path: '/', data: contentData });

    const copyData = {
      source: `http://localhost:55001/plone/${contentData.title}`,
    };

    const result = await cli.copyContent({ path: '/', data: copyData });

    expect(result.data[0]['target']).toBe(
      `http://localhost:55001/plone/copy_of_${contentData.title}`,
    );
  });

  test('Successful Multiple', async () => {
    const randomId = uuid();

    const contentData1 = {
      '@type': 'Document',
      title: `copy-multi-1-${randomId}`,
    };
    const contentData2 = {
      '@type': 'Document',
      title: `copy-multi-2-${randomId}`,
    };

    await cli.createContent({ path: '/', data: contentData1 });
    await cli.createContent({ path: '/', data: contentData2 });

    const copyMultipleData = {
      source: [
        `http://localhost:55001/plone/${contentData1.title}`,
        `http://localhost:55001/plone/${contentData2.title}`,
      ],
    };

    const result = await cli.copyContent({
      path: '/',
      data: copyMultipleData,
    });

    expect(result.data[0].target).toBe(
      `http://localhost:55001/plone/copy_of_${contentData1.title}`,
    );
    expect(result.data[1].target).toBe(
      `http://localhost:55001/plone/copy_of_${contentData2.title}`,
    );
  });
});
