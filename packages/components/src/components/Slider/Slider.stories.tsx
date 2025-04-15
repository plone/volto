import React from 'react';
import { Slider } from './Slider';

import type { Meta, StoryObj } from '@storybook/react';

import '../../styles/basic/Slider.css';

const meta: Meta<typeof Slider> = {
  title: 'Components/Slider',
  component: Slider,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Slider>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args: any) => <Slider {...args} />,
  args: {
    label: 'Range',
    defaultValue: [30, 60],
    thumbLabels: ['start', 'end'],
  },
};
