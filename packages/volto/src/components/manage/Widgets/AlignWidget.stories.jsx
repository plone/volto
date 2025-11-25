import React from 'react';
import AlignWidget from './AlignWidget';
import WidgetStory from './story';

export const Align = WidgetStory.bind({
  props: { id: 'align', title: 'Align' },
  widget: AlignWidget,
});

export const AlignDefaultLeft = WidgetStory.bind({
  props: {
    id: 'align-default-left',
    title: 'Align (default left)',
    default: 'left',
  },
  widget: AlignWidget,
});

export default {
  title: 'Edit Widgets/Align',
  component: AlignWidget,
  decorators: [
    (Story) => (
      <div className="ui segment form attached" style={{ width: '400px' }}>
        <h4>Standard layout-oriented align widget</h4>
        <Story />
      </div>
    ),
  ],
  argTypes: {
    actions: {
      control: 'check',
      options: ['left', 'right', 'center', 'narrow', 'wide', 'full'],
    },
  },
};
