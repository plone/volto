import React from 'react';
import { Icon } from './Icon';

import type { Meta, StoryObj } from '@storybook/react';

import '../../styles/basic/icons.css';

// More on how to set up stories at: https://storybook.js.org/docs/7.0/react/writing-stories/introduction
const meta = {
  title: 'Components/Icon',
  component: Icon,
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
} satisfies Meta<typeof Icon>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/7.0/react/writing-stories/args
export const Default: Story = {
  args: {
    size: 'L',
    children: (
      <svg viewBox="0 0 36 36">
        <path d="M18.477.593,22.8,12.029l12.212.578a.51.51,0,0,1,.3.908l-9.54,7.646,3.224,11.793a.51.51,0,0,1-.772.561L18,26.805,7.78,33.515a.51.51,0,0,1-.772-.561l3.224-11.793L.692,13.515a.51.51,0,0,1,.3-.908L13.2,12.029,17.523.593A.51.51,0,0,1,18.477.593Z" />
      </svg>
    ),
  },
};
