import React from 'react';
import IconSGVR from '../../icons/add.svg?react';

import type { Meta, StoryObj } from '@storybook/react';

import '../../styles/basic/icons.css';

// More on how to set up stories at: https://storybook.js.org/docs/7.0/react/writing-stories/introduction
const meta = {
  title: 'Basic/IconSVGR',
  component: IconSGVR,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    size: {
      options: ['2xs', 'xs', 'sm', 'base', 'lg', 'xl', '2xl', '3xl'],
      control: { type: 'radio' },
    },
    color: {
      control: { type: 'color' },
    },
  },
} satisfies Meta<typeof IconSGVR>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/7.0/react/writing-stories/args
export const Default: Story = {
  render: (args: any) => <IconSGVR {...args} />,
  args: {
    size: 'L',
  },
};
