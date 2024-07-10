import React from 'react';
import TextareaWidget from './TextareaWidget';
import WidgetStory from './story';

export const Textarea = WidgetStory.bind({
  props: { id: 'textarea', title: 'Text area', block: 'block' },
  widget: TextareaWidget,
});

export default {
  title: 'Edit Widgets/Textarea',
  component: TextareaWidget,
  decorators: [
    (Story) => (
      <div className="ui segment form attached" style={{ width: '400px' }}>
        <Story />
      </div>
    ),
  ],
  argTypes: {},
};
