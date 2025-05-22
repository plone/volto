import * as React from 'react';
import DndListBoxWidget from './DndListBox';
import { BinIcon } from '../../components/icons/BinIcon';
import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  title: 'Tailwind/DndListBoxWidget',
  component: DndListBoxWidget,
  parameters: {
    layout: 'centered',
    backgrounds: { disable: true },
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['neutral', 'primary', 'destructive'],
    },
  },
  args: {
    isDisabled: false,
    children: 'Button',
    accent: false,
  },
} satisfies Meta<typeof DndListBoxWidget>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Neutral: Story = {
  render: (args) => (
    <div className="flex gap-8">
      <DndListBoxWidget {...args} />
    </div>
  ),
  args: {},
};
