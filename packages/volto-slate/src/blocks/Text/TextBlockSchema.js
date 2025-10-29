import { defineMessages } from 'react-intl';

const messages = defineMessages({
  textBlockSettings: {
    id: 'Text block settings',
    defaultMessage: 'Text block settings',
  },
  placeholderHelperText: {
    id: 'Helper text',
    defaultMessage: 'Helper text',
  },
  descriptionHelperText: {
    id: 'A short hint that describes the expected value within this block',
    defaultMessage:
      'A short hint that describes the expected value within this block',
  },
  instructions: {
    id: 'Instructions',
    defaultMessage: 'Instructions',
  },
  descriptionInstructions: {
    id: 'Detailed expected value within this block',
    defaultMessage: 'Detailed expected value within this block',
  },
  required: {
    id: 'Required',
    defaultMessage: 'Required',
  },
  descriptionRequired: {
    id: 'Disable deletion of this block',
    defaultMessage: 'Disable deletion of this block',
  },
  fixedPosition: {
    id: 'Fixed position',
    defaultMessage: 'Fixed position',
  },
  descriptionFixedPosition: {
    id: 'Disable drag and drop on this block',
    defaultMessage: 'Disable drag and drop on this block',
  },
  disableNewBlocks: {
    id: 'Disable new blocks',
    defaultMessage: 'Disable new blocks',
  },
  descriptionDisableNewBlocks: {
    id: 'Disable creation of new blocks after this block',
    defaultMessage: 'Disable creation of new blocks after this block',
  },
  readOnly: {
    id: 'Read only',
    defaultMessage: 'Read only',
  },
  descriptionReadOnly: {
    id: 'Disable editing on this block',
    defaultMessage: 'Disable editing on this block',
  },
  default: {
    id: 'Default',
    defaultMessage: 'Default',
  },
});

const Schema = ({ intl }) => ({
  title: intl.formatMessage(messages.textBlockSettings),
  fieldsets: [
    {
      id: 'default',
      title: intl.formatMessage(messages.default),
      fields: [
        'placeholder',
        'instructions',
        'required',
        'fixed',
        'disableNewBlocks',
        'readOnly',
      ],
    },
  ],
  properties: {
    placeholder: {
      title: intl.formatMessage(messages.placeholderHelperText),
      description: intl.formatMessage(messages.descriptionHelperText),
      type: 'string',
    },
    instructions: {
      title: intl.formatMessage(messages.instructions),
      description: intl.formatMessage(messages.descriptionInstructions),
      type: 'string',
      widget: 'richtext',
    },
    required: {
      title: intl.formatMessage(messages.required),
      description: intl.formatMessage(messages.descriptionRequired),
      type: 'boolean',
    },
    fixed: {
      title: intl.formatMessage(messages.fixedPosition),
      description: intl.formatMessage(messages.descriptionFixedPosition),
      type: 'boolean',
    },
    disableNewBlocks: {
      title: intl.formatMessage(messages.disableNewBlocks),
      description: intl.formatMessage(messages.descriptionDisableNewBlocks),
      type: 'boolean',
    },
    readOnly: {
      title: intl.formatMessage(messages.readOnly),
      description: intl.formatMessage(messages.descriptionReadOnly),
      type: 'boolean',
    },
  },
  required: [],
});

export default Schema;
