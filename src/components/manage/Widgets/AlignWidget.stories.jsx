import React from 'react';
import AlignWidget from './AlignWidget';
import Wrapper from '@plone/volto/storybook';

const AlignWidgetComponent = ({ children, ...args }) => {
  const [value, setValue] = React.useState([]);
  const onChange = (block, value) => setValue(value);
  return (
    <Wrapper location={{ pathname: '/folder2/folder21/doc212' }}>
      <div className="ui segment form attached" style={{ width: '400px' }}>
        <AlignWidget
          {...args}
          id="alignWidgetItem"
          title="Align"
          block="testBlock"
          value={value}
          onChange={onChange}
        />
      </div>
    </Wrapper>
  );
};

export const Align = AlignWidgetComponent.bind({});

export default {
  title: 'Widgets/Align',
  component: AlignWidget,
  decorators: [
    (Story) => (
      <div className="ui segment form attached" style={{ width: '400px' }}>
        <h4>Standard layout-oriented align widget</h4>
        <Story />
      </div>
    ),
  ],
  argTypes: {},
};
