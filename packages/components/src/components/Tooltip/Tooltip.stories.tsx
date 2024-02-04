import React from 'react';
import { Tooltip } from './Tooltip';
import { Button, TooltipTrigger } from 'react-aria-components';

import type { Meta, StoryObj } from '@storybook/react';

import '../../styles/basiq/Tooltip.css';

const meta = {
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
      <Button>💾</Button>
      <Tooltip {...args}>Save</Tooltip>
    </TooltipTrigger>
  ),
  args: {},
};
