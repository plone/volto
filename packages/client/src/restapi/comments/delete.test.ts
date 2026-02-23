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

describe('Delete Comment', () => {
  test('Successful', async () => {
    const randomId = uuid();

    const contentData = {
      '@type': 'Document',
      title: `delete-comments-page${randomId}`,
      allow_discussion: true,
    };
    await cli.createContent({ path: '/', data: contentData });

    const registryData = {
      'plone.app.discussion.interfaces.IDiscussionSettings.globally_enabled':
        true,
      'plone.app.discussion.interfaces.IDiscussionSettings.edit_comment_enabled':
        true,
      'plone.app.discussion.interfaces.IDiscussionSettings.delete_own_comment_enabled':
        true,
    };
    await cli.updateRegistry({ data: registryData });

    const addCommentData = {
      text: `This is a comment ${randomId}`,
    };

    await cli.createComment({
      path: contentData.title,
      data: addCommentData,
    });

    const initialCommentData = await cli.getComments({
      path: contentData.title,
    });

    const comment_id = initialCommentData.data.items[0].comment_id;

    const result = await cli.deleteComment({
      path: contentData.title,
      comment_id,
    });

    const finalCommentData = await cli.getComments({
      path: contentData.title,
    });

    expect(finalCommentData.data.items_total).toBe(0);
  });

  test('Failure', async () => {
    const registryData = {
      'plone.app.discussion.interfaces.IDiscussionSettings.globally_enabled':
        true,
      'plone.app.discussion.interfaces.IDiscussionSettings.edit_comment_enabled':
        true,
      'plone.app.discussion.interfaces.IDiscussionSettings.delete_own_comment_enabled':
        true,
    };
    await cli.updateRegistry({ data: registryData });

    const path = 'blah';
    const comment_id = 'blah';

    try {
      await cli.deleteComment({ path, comment_id });
    } catch (err) {
      expect((err as RequestError).status).toBe(404);
    }
  });
});
