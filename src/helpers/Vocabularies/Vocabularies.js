/**
 * Get string as Boolean.
 * @function getBoolean
 * @param {Object} value The value.
 * @return {string} Field name of the layout
 */
export function getBoolean(value) {
  switch (value) {
    case true:
    case 'true':
    case 'True':
    case 1:
    case '1':
    case 'on':
    case 'yes':
      return true;
    default:
      return false;
  }
}

/**
 * Get vocabulary from hint.
 * @function getVocabFromHint
 * @param {Object} props The props.
 * @return {string} Field name of the layout
 */
export function getVocabFromHint(props) {
  return props.widgetOptions && props.widgetOptions.vocabulary
    ? props.widgetOptions.vocabulary['@id']
    : false;
}

/**
 * Get vocabulary from field.
 * @function getVocabFromField
 * @param {Object} props The props.
 * @return {string} Field name of the layout
 */
export function getVocabFromField(props) {
  return props.vocabulary ? props.vocabulary['@id'] : false;
}

/**
 * Get vocabulary from items.
 * @function getVocabFromItems
 * @param {Object} props The props.
 * @return {string} Field name of the layout
 */
export function getVocabFromItems(props) {
  return props.items && props.items.vocabulary
    ? props.items.vocabulary['@id']
    : false;
}
