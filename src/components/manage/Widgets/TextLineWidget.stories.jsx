import React from 'react';
import TextLineWidget from './TextLineWidget';

import WidgetStory from './story';

const props = {
  id: 'textline',
  title: 'Text line',
  focus: true,
};

export const Default = WidgetStory.bind({
  widget: TextLineWidget,
});
Default.storyName = 'Configurable render tag';
Default.args = {
  ...props,
  renderTag: 'pre',
};

export const WithDefaultValue = Default.bind({});
WithDefaultValue.args = {
  ...props,
  value: 'Hello world',
};

export const ClickToFocus = Default.bind({});
ClickToFocus.args = {
  ...props,
  value: 'Hello world',
  focus: false,
};

export default {
  title: 'Edit Widgets/TextLine',
  component: TextLineWidget,
  decorators: [
    (Story) => (
      <div className="ui segment form attached" style={{ width: '400px' }}>
        <Story />
      </div>
    ),
  ],
  argTypes: {},
};
