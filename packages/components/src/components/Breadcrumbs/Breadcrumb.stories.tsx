import React from 'react';
import { Breadcrumbs, Breadcrumb, BreadcrumbsSlot } from './Breadcrumbs';
import {
  ChevronrightIcon,
  FolderIcon,
  HomeIcon,
  PageIcon,
} from '../../components/icons';

import type { Meta, StoryObj } from '@storybook/react';

import '../../styles/basic/Breadcrumbs.css';

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

export const LotsOfItems: Story = {
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
    ],
  },
};
