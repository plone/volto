import { act, renderHook, waitFor } from '@testing-library/react';
import { createWrapper } from '../../testUtils';
import { useMutation } from '@tanstack/react-query';
import { setup, teardown } from '../../resetFixture';
import ploneClient from '../../client';
import { createContent } from '../content/add';
import { v4 as uuid } from 'uuid';

const cli = ploneClient.initialize({
  apiPath: 'http://localhost:55001/plone',
});
const { login, copyMutation } = cli;

beforeAll(async () => {
  await login({ username: 'admin', password: 'secret' });
});

beforeEach(async () => {
  await setup();
});

afterEach(async () => {
  await teardown();
});

describe('[POST] Copy', () => {
  test('Hook - Successful', async () => {
    const randomId = uuid();

    const contentData = {
      '@type': 'Document',
      title: `copy-page${randomId}`,
    };

    await createContent({ path: '/', data: contentData, config: cli.config });

    const copyData = {
      source: `http://localhost:55001/plone/${contentData.title}`,
    };

    const { result } = renderHook(() => useMutation(copyMutation()), {
      wrapper: createWrapper(),
    });

    act(() => {
      result.current.mutate({ data: copyData });
    });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    expect(result.current.data?.[0]['target']).toBe(
      `http://localhost:55001/plone/copy_of_${contentData.title}`,
    );
  });

  test('Hook - Successful - multiple', async () => {
    const randomId = uuid();

    const contentData1 = {
      '@type': 'Document',
      title: `copy-multi-1-${randomId}`,
    };
    const contentData2 = {
      '@type': 'Document',
      title: `copy-multi-2-${randomId}`,
    };

    await createContent({ path: '/', data: contentData1, config: cli.config });
    await createContent({ path: '/', data: contentData2, config: cli.config });

    const copyMultipleData = {
      source: [
        `http://localhost:55001/plone/${contentData1.title}`,
        `http://localhost:55001/plone/${contentData2.title}`,
      ],
    };

    const { result } = renderHook(() => useMutation(copyMutation()), {
      wrapper: createWrapper(),
    });

    act(() => {
      result.current.mutate({ data: copyMultipleData });
    });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    expect(result.current.data?.[0].target).toBe(
      `http://localhost:55001/plone/copy_of_${contentData1.title}`,
    );
    expect(result.current.data?.[1].target).toBe(
      `http://localhost:55001/plone/copy_of_${contentData2.title}`,
    );
  });

  // TODO: Find correct implementation for failure test as currently API does not return an error status code when it is supposed to raise error
});
