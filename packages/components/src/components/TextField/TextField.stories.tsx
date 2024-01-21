import { TextField } from './TextField';

import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof TextField> = {
  component: TextField,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof TextField>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args: any) => <TextField {...args} />,
  args: {
    label: 'Name',
  },
};
