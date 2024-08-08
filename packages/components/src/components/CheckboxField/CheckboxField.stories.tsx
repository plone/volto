import React from 'react';
import { CheckboxField } from './CheckboxField';

import type { Meta, StoryObj } from '@storybook/react';

// More on how to set up stories at: https://storybook.js.org/docs/7.0/react/writing-stories/introduction
const meta = {
  title: 'Forms/CheckboxField',
  component: CheckboxField,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div style={{ width: '400px' }}>
        <Story />
      </div>
    ),
  ],
  argTypes: {
    // controlled value prop
    value: {
      control: {
        disable: true,
      },
    },
  },
} satisfies Meta<typeof CheckboxField>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/7.0/react/writing-stories/args
export const Default: Story = {
  args: {
    name: 'empty',
    label: 'field 1 title',
    description: 'Optional help text',
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
    name: 'field-filled',
    label: 'Filled field title',
    defaultSelected: true,
    isRequired: true,
  },
};

export const Errored: Story = {
  args: {
    ...Default.args,
    name: 'field-errored',
    label: 'I accept the terms and conditions',
    errorMessage: 'You should agree with the terms and conditions',
    isInvalid: true,
    isRequired: true,
  },
};

export const Disabled: Story = {
  args: {
    ...Default.args,
    name: 'field-disabled',
    label: 'Disabled field title',
    isDisabled: true,
  },
};
