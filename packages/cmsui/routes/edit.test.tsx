import { expect, describe, it, vi, afterEach } from 'vitest';
import config from '@plone/registry';
import { loader, action } from './edit';
import { RouterContextProvider } from 'react-router';
import {
  ploneClientContext,
  ploneContentContext,
} from 'seven/app/middleware.server';

vi.mock('@plone/react-router', () => ({
  requireAuthCookie: vi.fn().mockResolvedValue('fake-token'),
}));

const mockSchema = {
  title: 'Page',
  fieldsets: [
    { id: 'default', title: 'Default', fields: ['title', 'description'] },
  ],
  properties: {
    title: { title: 'Title', type: 'string' },
    description: { title: 'Description', type: 'string' },
  },
  required: ['title'],
};

const mockContent = {
  '@id': 'http://example.com/++api++/my-page',
  '@type': 'Document',
  title: 'My Page',
  description: 'A test page',
  blocks: {},
  blocks_layout: { items: [] },
};

describe('Edit route', () => {
  afterEach(() => {
    vi.restoreAllMocks();
    config.settings = {};
  });

  describe('loader', () => {
    it('should call getType with the content @type', async () => {
      const getTypeMock = vi.fn().mockResolvedValue({ data: mockSchema });
      config.settings.apiPath = 'http://example.com';
      const context = new RouterContextProvider();
      context.set(ploneClientContext, { getType: getTypeMock } as any);
      context.set(ploneContentContext, mockContent as any);

      const request = new Request('http://example.com/my-page/edit');

      await loader({
        request,
        params: { '*': 'my-page' },
        context,
        unstable_pattern: '/my-page/edit',
        unstable_url: new URL(request.url),
      });

      expect(getTypeMock).toHaveBeenCalledWith({ type: 'Document' });
    });

    it('should return content and schema from loader data', async () => {
      const getTypeMock = vi.fn().mockResolvedValue({ data: mockSchema });
      config.settings.apiPath = 'http://example.com';
      const context = new RouterContextProvider();
      context.set(ploneClientContext, { getType: getTypeMock } as any);
      context.set(ploneContentContext, mockContent as any);

      const request = new Request('http://example.com/my-page/edit');

      const result = await loader({
        request,
        params: { '*': 'my-page' },
        context,
        unstable_pattern: '/my-page/edit',
        unstable_url: new URL(request.url),
      });

      const resultData = (result as any).data;
      expect(resultData.schema).toEqual(mockSchema);
      // flattenToAppURL strips the API path prefix from @id
      expect(resultData.content['@id']).toBe('/++api++/my-page');
      expect(resultData.content.title).toBe('My Page');
    });
  });

  describe('action', () => {
    it('should call updateContent with the correct path and body', async () => {
      const updateContentMock = vi.fn().mockResolvedValue({});
      config.settings.apiPath = 'http://example.com';
      const context = new RouterContextProvider();
      context.set(ploneClientContext, {
        updateContent: updateContentMock,
      } as any);

      const body = { title: 'Updated Title' };
      const request = new Request('http://example.com/my-page/edit', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });

      await action({
        request,
        params: { '*': 'my-page' },
        context,
        unstable_pattern: '/my-page/edit',
        unstable_url: new URL(request.url),
      });

      expect(updateContentMock).toHaveBeenCalledWith({
        path: '/my-page',
        data: body,
      });
    });

    it('should redirect back to the same path', async () => {
      const updateContentMock = vi.fn().mockResolvedValue({});
      config.settings.apiPath = 'http://example.com';
      const context = new RouterContextProvider();
      context.set(ploneClientContext, {
        updateContent: updateContentMock,
      } as any);

      const request = new Request('http://example.com/my-page/edit', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title: 'Updated' }),
      });

      const result = await action({
        request,
        params: { '*': 'my-page' },
        context,
        unstable_pattern: '/my-page/edit',
        unstable_url: new URL(request.url),
      });

      expect((result as Response).status).toBe(302);
      expect((result as Response).headers.get('Location')).toBe('/my-page');
    });

    it('should handle root path', async () => {
      const updateContentMock = vi.fn().mockResolvedValue({});
      config.settings.apiPath = 'http://example.com';
      const context = new RouterContextProvider();
      context.set(ploneClientContext, {
        updateContent: updateContentMock,
      } as any);

      const request = new Request('http://example.com/edit', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title: 'Updated' }),
      });

      const result = await action({
        request,
        params: {},
        context,
        unstable_pattern: '/edit',
        unstable_url: new URL(request.url),
      });

      expect((result as Response).status).toBe(302);
      expect((result as Response).headers.get('Location')).toBe('/');
    });
  });

  describe('Edit component', () => {
    it('should render ContentForm with correct props', async () => {
      // Reset module registry so doMock takes effect on fresh imports
      vi.resetModules();

      vi.doMock('@plone/react-router', () => ({
        requireAuthCookie: vi.fn().mockResolvedValue('fake-token'),
      }));

      vi.doMock('react-router', async (importOriginal) => {
        const actual = (await importOriginal()) as any;
        return {
          ...actual,
          useLoaderData: () => ({
            content: mockContent,
            schema: mockSchema,
          }),
        };
      });

      vi.doMock('../components/ContentForm/ContentForm', () => ({
        default: (props: any) => (
          <div
            data-testid="content-form"
            data-submit-method={props.submitMethod}
            data-content-type={props.content['@type']}
            data-content-title={props.content.title}
          >
            {props.heading}
          </div>
        ),
      }));

      // Dynamic imports to pick up the mocks
      const { render, screen } = await import('@testing-library/react');
      const { default: EditMocked } = await import('./edit');

      render(<EditMocked />);

      const form = screen.getByTestId('content-form');
      expect(form).toHaveAttribute('data-submit-method', 'patch');
      expect(form).toHaveAttribute('data-content-type', 'Document');
      expect(form).toHaveAttribute('data-content-title', 'My Page');
      expect(form.textContent).toContain('My Page');
    });
  });
});
