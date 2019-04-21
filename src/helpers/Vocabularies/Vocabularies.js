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
