import { expect, describe, it, vi, afterEach } from 'vitest';
import config from '@plone/registry';
import { loader } from './search';

describe('loader', () => {
  afterEach(() => {
    vi.restoreAllMocks();
    config.settings = {};
    delete config.utilities['ploneClient'];
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
    config.registerUtility({
      name: 'ploneClient',
      type: 'client',
      method: () => ({
        search: searchMock,
        config: {
          token: undefined,
        },
      }),
    });
    const request = new Request(
      'http://example.com/@search?SearchableText=test&path.depth=1',
    );

    await loader({ request, params: {}, context: {} });

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
    config.registerUtility({
      name: 'ploneClient',
      type: 'client',
      method: () => ({
        search: searchMock,
        config: {
          token: undefined,
        },
      }),
    });
    const request = new Request('http://example.com/@search');

    await loader({ request, params: {}, context: {} });

    expect(searchMock).toHaveBeenCalledWith({
      query: {
        path: {
          query: '/',
        },
      },
    });
  });
});
