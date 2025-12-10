import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Form } from 'react-aria-components';
import { Button } from '../Button/Button.quanta';
import { DatePicker } from './DatePicker.quanta';

// DatePicker Stories
const meta = {
  title: 'Quanta/DatePicker',
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

// Basic Stories
export const Default: Story = {
  render: (args) => <DatePicker {...args} />,
  args: {
    name: 'date',
    label: 'Select date',
    description: 'Date picker for selecting dates only',
  },
};

export const WithDefaultValue: Story = {
  render: (args) => <DatePicker {...args} />,
  args: {
    name: 'date-default',
    label: 'Birth date',
    description: 'Date picker with default value',
    defaultValue: '2025-05-17',
  },
};

// Controlled Example
const ControlledExample = (args: any) => {
  const [value, setValue] = useState<string | null>('2024-01-15');

  return (
    <div className="flex flex-col gap-4">
      <DatePicker {...args} value={value} onChange={setValue} />
      <div className="text-sm text-gray-600">
        Current value: {value || 'null'}
      </div>
      <div className="flex gap-2">
        <Button variant="neutral" onPress={() => setValue('2024-12-25')}>
          Set to Christmas
        </Button>
        <Button variant="neutral" onPress={() => setValue('2024-01-01')}>
          Set to New Year
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
    name: 'date-controlled',
    label: 'Controlled date picker',
    description: 'Value managed by parent component',
  },
};

// States
export const Required: Story = {
  render: (args) => <DatePicker {...args} />,
  args: {
    name: 'required-date',
    label: 'Required date',
    description: 'This field is required',
    isRequired: true,
  },
};

export const Disabled: Story = {
  render: (args) => <DatePicker {...args} />,
  args: {
    name: 'disabled-date',
    label: 'Disabled picker',
    defaultValue: '2024-05-17',
    isDisabled: true,
  },
};

export const ReadOnly: Story = {
  render: (args) => <DatePicker {...args} />,
  args: {
    name: 'readonly-date',
    label: 'Read-only picker',
    defaultValue: '2024-05-17',
    isReadOnly: true,
  },
};

export const WithError: Story = {
  render: (args) => <DatePicker {...args} />,
  args: {
    name: 'errored-date',
    label: 'With error',
    description: 'Shows error state styling',
    errorMessage: 'Please select a valid date',
    isInvalid: true,
    isRequired: true,
    defaultValue: '2024-01-15',
  },
};

export const NotResettable: Story = {
  render: (args) => <DatePicker {...args} />,
  args: {
    name: 'not-resettable',
    label: 'Non-resettable',
    description: 'No clear button available',
    defaultValue: '2024-05-17',
    resettable: false,
  },
};

// Custom Validation Example
const CustomValidationExample = () => {
  const [value, setValue] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (newValue: string | null) => {
    setValue(newValue);

    // Custom validation logic for date values
    if (!newValue) {
      setError('Date is required');
      return;
    }

    try {
      const date = new Date(newValue);
      const dayOfWeek = date.getDay();

      // Don't allow weekends
      if (dayOfWeek === 0 || dayOfWeek === 6) {
        setError('Weekend dates are not allowed');
        return;
      }

      // Don't allow dates in the past
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      if (date < today) {
        setError('Past dates are not allowed');
        return;
      }

      setError(null);
    } catch {
      setError('Invalid date format');
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <DatePicker
        name="custom-validation"
        label="Business date picker"
        description="Only future weekdays are allowed"
        value={value}
        onChange={handleChange}
        errorMessage={error || undefined}
        isInvalid={!!error}
      />
      {value && <div className="text-sm text-gray-600">Selected: {value}</div>}
    </div>
  );
};

export const CustomValidation: Story = {
  render: CustomValidationExample,
};

// Form Integration
const FormExample = () => (
  <Form className="flex flex-col items-start gap-4">
    <DatePicker
      name="event-date"
      label="Event date"
      description="Select the date for your event"
      isRequired
    />
    <DatePicker
      name="deadline"
      label="Deadline"
      description="Optional deadline date"
    />
    <Button type="submit" variant="primary">
      Submit
    </Button>
  </Form>
);

export const FormIntegration: Story = {
  render: FormExample,
};

// Date Range Example (using two DatePickers)
const DateRangeExample = () => {
  const [startDate, setStartDate] = useState<string | null>(null);
  const [endDate, setEndDate] = useState<string | null>(null);

  return (
    <div className="flex flex-col gap-4">
      <div
        className={`
          grid grid-cols-1 gap-4
          md:grid-cols-2
        `}
      >
        <DatePicker
          name="start-date"
          label="Start date"
          description="Select start date"
          value={startDate}
          onChange={setStartDate}
        />
        <DatePicker
          name="end-date"
          label="End date"
          description="Select end date"
          value={endDate}
          onChange={setEndDate}
        />
      </div>
      {startDate && endDate && (
        <div className="rounded bg-gray-50 p-3 text-sm text-gray-600">
          <strong>Selected range:</strong> {startDate} to {endDate}
        </div>
      )}
      <div className="flex gap-2">
        <Button
          variant="neutral"
          onPress={() => {
            setStartDate('2024-06-01');
            setEndDate('2024-06-30');
          }}
        >
          Set June 2024
        </Button>
        <Button
          variant="neutral"
          onPress={() => {
            setStartDate(null);
            setEndDate(null);
          }}
        >
          Clear both
        </Button>
      </div>
    </div>
  );
};

export const DateRange: Story = {
  render: DateRangeExample,
};
