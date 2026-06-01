import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Link } from './Link.quanta';

const meta = {
  title: 'Quanta/Link',
  component: Link,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    asButton: {
      control: 'boolean',
      description: 'Show the link as a button',
      table: {
        type: {
          summary: 'boolean',
        },
        defaultValue: {
          summary: 'false',
        },
      },
    },
    accent: {
      description: 'Only available when `asButton` is set to `true`',
      table: {
        defaultValue: {
          summary: 'false',
        },
      },
    },
    variant: {
      control: 'select',
      description: 'Only available when `asButton` is set to `true`',
      options: ['neutral', 'primary', 'destructive', 'secondary'],
    },
  },
  args: {
    accent: false,
    asButton: false as any,
  },
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

export const AsButton: Story = {
  render: (args) => <Link {...args}>The missing link</Link>,
  args: {
    asButton: true,
    variant: 'primary',
    accent: true,
    href: 'https://www.imdb.com/title/tt6348138/',
    target: '_blank',
  },
};
