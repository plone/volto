import * as React from 'react';
import { ColorField } from './ColorField';

import type { Meta, StoryObj } from '@storybook/react';

import '../../styles/basic/ColorField.css';

const meta = {
  component: ColorField,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof ColorField>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args: any) => <ColorField {...args} />,
};

Default.args = {
  label: 'Color',
};
