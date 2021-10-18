import { defineMessages } from 'react-intl';

const messages = defineMessages({
  titleField: {
    id: 'Title field',
    defaultMessage: 'Title field',
  },
  descriptionField: {
    id: 'Description field',
    defaultMessage: 'Description field',
  },
  variationConfig: {
    id: 'Show variation config',
    defineMessages: 'Show variation config',
  },
});
export const defaultTemplateSchema = (props) => {
  const { intl, schema, formData } = props;
  schema.fieldsets.map((fieldset) => {
    if (fieldset.id === 'default') {
      fieldset.fields = ['variationConfiguration', ...fieldset.fields];
    }
    return fieldset;
  });
  return {
    ...schema,
    fieldsets: [
      ...schema.fieldsets,
      ...(formData?.variationConfiguration
        ? [
            {
              id: 'variation',
              title: 'Variation',
              fields: ['variationTitle', 'variationDescription'],
            },
          ]
        : []),
    ],
    properties: {
      ...schema.properties,
      variationTitle: {
        title: intl.formatMessage(messages.titleField),
      },
      variationDescription: {
        title: intl.formatMessage(messages.descriptionField),
      },
      variationConfiguration: {
        title: intl.formatMessage(messages.variationConfig),
        type: 'boolean',
        default: false,
      },
    },
    required: [],
  };
};
