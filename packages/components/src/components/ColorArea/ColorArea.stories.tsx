import * as React from 'react';
import { ColorArea } from './ColorArea';

import type { Meta, StoryObj } from '@storybook/react-vite';

const meta = {
  title: 'Basic/Forms/ColorArea',
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
