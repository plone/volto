import PloneClient from '../../client';
import { setup, teardown } from '../../utils/test';
import { afterEach, beforeEach, describe, expect, test } from 'vitest';
import { v4 as uuid } from 'uuid';
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
    const randomId = uuid();

    const registryData = { 'plone.available_languages': ['en', 'es'] };
    await cli.updateRegistry({ data: registryData });

    // We need to install 'plone.app.multilingual' in order to use translations endpoint
    await cli.installAddon({
      addonId: 'plone.app.multilingual',
    });

    const contentDataES = {
      '@type': 'Document',
      title: `link-translation-es${randomId}`,
    };
    const contentDataEN = {
      '@type': 'Document',
      title: `link-translation-en${randomId}`,
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

    const result = await cli.linkTranslation({
      path: linkPath,
      data: linkData,
    });
  });

  test('Failure', async () => {
    const registryData = { 'plone.available_languages': ['en', 'es'] };
    await cli.updateRegistry({ data: registryData });

    // We need to install 'plone.app.multilingual' in order to use translations endpoint
    await cli.installAddon({
      addonId: 'plone.app.multilingual',
    });

    const linkData = {
      id: '/es/blah',
    };

    try {
      const result = await cli.linkTranslation({
        path: '/en/blah',
        data: linkData,
      });
    } catch (err) {
      expect((err as RequestError).status).toBe(404);
    }
  });
});
