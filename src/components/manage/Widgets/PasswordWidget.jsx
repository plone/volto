/**
 * PasswordWidget component.
 * @module components/manage/Widgets/PassswordWidget
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Form, Input, Label } from 'semantic-ui-react';

/**
 * PasswordWidget component class.
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
  <Form.Field required={required} error={error}>
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
    {error && <Label basic color="red" pointing="below">{error}</Label>}
  </Form.Field>
);

/**
 * Property types.
 * @property {Object} propTypes Property types.
 * @static
 */
PasswordWidget.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string,
  required: PropTypes.bool,
  error: PropTypes.string,
  value: PropTypes.string,
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
  error: null,
  value: null,
};

export default PasswordWidget;
