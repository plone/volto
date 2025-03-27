import ploneClient from '../../client';
import { describe, expect, test } from 'vitest';
import { v4 as uuid } from 'uuid';
import type { RequestError } from '../types';

const cli = ploneClient.initialize({
  apiPath: 'http://localhost:55001/plone',
});

await cli.login({ username: 'admin', password: 'secret' });

describe('Get Comments', () => {
  test('Successful', async () => {
    const randomId = uuid();

    const contentData = {
      '@type': 'Document',
      title: `get-comments-page${randomId}`,
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
      text: 'This is a comment',
    };

    await cli.createComment({
      path: contentData.title,
      data: addCommentData,
    });

    const result = await cli.getComments({ path: contentData.title });

    expect(result.data['@id']).toBe(
      `http://localhost:55001/plone/++api++/${contentData.title}/@comments`,
    );
    expect(result.data.items_total).toBeGreaterThan(0);
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

    try {
      await cli.getComments({ path });
    } catch (err) {
      expect((err as RequestError).status).toBe(404);
    }
  });
});
