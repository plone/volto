import { setup, teardown } from '../../utils/test';
import { afterEach, beforeEach, describe, expect, test } from 'vitest';
import PloneClient from '../../client';
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

describe('Workflow', () => {
  test('Successful', async () => {
    const path = '/';
    const contentData = {
      '@type': 'Document',
      title: 'workflowpage',
    };
    await cli.createContent({ path, data: contentData });

    const result = await cli.createWorkflow({ path: contentData.title });

    expect(result.data.action).toBe('publish');
  });

  test('Successful - with body', async () => {
    const path = '/';
    const contentData = {
      '@type': 'Document',
      title: 'workflowpage',
    };
    await cli.createContent({ path, data: contentData });

    const workflowData = {
      comment: 'sample',
    };

    const result = await cli.createWorkflow({
      path: contentData.title,
      data: workflowData,
    });

    expect(result.data.comments).toBe('sample');
  });

  test('Failure', async () => {
    const path = '/';
    const contentData = {
      '@type': 'Document',
      title: 'workflowpage',
    };
    await cli.createContent({ path, data: contentData });

    const workflowData = {
      comment: 'sample',
    };

    try {
      await cli.createWorkflow({
        path: 'blah',
        data: workflowData,
      });
    } catch (err) {
      expect((err as RequestError).status).toBe(404);
    }
  });
});
