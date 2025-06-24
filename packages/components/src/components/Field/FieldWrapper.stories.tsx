import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
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
  render: (args) => <FieldWrapper {...args}>The missing link</FieldWrapper>,
  args: {
    label: 'Field Label',
    description: 'This is a description of the field.',
  },
};

export const Errored: Story = {
  render: (args) => <FieldWrapper {...args}>The missing link</FieldWrapper>,
  args: {
    label: 'Field Label',
    description: 'This is a description of the field.',
    errorMessage: 'This field is required.',
    isInvalid: true,
    isRequired: true,
  },
};
