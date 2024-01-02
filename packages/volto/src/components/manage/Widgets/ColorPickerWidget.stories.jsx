import React from 'react';
import ColorPickerWidget from './ColorPickerWidget';
import WidgetStory from './story';

export const Default = WidgetStory.bind({
  widget: ColorPickerWidget,
});

Default.args = {
  id: 'favoriteColor',
  title: 'Favorite Color',
  colors: [
    { name: 'red', label: 'red' },
    { name: 'yellow', label: 'yellow' },
    { name: 'green', label: 'green' },
  ],
};

export const WithEnhancedStyleConfig = WidgetStory.bind({
  widget: ColorPickerWidget,
});

WithEnhancedStyleConfig.args = {
  id: 'favoriteColor',
  title: 'Favorite Color',
  colors: [
    { style: { name: 'red', '--background-color': 'red' }, label: 'red' },
    {
      style: { name: 'yellow', '--background-color': 'yellow' },
      label: 'yellow',
    },
    { name: 'green', label: 'green' },
  ],
};

export default {
  title: 'Edit Widgets/ColorPicker',
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
