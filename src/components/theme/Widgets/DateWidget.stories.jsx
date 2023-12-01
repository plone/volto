import React from 'react';
import DateWidget from './DatetimeWidget';
import Wrapper from '@plone/volto/storybook';

const DateWidgetComponent = ({ children, className, value, format }) => {
  return (
    <Wrapper location={{ pathname: '/folder2/folder21/doc212' }}>
      <div className="ui segment form attached" style={{ width: '400px' }}>
        <DateWidget
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

export const Datew = DateWidgetComponent.bind({});
Datew.args = {
  value: date,
  className: '',
  format: 'll',
};

export default {
  title: 'View Widgets/Datew',
  component: DateWidget,
  argTypes: {},
};
