import React from 'react';
import { SearchField } from './SearchField';

import type { Meta, StoryObj } from '@storybook/react';

import '../../styles/basic/SearchField.css';

const meta: Meta<typeof SearchField> = {
  title: 'Forms/SearchField',
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
  },
};
