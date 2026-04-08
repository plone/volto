import * as React from 'react';
import { ColorArea } from './ColorArea';

import type { Meta, StoryObj } from '@storybook/react';

import '../../styles/basic/ColorArea.css';

const meta = {
  title: 'Widgets/ColorArea',
  component: ColorArea,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof ColorArea>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args: any) => <ColorArea {...args} />,
};

Default.args = {
  defaultValue: 'hsl(30, 100%, 50%)',
};
