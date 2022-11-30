import React from 'react';
import WysiwygWidget from './WysiwygWidget';
import WidgetStory from './story';

export const Wysiwyg = WidgetStory.bind({
  props: { id: 'text', title: 'Rich text' },
  widget: WysiwygWidget,
});

export default {
  title: 'Edit Widgets/Wysiwyg',
  component: WysiwygWidget,
  decorators: [
    (Story) => (
      <div
        className="ui segment form attached"
        style={{ width: '400px', marginTop: '40px' }}
      >
        <Story />
      </div>
    ),
  ],
  argTypes: {},
};
