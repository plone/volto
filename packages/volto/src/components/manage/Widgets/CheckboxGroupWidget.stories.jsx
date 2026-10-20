import React from 'react';
import CheckboxGroupWidget, {
  CheckboxGroupWidgetComponent,
} from './CheckboxGroupWidget';
import WidgetStory from './story';

export const Default = WidgetStory.bind({
  widget: CheckboxGroupWidget,
});
Default.args = {
  id: 'field-empty',
  title: 'field 1 title',
  description: 'Optional help text',
  choices: [
    ['Foo', 'Foo'],
    ['Bar', 'Bar'],
    ['FooBar', 'FooBar'],
  ],
};

export default {
  title: 'Edit Widgets/Checkbox Group Widget',
  component: CheckboxGroupWidgetComponent,
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
};
