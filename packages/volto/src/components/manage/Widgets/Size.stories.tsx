import React from 'react';
import type { Meta, StoryFn, StoryObj } from '@storybook/react';

import Size from './Size';
import type { ButtonsWidgetProps } from './ButtonsWidget';
import {
  RealStoreWrapper as Wrapper,
  FormUndoWrapper,
} from '@plone/volto/storybook';

const meta: Meta<typeof Size> = {
  title: 'Edit Widgets/Size',
  component: Size,
  decorators: [
    (Story) => (
      <div className="ui segment form attached" style={{ width: '400px' }}>
        <h4>Size widget</h4>
        <Story />
      </div>
    ),
  ],
};

export default meta;

type Story = StoryObj<typeof Size>;

type TemplateParameters = {
  initialValue?: ButtonsWidgetProps['value'];
};

const Template: StoryFn<typeof Size> = (args, context) => {
  const { initialValue } =
    (context.parameters as TemplateParameters | undefined) ?? {};
  const { value: _ignoredValue, onChange: argsOnChange, ...restArgs } = args;

  return (
    <Wrapper location={{ pathname: '/folder2/folder21/doc212' }}>
      <FormUndoWrapper
        initialState={{ value: initialValue ?? _ignoredValue }}
        showControls
      >
        {({ state, onChange }) => (
          <div className="ui segment form attached" style={{ width: '400px' }}>
            <Size
              {...(restArgs as ButtonsWidgetProps)}
              value={state.value}
              onChange={(id, nextValue) => {
                argsOnChange?.(id, nextValue);
                onChange({ value: nextValue });
              }}
            />
            <pre>Value: {JSON.stringify(state.value, null, 2)}</pre>
          </div>
        )}
      </FormUndoWrapper>
    </Wrapper>
  );
};

export const DefaultSize: Story = {
  render: Template,
  args: {
    id: 'size',
    title: 'Size',
    block: 'block',
    fieldSet: 'default',
  },
};
