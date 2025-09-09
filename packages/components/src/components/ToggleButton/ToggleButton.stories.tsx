import React from 'react';
import { ToggleButton } from './ToggleButton';
import { BoldIcon } from '../icons';

import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  title: 'Basic/ToggleButton',
  component: ToggleButton,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof ToggleButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args: any) => <ToggleButton {...args}>Pin</ToggleButton>,
  args: {},
};

export const Selected: Story = {
  ...Default,
  args: {
    isSelected: true,
  },
};

export const Disabled: Story = {
  ...Default,
  args: {
    isDisabled: true,
  },
};

export const Icon: Story = {
  render: (args: any) => (
    <ToggleButton {...args}>
      <BoldIcon size="sm" />
    </ToggleButton>
  ),
  args: {
    ...Default.args,
  },
};
