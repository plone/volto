import { renderHook, waitFor } from '@testing-library/react';
import { createWrapper } from '../../testUtils';
import { useQuery } from '@tanstack/react-query';
import ploneClient from '../../client';
import { createComment } from './add';
import { createContent } from '../content/add';
import { updateRegistry } from '../registry/update';
import { v4 as uuid } from 'uuid';

const cli = ploneClient.initialize({
  apiPath: 'http://localhost:55001/plone',
});

const { login, getCommentsQuery } = cli;
await login({ username: 'admin', password: 'secret' });

describe('[GET] Comments', () => {
  test('Hook - Successful', async () => {
    const randomId = uuid();

    const contentData = {
      '@type': 'Document',
      title: `get-comments-page${randomId}`,
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
      text: 'This is a comment',
    };

    await createComment({
      path: contentData.title,
      data: addCommentData,
      config: cli.config,
    });

    const { result } = renderHook(
      () => useQuery(getCommentsQuery({ path: contentData.title })),
      {
        wrapper: createWrapper(),
      },
    );

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    expect(result.current.data?.['@id']).toBe(
      `http://localhost:55001/plone/++api++/${contentData.title}/@comments`,
    );
    expect(result.current.data?.items_total).toBeGreaterThan(0);
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
    const { result } = renderHook(() => useQuery(getCommentsQuery({ path })), {
      wrapper: createWrapper(),
    });

    await waitFor(() => expect(result.current.isError).toBe(true));

    expect(result.current.error).toBeDefined();
  });
});
