import React from 'react';
import { Container } from './Container';

import type { Meta, StoryObj } from '@storybook/react-vite';

const meta = {
  title: 'Basic/Container',
  component: Container,
  tags: ['autodocs'],
} satisfies Meta<typeof Container>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Narrow: Story = {
  render: (args: any) => <Container {...args}></Container>,
  args: {
    className: 'bg-gray-300 p-4',
    children: (
      <>
        Container with <strong>narrow</strong> width
      </>
    ),
    width: 'narrow',
  },
};

export const Default: Story = {
  args: {
    className: 'bg-gray-300 p-4',
    children: (
      <>
        Container with <strong>default</strong> width
      </>
    ),
    width: 'default',
  },
};

export const Layout: Story = {
  args: {
    className: 'bg-gray-300 p-4',
    children: (
      <>
        Container with <strong>layout</strong> width
      </>
    ),
    width: 'layout',
  },
};

export const FullWidth: Story = {
  render: (args: any) => <Container {...args}></Container>,
  args: {
    className: 'bg-gray-300 p-4',
    children: (
      <>
        Container with <strong>full</strong> width
      </>
    ),
  },
};
