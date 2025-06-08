import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Link } from './Link.tailwind';

const meta = {
  component: Link,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Link>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => <Link {...args}>The missing link</Link>,
  args: {
    href: 'https://www.imdb.com/title/tt6348138/',
    target: '_blank',
  },
};

export const Secondary: Story = {
  render: (args) => <Link {...args}>The missing link</Link>,
  args: {
    variant: 'secondary',
    href: 'https://www.imdb.com/title/tt6348138/',
    target: '_blank',
  },
};
