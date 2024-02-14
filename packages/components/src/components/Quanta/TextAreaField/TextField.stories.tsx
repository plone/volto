import React from 'react';
import { TextAreaField } from './TextAreaField';

import type { Meta, StoryObj } from '@storybook/react';

import '../../../styles/basiq/TextField.css';
import '../../../styles/quanta/TextField.css';

const meta: Meta<typeof TextAreaField> = {
  title: 'Quanta/TextAreaField',
  component: TextAreaField,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof TextAreaField>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args: any) => <TextAreaField {...args} />,
  args: {
    name: 'fieldname',
    label: 'Field label',
    description: 'Optional help text',
    placeholder: 'Type something…',
  },
};

export const Required: Story = {
  args: {
    ...Default.args,
    name: 'required',
    isRequired: true,
  },
};

export const Filled: Story = {
  args: {
    ...Default.args,
    name: 'filled',
    defaultValue: 'Filled with value A',
    isRequired: true,
  },
};

export const Errored: Story = {
  args: {
    ...Default.args,
    name: 'errored',
    defaultValue: 'Filled with value A',
    errorMessage: 'This is the error',
    isInvalid: true,
    isRequired: true,
  },
};

export const Disabled: Story = {
  args: {
    ...Default.args,
    name: 'disabled',
    label: 'Disabled field title',
    isDisabled: true,
  },
};

export const ReadOnly: Story = {
  args: {
    ...Default.args,
    name: 'readonly',
    label: 'Readonly field title',
    defaultValue: 'Filled with value A',
    isReadOnly: true,
  },
};
