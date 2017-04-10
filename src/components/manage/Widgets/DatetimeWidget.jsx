/**
 * DatetimeWidget component.
 * @module components/manage/Widgets/DatetimeWidget
 */

import React, { PropTypes } from 'react';
import { Form, Input, Label } from 'semantic-ui-react';

/**
 * DatetimeWidget component class.
 * @function DatetimeWidget
 * @returns {string} Markup of the component.
 */
const DatetimeWidget = ({ id, title, required, description, error, value, onChange }) =>
  <Form.Field required={required} error={error}>
    <label htmlFor={`field-${id}`}>
      {title}
      {description && <span className="help">{description}</span>}
    </label>
    <input
      id={`field-${id}`}
      name={id}
      type="datetime-local"
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
DatetimeWidget.propTypes = {
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
DatetimeWidget.defaultProps = {
  description: null,
  required: false,
  error: null,
  value: null,
};

export default DatetimeWidget;
