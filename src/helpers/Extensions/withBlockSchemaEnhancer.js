import React from 'react';
import { useIntl } from 'react-intl';
import config from '@plone/volto/registry';
import { cloneDeep, isEmpty } from 'lodash';

function defaultAddField(schema, name) {
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
  extensions,
  intl,
  title,
  description,
  insertFieldToOrder = defaultAddField,
}) => {
  const _ = intl.formatMessage;

  insertFieldToOrder(schema, name);

  const hasDefaultExtension =
    extensions.findIndex(({ id }) => id === 'default') > -1;

  if (!hasDefaultExtension) {
    // eslint-disable-next-line
    console.warn(
      'You should provide a default extension in extensions: ',
      extensions,
    );
  }

  schema.properties[name] = {
    title: _(title),
    choices: extensions.map(({ id, label }) => [
      id,
      _({ id, defaultMessage: label }),
    ]),
    noValueOption: false,
  };

  return schema;
};

function hasMultipleExtensions(extensions) {
  return isEmpty(extensions)
    ? false
    : (Array.isArray(extensions) && extensions.length > 1) ||
        Object.keys(extensions).length > 1;
}

export const withBlockSchemaEnhancer = (
  FormComponent,
  {
    extensionName = 'variation',
    title = {
      id: 'Variation',
      defaultMessage: 'Variation',
    },
    description,
    insertFieldToOrder = defaultAddField,
  },
) => ({ ...props }) => {
  const { formData, schema: originalSchema } = props;
  const intl = useIntl();

  const { blocks } = config;

  const blockType = formData['@type'];
  const extensions =
    blocks?.blocksConfig[blockType]?.extensions?.[extensionName];

  const currentExtension = formData?.[extensionName];
  const definition = extensions?.[currentExtension];

  const schemaEnhancer =
    // For the main "variation" of blocks, allow simply passing a
    // schemaEnhancer in the block configuration
    definition?.['schemaEnhancer'] ||
    (extensionName === 'variation' &&
      blocks.blocksConfig?.[blockType]?.['schemaEnhancer']);

  let schema = cloneDeep(originalSchema);
  if (schemaEnhancer) {
    schema = schemaEnhancer({ schema: originalSchema, formData, intl });
  }

  if (hasMultipleExtensions(extensions)) {
    addExtensionFieldToSchema({
      schema,
      name: extensionName,
      extensions,
      intl,
      title,
      description,
      insertFieldToOrder,
    });
  }

  return <FormComponent {...props} schema={schema} />;
};
