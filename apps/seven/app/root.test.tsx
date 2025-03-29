import { expect, describe, it, vi, afterEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import { createRoutesStub, unstable_RouterContextProvider } from 'react-router';
import config from '@plone/registry';
import { Layout, loader } from './root';

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
