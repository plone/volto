import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Form } from 'react-aria-components';
import { now, getLocalTimeZone } from '@internationalized/date';
import { Button } from '../Button/Button.quanta';
import { DateTimePicker } from './DateTimePicker.quanta';

function getCurrentUtcString(): string {
  return now(getLocalTimeZone()).toAbsoluteString();
}

// DateTimePicker Stories
const meta = {
  title: 'Quanta/DateTimePicker',
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

export const DateOnlyWithDefaultValue: Story = {
  render: (args) => <DateTimePicker {...args} />,
  args: {
    name: 'date-only',
    label: 'Date only',
    description: 'Date picker without time selection',
    granularity: 'day',
    defaultValue: '2025-05-17',
  },
};

export const WithDefaultValue: Story = {
  render: (args) => <DateTimePicker {...args} />,
  args: {
    name: 'datetime-default',
    label: 'With default value',
    description: 'Uncontrolled component with default UTC value',
    defaultValue: '2025-05-17T22:23:00+00:00', // UTC time
    granularity: 'minute',
  },
};

// UTC/Local Timezone Demo
const TimezoneExample = (args: any) => {
  const [value, setValue] = useState<string | null>('2024-01-15T15:00:00'); // 3 PM UTC

  return (
    <div className="flex max-w-2xl flex-col gap-4">
      <DateTimePicker {...args} value={value} onChange={setValue} />
      <div className="space-y-2 text-sm">
        <div className="rounded bg-blue-50 p-3">
          <strong>UTC Value (what the component receives/returns):</strong>
          <div className="font-mono">{value || 'null'}</div>
        </div>
        <div className="rounded bg-green-50 p-3">
          <strong>Your Local Timezone:</strong>
          <div>{getLocalTimeZone()}</div>
        </div>
        <div className="text-gray-600">
          <p>
            <strong>How it works:</strong> The component receives UTC time but
            displays it converted to your local timezone. When you change the
            time, it converts back to UTC for the onChange callback.
          </p>
        </div>
      </div>
      <div className="flex gap-2">
        <Button
          variant="neutral"
          onPress={() => setValue('2024-01-15T12:00:00+00:00')} // Noon UTC
        >
          Set to Noon UTC
        </Button>
        <Button
          variant="neutral"
          onPress={() => setValue('2024-01-15T00:00:00+00:00')} // Midnight UTC
        >
          Set to Midnight UTC
        </Button>
        <Button variant="neutral" onPress={() => setValue(null)}>
          Clear
        </Button>
      </div>
    </div>
  );
};

export const TimezoneConversion: Story = {
  render: TimezoneExample,
  args: {
    name: 'timezone-demo',
    label: 'UTC ↔ Local Timezone Demo',
    description: 'Shows how UTC values are converted to/from local timezone',
    granularity: 'minute',
  },
};

// Controlled vs Uncontrolled
const ControlledExample = (args: any) => {
  const [value, setValue] = useState<string | null>(
    '2024-01-15T10:00:00+00:00',
  );

  return (
    <div className="flex flex-col gap-4">
      <DateTimePicker {...args} value={value} onChange={setValue} />
      <div className="text-sm text-gray-600">
        Current UTC value: {value || 'null'}
      </div>
      <div className="flex gap-2">
        <Button
          variant="neutral"
          onPress={() => setValue(getCurrentUtcString())}
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
    description: 'Value managed by parent component (UTC format)',
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
    defaultValue: getCurrentUtcString(),
    isDisabled: true,
    granularity: 'minute',
  },
};

export const ReadOnly: Story = {
  render: (args) => <DateTimePicker {...args} />,
  args: {
    name: 'readonly-datetime',
    label: 'Read-only picker',
    defaultValue: getCurrentUtcString(),
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
    defaultValue: '2024-01-15T10:30:00',
    granularity: 'minute',
  },
};

export const NotResettable: Story = {
  render: (args) => <DateTimePicker {...args} />,
  args: {
    name: 'not-resettable',
    label: 'Non-resettable',
    description: 'No clear button available',
    defaultValue: getCurrentUtcString(),
    resettable: false,
    granularity: 'minute',
  },
};

const CustomValidationExample = () => {
  const [value, setValue] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (newValue: string | null) => {
    setValue(newValue);

    // Custom validation logic for string values
    if (!newValue) {
      setError('Date is required');
      return;
    }

    try {
      const date = new Date(newValue);
      if (date.getDate() === 13) {
        setError('Friday the 13th is not allowed!');
        return;
      }
      setError(null);
    } catch {
      setError('Invalid date format');
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <DateTimePicker
        name="custom-validation"
        label="Custom validation"
        description="Try selecting the 13th of any month"
        value={value}
        onChange={handleChange}
        errorMessage={error || undefined}
        isInvalid={!!error}
        granularity="day"
      />
      {value && <div className="text-sm text-gray-600">Selected: {value}</div>}
    </div>
  );
};

export const CustomValidation: Story = {
  render: CustomValidationExample,
};

// Auto Current Time Feature
const AutoCurrentTimeExample = () => {
  const [value, setValue] = useState<string | null>(null);

  return (
    <div className="flex max-w-2xl flex-col gap-6 p-4">
      <div>
        <h3 className="mb-2 text-lg font-semibold">
          Auto Current Time Feature
        </h3>
        <DateTimePicker
          name="auto-current-time"
          label="Select a date"
          description="When no value exists and you select a date, current local time is automatically set and converted to UTC"
          value={value}
          onChange={setValue}
          granularity="minute"
        />
        {value && (
          <div className="mt-2 text-sm text-gray-600">
            Current UTC value: {value}
          </div>
        )}
      </div>

      <div className="flex gap-2">
        <Button variant="neutral" onPress={() => setValue(null)}>
          Clear (test auto time)
        </Button>
        <Button
          variant="neutral"
          onPress={() => setValue('2024-12-25T00:00:00+00:00')}
        >
          Set Date Only (UTC)
        </Button>
      </div>

      <div className="text-sm text-gray-600">
        <p>
          <strong>Test:</strong> Clear the value, then select a date from the
          calendar. Notice it automatically sets the current local time and
          converts it to UTC.
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
      description="Select when your event will take place (stored as UTC)"
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
