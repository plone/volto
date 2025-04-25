import React from 'react';
import { Calendar } from './Calendar';

import type { Meta, StoryObj } from '@storybook/react';

import '../../styles/basic/Calendar.css';

const meta: Meta<typeof Calendar> = {
  title: 'Widgets/Calendar',
  component: Calendar,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Calendar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args: any) => <Calendar aria-label="Event date" {...args} />,
};
