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

/**
 * Get Fields vocabulary
 * @function getFieldsVocabulary
 * @returns {Object} Fields vocabulary
 */
export function getFieldsVocabulary() {
  return {
    items: [
      {
        title: 'Choice',
        token: 'label_choice_field',
      },
      {
        title: 'Date',
        token: 'label_date_field',
      },
      {
        title: 'Date/Time',
        token: 'label_datetime_field',
      },
      {
        title: 'Email',
        token: 'Email',
      },
      {
        title: 'File',
        token: 'File',
      },
      {
        title: 'Floating-point number',
        token: 'label_float_field',
      },
      {
        title: 'Image',
        token: 'Image',
      },
      {
        title: 'Integer',
        token: 'label_integer_field',
      },
      {
        title: 'JSONField',
        token: 'JSONField',
      },
      {
        title: 'Multiple Choice',
        token: 'label_multi_choice_field',
      },
      {
        title: 'Password',
        token: 'label_password_field',
      },
      // {
      //   title: 'Relation Choice',
      //   token: 'Relation Choice',
      // },
      {
        title: 'Relation List',
        token: 'Relation List',
      },
      {
        title: 'Rich Text',
        token: 'Rich Text',
      },
      {
        title: 'Text',
        token: 'label_text_field',
      },
      {
        title: 'Text line (String)',
        token: 'label_textline_field',
      },
      {
        title: 'URL',
        token: 'URL',
      },
      {
        title: 'Yes/No',
        token: 'label_boolean_field',
      },
    ],
  };
}
