import React from 'react';
import HiddenWidget from './HiddenWidget';
import Wrapper from '@plone/volto/storybook';

const HiddenWidgetComponent = ({ children, className, value }) => {
  return (
    <Wrapper location={{ pathname: '/folder2/folder21/doc212' }}>
      <div className="ui segment form attached" style={{ width: '400px' }}>
        <HiddenWidget value={value} children={children} className={className} />
      </div>
    </Wrapper>
  );
};

export const Text = HiddenWidgetComponent.bind({});
Text.args = {
  value: 'Hidden widget render',
  className: '',
};

export default {
  title: 'View Widgets/Hidden',
  component: HiddenWidget,
  argTypes: {},
};
