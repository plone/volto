import config from '@plone/volto/registry';
import FormValidation from '../FormValidation/FormValidation';

/**
 * Validates a block and its internal blocks (if it has blocks and blocks_layout).
 * @param {Object} blockFormData - The block data to validate.
 * @param {Object} intl - The internationalization object. -
 * @param {number} depth - The current depth of block validation.
 * @param {boolean} isColumn - Whether the block is a column.
 * @returns {Object} - An object containing the validation errors.
 */
const blockFormDataValidator = (
  blockFormData,
  intl,
  depth = 0,
  isColumn = false,
) => {
  const blockSchema = getBlockSchema(blockFormData, intl);
  const validationErrors = FormValidation.validateFieldsPerFieldset({
    schema: blockSchema,
    formData: blockFormData,
    formatMessage: intl.formatMessage,
  });
  const internalBlockErrors = validateInternalBlocks(
    blockFormData,
    intl,
    depth,
    isColumn,
  );
  return mergeErrors(validationErrors, internalBlockErrors, depth);
};

/**
 * Retrieves the schema for the block.
 * @param {Object} blockFormData - The block data to validate.
 * @param {Object} intl - The internationalization object.
 * @returns {Object} - The schema for the block.
 */
const getBlockSchema = (blockFormData, intl) => {
  const defaultSchema = {
    properties: {},
    fieldsets: [],
    required: [],
  };
  const blockType = blockFormData['@type'];
  const blockSchema =
    config.blocks.blocksConfig[blockType]?.blockSchema || defaultSchema;
  return typeof blockSchema === 'function'
    ? blockSchema({ intl, formData: blockFormData })
    : blockSchema;
};

/**
 * Validates internal blocks and their layout.
 * @param {Object} blockFormData - The block data to validate.
 * @param {Object} intl - The internationalization object.
 * @param {number} depth - The current depth of block validation.
 * @param {boolean} isColumn - Whether the block is a column.
 * @returns {Object} - The validation errors for the internal blocks.
 */
const validateInternalBlocks = (blockFormData, intl, depth, isColumn) => {
  const blocks = blockFormData.blocks || blockFormData.data?.blocks;
  const blocksLayout =
    blockFormData.blocks_layout || blockFormData.data?.blocks_layout;
  const column = isColumn || Boolean(blockFormData.data?.blocks_layout);

  if (!blocks || !blocksLayout) return {};

  return blocksLayout.items.reduce((acc, internalBlockId) => {
    const internalBlockFormData = blocks[internalBlockId];
    if (!internalBlockFormData) return acc;

    const internalBlockErrors = blockFormDataValidator(
      internalBlockFormData,
      intl,
      depth + 1,
      column,
    );

    return mergeErrors(
      acc,
      internalBlockErrors,
      depth,
      isColumn,
      internalBlockId,
    );
  }, {});
};

/**
 * Merges the validation errors.
 * @param {Object} validationErrors - The current validation errors.
 * @param {Object} internalBlockErrors - The internal block validation errors.
 * @param {number} depth - The current depth of block validation.
 * @param {string} [internalBlockId] - The ID of the internal block (if applicable).
 * @returns {Object} - The merged validation errors.
 */
const mergeErrors = (
  validationErrors,
  internalBlockErrors,
  depth,
  isColumn,
  internalBlockId,
) => {
  if (Object.keys(internalBlockErrors).length === 0) return validationErrors;

  if (internalBlockId) {
    return {
      ...validationErrors,
      ...(isColumn
        ? internalBlockErrors
        : { [internalBlockId]: internalBlockErrors }),
    };
  }

  return {
    ...validationErrors,
    ...(depth === 0
      ? { '@internal_errors': internalBlockErrors }
      : internalBlockErrors),
  };
};

class BlockValidation {
  /**
   * Validates a block and its internal blocks (if it has blocks and blocks_layout).
   * @param {Object} blockFormData - The block form data to validate.
   * @param {Object} intl - The internationalization object. -
   * @returns {Object} - An object containing the validation errors.
   */
  static blockFormDataValidator(blockFormData, intl) {
    return blockFormDataValidator(blockFormData, intl);
  }
}

export default BlockValidation;

export const extractFirstMessageToast = (blocksErrors) => {
  const [blockId, blockError] = Object.entries(blocksErrors)[0];
  const [errorField, errorMessage] = Object.entries(blockError)[0];

  if (errorField === '@internal_errors') {
    const [internalBlockId, internalErrors] = Object.entries(
      blockError['@internal_errors'],
    )[0];
    const [internalErrorField, internalErrorMessage] =
      Object.entries(internalErrors)[0];

    return {
      blockId,
      errorField: internalErrorField,
      errorMessage: internalErrorMessage,
      uiState: {
        selected: blockId,
        multiSelected: [],
        gridSelected: internalBlockId,
      },
    };
  }

  return {
    blockId,
    errorField,
    errorMessage,
    uiState: {
      selected: blockId,
      multiSelected: [],
      hovered: null,
    },
  };
};
