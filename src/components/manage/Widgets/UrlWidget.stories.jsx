import React from 'react';
import UrlWidgetDefault, { UrlWidget } from './UrlWidget';
import Wrapper, { FormUndoWrapper } from '@plone/volto/storybook';

const UrlWidgetComponent = ({ children, ...args }) => {
  return (
    <Wrapper location={{ pathname: '/folder2/folder21/doc212' }}>
      <FormUndoWrapper initialState={{ value: undefined }} showControls={true}>
        {({ state, onChange }) => (
          <div className="ui segment form attached" style={{ width: '400px' }}>
            <UrlWidgetDefault
              {...args}
              id="field"
              title="Url"
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

export const Url = UrlWidgetComponent.bind({});

export default {
  title: 'Widgets/Url',
  component: UrlWidget,
  decorators: [
    (Story) => (
      <div className="ui segment form attached" style={{ width: '400px' }}>
        <Story />
      </div>
    ),
  ],
  argTypes: {},
};
