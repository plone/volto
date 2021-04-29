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
  extensionConfig,
  intl,
  title,
  description,
  insertFieldToOrder = _addField,
}) => {
  const _ = intl.formatMessage;

  insertFieldToOrder(schema, name);

  const hasDefaultExtension =
    extensionConfig?.items?.findIndex(({ isDefault }) => isDefault) > -1;

  if (!hasDefaultExtension) {
    // eslint-disable-next-line
    console.warn(
      'You should provide a default extension in extensions: ',
      extensionConfig,
    );
  }

  schema.properties[name] = {
    title: _(title),
    choices: extensionConfig?.items?.map(({ id, title }) => [
      id,
      _({ id, defaultMessage: title }),
    ]),
    noValueOption: false,
  };

  return schema;
};

export const withBlockSchemaEnhancer = (
  FormComponent,
  extensionName = 'variation',
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
      extensionConfig,
      intl,
      title,
      description,
      insertFieldToOrder,
    });
  }

  return <FormComponent {...props} schema={schema} />;
};
