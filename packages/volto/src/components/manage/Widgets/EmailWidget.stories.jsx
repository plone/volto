import React from 'react';
import EmailWidget from './EmailWidget';
import WidgetStory from './story';

export const Email = WidgetStory.bind({
  props: { id: 'email', title: 'Email', block: 'block' },
  widget: EmailWidget,
});

export default {
  title: 'Edit Widgets/Email',
  component: EmailWidget,
  decorators: [
    (Story) => (
      <div className="ui segment form attached" style={{ width: '400px' }}>
        <Story />
      </div>
    ),
  ],
  argTypes: {},
};
