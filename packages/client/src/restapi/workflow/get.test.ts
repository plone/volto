import ploneClient from '../../client';
import { setup, teardown } from '../../utils/test';
import { afterEach, beforeEach, describe, expect, test } from 'vitest';
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

describe('Get Workflow', () => {
  test('Successful', async () => {
    const path = '/';

    const result = await cli.getWorkflow({ path });

    expect(result.data['@id']).toBe('http://localhost:55001/plone/@workflow');
  });

  test('Successful - page', async () => {
    const contentData = {
      '@type': 'Document',
      title: 'workflowtest',
    };

    await cli.createContent({ path: '/', data: contentData });

    const result = await cli.getWorkflow({ path: contentData.title });

    expect(result.data['@id']).toBe(
      `http://localhost:55001/plone/${contentData.title}/@workflow`,
    );
  });

  test('Failure', async () => {
    const path = 'blah';

    try {
      await cli.getWorkflow({ path });
    } catch (err) {
      expect((err as RequestError).status).toBe(404);
    }
  });
});
