import React from 'react';
import { Meter } from './Meter';

import type { Meta, StoryObj } from '@storybook/react-vite';

const meta: Meta<typeof Meter> = {
  title: 'Basic/Forms/Meter',
  component: Meter,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Meter>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args: any) => <Meter {...args} />,
  args: {
    label: 'Storage space',
    value: 80,
  },
};
