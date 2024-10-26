import React from 'react';
import Logo from './Logo';

import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  title: 'Logo',
  component: Logo,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Logo>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args: any) => <Logo {...args} />,
  args: {
    label: 'Ice cream flavor',
  },
};
