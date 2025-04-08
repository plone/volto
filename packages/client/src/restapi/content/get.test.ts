import ploneClient from '../../client';
import { setup, teardown } from '../../utils/test';
import { afterEach, beforeEach, describe, test, expect } from 'vitest';
import type { RequestError } from '../types';

const cli = ploneClient.initialize({
  apiPath: 'http://localhost:55001/plone',
});

beforeEach(async () => {
  await setup();
});

afterEach(async () => {
  await teardown();
});

describe('getContent', () => {
  test('Successful', async () => {
    const path = '/';
    const result = await cli.getContent({ path });
    expect(result.data.title).toBe('Welcome to Plone');
  });

  test('Failure', async () => {
    const path = '/blah';
    try {
      await cli.getContent({ path });
    } catch (err) {
      expect((err as RequestError).status).toBe(404);
    }
  });

  test('Fullobjects', async () => {
    const path = '/';
    const fullObjects = true;
    const result = await cli.getContent({ path, fullObjects });
    expect(result.data.title).toBe('Welcome to Plone');
  });

  test('Expand', async () => {
    const path = '/';
    const result = await cli.getContent({
      path,
      expand: ['breadcrumbs', 'navigation'],
    });

    expect(result.data.title).toBe('Welcome to Plone');
    expect(result.data['@components'].breadcrumbs.root).toBe(
      'http://localhost:55001/plone',
    );
    expect(result.data['@components'].navigation.items.length).toBeGreaterThan(
      0,
    );
  });

  test.skip('Version', async () => {
    const path = '/';
    const version = 'abcd';
    const result = await cli.getContent({ path, version });
    expect(result.data.title).toBe('Welcome to Plone');
  });

  test.skip('FullObjects & version', async () => {
    const path = '/';
    const fullObjects = true;
    const version = 'abcd';
    const result = await cli.getContent({ path, fullObjects, version });
    expect(result.data.title).toBe('Welcome to Plone');
  });
});
