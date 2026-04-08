import React from 'react';
import { TextField } from './TextField';

import type { Meta, StoryObj } from '@storybook/react';

import '../../styles/basic/TextField.css';

const meta: Meta<typeof TextField> = {
  title: 'Forms/TextField',
  component: TextField,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof TextField>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args: any) => <TextField {...args} />,
  args: {
    label: 'Name',
  },
};
