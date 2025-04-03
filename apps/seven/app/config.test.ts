import { expect, describe, it, afterEach } from 'vitest';
import config from '@plone/registry';
import install from './config';

describe('config', () => {
  afterEach(() => {
    config.settings = {};
  });

  it('should set the default config', () => {
    install();
    expect(config.settings).toStrictEqual(
      expect.objectContaining({
        supportedLanguages: ['en'],
        defaultLanguage: 'en',
      }),
    );
  });
});
