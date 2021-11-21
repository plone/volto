import React from 'react';
import EmailWidget from './EmailWidget';
import Wrapper from '@plone/volto/storybook';

const EmailWidgetComponent = ({ children, ...args }) => {
  const [value, setValue] = React.useState('');
  const onChange = (block, value) => setValue(value);
  return (
    <Wrapper location={{ pathname: '/folder2/folder21/doc212' }}>
      <div className="ui segment form attached" style={{ width: '400px' }}>
        <EmailWidget
          {...args}
          id="field"
          title="Email"
          block="testBlock"
          value={value}
          onChange={onChange}
        />
      </div>
      <pre>Value: {JSON.stringify(value, null, 4)}</pre>
    </Wrapper>
  );
};

export const Email = EmailWidgetComponent.bind({});

export default {
  title: 'Widgets/Email',
  component: EmailWidget,
  decorators: [
    (Story) => (
      <div className="ui segment form attached" style={{ width: '400px' }}>
        <Story />
      </div>
    ),
  ],
  argTypes: {},
};
