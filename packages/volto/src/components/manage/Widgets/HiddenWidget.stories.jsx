import HiddenWidget from './HiddenWidget';
import WidgetStory from './story';

export const Hidden = WidgetStory.bind({
  props: { id: 'text', title: 'Text' },
  widget: HiddenWidget,
});

export default {
  title: 'Edit Widgets/Hidden',
  component: HiddenWidget,
  decorators: [
    (Story) => (
      <div className="ui segment form attached" style={{ width: '400px' }}>
        <Story />
      </div>
    ),
  ],
  argTypes: {},
};
