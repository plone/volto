import React from 'react';
import { ListBox, ListBoxItem } from './ListBox';

import type { Meta, StoryObj } from '@storybook/react';

import '../../styles/basic/ListBox.css';

const meta = {
  component: ListBox,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof ListBox>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args: any) => (
    <ListBox aria-label="Ice cream flavor" {...args}>
      <ListBoxItem>Chocolate</ListBoxItem>
      <ListBoxItem>Mint</ListBoxItem>
      <ListBoxItem>Strawberry</ListBoxItem>
      <ListBoxItem>Vanilla</ListBoxItem>
    </ListBox>
  ),
  args: {
    onAction: null,
    selectionMode: 'single',
  },
};
