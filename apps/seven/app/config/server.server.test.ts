import { expect, describe, it, afterEach } from 'vitest';
import config from '@plone/registry';
import installServer from './server.server';

describe('config/server', () => {
  afterEach(() => {
    config.settings = {};
    const utilities = config.utilities as Partial<Record<string, unknown>>;
    delete utilities.client;
    delete utilities.somersaultBlockMigration;
    delete utilities.somersaultMigration;
    delete utilities.rootContentSubRequest;
  });

  it('should set the default config', () => {
    installServer();
    expect(config.settings).toStrictEqual(
      expect.objectContaining({
        supportedLanguages: ['en'],
        defaultLanguage: 'en',
        apiPath: 'http://localhost:8080/Plone',
      }),
    );
    expect(
      config
        .getUtility({
          name: 'ploneClient',
          type: 'client',
        })
        .method().config.apiPath,
    ).toEqual('http://localhost:8080/Plone');
  });
});
