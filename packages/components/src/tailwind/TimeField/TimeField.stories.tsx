import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Form } from 'react-aria-components';
import { Time } from '@internationalized/date';
import { Button } from '../Button/Button';
import { TimeField } from './TimeField';

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
