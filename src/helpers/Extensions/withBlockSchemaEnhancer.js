import React from 'react';
import { defineMessages } from 'react-intl';
import { useIntl } from 'react-intl';
import config from '@plone/volto/registry';
import { cloneDeepSchema } from '@plone/volto/helpers/Utils/Utils';

const messages = defineMessages({
  variation: {
    id: 'Variation',
    defaultMessage: 'Variation',
  },
  styling: {
    id: 'Styling',
    defaultMessage: 'Styling',
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
 * Gets the blocksConfig from the props or from the global config object
 */
function getBlocksConfig(props) {
  const { blocks } = config;

  if (props.blocksConfig) {
    return props.blocksConfig;
  }

  return blocks?.blocksConfig;
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

/**
 * A generic HOC that provides "schema enhancer functionality" for any custom
 * block extension.
 *
 * This enables blocks to have additional "variations", beyond the usual
 * `variations` field. This function is not directly used by Volto.
 *
 * To be used with a block configuration like:
 *
 * ```
 *  {
 *    id: 'someBlockId',
 *    extensions: {
 *      '<someExtensionName>': {
 *        items: [
 *          {
 *            id: 'selectFacet',
 *            title: 'Select',
 *            view: SelectFacet,
 *            isDefault: true,
 *          },
 *          {
 *            id: 'checkboxFacet',
 *            title: 'Checkbox',
 *            view: CheckboxFacet,
 *            isDefault: false,
 *          },
 *        ]
 *      }
 *     }
 *  }
 * ```
 */
export const withBlockSchemaEnhancer = (
  FormComponent,
  extensionName = 'vendor',
  insertFieldToOrder = _addField,
) => ({ ...props }) => {
  const { formData, schema: originalSchema } = props;
  const intl = useIntl();

  const blocksConfig = getBlocksConfig(props);

  const blockType = formData['@type'];
  const extensionConfig =
    blocksConfig?.[blockType]?.extensions?.[extensionName];

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
      blocksConfig?.[blockType]?.schemaEnhancer);

  let schema = schemaEnhancer
    ? schemaEnhancer({
        schema: cloneDeepSchema(originalSchema),
        formData,
        intl,
      })
    : cloneDeepSchema(originalSchema);

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

/**
 * Apply block variation schema enhancers to the provided schema, using block
 * information from the provided block data (as `formData`).
 *
 * Blocks can be enhanced with variations declared like:
 *
 * ```
 *  {
 *    id: 'searchBlock',
 *    schemaEnhancer: ({schema, formData, intl}) => schema,
 *    variations: [
 *      {
 *        id: 'facetsRightSide',
 *        title: 'Facets on right side',
 *        view: RightColumnFacets,
 *        isDefault: true,
 *      },
 *      {
 *        id: 'facetsLeftSide',
 *        title: 'Facets on left side',
 *        view: LeftColumnFacets,
 *        isDefault: false,
 *        schemaEnhancer: ({schema, formData, intl}) => schema,
 *      },
 *    ],
 *
 * ```
 * Notice that each variation can declare an option schema enhancer, and each
 * block supports an optional `schemaEnhancer` function.
 */
export const applySchemaEnhancer = ({
  schema: originalSchema,
  formData,
  intl,
  blocksConfig = config.blocks.blocksConfig,
}) => {
  let schema, schemaEnhancer;

  const blockType = formData['@type'];
  const variations = blocksConfig?.[blockType]?.variations || [];

  if (variations.length === 0) {
    // No variations present but we finalize the schema with a schemaEnhancer
    // in the block config (if present)
    schemaEnhancer = blocksConfig?.[blockType]?.schemaEnhancer;

    if (schemaEnhancer)
      schema = schemaEnhancer({
        schema: cloneDeepSchema(originalSchema),
        formData,
        intl,
      });
    return schema || originalSchema;
  }

  const activeItemName = formData?.variation;
  let activeItem = variations.find((item) => item.id === activeItemName);
  if (!activeItem) activeItem = variations.find((item) => item.isDefault);

  schemaEnhancer = activeItem?.['schemaEnhancer'];

  schema = schemaEnhancer
    ? schemaEnhancer({
        schema: cloneDeepSchema(originalSchema),
        formData,
        intl,
      })
    : cloneDeepSchema(originalSchema);

  // Finalize the schema with a schemaEnhancer in the block config;
  schemaEnhancer = blocksConfig?.[blockType]?.schemaEnhancer;
  if (schemaEnhancer) schema = schemaEnhancer({ schema, formData, intl });

  return schema || originalSchema;
};

/**
 * A HOC that enhances the incoming schema prop with block variations support
 * by:
 *
 * - applies the selected variation's schema enhancer
 * - adds the variation selection input (as a choice widget)
 */
export const withVariationSchemaEnhancer = (FormComponent) => (props) => {
  const { formData, schema: originalSchema } = props;
  const intl = useIntl();

  const blocksConfig = getBlocksConfig(props);

  const blockType = formData['@type'];
  const variations = blocksConfig[blockType]?.variations || [];

  let schema = applySchemaEnhancer({
    schema: originalSchema,
    formData,
    intl,
    blocksConfig,
  });

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

export const EMPTY_STYLES_SCHEMA = {
  fieldsets: [
    {
      id: 'default',
      title: 'Default',
      fields: [],
    },
  ],
  properties: {},
  required: [],
};

/**
 * Creates the `styles` field and fieldset in a schema
 */
export const addStyling = ({ schema, formData, intl }) => {
  schema.fieldsets.push({
    id: 'styling',
    title: intl.formatMessage(messages.styling),
    fields: ['styles'],
  });

  schema.properties.styles = {
    widget: 'object',
    title: intl.formatMessage(messages.styling),
    schema: EMPTY_STYLES_SCHEMA,
  };
  return schema;
};

/**
 * Allows compose-like declaration of schema enhancers
 *
 * Example usage:
 * const schemaEnhancer = composeSchema(schemaEnhancerA, schemaEnhancerB)
 *
 * where each enhancer is a function with signature
 * ({schema, formData, ...rest}) => schema
 *
 */
export function composeSchema() {
  const enhancers = Array.from(arguments);
  const composer = (args) => {
    const props = enhancers.reduce(
      (acc, enhancer) => (enhancer ? { ...acc, schema: enhancer(acc) } : acc),
      { ...args },
    );
    return props.schema;
  };
  return composer;
}
