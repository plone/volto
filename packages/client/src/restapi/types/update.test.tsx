import { act, renderHook, waitFor } from '@testing-library/react';
import { createWrapper } from '../../testUtils';
import { useMutation } from '@tanstack/react-query';
import { setup, teardown } from '../../resetFixture';
import { beforeEach, expect, test } from 'vitest';
import PloneClient from '../../client';
import { getType } from './get';
import { getTypeField } from './get_type_field';
import { v4 as uuid } from 'uuid';
import { createTypeField } from './add';

const cli = PloneClient.initialize({
  apiPath: 'http://localhost:55001/plone',
});

const { login, updateTypeFieldMutation } = cli;
await login({ username: 'admin', password: 'secret' });

beforeEach(async () => {
  await setup();
});

afterEach(async () => {
  await teardown();
});

describe('[PATCH] TypeUpdate', () => {
  test('Hook - Successful - field', async () => {
    const randomId = uuid().replace(/-/g, '');
    // We need to remove hyphens because they are replaced by underscores in title

    const createTypeFieldData = {
      description: 'Contact information',
      factory: 'fieldset',
      title: `contact_info${randomId}`,
    };

    await createTypeField({
      contentPath: 'Document',
      data: createTypeFieldData,
      config: cli.config,
    });

    const contentPath = `Document/${createTypeFieldData.title}`;

    const updateTypeFieldData = {
      fields: ['author_email'],
      title: `Sample info${randomId}`,
    };

    const { result } = renderHook(
      () => useMutation(updateTypeFieldMutation()),
      {
        wrapper: createWrapper(),
      },
    );

    act(() => {
      result.current.mutate({
        contentPath,
        data: updateTypeFieldData,
      });
    });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    const typeField = await getTypeField({
      contentFieldPath: contentPath,
      config: cli.config,
    });

    expect(typeField?.title).toBe(updateTypeFieldData.title);
  });

  test('Hook - Successful - fieldset', async () => {
    const randomId = uuid();

    const updateTypeFieldData = {
      fieldsets: [
        {
          fields: ['author_email'],
          id: `contact_info${randomId}`,
          title: `Contact info${randomId}`,
        },
      ],
    };

    const { result } = renderHook(
      () => useMutation(updateTypeFieldMutation()),
      {
        wrapper: createWrapper(),
      },
    );

    act(() => {
      result.current.mutate({
        contentPath: 'Document',
        data: updateTypeFieldData,
      });
    });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    const type = await getType({ contentPath: 'Document', config: cli.config });
    const lastIndex = type?.fieldsets.length - 1;

    expect(type?.fieldsets?.[lastIndex].id).toBe(
      updateTypeFieldData.fieldsets[0].id,
    );
  });
});
