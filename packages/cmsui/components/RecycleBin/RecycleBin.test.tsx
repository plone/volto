import { fireEvent, render, screen } from '@testing-library/react';
import { createMemoryRouter, RouterProvider } from 'react-router';
import { describe, expect, it, vi } from 'vitest';
import type React from 'react';
import type {
  GetRecycleBinItemResponse,
  GetRecycleBinResponse,
} from '@plone/types';
import { RecycleBinListing } from './RecycleBinListing';
import { RecycleBinItemDetails } from './RecycleBinItemDetails';
import { RecycleBinActiveFilters } from './RecycleBinActiveFilters';

vi.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string, options?: Record<string, unknown>) => {
      if (key === 'cmsui.recyclebin.pagination.range') {
        return `Showing ${options?.start}-${options?.end} of ${options?.total}`;
      }
      if (key === 'cmsui.recyclebin.table.selectItem') {
        return `Select ${options?.title}`;
      }
      if (key === 'cmsui.recyclebin.children.targetPath') {
        return `Target path for ${options?.title}`;
      }
      return key;
    },
    i18n: { language: 'en' },
  }),
}));

const recycleBin: GetRecycleBinResponse = {
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
};

const recycleBinItem: GetRecycleBinItemResponse = {
  ...recycleBin.items[0],
  items_total: 1,
  items: [
    {
      id: 'child-page',
      title: 'Child page',
      '@type': 'Document',
      path: '/Plone/deleted-page/child-page',
      restore_id: 'child-page',
      language: 'en',
      review_state: 'private',
    },
  ],
};

const renderWithRouter = (element: React.ReactNode) => {
  const router = createMemoryRouter([{ path: '*', element }]);
  return render(<RouterProvider router={router} />);
};

describe('RecycleBin components', () => {
  it('renders listing rows and detail links', () => {
    renderWithRouter(
      <RecycleBinListing recycleBin={recycleBin} queryState={{}} />,
    );

    const link = screen.getByRole('link', { name: 'Deleted page' });
    expect(link).toHaveAttribute('href', '/@@recyclebin/deleted-page');
    expect(screen.getByText('/Plone/deleted-page')).toBeInTheDocument();
  });

  it('renders empty state when there are no items', () => {
    renderWithRouter(
      <RecycleBinListing
        recycleBin={{ '@id': '/@recyclebin', items_total: 0, items: [] }}
        queryState={{}}
      />,
    );

    expect(
      screen.getByText('cmsui.recyclebin.empty.noItems'),
    ).toBeInTheDocument();
  });

  it('renders active filters and clear links', () => {
    renderWithRouter(
      <RecycleBinActiveFilters
        queryState={{
          search_query: 'page',
          filter_type: 'Document',
          b_size: '25',
        }}
      />,
    );

    expect(screen.getByText(/page/)).toHaveAttribute(
      'href',
      '/@@recyclebin?filter_type=Document&b_size=25',
    );
    expect(
      screen.getByText('cmsui.recyclebin.filters.clearAll'),
    ).toHaveAttribute('href', '/@@recyclebin');
  });

  it('enables selected-item actions after a selection', () => {
    renderWithRouter(
      <RecycleBinListing recycleBin={recycleBin} queryState={{}} />,
    );

    const restoreButton = screen.getByRole('button', {
      name: 'cmsui.recyclebin.actions.restoreSelected',
    });
    expect(restoreButton).toBeDisabled();

    fireEvent.click(screen.getByLabelText('Select Deleted page'));
    expect(restoreButton).not.toBeDisabled();
  });

  it('renders item metadata', () => {
    renderWithRouter(<RecycleBinItemDetails item={recycleBinItem} />);

    expect(screen.getByText('Deleted page')).toBeInTheDocument();
    expect(screen.getAllByText('/Plone/deleted-page')[0]).toBeInTheDocument();
    expect(screen.getByText('admin')).toBeInTheDocument();
  });

  it('requires a target path for child restore inputs', () => {
    renderWithRouter(<RecycleBinItemDetails item={recycleBinItem} />);

    expect(screen.getByLabelText('Target path for Child page')).toBeRequired();
  });
});
