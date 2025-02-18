import { act, renderHook, waitFor } from '@testing-library/react';
import { createWrapper } from '../../testUtils';
import { useMutation } from '@tanstack/react-query';
import { setup, teardown } from '../../resetFixture';
import { beforeEach, expect, test } from 'vitest';
import PloneClient from '../../client';
import { createContent } from '../content/add';
import { linkTranslation } from './link';
import { installAddon } from '../addons/install';
import { updateRegistry } from '../registry/update';
import { v4 as uuid } from 'uuid';

const cli = PloneClient.initialize({
  apiPath: 'http://localhost:55001/plone',
});

const { login, unlinkTranslationMutation } = cli;
await login({ username: 'admin', password: 'secret' });

beforeEach(async () => {
  await setup();
});

afterEach(async () => {
  await teardown();
});

describe('[POST] Content', () => {
  test('Hook - Successful', async () => {
    const randomId = uuid();

    const registryData = { 'plone.available_languages': ['en', 'es'] };
    await updateRegistry({ data: registryData, config: cli.config });

    // We need to install 'plone.app.multilingual' in order to use translations endpoint
    await installAddon({
      addonId: 'plone.app.multilingual',
      config: cli.config,
    });

    const contentDataES = {
      '@type': 'Document',
      title: 'unlink-translation-es',
    };
    const contentDataEN = {
      '@type': 'Document',
      title: 'unlink-translation-en',
    };
    await createContent({
      path: '/es/',
      data: contentDataES,
      config: cli.config,
    });
    await createContent({
      path: '/en/',
      data: contentDataEN,
      config: cli.config,
    });

    const linkData = {
      id: `/es/${contentDataES.title}`,
    };
    const linkPath = `/en/${contentDataEN.title}`;
    await linkTranslation({
      path: linkPath,
      data: linkData,
      config: cli.config,
    });

    const { result } = renderHook(
      () => useMutation(unlinkTranslationMutation()),
      {
        wrapper: createWrapper(),
      },
    );

    const unlinkData = {
      language: 'es',
    };

    act(() => {
      result.current.mutate({ path: linkPath, data: unlinkData });
    });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));
  });

  test('Hook - Failure', async () => {
    const registryData = { 'plone.available_languages': ['en', 'es'] };
    await updateRegistry({ data: registryData, config: cli.config });

    // We need to install 'plone.app.multilingual' in order to use translations endpoint
    await installAddon({
      addonId: 'plone.app.multilingual',
      config: cli.config,
    });

    const unlinkData = {
      language: 'es',
    };

    const { result } = renderHook(
      () => useMutation(unlinkTranslationMutation()),
      {
        wrapper: createWrapper(),
      },
    );

    act(() => {
      result.current.mutate({ path: '/en/blah', data: unlinkData });
    });

    await waitFor(() => expect(result.current.isError).toBe(true));

    expect(result.current.error).toBeDefined();
  });
});
