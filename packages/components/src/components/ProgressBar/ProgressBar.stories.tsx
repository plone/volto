import React from 'react';
import { ProgressBar } from './ProgressBar';

import type { Meta, StoryObj } from '@storybook/react';

import '../../styles/basic/ProgressBar.css';

const meta: Meta<typeof ProgressBar> = {
  title: 'Widgets/ProgressBar',
  component: ProgressBar,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof ProgressBar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args: any) => <ProgressBar {...args} />,
  args: {
    label: 'Loading…',
    value: 80,
  },
};
