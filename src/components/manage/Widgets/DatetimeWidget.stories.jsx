import React from 'react';
import DatetimeWidget from './DatetimeWidget';
import Wrapper from '@plone/volto/storybook';

const DatetimeWidgetComponent = ({ children, ...args }) => {
  const [value, setValue] = React.useState(false);
  const onChange = (block, value) => setValue(value);
  return (
    <Wrapper location={{ pathname: '/folder2/folder21/doc212' }}>
      <div className="ui segment form attached" style={{ width: '400px' }}>
        <DatetimeWidget
          {...args}
          id="field"
          title="Datetime"
          block="testBlock"
          value={value}
          onChange={onChange}
        />
      </div>
      <pre>Value: {JSON.stringify(value, null, 4)}</pre>
    </Wrapper>
  );
};

export const Datetime = DatetimeWidgetComponent.bind({});

export default {
  title: 'Widgets/Datetime',
  component: DatetimeWidget,
  decorators: [
    (Story) => (
      <div className="ui segment form attached" style={{ width: '400px' }}>
        <Story />
      </div>
    ),
  ],
  argTypes: {},
};
