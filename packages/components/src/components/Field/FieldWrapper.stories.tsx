import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { FieldWrapper } from './Field.quanta';

const meta = {
  title: 'Quanta/FieldWrapper',
  component: FieldWrapper,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof FieldWrapper>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => <FieldWrapper {...args}>My bare widget here</FieldWrapper>,
  args: {
    label: 'Field Label',
    description: 'This is a description of the field.',
    children: 'My bare widget here',
  },
};

export const Errored: Story = {
  render: (args) => <FieldWrapper {...args}>My bare widget here</FieldWrapper>,
  args: {
    label: 'Field Label',
    description: 'This is a description of the field.',
    children: 'My bare widget here',
    errorMessage: 'This field is required.',
    isInvalid: true,
    isRequired: true,
  },
};

export const Disabled: Story = {
  render: (args) => <FieldWrapper {...args}>My bare widget here</FieldWrapper>,
  args: {
    label: 'Field Label',
    description: 'This field is disabled.',
    children: 'My bare widget here',
    isDisabled: true,
  },
};

export const ReadOnly: Story = {
  render: (args) => <FieldWrapper {...args}>My bare widget here</FieldWrapper>,
  args: {
    label: 'Field Label',
    description: 'This field is read-only.',
    children: 'My bare widget here',
    isReadOnly: true,
  },
};

export const Unwrapped: Story = {
  render: (args) => <FieldWrapper {...args}>My bare widget here</FieldWrapper>,
  args: {
    label: 'Field Label',
    description: 'This field is not wrapped.',
    children: 'My bare widget here',
    wrapped: false,
  },
};
