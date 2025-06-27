import React from 'react';
import { Tag, TagGroup } from './TagGroup';

import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  title: 'Basic/TagGroup',
  component: TagGroup,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof TagGroup>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args: any) => (
    <TagGroup {...args}>
      <Tag>Chocolate</Tag>
      <Tag>Mint</Tag>
      <Tag>Strawberry</Tag>
      <Tag>Vanilla</Tag>
    </TagGroup>
  ),
  args: {
    label: 'Ice cream flavor',
    selectionMode: 'single',
  },
};

const items = [
  { id: 'Chocolate', name: 'Chocolate' },
  { id: 'Mint', name: 'Mint' },
  { id: 'Strawberry', name: 'Strawberry' },
  { id: 'Vanilla', name: 'Vanilla' },
];
export const ItemsAsList: Story = {
  render: (args: any) => (
    <TagGroup {...args} items={items}>
      {(item: (typeof items)[number]) => <Tag key={item.id}>{item.name}</Tag>}
    </TagGroup>
  ),
  args: {
    label: 'Ice cream flavor',
    selectionMode: 'single',
  },
};
