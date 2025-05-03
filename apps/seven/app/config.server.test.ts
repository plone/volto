import { expect, describe, it, afterEach } from 'vitest';
import config from '@plone/registry';
import installServer from './config.server';

describe('config.server', () => {
  afterEach(() => {
    config.settings = {};
    delete config.utilities['client'];
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
