import { afterEach, describe, expect, it, vi } from 'vitest';
import { RouterContextProvider } from 'react-router';
import { loader } from './layout';
import { ploneContentContext } from 'seven/app/middleware.server';

vi.mock('seven/app/i18next.server', () => ({
  default: {
    getLocale: vi.fn().mockResolvedValue('en'),
  },
}));

describe('Contents layout loader', () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('reads content from middleware context and returns locale', async () => {
    const context = new RouterContextProvider();
    context.set(ploneContentContext, {
      '@id': '/plone/news',
      title: 'News',
      language: { token: 'en' },
    } as any);

    const request = new Request('http://example.com/@@contents/news');

    const result = await loader({
      request,
      context,
      params: { '*': 'news' },
      unstable_pattern: '/@@contents/*',
      unstable_url: new URL(request.url),
    });

    expect(result).toEqual({
      locale: 'en',
      content: {
        '@id': '/plone/news',
        title: 'News',
        language: { token: 'en' },
      },
    });
  });
});
