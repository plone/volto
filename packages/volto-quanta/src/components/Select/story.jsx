import React from 'react';
import {
  RealStoreWrapper as Wrapper,
  FormUndoWrapper,
} from '@plone/volto/storybook';

export default function StoryComponent({ children, ...args }) {
  const Widget = this.widget;
  const props = this.props || {};
  return (
    <Wrapper
      location={{ pathname: '/folder2/folder21/doc212' }}
      customStore={this.customStore}
    >
      <FormUndoWrapper
        initialState={{
          value: args.value || args.initialValue || this.initialValue,
        }}
        showControls={this.showUndoControls ?? true}
      >
        {({ state, onChange }) => (
          <div className="ui segment form attached" style={{ width: '400px' }}>
            <Widget
              id="field"
              title="Field"
              block="block"
              {...args}
              {...props}
              value={state.value}
              onChange={(block, value) => onChange({ value })}
            />
            <pre>Value: {JSON.stringify(state.value, null, 4)}</pre>
          </div>
        )}
      </FormUndoWrapper>
    </Wrapper>
  );
}
