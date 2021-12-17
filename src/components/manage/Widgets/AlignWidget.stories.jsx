import React from 'react';
import AlignWidget from './AlignWidget';
import Wrapper, { FormUndoWrapper } from '@plone/volto/storybook';

function StoryComponent({ children, ...args }) {
  return (
    <Wrapper location={{ pathname: '/folder2/folder21/doc212' }}>
      <FormUndoWrapper
        initialState={{ value: undefined }}
        showControls={this.showUndoControls ?? false}
      >
        {({ state, onChange }) => (
          <div className="ui segment form attached" style={{ width: '400px' }}>
            <AlignWidget
              {...args}
              id="align"
              title="Align"
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
}

export const Align = StoryComponent.bind({ showUndoControls: true });
// export const UndoSupport = StoryComponent.bind({ showUndoControls: true });

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
