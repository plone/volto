import BlockSettingsSchema from '@plone/volto/components/manage/Blocks/Block/Schema';

const Schema = {
  ...BlockSettingsSchema,
  fieldsets: [
    {
      ...BlockSettingsSchema.fieldsets[0],
      // fields: [
      //   ...BlockSettingsSchema.fieldsets[0].fields,
      //   'minLength',
      //   'maxLength',
      // ],
    },
  ],
  properties: {
    ...BlockSettingsSchema.properties,
    /* TODO Enable when we have block validation inplace */
    // minLength: {
    //   title: 'Min length',
    //   description: 'Minimum number of characters',
    //   type: 'integer',
    // },
    // maxLength: {
    //   title: 'Max length',
    //   description: 'Maximum number of characters',
    //   type: 'integer',
    // },
  },
};

export default Schema;
