import React from 'react';
import { RadioGroup } from './RadioGroup';
import { Radio } from 'react-aria-components';

import type { Meta, StoryObj } from '@storybook/react';

import '../../styles/basic/RadioGroup.css';

const meta = {
  title: 'Widgets/RadioGroup',
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
