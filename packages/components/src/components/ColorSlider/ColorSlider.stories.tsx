import * as React from 'react';
import { ColorSlider } from './ColorSlider';

import type { Meta, StoryObj } from '@storybook/react';

import '../../styles/basic/ColorSlider.css';

const meta = {
  component: ColorSlider,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof ColorSlider>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args: any) => <ColorSlider {...args} />,
};

Default.args = {
  label: 'Red Opacity',
  defaultValue: '#f00',
  channel: 'alpha',
};
