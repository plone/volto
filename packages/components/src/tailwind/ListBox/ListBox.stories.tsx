import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { ListBox, ListBoxItem } from './ListBox';
import { Text } from 'react-aria-components';

const meta = {
  title: 'Tailwind/ListBox',
  component: ListBox,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof ListBox>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Example: Story = {
  render: (args: any) => (
    <ListBox aria-label="Ice cream flavor" {...args}>
      <ListBoxItem id="chocolate">Chocolate</ListBoxItem>
      <ListBoxItem id="mint">Mint</ListBoxItem>
      <ListBoxItem id="strawberry">Strawberry</ListBoxItem>
      <ListBoxItem id="vanilla">Vanilla</ListBoxItem>
    </ListBox>
  ),
  args: {
    onAction: null,
    selectionMode: 'multiple',
    selectionBehavior: 'replace',
  },
};

export const Detailed: Story = {
  ...Example,
  render: (args: any) => (
    <ListBox aria-label="Ice cream flavor" {...args}>
      <ListBoxItem textValue="Read">
        <Text className="font-bold" slot="label">
          Read
        </Text>
        <Text slot="description">Read only</Text>
      </ListBoxItem>
      <ListBoxItem textValue="Write">
        <Text className="font-bold" slot="label">
          Write
        </Text>
        <Text slot="description">Read and write only</Text>
      </ListBoxItem>
      <ListBoxItem textValue="Admin">
        <Text className="font-bold" slot="label">
          Admin
        </Text>
        <Text slot="description">Full access</Text>
      </ListBoxItem>
    </ListBox>
  ),
};

export const DisabledItems: Story = {
  ...Example,
  args: {
    ...Example.args,
    disabledKeys: ['mint'],
  },
};
