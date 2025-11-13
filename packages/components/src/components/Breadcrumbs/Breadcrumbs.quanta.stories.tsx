import React from 'react';
import { Breadcrumb, Breadcrumbs } from './Breadcrumbs.quanta';
import { Menu } from '../Menu/Menu.quanta';
import {
  FolderIcon,
  HomeIcon,
  MoreoptionsIcon,
  PageIcon,
} from '../../components/icons';

import type { Meta, StoryObj } from '@storybook/react-vite';

const meta = {
  title: 'Quanta/Breadcrumbs',
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

const longItems = [
  { '@id': '/folder', label: 'Folder' },
  { '@id': '/folder/folderB', label: 'Folder with long name' },
  {
    '@id': '/folder/folderB/folderC',
    label: 'Folder with long name and a bit more',
  },
  {
    '@id': '/folder/folderB/folderC/folderD',
    label: 'Folder with long name even more long',
  },
  {
    '@id': '/folder/folderB/folderC/folderD/folderE',
    label: 'Folder',
  },
  { '@id': '/folder/page', title: 'Page' },
];
// Needs refactoring
export const LotsOfItems: Story = {
  render: (args) => {
    const first = longItems ? longItems[0] : null;
    const last = longItems ? longItems[longItems.length - 1] : null;
    const inner = longItems ? longItems.slice(1, longItems.length - 1) : [];

    return (
      <Breadcrumbs {...args}>
        {args.root && (
          <Breadcrumb id={args.root['@id']} href={args.root['@id']}>
            {args.root.icon}
            {args.root.title}
          </Breadcrumb>
        )}
        <Breadcrumb id={first?.['@id']} href={first?.['@id']}>
          {first?.title}
        </Breadcrumb>
        <Breadcrumb>
          <Menu
            menuItems={inner}
            button={<MoreoptionsIcon />}
            placement="bottom"
          ></Menu>
        </Breadcrumb>
        <Breadcrumb id={last?.['@id']} href={last?.['@id']}>
          {last?.title}
        </Breadcrumb>
      </Breadcrumbs>
    );
  },
  args: {
    root: { '@id': '/', title: 'Home', icon: <HomeIcon size="sm" /> },
  },
};
