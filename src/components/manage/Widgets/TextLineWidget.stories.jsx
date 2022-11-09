import React from 'react';
import TextLineWidget from './TextLineWidget';

import WidgetStory from './story';

const style = `
.blue {
  background-color: lightblue;
}`;

const props = {
  id: 'textline',
  title: 'Text line',
  value: 'Hello world',
  renderClassName: 'documentFirstHeading',
  focus: true,
};

export const Default = WidgetStory.bind({
  widget: TextLineWidget,
});
Default.storyName = 'Default';
Default.args = {
  ...props,
};

export const ConfigurableRenderTag = Default.bind({});
ConfigurableRenderTag.args = {
  ...props,
  renderTag: 'pre',
  renderClassName: '',
};

export const ClickToFocus = Default.bind({});
ClickToFocus.args = {
  ...props,
  value: 'Hello world',
  focus: false,
};

export const WithCustomClassname = Default.bind({});
WithCustomClassname.args = {
  ...props,
  value: 'Hello world',
  renderClassName: 'blue',
};

export default {
  title: 'Edit Widgets/TextLine',
  component: TextLineWidget,
  decorators: [
    (Story) => (
      <div className="ui segment form attached" style={{ width: '400px' }}>
        <style dangerouslySetInnerHTML={{ __html: style }} />
        <Story />
      </div>
    ),
  ],
  argTypes: {},
};
