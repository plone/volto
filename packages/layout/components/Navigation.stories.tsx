import Navigation from './Navigation';

import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  title: 'Navigation',
  component: Navigation,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Navigation>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args: any) => <Navigation {...args} />,
  args: {
    content: {
      '@id': 'http://localhost:3000/Plone',
      title: 'Plone site',
      description: 'Welcome to Plone',
      items: [],
      '@components': {
        navigation: {
          items: [
            {
              '@id': 'http://localhost:3000/Plone',
              title: 'Plone site',
            },
            {
              '@id': 'http://localhost:3000/Plone/news',
              title: 'News',
            },
            {
              '@id': 'http://localhost:3000/Plone/about',
              title: 'About',
            },
          ],
        },
      },
    },
  },
};
