/**
 * Prepares a vocab endpoint query for tokens based on passed value.
 *
 * This can be used to facilitate querying a vocabulary endpoint for labels,
 * given some token values. This assumes that the value has already been
 * normalized by normalizeValue.
 */
export function convertValueToVocabQuery(value: any): {
    token: string;
    tokens?: undefined;
} | {
    token?: undefined;
    tokens?: undefined;
} | {
    tokens: any[];
    token?: undefined;
};
/**
 * Normalizes provided value to a "best representation" value, as accepted by
 * react-select. In this case, it is an object of shape `{ label, value }`
 */
export function normalizeSingleSelectOption(value: any, intl: any): any;
/**
 * Given the value from the API, it normalizes to a value valid to use in react-select.
 * This is necessary because of the inconsistencies in p.restapi vocabularies implementations as
 * they need to adapt to react-select public interface.
 * @function normalizeValue
 * @param {array} choices The choices
 * @param {string|object|boolean|array} value The value
 * @returns {Object} An object of shape {label: "", value: ""} (or an array)
 */
export function normalizeValue(choices: any[], value: string | object | boolean | any[], intl: any): any;
export function normalizeChoices(items: any, intl: any): any;
