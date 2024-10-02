import * as React from 'react';
import { ColorSwatch } from './ColorSwatch';

import type { Meta, StoryObj } from '@storybook/react';

import '../../styles/basic/ColorSwatch.css';

const meta = {
  component: ColorSwatch,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof ColorSwatch>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args: any) => <ColorSwatch {...args} />,
};

Default.args = {
  color: '#f00a',
};
