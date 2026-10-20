import React from 'react';
import { Checkbox } from './Checkbox';

import type { Meta, StoryObj } from '@storybook/react-vite';

const meta = {
  title: 'Basic/Checkbox',
  component: Checkbox,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Checkbox>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args: any) => <Checkbox {...args}>Unsubscribe</Checkbox>,
};
