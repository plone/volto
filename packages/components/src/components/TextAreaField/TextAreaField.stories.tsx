import React from 'react';
import { TextAreaField } from './TextAreaField';

import type { Meta, StoryObj } from '@storybook/react';

import '../../styles/basic/TextField.css';

const meta: Meta<typeof TextAreaField> = {
  title: 'Forms/TextAreaField',
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
