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

const { login, deleteCommentMutation } = cli;
await login({ username: 'admin', password: 'secret' });

beforeEach(async () => {
  await setup();
});

afterEach(async () => {
  await teardown();
});

describe('[DELETE] Comment', () => {
  test('Hook - Successful', async () => {
    const randomId = uuid();

    const contentData = {
      '@type': 'Document',
      title: `delete-comments-page${randomId}`,
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

    const initialCommentData = await getComments({
      path: contentData.title,
      config: cli.config,
    });

    const comment_id = initialCommentData.items[0].comment_id;

    const { result } = renderHook(() => useMutation(deleteCommentMutation()), {
      wrapper: createWrapper(),
    });

    act(() => {
      result.current.mutate({
        path: contentData.title,
        comment_id,
      });
    });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    const finalCommentData = await getComments({
      path: contentData.title,
      config: cli.config,
    });

    expect(finalCommentData?.items_total).toBe(0);
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

    const { result } = renderHook(() => useMutation(deleteCommentMutation()), {
      wrapper: createWrapper(),
    });

    act(() => {
      result.current.mutate({ path, comment_id });
    });

    await waitFor(() => expect(result.current.isError).toBe(true));

    expect(result.current.error).toBeDefined();
  });
});
