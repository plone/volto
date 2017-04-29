/**
 * Field component.
 * @module components/manage/Form/Field
 */

import React from 'react';
import PropTypes from 'prop-types';

import {
  ArrayWidget,
  CheckboxWidget,
  DatetimeWidget,
  PasswordWidget,
  SelectWidget,
  TextWidget,
  TextareaWidget,
  WysiwygWidget,
} from '../../../components';

/**
 * Field component class.
 * @function Field
 * @param {Object} props Properties.
 * @returns {string} Markup of the component.
 */
const Field = props => {
  if (props.widget) {
    switch (props.widget) {
      case 'richtext':
        return <WysiwygWidget {...props} />;
      case 'textarea':
        return <TextareaWidget {...props} />;
      case 'datetime':
        return <DatetimeWidget {...props} />;
      case 'password':
        return <PasswordWidget {...props} />;
      default:
        return <TextWidget {...props} />;
    }
  }
  if (props.choices) {
    return <SelectWidget {...props} />;
  }
  if (props.type === 'boolean') {
    return <CheckboxWidget {...props} />;
  }
  if (props.type === 'array') {
    return <ArrayWidget {...props} />;
  }
  return <TextWidget {...props} />;
};

/**
 * Property types.
 * @property {Object} propTypes Property types.
 * @static
 */
Field.propTypes = {
  widget: PropTypes.string,
  choices: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.string)),
  type: PropTypes.string,
};

/**
 * Default properties.
 * @property {Object} defaultProps Default properties.
 * @static
 */
Field.defaultProps = {
  widget: null,
  choices: null,
  type: 'string',
};

export default Field;
