import React from 'react';
import RadioGroupWidget, {
  RadioGroupWidgetComponent,
} from './RadioGroupWidget';
import WidgetStory from './story';

export const Default = WidgetStory.bind({
  widget: RadioGroupWidget,
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
  title: 'Edit Widgets/Radio Group Widget',
  component: RadioGroupWidgetComponent,
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
