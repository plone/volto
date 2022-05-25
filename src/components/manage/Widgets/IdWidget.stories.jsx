import React from 'react';
import IdWidget from './IdWidget';
import WidgetStory from './story';

export const Text = WidgetStory.bind({
  props: { id: 'text', title: 'Text' },
  widget: IdWidget,
});

export default {
  title: 'Edit Widgets/Id',
  component: IdWidget,
  decorators: [
    (Story) => (
      <div className="ui segment form attached" style={{ width: '400px' }}>
        <Story />
      </div>
    ),
  ],
  argTypes: {},
};
