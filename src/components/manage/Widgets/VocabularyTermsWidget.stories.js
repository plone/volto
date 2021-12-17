import VocabularyTermsWidget from './VocabularyTermsWidget';
import Wrapper, { FormUndoWrapper } from '@plone/volto/storybook';
import React from 'react';

const customStore = {
  userSession: { token: '1234' },
  intl: {
    locale: 'en',
    messages: {},
  },
};

const WrappedJSONField = (args) => {
  const initialValue = {
    items: [
      {
        token: 'talk',
        titles: {
          en: 'Talk',
          de: 'Vortrag',
          it: 'Lettura',
        },
      },
      {
        token: 'lightning-talk',
        titles: {
          en: 'Lightning-Talk',
          de: 'kürzerer erleuchtender Vortrag',
          it: 'Lightning-Talk',
        },
      },
    ],
  };
  return (
    <Wrapper
      location={{ pathname: '/folder2/folder21/doc212' }}
      customStore={customStore}
    >
      <FormUndoWrapper
        initialState={{ value: initialValue }}
        showControls={true}
      >
        {({ state, onChange }) => (
          <div className="ui segment form attached">
            <VocabularyTermsWidget
              {...args}
              id="simplevocabulary"
              title="Vocabulary terms"
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

const WrappedSimple = (args) => {
  const initialValue = {
    '001': 'manual',
    '002': 'questions & answers',
  };

  return (
    <Wrapper
      location={{ pathname: '/folder2/folder21/doc212' }}
      customStore={customStore}
    >
      <FormUndoWrapper
        initialState={{ value: initialValue }}
        showControls={true}
      >
        {({ state, onChange }) => (
          <div className="ui segment form attached">
            <VocabularyTermsWidget
              {...args}
              id="Simple"
              title="Vocabulary terms"
              block="testBlock"
              value_type={{
                schema: {
                  type: 'string',
                },
              }}
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

export default {
  title: 'Widgets/Vocabulary',
  component: VocabularyTermsWidget,
  decorators: [
    (Story) => (
      <div className="ui segment form attached" style={{ width: '600px' }}>
        <Story />
      </div>
    ),
  ],
};

export const JSONField = () => <WrappedJSONField />;
export const Simple = () => <WrappedSimple />;
