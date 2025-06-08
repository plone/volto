import React from 'react';
import { RadioGroup, Radio } from './RadioGroup.tailwind';

import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  title: 'Tailwind/RadioGroup',
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
