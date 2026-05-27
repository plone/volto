import { describe, expect, it, vi, afterEach } from 'vitest';
import { RouterContextProvider } from 'react-router';
import { ploneClientContext } from 'seven/app/middleware.server';
import { action, loader } from './recyclebin-item';

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
    params: { id: 'deleted-item' },
    context,
    unstable_pattern: '/@@recyclebin/:id',
    unstable_url: new URL(request.url),
  });
};

const callAction = (request: Request, cli: Record<string, unknown>) => {
  const context = new RouterContextProvider();
  context.set(ploneClientContext, cli as any);
  return action({
    request,
    params: { id: 'deleted-item' },
    context,
    unstable_pattern: '/@@recyclebin/:id',
    unstable_url: new URL(request.url),
  });
};

describe('recycle bin item route', () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('loads one recycle bin item with batching params', async () => {
    const getRecycleBinItem = vi.fn().mockResolvedValue({
      data: {
        '@id': '/@recyclebin/deleted-item',
        '@type': 'Document',
        id: 'deleted-item',
        title: 'Deleted item',
        path: '/Plone/deleted-item',
        parent_path: '/Plone',
        deletion_date: '2026-05-20T10:30:00+00:00',
        recycle_id: 'deleted-item',
        deleted_by: 'admin',
        language: 'en',
        review_state: 'private',
        has_children: false,
        actions: {
          restore: '/@recyclebin/deleted-item/restore',
          purge: '/@recyclebin/deleted-item',
        },
        items_total: 0,
        items: [],
      },
    });

    await callLoader(
      new Request(
        'http://example.com/@@recyclebin/deleted-item?b_start=5&b_size=10',
      ),
      { getRecycleBinItem },
    );

    expect(getRecycleBinItem).toHaveBeenCalledWith({
      id: 'deleted-item',
      query: { b_start: '5', b_size: '10' },
    });
  });

  it('strips the portal base path from item and child paths', async () => {
    const getRecycleBinItem = vi.fn().mockResolvedValue({
      data: {
        '@id': '/@recyclebin/deleted-item',
        '@type': 'Document',
        id: 'deleted-item',
        title: 'Deleted item',
        path: '/Plone/deleted-item',
        parent_path: '/Plone',
        deletion_date: '2026-05-20T10:30:00+00:00',
        recycle_id: 'deleted-item',
        deleted_by: 'admin',
        language: 'en',
        review_state: 'private',
        has_children: true,
        actions: {
          restore: '/@recyclebin/deleted-item/restore',
          purge: '/@recyclebin/deleted-item',
        },
        items_total: 1,
        items: [
          {
            id: 'child',
            title: 'Child',
            '@type': 'Document',
            path: '/Plone/deleted-item/child',
            restore_id: 'child',
            language: 'en',
            review_state: 'private',
          },
        ],
      },
    });

    const result = await callLoader(
      new Request('http://example.com/@@recyclebin/deleted-item'),
      { getRecycleBinItem },
    );
    const body = (result as any).data;

    expect(body.item.path).toBe('/deleted-item');
    expect(body.item.parent_path).toBe('/');
    expect(body.item.items[0].path).toBe('/deleted-item/child');
  });

  it('restores the item with an optional target path', async () => {
    const restoreRecycleBinItem = vi.fn().mockResolvedValue({
      data: { restored_item: { '@id': '/restored-item' } },
    });
    const formData = new FormData();
    formData.append('_action', 'restore');
    formData.append('target_path', 'target-folder');

    await callAction(
      new Request('http://example.com/@@recyclebin/deleted-item', {
        method: 'POST',
        body: formData,
      }),
      { restoreRecycleBinItem },
    );

    expect(restoreRecycleBinItem).toHaveBeenCalledWith({
      id: 'deleted-item',
      data: { target_path: 'target-folder' },
    });
  });

  it('purges the item', async () => {
    const purgeRecycleBinItem = vi.fn().mockResolvedValue({});
    const formData = new FormData();
    formData.append('_action', 'purge');

    await callAction(
      new Request('http://example.com/@@recyclebin/deleted-item', {
        method: 'POST',
        body: formData,
      }),
      { purgeRecycleBinItem },
    );

    expect(purgeRecycleBinItem).toHaveBeenCalledWith({ id: 'deleted-item' });
  });

  it('requires target_path for child restore', async () => {
    const restoreRecycleBinItem = vi.fn();
    const formData = new FormData();
    formData.append('_action', 'restore-child');
    formData.append('restore_id', 'child-id');

    const result = await callAction(
      new Request('http://example.com/@@recyclebin/deleted-item', {
        method: 'POST',
        body: formData,
      }),
      { restoreRecycleBinItem },
    );

    expect((result as any).init.status).toBe(400);
    expect(restoreRecycleBinItem).not.toHaveBeenCalled();
  });

  it('passes restore_id and target_path for child restore', async () => {
    const restoreRecycleBinItem = vi.fn().mockResolvedValue({});
    const formData = new FormData();
    formData.append('_action', 'restore-child');
    formData.append('restore_id', 'child-id');
    formData.append('target_path', 'target-folder');

    await callAction(
      new Request('http://example.com/@@recyclebin/deleted-item', {
        method: 'POST',
        body: formData,
      }),
      { restoreRecycleBinItem },
    );

    expect(restoreRecycleBinItem).toHaveBeenCalledWith({
      id: 'deleted-item',
      data: { restore_id: 'child-id', target_path: 'target-folder' },
    });
  });
});
