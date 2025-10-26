import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Form } from 'react-aria-components';
import {
  CalendarDate,
  CalendarDateTime,
  today,
  getLocalTimeZone,
} from '@internationalized/date';
import { Button } from '../Button/Button.quanta';
import { DateField } from '../DateField/DateField.quanta';

const meta: Meta<typeof DateField> = {
  title: 'Quanta/DateField',
  component: DateField,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof DateField>;

export default meta;
type Story = StoryObj<typeof meta>;

// Basic Stories
export const Default: Story = {
  render: (args) => <DateField {...args} />,
  args: {},
};

export const WithDefaultValue: Story = {
  render: (args) => <DateField {...args} />,
  args: {
    defaultValue: new CalendarDate(2024, 12, 25),
    label: 'Christmas Date',
    description: 'Date input with default value (Christmas 2024)',
  },
};

// // Controlled Example
const ControlledExample = (args: any) => {
  const [value, setValue] = useState<CalendarDate | null>(
    today(getLocalTimeZone()),
  );

  return (
    <div className="flex flex-col gap-4">
      <DateField {...args} value={value} onChange={setValue} />

      <div className="text-sm text-gray-600">
        Current value: {value ? value.toString() : 'null'}
      </div>

      <div className="flex gap-2">
        <Button
          variant="neutral"
          onPress={() => setValue(new CalendarDate(2024, 12, 25))}
        >
          Set to Christmas
        </Button>
        <Button
          variant="neutral"
          onPress={() => setValue(new CalendarDate(2024, 1, 1))}
        >
          Set to New Year
        </Button>
        <Button
          variant="neutral"
          onPress={() => setValue(today(getLocalTimeZone()))}
        >
          Set to Today
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
    label: 'Controlled Date Input',
    description: 'Value managed by parent component',
  },
};

// // DateTime Example
const DateTimeExample = (args: any) => {
  const [value, setValue] = useState<CalendarDateTime | null>(
    new CalendarDateTime(2024, 6, 15, 14, 30),
  );

  return (
    <div className="flex flex-col gap-4">
      <DateField
        {...args}
        value={value}
        onChange={setValue}
        granularity="minute"
      />

      <div className="text-sm text-gray-600">
        Current value: {value ? value.toString() : 'null'}
      </div>

      <div className="flex gap-2">
        <Button
          variant="neutral"
          onPress={() => setValue(new CalendarDateTime(2024, 12, 25, 12, 0))}
        >
          Christmas Noon
        </Button>
        <Button
          variant="neutral"
          onPress={() => setValue(new CalendarDateTime(2024, 1, 1, 0, 0))}
        >
          New Year Midnight
        </Button>
        <Button variant="neutral" onPress={() => setValue(null)}>
          Clear
        </Button>
      </div>
    </div>
  );
};

export const DateTime: Story = {
  render: DateTimeExample,
  args: {
    label: 'Date & Time Input',
    description: 'Date input with time segments (granularity: minute)',
  },
};

// // States Example
const StatesExample = () => {
  const [value, setValue] = useState<CalendarDate | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (newValue: CalendarDate | null) => {
    setValue(newValue);

    // Custom validation
    if (newValue) {
      const today = new Date();
      const selectedDate = new Date(
        newValue.year,
        newValue.month - 1,
        newValue.day,
      );

      if (selectedDate < today) {
        setError('Past dates are not allowed');
      } else {
        setError(null);
      }
    } else {
      setError(null);
    }
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Required Field */}
      <DateField
        isRequired
        label="Required Date"
        description="This field is required"
      ></DateField>

      {/* Invalid Field */}
      <DateField
        isInvalid
        label="Invalid Date"
        description="This field is invalid"
      ></DateField>

      {/* Disabled Field */}
      <DateField
        isDisabled
        label="Disabled Date"
        description="This field is disabled"
        defaultValue={new CalendarDate(2024, 5, 17)}
      ></DateField>

      {/* Read-only Field */}
      <DateField
        label="Read-only Date"
        description="This field is read-only"
        isReadOnly
        defaultValue={new CalendarDate(2024, 5, 17)}
      ></DateField>

      {/* Invalid Field with Custom Validation */}
      <DateField
        label="Future Dates Only"
        description="Only future dates are allowed"
        value={value}
        onChange={handleChange}
        isInvalid={!!error}
        isRequired
      ></DateField>

      {value && !error && (
        <div className="text-sm text-green-600">
          Selected date: {value.toString()} ✓
        </div>
      )}
    </div>
  );
};

export const States: Story = {
  render: StatesExample,
};

// // Form Integration
const FormExample = () => {
  return (
    <Form>
      <DateField
        name="birth-date"
        label="Birth Date"
        description="Enter your date of birth"
        isRequired
        className="flex flex-col gap-4"
      ></DateField>

      <Button type="submit" variant="primary">
        Submit Form
      </Button>
    </Form>
  );
};

export const FormIntegration: Story = {
  render: FormExample,
};

// Custom Styling
export const CustomStyling: Story = {
  render: (args) => (
    <DateField
      label="Custom Styled Date Input"
      description="Date input with custom styling"
      className={`
        rounded-lg border-2 border-purple-300 bg-purple-50 px-4 py-2
        focus-within:border-purple-500
      `}
    ></DateField>
  ),
  args: {},
};
