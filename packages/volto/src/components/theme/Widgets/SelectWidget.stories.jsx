import React from 'react';
import SelectWidget from './SelectWidget';
import Wrapper from '@plone/volto/storybook';

const SelectWidgetComponent = ({ children, className, value }) => {
  return (
    <Wrapper location={{ pathname: '/folder2/folder21/doc212' }}>
      <div className="ui segment form attached" style={{ width: '400px' }}>
        <SelectWidget value={value} children={children} className={className} />
      </div>
    </Wrapper>
  );
};

export const Select = SelectWidgetComponent.bind({});
Select.args = {
  value: { title: 'Title', token: 'token' },
  className: '',
};

export default {
  title: 'View Widgets/Select',
  component: SelectWidget,
  argTypes: {},
};
