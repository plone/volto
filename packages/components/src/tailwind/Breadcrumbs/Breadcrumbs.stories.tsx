import React from 'react';
import { Breadcrumb, Breadcrumbs } from './Breadcrumbs';
import { FolderIcon, HomeIcon, PageIcon } from '../../components/icons';

import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  component: Breadcrumbs,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Breadcrumbs>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <Breadcrumbs {...args}>
      <Breadcrumb href="/">
        <HomeIcon size="sm" />
        Home
      </Breadcrumb>
      <Breadcrumb href="/folder">Folder</Breadcrumb>
      <Breadcrumb href="/folder/page">Page</Breadcrumb>
    </Breadcrumbs>
  ),
};

export const Slot: Story = {
  render: (args) => (
    <Breadcrumbs {...args}>
      {(item) => (
        <Breadcrumb id={item['@id']} href={item['@id']}>
          {item.title}
        </Breadcrumb>
      )}
    </Breadcrumbs>
  ),
  args: {
    items: [
      { '@id': '/folder', title: 'Folder' },
      { '@id': '/folder/page', title: 'Page' },
    ],
  },
};

export const SlotWithRoot: Story = {
  render: (args) => (
    <Breadcrumbs {...args}>
      {(item) => (
        <Breadcrumb id={item['@id']} href={item['@id']}>
          {item.title}
        </Breadcrumb>
      )}
    </Breadcrumbs>
  ),
  args: {
    root: { '@id': '/', title: 'Home' },
    items: [
      { '@id': '/folder', title: 'Folder' },
      { '@id': '/folder/page', title: 'Page' },
    ],
  },
};

export const SlotWithRootCustomHomeIcon: Story = {
  render: (args) => (
    <Breadcrumbs {...args}>
      {(item) => (
        <Breadcrumb id={item['@id']} href={item['@id']}>
          {item.title}
        </Breadcrumb>
      )}
    </Breadcrumbs>
  ),
  args: {
    root: { '@id': '/', title: 'Home', icon: <FolderIcon size="sm" /> },
    items: [
      { '@id': '/folder', title: 'Folder' },
      { '@id': '/folder/page', title: 'Page' },
    ],
  },
};

export const SlotWithRootWithIcons: Story = {
  render: (args) => (
    <Breadcrumbs {...args}>
      {(item) => (
        <Breadcrumb id={item['@id']} href={item['@id']}>
          {item.title}
        </Breadcrumb>
      )}
    </Breadcrumbs>
  ),
  args: {
    root: { '@id': '/', title: 'Home' },
    items: [
      { '@id': '/folder', title: 'Folder', icon: <FolderIcon size="sm" /> },
      { '@id': '/folder/page', title: 'Page', icon: <PageIcon size="sm" /> },
    ],
  },
};

export const NoRoot: Story = {
  render: Slot.render,
  args: {
    items: [
      { '@id': '/folder', title: 'Folder' },
      { '@id': '/folder/page', title: 'Page' },
    ],
  },
};
