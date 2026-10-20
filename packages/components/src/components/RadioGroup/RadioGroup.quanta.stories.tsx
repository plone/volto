import React from 'react';
import { RadioGroup, Radio } from './RadioGroup.quanta';

import type { Meta, StoryObj } from '@storybook/react-vite';

const meta = {
  title: 'Quanta/RadioGroup',
  component: RadioGroup,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof RadioGroup>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args: any) => (
    <RadioGroup {...args}>
      <Radio value="soccer">Soccer</Radio>
      <Radio value="baseball">Baseball</Radio>
      <Radio value="basketball">Basketball</Radio>
    </RadioGroup>
  ),
  args: {
    label: 'Favorite sport',
  },
};
