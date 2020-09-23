import BlockSettingsSchema from '@plone/volto/components/manage/Blocks/Block/Schema';

const Schema = {
  ...BlockSettingsSchema,
  properties: {
    ...BlockSettingsSchema.properties,
    placeholder: {
      ...BlockSettingsSchema.properties.placeholder,
      title: 'Title',
      description: 'Table of contents heading text',
    },
  },
};

export default Schema;
