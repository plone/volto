import React from 'react';
import IdWidget from './IdWidget';
import WidgetStory from './story';

export const Default = WidgetStory.bind({
  widget: IdWidget,
});

Default.args = {
  id: 'text',
  title: 'Text',
};

export const Errored = WidgetStory.bind({
  widget: IdWidget,
});
Errored.args = {
  id: 'field-errored',
  title: 'Errored field title',
  value: '@@name',
};

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
