import React from 'react';
import QueryWidget from './QueryWidget';
import Wrapper from '@plone/volto/storybook';

const QueryWidgetComponent = ({ children, ...args }) => {
  const [value, setValue] = React.useState('');
  const onChange = (block, value) => setValue(value);
  return (
    <Wrapper location={{ pathname: '/folder2/folder21/doc212' }}>
      <div className="ui segment form attached" style={{ width: '400px' }}>
        <QueryWidget
          {...args}
          id="field"
          title="Query"
          block="testBlock"
          value={value}
          onChange={onChange}
        />
      </div>
      <pre>Value: {JSON.stringify(value, null, 4)}</pre>
    </Wrapper>
  );
};

export const Query = QueryWidgetComponent.bind({});

export default {
  title: 'Widgets/Query',
  component: QueryWidget,
  decorators: [
    (Story) => (
      <div className="ui segment form attached" style={{ width: '400px' }}>
        <Story />
      </div>
    ),
  ],
  argTypes: {},
};
