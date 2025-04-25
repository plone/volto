import React from 'react';
import InternalUrlWidget from './InternalUrlWidget';
import WidgetStory from './story';

export const Default = WidgetStory.bind({
  widget: InternalUrlWidget,
});
Default.args = {
  id: 'internalUrl',
  title: 'Internal Url',
  description: 'Optional help text',
};

export const Placeholder = WidgetStory.bind({
  widget: InternalUrlWidget,
});
Placeholder.args = {
  id: 'internalUrl',
  title: 'Internal Url',
  description: 'Optional help text',
  placeholder: 'Placeholder text',
};

export const Required = WidgetStory.bind({
  widget: InternalUrlWidget,
});
Required.args = {
  id: 'internalUrl',
  title: 'Internal Url',
  description: 'Optional help text',
  required: true,
};

export const Errored = WidgetStory.bind({
  widget: InternalUrlWidget,
});
Errored.args = {
  id: 'internalUrl',
  title: 'Internal Url',
  description: 'Optional help text',
  error: ['this is an error'],
};
export const CustomLength = WidgetStory.bind({
  widget: InternalUrlWidget,
});
CustomLength.args = {
  id: 'internalUrl',
  title: 'Internal Url',
  description: 'Optional help text',
  minLength: 3,
  maxLength: 5,
};

export default {
  title: 'Edit Widgets/InternalUrlWidget',
  component: Default,
  decorators: [
    (Story) => (
      <div className="ui segment form attached" style={{ width: '400px' }}>
        <Story />
      </div>
    ),
  ],
  argTypes: {},
};
