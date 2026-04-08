import { act, renderHook, waitFor } from '@testing-library/react';
import { createWrapper } from '../../testUtils';
import { useMutation } from '@tanstack/react-query';
import { expect, test } from 'vitest';
import PloneClient from '../../client';
import { createContent } from '../content/add';
import { installAddon } from '../addons/install';
import { updateRegistry } from '../registry/update';
import { v4 as uuid } from 'uuid';

const cli = PloneClient.initialize({
  apiPath: 'http://localhost:55001/plone',
});

const { login, linkTranslationMutation } = cli;
await login({ username: 'admin', password: 'secret' });

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
      title: `link-translation-es${randomId}`,
    };
    const contentDataEN = {
      '@type': 'Document',
      title: `link-translation-en${randomId}`,
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

    const { result } = renderHook(
      () => useMutation(linkTranslationMutation()),
      {
        wrapper: createWrapper(),
      },
    );

    const linkData = {
      id: `/es/${contentDataES.title}`,
    };
    const linkPath = `/en/${contentDataEN.title}`;

    act(() => {
      result.current.mutate({ path: linkPath, data: linkData });
    });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));
  });

  test('Hook - Failure', async () => {
    const registryData = { 'plone.available_languages': ['en', 'es'] };
    updateRegistry({ data: registryData, config: cli.config });

    // We need to install 'plone.app.multilingual' in order to use translations endpoint
    await installAddon({
      addonId: 'plone.app.multilingual',
      config: cli.config,
    });

    const linkData = {
      id: '/es/blah',
    };

    const { result } = renderHook(
      () => useMutation(linkTranslationMutation()),
      {
        wrapper: createWrapper(),
      },
    );

    act(() => {
      result.current.mutate({ path: '/en/blah', data: linkData });
    });

    await waitFor(() => expect(result.current.isError).toBe(true));

    expect(result.current.error).toBeDefined();
  });
});
