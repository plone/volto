import React from 'react';
import VocabularyTermsWidget from './VocabularyTermsWidget';
import WidgetStory from './story';

export const VocabularyTerms = WidgetStory.bind({
  props: { id: 'vocabularyterms', title: 'Vocabulary terms', block: 'block' },
  widget: VocabularyTermsWidget,
  customStore: {
    userSession: { token: '1234' },
    intl: {
      locale: 'en',
      messages: {},
    },
  },
  initialValue: {
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
  },
});
VocabularyTerms.args = {};

export default {
  title: 'Edit Widgets/VocabularyTerms',
  component: VocabularyTermsWidget,
  argTypes: {},
  decorators: [
    (Story) => (
      <div className="ui segment form attached" style={{ width: '600px' }}>
        <Story />
      </div>
    ),
  ],
};
