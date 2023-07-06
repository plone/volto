import React from 'react';
import InputComponent from './Input';

const Input = (args) => {
  const [value, setValue] = React.useState(args.value ?? '');
  const onChange = (block, value) => {
    args.onChange({ value });
    setValue(value);
  };

  return <InputComponent {...args} onChange={onChange} value={value} />;
};

export const Default = Input.bind({});
Default.args = {
  id: 'field-empty',
  title: 'field 1 title',
  description: 'Optional help text',
  placeholder: 'Type something…',
};

export const Required = Input.bind({});
Required.args = {
  id: 'field-empty',
  title: 'field 1 title',
  description: 'Optional help text',
  placeholder: 'Type something…',
  required: true,
};

export const Filled = Input.bind({});
Filled.args = {
  id: 'field-filled',
  title: 'Filled field title',
  description: 'Optional help text',
  value: 'Filled with value A',
  placeholder: 'Type something…',
  required: true,
};

export const Errored = Input.bind({});
Errored.args = {
  id: 'field-errored',
  title: 'Errored field title',
  description: 'Optional help text',
  placeholder: 'Type something…',
  value: 'Filled with value A',
  error: ['This is the error'],
  required: true,
};

export const Disabled = Input.bind({});
Disabled.args = {
  id: 'field-disabled',
  title: 'Disabled field title',
  description: 'Optional help text',
  placeholder: 'Type something…',
  disabled: true,
};

export default {
  title: 'Input',
  component: InputComponent,
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
  // excludeStories: ['searchResults'],
  // subcomponents: { ArgsTable },
};
