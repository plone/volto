import React from 'react';
import { Form } from 'react-aria-components';
import { SearchField } from './SearchField.quanta';
import { Button } from '../Button/Button.quanta';
import type { Meta, StoryObj } from '@storybook/react-vite';

const meta: Meta<typeof SearchField> = {
  title: 'Quanta/SearchField',
  component: SearchField,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  args: {
    label: 'Search',
  },
} satisfies Meta<typeof SearchField>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args: any) => <SearchField {...args} />,
  args: {
    label: 'Search',
    placeholder: 'Type to search...',
  },
};

export const Validation = (args: any) => (
  <Form className="flex flex-col items-start gap-2">
    <SearchField {...args} />
    <Button type="submit">Submit</Button>
  </Form>
);

Validation.args = {
  isRequired: true,
};
