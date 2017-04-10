/**
 * TextWidget component.
 * @module components/manage/Widgets/TextWidget
 */

import React, { PropTypes } from 'react';
import { Form, Input, Label } from 'semantic-ui-react';

/**
 * TextWidget component class.
 * @function TextWidget
 * @returns {string} Markup of the component.
 */
const TextWidget = ({ id, title, required, description, error, value, onChange }) =>
  <Form.Field required={required} error={error}>
    <label htmlFor={`field-${id}`}>
      {title}
      {description && <span className="help">{description}</span>}
    </label>
    <Input
      id={`field-${id}`}
      name={id}
      value={value || ''}
      onChange={({ target }) => onChange(id, target.value === '' ? undefined : target.value)}
    />
    {error && <Label basic color="red" pointing="below">{error}</Label>}
  </Form.Field>;

/**
 * Property types.
 * @property {Object} propTypes Property types.
 * @static
 */
TextWidget.propTypes = {
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
TextWidget.defaultProps = {
  description: null,
  required: false,
  error: null,
  value: null,
};

export default TextWidget;
