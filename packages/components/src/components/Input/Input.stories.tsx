import InputComponent from './Input';

import type { Meta, StoryObj } from '@storybook/react';

// More on how to set up stories at: https://storybook.js.org/docs/7.0/react/writing-stories/introduction
const meta = {
  title: 'Input',
  component: InputComponent,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div style={{ width: '400px' }}>
        <Story />
      </div>
    ),
  ],
  argTypes: {
    // controlled value prop
    value: {
      control: {
        disable: true,
      },
    },
  },
} satisfies Meta<typeof InputComponent>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/7.0/react/writing-stories/args
export const Default: Story = {
  // render: (args) => <InputRender {...args} />,
  args: {
    name: 'field-empty',
    title: 'field 1 title',
    description: 'Optional help text',
    placeholder: 'Type something…',
  },
};

export const Required: Story = {
  args: {
    ...Default.args,
    name: 'field-required',
    isRequired: true,
  },
};

export const Filled: Story = {
  args: {
    ...Default.args,
    name: 'field-filled',
    title: 'Filled field title',
    value: 'Filled with value A',
    isRequired: true,
  },
};

export const Errored: Story = {
  args: {
    ...Default.args,
    name: 'field-errored',
    title: 'Errored field title',
    value: 'Filled with value A',
    error: ['This is the error'],
    isInvalid: true,
    isRequired: true,
  },
};

export const Disabled: Story = {
  args: {
    ...Default.args,
    name: 'field-disabled',
    title: 'Disabled field title',
    isDisabled: true,
  },
};
