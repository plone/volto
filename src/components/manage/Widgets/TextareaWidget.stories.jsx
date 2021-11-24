import React from 'react';
import TextareaWidget from './TextareaWidget';
import Wrapper from '@plone/volto/storybook';

const TextareaWidgetComponent = ({ children, ...args }) => {
  const [value, setValue] = React.useState('');
  const onChange = (block, value) => setValue(value);
  return (
    <Wrapper location={{ pathname: '/folder2/folder21/doc212' }}>
      <div className="ui segment form attached" style={{ width: '400px' }}>
        <TextareaWidget
          {...args}
          id="field"
          title="Textarea"
          block="testBlock"
          value={value}
          onChange={onChange}
        />
      </div>
      <pre>Value: {JSON.stringify(value, null, 4)}</pre>
    </Wrapper>
  );
};

export const Textarea = TextareaWidgetComponent.bind({});

export default {
  title: 'Widgets/Textarea',
  component: TextareaWidget,
  decorators: [
    (Story) => (
      <div className="ui segment form attached" style={{ width: '400px' }}>
        <Story />
      </div>
    ),
  ],
  argTypes: {},
};
