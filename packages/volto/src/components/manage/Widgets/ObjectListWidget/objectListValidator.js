/**
 * ObjectListWidget validator
 * @module components/manage/Widgets/ObjectListWidget/validator
 */

import isObject from 'lodash/isObject';
import FormValidation from '@plone/volto/helpers/FormValidation/FormValidation';

/**
 * Validador para o widget object_list
 * Valida recursivamente cada item na lista de objetos
 */
export const objectListValidator = ({ value, field, formatMessage }) => {
  if (!Array.isArray(value) || !field.schema) return null;

  // Agrupa erros por campo, igual ao FormValidation
  const errors = [];

  value.forEach((item, index) => {
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

  return errors.length > 0 ? errors : null;
};

export default objectListValidator;
