import { expect, describe, it, vi, afterEach } from 'vitest';
import config from '@plone/registry';
import { loader, action } from './add';
import { RouterContextProvider } from 'react-router';
import { ploneClientContext } from 'seven/app/middleware.server';

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

describe('Add route', () => {
  afterEach(() => {
    vi.restoreAllMocks();
    config.settings = {};
  });

  describe('loader', () => {
    it('should call getType with the type query parameter', async () => {
      const getTypeMock = vi.fn().mockResolvedValue({ data: mockSchema });
      config.settings.apiPath = 'http://example.com';
      const context = new RouterContextProvider();
      context.set(ploneClientContext, { getType: getTypeMock } as any);

      const request = new Request(
        'http://example.com/my-folder/add?type=Document',
      );

      await loader({
        request,
        params: { '*': 'my-folder' },
        context,
        unstable_pattern: '/my-folder/add',
        unstable_url: new URL(request.url),
      });

      expect(getTypeMock).toHaveBeenCalledWith({ type: 'Document' });
    });

    it('should return schema and type from loader data', async () => {
      const getTypeMock = vi.fn().mockResolvedValue({ data: mockSchema });
      config.settings.apiPath = 'http://example.com';
      const context = new RouterContextProvider();
      context.set(ploneClientContext, { getType: getTypeMock } as any);

      const request = new Request(
        'http://example.com/my-folder/add?type=Document',
      );

      const result = await loader({
        request,
        params: { '*': 'my-folder' },
        context,
        unstable_pattern: '/my-folder/add',
        unstable_url: new URL(request.url),
      });

      expect((result as any).data).toEqual({
        schema: mockSchema,
        type: 'Document',
      });
    });

    it('should throw redirect when type query param is missing', async () => {
      config.settings.apiPath = 'http://example.com';
      const context = new RouterContextProvider();
      context.set(ploneClientContext, {} as any);

      const request = new Request('http://example.com/my-folder/add');

      await expect(
        loader({
          request,
          params: { '*': 'my-folder' },
          context,
          unstable_pattern: '/my-folder/add',
          unstable_url: new URL(request.url),
        }),
      ).rejects.toEqual(
        expect.objectContaining({
          status: 302,
          headers: expect.objectContaining(
            new Headers({ Location: '/my-folder' }),
          ),
        }),
      );
    });

    it('should derive path from empty params as root', async () => {
      const getTypeMock = vi.fn().mockResolvedValue({ data: mockSchema });
      config.settings.apiPath = 'http://example.com';
      const context = new RouterContextProvider();
      context.set(ploneClientContext, { getType: getTypeMock } as any);

      const request = new Request('http://example.com/add?type=Document');

      // Should not throw; loader succeeds with empty params
      const result = await loader({
        request,
        params: {},
        context,
        unstable_pattern: '/add',
        unstable_url: new URL(request.url),
      });

      expect((result as any).data.type).toBe('Document');
    });
  });

  describe('action', () => {
    it('should call createContent with the correct path and body', async () => {
      const createContentMock = vi.fn().mockResolvedValue({
        data: { id: 'new-page' },
      });
      config.settings.apiPath = 'http://example.com';
      const context = new RouterContextProvider();
      context.set(ploneClientContext, {
        createContent: createContentMock,
      } as any);

      const body = { '@type': 'Document', title: 'New Page' };
      const request = new Request('http://example.com/my-folder/add', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });

      await action({
        request,
        params: { '*': 'my-folder' },
        context,
        unstable_pattern: '/my-folder/add',
        unstable_url: new URL(request.url),
      });

      expect(createContentMock).toHaveBeenCalledWith({
        path: '/my-folder',
        data: body,
      });
    });

    it('should redirect to the new content URL for non-root path', async () => {
      const createContentMock = vi.fn().mockResolvedValue({
        data: { id: 'new-page' },
      });
      config.settings.apiPath = 'http://example.com';
      const context = new RouterContextProvider();
      context.set(ploneClientContext, {
        createContent: createContentMock,
      } as any);

      const request = new Request('http://example.com/my-folder/add', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ '@type': 'Document', title: 'New Page' }),
      });

      const result = await action({
        request,
        params: { '*': 'my-folder' },
        context,
        unstable_pattern: '/my-folder/add',
        unstable_url: new URL(request.url),
      });

      expect((result as Response).status).toBe(302);
      expect((result as Response).headers.get('Location')).toBe(
        '/my-folder/new-page',
      );
    });

    it('should redirect correctly for root path', async () => {
      const createContentMock = vi.fn().mockResolvedValue({
        data: { id: 'new-page' },
      });
      config.settings.apiPath = 'http://example.com';
      const context = new RouterContextProvider();
      context.set(ploneClientContext, {
        createContent: createContentMock,
      } as any);

      const request = new Request('http://example.com/add', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ '@type': 'Document', title: 'New Page' }),
      });

      const result = await action({
        request,
        params: {},
        context,
        unstable_pattern: '/add',
        unstable_url: new URL(request.url),
      });

      expect((result as Response).status).toBe(302);
      expect((result as Response).headers.get('Location')).toBe('/new-page');
    });
  });

  describe('Add component', () => {
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
            schema: mockSchema,
            type: 'Document',
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
      const { default: AddMocked } = await import('./add');

      render(<AddMocked />);

      const form = screen.getByTestId('content-form');
      expect(form).toHaveAttribute('data-submit-method', 'post');
      expect(form).toHaveAttribute('data-content-type', 'Document');
      expect(form).toHaveAttribute('data-content-title', '');
      expect(form.textContent).toContain('Document');
      expect(form.textContent).toContain('Page');
    });
  });
});
