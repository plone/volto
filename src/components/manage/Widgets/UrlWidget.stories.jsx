import React from 'react';
import UrlWidgetDefault, { UrlWidget } from './UrlWidget';
import Wrapper from '@plone/volto/storybook';

const UrlWidgetComponent = ({ children, ...args }) => {
  const [value, setValue] = React.useState('');
  const onChange = (block, value) => setValue(value);
  return (
    <Wrapper location={{ pathname: '/folder2/folder21/doc212' }}>
      <div className="ui segment form attached" style={{ width: '400px' }}>
        <UrlWidgetDefault
          {...args}
          id="field"
          title="Url"
          block="testBlock"
          value={value}
          onChange={onChange}
        />
      </div>
      <pre>Value: {JSON.stringify(value, null, 4)}</pre>
    </Wrapper>
  );
};

export const Url = UrlWidgetComponent.bind({});

export default {
  title: 'Widgets/Url',
  component: UrlWidget,
  decorators: [
    (Story) => (
      <div className="ui segment form attached" style={{ width: '400px' }}>
        <Story />
      </div>
    ),
  ],
  argTypes: {},
};
