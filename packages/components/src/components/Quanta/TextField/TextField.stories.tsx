import React from 'react';
import { TextField } from './TextField';

import type { Meta, StoryObj } from '@storybook/react';

import '../../../styles/basiq/TextField.css';
import '../../../styles/quanta/TextField.css';

const meta: Meta<typeof TextField> = {
  title: 'Quanta/TextField',
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
    name: 'fieldname',
    label: 'Field label',
    description: 'Optional help text',
    placeholder: 'Type something…',
  },
};
