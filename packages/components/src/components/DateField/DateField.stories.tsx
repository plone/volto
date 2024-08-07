import React from 'react';
import { DateField } from './DateField';

import type { Meta, StoryObj } from '@storybook/react';

import '../../styles/basic/DateField.css';

const meta: Meta<typeof DateField> = {
  title: 'Widgets/DateField',
  component: DateField,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof DateField>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args: any) => <DateField {...args} />,
  args: {
    label: 'Event date',
  },
};
