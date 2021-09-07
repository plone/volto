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

const customStoreTranslations = {
  userSession: { token: '1234' },
  intl: {
    locale: 'it',
    messages: {},
  },
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

const WrappedTranslations = (args) => {
  const [value, setValue] = React.useState({
    '001': {
      en: 'manual',
      it: 'manuale',
      de: 'Anleitung',
    },
    '002': {
      en: 'questions & answers',
      it: 'domande frequenti',
      de: 'FAQs',
    },
  });
  const onChange = (block, value) => setValue(value);

  return (
    <Wrapper
      location={{ pathname: '/folder2/folder21/doc212' }}
      customStore={customStoreTranslations}
    >
      <div className="ui segment form attached">
        <VocabularyTermsWidget
          {...args}
          id="Translations"
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

export const Simple = () => <WrappedSimple />;

export const Translations = () => <WrappedTranslations />;
