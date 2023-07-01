import { isBoolean, isObject, isString } from 'lodash';
import { getBoolean } from '@plone/volto/helpers';
import { defineMessages } from 'react-intl';

const messages = defineMessages({
  no_value: {
    id: 'No value',
    defaultMessage: 'No value',
  },
});

/**
 * Prepares a vocab endpoint query for tokens based on passed value.
 *
 * This can be used to facilitate querying a vocabulary endpoint for labels,
 * given some token values. This assumes that the value has already been
 * normalized by normalizeValue.
 */
export function convertValueToVocabQuery(value) {
  if (isString(value) || isBoolean(value)) return { token: value.toString() };

  if (!value) return {};

  if (Array.isArray(value)) {
    return {
      tokens: value
        .map((v) =>
          isObject(v)
            ? v.value ?? v.token
            : isString(v) || isBoolean(v)
            ? v
            : null,
        )
        .filter((f) => f !== null),
    };
  }

  const token = value.value ?? value.token;
  return isString(token) ? { token } : {};
}

/**
 * Normalizes provided value to a "best representation" value, as accepted by
 * react-select. In this case, it is an object of shape `{ label, value }`
 */
export function normalizeSingleSelectOption(value, intl) {
  if (!value) return value;

  if (Array.isArray(value)) {
    // assuming [token, title] pair.
    if (value.length === 2)
      return { value: value[0], label: value[1] || value[0] };

    throw new Error(`Unknown value type of select widget: ${value}`);
  }

  const token = value.token ?? value.value ?? value.UID ?? 'no-value';
  const label =
    (value.title && value.title !== 'None' ? value.title : undefined) ??
    value.label ??
    value.token ??
    intl.formatMessage(messages.no_value);

  return {
    value: token,
    label,
  };
}

export const normalizeChoices = (items, intl) =>
  items.map((item) => normalizeSingleSelectOption(item, intl));

/**
 * Given the value from the API, it normalizes to a value valid to use in react-select.
 * This is necessary because of the inconsistencies in p.restapi vocabularies implementations as
 * they need to adapt to react-select public interface.
 * @function normalizeValue
 * @param {array} choices The choices
 * @param {string|object|boolean|array} value The value
 * @returns {Object} An object of shape {label: "", value: ""} (or an array)
 */
export function normalizeValue(choices, value, intl) {
  choices = normalizeChoices(choices || [], intl);
  const choiceMap = Object.assign(
    {},
    ...choices.map(({ label, value }) => ({
      [value]: label,
    })),
  );

  if (!isObject(value) && isBoolean(value)) {
    // We have a boolean value, which means we need to provide a "No value"
    // option
    const label = choiceMap[getBoolean(value)];
    return label
      ? {
          label,
          value,
        }
      : {};
  }

  if (value === 'no-value') {
    return {
      label: intl.formatMessage(messages.no_value),
      value: 'no-value',
    };
  }

  if (value === undefined || !value || value.length === 0) return null;

  if (Array.isArray(value)) {
    // a list of values, like ['foo', 'bar'];
    return value.map((v) => normalizeValue(choices, v));
  }

  if (isObject(value)) {
    // an object like `{label, value}` or `{ title, value }`
    return normalizeSingleSelectOption(value, intl);
  }

  // fallback: treat value as a token and look it up in choices
  return Object.keys(choiceMap).includes(value)
    ? { label: choiceMap[value], value }
    : { label: value, value };
}
