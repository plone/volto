import { defineMessages, useIntl } from 'react-intl';

const messages = defineMessages({
  advancedSettings: {
    id: 'Advanced settings',
    defaultMessage: 'Advanced settings',
  },
  overrideTOCEntry: {
    id: 'Override TOC entry',
    defaultMessage: 'Override TOC entry',
  },
  tOCEntryLevel: {
    id: 'TOC entry level',
    defaultMessage: 'TOC entry level',
  },
  entryTextForTOC: {
    id: 'Entry text for TOC',
    defaultMessage: 'Entry text for TOC',
  },
  h1: {
    id: 'H1',
    defaultMessage: 'H1',
  },
  h2: {
    id: 'H2',
    defaultMessage: 'H2',
  },
  h3: {
    id: 'H3',
    defaultMessage: 'H3',
  },
  h4: {
    id: 'H4',
    defaultMessage: 'H4',
  },
  h5: {
    id: 'H5',
    defaultMessage: 'H5',
  },
  h6: {
    id: 'H6',
    defaultMessage: 'H6',
  },
});

const TextBlockSchema = (data) => {
  const { override_toc } = data;
  const intl = useIntl();
  return {
    title: intl.formatMessage(messages.advancedSettings),
    fieldsets: [
      {
        id: 'default',
        title: 'Default',
        fields: [
          'override_toc',
          ...(override_toc ? ['level', 'entry_text'] : []),
        ],
      },
    ],
    properties: {
      override_toc: {
        title: intl.formatMessage(messages.overrideTOCEntry),
        type: 'boolean',
      },
      level: {
        title: intl.formatMessage(messages.tOCEntryLevel),
        choices: [
          ['h1', intl.formatMessage(messages.h1)],
          ['h2', intl.formatMessage(messages.h2)],
          ['h3', intl.formatMessage(messages.h3)],
          ['h4', intl.formatMessage(messages.h4)],
          ['h5', intl.formatMessage(messages.h5)],
          ['h6', intl.formatMessage(messages.h6)],
        ],
      },
      entry_text: {
        title: intl.formatMessage(messages.entryTextForTOC),
      },
    },
    required: [],
  };
};

export default TextBlockSchema;
