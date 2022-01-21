import VocabularyTermsWidget from './VocabularyTermsWidget';
import React from 'react';

import WidgetStory from './story';

export const JSONField = WidgetStory.bind({
  props: { id: 'simplevocabulary', title: 'Vocabulary terms' },
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
