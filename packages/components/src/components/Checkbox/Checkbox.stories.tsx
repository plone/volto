import Checkbox from './Checkbox';
import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  title: 'Checkbox',
  component: Checkbox,
  tags: ['autodocs'],
} as Meta<typeof Checkbox>;

export default meta;
type Story = StoryObj<typeof Checkbox>;

export const Default: Story = {
  args: {
    isIndeterminate: false,
    children: 'Checkbox',
  },
};
