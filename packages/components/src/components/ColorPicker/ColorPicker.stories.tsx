import * as React from 'react';
import { ColorPicker } from './ColorPicker';

import type { Meta, StoryObj } from '@storybook/react';

import '../../styles/basic/ColorPicker.css';

const meta = {
  title: 'Widgets/ColorPicker',
  component: ColorPicker,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof ColorPicker>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args: any) => <ColorPicker {...args} />,
};

Default.args = {
  label: 'Fill color',
  defaultValue: '#f00',
};
