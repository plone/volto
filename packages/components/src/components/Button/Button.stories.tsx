/* eslint-disable no-alert */
import React from 'react';
import { Button } from './Button';
import { Link } from '../Link/Link';
import { Text } from 'react-aria-components';
import { AddIcon } from '../icons/AddIcon';

import type { Meta, StoryObj } from '@storybook/react';

import '../../styles/basic/Button.css';

const meta = {
  title: 'Components/Button',
  component: Button,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

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
