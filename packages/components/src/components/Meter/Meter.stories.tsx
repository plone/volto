import React from 'react';
import { Meter } from './Meter';

import type { Meta, StoryObj } from '@storybook/react';

import '../../styles/basic/Meter.css';

const meta: Meta<typeof Meter> = {
  title: 'Forms/Meter',
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
