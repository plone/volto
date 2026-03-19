import { expect, describe, it, vi, afterEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import { createRoutesStub, RouterContextProvider } from 'react-router';
import config from '@plone/registry';
import { Layout, ErrorBoundary, loader } from './root';
import { renderWithI18n } from '../tests/testHelpers';

async function renderStub() {
  const Stub = createRoutesStub([
    {
      path: '/',
      Component: () => (
        <Layout
          params={{}}
          loaderData={{ locale: 'en', content: {} as any, site: {} as any }}
          matches={[{} as any]}
        >
          <p>Root Layout</p>
        </Layout>
      ),
      // a fallback is needed
      HydrateFallback: () => <></>,
      loader() {
        return {
          content: {},
          locale: 'en',
        };
      },
    },
  ]);

  await renderWithI18n(<Stub initialEntries={['/']} />);
}

const makeLoaderArgs = (
  request: Request,
  params: Record<string, string> = {},
) =>
  ({
    request,
    params,
    context: new RouterContextProvider(),
    unstable_pattern: '',
  }) as Parameters<typeof loader>[0];

const registerSomersaultBlockMigrations = () => {
  config.registerUtility({
    name: 'testSomersaultBlockMigrationTitle',
    type: 'somersaultBlockMigration',
    method: ({ block, content }) =>
      block['@type'] === 'title'
        ? [
            {
              type: 'title',
              children: [
                {
                  text: typeof content.title === 'string' ? content.title : '',
                },
              ],
            },
          ]
        : [],
  });

  config.registerUtility({
    name: 'testSomersaultBlockMigrationLegacyValue',
    type: 'somersaultBlockMigration',
    method: ({ block }) => (Array.isArray(block.value) ? block.value : []),
  });
};

describe('loader', () => {
  afterEach(() => {
    vi.restoreAllMocks();
    config.settings = {};
    const utilities = config.utilities as Partial<Record<string, unknown>>;
    delete utilities.client;
    delete utilities.somersaultMigration;
    delete utilities.rootContentSubRequest;
    delete utilities.rootLoaderData;
  });

  it('should fetch the current content', async () => {
    const getContentMock = vi.fn().mockResolvedValue({ data: {} });
    const getSiteMock = vi.fn().mockResolvedValue({ data: {} });
    config.settings.apiPath = 'http://example.com';
    config.settings.defaultLanguage = 'en';
    config.settings.supportedLanguages = ['en'];
    config.registerUtility({
      name: 'ploneClient',
      type: 'client',
      method: () => ({
        config: {
          token: undefined,
        },
        getContent: getContentMock,
        getSite: getSiteMock,
      }),
    });
    const request = new Request('http://example.com');
    const data = await loader(makeLoaderArgs(request));

    expect(getContentMock).toHaveBeenCalledWith({
      path: '/',
      expand: ['navroot', 'breadcrumbs', 'navigation', 'actions'],
    });
    expect(getSiteMock).toHaveBeenCalled();
    expect(data.locale).toBe('en');
  });

  it("should fetch the current content when it's not the root", async () => {
    const getContentMock = vi.fn().mockResolvedValue({ data: {} });
    const getSiteMock = vi.fn().mockResolvedValue({ data: {} });
    config.settings.apiPath = 'http://example.com';
    config.settings.defaultLanguage = 'en';
    config.settings.supportedLanguages = ['en'];
    config.registerUtility({
      name: 'ploneClient',
      type: 'client',
      method: () => ({
        config: {
          token: undefined,
        },
        getContent: getContentMock,
        getSite: getSiteMock,
      }),
    });
    const request = new Request('http://example.com/test-content');
    const data = await loader(makeLoaderArgs(request, { '*': 'test-content' }));

    expect(getContentMock).toHaveBeenCalledWith({
      path: '/test-content',
      expand: ['navroot', 'breadcrumbs', 'navigation', 'actions'],
    });
    expect(getSiteMock).toHaveBeenCalled();
    expect(data.locale).toBe('en');
  });

  it('should place the migrated title block in the legacy block order', async () => {
    const getContentMock = vi.fn().mockResolvedValue({
      data: {
        title: 'Page title',
        blocks: {
          a: {
            '@type': 'text',
            value: [{ type: 'p', children: [{ text: 'First block' }] }],
          },
          titleBlock: {
            '@type': 'title',
          },
          b: {
            '@type': 'text',
            value: [{ type: 'p', children: [{ text: 'Second block' }] }],
          },
        },
        blocks_layout: {
          items: ['a', 'titleBlock', 'b'],
        },
      },
    });
    const getSiteMock = vi.fn().mockResolvedValue({ data: {} });
    const somersaultMigration = vi.fn(({ value }) => value);
    config.settings.apiPath = 'http://example.com';
    config.settings.defaultLanguage = 'en';
    config.settings.supportedLanguages = ['en'];
    registerSomersaultBlockMigrations();
    config.registerUtility({
      name: 'ploneClient',
      type: 'client',
      method: () => ({
        config: {
          token: undefined,
        },
        getContent: getContentMock,
        getSite: getSiteMock,
      }),
    });
    config.registerUtility({
      name: 'testSomersaultMigration',
      type: 'somersaultMigration',
      method: somersaultMigration,
    });
    const request = new Request('http://example.com');
    const data = await loader(makeLoaderArgs(request));

    expect(somersaultMigration).toHaveBeenCalledTimes(1);
    expect(data.content.blocks.__somersault__).toEqual({
      '@type': '__somersault__',
      value: [
        {
          type: 'p',
          children: [{ text: 'First block' }],
        },
        {
          type: 'title',
          children: [{ text: 'Page title' }],
        },
        {
          type: 'p',
          children: [{ text: 'Second block' }],
        },
      ],
    });
  });

  it('should skip somersault migration when the somersault block already exists', async () => {
    const existingSomersaultValue = [
      {
        type: 'title',
        children: [{ text: 'Already migrated' }],
      },
    ];
    const getContentMock = vi.fn().mockResolvedValue({
      data: {
        title: 'Page title',
        blocks: {
          __somersault__: {
            '@type': '__somersault__',
            value: existingSomersaultValue,
          },
          a: {
            '@type': 'text',
            value: [{ type: 'p', children: [{ text: 'Legacy block' }] }],
          },
        },
        blocks_layout: {
          items: ['a'],
        },
      },
    });
    const getSiteMock = vi.fn().mockResolvedValue({ data: {} });
    const somersaultMigration = vi.fn(({ value }) => value);
    config.settings.apiPath = 'http://example.com';
    config.settings.defaultLanguage = 'en';
    config.settings.supportedLanguages = ['en'];
    registerSomersaultBlockMigrations();
    config.registerUtility({
      name: 'ploneClient',
      type: 'client',
      method: () => ({
        config: {
          token: undefined,
        },
        getContent: getContentMock,
        getSite: getSiteMock,
      }),
    });
    config.registerUtility({
      name: 'testSomersaultMigration',
      type: 'somersaultMigration',
      method: somersaultMigration,
    });
    const request = new Request('http://example.com');
    const data = await loader(makeLoaderArgs(request));

    expect(somersaultMigration).not.toHaveBeenCalled();
    expect(data.content.blocks.__somersault__).toEqual({
      '@type': '__somersault__',
      value: existingSomersaultValue,
    });
  });

  it('should throw when the current content is not loaded', async () => {
    const getContentMock = vi
      .fn()
      .mockRejectedValue({ data: undefined, status: 500 });
    const getSiteMock = vi.fn().mockResolvedValue({ data: {} });
    config.settings.apiPath = 'http://example.com';
    config.settings.defaultLanguage = 'en';
    config.settings.supportedLanguages = ['en'];
    config.registerUtility({
      name: 'ploneClient',
      type: 'client',
      method: () => ({
        config: {
          token: undefined,
        },
        getContent: getContentMock,
        getSite: getSiteMock,
      }),
    });
    try {
      await loader(makeLoaderArgs(new Request('http://example.com')));
    } catch (err: any) {
      expect(err.init.status).toEqual(500);
    }
  });

  it('should throw when the site is not loaded', async () => {
    const getContentMock = vi.fn().mockResolvedValue({ data: {} });
    const getSiteMock = vi
      .fn()
      .mockRejectedValue({ data: undefined, status: 500 });
    config.settings.apiPath = 'http://example.com';
    config.settings.defaultLanguage = 'en';
    config.settings.supportedLanguages = ['en'];
    config.registerUtility({
      name: 'ploneClient',
      type: 'client',
      method: () => ({
        config: {
          token: undefined,
        },
        getContent: getContentMock,
        getSite: getSiteMock,
      }),
    });
    try {
      await loader(makeLoaderArgs(new Request('http://example.com')));
    } catch (err: any) {
      expect(err.init.status).toEqual(500);
    }
  });
});

describe('Layout', () => {
  it('should render the root Layout', async () => {
    await renderStub();
    expect(await screen.findByText('Root Layout')).toBeInTheDocument();
  });
});

describe('ErrorBoundary', () => {
  it('should render the error message', async () => {
    const error = new Error('Test error');
    render(<ErrorBoundary error={error} params={{}} />);
    expect(screen.getByText('Test error')).toBeInTheDocument();
  });
});
