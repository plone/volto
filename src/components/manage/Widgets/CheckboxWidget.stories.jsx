import React from 'react';
import CheckboxWidget from './CheckboxWidget';
import WidgetStory from './story';

export const Checkbox = WidgetStory.bind({
  props: { id: 'field', title: 'Checkbox', block: 'block' },
  widget: CheckboxWidget,
});

export default {
  title: 'Edit Widgets/Checkbox',
  component: CheckboxWidget,
  decorators: [
    (Story) => (
      <div className="ui segment form attached" style={{ width: '400px' }}>
        <Story />
      </div>
    ),
  ],
  argTypes: {},
};
