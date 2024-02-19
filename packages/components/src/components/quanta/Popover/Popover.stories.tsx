import React from 'react';
import { DialogTrigger } from 'react-aria-components';
import { Button } from '../../Button/Button';
import { QuantaPopover } from './Popover';

import type { Meta, StoryObj } from '@storybook/react';

import '../../../styles/basic/Popover.css';
import '../../../styles/quanta/Popover.css';

const meta: Meta<typeof QuantaPopover> = {
  title: 'Quanta/Popover',
  component: QuantaPopover,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof QuantaPopover>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args: any) => (
    <DialogTrigger>
      <Button aria-label="Popover">Open popover</Button>
      <QuantaPopover {...args} />
    </DialogTrigger>
  ),
  args: {
    children: 'Popover content',
  },
};
