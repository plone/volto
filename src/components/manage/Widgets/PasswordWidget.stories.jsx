import React from 'react';
import PasswordWidget from './PasswordWidget';
import Wrapper, { FormUndoWrapper } from '@plone/volto/storybook';

const PasswordWidgetComponent = ({ children, ...args }) => {
  return (
    <Wrapper location={{ pathname: '/folder2/folder21/doc212' }}>
      <FormUndoWrapper initialState={{ value: undefined }} showControls={true}>
        {({ state, onChange }) => (
          <div className="ui segment form attached" style={{ width: '400px' }}>
            <PasswordWidget
              {...args}
              id="field"
              title="Password"
              block="testBlock"
              value={state.value}
              onChange={(block, value) => onChange({ value })}
            />
            <pre>Value: {JSON.stringify(state.value, null, 4)}</pre>
          </div>
        )}
      </FormUndoWrapper>
    </Wrapper>
  );
};

export const Password = PasswordWidgetComponent.bind({});

export default {
  title: 'Widgets/Password',
  component: PasswordWidget,
  decorators: [
    (Story) => (
      <div className="ui segment form attached" style={{ width: '400px' }}>
        <Story />
      </div>
    ),
  ],
  argTypes: {},
};
