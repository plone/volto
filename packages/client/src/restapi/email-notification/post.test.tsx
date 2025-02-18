import { act, renderHook, waitFor } from '@testing-library/react';
import { createWrapper } from '../../testUtils';
import { useMutation } from '@tanstack/react-query';
import { setup, teardown } from '../../resetFixture';
import { beforeEach, expect, test } from 'vitest';
import PloneClient from '../../client';

const cli = PloneClient.initialize({
  apiPath: 'http://localhost:55001/plone',
});

const { login, emailNotificationMutation } = cli;
await login({ username: 'admin', password: 'secret' });

beforeEach(async () => {
  await setup();
});

afterEach(async () => {
  await teardown();
});

describe('[POST] Email Notification', () => {
  test.skip('Hook - Successful', async () => {
    const emailData = {
      name: 'John Doe',
      from: 'john@doe.com',
      subject: 'Hello!',
      message: 'Just want to say hi.',
    };

    const { result } = renderHook(
      () => useMutation(emailNotificationMutation()),
      {
        wrapper: createWrapper(),
      },
    );

    act(() => {
      result.current.mutate({ data: emailData });
    });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));
  });

  test.skip('Hook - Successful - user', async () => {
    const emailData = {
      name: 'John Doe',
      from: 'john@doe.com',
      subject: 'Hello!',
      message: 'Just want to say hi.',
    };

    const user = 'admin';

    const { result } = renderHook(
      () => useMutation(emailNotificationMutation()),
      {
        wrapper: createWrapper(),
      },
    );

    act(() => {
      result.current.mutate({ user, data: emailData });
    });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));
  });
});
