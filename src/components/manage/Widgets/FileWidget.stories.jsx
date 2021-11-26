import React from 'react';
import FileWidget from './FileWidget';
import Wrapper from '@plone/volto/storybook';

const FileWidgetComponent = ({ children, ...args }) => {
  const [value, setValue] = React.useState('');
  const onChange = (block, value) => setValue(value);
  return (
    <Wrapper location={{ pathname: '/folder2/folder21/doc212' }}>
      <div className="ui segment form attached" style={{ width: '400px' }}>
        <FileWidget
          {...args}
          id="field"
          title="File"
          block="testBlock"
          value={value}
          onChange={onChange}
        />
      </div>
      <pre>Value: {JSON.stringify(value, null, 4)}</pre>
    </Wrapper>
  );
};

export const File = FileWidgetComponent.bind({});

export default {
  title: 'Widgets/File',
  component: FileWidget,
  decorators: [
    (Story) => (
      <div className="ui segment form attached" style={{ width: '400px' }}>
        <Story />
      </div>
    ),
  ],
  argTypes: {},
};
