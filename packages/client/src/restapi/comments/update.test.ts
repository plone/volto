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

describe('Update Comment', () => {
  test('Successful', async () => {
    const randomId = uuid();

    const contentData = {
      '@type': 'Document',
      title: `update-comments-page${randomId}`,
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

    await cli.createComment({
      path: contentData.title,
      data: addCommentData,
    });

    const commentData = await cli.getComments({
      path: contentData.title,
    });

    const comment_id = commentData.data.items[0].comment_id;

    const result = await cli.updateComment({
      path: contentData.title,
      comment_id,
      data: addCommentData,
    });

    const comment = await cli.getComments({
      path: contentData.title,
    });

    expect(comment.data.items[0]['@id']).toBe(
      `http://localhost:55001/plone/${contentData.title}/@comments/${comment_id}`,
    );
  });

  test('Failure', async () => {
    const registryData = {
      'plone.app.discussion.interfaces.IDiscussionSettings.globally_enabled': true,
      'plone.app.discussion.interfaces.IDiscussionSettings.edit_comment_enabled': true,
      'plone.app.discussion.interfaces.IDiscussionSettings.delete_own_comment_enabled': true,
    };
    await cli.updateRegistry({ data: registryData });

    const path = 'blah';
    const comment_id = 'blah';

    const updateCommentData = {
      text: `This is a comment`,
    };

    try {
      const result = await cli.updateComment({
        path,
        comment_id,
        data: updateCommentData,
      });
    } catch (err) {
      expect((err as RequestError).status).toBe(404);
    }
  });
});
