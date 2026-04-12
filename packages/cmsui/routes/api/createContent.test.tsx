import { afterEach, describe, expect, it, vi } from 'vitest';
import config from '@plone/registry';
import { action } from './createContent';
import { RouterContextProvider } from 'react-router';
import { ploneClientContext } from 'seven/app/middleware.server';

describe('createContent API route action', () => {
  afterEach(() => {
    vi.restoreAllMocks();
    config.settings = {};
  });

  it('calls createContent with wildcard path and returns response data', async () => {
    const createContentMock = vi.fn().mockResolvedValue({
      data: {
        '@id': 'http://example.com/++api++/folder/new-image',
        title: 'new-image',
      },
    });

    config.settings.apiPath = 'http://example.com';
    const context = new RouterContextProvider();
    context.set(ploneClientContext, {
      createContent: createContentMock,
    } as any);

    const request = new Request('http://example.com/@createContent/folder', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        data: {
          '@type': 'Image',
          title: 'new-image',
          image: {
            'content-type': 'image/png',
            data: 'ZmFrZS1pbWFnZS1ieXRlcw==',
            encoding: 'base64',
            filename: 'new-image.png',
          },
        },
      }),
    });

    const response = await action({
      request,
      params: { '*': 'folder' },
      context,
      unstable_pattern: '/@createContent/folder',
    });

    expect(createContentMock).toHaveBeenCalledWith({
      path: '/folder',
      data: {
        '@type': 'Image',
        title: 'new-image',
        image: {
          'content-type': 'image/png',
          data: 'ZmFrZS1pbWFnZS1ieXRlcw==',
          encoding: 'base64',
          filename: 'new-image.png',
        },
      },
    });

    expect((response as any).init?.status ?? 200).toBe(200);
    expect((response as any).data).toEqual({
      '@id': '/++api++/folder/new-image',
      title: 'new-image',
    });
  });
});
