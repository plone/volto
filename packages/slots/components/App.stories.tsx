import App from './App';

import type { Meta, StoryObj } from '@storybook/react';
import { storyData } from '../stories';

const meta = {
  title: 'App',
  component: App,
} satisfies Meta<typeof App>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args: any) => <App {...args} />,
  args: {
    content: {
      '@id': 'http://localhost:3000/Plone',
      title: 'Plone site',
      description: 'Welcome to Plone',
      items: [],
      blocks: {
        ...storyData.blocks,
      },
      blocks_layout: {
        ...storyData.blocks_layout,
      },
      '@components': {
        navigation: {
          items: [
            {
              '@id': 'http://localhost:3000/Plone',
              title: 'Home',
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
        navroot: {
          navroot: {
            '@id': 'http://localhost:3000/Plone',
            title: 'Plone site',
          },
        },
        site: {
          'plone.site_title': 'Plone site',
        },
      },
    },
  },
};
