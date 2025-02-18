import { act, renderHook, waitFor } from '@testing-library/react';
import { createWrapper } from '../../testUtils';
import { useMutation } from '@tanstack/react-query';
import { setup, teardown } from '../../resetFixture';
import { beforeEach, expect, test } from 'vitest';
import PloneClient from '../../client';
import { v4 as uuid } from 'uuid';
import { createContent } from '../content/add';
import { updateRegistry } from '../registry/update';

const cli = PloneClient.initialize({
  apiPath: 'http://localhost:55001/plone',
});

const { login, createCommentMutation } = cli;
await login({ username: 'admin', password: 'secret' });

beforeEach(async () => {
  await setup();
});

afterEach(async () => {
  await teardown();
});

describe('[POST] Comment', () => {
  test('Hook - Successful', async () => {
    const randomId = uuid();

    const contentData = {
      '@type': 'Document',
      title: 'add-comments-page-1',
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

    const { result } = renderHook(() => useMutation(createCommentMutation()), {
      wrapper: createWrapper(),
    });

    act(() => {
      result.current.mutate({ path: contentData.title, data: addCommentData });
    });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));
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

    const addCommentData = {
      text: `This is a comment`,
    };

    const { result } = renderHook(() => useMutation(createCommentMutation()), {
      wrapper: createWrapper(),
    });

    act(() => {
      result.current.mutate({ path, data: addCommentData });
    });

    await waitFor(() => expect(result.current.isError).toBe(true));

    expect(result.current.error).toBeDefined();
  });
});
