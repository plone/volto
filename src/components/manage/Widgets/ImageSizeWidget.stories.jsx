import React from 'react';
import ImageSizeWidget from './ImageSizeWidget';
import WidgetStory from './story';

export const Text = WidgetStory.bind({
  props: { id: 'image_size', title: 'Image Sizes' },
  widget: ImageSizeWidget,
});

export default {
  title: 'Widgets/Image Sizes',
  component: ImageSizeWidget,
  decorators: [
    (Story) => (
      <div className="ui segment form attached" style={{ width: '400px' }}>
        <Story />
      </div>
    ),
  ],
  argTypes: {},
};
