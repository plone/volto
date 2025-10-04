import { setup, teardown } from '../../utils/test';
import { afterEach, beforeEach, describe, expect, test } from 'vitest';
import PloneClient from '../../client';
import type { CreateContentArgs } from './create';
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

describe('createContent', () => {
  test('Successful', async () => {
    const data: CreateContentArgs['data'] = {
      '@type': 'Document',
      title: 'My Page',
    };

    const result = await cli.createContent({
      path: '/',
      data,
    });

    expect(result.data['@id']).toBe('http://localhost:55001/plone/my-page');
    expect(result.data.title).toBe('My Page');
  });

  test('Create content in path', async () => {
    const myPageData = {
      '@type': 'Document',
      title: 'My Page',
    };

    await cli.createContent({
      path: '/',
      data: myPageData,
    });

    const path = '/my-page';
    const data: CreateContentArgs['data'] = {
      '@type': 'Document',
      title: 'My nested Page',
    };

    const result = await cli.createContent({
      path,
      data,
    });

    expect(result.data['@id']).toBe(
      'http://localhost:55001/plone/my-page/my-nested-page',
    );
    expect(result.data.title).toBe('My nested Page');
  });

  test('Failure', async () => {
    const path = '/blah';
    const data: CreateContentArgs['data'] = {
      '@type': 'Document',
      title: 'My Page',
    };

    try {
      await cli.createContent({
        path,
        data,
      });
    } catch (err) {
      expect((err as RequestError).status).toBe(404);
    }
  });
});
