import { act, renderHook, waitFor } from '@testing-library/react';
import { createWrapper } from '../../testUtils';
import { useMutation } from '@tanstack/react-query';
import { setup, teardown } from '../../resetFixture';
import { beforeEach, expect, test } from 'vitest';
import PloneClient from '../../client';

const cli = PloneClient.initialize({
  apiPath: 'http://localhost:55001/plone',
});

const { login, emailSendMutation } = cli;
await login({ username: 'admin', password: 'secret' });

beforeEach(async () => {
  await setup();
});

afterEach(async () => {
  await teardown();
});

describe('[POST] Email Send', () => {
  test.skip('Hook - Successful', async () => {
    const emailData = {
      name: 'John Doe',
      from: 'john@doe.com',
      to: 'jane@doe.com',
      subject: 'Hello!',
      message: 'Just want to say hi.',
    };

    const { result } = renderHook(() => useMutation(emailSendMutation()), {
      wrapper: createWrapper(),
    });

    act(() => {
      result.current.mutate({ data: emailData });
    });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));
  });
});
