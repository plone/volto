import React from 'react';
import { NumberField } from './NumberField';

import type { Meta, StoryObj } from '@storybook/react';

import '../../styles/basic/NumberField.css';

const meta = {
  title: 'Forms/NumberField',
  component: NumberField,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof NumberField>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args: any) => <NumberField {...args} />,
  args: {
    label: 'Cookies',
  },
};
