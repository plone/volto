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
const { login, moveMutation } = cli;

beforeAll(async () => {
  await login({ username: 'admin', password: 'secret' });
});

beforeEach(async () => {
  await setup();
});

afterEach(async () => {
  await teardown();
});

describe('[POST] MoveContent', () => {
  test('Hook - Successful', async () => {
    const randomId = uuid();

    const contentData = {
      '@type': 'Document',
      title: 'frontpage',
    };

    await createContent({
      path: '/',
      data: contentData,
      config: cli.config,
    });

    const moveContentData = {
      '@type': 'Document',
      title: `move-page${randomId}`,
    };

    await createContent({
      path: '/',
      data: moveContentData,
      config: cli.config,
    });

    const moveData = {
      source: `http://localhost:55001/plone/${moveContentData.title}`,
    };

    const { result } = renderHook(() => useMutation(moveMutation()), {
      wrapper: createWrapper(),
    });

    act(() => {
      result.current.mutate({ path: contentData.title, data: moveData });
    });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    expect(result.current.data?.[0]['target']).toBe(
      `http://localhost:55001/plone/${contentData.title}/${moveContentData.title}`,
    );
  });

  test('Hook - Successful - multiple', async () => {
    const randomId = uuid();

    const contentData = {
      '@type': 'Document',
      title: 'frontpage',
    };

    await createContent({
      path: '/',
      data: contentData,
      config: cli.config,
    });

    const moveContentData1 = {
      '@type': 'Document',
      title: `copy-multi-1-${randomId}`,
    };
    const moveContentData2 = {
      '@type': 'Document',
      title: `copy-multi-2-${randomId}`,
    };

    await createContent({
      path: '/',
      data: moveContentData1,
      config: cli.config,
    });
    await createContent({
      path: '/',
      data: moveContentData2,
      config: cli.config,
    });

    const moveMultipleData = {
      source: [
        `http://localhost:55001/plone/${moveContentData1.title}`,
        `http://localhost:55001/plone/${moveContentData2.title}`,
      ],
    };

    const { result } = renderHook(() => useMutation(moveMutation()), {
      wrapper: createWrapper(),
    });

    act(() => {
      result.current.mutate({
        path: contentData.title,
        data: moveMultipleData,
      });
    });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    expect(result.current.data?.[0]['target']).toBe(
      `http://localhost:55001/plone/${contentData.title}/${moveContentData1.title}`,
    );
    expect(result.current.data?.[1]['target']).toBe(
      `http://localhost:55001/plone/${contentData.title}/${moveContentData2.title}`,
    );
  });

  // TODO: Find correct implementation for failure test as currently API does not return an error status code when it is supposed to raise error
});
