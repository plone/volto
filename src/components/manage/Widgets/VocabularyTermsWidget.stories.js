import VocabularyTermsWidget from './VocabularyTermsWidget';
import Wrapper from '@plone/volto/storybook';
import React from 'react';

const customStore = {
  userSession: { token: '1234' },
  intl: {
    locale: 'en',
    messages: {},
  },
};

const WrappedJSONField = (args) => {
  const [value, setValue] = React.useState({
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
  });
  const onChange = (block, value) => setValue(value);

  return (
    <Wrapper
      location={{ pathname: '/folder2/folder21/doc212' }}
      customStore={customStore}
    >
      <div className="ui segment form attached">
        <VocabularyTermsWidget
          {...args}
          id="simplevocabulary"
          title="Vocabulary terms"
          block="testBlock"
          value={value}
          onChange={onChange}
        />
        <pre>{JSON.stringify(value, null, 4)}</pre>
      </div>
    </Wrapper>
  );
};

const WrappedSimple = (args) => {
  const [value, setValue] = React.useState({
    '001': 'manual',
    '002': 'questions & answers',
  });
  const onChange = (block, value) => setValue(value);

  return (
    <Wrapper
      location={{ pathname: '/folder2/folder21/doc212' }}
      customStore={customStore}
    >
      <div className="ui segment form attached">
        <VocabularyTermsWidget
          {...args}
          id="Simple"
          title="Vocabulary terms"
          block="testBlock"
          value={value}
          value_type={{
            schema: {
              type: 'string',
            },
          }}
          onChange={onChange}
        />
        <pre>{JSON.stringify(value, null, 4)}</pre>
      </div>
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
