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

describe('loader', () => {
  afterEach(() => {
    vi.restoreAllMocks();
    config.settings = {};
  });

  it('should return content and site from context', async () => {
    config.settings.defaultLanguage = 'en';
    config.settings.supportedLanguages = ['en'];
    const mockContent = {
      data: { '@id': 'http://example.com/', title: 'Home' },
    };
    const mockSite = { data: { '@id': 'http://example.com/' } };
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
    });

    expect(data.locale).toBe('en');
    expect(data.content).toBeDefined();
    expect(data.site).toBeDefined();
  });

  it('should return content for a non-root path', async () => {
    config.settings.defaultLanguage = 'en';
    config.settings.supportedLanguages = ['en'];
    const mockContent = {
      data: { '@id': 'http://example.com/test-content', title: 'Test' },
    };
    const mockSite = { data: { '@id': 'http://example.com/' } };
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
