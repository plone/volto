import BlockSettingsSchema from '@plone/volto/components/manage/Blocks/Block/Schema';

const Schema = {
  ...BlockSettingsSchema,
  fieldsets: [
    {
      ...BlockSettingsSchema.fieldsets[0],
      // fields: [
      //   ...BlockSettingsSchema.fieldsets[0].fields,
      //   'minSize',
      //   'maxSize',
      // ],
    },
  ],
  properties: {
    ...BlockSettingsSchema.properties,
    /* TODO Enable when we have validators inplace */
    // minSize: {
    //   title: 'Min size',
    //   description: 'Minimum image size',
    //   type: 'integer',
    // },
    // maxSize: {
    //   title: 'Max size',
    //   description: 'Maximum image size',
    //   type: 'integer',
    // },
  },
};

export default Schema;
