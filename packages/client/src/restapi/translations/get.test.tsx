import { renderHook, waitFor } from '@testing-library/react';
import { createWrapper } from '../../testUtils';
import { useQuery } from '@tanstack/react-query';
import ploneClient from '../../client';
import { createContent } from '../content/add';
import { linkTranslation } from './link';
import { installAddon } from '../addons/install';
import { updateRegistry } from '../registry/update';
import { v4 as uuid } from 'uuid';

const cli = ploneClient.initialize({
  apiPath: 'http://localhost:55001/plone',
});

const { login, getTranslationQuery } = cli;
await login({ username: 'admin', password: 'secret' });

describe('[GET] Translations', () => {
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
      title: `get-translation-es${randomId}`,
    };
    const contentDataEN = {
      '@type': 'Document',
      title: `get-translation-en${randomId}`,
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
      () => useQuery(getTranslationQuery({ path: linkPath })),
      {
        wrapper: createWrapper(),
      },
    );

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    expect(result.current.data?.['@id']).toBe(
      `http://localhost:55001/plone${linkPath}/@translations`,
    );
  });

  test('Hook - Failure', async () => {
    const registryData = { 'plone.available_languages': ['en', 'es'] };
    await updateRegistry({ data: registryData, config: cli.config });

    // We need to install 'plone.app.multilingual' in order to use translations endpoint
    await installAddon({
      addonId: 'plone.app.multilingual',
      config: cli.config,
    });

    const path = '/en/blah';
    const { result } = renderHook(
      () => useQuery(getTranslationQuery({ path })),
      {
        wrapper: createWrapper(),
      },
    );

    await waitFor(() => expect(result.current.isError).toBe(true));

    expect(result.current.error).toBeDefined();
  });
});
