import React from 'react';
import RichTextWidget from './RichTextWidget';
import Wrapper from '@plone/volto/storybook';

const RichTextWidgetComponent = ({ children, className, value }) => {
  return (
    <Wrapper location={{ pathname: '/folder2/folder21/doc212' }}>
      <div className="ui segment form attached" style={{ width: '400px' }}>
        <RichTextWidget
          value={value}
          children={children}
          className={className}
        />
      </div>
    </Wrapper>
  );
};

export const RichText = RichTextWidgetComponent.bind({});
RichText.args = {
  value: { data: '<p><strong>Hello</strong> <em>world</em></p>' },
  className: '',
};

export default {
  title: 'View Widgets/RichText',
  component: RichTextWidget,
  argTypes: {},
};
