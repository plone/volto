import React from 'react';
import { DatetimeWidgetComponent } from './DatetimeWidget';
import DatetimeWidget from './DatetimeWidget';
import {
  FormUndoWrapper,
  RealStoreWrapper as Wrapper,
} from '@plone/volto/storybook';

function StoryComponent({ children, ...args }) {
  return (
    <Wrapper location={{ pathname: '/folder2/folder21/doc212' }}>
      <FormUndoWrapper
        initialState={{ value: undefined }}
        showControls={this.showUndoControls ?? false}
      >
        {({ state, onChange }) => (
          <div className="ui segment form attached" style={{ width: '400px' }}>
            <DatetimeWidget
              {...args}
              id="field"
              title="Datetime"
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

export const Datetime = StoryComponent.bind({ showUndoControls: true });
// export const UndoSupport = StoryComponent.bind({ showUndoControls: true });

export default {
  title: 'Widgets/Datetime',
  component: DatetimeWidgetComponent,
  decorators: [
    (Story) => (
      <div className="ui segment form attached" style={{ width: '400px' }}>
        <Story />
      </div>
    ),
  ],
  argTypes: {},
};
