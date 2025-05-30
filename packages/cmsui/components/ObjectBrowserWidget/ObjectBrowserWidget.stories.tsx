import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Form } from 'react-aria-components';
import { Button } from '@plone/components/tailwind';
import { TextField } from '../TextField/TextField';
import { ObjectBrowserWidget } from './ObjectBrowserWidgetModal';

const meta = {
  component: ObjectBrowserWidget,
  parameters: {
    layout: 'centered',
    backgrounds: { disable: true },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof ObjectBrowserWidget>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: 'Add an image',
    mode: 'multiple',
    root: '/',
    items: [
      { '@id': '/folder', title: 'Folder' },
      { '@id': '/folder/page', title: 'Page' },
    ],
  },
};
