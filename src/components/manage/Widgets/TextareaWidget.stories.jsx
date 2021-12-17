import React from 'react';
import TextareaWidget from './TextareaWidget';
import Wrapper, { FormUndoWrapper } from '@plone/volto/storybook';

const TextareaWidgetComponent = ({ children, ...args }) => {
  return (
    <Wrapper location={{ pathname: '/folder2/folder21/doc212' }}>
      <FormUndoWrapper initialState={{ value: undefined }} showControls={true}>
        {({ state, onChange }) => (
          <div className="ui segment form attached" style={{ width: '400px' }}>
            <TextareaWidget
              {...args}
              id="field"
              title="Textarea"
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

export const Textarea = TextareaWidgetComponent.bind({});

export default {
  title: 'Widgets/Textarea',
  component: TextareaWidget,
  decorators: [
    (Story) => (
      <div className="ui segment form attached" style={{ width: '400px' }}>
        <Story />
      </div>
    ),
  ],
  argTypes: {},
};
