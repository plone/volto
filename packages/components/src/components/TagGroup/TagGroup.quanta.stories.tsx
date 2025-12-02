import type { Meta, StoryObj } from '@storybook/react-vite';
import React from 'react';
import type { Key } from 'react-aria-components';
import { useListData } from 'react-stately';
import { Tag, TagGroup } from './TagGroup.quanta';

type Flavor = {
  id: string;
  name: string;
  description?: string;
  color?: 'gray' | 'green' | 'yellow' | 'blue';
};

const flavors: Flavor[] = [
  { id: 'chocolate', name: 'Chocolate' },
  { id: 'mint', name: 'Mint' },
  { id: 'strawberry', name: 'Strawberry' },
  { id: 'vanilla', name: 'Vanilla' },
];

const seasonalFlavors: Flavor[] = [
  { id: 'matcha', name: 'Matcha', color: 'green' },
  { id: 'salted-caramel', name: 'Salted Caramel', color: 'yellow' },
  { id: 'blueberry', name: 'Blueberry Swirl', color: 'blue' },
  { id: 'cookies-cream', name: 'Cookies & Cream', color: 'gray' },
];

const meta = {
  title: 'Quanta/TagGroup',
  component: TagGroup,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    children: { control: false },
    items: { control: false },
    renderEmptyState: { control: false },
    onRemove: { action: 'removed' },
    onSelectionChange: { action: 'selection-change' },
    color: {
      control: {
        type: 'select',
        options: ['gray', 'green', 'yellow', 'blue'],
      },
    },
  },
  args: {
    label: 'Ice cream flavors',
    description: 'Select one or more flavors to feature.',
    selectionMode: 'multiple',
  },
} satisfies Meta<typeof TagGroup>;

export default meta;
type Story = StoryObj<typeof meta>;

export const StaticChildren: Story = {
  render: (args) => (
    <div className="w-full max-w-sm">
      <TagGroup {...args}>
        <Tag id="chocolate">Chocolate</Tag>
        <Tag id="mint">Mint</Tag>
        <Tag id="strawberry">Strawberry</Tag>
        <Tag id="vanilla">Vanilla</Tag>
      </TagGroup>
    </div>
  ),
};

export const ItemsCollection: Story = {
  render: (args) => (
    <div className="w-full max-w-sm">
      <TagGroup {...args} items={flavors}>
        {(item) => (
          <Tag id={item.id} key={item.id}>
            {item.name}
          </Tag>
        )}
      </TagGroup>
    </div>
  ),
};

export const RemovableTags: Story = {
  args: {
    allowsRemoving: true,
    renderEmptyState: () => (
      <span className="text-sm text-quanta-pigeon">No flavors left</span>
    ),
  },
  render: (args) => {
    const list = useListData({
      initialItems: flavors,
    });

    const handleRemove = (keys: Set<Key>) => {
      const keysToRemove = Array.from(keys) as string[];
      list.remove(...keysToRemove);
      args.onRemove?.(keys);
    };

    return (
      <div className="w-full max-w-sm">
        <TagGroup
          {...args}
          items={list.items}
          onRemove={handleRemove}
          selectionMode="multiple"
        >
          {(item) => (
            <Tag id={item.id} key={item.id}>
              {item.name}
            </Tag>
          )}
        </TagGroup>
      </div>
    );
  },
};

export const ColoredVariants: Story = {
  args: {
    selectionMode: 'none',
  },
  render: (args) => (
    <div className="w-full max-w-sm">
      <TagGroup {...args} items={seasonalFlavors}>
        {(item) => (
          <Tag id={item.id} key={item.id} color={item.color}>
            {item.name}
          </Tag>
        )}
      </TagGroup>
    </div>
  ),
};

export const WithErrorMessage: Story = {
  args: {
    errorMessage: 'Please select at least one flavor.',
  },
  render: (args) => (
    <div className="w-full max-w-sm">
      <TagGroup {...args} items={flavors}>
        {(item) => (
          <Tag id={item.id} key={item.id}>
            {item.name}
          </Tag>
        )}
      </TagGroup>
    </div>
  ),
};
