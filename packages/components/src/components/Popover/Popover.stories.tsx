import React from 'react';
import { Popover } from './Popover';
import { Button } from '../Button/Button';
import { DialogTrigger, Heading } from 'react-aria-components';

import type { Meta, StoryObj } from '@storybook/react-vite';

import { InfoIcon } from '../icons/InfoIcon';

const meta = {
  title: 'Basic/Popover',
  component: Popover,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Popover>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args: any) => (
    <DialogTrigger>
      <Button aria-label="Help">
        <InfoIcon size="base" />
      </Button>
      <Popover {...args}>
        <Heading slot="title">Help</Heading>
        <p>For help accessing your account, please contact support.</p>
      </Popover>
    </DialogTrigger>
  ),
  args: { children: null },
};
