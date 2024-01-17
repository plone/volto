import React from 'react';
import NumberWidget from './NumberWidget';
import WidgetStory from './story';

export const Number = WidgetStory.bind({
  props: { id: 'number', title: 'Number', block: 'block' },
  widget: NumberWidget,
});

export default {
  title: 'Edit Widgets/Number',
  component: NumberWidget,
  decorators: [
    (Story) => (
      <div className="ui segment form attached" style={{ width: '400px' }}>
        <Story />
      </div>
    ),
  ],
  argTypes: {},
};
