import React from 'react';
import EmailWidget from './EmailWidget';
import Wrapper, { FormUndoWrapper } from '@plone/volto/storybook';

const EmailWidgetComponent = ({ children, ...args }) => {
  return (
    <Wrapper location={{ pathname: '/folder2/folder21/doc212' }}>
      <div className="ui segment form attached" style={{ width: '400px' }}>
        <FormUndoWrapper
          initialState={{ value: undefined }}
          showControls={true}
        >
          {({ state, onChange }) => (
            <>
              <EmailWidget
                {...args}
                id="field"
                title="Email"
                block="testBlock"
                value={state.value}
                onChange={(block, value) => onChange({ value })}
              />
              <pre>Value: {JSON.stringify(state.value, null, 4)}</pre>
            </>
          )}
        </FormUndoWrapper>
      </div>
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
