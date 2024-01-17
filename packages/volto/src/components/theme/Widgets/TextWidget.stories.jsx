import React from 'react';
import TextWidget from './TextWidget';
import Wrapper from '@plone/volto/storybook';

const TextWidgetComponent = ({ children, className, value }) => {
  return (
    <Wrapper location={{ pathname: '/folder2/folder21/doc212' }}>
      <div className="ui segment form attached" style={{ width: '400px' }}>
        <TextWidget value={value} children={children} className={className} />
      </div>
    </Wrapper>
  );
};

export const Text = TextWidgetComponent.bind({});
Text.args = {
  value: 'Text widget render',
  className: '',
};

export default {
  title: 'View Widgets/Text',
  component: TextWidget,
  argTypes: {},
};
