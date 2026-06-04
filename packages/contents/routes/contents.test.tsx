import { afterEach, describe, expect, it, vi } from 'vitest';
import { RouterContextProvider } from 'react-router';
import { loader } from './contents';
import {
  ploneClientContext,
  ploneContentContext,
} from 'seven/app/middleware.server';

vi.mock('@plone/react-router', () => ({
  requireAuthCookie: vi.fn().mockResolvedValue('fake-token'),
}));

describe('Contents route loader', () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('uses middleware contexts for content and client search', async () => {
    const searchMock = vi.fn().mockResolvedValue({
      data: {
        '@id': 'http://example.com/++api++/@search',
        items: [
          {
            '@id': 'http://example.com/++api++/doc-1',
            '@type': 'Document',
            title: 'Doc 1',
          },
        ],
        items_total: 1,
      },
    });

    const context = new RouterContextProvider();
    context.set(ploneClientContext, { search: searchMock } as any);
    context.set(ploneContentContext, {
      '@id': '/plone',
      title: 'Plone Site',
    } as any);

    const request = new Request(
      'http://example.com/@@contents/news?SearchableText=foo&page=2&sort_on=modified&sort_order=descending',
    );

    const result = await loader({
      request,
      params: { '*': 'news' },
      context,
      unstable_pattern: '/@@contents/*',
      unstable_url: new URL(request.url),
    });

    expect(searchMock).toHaveBeenCalledWith({
      query: {
        path: {
          query: '/news',
          depth: 1,
        },
        sort_on: 'modified',
        sort_order: 'descending',
        metadata_fields: '_all',
        show_inactive: true,
        b_size: 10,
        SearchableText: 'foo**',
        b_start: 20,
      },
    });

    expect(result).toEqual(
      expect.objectContaining({
        content: {
          '@id': '/plone',
          title: 'Plone Site',
        },
        searchableText: 'foo',
        page: '2',
        b_size: 10,
        sort_on: 'modified',
        sort_order: 'descending',
      }),
    );
    expect(result.search.items_total).toBe(1);
    expect(result.search.items[0]).toEqual(
      expect.objectContaining({
        '@type': 'Document',
        title: 'Doc 1',
      }),
    );
  });

  it('uses the root path when no wildcard param is present', async () => {
    const searchMock = vi.fn().mockResolvedValue({
      data: {
        '@id': 'http://example.com/++api++/@search',
        items: [],
        items_total: 0,
      },
    });

    const context = new RouterContextProvider();
    context.set(ploneClientContext, { search: searchMock } as any);
    context.set(ploneContentContext, { '@id': '/plone', title: 'Home' } as any);

    const request = new Request('http://example.com/@@contents');

    await loader({
      request,
      params: {},
      context,
      unstable_pattern: '/@@contents',
      unstable_url: new URL(request.url),
    });

    expect(searchMock).toHaveBeenCalledWith({
      query: expect.objectContaining({
        path: {
          query: '/',
          depth: 1,
        },
        sort_on: 'getObjPositionInParent',
        sort_order: 'ascending',
      }),
    });
  });
});
