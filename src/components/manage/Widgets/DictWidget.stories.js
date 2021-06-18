import DictWidgetDefault from './DictWidget';
import Wrapper from '@plone/volto/storybook';
import React from 'react';

const customStore = {
  userSession: { token: '1234' },
  intl: {
    locale: 'en',
    messages: {},
  },
};

const DictWidgetComponent = (args) => {
  const [value, setValue] = React.useState({});
  const onChange = (block, value) => setValue(value);

  return (
    <Wrapper
      location={{ pathname: '/folder2/folder21/doc212' }}
      customStore={customStore}
    >
      <div className="ui segment form attached">
        <DictWidgetDefault
          {...args}
          id="Dictionary"
          title="Dictionary"
          block="testBlock"
          value={value}
          onChange={onChange}
        />
        <pre>{JSON.stringify(value, null, 4)}</pre>
      </div>
    </Wrapper>
  );
};

export default {
  title: 'Widgets/Dict Widget',
  component: DictWidgetDefault,
  decorators: [
    (Story) => (
      <div className="ui segment form attached" style={{ width: '600px' }}>
        <Story />
      </div>
    ),
  ],
  // subcomponents: { ArgsTable },
};

export const DictWidget = () => <DictWidgetComponent />;
