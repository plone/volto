import React from 'react';
import { DatePicker } from './DatePicker';

import type { Meta, StoryObj } from '@storybook/react-vite';

const meta: Meta<typeof DatePicker> = {
  title: 'Basic/Forms/DatePicker',
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
