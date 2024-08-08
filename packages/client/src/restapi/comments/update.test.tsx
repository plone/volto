import { act, renderHook, waitFor } from '@testing-library/react';
import { createWrapper } from '../../testUtils';
import { useMutation } from '@tanstack/react-query';
import { setup, teardown } from '../../resetFixture';
import { beforeEach } from 'vitest';
import { expect, test } from 'vitest';
import PloneClient from '../../client';
import { v4 as uuid } from 'uuid';
import { createComment } from './add';
import { getComments } from './get';
import { createContent } from '../content/add';
import { updateRegistry } from '../registry/update';

const cli = PloneClient.initialize({
  apiPath: 'http://localhost:55001/plone',
});

const { login, updateCommentMutation } = cli;
await login({ username: 'admin', password: 'secret' });

beforeEach(async () => {
  await setup();
});

afterEach(async () => {
  await teardown();
});

describe('[PATCH] Comment', () => {
  test('Hook - Successful', async () => {
    const randomId = uuid();

    const contentData = {
      '@type': 'Document',
      title: `update-comments-page${randomId}`,
      allow_discussion: true,
    };
    await createContent({ path: '/', data: contentData, config: cli.config });

    const registryData = {
      'plone.app.discussion.interfaces.IDiscussionSettings.globally_enabled':
        true,
      'plone.app.discussion.interfaces.IDiscussionSettings.edit_comment_enabled':
        true,
      'plone.app.discussion.interfaces.IDiscussionSettings.delete_own_comment_enabled':
        true,
    };
    await updateRegistry({ data: registryData, config: cli.config });

    const addCommentData = {
      text: `This is a comment ${randomId}`,
    };

    await createComment({
      path: contentData.title,
      data: addCommentData,
      config: cli.config,
    });

    const commentData = await getComments({
      path: contentData.title,
      config: cli.config,
    });

    const comment_id = commentData.items[0].comment_id;

    const { result } = renderHook(() => useMutation(updateCommentMutation()), {
      wrapper: createWrapper(),
    });

    act(() => {
      result.current.mutate({
        path: contentData.title,
        comment_id,
        data: addCommentData,
      });
    });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    const comment = await getComments({
      path: contentData.title,
      config: cli.config,
    });

    expect(comment?.items[0]['@id']).toBe(
      `http://localhost:55001/plone/${contentData.title}/@comments/${comment_id}`,
    );
  });

  test('Hook - Failure', async () => {
    const registryData = {
      'plone.app.discussion.interfaces.IDiscussionSettings.globally_enabled':
        true,
      'plone.app.discussion.interfaces.IDiscussionSettings.edit_comment_enabled':
        true,
      'plone.app.discussion.interfaces.IDiscussionSettings.delete_own_comment_enabled':
        true,
    };
    await updateRegistry({ data: registryData, config: cli.config });

    const path = 'blah';
    const comment_id = 'blah';

    const updateCommentData = {
      text: `This is a comment`,
    };

    const { result } = renderHook(() => useMutation(updateCommentMutation()), {
      wrapper: createWrapper(),
    });

    act(() => {
      result.current.mutate({ path, comment_id, data: updateCommentData });
    });

    await waitFor(() => expect(result.current.isError).toBe(true));

    expect(result.current.error).toBeDefined();
  });
});
