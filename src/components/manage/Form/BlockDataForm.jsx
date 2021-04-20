import React from 'react';
import { defineMessages, useIntl } from 'react-intl';
import { InlineForm } from '@plone/volto/components';
import config from '@plone/volto/registry';
import { cloneDeep } from 'lodash';

const messages = defineMessages({
  Variation: {
    id: 'Variation',
    defaultMessage: 'Variation',
  },
});

export const addVariationsFieldToSchema = ({
  schema,
  currentVariation,
  variations,
  intl,
}) => {
  const _ = intl.formatMessage;

  if (schema.fieldsets[0].fields.indexOf('variation') === -1) {
    schema.fieldsets[0].fields.unshift('variation');
  }
  schema.properties.variation = {
    title: _(messages.Variation),
    choices: Object.keys(variations).map((key) => [
      key,
      _({
        id: variations[key].label,
        defaultMessage: variations[key].label,
      }),
    ]),
    noValueOption: false,
  };

  return schema;
};

const withBlockDataForm = (Component) => ({ ...props }) => {
  const { formData, schema: originalSchema } = props;
  const intl = useIntl();

  const { blocks } = config;

  // Add variations and schemaEnhancer aware to the component
  const blockType = formData['@type'];
  const variations = blocks?.blocksConfig[blockType]?.variations;
  const currentVariation = formData?.variation;
  const variationConfig = variations?.[currentVariation];
  const schemaEnhancer =
    // Look if a schemaEnhancer is defined in the current block variation
    // or it is defined in the main block or null
    variationConfig?.['schemaEnhancer'] ||
    blocks.blocksConfig?.[blockType]?.['schemaEnhancer'] ||
    null;

  let schema = cloneDeep(originalSchema);
  if (schemaEnhancer) {
    schema = schemaEnhancer({ schema: originalSchema, formData, intl });
  }

  if (variations) {
    addVariationsFieldToSchema({ schema, currentVariation, variations, intl });
  }

  return <Component {...props} schema={schema} />;
};

export default withBlockDataForm(InlineForm);
