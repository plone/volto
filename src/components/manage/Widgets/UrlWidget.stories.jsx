import React from 'react';
import UrlWidgetDefault, { UrlWidget } from './UrlWidget';

import WidgetStory from './story';

export const Url = WidgetStory.bind({
  props: { id: 'align', title: 'Align' },
  widget: UrlWidgetDefault,
});

export default {
  title: 'Widgets/Url',
  component: UrlWidget,
  decorators: [
    (Story) => (
      <div className="ui segment form attached" style={{ width: '400px' }}>
        <Story />
      </div>
    ),
  ],
  argTypes: {},
};
