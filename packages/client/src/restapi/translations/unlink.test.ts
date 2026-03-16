import { setup, teardown } from '../../utils/test';
import { afterEach, beforeEach, describe, expect, test } from 'vitest';
import PloneClient from '../../client';
import type { RequestError } from '../types';

const cli = PloneClient.initialize({
  apiPath: 'http://localhost:55001/plone',
});

await cli.login({ username: 'admin', password: 'secret' });

beforeEach(async () => {
  await setup();
});

afterEach(async () => {
  await teardown();
});

describe('Content', () => {
  test('Successful', async () => {
    const registryData = { 'plone.available_languages': ['en', 'es'] };
    await cli.updateRegistry({ data: registryData });

    // We need to install 'plone.app.multilingual' in order to use translations endpoint
    await cli.installAddon({
      addonId: 'plone.app.multilingual',
    });

    const contentDataES = {
      '@type': 'Document',
      title: 'unlink-translation-es',
    };
    const contentDataEN = {
      '@type': 'Document',
      title: 'unlink-translation-en',
    };
    await cli.createContent({
      path: '/es/',
      data: contentDataES,
    });
    await cli.createContent({
      path: '/en/',
      data: contentDataEN,
    });

    const linkData = {
      id: `/es/${contentDataES.title}`,
    };
    const linkPath = `/en/${contentDataEN.title}`;
    await cli.linkTranslation({
      path: linkPath,
      data: linkData,
    });

    const unlinkData = {
      language: 'es',
    };

    await cli.unlinkTranslation({
      path: linkPath,
      data: unlinkData,
    });
  });

  test('Failure', async () => {
    const registryData = { 'plone.available_languages': ['en', 'es'] };
    await cli.updateRegistry({ data: registryData });

    // We need to install 'plone.app.multilingual' in order to use translations endpoint
    await cli.installAddon({
      addonId: 'plone.app.multilingual',
    });

    const unlinkData = {
      language: 'es',
    };

    try {
      await cli.unlinkTranslation({
        path: '/en/blah',
        data: unlinkData,
      });
    } catch (err) {
      expect((err as RequestError).status).toBe(404);
    }
  });
});
