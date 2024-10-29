import React from 'react';
import { Select, SelectItem } from './Select';
import type { Meta, StoryObj } from '@storybook/react';

import '../../styles/basic/Select.css';

export interface SelectItemObject {
  label: string;
  value: string;
}

// More on how to set up stories at: https://storybook.js.org/docs/7.0/react/writing-stories/introduction
const meta = {
  title: 'Forms/Select',
  component: Select,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div style={{ width: '400px' }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Select>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Select gets a fixed children as JSX
 */
export const Default: Story = {
  args: {
    name: 'empty',
    label: 'field 1 title',
    description: 'Optional help text',
    placeholder: 'Select...',
    children: (
      <>
        <SelectItem>Hello</SelectItem>
        <SelectItem>Lorem Ipsum</SelectItem>
      </>
    ),
  },
};

/**
 * Select renders options via render props `(item)=> React.ReactNode`
 */
export const Items: Story = {
  args: {
    name: 'field-empty',
    label: 'field 1 title',
    description: 'Optional help text',
    placeholder: 'Select...',
    items: [
      { label: '1', value: 'Aerospace' },
      { label: '2', value: 'Mechanical' },
      { label: '3', value: 'Civil' },
      { label: '4', value: 'Biomedical' },
      { label: '5', value: 'Nuclear' },
      { label: '6', value: 'Industrial' },
      { label: '7', value: 'Chemical' },
      { label: '8', value: 'Agricultural' },
      { label: '9', value: 'Electrical' },
      { label: '10', value: 'Telco' },
    ],
    children: null,
  },
};

export const LotsOfItems: Story = {
  args: {
    name: 'field-empty',
    label: 'field 1 title',
    description: 'Optional help text',
    placeholder: 'Select...',
    items: [
      { label: '1', value: 'Aerospace' },
      { label: '2', value: 'Mechanical' },
      { label: '3', value: 'Civil' },
      { label: '4', value: 'Biomedical' },
      { label: '5', value: 'Nuclear' },
      { label: '6', value: 'Industrial' },
      { label: '7', value: 'Chemical' },
      { label: '8', value: 'Agricultural' },
      { label: '9', value: 'Electrical' },
      { label: '10', value: 'Telco' },
      { label: '11', value: 'Aerospace' },
      { label: '12', value: 'Mechanical' },
      { label: '13', value: 'Civil' },
      { label: '14', value: 'Biomedical' },
      { label: '15', value: 'Nuclear' },
      { label: '16', value: 'Industrial' },
      { label: '17', value: 'Chemical' },
      { label: '18', value: 'Agricultural' },
      { label: '19', value: 'Electrical' },
      { label: '20', value: 'Telco' },
      { label: '21', value: 'Aerospace' },
      { label: '22', value: 'Mechanical' },
      { label: '23', value: 'Civil' },
      { label: '24', value: 'Biomedical' },
      { label: '25', value: 'Nuclear' },
      { label: '26', value: 'Industrial' },
      { label: '27', value: 'Chemical' },
      { label: '28', value: 'Agricultural' },
      { label: '29', value: 'Electrical' },
      { label: '30', value: 'Telco' },
    ],
    children: null,
  },
};

export const Required: Story = {
  ...Items,
  args: {
    ...Items.args,
    name: 'field-required',
    isRequired: true,
  },
};

export const Filled: Story = {
  ...Items,
  args: {
    ...Items.args,
    name: 'field-filled',
    label: 'Filled field title',
    defaultSelectedKey: '10',
    isRequired: true,
  },
};

export const Errored: Story = {
  ...Items,
  args: {
    ...Items.args,
    name: 'field-errored',
    label: 'Errored field title',
    defaultSelectedKey: '10',
    errorMessage: 'This is the error',
    isInvalid: true,
    isRequired: true,
  },
};

export const Disabled: Story = {
  ...Items,
  args: {
    ...Items.args,
    name: 'field-disabled',
    label: 'Disabled field title',
    isDisabled: true,
  },
};
