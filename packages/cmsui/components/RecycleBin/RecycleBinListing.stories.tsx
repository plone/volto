import type { Meta, StoryObj } from '@storybook/react-vite';
import { createMemoryRouter, RouterProvider } from 'react-router';
import type React from 'react';
import type { GetRecycleBinResponse } from '@plone/types';
import { RecycleBinListing } from './RecycleBinListing';

const items: GetRecycleBinResponse['items'] = [
  {
    '@id': '/@recyclebin/document-1',
    '@type': 'Document',
    id: 'document-1',
    title: 'Retired page',
    path: '/Plone/retired-page',
    parent_path: '/Plone',
    deletion_date: '2026-05-20T10:30:00+00:00',
    recycle_id: 'document-1',
    deleted_by: 'admin',
    language: 'en',
    review_state: 'private',
    has_children: false,
    actions: {
      restore: '/@recyclebin/document-1/restore',
      purge: '/@recyclebin/document-1',
    },
  },
  {
    '@id': '/@recyclebin/folder-1',
    '@type': 'Folder',
    id: 'folder-1',
    title: 'Archived section',
    path: '/Plone/archived-section',
    parent_path: '/Plone',
    deletion_date: '2026-05-18T08:15:00+00:00',
    recycle_id: 'folder-1',
    deleted_by: 'editor',
    language: 'en',
    review_state: 'published',
    has_children: true,
    actions: {
      restore: '/@recyclebin/folder-1/restore',
      purge: '/@recyclebin/folder-1',
    },
  },
];

const renderWithRouter = (
  args: React.ComponentProps<typeof RecycleBinListing>,
) => {
  const router = createMemoryRouter([
    {
      path: '*',
      element: <RecycleBinListing {...args} />,
    },
  ]);
  return <RouterProvider router={router} />;
};

const meta = {
  title: 'CMS UI/RecycleBin/Listing',
  component: RecycleBinListing,
} satisfies Meta<typeof RecycleBinListing>;

export default meta;

type Story = StoryObj<typeof meta>;

export const WithItems: Story = {
  args: {
    recycleBin: {
      '@id': '/@recyclebin',
      items_total: items.length,
      items,
    } as GetRecycleBinResponse,
    queryState: {},
  },
  render: (args) => renderWithRouter(args),
};

export const Empty: Story = {
  args: {
    recycleBin: {
      '@id': '/@recyclebin',
      items_total: 0,
      items: [],
    },
    queryState: {},
  },
  render: (args) => renderWithRouter(args),
};
