import type { Meta, StoryObj } from '@storybook/react-vite';
import { createMemoryRouter, RouterProvider } from 'react-router';
import type { GetRecycleBinItemResponse } from '@plone/types';
import { RecycleBinItemDetails } from './RecycleBinItemDetails';

const item: GetRecycleBinItemResponse = {
  '@id': '/@recyclebin/folder-1',
  '@type': 'Folder',
  id: 'folder-1',
  title: 'Archived section',
  path: '/Plone/archived-section',
  parent_path: '/Plone',
  deletion_date: '2026-05-18T08:15:00+00:00',
  recycle_id: 'folder-1',
  deleted_by: 'admin',
  language: 'en',
  review_state: 'private',
  has_children: true,
  actions: {
    restore: '/@recyclebin/folder-1/restore',
    purge: '/@recyclebin/folder-1',
  },
  items_total: 2,
  items: [
    {
      id: 'child-page',
      title: 'Child page',
      '@type': 'Document',
      path: '/Plone/archived-section/child-page',
      restore_id: 'child-page',
      language: 'en',
      review_state: 'private',
    },
    {
      id: 'child-folder',
      title: 'Child folder',
      '@type': 'Folder',
      path: '/Plone/archived-section/child-folder',
      restore_id: 'child-folder',
      language: 'en',
      review_state: 'published',
      children_count: 3,
    },
  ],
};

const meta = {
  title: 'CMS UI/RecycleBin/ItemDetails',
  component: RecycleBinItemDetails,
} satisfies Meta<typeof RecycleBinItemDetails>;

export default meta;

type Story = StoryObj<typeof meta>;

export const FolderWithChildren: Story = {
  args: {
    item,
  },
  render: (args) => {
    const router = createMemoryRouter([
      {
        path: '*',
        element: <RecycleBinItemDetails {...args} />,
      },
    ]);
    return <RouterProvider router={router} />;
  },
};
