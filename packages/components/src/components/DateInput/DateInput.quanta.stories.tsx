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
import { Label, Description, FieldError } from '../Field/Field.quanta';
import { DateInput } from './DateInput.quanta';
import { DateField } from '../DateField/DateField.quanta';

// DateInput Stories
const meta = {
  title: 'Quanta/DateInput',
  component: DateInput,
  parameters: {
    layout: 'centered',
    backgrounds: { disable: true },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof DateInput>;

export default meta;
type Story = StoryObj<typeof meta>;

// Basic Stories
export const Default: Story = {
  render: (args) => <DateInput {...args} />,
  args: {},
};

export const WithDefaultValue: Story = {
  render: (args) => (
    <DateField defaultValue={new CalendarDate(2024, 12, 25)}>
      <Label>Christmas Date</Label>
      <DateInput {...args} />
      <Description>Date input with default value (Christmas 2024)</Description>
    </DateField>
  ),
  args: {},
};

// Controlled Example
const ControlledExample = (args: any) => {
  const [value, setValue] = useState<CalendarDate | null>(
    today(getLocalTimeZone()),
  );

  return (
    <div className="flex flex-col gap-4">
      <DateField value={value} onChange={setValue}>
        <Label>Controlled Date Input</Label>
        <DateInput {...args} />
        <Description>Value managed by parent component</Description>
      </DateField>

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
  args: {},
};

// DateTime Example
const DateTimeExample = (args: any) => {
  const [value, setValue] = useState<CalendarDateTime | null>(
    new CalendarDateTime(2024, 6, 15, 14, 30),
  );

  return (
    <div className="flex flex-col gap-4">
      <DateField value={value} onChange={setValue} granularity="minute">
        <Label>Date & Time Input</Label>
        <DateInput {...args} />
        <Description>
          Date input with time segments (granularity: minute)
        </Description>
      </DateField>

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
  args: {},
};

// States Example
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
      <DateField isRequired>
        <Label>Required Date</Label>
        <DateInput />
        <Description>This field is required</Description>
      </DateField>

      {/* Invalid Field */}
      <DateField isInvalid>
        <Label>Invalid Date</Label>
        <DateInput />
        <Description>This field is invalid</Description>
      </DateField>

      {/* Disabled Field */}
      <DateField isDisabled defaultValue={new CalendarDate(2024, 5, 17)}>
        <Label>Disabled Date</Label>
        <DateInput />
        <Description>This field is disabled</Description>
      </DateField>

      {/* Read-only Field */}
      <DateField isReadOnly defaultValue={new CalendarDate(2024, 5, 17)}>
        <Label>Read-only Date</Label>
        <DateInput />
        <Description>This field is read-only</Description>
      </DateField>

      {/* Invalid Field with Custom Validation */}
      <DateField
        value={value}
        onChange={handleChange}
        isInvalid={!!error}
        isRequired
      >
        <Label>Future Dates Only</Label>
        <DateInput />
        <Description>Only future dates are allowed</Description>
        {error && <FieldError>{error}</FieldError>}
      </DateField>

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

// Form Integration
const FormExample = () => {
  return (
    <Form>
      <DateField name="birth-date" isRequired className="flex flex-col gap-4">
        <Label>Birth Date</Label>
        <DateInput />
        <Description>Enter your date of birth</Description>
        <FieldError />
      </DateField>

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
    <DateField>
      <Label>Custom Styled Date Input</Label>
      <DateInput
        {...args}
        className={`
          rounded-lg border-2 border-purple-300 bg-purple-50 px-4 py-2
          focus-within:border-purple-500
        `}
      />
      <Description>Date input with custom styling</Description>
    </DateField>
  ),
  args: {},
};
