import { Form } from './Form';
import {
  Button,
  FieldError,
  Input,
  Label,
  TextField,
} from 'react-aria-components';

import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  title: 'Widgets/Form',
  component: Form,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Form>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args: any) => (
    <Form {...args}>
      <TextField name="email" type="email" isRequired>
        <Label>Email</Label>
        <Input />
        <FieldError />
      </TextField>
      <Button type="submit">Submit</Button>
    </Form>
  ),
  args: {},
};
