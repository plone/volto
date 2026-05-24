import React from 'react';
import { Spinner } from './Spinner';

import type { Meta, StoryObj } from '@storybook/react-vite';

const meta: Meta<typeof Spinner> = {
  title: 'Basic/Spinner',
  component: Spinner,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Spinner>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};

export const WithLabel: Story = {
  args: {
    label: 'Loading content',
  },
};

export const Sizes: Story = {
  render: () => (
    <div
      style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}
      aria-label="Spinner sizes"
    >
      <Spinner size="xs" />
      <Spinner size="sm" />
      <Spinner size="lg" />
      <Spinner size={40} />
    </div>
  ),
};

export const Decorative: Story = {
  args: {
    isDecorative: true,
  },
};
