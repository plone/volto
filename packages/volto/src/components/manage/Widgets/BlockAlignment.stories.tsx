import React from 'react';
import type { Meta, StoryFn, StoryObj } from '@storybook/react';

import BlockAlignment from './BlockAlignment';
import type { ButtonsWidgetProps } from './ButtonsWidget';
import {
  RealStoreWrapper as Wrapper,
  FormUndoWrapper,
} from '@plone/volto/storybook';

const meta: Meta<typeof BlockAlignment> = {
  title: 'Edit Widgets/BlockAlignment',
  component: BlockAlignment,
  decorators: [
    (Story) => (
      <div className="ui segment form attached" style={{ width: '400px' }}>
        <h4>Block alignment widget</h4>
        <Story />
      </div>
    ),
  ],
};

export default meta;

type Story = StoryObj<typeof BlockAlignment>;

type TemplateParameters = {
  initialValue?: ButtonsWidgetProps['value'];
};

const Template: StoryFn<typeof BlockAlignment> = (args, context) => {
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
            <BlockAlignment
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

export const DefaultAlignment: Story = {
  render: Template,
  args: {
    id: 'alignment',
    title: 'Block alignment',
    block: 'block',
    fieldSet: 'default',
  },
};

export const CustomActions: Story = {
  render: Template,
  args: {
    ...(DefaultAlignment.args ?? {}),
    actions: [
      {
        name: 'wide',
        label: 'Wide',
        style: {
          '--block-alignment': 'var(--align-wide)',
        },
      },
      {
        name: 'full',
        label: 'Full',
        style: {
          '--block-alignment': 'var(--align-full)',
        },
      },
    ],
    actionsInfoMap: {
      wide: ['W', 'Wide alignment'],
      full: ['F', 'Full width alignment'],
    },
  },
};

export const FilteredActions: Story = {
  render: Template,
  args: {
    ...(DefaultAlignment.args ?? {}),
    filterActions: ['center'],
  },
};
