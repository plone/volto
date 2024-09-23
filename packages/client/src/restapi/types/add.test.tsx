import { act, renderHook, waitFor } from '@testing-library/react';
import { createWrapper } from '../../testUtils';
import { useMutation } from '@tanstack/react-query';
import { setup, teardown } from '../../resetFixture';
import { beforeEach } from 'vitest';
import { expect, test } from 'vitest';
import PloneClient from '../../client';
import { v4 as uuid } from 'uuid';

const cli = PloneClient.initialize({
  apiPath: 'http://localhost:55001/plone',
});

const { login, createTypeFieldMutation } = cli;
await login({ username: 'admin', password: 'secret' });

beforeEach(async () => {
  await setup();
});

afterEach(async () => {
  await teardown();
});

describe('[POST] TypeFieldAdd', () => {
  test('Hook - Successful', async () => {
    const randomId = uuid().replace(/-/g, '');
    // We need to remove hyphens because they are replaced by underscores in title

    const typeFieldData = {
      description: 'Contact information',
      factory: 'fieldset',
      title: `contact${randomId}`,
    };

    const { result } = renderHook(
      () => useMutation(createTypeFieldMutation()),
      {
        wrapper: createWrapper(),
      },
    );

    act(() => {
      result.current.mutate({ contentPath: 'Document', data: typeFieldData });
    });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    expect(result.current.data?.id).toBe(typeFieldData.title);
  });
});
