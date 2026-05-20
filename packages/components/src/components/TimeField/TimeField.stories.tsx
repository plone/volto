import React from 'react';
import { TimeField } from './TimeField';

import type { Meta, StoryObj } from '@storybook/react-vite';

const meta: Meta<typeof TimeField> = {
  title: 'Basic/Forms/TimeField',
  component: TimeField,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof TimeField>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args: any) => <TimeField {...args} />,
  args: {
    label: 'Event time',
  },
};
