import { expect, describe, it, vi, afterEach } from 'vitest';
import config from '@plone/registry';
import { RouterContextProvider } from 'react-router';
import { jwtDecode } from 'jwt-decode';
import { getAuthFromRequest } from '@plone/react-router';
import {
  fetchPloneContent,
  getAPIResourceWithAuth,
  installServerMiddleware,
  PloneClientMiddleware,
  otherResources,
  ploneClientContext,
  ploneContentContext,
  ploneSiteContext,
  ploneUserContext,
} from './middleware.server';

vi.mock('jwt-decode');
vi.mock('@plone/react-router', () => ({ getAuthFromRequest: vi.fn() }));

describe('middleware', () => {
  const initializePloneClientContext = async (
    request: Request,
    context: RouterContextProvider,
  ) => {
    await PloneClientMiddleware(
      {
        request,
        context,
        params: {},
        unstable_pattern: '/',
        unstable_url: new URL(request.url),
      },
      vi.fn(),
    );
  };

  const registerPloneClientFactory = (ploneClient: Record<string, unknown>) => {
    config.registerUtility({
      name: 'ploneClient',
      type: 'client',
      method: () => ({
        initialize: vi.fn().mockReturnValue(ploneClient),
      }),
    });
  };

  afterEach(() => {
    vi.resetAllMocks();
    vi.restoreAllMocks();
  });

  describe('installServerMiddleware', () => {
    it('installs the basic config correctly', async () => {
      const request = new Request('http://example.com');
      const context = new RouterContextProvider();
      const nextMock = vi.fn();

      await installServerMiddleware(
        {
          request,
          context,
          params: {},
          unstable_pattern: '/',
          unstable_url: new URL(request.url),
        },
        nextMock,
      );

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
          .method(),
      ).toHaveProperty('initialize');
    });
  });

  describe('PloneClientMiddleware', () => {
    it('initializes the PloneClient and sets it in context', async () => {
      const request = new Request('http://example.com');
      const context = new RouterContextProvider();
      const nextMock = vi.fn();

      vi.mocked(getAuthFromRequest).mockResolvedValue(undefined);
      config.settings.apiPath = 'http://localhost:8080/Plone';
      config.registerUtility({
        name: 'ploneClient',
        type: 'client',
        method: () => ({
          initialize: vi.fn().mockReturnValue({
            config: { apiPath: 'http://localhost:8080/Plone' },
          }),
        }),
      });

      await PloneClientMiddleware(
        {
          request,
          context,
          params: {},
          unstable_pattern: '/',
          unstable_url: new URL(request.url),
        },
        nextMock,
      );

      expect(context.get(ploneClientContext)).toBeDefined();
    });

    it('initializes PloneClient with token when available', async () => {
      const request = new Request('http://example.com');
      const context = new RouterContextProvider();
      const nextMock = vi.fn();

      vi.mocked(getAuthFromRequest).mockResolvedValue('valid.jwt.token');
      config.settings.apiPath = 'http://localhost:8080/Plone';
      const initializeMock = vi.fn().mockReturnValue({});
      config.registerUtility({
        name: 'ploneClient',
        type: 'client',
        method: () => ({
          initialize: initializeMock,
        }),
      });

      await PloneClientMiddleware(
        {
          request,
          context,
          params: {},
          unstable_pattern: '/',
          unstable_url: new URL(request.url),
        },
        nextMock,
      );

      expect(initializeMock).toHaveBeenCalledWith({
        apiPath: 'http://localhost:8080/Plone',
        token: 'valid.jwt.token',
      });
    });
  });

  describe('otherResources', () => {
    it('ignore regular internal content requests', async () => {
      const request = new Request('http://example.com');
      const context = new RouterContextProvider();
      const params = { '*': '' };
      const nextMock = vi.fn();

      await otherResources(
        {
          request,
          params,
          context,
          unstable_pattern: '/',
          unstable_url: new URL(request.url),
        },
        nextMock,
      );
    });

    it('blocks requests to special urls: css', async () => {
      const request = new Request('http://example.com');
      const context = new RouterContextProvider();
      const params = { '*': 'style.css' };
      const nextMock = vi.fn();

      try {
        await otherResources(
          {
            request,
            params,
            context,
            unstable_pattern: '/style.css',
            unstable_url: new URL(request.url),
          },
          nextMock,
        );
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
        await otherResources(
          {
            request,
            params,
            context,
            unstable_pattern: '/style.css.map',
            unstable_url: new URL(request.url),
          },
          nextMock,
        );
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
    //     await otherResources({ request, params, context }, nextMock);
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
    //     await otherResources({ request, params, context }, nextMock);
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
        await otherResources(
          {
            request,
            params,
            context,
            unstable_pattern: '/?expand=breadcrumbs',
            unstable_url: new URL(request.url),
          },
          nextMock,
        );
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
        await otherResources(
          {
            request,
            params,
            context,
            unstable_pattern: '/assets/image.png',
            unstable_url: new URL(request.url),
          },
          nextMock,
        );
      } catch (err: any) {
        expect(err.init.status).toEqual(404);
      }
    });

    it('blocks requests to .well-known paths', async () => {
      const request = new Request('http://example.com');
      const context = new RouterContextProvider();
      const params = {
        '*': '.well-known/appspecific/com.chrome.devtools.json',
      };
      const nextMock = vi.fn();

      try {
        await otherResources(
          {
            request,
            params,
            context,
            unstable_pattern:
              '/.well-known/appspecific/com.chrome.devtools.json',
            unstable_url: new URL(request.url),
          },
          nextMock,
        );
      } catch (err: any) {
        expect(err).toBeInstanceOf(Response);
        expect(err.status).toEqual(200);
      }
    });
  });

  describe('getAPIResourceWithAuth', () => {
    it('ignore regular internal content requests', async () => {
      const request = new Request('http://example.com');
      const context = new RouterContextProvider();
      const params = { '*': '' };
      const nextMock = vi.fn();

      await getAPIResourceWithAuth(
        {
          request,
          params,
          context,
          unstable_pattern: '/',
          unstable_url: new URL(request.url),
        },
        nextMock,
      );
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
        await getAPIResourceWithAuth(
          {
            request,
            params,
            context,
            unstable_pattern: '/image.png/@@images/image',
            unstable_url: new URL(request.url),
          },
          nextMock,
        );
      } catch {
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
        await getAPIResourceWithAuth(
          {
            request,
            params,
            context,
            unstable_pattern: '/file.txt/@@download/file',
            unstable_url: new URL(request.url),
          },
          nextMock,
        );
      } catch {
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
        await getAPIResourceWithAuth(
          {
            request,
            params,
            context,
            unstable_pattern: '/@@site-logo/image',
            unstable_url: new URL(request.url),
          },
          nextMock,
        );
      } catch {
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
        await getAPIResourceWithAuth(
          {
            request,
            params,
            context,
            unstable_pattern: '/@portrait/username',
            unstable_url: new URL(request.url),
          },
          nextMock,
        );
      } catch {
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

  describe('fetchPloneContent', () => {
    afterEach(() => {
      delete config.utilities['ploneClient'];
    });

    it('fetches content and site and sets them in context', async () => {
      const mockContent = {
        data: { '@id': 'http://example.com/', title: 'Home' },
      };
      const mockSite = { data: { '@id': 'http://example.com/' } };
      const getContentMock = vi.fn().mockResolvedValue(mockContent);
      const getSiteMock = vi.fn().mockResolvedValue(mockSite);
      config.settings.apiPath = 'http://example.com';
      registerPloneClientFactory({
        getContent: getContentMock,
        getSite: getSiteMock,
      });
      const request = new Request('http://example.com');
      const context = new RouterContextProvider();
      const nextMock = vi.fn();

      await initializePloneClientContext(request, context);

      await fetchPloneContent(
        {
          request,
          params: {},
          context,
          unstable_pattern: '/',
          unstable_url: new URL(request.url),
        },
        nextMock,
      );

      expect(getContentMock).toHaveBeenCalledWith({
        path: '/',
        expand: ['navroot', 'breadcrumbs', 'navigation', 'actions'],
      });
      expect(getSiteMock).toHaveBeenCalled();
      expect(context.get(ploneContentContext)).toEqual({
        '@id': '/',
        title: 'Home',
      });
      expect(context.get(ploneSiteContext)).toEqual({ '@id': '/' });
      expect(context.get(ploneClientContext)).toBeDefined();
    });

    it('fetches content for a specific path', async () => {
      const getContentMock = vi.fn().mockResolvedValue({ data: {} });
      const getSiteMock = vi.fn().mockResolvedValue({ data: {} });
      config.settings.apiPath = 'http://example.com';
      registerPloneClientFactory({
        getContent: getContentMock,
        getSite: getSiteMock,
      });
      const request = new Request('http://example.com/test-content');
      const context = new RouterContextProvider();
      const nextMock = vi.fn();

      await initializePloneClientContext(request, context);

      await fetchPloneContent(
        {
          request,
          params: { '*': 'test-content' },
          context,
          unstable_pattern: '/test-content',
          unstable_url: new URL(request.url),
        },
        nextMock,
      );

      expect(getContentMock).toHaveBeenCalledWith({
        path: '/test-content',
        expand: ['navroot', 'breadcrumbs', 'navigation', 'actions'],
      });
    });

    it('throws when content is not found', async () => {
      const getContentMock = vi
        .fn()
        .mockRejectedValue({ data: undefined, status: 500 });
      const getSiteMock = vi.fn().mockResolvedValue({ data: {} });
      config.settings.apiPath = 'http://example.com';
      registerPloneClientFactory({
        getContent: getContentMock,
        getSite: getSiteMock,
      });
      const request = new Request('http://example.com');
      const context = new RouterContextProvider();
      const nextMock = vi.fn();

      await initializePloneClientContext(request, context);

      try {
        await fetchPloneContent(
          {
            request,
            params: {},
            context,
            unstable_pattern: '/',
            unstable_url: new URL(request.url),
          },
          nextMock,
        );
      } catch (err: any) {
        expect(err.init.status).toEqual(500);
      }
    });

    it('throws when site is not found', async () => {
      const getContentMock = vi.fn().mockResolvedValue({ data: {} });
      const getSiteMock = vi
        .fn()
        .mockRejectedValue({ data: undefined, status: 500 });
      config.settings.apiPath = 'http://example.com';
      registerPloneClientFactory({
        getContent: getContentMock,
        getSite: getSiteMock,
      });
      const request = new Request('http://example.com');
      const context = new RouterContextProvider();
      const nextMock = vi.fn();

      await initializePloneClientContext(request, context);

      try {
        await fetchPloneContent(
          {
            request,
            params: {},
            context,
            unstable_pattern: '/',
            unstable_url: new URL(request.url),
          },
          nextMock,
        );
      } catch (err: any) {
        expect(err.init.status).toEqual(500);
      }
    });

    it('sets ploneUserContext to null when no token is provided', async () => {
      const getContentMock = vi.fn().mockResolvedValue({ data: {} });
      const getSiteMock = vi.fn().mockResolvedValue({ data: {} });
      const getUserMock = vi.fn();
      config.settings.apiPath = 'http://example.com';
      registerPloneClientFactory({
        getContent: getContentMock,
        getSite: getSiteMock,
        getUser: getUserMock,
      });
      const request = new Request('http://example.com');
      const context = new RouterContextProvider();
      const nextMock = vi.fn();

      await initializePloneClientContext(request, context);

      await fetchPloneContent(
        {
          request,
          params: {},
          context,
          unstable_pattern: '/',
          unstable_url: new URL(request.url),
        },
        nextMock,
      );

      expect(getUserMock).not.toHaveBeenCalled();
      expect(context.get(ploneUserContext)).toBeNull();
    });

    it('fetches user and sets ploneUserContext when token is valid', async () => {
      const mockUser = { data: { id: 'testuser', fullname: 'Test User' } };
      const getContentMock = vi.fn().mockResolvedValue({ data: {} });
      const getSiteMock = vi.fn().mockResolvedValue({ data: {} });
      const getUserMock = vi.fn().mockResolvedValue(mockUser);
      config.settings.apiPath = 'http://example.com';
      registerPloneClientFactory({
        getContent: getContentMock,
        getSite: getSiteMock,
        getUser: getUserMock,
      });
      vi.mocked(getAuthFromRequest).mockResolvedValue('valid.jwt.token');
      vi.mocked(jwtDecode).mockReturnValue({
        sub: 'testuser',
        exp: 9999999999,
        fullname: 'Test User',
      });
      const request = new Request('http://example.com');
      const context = new RouterContextProvider();
      const nextMock = vi.fn();

      await initializePloneClientContext(request, context);

      await fetchPloneContent(
        {
          request,
          params: {},
          context,
          unstable_pattern: '/',
          unstable_url: new URL(request.url),
        },
        nextMock,
      );

      expect(getUserMock).toHaveBeenCalledWith({ id: 'testuser' });
      expect(context.get(ploneUserContext)).toEqual(mockUser.data);
      expect(getContentMock).toHaveBeenCalledWith({
        path: '/',
        expand: ['navroot', 'breadcrumbs', 'navigation', 'actions', 'types'],
      });
    });

    it('does not fetch user when token has no sub field', async () => {
      const getContentMock = vi.fn().mockResolvedValue({ data: {} });
      const getSiteMock = vi.fn().mockResolvedValue({ data: {} });
      const getUserMock = vi.fn();
      config.settings.apiPath = 'http://example.com';
      registerPloneClientFactory({
        getContent: getContentMock,
        getSite: getSiteMock,
        getUser: getUserMock,
      });
      vi.mocked(getAuthFromRequest).mockResolvedValue('token.without.sub');
      vi.mocked(jwtDecode).mockReturnValue({ exp: 9999999999 });
      const request = new Request('http://example.com');
      const context = new RouterContextProvider();
      const nextMock = vi.fn();

      await initializePloneClientContext(request, context);

      await fetchPloneContent(
        {
          request,
          params: {},
          context,
          unstable_pattern: '/',
          unstable_url: new URL(request.url),
        },
        nextMock,
      );

      expect(getUserMock).not.toHaveBeenCalled();
      expect(context.get(ploneUserContext)).toBeNull();
      expect(getContentMock).toHaveBeenCalledWith({
        path: '/',
        expand: ['navroot', 'breadcrumbs', 'navigation', 'actions'],
      });
    });

    it('handles JWT decode errors gracefully and proceeds without user', async () => {
      const getContentMock = vi.fn().mockResolvedValue({ data: {} });
      const getSiteMock = vi.fn().mockResolvedValue({ data: {} });
      const getUserMock = vi.fn();
      config.settings.apiPath = 'http://example.com';
      registerPloneClientFactory({
        getContent: getContentMock,
        getSite: getSiteMock,
        getUser: getUserMock,
      });
      vi.mocked(getAuthFromRequest).mockResolvedValue('malformed.token');
      vi.mocked(jwtDecode).mockImplementation(() => {
        throw new Error('Invalid token');
      });
      const request = new Request('http://example.com');
      const context = new RouterContextProvider();
      const nextMock = vi.fn();

      await initializePloneClientContext(request, context);

      await fetchPloneContent(
        {
          request,
          params: {},
          context,
          unstable_pattern: '/',
          unstable_url: new URL(request.url),
        },
        nextMock,
      );

      expect(getUserMock).not.toHaveBeenCalled();
      expect(context.get(ploneUserContext)).toBeNull();
    });
  });
});
