import ploneClient from '../../client';
import { setup, teardown } from '../../utils/test';
import { afterEach, beforeEach, describe, expect, test } from 'vitest';
import { v4 as uuid } from 'uuid';
import type { RequestError } from '../types';

const cli = ploneClient.initialize({
  apiPath: 'http://localhost:55001/plone',
});

await cli.login({ username: 'admin', password: 'secret' });

beforeEach(async () => {
  await setup();
});

afterEach(async () => {
  await teardown();
});

describe('Get Translations', () => {
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
      title: `get-translation-es${randomId}`,
    };
    const contentDataEN = {
      '@type': 'Document',
      title: `get-translation-en${randomId}`,
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

    const result = await cli.getTranslation({ path: linkPath });

    expect(result.data['@id']).toBe(
      `http://localhost:55001/plone${linkPath}/@translations`,
    );
  });

  test('Failure', async () => {
    const registryData = { 'plone.available_languages': ['en', 'es'] };
    await cli.updateRegistry({ data: registryData });

    // We need to install 'plone.app.multilingual' in order to use translations endpoint
    await cli.installAddon({
      addonId: 'plone.app.multilingual',
    });

    const path = '/en/blah';

    try {
      await cli.getTranslation({ path });
    } catch (err) {
      expect((err as RequestError).status).toBe(404);
    }
  });
});
