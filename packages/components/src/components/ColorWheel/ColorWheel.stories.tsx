import * as React from 'react';
import { ColorWheel } from './ColorWheel';

import type { Meta, StoryObj } from '@storybook/react';

import '../../styles/basic/ColorWheel.css';

const meta = {
  component: ColorWheel,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof ColorWheel>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args: any) => <ColorWheel {...args} />,
};

Default.args = {
  defaultValue: 'hsl(30, 100%, 50%)',
};
