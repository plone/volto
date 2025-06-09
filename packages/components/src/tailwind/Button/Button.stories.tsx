import * as React from 'react';
import { Button } from './Button';
import { BinIcon } from '../../components/icons/BinIcon';
import type { Meta, StoryObj } from '@storybook/react';
import { SevenContext } from '../SevenContext/SevenContext';

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
      <Button {...args}>Neutral</Button>
      <Button {...args}>
        <BinIcon />
      </Button>
    </div>
  ),
  args: {},
};

export const Accent: Story = {
  render: Neutral.render,
  args: {
    accent: true,
  },
};

export const AccentPrimary: Story = {
  render: Neutral.render,
  args: {
    variant: 'primary',
    accent: true,
  },
};

export const AccentPrimarySmall: Story = {
  render: Neutral.render,
  args: {
    variant: 'primary',
    accent: true,
    size: 'S',
  },
};

export const AccentPrimaryLarge: Story = {
  render: Neutral.render,
  args: {
    variant: 'primary',
    accent: true,
    size: 'L',
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

import { tv } from 'tailwind-variants';

export const buttonStyles = tv({
  base: '',
  variants: {
    variant: {
      primary: 'bg-red-600 text-white',
    },
  },
});

export const Custom: Story = {
  render: (args) => (
    <div className="flex gap-8">
      <SevenContext.Provider
        value={{
          button: {
            base: '',
            variants: {
              variant: {
                primary: 'bg-red-600 text-white',
              },
            },
          },
        }}
      >
        <Button {...args}>Custom</Button>
      </SevenContext.Provider>
      <Button variant="neutral">Neutral</Button>
      <Button variant="primary" accent={true}>
        Pimary
      </Button>
    </div>
  ),
  args: {
    customize: buttonStyles,
    variant: 'primary',
    accent: true,
  },
};
