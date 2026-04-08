import React from 'react';
import BooleanWidget from './BooleanWidget';
import Wrapper from '@plone/volto/storybook';

const BooleanWidgetComponent = ({ children, className, value }) => {
  return (
    <Wrapper location={{ pathname: '/folder2/folder21/doc212' }}>
      <div className="ui segment form attached" style={{ width: '400px' }}>
        <BooleanWidget
          value={value}
          children={children}
          className={className}
        />
      </div>
    </Wrapper>
  );
};

export const Boolean = BooleanWidgetComponent.bind({});
Boolean.args = {
  value: false,
  className: '',
};

export default {
  title: 'View Widgets/Boolean',
  component: BooleanWidget,
  argTypes: {},
};
