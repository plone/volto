import { expect, describe, it, vi, afterEach } from 'vitest';
import config from '@plone/registry';
import { unstable_RouterContextProvider } from 'react-router';
import { installServerMiddleware, otherResources } from './middleware.server';

describe('middleware', () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe('installServerMiddleware', () => {
    it('installs the basic config correctly', async () => {
      const request = new Request('http://example.com');
      const context = new unstable_RouterContextProvider();
      const nextMock = vi.fn();

      await installServerMiddleware({ request, params: {}, context }, nextMock);

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
      // This is needed in v7.4.0 even if it should not be mandatory
      // Relevant issue: https://github.com/remix-run/react-router/issues/13274
      expect(nextMock).toHaveBeenCalled();
    });
  });

  describe('otherResources', () => {
    it('ignore regular internal content requests', async () => {
      const request = new Request('http://example.com');
      const context = new unstable_RouterContextProvider();
      const params = { '*': '' };
      const nextMock = vi.fn();

      await otherResources({ request, params, context }, nextMock);

      // This is needed in v7.4.0 even if it should not be mandatory
      // Relevant issue: https://github.com/remix-run/react-router/issues/13274
      expect(nextMock).toHaveBeenCalled();
    });

    it('blocks requests to special urls: css', async () => {
      const request = new Request('http://example.com');
      const context = new unstable_RouterContextProvider();
      const params = { '*': 'maps.css' };
      const nextMock = vi.fn();

      try {
        await otherResources({ request, params, context }, nextMock);
      } catch (err: any) {
        expect(err.init.status).toEqual(404);
      }

      // This is needed in v7.4.0 even if it should not be mandatory
      // Relevant issue: https://github.com/remix-run/react-router/issues/13274
      expect(nextMock).not.toHaveBeenCalled();
    });
  });
});
