import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Tree, TreeItem } from './Tree';

const meta = {
  title: 'Basic/Tree',
  component: Tree,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Tree>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args: any) => (
    <Tree {...args} style={{ height: '300px' }}>
      <TreeItem title="Documents">
        <TreeItem title="Project">
          <TreeItem title="Weekly Report" />
        </TreeItem>
      </TreeItem>
      <TreeItem title="Photos">
        <TreeItem title="Image 1" />
        <TreeItem title="Image 2" />
      </TreeItem>
    </Tree>
  ),
  args: {
    'aria-label': 'Files',
    defaultExpandedKeys: ['documents', 'photos', 'project'],
  },
};
