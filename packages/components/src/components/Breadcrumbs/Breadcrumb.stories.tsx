import BreadcrumbsComponent from './Breadcrumbs';

import type { Meta, StoryObj } from '@storybook/react';

// More on how to set up stories at: https://storybook.js.org/docs/7.0/react/writing-stories/introduction
const meta = {
  title: 'Breadcrumbs',
  component: BreadcrumbsComponent,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div style={{ width: '400px' }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof BreadcrumbsComponent>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/7.0/react/writing-stories/args
export const Default: Story = {
  args: {
    root: '/',
    includeRoot: true,
    items: [
      { '@id': '/folder', title: 'Folder' },
      { '@id': '/folder/page', title: 'Page' },
    ],
  },
};

export const NoRoot: Story = {
  args: {
    root: '/',
    includeRoot: false,
    items: [
      { '@id': '/folder', title: 'Folder' },
      { '@id': '/folder/page', title: 'Page' },
    ],
  },
};
