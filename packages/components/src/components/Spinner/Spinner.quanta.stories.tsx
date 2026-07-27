import React from 'react';
import { Spinner } from './Spinner.quanta';
import type { Meta, StoryObj } from '@storybook/react-vite';

const meta = {
  title: 'Quanta/Spinner',
  component: Spinner,
  parameters: {
    layout: 'centered',
    backgrounds: { disable: true },
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
    <div className="flex items-center gap-4" aria-label="Spinner sizes">
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
