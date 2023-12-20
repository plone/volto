import { renderHook, waitFor } from '@testing-library/react';
import { createWrapper } from '../../testUtils';
import { useQuery } from '@tanstack/react-query';
import { setup, teardown } from '../../resetFixture';
import { beforeEach } from 'vitest';
import { expect, test } from 'vitest';
import PloneClient from '../../client';
import { v4 as uuid } from 'uuid';
import { createTypeField } from './add';

const cli = PloneClient.initialize({
  apiPath: 'http://localhost:55001/plone',
});

const { login, getTypeFieldQuery } = cli;
await login({ username: 'admin', password: 'secret' });

beforeEach(async () => {
  await setup();
});

afterEach(async () => {
  await teardown();
});

describe('[GET] Type', () => {
  test('Hook - Successful', async () => {
    const contentPath = 'Document';
    const randomId = uuid().replace(/-/g, '');
    // We need to remove hyphens because they are replaced by underscores in title

    const typeFieldData = {
      description: 'Contact information',
      factory: 'fieldset',
      title: `contact${randomId}`,
    };

    await createTypeField({
      contentPath,
      data: typeFieldData,
      config: cli.config,
    });

    const { result } = renderHook(
      () =>
        useQuery(
          getTypeFieldQuery({
            contentFieldPath: `${contentPath}/${typeFieldData.title}`,
          }),
        ),
      {
        wrapper: createWrapper(),
      },
    );

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    expect(result.current.data?.title).toBe(typeFieldData.title);
  });

  test('Hook - Failure', async () => {
    const { result } = renderHook(
      () => useQuery(getTypeFieldQuery({ contentFieldPath: 'blah' })),
      {
        wrapper: createWrapper(),
      },
    );

    await waitFor(() => expect(result.current.isError).toBe(true));
  });
});
