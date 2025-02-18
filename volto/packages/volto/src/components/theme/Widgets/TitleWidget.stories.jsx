import React from 'react';
import TitleWidget from './TitleWidget';
import Wrapper from '@plone/volto/storybook';

const TitleWidgetComponent = ({ children, className, value }) => {
  return (
    <Wrapper location={{ pathname: '/folder2/folder21/doc212' }}>
      <div className="ui segment form attached" style={{ width: '400px' }}>
        <TitleWidget value={value} children={children} className={className} />
      </div>
    </Wrapper>
  );
};

export const Title = TitleWidgetComponent.bind({});
Title.args = {
  value: 'Title widget render',
  className: '',
};

export default {
  title: 'View Widgets/Title',
  component: TitleWidget,
  argTypes: {},
};
