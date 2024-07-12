import { validationMessage } from './FormValidation';
import { messages } from '@plone/volto/helpers/MessageLabels/MessageLabels';

type MinMaxValidator = {
  value: string | number;
  fieldSpec: string | number;
  criterion: string;
  formatMessage: Function;
};

type Validator = {
  value: string;
  field: {
    minLength: number;
    maxLength: number;
    minimum: number;
    maximum: number;
    uniqueItems: Boolean;
  };
  formatMessage: Function;
};

export const isMaxPropertyValid = ({
  value,
  fieldSpec,
  criterion,
  formatMessage,
}: MinMaxValidator) => {
  const isValid = fieldSpec !== undefined ? value <= fieldSpec : true;
  return validationMessage(isValid, criterion, fieldSpec, formatMessage);
};

export const isMinPropertyValid = ({
  value,
  fieldSpec,
  criterion,
  formatMessage,
}: MinMaxValidator) => {
  const isValid = fieldSpec !== undefined ? value >= fieldSpec : true;
  return validationMessage(isValid, criterion, fieldSpec, formatMessage);
};

export const minLengthValidator = ({
  value,
  field,
  formatMessage,
}: Validator) =>
  isMinPropertyValid({
    value: value.length,
    fieldSpec: field.minLength,
    criterion: 'minLength',
    formatMessage,
  });

export const maxLengthValidator = ({
  value,
  field,
  formatMessage,
}: Validator) =>
  isMaxPropertyValid({
    value: value.length,
    fieldSpec: field.maxLength,
    criterion: 'maxLength',
    formatMessage,
  });

export const urlValidator = ({ value, formatMessage }: Validator) => {
  const urlRegex = new RegExp(
    '^(https?:\\/\\/)?' + // validate protocol
      '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // validate domain name
      '((\\d{1,3}\\.){3}\\d{1,3}))|' + // validate OR ip (v4) address
      '(localhost)' + // validate OR localhost address
      '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // validate port and path
      '(\\?[;&a-z\\d%_.~+=-]*)?' + // validate query string
      '(\\#[-a-z\\d_]*)?$', // validate fragment locator
    'i',
  );
  const isValid = urlRegex.test(value);
  return !isValid ? formatMessage(messages.isValidURL) : null;
};

export const emailValidator = ({ value, formatMessage }: Validator): string => {
  // Email Regex taken from from WHATWG living standard:
  // https://html.spec.whatwg.org/multipage/input.html#e-mail-state-(type=email)
  const emailRegex =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
  const isValid = emailRegex.test(value);
  return !isValid ? formatMessage(messages.isValidEmail) : null;
};

export const isNumber = ({ value, formatMessage }: Validator) => {
  const floatRegex = /^[+-]?\d+(\.\d+)?$/;
  const isValid =
    typeof value === 'number' && !isNaN(value) && floatRegex.test(value);
  return !isValid ? formatMessage(messages.isNumber) : null;
};

export const minimumValidator = ({ value, field, formatMessage }: Validator) =>
  isMinPropertyValid({
    value,
    fieldSpec: field.minimum,
    criterion: 'minimum',
    formatMessage,
  });

export const maximumValidator = ({ value, field, formatMessage }: Validator) =>
  isMaxPropertyValid({
    value,
    fieldSpec: field.maximum,
    criterion: 'maximum',
    formatMessage,
  });

export const isInteger = ({ value, formatMessage }: Validator) => {
  const intRegex = /^-?[0-9]+$/;
  const isValid =
    typeof value === 'number' && !isNaN(value) && intRegex.test(value);
  return !isValid ? formatMessage(messages.isInteger) : null;
};

export const hasUniqueItems = ({ value, field, formatMessage }: Validator) => {
  if (!field.uniqueItems) {
    return null;
  }
  const isValid =
    field.uniqueItems &&
    value &&
    // unique items
    [...new Set(value)].length === value.length;
  return !isValid ? formatMessage(messages.uniqueItems) : null;
};
