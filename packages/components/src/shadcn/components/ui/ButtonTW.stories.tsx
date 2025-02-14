import React from 'react';
import { Button } from './button';
import { Link } from '../../../components/Link/Link';
import { Text } from 'react-aria-components';
import { AddIcon } from '../../../components/Icons/AddIcon';

import type { Meta, StoryObj } from '@storybook/react';

import '../../../styles/tailwind/base.css';

const meta = {
  title: 'Tailwind/Button',
  component: Button,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta;

export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: (args: any) => <Button {...args}>Press me</Button>,
  args: {
    onPress: () => alert('Hello world!'),
  },
};

export const Disabled: Story = {
  ...Default,
  args: {
    ...Default.args,
    isDisabled: true,
  },
};

export const WithStyle: Story = {
  render: (args: any) => (
    <Button
      {...args}
      style={{
        '--button-background': 'rebeccapurple',
        '--text-color': 'white',
        '--button-background-pressed': '#aaa',
      }}
    >
      Press Me
    </Button>
  ),
  args: {
    ...Default.args,
  },
};

export const Icon: Story = {
  render: (args: any) => (
    <Button {...args}>
      <AddIcon />
    </Button>
  ),
  args: {
    ...Default.args,
  },
};

export const IconAndText: Story = {
  render: (args: any) => (
    <Button {...args}>
      <AddIcon />
      <Text>Press Me</Text>
    </Button>
  ),
  args: {
    ...Default.args,
  },
};

export const AsLink: Story = {
  render: (args: any) => (
    <Link
      className="react-aria-Button"
      href="https://plone.org/"
      target="_blank"
    >
      Plone.org
    </Link>
  ),
  args: {
    ...Default.args,
  },
};
