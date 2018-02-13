/**
 * PasswordWidget component.
 * @module components/manage/Widgets/PassswordWidget
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Form, Input, Label } from 'semantic-ui-react';
import { map } from 'lodash';

/**
 * Component to display a password widget.
 * @function PasswordWidget
 * @returns {string} Markup of the component.
 */
const PasswordWidget = ({
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
      type="password"
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
PasswordWidget.propTypes = {
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
PasswordWidget.defaultProps = {
  description: null,
  required: false,
  error: [],
  value: null,
};

export default PasswordWidget;
