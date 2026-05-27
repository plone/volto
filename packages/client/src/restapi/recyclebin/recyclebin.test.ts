import { describe, expect, it, vi, beforeEach } from 'vitest';
import PloneClient from '../../client';
import { apiRequest } from '../../api';

vi.mock('../../api', () => ({
  apiRequest: vi.fn(),
}));

const apiRequestMock = vi.mocked(apiRequest);

const cli = PloneClient.initialize({
  apiPath: 'http://localhost:55001/plone',
});

describe('Recycle bin client', () => {
  beforeEach(() => {
    apiRequestMock.mockClear();
    apiRequestMock.mockResolvedValue({ status: 200, data: {} } as any);
  });

  it('gets recycle bin items with query parameters', async () => {
    await cli.getRecycleBin({
      query: {
        title: 'old page',
        has_subitems: true,
        sort_on: 'deletion_date',
        sort_order: 'descending',
        b_start: 10,
        b_size: '20',
      },
    });

    expect(apiRequestMock).toHaveBeenCalledWith(
      'get',
      '/@recyclebin',
      expect.objectContaining({
        params: {
          title: 'old page',
          has_subitems: true,
          sort_on: 'deletion_date',
          sort_order: 'descending',
          b_start: 10,
          b_size: '20',
        },
      }),
    );
  });

  it('gets one recycle bin item', async () => {
    await cli.getRecycleBinItem({
      id: 'deleted-folder',
      query: { b_start: 0, b_size: 5 },
    });

    expect(apiRequestMock).toHaveBeenCalledWith(
      'get',
      '/@recyclebin/deleted-folder',
      expect.objectContaining({
        params: { b_start: 0, b_size: 5 },
      }),
    );
  });

  it('restores a recycle bin item', async () => {
    await cli.restoreRecycleBinItem({
      id: 'deleted-folder',
      data: { target_path: 'target-folder', restore_id: 'child-id' },
    });

    expect(apiRequestMock).toHaveBeenCalledWith(
      'post',
      '/@recyclebin/deleted-folder/restore',
      expect.objectContaining({
        data: { target_path: 'target-folder', restore_id: 'child-id' },
      }),
    );
  });

  it('purges a recycle bin item', async () => {
    await cli.purgeRecycleBinItem({ id: 'deleted-folder' });

    expect(apiRequestMock).toHaveBeenCalledWith(
      'delete',
      '/@recyclebin/deleted-folder',
      expect.any(Object),
    );
  });

  it('empties the recycle bin', async () => {
    await cli.emptyRecycleBin();

    expect(apiRequestMock).toHaveBeenCalledWith(
      'delete',
      '/@recyclebin',
      expect.any(Object),
    );
  });

  it('validates ids before making a request', async () => {
    await expect(cli.purgeRecycleBinItem({ id: '' })).rejects.toThrow();

    expect(apiRequestMock).not.toHaveBeenCalled();
  });

  it('validates supported sort values before making a request', async () => {
    await expect(
      cli.getRecycleBin({
        query: { sort_on: 'size' as 'title' },
      }),
    ).rejects.toThrow();

    expect(apiRequestMock).not.toHaveBeenCalled();
  });
});
