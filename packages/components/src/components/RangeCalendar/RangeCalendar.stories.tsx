import React from 'react';
import { RangeCalendar } from './RangeCalendar';

import type { Meta, StoryObj } from '@storybook/react';

import '../../styles/basic/RangeCalendar.css';

const meta: Meta<typeof RangeCalendar> = {
  title: 'Widgets/RangeCalendar',
  component: RangeCalendar,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof RangeCalendar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args: any) => <RangeCalendar aria-label="Trip dates" {...args} />,
};
