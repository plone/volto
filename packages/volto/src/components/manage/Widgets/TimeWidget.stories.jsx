import React from 'react';
import { TimeWidgetComponent } from './TimeWidget';
import TimeWidget from './TimeWidget';
import WidgetStory from './story';

export const Time = WidgetStory.bind({
  props: { id: 'time', title: 'Time', block: 'block' },
  widget: TimeWidget,
});

export default {
  title: 'Edit Widgets/Time',
  component: TimeWidgetComponent,
  decorators: [
    (Story) => (
      <div className="ui segment form attached" style={{ width: '400px' }}>
        <Story />
      </div>
    ),
  ],
  argTypes: {},
};
