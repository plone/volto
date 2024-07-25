import React from 'react';
import DescriptionWidget from './DescriptionWidget';
import Wrapper from '@plone/volto/storybook';

const DescriptionWidgetComponent = ({ children, className, value }) => {
  return (
    <Wrapper location={{ pathname: '/folder2/folder21/doc212' }}>
      <div className="ui segment form attached" style={{ width: '400px' }}>
        <DescriptionWidget
          value={value}
          children={children}
          className={className}
        />
      </div>
    </Wrapper>
  );
};

export const Description = DescriptionWidgetComponent.bind({});
Description.args = {
  value: 'Content description field rendered in the widget.',
  className: '',
};

export default {
  title: 'View Widgets/Description',
  component: DescriptionWidget,
  argTypes: {},
};
