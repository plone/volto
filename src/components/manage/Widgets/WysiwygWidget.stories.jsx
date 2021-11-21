import React from 'react';
import WysiwygWidget from './WysiwygWidget';
import Wrapper from '@plone/volto/storybook';

const WysiwygWidgetComponent = ({ children, ...args }) => {
  const [value, setValue] = React.useState('');
  const onChange = (block, value) => setValue(value);
  return (
    <Wrapper location={{ pathname: '/folder2/folder21/doc212' }}>
      <div className="ui segment form attached" style={{ width: '400px' }}>
        <WysiwygWidget
          {...args}
          id="field"
          title="Wysiwyg"
          block="testBlock"
          value={value}
          onChange={onChange}
        />
      </div>
      <pre>Value: {JSON.stringify(value, null, 4)}</pre>
    </Wrapper>
  );
};

export const Wysiwyg = WysiwygWidgetComponent.bind({});

export default {
  title: 'Widgets/Wysiwyg',
  component: WysiwygWidget,
  decorators: [
    (Story) => (
      <div
        className="ui segment form attached"
        style={{ width: '400px', marginTop: '40px' }}
      >
        <Story />
      </div>
    ),
  ],
  argTypes: {},
};
