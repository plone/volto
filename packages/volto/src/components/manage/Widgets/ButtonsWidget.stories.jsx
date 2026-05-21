import React from 'react';
import ButtonsWidget from './ButtonsWidget';
import WidgetStory from './story';
import textJustifiedSVG from '@plone/volto/icons/align-justify.svg';
import textCenteredSVG from '@plone/volto/icons/align-center.svg';
import textLeftSVG from '@plone/volto/icons/align-left.svg';
import textRightSVG from '@plone/volto/icons/align-right.svg';

export const Buttons = WidgetStory.bind({
  props: {
    id: 'buttons',
    title: 'Buttons',
    actions: ['left', 'right', 'centered', 'justified'],
    actionsInfoMap: {
      left: [textLeftSVG, 'Text Left'],
      right: [textRightSVG, 'Text Right'],
      justified: [textJustifiedSVG, 'Text Justified'],
      centered: [textCenteredSVG, 'Text Centered'],
    },
  },
  widget: ButtonsWidget,
});

export const ButtonsWithDefaultValue = WidgetStory.bind({
  props: {
    id: 'buttons-default',
    title: 'Buttons with Default Value',
    default: 'centered',
    actions: ['left', 'right', 'centered'],
    actionsInfoMap: {
      left: [textLeftSVG, 'Text Left'],
      right: [textRightSVG, 'Text Right'],
      centered: [textCenteredSVG, 'Text Centered'],
    },
  },
  widget: ButtonsWidget,
});

export const ButtonsWithStyleDefinitions = WidgetStory.bind({
  props: {
    id: 'buttons-style-definitions',
    title: 'Buttons with Style Definitions',
    actions: [
      {
        name: 'small',
        label: 'Small',
        style: { '--button-size': 'small' },
      },
      {
        name: 'medium',
        label: 'Medium',
        style: { '--button-size': 'medium' },
      },
      {
        name: 'large',
        label: 'Large',
        style: { '--button-size': 'large' },
      },
    ],
    actionsInfoMap: {
      small: ['S', 'Small Buttons'],
      medium: ['M', 'Medium Buttons'],
      large: ['L', 'Large Buttons'],
    },
  },
  widget: ButtonsWidget,
});

export const ButtonsFiltered = WidgetStory.bind({
  props: {
    id: 'buttons-filtered',
    title: 'Filtered Buttons',
    actions: ['left', 'right', 'centered', 'justified'],
    filterActions: ['centered', 'justified'],
    actionsInfoMap: {
      left: [textLeftSVG, 'Text Left'],
      right: [textRightSVG, 'Text Right'],
      justified: [textJustifiedSVG, 'Text Justified'],
      centered: [textCenteredSVG, 'Text Centered'],
    },
  },
  widget: ButtonsWidget,
});

export default {
  title: 'Edit Widgets/Buttons',
  component: ButtonsWidget,
  decorators: [
    (Story) => (
      <div className="ui segment form attached" style={{ width: '400px' }}>
        <h4>Buttons widget - Generic all purpose action buttons</h4>
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
