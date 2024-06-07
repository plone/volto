import TextWidget from './TextWidget';
import WidgetStory from './story';

export const Text = WidgetStory.bind({
  props: { id: 'text', title: 'Text' },
  widget: TextWidget,
});
Text.args = {
  description: 'description',
  placeholder: 'placeholder',
};
export default {
  title: 'Edit Widgets/Text',
  component: TextWidget,
  decorators: [
    (Story) => (
      <div className="ui segment form attached" style={{ width: '400px' }}>
        <Story />
      </div>
    ),
  ],
  argTypes: {
    description: {
      control: 'text',
      description: 'description',
    },
    placeholder: {
      control: 'text',
      description: 'placeholder',
    },
  },
};
