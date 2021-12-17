import React from 'react';
import CheckboxWidget from './CheckboxWidget';
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
              <CheckboxWidget
                {...args}
                id="field"
                title="Checkbox"
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

export const Checkbox = StoryComponent.bind({});
export const UndoSupport = StoryComponent.bind({ showUndoControls: true });

export default {
  title: 'Widgets/Checkbox',
  component: CheckboxWidget,
  decorators: [
    (Story) => (
      <div className="ui segment form attached" style={{ width: '400px' }}>
        <Story />
      </div>
    ),
  ],
  argTypes: {},
};
