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

  // Group errors by field, same as FormValidation
  const errors = [];

  value.forEach((item) => {
    const fieldId = item['@id'];

    if (!isObject(item)) return;

    let itemSchema = field.schema;
    if (typeof field.schemaExtender === 'function') {
      itemSchema = field.schemaExtender(field.schema, item, formatMessage);
    }
    if (!itemSchema?.properties) return;

    const fieldErrors = FormValidation.validateFieldsPerFieldset({
      schema: itemSchema,
      formData: item,
      formatMessage,
    });

    if (Object.keys(fieldErrors).length > 0 && fieldId) {
      errors[fieldId] = fieldErrors;
    }
  });

  const customErrors = [];
  customErrors.internalErros = errors;

  return Object.keys(errors).length > 0 ? customErrors : null;
};

export default objectListValidator;
