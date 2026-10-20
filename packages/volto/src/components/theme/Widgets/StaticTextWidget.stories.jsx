import React from 'react';
import StaticTextWidget from './StaticTextWidget';
import Wrapper from '@plone/volto/storybook';

const StaticTextWidgetComponent = ({ children, className, value }) => {
  return (
    <Wrapper location={{ pathname: '/folder2/folder21/doc212' }}>
      <div className="ui segment form attached" style={{ width: '400px' }}>
        <StaticTextWidget
          value={value}
          children={children}
          className={className}
        />
      </div>
    </Wrapper>
  );
};

export const StaticText = StaticTextWidgetComponent.bind({});
StaticTextWidget.args = {
  value: { data: '<p><strong>Hello</strong> <em>world</em></p>' },
  className: '',
};

export default {
  title: 'View Widgets/Static Text',
  component: StaticTextWidget,
  argTypes: {},
};
