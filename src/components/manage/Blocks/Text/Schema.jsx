import BlockSettingsSchema from '@plone/volto/components/manage/Blocks/Block/Schema';

const Schema = {
  ...BlockSettingsSchema,
  fieldsets: [{
    ...BlockSettingsSchema.fieldsets[0],
    fields: [
      ...BlockSettingsSchema.fieldsets[0].fields,
        "minLength",
        "maxLength",
    ]
  }],
  properties: {
    ...BlockSettingsSchema.properties,
    minLength: {
      title: "Min length",
      description: "Text minimum length",
      type: 'integer',
    },
    maxLength: {
      title: "Max length",
      description: "Text maximum length",
      type: 'integer',
    },
  }
}

export default Schema;
