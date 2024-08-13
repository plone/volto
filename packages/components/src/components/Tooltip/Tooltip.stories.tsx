import React from 'react';
import { Tooltip } from './Tooltip';
import { TooltipTrigger } from 'react-aria-components';
import { ToggleButton } from '../ToggleButton/ToggleButton';
import { BoldIcon } from '../Icons/BoldIcon';

import type { Meta, StoryObj } from '@storybook/react';

import '../../styles/basic/Tooltip.css';

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
      <ToggleButton {...args}>
        <BoldIcon size="S" />
      </ToggleButton>
      <Tooltip {...args}>Bold</Tooltip>
    </TooltipTrigger>
  ),
  args: {},
};
