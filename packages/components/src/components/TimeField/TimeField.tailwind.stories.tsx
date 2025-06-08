import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Form } from 'react-aria-components';
import { Time } from '@internationalized/date';
import { Button } from '../Button/Button.tailwind';
import { TimeField } from './TimeField.tailwind';

// TimeField Stories
const meta = {
  title: 'Tailwind/TimeField',
  component: TimeField,
  parameters: {
    layout: 'centered',
    backgrounds: { disable: true },
  },
  tags: ['autodocs'],
  args: {
    label: 'Time',
  },
} satisfies Meta<typeof TimeField>;

export default meta;
type Story = StoryObj<typeof meta>;

// Basic Stories
export const Default: Story = {
  render: (args) => <TimeField {...args} />,
  args: {
    name: 'time',
    label: 'Select time',
    description: 'Basic time field for selecting hours and minutes',
  },
};

export const WithDefaultValue: Story = {
  render: (args) => <TimeField {...args} />,
  args: {
    name: 'time-default',
    label: 'Meeting time',
    description: 'Time field with default value',
    defaultValue: new Time(14, 30), // 2:30 PM
  },
};

// Controlled Example
const ControlledExample = (args: any) => {
  const [value, setValue] = useState<Time | null>(new Time(9, 0)); // 9:00 AM

  return (
    <div className="flex flex-col gap-4">
      <TimeField {...args} value={value} onChange={setValue} />
      <div className="text-sm text-gray-600">
        Current value: {value ? value.toString() : 'null'}
      </div>
      <div className="flex gap-2">
        <Button
          variant="neutral"
          onPress={() => setValue(new Time(12, 0))} // Noon
        >
          Set to Noon
        </Button>
        <Button
          variant="neutral"
          onPress={() => setValue(new Time(18, 30))} // 6:30 PM
        >
          Set to 6:30 PM
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
    name: 'time-controlled',
    label: 'Controlled time field',
    description: 'Value managed by parent component',
  },
};

// States Example
const StatesExample = () => {
  const [value, setValue] = useState<Time | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (newValue: Time | null) => {
    setValue(newValue);

    // Custom validation - only allow business hours (9 AM to 5 PM)
    if (newValue) {
      const totalMinutes = newValue.hour * 60 + newValue.minute;
      const businessStart = 9 * 60; // 9:00 AM
      const businessEnd = 17 * 60; // 5:00 PM

      if (totalMinutes < businessStart || totalMinutes >= businessEnd) {
        setError('Please select a time during business hours (9 AM - 5 PM)');
      } else {
        setError(null);
      }
    } else {
      setError(null);
    }
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Invalid Field */}
      <TimeField
        name="invalid-time"
        label="Invalid Time"
        description="This field is invalid"
        isInvalid
      />

      {/* Required Field */}
      <TimeField
        name="required-time"
        label="Required Time"
        description="This field is required"
        isRequired
      />

      {/* Disabled Field */}
      <TimeField
        name="disabled-time"
        label="Disabled Time"
        description="This field is disabled"
        defaultValue={new Time(14, 30)}
        isDisabled
      />

      {/* Read-only Field */}
      <TimeField
        name="readonly-time"
        label="Read-only Time"
        description="This field is read-only"
        defaultValue={new Time(10, 15)}
        isReadOnly
      />

      {/* Invalid Field with Custom Validation */}
      <TimeField
        name="business-hours"
        label="Business Hours Only"
        description="Only business hours (9 AM - 5 PM) are allowed"
        value={value}
        onChange={handleChange}
        errorMessage={error || undefined}
        isInvalid={!!error}
        isRequired
      />

      {value && !error && (
        <div className="text-sm text-green-600">
          Selected time: {value.toString()} ✓
        </div>
      )}
    </div>
  );
};

export const States: Story = {
  render: StatesExample,
};
