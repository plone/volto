import React from 'react';
import IconSGVR from './add.svg?react';

import type { Meta, StoryObj } from '@storybook/react';

import '../../styles/basic/icons.css';

// More on how to set up stories at: https://storybook.js.org/docs/7.0/react/writing-stories/introduction
const meta = {
  title: 'Components/IconSVGR',
  component: IconSGVR,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div style={{ width: '400px' }}>
        <Story />
      </div>
    ),
  ],
  argTypes: {
    size: {
      options: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
      control: { type: 'radio' },
    },
    color: {
      options: ['informative', 'negative', 'notice', 'positive'],
      control: { type: 'radio' },
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
