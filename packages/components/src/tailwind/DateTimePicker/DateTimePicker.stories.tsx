import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Form } from 'react-aria-components';
import {
  CalendarDate,
  CalendarDateTime,
  type DateValue,
  parseDate,
  parseDateTime,
  today,
  now,
  getLocalTimeZone,
  isWeekend,
} from '@internationalized/date';
import { Button } from '../Button/Button';
import { DateTimePicker } from './DateTimePicker';

// DateTimePicker Stories
const meta = {
  title: 'Tailwind/DateTimePicker',
  component: DateTimePicker,
  parameters: {
    layout: 'centered',
    backgrounds: { disable: true },
  },
  tags: ['autodocs'],
  args: {
    label: 'Date & Time',
  },
} satisfies Meta<typeof DateTimePicker>;

export default meta;
type Story = StoryObj<typeof meta>;

// Basic Stories
export const Default: Story = {
  render: (args) => <DateTimePicker {...args} />,
  args: {
    name: 'datetime',
    label: 'Select date and time',
    description: 'Default datetime picker with minute granularity',
    granularity: 'minute',
  },
};

export const DateOnly: Story = {
  render: (args) => <DateTimePicker {...args} />,
  args: {
    name: 'date-only',
    label: 'Date only',
    description: 'Date picker without time selection',
    granularity: 'day',
  },
};

export const WithDefaultValue: Story = {
  render: (args) => <DateTimePicker {...args} />,
  args: {
    name: 'datetime-default',
    label: 'With default value',
    description: 'Uncontrolled component with default value',
    defaultValue: new CalendarDateTime(2024, 12, 25, 14, 30),
    granularity: 'minute',
  },
};

// Controlled vs Uncontrolled
const ControlledExample = (args: any) => {
  const [value, setValue] = useState<DateValue | null>(
    new CalendarDateTime(2024, 1, 15, 10, 0),
  );

  return (
    <div className="flex flex-col gap-4">
      <DateTimePicker {...args} value={value} onChange={setValue} />
      <div className="text-sm text-gray-600">
        Current value: {value ? value.toString() : 'null'}
      </div>
      <div className="flex gap-2">
        <Button
          variant="neutral"
          onPress={() => setValue(now(getLocalTimeZone()))}
        >
          Set to now
        </Button>
        <Button variant="neutral" onPress={() => setValue(null)}>
          Clear
        </Button>
      </div>
    </div>
  );
};

export const Controlled: Story = {
  render: ControlledExample,
  args: {
    name: 'datetime-controlled',
    label: 'Controlled component',
    description: 'Value managed by parent component',
    granularity: 'minute',
  },
};

// Granularity Examples
export const GranularityMinute: Story = {
  render: (args) => <DateTimePicker {...args} />,
  args: {
    name: 'granularity-minute',
    label: 'Minute granularity',
    description: 'Shows date, hour, and minute segments',
    granularity: 'minute',
  },
};

export const GranularityHour: Story = {
  render: (args) => <DateTimePicker {...args} />,
  args: {
    name: 'granularity-hour',
    label: 'Hour granularity',
    description: 'Shows date and hour segments',
    granularity: 'hour',
  },
};

export const GranularitySecond: Story = {
  render: (args) => <DateTimePicker {...args} />,
  args: {
    name: 'granularity-second',
    label: 'Second granularity',
    description: 'Shows date, hour, minute, and second segments',
    granularity: 'second',
  },
};

// States
export const Required: Story = {
  render: (args) => <DateTimePicker {...args} />,
  args: {
    name: 'required-datetime',
    label: 'Required field',
    description: 'This field is required',
    isRequired: true,
    granularity: 'minute',
  },
};

export const Disabled: Story = {
  render: (args) => <DateTimePicker {...args} />,
  args: {
    name: 'disabled-datetime',
    label: 'Disabled picker',
    defaultValue: now(getLocalTimeZone()),
    isDisabled: true,
    granularity: 'minute',
  },
};

export const ReadOnly: Story = {
  render: (args) => <DateTimePicker {...args} />,
  args: {
    name: 'readonly-datetime',
    label: 'Read-only picker',
    defaultValue: now(getLocalTimeZone()),
    isReadOnly: true,
    granularity: 'minute',
  },
};

export const WithError: Story = {
  render: (args) => <DateTimePicker {...args} />,
  args: {
    name: 'errored-datetime',
    label: 'With error',
    description: 'Shows error state styling',
    errorMessage: 'Please select a valid date and time',
    isInvalid: true,
    isRequired: true,
    defaultValue: new CalendarDateTime(2024, 1, 15, 10, 30),
    granularity: 'minute',
  },
};

export const NotResettable: Story = {
  render: (args) => <DateTimePicker {...args} />,
  args: {
    name: 'not-resettable',
    label: 'Non-resettable',
    description: 'No clear button available',
    defaultValue: now(getLocalTimeZone()),
    resettable: false,
    granularity: 'minute',
  },
};

// Validation Examples
const MinMaxExample = () => {
  const [value, setValue] = useState<DateValue | null>(null);
  const minValue = today(getLocalTimeZone());
  const maxValue = today(getLocalTimeZone()).add({ days: 30 });

  return (
    <div className="flex flex-col gap-4">
      <DateTimePicker
        name="min-max"
        label="Date range validation"
        description={`Select between ${minValue.toString()} and ${maxValue.toString()}`}
        value={value}
        onChange={setValue}
        minValue={minValue}
        maxValue={maxValue}
        granularity="day"
      />
      {value && (
        <div className="text-sm text-gray-600">
          Selected: {value.toString()}
        </div>
      )}
    </div>
  );
};

export const MinMaxValidation: Story = {
  render: MinMaxExample,
};

const UnavailableDatesExample = () => {
  const [value, setValue] = useState<DateValue | null>(null);

  return (
    <div className="flex flex-col gap-4">
      <DateTimePicker
        name="unavailable-dates"
        label="Unavailable weekends"
        description="Weekends are disabled"
        value={value}
        onChange={setValue}
        isDateUnavailable={(date) => isWeekend(date, 'en-US')}
        granularity="day"
      />
      {value && (
        <div className="text-sm text-gray-600">
          Selected: {value.toString()}
        </div>
      )}
    </div>
  );
};

export const UnavailableDates: Story = {
  render: UnavailableDatesExample,
};

const CustomValidationExample = () => {
  const [value, setValue] = useState<DateValue | null>(null);

  const validate = (date: DateValue | null) => {
    if (!date) return 'Date is required';
    if (date.day === 13) return 'Friday the 13th is not allowed!';
    return null;
  };

  return (
    <div className="flex flex-col gap-4">
      <DateTimePicker
        name="custom-validation"
        label="Custom validation"
        description="Try selecting the 13th of any month"
        value={value}
        onChange={setValue}
        validate={validate}
        granularity="day"
      />
      {value && (
        <div className="text-sm text-gray-600">
          Selected: {value.toString()}
        </div>
      )}
    </div>
  );
};

export const CustomValidation: Story = {
  render: CustomValidationExample,
};

// Auto Current Time Feature
const AutoCurrentTimeExample = () => {
  const [value, setValue] = useState<DateValue | null>(null);

  return (
    <div className="flex max-w-2xl flex-col gap-6 p-4">
      <div>
        <h3 className="mb-2 text-lg font-semibold">
          Auto Current Time Feature
        </h3>
        <DateTimePicker
          name="auto-current-time"
          label="Select a date"
          description="When no value exists and you select a date, current time is automatically set"
          value={value}
          onChange={setValue}
          granularity="minute"
        />
        {value && (
          <div className="mt-2 text-sm text-gray-600">
            Current value: {value.toString()}
          </div>
        )}
      </div>

      <div className="flex gap-2">
        <Button variant="neutral" onPress={() => setValue(null)}>
          Clear (test auto time)
        </Button>
        <Button
          variant="neutral"
          onPress={() => setValue(new CalendarDate(2024, 12, 25))}
        >
          Set Date Only
        </Button>
      </div>

      <div className="text-sm text-gray-600">
        <p>
          <strong>Test:</strong> Clear the value, then select a date from the
          calendar. Notice it automatically sets the current time instead of
          00:00.
        </p>
      </div>
    </div>
  );
};

export const AutoCurrentTime: Story = {
  render: AutoCurrentTimeExample,
};

// Form Integration
const FormExample = () => (
  <Form className="flex flex-col items-start gap-4">
    <DateTimePicker
      name="event-datetime"
      label="Event date and time"
      description="Select when your event will take place"
      isRequired
      granularity="minute"
    />
    <Button type="submit" variant="primary">
      Submit
    </Button>
  </Form>
);

export const FormIntegration: Story = {
  render: FormExample,
};

// Styling Example
export const CustomStyling: Story = {
  render: (args) => <DateTimePicker {...args} />,
  args: {
    name: 'custom-datetime',
    className: 'my-custom-datetime-picker',
    label: 'Custom styled picker',
    defaultValue: now(getLocalTimeZone()),
    granularity: 'minute',
  },
};
