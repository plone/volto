import React from 'react';
import { TextAreaField } from './TextAreaField';

import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof TextAreaField> = {
  title: 'Basic/Forms/TextAreaField',
  component: TextAreaField,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof TextAreaField>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args: any) => <TextAreaField {...args} />,
  args: {
    label: 'Name',
  },
};
