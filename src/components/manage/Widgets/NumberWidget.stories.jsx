import React from 'react';
import NumberWidget from './NumberWidget';
import Wrapper from '@plone/volto/storybook';

const NumberWidgetComponent = ({ children, ...args }) => {
  const [value, setValue] = React.useState('');
  const onChange = (block, value) => setValue(value);
  return (
    <Wrapper location={{ pathname: '/folder2/folder21/doc212' }}>
      <div className="ui segment form attached" style={{ width: '400px' }}>
        <NumberWidget
          {...args}
          id="field"
          title="Number"
          block="testBlock"
          value={value}
          onChange={onChange}
          default={10}
        />
      </div>
      <pre>Value: {JSON.stringify(value, null, 4)}</pre>
    </Wrapper>
  );
};

export const Number = NumberWidgetComponent.bind({});

export default {
  title: 'Widgets/Number',
  component: NumberWidget,
  decorators: [
    (Story) => (
      <div className="ui segment form attached" style={{ width: '400px' }}>
        <Story />
      </div>
    ),
  ],
  argTypes: {},
};
