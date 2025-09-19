import React from 'react';
import { Switch } from './Switch';

import type { Meta, StoryObj } from '@storybook/react-vite';

const meta: Meta<typeof Switch> = {
  title: 'Basic/Forms/Switch',
  component: Switch,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Switch>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args: any) => <Switch {...args}>Wi-Fi</Switch>,
};
