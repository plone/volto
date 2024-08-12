import React from 'react';
import { Popover } from './Popover';
import { Button } from '../Button/Button';
import { DialogTrigger, Heading } from 'react-aria-components';

import type { Meta, StoryObj } from '@storybook/react';

import '../../styles/basic/Popover.css';
import { InfoIcon } from '../Icons/InfoIcon';

const meta = {
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
        <InfoIcon size="M" />
      </Button>
      <Popover {...args}>
        <Heading slot="title">Help</Heading>
        <p>For help accessing your account, please contact support.</p>
      </Popover>
    </DialogTrigger>
  ),
  args: {},
};
