import React from 'react';
import { DatePicker } from './DatePicker';

import type { Meta, StoryObj } from '@storybook/react';

import '../../styles/basic/DatePicker.css';

const meta: Meta<typeof DatePicker> = {
  title: 'Widgets/DatePicker',
  component: DatePicker,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof DatePicker>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args: any) => <DatePicker {...args} />,
  args: {
    label: 'Event date',
  },
};
