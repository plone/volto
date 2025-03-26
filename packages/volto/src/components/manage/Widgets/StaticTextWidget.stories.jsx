import StaticTextWidget from './StaticTextWidget';
import WidgetStory from './story';

export const StaticText = WidgetStory.bind({
  props: { id: 'text', title: 'Text' },
  widget: StaticTextWidget,
});

export default {
  title: 'Edit Widgets/Static Text',
  component: StaticTextWidget,
  decorators: [
    (Story) => (
      <div className="ui segment form attached" style={{ width: '400px' }}>
        <Story />
      </div>
    ),
  ],
  argTypes: {},
};
