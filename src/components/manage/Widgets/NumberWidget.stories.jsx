import React from 'react';
import NumberWidget from './NumberWidget';
import Wrapper, { FormUndoWrapper } from '@plone/volto/storybook';

const NumberWidgetComponent = ({ children, ...args }) => {
  return (
    <Wrapper location={{ pathname: '/folder2/folder21/doc212' }}>
      <FormUndoWrapper
        initialState={{ value: undefined }}
        showControls={this.showUndoControls ?? false}
      >
        {({ state, onChange }) => (
          <div className="ui segment form attached" style={{ width: '400px' }}>
            <NumberWidget
              {...args}
              id="field"
              title="Number"
              block="testBlock"
              default={10}
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

export const Number = NumberWidgetComponent.bind({});

export default {
  title: 'Widgets/Number',
  component: NumberWidget,
  decorators: [
    (Story) => (
      <div className="ui segment form attached" style={{ width: '400px' }}>
        <Story />
      </div>
    ),
  ],
  argTypes: {},
};
