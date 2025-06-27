import React from 'react';
import { Icon } from './Icon';

import type { Meta, StoryObj } from '@storybook/react';

// More on how to set up stories at: https://storybook.js.org/docs/7.0/react/writing-stories/introduction
const meta = {
  title: 'Basic/Icon',
  component: Icon,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    size: {
      options: ['2xs', 'xs', 'sm', 'base', 'lg', 'xl', '2xl', '3xl'],
      control: { type: 'radio' },
    },
  },
} satisfies Meta<typeof Icon>;

export default meta;
type Story = StoryObj<typeof meta>;

const svgIcon = (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M18 10C18 11.1046 17.1046 12 16 12C14.8954 12 14 11.1046 14 10C14 8.89543 14.8954 8 16 8C17.1046 8 18 8.89543 18 10Z" />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M2 20V4H22V20H2ZM4 6H20V17.5857L16.0001 13.5858L14.0001 15.5858L8.00008 9.58582L4 13.5859V6ZM4 16.4143V18H13.5858L8.00008 12.4142L4 16.4143ZM14.4143 18H17.5858L16.0001 16.4142L14.4143 18Z"
    />
  </svg>
);

export const Default: Story = {
  args: {
    size: 'lg',
    children: svgIcon,
  },
};

export const WithCSSCustomPropertyColor: Story = {
  args: {
    size: '2xl',
    color: '--quanta-sapphire',
    children: svgIcon,
  },
};

export const WithHEXColor: Story = {
  args: {
    size: '3xl',
    color: '#aaa',
    children: svgIcon,
  },
};
