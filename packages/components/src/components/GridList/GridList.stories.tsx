import React from 'react';
import { GridList, GridListItem } from './GridList';

import type { Meta, StoryObj } from '@storybook/react';

import '../../styles/basic/GridList.css';

const meta = {
  component: GridList,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof GridList>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args: any) => (
    <GridList aria-label="Ice cream flavors" {...args}>
      <GridListItem>Chocolate</GridListItem>
      <GridListItem>Mint</GridListItem>
      <GridListItem>Strawberry</GridListItem>
      <GridListItem>Vanilla</GridListItem>
    </GridList>
  ),
  args: {
    onAction: null,
    selectionMode: 'multiple',
  },
};
