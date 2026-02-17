import React from 'react';
import { Breadcrumbs, Breadcrumb, BreadcrumbsSlot } from './Breadcrumbs';
import {
  ChevronrightIcon,
  FolderIcon,
  HomeIcon,
  MoreoptionsIcon,
  PageIcon,
} from '../../components/icons';
import { Menu, MenuItem } from '../Menu/Menu';

import type { Meta, StoryObj } from '@storybook/react-vite';

const meta = {
  title: 'Basic/Breadcrumbs',
  component: Breadcrumbs,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  decorators: [(Story) => <Story />],
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

export const DefaultWithSeparator: Story = {
  render: (args) => (
    <Breadcrumbs {...args}>
      <Breadcrumb href="/" separator={<ChevronrightIcon size="sm" />}>
        <HomeIcon size="sm" />
        Home
      </Breadcrumb>
      <Breadcrumb href="/folder" separator={<ChevronrightIcon size="sm" />}>
        Folder
      </Breadcrumb>
      <Breadcrumb href="/folder/page">Page</Breadcrumb>
    </Breadcrumbs>
  ),
};

export const DefaultUsingCollection: Story = {
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
    root: { '@id': '/', title: 'Home', icon: <HomeIcon size="sm" /> },
    items: [
      { '@id': '/folder', title: 'Folder' },
      { '@id': '/folder/page', title: 'Page' },
    ],
  },
};

export const DefaultUsingCollectionWithSeparator: Story = {
  render: (args) => (
    <Breadcrumbs {...args}>
      {(item) => (
        <Breadcrumb
          id={item['@id']}
          href={item['@id']}
          separator={<ChevronrightIcon size="sm" />}
        >
          {item.title}
        </Breadcrumb>
      )}
    </Breadcrumbs>
  ),
  args: {
    root: { '@id': '/', title: 'Home', icon: <HomeIcon size="sm" /> },
    items: [
      { '@id': '/folder', title: 'Folder' },
      { '@id': '/folder/page', title: 'Page' },
    ],
  },
};

export const NoRoot: Story = {
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

export const SlotWithRootWithIcons: Story = {
  render: (args) => <BreadcrumbsSlot {...args} />,
  args: {
    root: { '@id': '/', title: 'Home', icon: <HomeIcon size="sm" /> },
    items: [
      { '@id': '/folder', title: 'Folder', icon: <FolderIcon size="sm" /> },
      { '@id': '/folder/page', title: 'Page', icon: <PageIcon size="sm" /> },
    ],
  },
};

const longItems = [
  { '@id': '/folder', title: 'Folder' },
  { '@id': '/folder/folderB', title: 'Folder with long name' },
  {
    '@id': '/folder/folderB/folderC',
    title: 'Folder with long name and a bit more',
  },
  {
    '@id': '/folder/folderB/folderC/folderD',
    title: 'Folder with long name even more long',
  },
  {
    '@id': '/folder/folderB/folderC/folderD/folderE',
    title: 'Folder',
  },
  { '@id': '/folder/page', title: 'Page' },
];

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
          <Menu items={inner} button={<MoreoptionsIcon />} placement="bottom">
            {(item) => (
              <MenuItem id={item['@id']} href={item['@id']}>
                {item.title}
              </MenuItem>
            )}
          </Menu>
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

export const LotsOfItemsWithSeparator: Story = {
  render: (args) => {
    const first = longItems ? longItems[0] : null;
    const last = longItems ? longItems[longItems.length - 1] : null;
    const inner = longItems ? longItems.slice(1, longItems.length - 1) : [];

    return (
      <Breadcrumbs {...args}>
        {args.root && (
          <Breadcrumb
            id={args.root['@id']}
            href={args.root['@id']}
            separator={<ChevronrightIcon size="sm" />}
          >
            {args.root.icon}
            {args.root.title}
          </Breadcrumb>
        )}
        <Breadcrumb
          id={first?.['@id']}
          href={first?.['@id']}
          separator={<ChevronrightIcon size="sm" />}
        >
          {first?.title}
        </Breadcrumb>
        <Breadcrumb separator={<ChevronrightIcon size="sm" />}>
          <Menu items={inner} button={<MoreoptionsIcon />} placement="bottom">
            {(item) => (
              <MenuItem id={item['@id']} href={item['@id']}>
                {item.title}
              </MenuItem>
            )}
          </Menu>
        </Breadcrumb>
        <Breadcrumb
          id={last?.['@id']}
          href={last?.['@id']}
          separator={<ChevronrightIcon size="sm" />}
        >
          {last?.title}
        </Breadcrumb>
      </Breadcrumbs>
    );
  },
  args: {
    root: { '@id': '/', title: 'Home', icon: <HomeIcon size="sm" /> },
  },
};
