import * as React from 'react';
import { Button } from './Button';
import { BinIcon } from '../../components/Icons/BinIcon';

// import '../../styles/tailwind/base.css';

export default {
  title: 'Tailwind/Button',
  component: Button,
  parameters: {
    layout: 'centered',
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
};

export const Primary = {
  args: {
    variant: 'primary',
  },
};

export const Secondary = {
  args: {
    variant: 'secondary',
  },
};

export const Destructive = {
  args: {
    variant: 'destructive',
  },
};

export const Icon = {
  render: (args) => (
    <Button {...args}>
      <BinIcon />
    </Button>
  ),
  args: {
    variant: 'icon',
  },
};

export const WithClassName = {
  args: {
    className: 'my-custom-classname',
    variant: 'destructive',
  },
};

export const WithTWClassName = {
  args: {
    className: 'border-5 border-amber-300',
    variant: 'destructive',
  },
};
