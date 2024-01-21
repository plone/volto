import { NumberField } from './NumberField';

import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  title: 'Widgets/NumberField',
  component: NumberField,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof NumberField>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args: any) => <NumberField {...args} />,
  args: {
    label: 'Cookies',
  },
};
