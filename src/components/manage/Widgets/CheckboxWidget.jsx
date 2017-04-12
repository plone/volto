/**
 * CheckboxWidget component.
 * @module components/manage/Widgets/CheckboxWidget
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Form, Label, Checkbox } from 'semantic-ui-react';

/**
 * CheckboxWidget component class.
 * @function CheckboxWidget
 * @returns {string} Markup of the component.
 */
const CheckboxWidget = ({ id, title, required, description, error, value, onChange }) =>
  <Form.Field required={required} error={error}>
    <Checkbox
      id={`field-${id}`}
      name={id}
      checked={value}
      label={title}
      onChange={(event, { checked }) => onChange(id, checked)}
    />
    {description && <div className="help">{description}</div>}
    {error && <Label basic color="red" pointing="below">{error}</Label>}
  </Form.Field>;

/**
 * Property types.
 * @property {Object} propTypes Property types.
 * @static
 */
CheckboxWidget.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string,
  required: PropTypes.bool,
  error: PropTypes.string,
  value: PropTypes.bool,
  onChange: PropTypes.func.isRequired,
};

/**
 * Default properties.
 * @property {Object} defaultProps Default properties.
 * @static
 */
CheckboxWidget.defaultProps = {
  description: null,
  required: false,
  error: null,
  value: null,
};

export default CheckboxWidget;
