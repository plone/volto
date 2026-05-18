import React from 'react';
import type { Meta, StoryFn, StoryObj } from '@storybook/react';

import BlockWidth from './BlockWidth';
import type { ButtonsWidgetProps } from './ButtonsWidget';
import {
  RealStoreWrapper as Wrapper,
  FormUndoWrapper,
} from '@plone/volto/storybook';

const meta: Meta<typeof BlockWidth> = {
  title: 'Edit Widgets/BlockWidth',
  component: BlockWidth,
  decorators: [
    (Story) => (
      <div className="ui segment form attached" style={{ width: '400px' }}>
        <h4>Block width widget</h4>
        <Story />
      </div>
    ),
  ],
};

export default meta;

type Story = StoryObj<typeof BlockWidth>;

type TemplateParameters = {
  initialValue?: ButtonsWidgetProps['value'];
};

const Template: StoryFn<typeof BlockWidth> = (args, context) => {
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
            <BlockWidth
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

export const DefaultWidth: Story = {
  render: Template,
  args: {
    id: 'blockWidth',
    title: 'Block width',
    block: 'block',
    fieldSet: 'default',
  },
};
