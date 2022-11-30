import React from 'react';
import FileWidget from './FileWidget';
import WidgetStory from './story';

export const File = WidgetStory.bind({
  props: { id: 'file', title: 'File', block: 'block' },
  widget: FileWidget,
});

export default {
  title: 'Edit Widgets/File',
  component: FileWidget,
  decorators: [
    (Story) => (
      <div className="ui segment form attached" style={{ width: '400px' }}>
        <Story />
      </div>
    ),
  ],
  argTypes: {},
};
