import React from 'react';
import { Checkbox } from '../Checkbox/Checkbox';
import { CheckboxGroup } from './CheckboxGroup';

import type { Meta, StoryObj } from '@storybook/react-vite';

const meta = {
  title: 'Basic/Forms/CheckboxGroup',
  component: CheckboxGroup,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof CheckboxGroup>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args: any) => (
    <CheckboxGroup {...args}>
      <Checkbox value="soccer">Soccer</Checkbox>
      <Checkbox value="baseball">Baseball</Checkbox>
      <Checkbox value="basketball">Basketball</Checkbox>
    </CheckboxGroup>
  ),
  args: {
    label: 'Favorite sports',
  },
};
