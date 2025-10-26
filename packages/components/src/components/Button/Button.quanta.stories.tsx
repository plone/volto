import * as React from 'react';
import { Button } from './Button.quanta';
import { BinIcon } from '../../components/icons/BinIcon';
import type { Meta, StoryObj } from '@storybook/react-vite';

const meta = {
  title: 'Quanta/Button',
  component: Button,
  parameters: {
    layout: 'centered',
    backgrounds: { disable: true },
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['neutral', 'primary', 'destructive'],
    },
  },
  args: {
    isDisabled: false,
    children: 'Button',
    accent: false,
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Neutral: Story = {
  render: (args) => (
    <div className="flex gap-8">
      <Button {...args}></Button>
      <Button {...args}>
        <BinIcon />
      </Button>
    </div>
  ),
  args: {
    children: 'Neutral',
  },
};

export const Accent: Story = {
  render: Neutral.render,
  args: {
    accent: true,
    children: 'Accent',
  },
};

export const AccentPrimarySmall: Story = {
  render: Neutral.render,
  args: {
    variant: 'primary',
    accent: true,
    size: 'S',
    children: 'Accent Primary Small',
  },
};

export const AccentPrimary: Story = {
  render: Neutral.render,
  args: {
    variant: 'primary',
    accent: true,
    children: 'Accent Primary',
  },
};

export const AccentPrimaryLarge: Story = {
  render: Neutral.render,
  args: {
    variant: 'primary',
    accent: true,
    size: 'L',
    children: 'Accent Primary Large',
  },
};

export const Destructive: Story = {
  render: Neutral.render,
  args: {
    variant: 'destructive',
    children: 'Destructive',
  },
};

export const Disabled: Story = {
  render: Neutral.render,
  args: {
    isDisabled: true,
    children: 'Disabled',
  },
};

export const Icon: Story = {
  render: (args) => (
    <Button {...args}>
      <BinIcon />
    </Button>
  ),
};

export const IconVariant: Story = {
  render: (args) => (
    <Button {...args}>
      <BinIcon />
    </Button>
  ),
  args: {
    variant: 'icon',
  },
};

export const IconAccentPrimarySmall: Story = {
  render: (args) => (
    <Button {...args}>
      <BinIcon />
    </Button>
  ),
  args: {
    variant: 'primary',
    accent: true,
    size: 'S',
  },
};

export const IconAccentPrimary: Story = {
  render: (args) => (
    <Button {...args}>
      <BinIcon />
    </Button>
  ),
  args: {
    variant: 'primary',
    accent: true,
  },
};

export const IconAccentPrimaryLarge: Story = {
  render: (args) => (
    <Button {...args}>
      <BinIcon />
    </Button>
  ),
  args: {
    variant: 'primary',
    accent: true,
    size: 'L',
  },
};

export const WithClassName: Story = {
  args: {
    className: 'my-custom-classname',
    accent: true,
    variant: 'destructive',
  },
};

export const WithTWClassName: Story = {
  args: {
    className: 'border-5 border-amber-300',
    variant: 'destructive',
    accent: true,
  },
};
