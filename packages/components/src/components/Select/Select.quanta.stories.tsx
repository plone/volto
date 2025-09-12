import React, { useState } from 'react';
import { SelectWidget, type Option, type SelectProps } from './Select.quanta';
import { type Key } from 'react-aria-components';

const fruits: Option[] = [
  { id: 'apple', name: 'Apple' },
  { id: 'banana', name: 'Banana' },
  { id: 'orange', name: 'Orange' },
  { id: 'strawberry', name: 'Strawberry' },
  { id: 'blueberry', name: 'Blueberry' },
  { id: 'raspberry', name: 'Raspberry' },
  { id: 'grape', name: 'Grape' },
  { id: 'watermelon', name: 'Watermelon' },
  { id: 'pineapple', name: 'Pineapple' },
  { id: 'mango', name: 'Mango' },
];

export default {
  title: 'Quanta/Select',
  component: SelectWidget,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    items: {
      control: false,
      description: 'The list of available options to display in the dropdown.',
    },
    label: { control: 'text', description: 'The label of the select field' },
    placeholder: {
      control: 'text',
      description: 'Placeholder text displayed when no option is selected.',
    },
    description: {
      control: 'text',
      description: 'Additional helper text displayed below the field.',
    },
    errorMessage: {
      control: 'text',
      description: 'Error message to display below the field.',
    },
    isDisabled: {
      control: 'boolean',
      description: 'Whether the field is disabled.',
    },
    isRequired: {
      control: 'boolean',
      description: 'Whether the field is required.',
    },
    onChange: {
      action: 'selection-changed',
      description: 'Callback fired when selection changes.',
    },
  },
};

export const Default = (args: SelectProps<Option>) => {
  return (
    <div className="w-full max-w-[600px]">
      <SelectWidget {...args} />
    </div>
  );
};

Default.args = {
  label: 'Favorite Fruit',
  placeholder: 'Choose a fruit...',
  items: fruits,
  onChange: (value: Key | null) => console.log('Selected:', value),
} as Partial<SelectProps<Option>>;

export const WithDefaultValue = Default.bind({});

WithDefaultValue.args = {
  ...Default.args,
  label: 'Fruit with Default',
  defaultSelectedKey: 'banana',
};

export const Disabled = Default.bind({});

Disabled.args = {
  ...Default.args,
  label: 'Disabled Select',
  isDisabled: true,
  defaultSelectedKey: 'apple',
};

export const Required = Default.bind({});

Required.args = {
  ...Default.args,
  label: 'Required Fruit',
  description: 'This field is required',
  isRequired: true,
};

export const WithError = Default.bind({});

WithError.args = {
  ...Default.args,
  label: 'Select with Error',
  errorMessage: 'Please select a fruit',
};

export const Controlled = (args: SelectProps<Option>) => {
  const [selectedKey, setSelectedKey] = useState<Key | null>('orange');

  const handleChange = (value: Key | null) => {
    setSelectedKey(value);
  };

  return (
    <div className="w-full max-w-[600px] space-y-4">
      <SelectWidget
        {...args}
        selectedKey={selectedKey}
        onChange={handleChange}
      />
      <div className="text-sm">
        <strong>Currently Selected:</strong>
        <div className="mt-1 rounded border bg-gray-50 p-2">
          {selectedKey ? (
            <span className="inline-block rounded bg-blue-100 px-2 py-1 text-xs text-blue-800">
              {fruits.find((f) => f.id === selectedKey)?.name}
            </span>
          ) : (
            <span className="text-gray-500">Nothing selected</span>
          )}
        </div>
      </div>
    </div>
  );
};

Controlled.args = {
  ...Default.args,
  label: 'Controlled Select',
  description: 'This demonstrates controlled state with onChange',
};
