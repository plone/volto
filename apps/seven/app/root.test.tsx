import { expect, describe, it, vi, afterEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import { createRoutesStub, RouterContextProvider } from 'react-router';
import config from '@plone/registry';
import { Layout, ErrorBoundary, loader } from './root';
import {
  ploneClientContext,
  ploneContentContext,
  ploneSiteContext,
} from './middleware.server';
import { migrateContent } from './config/server/content-migrations.server';
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

afterEach(() => {
  vi.restoreAllMocks();
  config.settings = {};
  const utilities = config.utilities as Partial<Record<string, unknown>>;
  delete utilities.client;
  delete utilities.somersaultBlockMigration;
  delete utilities.somersaultMigration;
  delete utilities.rootContentSubRequest;
  delete utilities.rootLoaderData;
});

describe('loader', () => {
  it('should return content and site from context', async () => {
    config.settings.defaultLanguage = 'en';
    config.settings.supportedLanguages = ['en'];
    const mockContent = { '@id': 'http://example.com/', title: 'Home' };
    const mockSite = { '@id': 'http://example.com/' };
    const request = new Request('http://example.com');
    const context = new RouterContextProvider();
    context.set(ploneClientContext, {} as any);
    context.set(ploneContentContext, mockContent as any);
    context.set(ploneSiteContext, mockSite as any);

    const data = await loader({
      request,
      params: {},
      context,
      unstable_pattern: '/',
      unstable_url: new URL(request.url),
    });

    expect(data.locale).toBe('en');
    expect(data.content).toBeDefined();
    expect(data.site).toBeDefined();
  });

  it('should return content for a non-root path', async () => {
    config.settings.defaultLanguage = 'en';
    config.settings.supportedLanguages = ['en'];
    const mockContent = {
      '@id': 'http://example.com/test-content',
      title: 'Test',
    };
    const mockSite = { '@id': 'http://example.com/' };
    const request = new Request('http://example.com/test-content');
    const context = new RouterContextProvider();
    context.set(ploneClientContext, {} as any);
    context.set(ploneContentContext, mockContent as any);
    context.set(ploneSiteContext, mockSite as any);

    const data = await loader({
      request,
      params: { '*': 'test-content' },
      context,
      unstable_pattern: '/test-content',
      unstable_url: new URL(request.url),
    });

    expect(data.locale).toBe('en');
    expect(data.content).toBeDefined();
    expect(data.site).toBeDefined();
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

it('should place the migrated title block in the legacy block order', async () => {
  const mockContent = {
    '@id': 'http://example.com/',
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
  };
  const mockSite = { '@id': 'http://example.com/' };
  const somersaultMigration = vi.fn(({ value }) => value);
  config.settings.defaultLanguage = 'en';
  config.settings.supportedLanguages = ['en'];
  registerSomersaultBlockMigrations();
  config.registerUtility({
    name: 'testSomersaultMigration',
    type: 'somersaultMigration',
    method: somersaultMigration,
  });
  const request = new Request('http://example.com');
  migrateContent(mockContent as any);
  const context = new RouterContextProvider();
  context.set(ploneClientContext, {} as any);
  context.set(ploneContentContext, mockContent as any);
  context.set(ploneSiteContext, mockSite as any);

  const data = await loader({
    request,
    params: {},
    context,
    unstable_pattern: '/',
    unstable_url: new URL(request.url),
  });

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
  const mockContent = {
    '@id': 'http://example.com/',
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
  };
  const mockSite = { '@id': 'http://example.com/' };
  const somersaultMigration = vi.fn(({ value }) => value);
  config.settings.defaultLanguage = 'en';
  config.settings.supportedLanguages = ['en'];
  registerSomersaultBlockMigrations();
  config.registerUtility({
    name: 'testSomersaultMigration',
    type: 'somersaultMigration',
    method: somersaultMigration,
  });
  const request = new Request('http://example.com');
  migrateContent(mockContent as any);
  const context = new RouterContextProvider();
  context.set(ploneClientContext, {} as any);
  context.set(ploneContentContext, mockContent as any);
  context.set(ploneSiteContext, mockSite as any);
  const data = await loader({
    request,
    params: {},
    context,
    unstable_pattern: '/',
    unstable_url: new URL(request.url),
  });

  expect(somersaultMigration).not.toHaveBeenCalled();
  expect(data.content.blocks.__somersault__).toEqual({
    '@type': '__somersault__',
    value: existingSomersaultValue,
  });
});
