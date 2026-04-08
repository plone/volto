import React from 'react';
import PasswordWidget from './PasswordWidget';
import WidgetStory from './story';

export const Password = WidgetStory.bind({
  props: { id: 'password', title: 'Password', block: 'block' },
  widget: PasswordWidget,
});

export default {
  title: 'Edit Widgets/Password',
  component: PasswordWidget,
  decorators: [
    (Story) => (
      <div className="ui segment form attached" style={{ width: '400px' }}>
        <Story />
      </div>
    ),
  ],
  argTypes: {},
};
