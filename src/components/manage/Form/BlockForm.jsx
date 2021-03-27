import PropTypes from 'prop-types';
import { defineMessages, injectIntl } from 'react-intl';
import React from 'react';
import { InlineForm } from '@plone/volto/components';
import config from '@plone/volto/registry';

const messages = defineMessages({
  Variation: {
    id: 'Variation',
    defaultMessage: 'Variation',
  },
  editValues: {
    id: 'Edit values',
    defaultMessage: 'Edit values',
  },
  error: {
    id: 'Error',
    defaultMessage: 'Error',
  },
  thereWereSomeErrors: {
    id: 'There were some errors',
    defaultMessage: 'There were some errors',
  },
});

export const addVariationsFieldToSchema = ({
  schema,
  currentVariation,
  variations,
  intl,
}) => {
  const _ = intl.formatMessage;

  schema.fieldsets[0].fields.unshift('variation');
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

const BlockForm = (props) => {
  const { formData, intl, schema: originalSchema } = props;
  const { blocks } = config;

  // Variations and schemaEnhancer aware
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

  let schema = originalSchema;
  if (schemaEnhancer) {
    schema = schemaEnhancer({ schema: originalSchema, formData, intl });
  }

  if (variations) {
    addVariationsFieldToSchema({ schema, currentVariation, variations, intl });
  }

  return <InlineForm {...props} schema={schema} />;
};

BlockForm.defaultProps = {
  block: null,
  description: null,
  formData: null,
  onChangeField: null,
  error: null,
  errors: {},
  schema: {},
};

BlockForm.propTypes = {
  block: PropTypes.string,
  description: PropTypes.string,
  schema: PropTypes.shape({
    fieldsets: PropTypes.arrayOf(
      PropTypes.shape({
        fields: PropTypes.arrayOf(PropTypes.string),
        id: PropTypes.string,
        title: PropTypes.string,
      }),
    ),
    properties: PropTypes.objectOf(PropTypes.any),
    definitions: PropTypes.objectOf(PropTypes.any),
    required: PropTypes.arrayOf(PropTypes.string),
  }),
  formData: PropTypes.objectOf(PropTypes.any),
  pathname: PropTypes.string,
  onChangeField: PropTypes.func,
  error: PropTypes.shape({
    message: PropTypes.string,
  }),
};

export default injectIntl(BlockForm, { forwardRef: true });
