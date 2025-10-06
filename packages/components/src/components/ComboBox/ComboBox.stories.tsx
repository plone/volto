import React from 'react';
import { ComboBox, ComboBoxItem } from './ComboBox';

import type { Meta, StoryObj } from '@storybook/react-vite';

const meta = {
  title: 'Basic/Forms/ComboBox',
  component: ComboBox,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof ComboBox>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args: any) => (
    <ComboBox {...args}>
      <ComboBoxItem>Chocolate</ComboBoxItem>
      <ComboBoxItem>Mint</ComboBoxItem>
      <ComboBoxItem>Strawberry</ComboBoxItem>
      <ComboBoxItem>Vanilla</ComboBoxItem>
    </ComboBox>
  ),
  args: {
    label: 'Ice cream flavor',
    children: null,
  },
};
