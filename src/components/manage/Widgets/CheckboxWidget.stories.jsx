import React from 'react';
import CheckboxWidget from './CheckboxWidget';
import Wrapper from '@plone/volto/storybook';

const CheckboxWidgetComponent = ({ children, ...args }) => {
  const [value, setValue] = React.useState(false);
  const onChange = (block, value) => setValue(value);
  return (
    <Wrapper location={{ pathname: '/folder2/folder21/doc212' }}>
      <div className="ui segment form attached" style={{ width: '400px' }}>
        <CheckboxWidget
          {...args}
          id="field"
          title="Checkbox"
          block="testBlock"
          value={value}
          onChange={onChange}
        />
      </div>
      <pre>Value: {JSON.stringify(value, null, 4)}</pre>
    </Wrapper>
  );
};

export const Checkbox = CheckboxWidgetComponent.bind({});

export default {
  title: 'Widgets/Checkbox',
  component: CheckboxWidget,
  decorators: [
    (Story) => (
      <div className="ui segment form attached" style={{ width: '400px' }}>
        <Story />
      </div>
    ),
  ],
  argTypes: {},
};
