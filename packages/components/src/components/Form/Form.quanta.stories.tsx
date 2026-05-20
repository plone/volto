import React from 'react';
import { Form } from './Form.quanta';
import { Button } from '../Button/Button.quanta';
import { TextField } from '../TextField/TextField.quanta';

import type { Meta, StoryObj } from '@storybook/react-vite';

const meta = {
  title: 'Quanta/Forms/Form',
  component: Form,
  parameters: {
    layout: 'fullscreen',
  },
  decorators: [
    (Story) => (
      <div className="flex justify-center bg-white p-8">{Story()}</div>
    ),
  ],
  tags: ['autodocs'],
} satisfies Meta<typeof Form>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args: any) => (
    <Form {...args}>
      <TextField name="email" type="email" isRequired label="Email" />
      <Button type="submit" accent variant="primary">
        Submit
      </Button>
    </Form>
  ),
  args: {},
};
