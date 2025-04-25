import React from 'react';
import { DatetimeWidgetComponent } from './DatetimeWidget';
import DatetimeWidget from './DatetimeWidget';
import WidgetStory from './story';

export const Datetime = WidgetStory.bind({
  props: { id: 'datetime', title: 'Datetime', block: 'block' },
  widget: DatetimeWidget,
});

export default {
  title: 'Edit Widgets/Datetime',
  component: DatetimeWidgetComponent,
  decorators: [
    (Story) => (
      <div className="ui segment form attached" style={{ width: '400px' }}>
        <Story />
      </div>
    ),
  ],
  argTypes: {},
};
