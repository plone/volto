import ColorPickerWidget from './ColorPickerWidget';
import WidgetStory from './story';
import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof ColorPickerWidget> = {
  title: 'Edit Widgets/ColorPicker',
  component: WidgetStory.bind({
    widget: ColorPickerWidget,
  }),
  decorators: [
    (Story) => (
      <div className="ui segment form attached" style={{ width: '400px' }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof ColorPickerWidget>;

export const Default: Story = {
  args: {
    id: 'favoriteColor',
    title: 'Favorite Color',
    colors: [
      { name: 'red', label: 'red' },
      { name: 'yellow', label: 'yellow' },
      { name: 'green', label: 'green' },
    ],
  },
};

export const WithEnhancedStyleConfig: Story = {
  args: {
    id: 'favoriteColor',
    title: 'Favorite Color',
    colors: [
      { name: 'red', label: 'red', style: { '--background-color': 'red' } },
      {
        name: 'yellow',
        label: 'yellow',
        style: { '--background-color': 'yellow' },
      },
      { name: 'green', label: 'green' },
    ],
  },
};
