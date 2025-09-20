import { expect, describe, it, vi, afterEach } from 'vitest';
import config from '@plone/registry';
import { RouterContextProvider } from 'react-router';
import {
  getAPIResourceWithAuth,
  installServerMiddleware,
  otherResources,
} from './middleware.server';

describe('middleware', () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe('installServerMiddleware', () => {
    it('installs the basic config correctly', async () => {
      const request = new Request('http://example.com');
      const context = new RouterContextProvider();

      await installServerMiddleware({ request, params: {}, context });

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

  describe('otherResources', () => {
    it('ignore regular internal content requests', async () => {
      const request = new Request('http://example.com');
      const context = new RouterContextProvider();
      const params = { '*': '' };
      const nextMock = vi.fn();

      await otherResources({ request, params, context });
    });

    it('blocks requests to special urls: css', async () => {
      const request = new Request('http://example.com');
      const context = new RouterContextProvider();
      const params = { '*': 'style.css' };
      const nextMock = vi.fn();

      try {
        await otherResources({ request, params, context });
      } catch (err: any) {
        expect(err.init.status).toEqual(404);
      }
    });

    it('blocks requests to special urls: css.map', async () => {
      const request = new Request('http://example.com');
      const context = new RouterContextProvider();
      const params = { '*': 'style.css.map' };
      const nextMock = vi.fn();

      try {
        await otherResources({ request, params, context });
      } catch (err: any) {
        expect(err.init.status).toEqual(404);
      }
    });

    // it('blocks requests to special urls: favicon.ico', async () => {
    //   const request = new Request('http://example.com');
    //   const context = new RouterContextProvider();
    //   const params = { '*': 'favicon.ico' };
    //   const nextMock = vi.fn();

    //   try {
    //     await otherResources({ request, params, context });
    //   } catch (err: any) {
    //     expect(err.init.status).toEqual(404);
    //   }

    //   // This is needed in v7.4.0 even if it should not be mandatory
    //   // Relevant issue: https://github.com/remix-run/react-router/issues/13274
    //   expect(nextMock).not.toHaveBeenCalled();
    // });

    // it('blocks requests to special urls: full https links', async () => {
    //   const request = new Request('http://example.com');
    //   const context = new RouterContextProvider();
    //   const params = { '*': 'https://another.site' };
    //   const nextMock = vi.fn();

    //   try {
    //     await otherResources({ request, params, context });
    //   } catch (err: any) {
    //     expect(err.init.status).toEqual(404);
    //   }

    //   // This is needed in v7.4.0 even if it should not be mandatory
    //   // Relevant issue: https://github.com/remix-run/react-router/issues/13274
    //   expect(nextMock).not.toHaveBeenCalled();
    // });

    it('blocks requests to special urls: expand', async () => {
      const request = new Request('http://example.com');
      const context = new RouterContextProvider();
      const params = { '*': '?expand=breadcrumbs' };
      const nextMock = vi.fn();

      try {
        await otherResources({ request, params, context });
      } catch (err: any) {
        expect(err.init.status).toEqual(404);
      }
    });

    it('blocks requests to special urls: assets', async () => {
      const request = new Request('http://example.com');
      const context = new RouterContextProvider();
      const params = { '*': 'assets/image.png' };
      const nextMock = vi.fn();

      try {
        await otherResources({ request, params, context });
      } catch (err: any) {
        expect(err.init.status).toEqual(404);
      }
    });
  });

  describe('getAPIResourceWithAuth', () => {
    it('ignore regular internal content requests', async () => {
      const request = new Request('http://example.com');
      const context = new RouterContextProvider();
      const params = { '*': '' };
      const nextMock = vi.fn();

      await getAPIResourceWithAuth({ request, params, context });
    });

    it('intercepts requests to special urls: @@images', async () => {
      const request = new Request('http://example.com');
      const context = new RouterContextProvider();
      const params = { '*': 'image.png/@@images/image' };
      const nextMock = vi.fn();
      const fetchMock = vi.fn().mockResolvedValue({
        status: 200,
        body: 'image',
      });
      global.fetch = fetchMock;

      try {
        await getAPIResourceWithAuth({ request, params, context });
      } catch (err: any) {
        expect(fetchMock).toHaveBeenCalledWith(
          'http://localhost:8080/Plone/image.png/@@images/image',
          expect.objectContaining({
            method: 'GET',
            headers: expect.objectContaining({
              Authorization: 'Bearer undefined',
            }),
          }),
        );
      }
    });

    it('intercepts requests to special urls: @@download', async () => {
      const request = new Request('http://example.com');
      const context = new RouterContextProvider();
      const params = { '*': 'file.txt/@@download/file' };
      const nextMock = vi.fn();
      const fetchMock = vi.fn().mockResolvedValue({
        status: 200,
        body: 'file',
      });
      global.fetch = fetchMock;

      try {
        await getAPIResourceWithAuth({ request, params, context });
      } catch (err: any) {
        expect(fetchMock).toHaveBeenCalledWith(
          'http://localhost:8080/Plone/file.txt/@@download/file',
          expect.objectContaining({
            method: 'GET',
            headers: expect.objectContaining({
              Authorization: 'Bearer undefined',
            }),
          }),
        );
      }
    });

    it('intercepts requests to special urls: @@site-logo', async () => {
      const request = new Request('http://example.com');
      const context = new RouterContextProvider();
      const params = { '*': '@@site-logo/image' };
      const nextMock = vi.fn();
      const fetchMock = vi.fn().mockResolvedValue({
        status: 200,
        body: 'logo',
      });
      global.fetch = fetchMock;

      try {
        await getAPIResourceWithAuth({ request, params, context });
      } catch (err: any) {
        expect(fetchMock).toHaveBeenCalledWith(
          'http://localhost:8080/Plone/@@site-logo/image',
          expect.objectContaining({
            method: 'GET',
            headers: expect.objectContaining({
              Authorization: 'Bearer undefined',
            }),
          }),
        );
      }
    });

    it('intercepts requests to special urls: @portrait', async () => {
      const request = new Request('http://example.com');
      const context = new RouterContextProvider();
      const params = { '*': '@portrait/username' };
      const nextMock = vi.fn();
      const fetchMock = vi.fn().mockResolvedValue({
        status: 200,
        body: 'portrait',
      });
      global.fetch = fetchMock;

      try {
        await getAPIResourceWithAuth({ request, params, context });
      } catch (err: any) {
        expect(fetchMock).toHaveBeenCalledWith(
          'http://localhost:8080/Plone/@portrait/username',
          expect.objectContaining({
            method: 'GET',
            headers: expect.objectContaining({
              Authorization: 'Bearer undefined',
            }),
          }),
        );
      }
    });
  });
});
