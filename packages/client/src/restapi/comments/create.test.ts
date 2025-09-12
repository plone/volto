import { setup, teardown } from '../../utils/test';
import { afterEach, beforeEach, describe, expect, test } from 'vitest';
import PloneClient from '../../client';
import { v4 as uuid } from 'uuid';
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

describe('Comment', () => {
  test('Successful', async () => {
    const randomId = uuid();

    const contentData = {
      '@type': 'Document',
      title: 'add-comments-page-1',
      allow_discussion: true,
    };
    await cli.createContent({ path: '/', data: contentData });

    const registryData = {
      'plone.app.discussion.interfaces.IDiscussionSettings.globally_enabled': true,
      'plone.app.discussion.interfaces.IDiscussionSettings.edit_comment_enabled': true,
      'plone.app.discussion.interfaces.IDiscussionSettings.delete_own_comment_enabled': true,
    };
    await cli.updateRegistry({ data: registryData });

    const addCommentData = {
      text: `This is a comment ${randomId}`,
    };

    const result = await cli.createComment({
      path: `/${contentData.title}`,
      data: addCommentData,
    });
    expect(result.status).toBe(204);
  });

  test('Failure', async () => {
    const registryData = {
      'plone.app.discussion.interfaces.IDiscussionSettings.globally_enabled': true,
      'plone.app.discussion.interfaces.IDiscussionSettings.edit_comment_enabled': true,
      'plone.app.discussion.interfaces.IDiscussionSettings.delete_own_comment_enabled': true,
    };
    await cli.updateRegistry({ data: registryData });

    const path = 'blah';

    const addCommentData = {
      text: `This is a comment`,
    };

    try {
      await cli.createComment({ path, data: addCommentData });
    } catch (err) {
      expect((err as RequestError).status).toBe(404);
    }
  });
});
