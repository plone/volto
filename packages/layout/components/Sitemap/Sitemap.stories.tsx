import SitemapComponent from './Sitemap';

import type { Meta, StoryObj } from '@storybook/react-vite';

const meta = {
  title: 'Sitemap',
  component: SitemapComponent,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  decorators: [
    (Story) => (
      <div style={{ width: '400px' }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof SitemapComponent>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    items: [
      {
        '@id': '/',
        description: '',
        items: [],
        review_state: null,
        title: 'Home',
      },
      {
        '@id': '/my-first-page',
        description: '',
        items: [
          {
            '@id': '/my-first-page/topic-1-of-first-page',
            description: '',
            items: [],
            review_state: 'published',
            title: 'topic 1 of first page',
            use_view_action_in_listings: false,
          },
        ],
        review_state: 'published',
        title: 'My first page',
      },
      {
        '@id': '/a-second-one',
        description: '',
        items: [],
        review_state: 'published',
        title: 'a second one',
      },
      {
        '@id': '/the-third-page',
        description: '',
        items: [],
        review_state: 'published',
        title: 'the third page',
      },
    ],
  },
};
