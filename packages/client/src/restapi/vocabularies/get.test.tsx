import { renderHook, waitFor } from '@testing-library/react';
import { createWrapper } from '../../testUtils';
import { useQuery } from '@tanstack/react-query';
import ploneClient from '../../client';

const cli = ploneClient.initialize({
  apiPath: 'http://localhost:55001/plone',
});

const { getVocabulariesQuery } = cli;

describe('[GET] Vocabularies', () => {
  test('Hook - Successful', async () => {
    const path = 'plone.app.vocabularies.ReallyUserFriendlyTypes';

    const { result } = renderHook(
      () => useQuery(getVocabulariesQuery({ path })),
      {
        wrapper: createWrapper(),
      },
    );

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    expect(result.current.data?.['@id']).toBe(
      `http://localhost:55001/plone/++api++/@vocabularies/${path}`,
    );
  });

  test('Hook - Successful', async () => {
    const path = 'Fields';

    const { result } = renderHook(
      () => useQuery(getVocabulariesQuery({ path })),
      {
        wrapper: createWrapper(),
      },
    );

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    expect(result.current.data?.['@id']).toBe(
      `http://localhost:55001/plone/++api++/@vocabularies/${path}`,
    );
  });

  test('Hook - Failure', async () => {
    const path = '/blah';
    const { result } = renderHook(
      () => useQuery(getVocabulariesQuery({ path })),
      {
        wrapper: createWrapper(),
      },
    );

    await waitFor(() => expect(result.current.isError).toBe(true));

    expect(result.current.error).toBeDefined();
  });
});
