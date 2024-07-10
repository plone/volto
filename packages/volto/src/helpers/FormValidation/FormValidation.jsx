import { map, keys, intersection, isEmpty } from 'lodash';
import { messages } from '../MessageLabels/MessageLabels';
import config from '@plone/volto/registry';
import { toast } from 'react-toastify';
import Toast from '@plone/volto/components/manage/Toast/Toast';

/**
 * Will return the intl message if invalid
 * @param {boolean} isValid
 * @param {string} criterion
 * @param {string | number} valueToCompare can compare '47' < 50
 * @param {Function} intlFunc
 */
export const validationMessage = (
  isValid,
  criterion,
  valueToCompare,
  intlFunc,
) =>
  !isValid
    ? intlFunc(messages[criterion], {
        len: valueToCompare,
      })
    : null;

/**
 * The string that comes might not be a valid JSON
 * @param {string} requestItem
 */
export const tryParseJSON = (requestItem) => {
  let resultObj = null;
  try {
    resultObj = JSON.parse(requestItem);
  } catch (e) {
    try {
      resultObj = JSON.parse(requestItem.replace(/'/g, '"'));
    } catch (e) {
      resultObj = null;
    }
  }
  return resultObj;
};

/**
 * If required fields are undefined, return list of errors
 * @returns {Object[string]} - list of errors
 */
const validateRequiredFields = (
  schema,
  formData,
  formatMessage,
  touchedField,
) => {
  const errors = {};
  const fields = isEmpty(touchedField)
    ? schema.required
    : intersection(schema.required, keys(touchedField));
  map(fields, (requiredField) => {
    const type = schema.properties[requiredField]?.type;
    const widget = schema.properties[requiredField]?.widget;

    let isEmpty = !formData[requiredField] && formData[requiredField] !== 0;
    if (!isEmpty) {
      if (type === 'array') {
        isEmpty = formData[requiredField]
          ? formData[requiredField].length === 0
          : true;
      } else if (type === 'string' && widget === 'richtext') {
        isEmpty = !(
          formData[requiredField]?.data?.replace(/(<([^>]+)>)/g, '').length > 0
        );
      }
    }
    if (
      schema.properties[requiredField] &&
      schema.properties[requiredField].type !== 'boolean' &&
      !schema.properties[requiredField].readonly &&
      isEmpty
    ) {
      errors[requiredField] = [];
      errors[requiredField].push(formatMessage(messages.required));
    }
  });

  return errors;
};
/**
 * Return list of errors if field constraints are not respected
 * (ex min, max, maxLength, email format, url format etc)
 * each potential criterion has a validation process in widgetValidation
 * !!ONLY fields with data will be tested (those undefined are ignored here)
 * @returns {Object[string]} - list of errors
 */
const validateFieldsPerFieldset = (
  schema,
  formData,
  formatMessage,
  touchedField,
) => {
  const errors = validateRequiredFields(
    schema,
    formData,
    formatMessage,
    touchedField,
  );

  function checkFieldErrors(fieldValidationCriteria, field, fieldData) {
    return fieldValidationCriteria
      .map((widgetCriterion) => {
        const errorMessage =
          fieldData === undefined || fieldData === null
            ? null
            : widgetCriterion.component({
                field,
                value: fieldData,
                formatMessage,
              });
        return errorMessage;
      })
      .filter((item) => !!item);
  }

  Object.entries(schema.properties).forEach(([fieldId, field]) => {
    let fieldData = formData[fieldId];

    // Default validation for all fields (required, minLength, maxLength)
    const defaultFieldValidationCriteria = config.getComponents({
      name: 'fieldValidator',
      dependencies: ['default'],
    });

    const defaultFieldErrors = checkFieldErrors(
      defaultFieldValidationCriteria,
      field,
      fieldData,
    );

    // Validation per field type or field widget
    const fieldWidgetType = field.widget || field.type || 'string';
    // test each criterion eg. maximum, isEmail, isUrl, etc
    const fieldValidationCriteria = config.getComponents({
      name: 'fieldValidator',
      dependencies: [fieldWidgetType],
    });

    const fieldErrors = checkFieldErrors(
      fieldValidationCriteria,
      field,
      fieldData,
    );

    const mergedErrors = [...defaultFieldErrors, ...fieldErrors];

    if (mergedErrors.length > 0) {
      errors[fieldId] = [
        ...(errors[fieldId] || []),
        ...defaultFieldErrors,
        ...fieldErrors,
      ];
    }
  });

  return errors;
};

/**
 * Create the errors object from backend the same way it is done on Frontend validation
 * @param {string} requestError form the server
 * @returns {Object}
 */
const giveServerErrorsToCorrespondingFields = (requestError) => {
  let errorsList = tryParseJSON(requestError);
  const errors = {};

  if (Array.isArray(errorsList) && errorsList.length > 0) {
    errorsList.forEach((errorItem) => {
      errors[errorItem.field] = errors[errorItem.field]
        ? errors[errorItem.field].push(errorItem.message)
        : [errorItem.message];
    });
  }
  return errors;
};

/**
 * The first Fieldset (Tab) that has any errors
 * will be selected
 * @param {Object[]} errors
 * @param {string} errors[].field
 * @param {Object} schema
 * @returns {number} activeIndex
 */
const getIndexOfFirstTabWithErrors = (errors, schema) => {
  let activeIndex = 0;

  schema.fieldsets.some((fieldSet, index) => {
    let foundfield = fieldSet.fields.some((fieldId) => errors[fieldId]);

    activeIndex = foundfield ? index : activeIndex;
    return foundfield;
  });

  return activeIndex;
};

class FormValidation {
  /**
   * The first Fieldset (Tab) that has any errors
   * will be selected
   * @param {Object} errors
   * @param {Object} schema
   * @returns {number} activeIndex
   */
  static showFirstTabWithErrors({
    errors = {},
    schema = { properties: {}, fieldsets: [], required: [] },
  } = {}) {
    return getIndexOfFirstTabWithErrors(errors, schema);
  }
  /**
   * Create the errors object from backend the same way it is done on Frontend validation
   * @param {string} requestError form the server
   * @returns {Object}
   */
  static giveServerErrorsToCorrespondingFields(requestError = '') {
    return giveServerErrorsToCorrespondingFields(requestError);
  }
  /**
   * Return validation result
   * @param {Object} schema
   * @param {Object} formData
   * @param {function} formatMessage
   * @returns {Object} errors
   */
  static validateFieldsPerFieldset({
    schema = { properties: {}, fieldsets: [], required: [] },
    formData = {},
    formatMessage = () => {},
    touchedField = {},
  } = {}) {
    return validateFieldsPerFieldset(
      schema,
      formData,
      formatMessage,
      touchedField,
    );
  }
}

export default FormValidation;

/**
 * Check if a file upload is within the maximum size limit.
 * @param {File} file
 * @param {Function} intlFunc
 * @returns {Boolean}
 */
export const validateFileUploadSize = (file, intlFunc) => {
  const isValid =
    !config.settings.maxFileUploadSize ||
    file.size <= config.settings.maxFileUploadSize;
  if (!isValid) {
    toast.error(
      <Toast
        error
        title={intlFunc(messages.error)}
        content={intlFunc(messages.fileTooLarge, {
          limit: `${Math.floor(
            config.settings.maxFileUploadSize / 1024 / 1024,
          )}MB`,
        })}
      />,
    );
  }
  return isValid;
};
