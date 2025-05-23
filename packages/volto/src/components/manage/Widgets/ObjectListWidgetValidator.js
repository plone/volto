/**
 * ObjectListWidget validator
 * @module components/manage/Widgets/ObjectListWidget/validator
 */

import isObject from 'lodash/isObject';
import FormValidation from '@plone/volto/helpers/FormValidation/FormValidation';

/**
 * Validator for the object_list widget
 * Recursively validates each item in the list of objects
 */
export const objectListValidator = ({ value, field, formatMessage }) => {
  if (!Array.isArray(value) || !field.schema) return null;

  const errors = value.reduce((acc, item) => {
    const fieldId = item['@id'];

    if (!isObject(item)) return acc;

    let itemSchema = field.schema;
    if (typeof field.schemaExtender === 'function') {
      itemSchema = field.schemaExtender(field.schema, item, formatMessage);
    }
    if (!itemSchema?.properties) return acc;

    const fieldErrors = FormValidation.validateFieldsPerFieldset({
      schema: itemSchema,
      formData: item,
      formatMessage,
    });

    if (Object.keys(fieldErrors).length > 0 && fieldId) {
      acc[fieldId] = fieldErrors;
    }
    return acc;
  }, {});

  const customErrors = [];
  customErrors.internalErros = errors;

  return Object.keys(errors).length ? customErrors : null;
};

export default objectListValidator;
