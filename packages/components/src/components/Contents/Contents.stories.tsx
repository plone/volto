import Contents from './Contents';
import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  title: 'Views/Contents',
  component: Contents,
  tags: ['autodocs'],
} satisfies Meta<typeof Contents>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: 'Section name',
    pathname: '/folder',
    objectActions: [
      {
        id: 'folderContents',
        title: 'Contents',
        icon: 'contents',
        url: '/folder/contents',
      },
    ],
    loading: false,
  },
};
