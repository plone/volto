export const conditionalVariationsSchemaEnhancer = ({
  schema,
  formData,
  intl,
  navRoot,
  contentType,
}) => {
  console.log(contentType);
  if (schema.properties.variation && contentType === 'Event') {
    schema.properties.variation.choices[1][1] = 'Custom modified variation';
  }
  return schema;
};
