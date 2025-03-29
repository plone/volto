import { expect, describe, it, vi, afterEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import { createRoutesStub, unstable_RouterContextProvider } from 'react-router';
import config from '@plone/registry';
import {
  installServerMiddleware,
  Layout,
  loader,
  otherResources,
} from './root';

// function renderStub() {
//   const Stub = createRoutesStub([
//     {
//       path: '/',
//       Component: Layout,
//       loader() {
//         return {
//           content: {},
//           locale: 'en',
//         };
//       },
//     },
//   ]);

//   // render the app stub at "/login"
//   render(<Stub initialEntries={['/login']} />);
// }

describe('loader', () => {
  afterEach(() => {
    vi.restoreAllMocks();
    config.settings = {};
    delete config.utilities['client'];
  });

  it('should fetch the current content', async () => {
    const getContentMock = vi.fn().mockResolvedValue({ data: {} });
    config.settings.apiPath = 'http://example.com';
    config.settings.defaultLanguage = 'en';
    config.settings.supportedLanguages = ['en'];
    config.registerUtility({
      name: 'ploneClient',
      type: 'client',
      method: () => ({
        getContent: getContentMock,
      }),
    });
    const request = new Request('http://example.com');
    const context = new unstable_RouterContextProvider();

    const data = await loader({ request, params: {}, context });

    expect(getContentMock).toHaveBeenCalledWith({
      path: '/',
      expand: ['navroot', 'breadcrumbs', 'navigation'],
    });
    expect(data.locale).toBe('en');
  });

  it("should fetch the current content when it's not the root", async () => {
    const getContentMock = vi.fn().mockResolvedValue({ data: {} });
    config.settings.apiPath = 'http://example.com';
    config.settings.defaultLanguage = 'en';
    config.settings.supportedLanguages = ['en'];
    config.registerUtility({
      name: 'ploneClient',
      type: 'client',
      method: () => ({
        getContent: getContentMock,
      }),
    });
    const request = new Request('http://example.com/test-content');
    const context = new unstable_RouterContextProvider();

    const data = await loader({
      request,
      params: { '*': 'test-content' },
      context,
    });

    expect(getContentMock).toHaveBeenCalledWith({
      path: '/test-content',
      expand: ['navroot', 'breadcrumbs', 'navigation'],
    });
    expect(data.locale).toBe('en');
  });

  it('should throw when the current content is not loaded', async () => {
    const getContentMock = vi
      .fn()
      .mockRejectedValue({ data: undefined, status: 500 });
    config.settings.apiPath = 'http://example.com';
    config.settings.defaultLanguage = 'en';
    config.settings.supportedLanguages = ['en'];
    config.registerUtility({
      name: 'ploneClient',
      type: 'client',
      method: () => ({
        getContent: getContentMock,
      }),
    });
    const request = new Request('http://example.com');
    const context = new unstable_RouterContextProvider();

    try {
      await loader({ request, params: {}, context });
    } catch (err: any) {
      expect(err.init.status).toEqual(500);
    }
  });
});

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
