import React from 'react';
import DatetimeWidget from './DatetimeWidget';
import Wrapper, { FormUndoWrapper } from '@plone/volto/storybook';

function StoryComponent({ children, ...args }) {
  return (
    <Wrapper location={{ pathname: '/folder2/folder21/doc212' }}>
      <div className="ui segment form attached" style={{ width: '400px' }}>
        <FormUndoWrapper
          initialState={{ value: undefined }}
          showControls={this.showUndoControls ?? false}
        >
          {({ state, onChange }) => (
            <>
              <DatetimeWidget
                {...args}
                id="field"
                title="Datetime"
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
}

export const Datetime = StoryComponent.bind({});
export const UndoSupport = StoryComponent.bind({ showUndoControls: true });

export default {
  title: 'Widgets/Datetime',
  component: DatetimeWidget,
  decorators: [
    (Story) => (
      <div className="ui segment form attached" style={{ width: '400px' }}>
        <Story />
      </div>
    ),
  ],
  argTypes: {},
};
