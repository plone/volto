import * as React from 'react';
import { Button } from './Button';
import { BinIcon } from '../../components/icons/BinIcon';
import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  title: 'Tailwind/Button',
  component: Button,
  parameters: {
    layout: 'centered',
    backgrounds: { disable: true },
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'destructive'],
    },
  },
  args: {
    isDisabled: false,
    children: 'Button',
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    variant: 'primary',
  },
};

export const Secondary: Story = {
  args: {
    variant: 'secondary',
  },
};

export const Destructive: Story = {
  args: {
    variant: 'destructive',
  },
};

export const Disabled: Story = {
  args: {
    isDisabled: true,
  },
};

export const Icon: Story = {
  render: (args) => (
    <Button {...args}>
      <BinIcon />
    </Button>
  ),
};

export const SmallIcon: Story = {
  render: (args) => (
    <Button {...args}>
      <BinIcon />
    </Button>
  ),
  args: {
    size: 'S',
  },
};

export const WithClassName: Story = {
  args: {
    className: 'my-custom-classname',
    variant: 'destructive',
  },
};

export const WithTWClassName: Story = {
  args: {
    className: 'border-5 border-amber-300',
    variant: 'destructive',
  },
};
