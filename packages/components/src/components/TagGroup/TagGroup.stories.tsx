import React from 'react';
import { Tag, TagGroup } from './TagGroup';

import type { Meta, StoryObj } from '@storybook/react';

import '../../styles/basic/TagGroup.css';

const meta = {
  component: TagGroup,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof TagGroup>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args: any) => (
    <TagGroup {...args}>
      <Tag>Chocolate</Tag>
      <Tag>Mint</Tag>
      <Tag>Strawberry</Tag>
      <Tag>Vanilla</Tag>
    </TagGroup>
  ),
  args: {
    label: 'Ice cream flavor',
    selectionMode: 'single',
  },
};
