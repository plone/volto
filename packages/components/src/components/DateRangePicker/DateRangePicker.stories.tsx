import React from 'react';
import { DateRangePicker } from './DateRangePicker';

import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof DateRangePicker> = {
  title: 'Basic/Forms/DateRangePicker',
  component: DateRangePicker,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof DateRangePicker>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args: any) => <DateRangePicker {...args} />,
  args: {
    label: 'Event date',
  },
};
