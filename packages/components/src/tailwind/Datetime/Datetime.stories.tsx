import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Form } from 'react-aria-components';
import { Button } from '../Button/Button';
import { DatePicker, DateTimePicker } from './Datetime';

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

// Basic DatePicker Stories
export const Default: Story = {
  args: {
    name: 'date',
    label: 'Select date',
    description: '',
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
  },
};

// DateTimePicker Stories
const dateTimeMeta = {
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

type DateTimeStory = StoryObj<typeof dateTimeMeta>;

export const DateTimeDefault: DateTimeStory = {
  render: (args) => <DateTimePicker {...args} />,
  args: {
    name: 'datetime',
    label: 'Select date and time',
    description:
      'Choose both date and time - time is automatically set to current time when date is selected',
  },
};

export const DateTimeWithDefaultValue: DateTimeStory = {
  render: (args) => <DateTimePicker {...args} />,
  args: {
    name: 'datetime-default',
    label: 'Date time with default value',
    description: 'Uncontrolled component with default value',
    defaultValue: new Date(2024, 11, 25, 14, 30), // December 25, 2024, 14:30
  },
};

const DateTimeControlledComponent = (args: any) => {
  const [value, setValue] = useState<Date | null>(new Date(2024, 0, 15, 10, 0)); // January 15, 2024, 10:00

  return (
    <div className="flex flex-col gap-4">
      <DateTimePicker {...args} value={value} onChange={setValue} />
      <div className="text-sm text-gray-600">
        Current value: {value ? value.toLocaleString() : 'null'}
      </div>
      <Button variant="neutral" onPress={() => setValue(new Date())}>
        Set to now
      </Button>
      <Button variant="neutral" onPress={() => setValue(null)}>
        Clear
      </Button>
    </div>
  );
};

export const DateTimeControlled: DateTimeStory = {
  render: DateTimeControlledComponent,
  args: {
    name: 'datetime-controlled',
    label: 'Controlled date time picker',
    description: 'Controlled component - value managed by parent',
  },
};

export const DateTimeRequired: DateTimeStory = {
  render: (args) => <DateTimePicker {...args} />,
  args: {
    name: 'required-datetime',
    label: 'Required date and time',
    description: 'This field is required',
    isRequired: true,
  },
};

export const DateOnly: DateTimeStory = {
  render: (args) => <DateTimePicker {...args} />,
  args: {
    name: 'date-only',
    label: 'Date only',
    description: 'Date picker without time selection',
    dateOnly: true,
  },
};

export const DateOnlyWidget: DateTimeStory = {
  render: (args) => <DateTimePicker {...args} />,
  args: {
    name: 'date-widget',
    label: 'Date widget',
    description: 'Using widget prop to set date-only mode',
    widget: 'date',
  },
};

export const DateTimeDisabled: DateTimeStory = {
  render: (args) => <DateTimePicker {...args} />,
  args: {
    name: 'disabled-datetime',
    label: 'Disabled date and time picker',
    defaultValue: new Date(),
    isDisabled: true,
  },
};

export const DateTimeErrored: DateTimeStory = {
  render: (args) => <DateTimePicker {...args} />,
  args: {
    name: 'errored-datetime',
    label: 'Date time with error',
    description: 'Both date and time fields show error state (red border)',
    errorMessage: 'Please select a valid date and time',
    isInvalid: true,
    isRequired: true,
    defaultValue: new Date(2024, 0, 15, 10, 30), // Show with value to see both fields
  },
};

export const DateTimeNotResettable: DateTimeStory = {
  render: (args) => <DateTimePicker {...args} />,
  args: {
    name: 'not-resettable',
    label: 'Non-resettable date time picker',
    description: 'No clear button available',
    defaultValue: new Date(),
    resettable: false,
  },
};

export const DateTimeReadOnly: DateTimeStory = {
  render: (args) => <DateTimePicker {...args} />,
  args: {
    name: 'readonly-datetime',
    label: 'Read-only date time picker',
    defaultValue: new Date(),
    isReadOnly: true,
  },
};

// Form Examples
export const Example = (args: any) => <DatePicker {...args} />;

export const DateTimeExample = (args: any) => <DateTimePicker {...args} />;

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

export const DateTimeValidation = (args: any) => (
  <Form className="flex flex-col items-start gap-4">
    <DateTimePicker {...args} />
    <Button type="submit" variant="primary">
      Submit
    </Button>
  </Form>
);

DateTimeValidation.args = {
  name: 'validation-datetime',
  label: 'Event date and time',
  description: 'Select when your event will take place',
  isRequired: true,
};

// Interactive Examples
export const InteractiveExample = () => {
  const [uncontrolledValue, setUncontrolledValue] = useState<Date | null>(null);
  const [controlledValue, setControlledValue] = useState<Date | null>(
    new Date(),
  );

  return (
    <div className="flex max-w-2xl flex-col gap-8 p-4">
      <div>
        <h3 className="mb-4 text-lg font-semibold">Uncontrolled Component</h3>
        <DateTimePicker
          name="uncontrolled"
          label="Uncontrolled date time picker"
          description="Manages its own state internally"
          defaultValue={new Date(2024, 5, 15, 9, 30)}
          onChange={(date) => setUncontrolledValue(date)}
        />
        <div className="mt-2 text-sm text-gray-600">
          Last onChange value:{' '}
          {uncontrolledValue ? uncontrolledValue.toLocaleString() : 'null'}
        </div>
      </div>

      <div>
        <h3 className="mb-4 text-lg font-semibold">Controlled Component</h3>
        <DateTimePicker
          name="controlled"
          label="Controlled date time picker"
          description="Value controlled by parent component"
          value={controlledValue}
          onChange={setControlledValue}
        />
        <div className="mt-2 text-sm text-gray-600">
          Current value:{' '}
          {controlledValue ? controlledValue.toLocaleString() : 'null'}
        </div>
        <div className="mt-2 flex gap-2">
          <Button
            variant="neutral"
            onPress={() => setControlledValue(new Date())}
          >
            Set to now
          </Button>
          <Button
            variant="neutral"
            onPress={() => setControlledValue(new Date(2024, 11, 31, 23, 59))}
          >
            Set to New Year&apos;s Eve
          </Button>
          <Button variant="neutral" onPress={() => setControlledValue(null)}>
            Clear
          </Button>
        </div>
      </div>

      <div>
        <h3 className="mb-4 text-lg font-semibold">Date Only Mode</h3>
        <DateTimePicker
          name="date-only-demo"
          label="Date only picker"
          description="Only date selection, no time input"
          dateOnly={true}
          defaultValue={new Date()}
        />
      </div>
    </div>
  );
};

// Styling Examples
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

export const DateTimeWithCustomClassName: DateTimeStory = {
  render: (args) => <DateTimePicker {...args} />,
  args: {
    name: 'custom-datetime',
    className: 'my-custom-datetime-picker',
    label: 'Custom styled date time picker',
    defaultValue: new Date(),
  },
};

// Comparison Example
export const ComparisonExample = () => (
  <div className="flex flex-col gap-6 p-4">
    <div>
      <h3 className="mb-2 text-lg font-semibold">Date Only</h3>
      <DatePicker
        name="date-comparison"
        label="Simple date picker"
        description="Basic date selection"
      />
    </div>

    <div>
      <h3 className="mb-2 text-lg font-semibold">Date & Time</h3>
      <DateTimePicker
        name="datetime-comparison"
        label="Date and time picker"
        description="Full date and time selection"
      />
    </div>

    <div>
      <h3 className="mb-2 text-lg font-semibold">
        Date Only (via dateOnly prop)
      </h3>
      <DateTimePicker
        name="dateonly-comparison"
        label="Date only picker"
        description="Date time picker in date-only mode"
        dateOnly={true}
      />
    </div>
  </div>
);

// Error State Example
export const ErrorStateExample = () => {
  const [hasError, setHasError] = useState(true);
  const [value, setValue] = useState<Date | null>(
    new Date(2024, 0, 15, 14, 30),
  );

  return (
    <div className="flex max-w-2xl flex-col gap-6 p-4">
      <div>
        <h3 className="mb-2 text-lg font-semibold">Error State Demo</h3>
        <DateTimePicker
          name="error-demo"
          label="Date and time with error state"
          description="Toggle error state to see both fields change color"
          value={value}
          onChange={setValue}
          isInvalid={hasError}
          errorMessage={
            hasError
              ? 'Both date and time fields show error styling'
              : undefined
          }
          isRequired
        />
      </div>

      <div className="flex gap-2">
        <Button
          variant={hasError ? 'primary' : 'neutral'}
          onPress={() => setHasError(!hasError)}
        >
          {hasError ? 'Remove Error' : 'Add Error'}
        </Button>
        <Button variant="neutral" onPress={() => setValue(new Date())}>
          Set to Now
        </Button>
        <Button variant="neutral" onPress={() => setValue(null)}>
          Clear Value
        </Button>
      </div>

      <div className="text-sm text-gray-600">
        <p>
          <strong>Note:</strong> When isInvalid=true, both the date input and
          time input will show error styling (red border).
        </p>
      </div>
    </div>
  );
};

// Timezone Example
export const TimezoneExample = () => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  return (
    <div className="flex max-w-2xl flex-col gap-6 p-4">
      <div>
        <h3 className="mb-2 text-lg font-semibold">
          Timezone Aware Date Time Picker
        </h3>
        <DateTimePicker
          name="timezone-demo"
          label="Select a date"
          description="When you select a date, the current time will be set using the correct timezone"
          value={selectedDate}
          onChange={setSelectedDate}
        />
      </div>

      {selectedDate && (
        <div className="rounded-lg bg-gray-50 p-4">
          <h4 className="mb-2 font-semibold">Selected Date Information:</h4>
          <div className="space-y-1 text-sm">
            <div>
              <strong>Local String:</strong> {selectedDate.toLocaleString()}
            </div>
            <div>
              <strong>ISO String:</strong> {selectedDate.toISOString()}
            </div>
            <div>
              <strong>Timezone Offset:</strong>{' '}
              {selectedDate.getTimezoneOffset()} minutes
            </div>
            <div>
              <strong>Current Browser Timezone:</strong>{' '}
              {Intl.DateTimeFormat().resolvedOptions().timeZone}
            </div>
          </div>
        </div>
      )}

      <div className="text-sm text-gray-600">
        <p>
          <strong>Note:</strong> When you select a date, the time is
          automatically set to the current time in your local timezone using
          react-aria&apos;s timezone utilities.
        </p>
      </div>
    </div>
  );
};
