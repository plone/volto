import React from 'react';
import TextWidget from './TextWidget';
import WidgetStory from './story';

export const Text = WidgetStory.bind({
  props: { id: 'text', title: 'Text' },
  widget: TextWidget,
});

export default {
  title: 'Edit Widgets/Text',
  component: TextWidget,
  decorators: [
    (Story) => (
      <div className="ui segment form attached" style={{ width: '400px' }}>
        <Story />
      </div>
    ),
  ],
  argTypes: {},
};
