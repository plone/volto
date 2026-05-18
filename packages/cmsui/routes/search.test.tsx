import { expect, describe, it, vi, afterEach } from 'vitest';
import config from '@plone/registry';
import { loader } from './search';
import { RouterContextProvider } from 'react-router';
import { ploneClientContext } from 'seven/app/middleware.server';

describe('loader', () => {
  afterEach(() => {
    vi.restoreAllMocks();
    config.settings = {};
  });

  it('should call the search method with the correct parameters', async () => {
    const searchMock = vi.fn().mockResolvedValue({
      data: {
        '@id': 'http://example.com/++api++/@search',
        items: [],
        items_total: 0,
      },
    });
    config.settings.apiPath = 'http://example.com';
    const context = new RouterContextProvider();
    context.set(ploneClientContext, {
      search: searchMock,
    } as any);
    const request = new Request(
      'http://example.com/@search?SearchableText=test&path.depth=1',
    );

    await loader({
      request,
      params: {},
      context,
      unstable_pattern: '/@search?SearchableText=test&path.depth=1',
      unstable_url: new URL(request.url),
    });

    expect(searchMock).toHaveBeenCalledWith({
      query: {
        path: {
          query: '/',
          depth: 1,
        },
        SearchableText: 'test*',
      },
    });
  });

  it('should not add SearchableText=* if not set', async () => {
    const searchMock = vi.fn().mockResolvedValue({
      data: {
        '@id': 'http://example.com/++api++/@search',
        items: [],
        items_total: 0,
      },
    });
    config.settings.apiPath = 'http://example.com';
    const context = new RouterContextProvider();
    context.set(ploneClientContext, {
      search: searchMock,
    } as any);
    const request = new Request('http://example.com/@search');

    await loader({
      request,
      params: {},
      context,
      unstable_pattern: '@search',
      unstable_url: new URL(request.url),
    });

    expect(searchMock).toHaveBeenCalledWith({
      query: {
        path: {
          query: '/',
        },
      },
    });
  });
});
