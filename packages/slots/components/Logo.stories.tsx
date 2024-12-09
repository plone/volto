import React from 'react';
import Logo from './Logo';

import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  title: 'Logo',
  component: Logo,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Logo>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args: any) => <Logo {...args} />,
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
        },
      },
    },
  },
};
