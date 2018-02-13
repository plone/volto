/**
 * CheckboxWidget component.
 * @module components/manage/Widgets/CheckboxWidget
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Form, Label, Checkbox } from 'semantic-ui-react';
import { map } from 'lodash';

/**
 * Component to display a checkbox widget.
 * @function CheckboxWidget
 * @returns {string} Markup of the component.
 */
const CheckboxWidget = ({
  id,
  title,
  required,
  description,
  error,
  value,
  onChange,
}) => (
  <Form.Field required={required} error={error.length > 0}>
    <Checkbox
      id={`field-${id}`}
      name={id}
      checked={value}
      label={title}
      onChange={(event, { checked }) => onChange(id, checked)}
    />
    {description && <div className="help">{description}</div>}
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
CheckboxWidget.propTypes = {
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
  value: PropTypes.bool,
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
CheckboxWidget.defaultProps = {
  description: null,
  required: false,
  error: [],
  value: null,
};

export default CheckboxWidget;
