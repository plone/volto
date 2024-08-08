import React from 'react';
import DatetimeWidget from './DatetimeWidget';
import Wrapper from '@plone/volto/storybook';

const DatetimeWidgetComponent = ({ children, className, value, format }) => {
  return (
    <Wrapper location={{ pathname: '/folder2/folder21/doc212' }}>
      <div className="ui segment form attached" style={{ width: '400px' }}>
        <DatetimeWidget
          value={value}
          children={children}
          className={className}
          format={format}
        />
      </div>
    </Wrapper>
  );
};
const date = new Date();

export const Datetime = DatetimeWidgetComponent.bind({});
Datetime.args = {
  value: date,
  className: '',
  format: 'lll',
};

export default {
  title: 'View Widgets/Datetime',
  component: DatetimeWidget,
  argTypes: {},
};
