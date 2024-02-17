import React from 'react';
import { QuantaTextField } from './TextField';

import type { Meta, StoryObj } from '@storybook/react';

import '../../../styles/basic/TextField.css';
import '../../../styles/quanta/TextField.css';

const meta: Meta<typeof QuantaTextField> = {
  title: 'Quanta/TextField',
  component: QuantaTextField,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof QuantaTextField>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args: any) => <QuantaTextField {...args} />,
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
