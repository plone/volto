/**
 * TextWidget component.
 * @module components/manage/Widgets/TextWidget
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Form, Input, Label } from 'semantic-ui-react';
import { map } from 'lodash';

/**
 * Component to display a text widget.
 * @function TextWidget
 * @returns {string} Markup of the component.
 */
const TextWidget = ({
  id,
  title,
  required,
  description,
  error,
  value,
  onChange,
}) => (
  <Form.Field required={required} error={error.length > 0}>
    <label htmlFor={`field-${id}`}>
      {title}
      {description && <span className="help">{description}</span>}
    </label>
    <Input
      id={`field-${id}`}
      name={id}
      value={value || ''}
      onChange={({ target }) =>
        onChange(id, target.value === '' ? undefined : target.value)}
    />
    {map(error, message => (
      <Label key={message} basic color="red" pointing>
        {message}
      </Label>
    ))}
  </Form.Field>
);

/**
 * Property types.
 * @property {Object} propTypes Property types.
 * @static
 */
TextWidget.propTypes = {
  /**
   * Id of the field
   */
  id: PropTypes.string.isRequired,
  /**
   * Title of the field
   */
  title: PropTypes.string.isRequired,
  /**
   * Description of the field
   */
  description: PropTypes.string,
  /**
   * True if field is required
   */
  required: PropTypes.bool,
  /**
   * List of error messages
   */
  error: PropTypes.arrayOf(PropTypes.string),
  /**
   * Value of the field
   */
  value: PropTypes.string,
  /**
   * On change handler
   */
  onChange: PropTypes.func.isRequired,
};

/**
 * Default properties.
 * @property {Object} defaultProps Default properties.
 * @static
 */
TextWidget.defaultProps = {
  description: null,
  required: false,
  error: [],
  value: null,
};

export default TextWidget;
