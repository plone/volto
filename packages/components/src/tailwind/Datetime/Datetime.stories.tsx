import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Form } from 'react-aria-components';
import { Button } from '../Button/Button';
import { DatePicker } from './Datetime';
import { parseDate } from '@internationalized/date';

const meta = {
  title: 'Tailwind/DatePicker',
  component: DatePicker,
  parameters: {
    layout: 'centered',
    backgrounds: { disable: true },
  },
  tags: ['autodocs'],
  args: {
    label: 'Date',
  },
} satisfies Meta<typeof DatePicker>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    name: 'date',
    label: 'Select date',
    description: 'Choose a date from the calendar',
  },
};

export const Required: Story = {
  args: {
    ...Default.args,
    name: 'required-date',
    isRequired: true,
  },
};

export const WithDescription: Story = {
  args: {
    ...Default.args,
    name: 'with-description',
    label: 'Event date',
    description: 'Select the date for your event',
    isRequired: true,
  },
};

export const Errored: Story = {
  args: {
    ...Default.args,
    name: 'errored-date',
    errorMessage: 'Please select a valid date',
    isInvalid: true,
    isRequired: true,
  },
};

export const Disabled: Story = {
  args: {
    ...Default.args,
    name: 'disabled-date',
    label: 'Disabled date picker',
    isDisabled: true,
  },
};

export const ReadOnly: Story = {
  args: {
    ...Default.args,
    name: 'readonly-date',
    label: 'Read-only date picker',
    isReadOnly: true,
    value: parseDate('2020-02-03'),
  },
};

export const Example = (args: any) => <DatePicker {...args} />;

export const Validation = (args: any) => (
  <Form className="flex flex-col items-start gap-2">
    <DatePicker {...args} />
    <Button type="submit" variant="primary">
      Submit
    </Button>
  </Form>
);

Validation.args = {
  name: 'validation-date',
  label: 'Birth date',
  description: 'Enter your birth date',
  isRequired: true,
};

export const WithCustomClassName: Story = {
  args: {
    ...Default.args,
    className: 'my-custom-datepicker',
    label: 'Custom styled date picker',
  },
};

export const WithTWClassName: Story = {
  args: {
    ...Default.args,
    className: 'border-2 border-blue-300 rounded-lg',
    label: 'Tailwind styled date picker',
  },
};
