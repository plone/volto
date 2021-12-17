import React from 'react';
import AlignWidget from './AlignWidget';
import Wrapper, { FormUndoWrapper } from '@plone/volto/storybook';

const AlignWidgetStoryComponent = ({ children, ...args }) => {
  return (
    <Wrapper location={{ pathname: '/folder2/folder21/doc212' }}>
      <div className="ui segment form attached" style={{ width: '400px' }}>
        <FormUndoWrapper
          initialState={{ value: undefined }}
          showControls={args.showControls ?? false}
        >
          {({ state, onChange }) => (
            <AlignWidget
              {...args}
              id="align"
              title="Align"
              block="testBlock"
              value={state.value}
              onChange={(block, value) => onChange({ value })}
            />
          )}
        </FormUndoWrapper>
      </div>
    </Wrapper>
  );
};

export const Align = AlignWidgetStoryComponent.bind({});

export const UndoSupport = AlignWidgetStoryComponent.bind({});
UndoSupport.args = {
  showControls: true,
};

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
