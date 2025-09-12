import React from 'react';
import Toast from './Toast';
import config from '@plone/registry';

import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  title: 'Toast',
  component: Toast,
  tags: ['autodocs'],
} satisfies Meta<typeof Toast>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    queue: config
      .getUtility({
        name: 'queue',
        type: 'toast',
      })
      .method(),
  },
  render: (args: any) => (
    <>
      <button
        onClick={() => {
          config.getUtility({ name: 'show', type: 'toast' }).method({
            title: 'This is a toast!',
            description: 'You clicked button to show this toast!',
          });
        }}
      >
        Click me to show toast
      </button>
      <Toast {...args} />
    </>
  ),
};
