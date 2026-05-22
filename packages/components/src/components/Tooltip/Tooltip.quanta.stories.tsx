import React from 'react';
import { Button } from '../Button/Button.quanta';
import { Tooltip } from './Tooltip.quanta';
import { TooltipTrigger } from 'react-aria-components/Tooltip';
import { BoldIcon } from '../icons/BoldIcon';

import type { Meta, StoryObj } from '@storybook/react-vite';

const meta = {
  title: 'Quanta/Tooltip',
  component: Tooltip,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Tooltip>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args: any) => (
    <TooltipTrigger>
      <Button accent variant="primary" aria-label="Bold">
        <BoldIcon size="sm" />
      </Button>
      <Tooltip {...args}>Bold</Tooltip>
    </TooltipTrigger>
  ),
  args: {
    children: null,
  },
};
