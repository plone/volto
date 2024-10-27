import Header from './Header';

import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  title: 'Header',
  component: Header,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Header>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args: any) => <Header {...args} />,
  args: {
    content: {
      '@id': 'http://localhost:3000/Plone',
      title: 'Plone site',
      description: 'Welcome to Plone',
      items: [],
      '@components': {
        navroot: {
          // @ts-expect-error This is a test object, missing all content properties
          navroot: {
            '@id': 'http://localhost:3000/Plone',
            title: 'Plone site',
          },
        },
        site: {
          'plone.site_title': 'Plone site',
          // 'plone.site_logo': 'https://sneridagh.dev/',
        },
      },
    },
  },
};
