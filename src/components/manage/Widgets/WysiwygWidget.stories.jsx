import React from 'react';
import WysiwygWidget from './WysiwygWidget';
import Wrapper, { FormUndoWrapper } from '@plone/volto/storybook';

const WysiwygWidgetComponent = ({ children, ...args }) => {
  return (
    <Wrapper location={{ pathname: '/folder2/folder21/doc212' }}>
      <FormUndoWrapper initialState={{ value: undefined }} showControls={true}>
        {({ state, onChange }) => (
          <div className="ui segment form attached" style={{ width: '400px' }}>
            <WysiwygWidget
              {...args}
              id="field"
              title="Wysiwyg"
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

export const Wysiwyg = WysiwygWidgetComponent.bind({});

export default {
  title: 'Widgets/Wysiwyg',
  component: WysiwygWidget,
  decorators: [
    (Story) => (
      <div
        className="ui segment form attached"
        style={{ width: '400px', marginTop: '40px' }}
      >
        <Story />
      </div>
    ),
  ],
  argTypes: {},
};
