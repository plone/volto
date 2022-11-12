import React from 'react';
import TextAreaComponent from './TextArea';

const TextArea = (args) => {
  const [value, setValue] = React.useState(args.value ?? '');
  const onChange = (block, value) => {
    args.onChange({ value });
    setValue(value);
  };

  return <TextAreaComponent {...args} onChange={onChange} value={value} />;
};

export const Default = TextArea.bind({});
Default.args = {
  id: 'field-empty',
  title: 'field 1 title',
  description: 'Optional help text',
  placeholder: 'Type something…',
};

export const Required = TextArea.bind({});
Required.args = {
  id: 'field-empty',
  title: 'field 1 title',
  description: 'Optional help text',
  placeholder: 'Type something…',
  required: true,
};

export const Filled = TextArea.bind({});
Filled.args = {
  id: 'field-filled',
  title: 'Filled field title',
  description: 'Optional help text',
  value: 'Filled with value A',
  placeholder: 'Type something…',
  required: true,
};

export const Errored = TextArea.bind({});
Errored.args = {
  id: 'field-errored',
  title: 'Errored field title',
  description: 'Optional help text',
  placeholder: 'Type something…',
  value: 'Filled with value A',
  error: ['This is the error'],
  required: true,
};

export const Disabled = TextArea.bind({});
Disabled.args = {
  id: 'field-disabled',
  title: 'Disabled field title',
  description: 'Optional help text',
  placeholder: 'Type something…',
  disabled: true,
};

export default {
  title: 'TextArea',
  component: TextAreaComponent,
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
