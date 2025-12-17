import React from 'react';
import { SearchField } from './SearchField';

import type { Meta, StoryObj } from '@storybook/react-vite';

const meta: Meta<typeof SearchField> = {
  title: 'Basic/Forms/SearchField',
  component: SearchField,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof SearchField>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args: any) => <SearchField {...args} />,
  args: {
    label: 'Search',
    placeholder: 'Type to search...',
  },
};
