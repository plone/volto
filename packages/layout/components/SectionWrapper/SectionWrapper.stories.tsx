import React from 'react';
import SectionWrapper from './SectionWrapper';

import type { Meta, StoryObj } from '@storybook/react-vite';

const meta = {
  title: 'Basic/SectionWrapper',
  component: SectionWrapper,
  tags: ['autodocs'],
} satisfies Meta<typeof SectionWrapper>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Narrow: Story = {
  render: (args: any) => <SectionWrapper {...args}></SectionWrapper>,
  args: {
    className: 'bg-gray-300 p-4',
    children: (
      <>
        SectionWrapper with <strong>narrow</strong> width
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
        SectionWrapper with <strong>default</strong> width
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
        SectionWrapper with <strong>layout</strong> width
      </>
    ),
    width: 'layout',
  },
};

export const FullWidth: Story = {
  render: (args: any) => <SectionWrapper {...args}></SectionWrapper>,
  args: {
    className: 'bg-gray-300 p-4',
    children: (
      <>
        SectionWrapper with <strong>full</strong> width
      </>
    ),
  },
};
