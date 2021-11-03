import { defineMessages } from 'react-intl';
import React from 'react';
import { useIntl } from 'react-intl';
import config from '@plone/volto/registry';
import { cloneDeep } from 'lodash';

const messages = defineMessages({
  variation: {
    id: 'Variation',
    defaultMessage: 'Variation',
  },
});

/**
 * Sets the field name as first field in schema
 */
function _addField(schema, name) {
  if (schema.fieldsets[0].fields.indexOf(name) === -1) {
    schema.fieldsets[0].fields.unshift(name);
  }
}

/**
 * Utility function that adds the Select dropdown field to a schema
 */
export const addExtensionFieldToSchema = ({
  schema,
  name,
  items,
  intl,
  title,
  description,
  insertFieldToOrder = _addField,
}) => {
  const _ = intl.formatMessage;

  insertFieldToOrder(schema, name);

  const hasDefaultExtension =
    items?.findIndex(({ isDefault }) => isDefault) > -1;

  if (!hasDefaultExtension) {
    // eslint-disable-next-line
    console.warn('You should provide a default extension in extension:', name);
  }

  schema.properties[name] = {
    title: _(title),
    choices: items?.map(({ id, title }) => [
      id,
      _({ id: title, defaultMessage: title }),
    ]),
    noValueOption: false,
    default: hasDefaultExtension
      ? items?.find((item) => item.isDefault).id
      : null,
  };

  return schema;
};

export const withBlockSchemaEnhancer = (
  FormComponent,
  extensionName = 'vendor',
  insertFieldToOrder = _addField,
) => ({ ...props }) => {
  const { formData, schema: originalSchema } = props;
  const intl = useIntl();

  const { blocks } = config;

  const blockType = formData['@type'];
  const extensionConfig =
    blocks?.blocksConfig[blockType]?.extensions?.[extensionName];

  if (!extensionConfig)
    return <FormComponent {...props} schema={originalSchema} />;

  const activeItemName = formData?.[extensionName];
  let activeItem = extensionConfig.items?.find(
    (item) => item.id === activeItemName,
  );
  if (!activeItem)
    activeItem = extensionConfig.items?.find((item) => item.isDefault);

  const schemaEnhancer =
    // For the main "variation" of blocks, allow simply passing a
    // schemaEnhancer in the block configuration
    activeItem?.['schemaEnhancer'] ||
    (extensionName === 'variation' &&
      blocks.blocksConfig?.[blockType]?.schemaEnhancer);

  let schema = schemaEnhancer
    ? schemaEnhancer({ schema: cloneDeep(originalSchema), formData, intl })
    : cloneDeep(originalSchema);

  const { title = messages.variation, description } = extensionConfig;

  if (extensionConfig.items?.length > 1) {
    addExtensionFieldToSchema({
      schema,
      name: extensionName,
      items: extensionConfig.items || [],
      intl,
      title,
      description,
      insertFieldToOrder,
    });
  }

  return <FormComponent {...props} schema={schema} />;
};

export const applySchemaEnhancer = ({
  schema: originalSchema,
  formData,
  intl,
}) => {
  let schema, schemaEnhancer;
  const { blocks } = config;

  const blockType = formData['@type'];
  const variations = blocks?.blocksConfig[blockType]?.variations || [];

  if (variations.length === 0) {
    // No variations present but anyways
    // finalize the schema with a schemaEnhancer in the block config is present
    schemaEnhancer = blocks.blocksConfig?.[blockType]?.schemaEnhancer;
    if (schemaEnhancer)
      schema = schemaEnhancer({ schema: originalSchema, formData, intl });
    return schema || originalSchema;
  }

  const activeItemName = formData?.variation;
  let activeItem = variations.find((item) => item.id === activeItemName);
  if (!activeItem) activeItem = variations.find((item) => item.isDefault);

  schemaEnhancer = activeItem?.['schemaEnhancer'];

  schema = schemaEnhancer
    ? schemaEnhancer({ schema: cloneDeep(originalSchema), formData, intl })
    : cloneDeep(originalSchema);

  // Finalize the schema with a schemaEnhancer in the block config;
  schemaEnhancer = blocks.blocksConfig?.[blockType]?.schemaEnhancer;
  if (schemaEnhancer) schema = schemaEnhancer({ schema, formData, intl });

  return schema || originalSchema;
};

export const withVariationSchemaEnhancer = (FormComponent) => (props) => {
  const { formData, schema: originalSchema } = props;
  const intl = useIntl();

  const { blocks } = config;

  const blockType = formData['@type'];
  const variations = blocks?.blocksConfig[blockType]?.variations || [];

  let schema = applySchemaEnhancer({ schema: originalSchema, formData, intl });

  if (variations.length > 1) {
    addExtensionFieldToSchema({
      schema,
      name: 'variation',
      items: variations,
      intl,
      title: messages.variation,
      insertFieldToOrder: _addField,
    });
  }

  return <FormComponent {...props} schema={schema} />;
};
