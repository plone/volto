import { describe, expect, it, vi, afterEach } from 'vitest';
import { RouterContextProvider } from 'react-router';
import { ploneClientContext } from 'seven/app/middleware.server';
import { action, loader } from './recyclebin';

vi.mock('@plone/react-router', () => ({
  requireAuthCookie: vi.fn().mockResolvedValue('fake-token'),
}));

vi.mock('seven/app/middleware.server', () => ({
  ploneClientContext: {},
}));

const callLoader = (request: Request, cli: Record<string, unknown>) => {
  const context = new RouterContextProvider();
  context.set(ploneClientContext, {
    config: { apiPath: 'http://example.com/Plone' },
    ...cli,
  } as any);
  return loader({
    request,
    params: {},
    context,
    unstable_pattern: '/@@recyclebin',
    unstable_url: new URL(request.url),
  });
};

const callAction = (request: Request, cli: Record<string, unknown>) => {
  const context = new RouterContextProvider();
  context.set(ploneClientContext, cli as any);
  return action({
    request,
    params: {},
    context,
    unstable_pattern: '/@@recyclebin',
    unstable_url: new URL(request.url),
  });
};

describe('recycle bin route', () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('maps listing query params to getRecycleBin query', async () => {
    const getRecycleBin = vi.fn().mockResolvedValue({
      data: { '@id': '/@recyclebin', items_total: 0, items: [] },
    });

    await callLoader(
      new Request(
        'http://example.com/@@recyclebin?title=page&portal_type=Document&deleted_by=admin&language=en&review_state=private&date_from=2026-01-01&date_to=2026-02-01&b_start=10&b_size=25',
      ),
      { getRecycleBin },
    );

    expect(getRecycleBin).toHaveBeenCalledWith({
      query: {
        title: 'page',
        portal_type: 'Document',
        deleted_by: 'admin',
        language: 'en',
        review_state: 'private',
        date_from: '2026-01-01',
        date_to: '2026-02-01',
        b_start: '10',
        b_size: '25',
        sort_on: 'deletion_date',
        sort_order: 'descending',
      },
    });
  });

  it('strips the portal base path from response paths', async () => {
    const getRecycleBin = vi.fn().mockResolvedValue({
      data: {
        '@id': '/@recyclebin',
        items_total: 1,
        items: [
          {
            '@id': '/@recyclebin/deleted-page',
            '@type': 'Document',
            id: 'deleted-page',
            title: 'Deleted page',
            path: '/Plone/deleted-page',
            parent_path: '/Plone',
            deletion_date: '2026-05-20T10:30:00+00:00',
            recycle_id: 'deleted-page',
            deleted_by: 'admin',
            language: 'en',
            review_state: 'private',
            has_children: false,
            actions: {
              restore: '/@recyclebin/deleted-page/restore',
              purge: '/@recyclebin/deleted-page',
            },
          },
        ],
      },
    });

    const result = await callLoader(
      new Request('http://example.com/@@recyclebin'),
      { getRecycleBin },
    );
    const body = (result as any).data;

    expect(body.recycleBin.items[0].path).toBe('/deleted-page');
    expect(body.recycleBin.items[0].parent_path).toBe('/');
  });

  it.each([
    ['true', true],
    ['false', false],
  ])('maps has_subitems=%s', async (value, expected) => {
    const getRecycleBin = vi.fn().mockResolvedValue({
      data: { '@id': '/@recyclebin', items_total: 0, items: [] },
    });

    await callLoader(
      new Request(`http://example.com/@@recyclebin?has_subitems=${value}`),
      { getRecycleBin },
    );

    expect(getRecycleBin).toHaveBeenCalledWith({
      query: expect.objectContaining({ has_subitems: expected }),
    });
  });

  it.each([
    ['date_desc', 'deletion_date', 'descending'],
    ['date_asc', 'deletion_date', 'ascending'],
    ['title_asc', 'title', 'ascending'],
    ['title_desc', 'title', 'descending'],
    ['type_asc', 'portal_type', 'ascending'],
    ['type_desc', 'portal_type', 'descending'],
    ['workflow_asc', 'review_state', 'ascending'],
    ['workflow_desc', 'review_state', 'descending'],
  ])('maps sort_by=%s', async (sortBy, sortOn, sortOrder) => {
    const getRecycleBin = vi.fn().mockResolvedValue({
      data: { '@id': '/@recyclebin', items_total: 0, items: [] },
    });

    await callLoader(
      new Request(`http://example.com/@@recyclebin?sort_by=${sortBy}`),
      { getRecycleBin },
    );

    expect(getRecycleBin).toHaveBeenCalledWith({
      query: expect.objectContaining({
        sort_on: sortOn,
        sort_order: sortOrder,
      }),
    });
  });

  it('restores selected items', async () => {
    const restoreRecycleBinItem = vi.fn().mockResolvedValue({});
    const formData = new FormData();
    formData.append('_action', 'restore-selected');
    formData.append('selected_items', 'one');
    formData.append('selected_items', 'two');

    await callAction(
      new Request('http://example.com/@@recyclebin', {
        method: 'POST',
        body: formData,
      }),
      { restoreRecycleBinItem },
    );

    expect(restoreRecycleBinItem).toHaveBeenCalledWith({
      id: 'one',
      data: {},
    });
    expect(restoreRecycleBinItem).toHaveBeenCalledWith({
      id: 'two',
      data: {},
    });
  });

  it('purges selected items', async () => {
    const purgeRecycleBinItem = vi.fn().mockResolvedValue({});
    const formData = new FormData();
    formData.append('_action', 'purge-selected');
    formData.append('selected_items', 'one');

    await callAction(
      new Request('http://example.com/@@recyclebin', {
        method: 'POST',
        body: formData,
      }),
      { purgeRecycleBinItem },
    );

    expect(purgeRecycleBinItem).toHaveBeenCalledWith({ id: 'one' });
  });

  it('empties the recycle bin', async () => {
    const emptyRecycleBin = vi.fn().mockResolvedValue({});
    const formData = new FormData();
    formData.append('_action', 'empty');

    await callAction(
      new Request('http://example.com/@@recyclebin', {
        method: 'POST',
        body: formData,
      }),
      { emptyRecycleBin },
    );

    expect(emptyRecycleBin).toHaveBeenCalled();
  });
});
