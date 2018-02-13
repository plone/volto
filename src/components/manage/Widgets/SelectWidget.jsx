/**
 * SelectWidget component.
 * @module components/manage/Widgets/SelectWidget
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Form, Select, Label } from 'semantic-ui-react';
import { map } from 'lodash';

/**
 * Component to display a select widget.
 * @function SelectWidget
 * @returns {string} Markup of the component.
 */
const SelectWidget = ({
  id,
  title,
  required,
  description,
  error,
  value,
  choices,
  onChange,
}) => (
  <Form.Field required={required} error={error.length > 0}>
    <label htmlFor={`field-${id}`}>
      {title}
      {description && <span className="help">{description}</span>}
    </label>
    <Select
      id={`field-${id}`}
      name={id}
      value={value || 'no-value'}
      onChange={(event, { value }) =>
        onChange(id, value === 'no-value' ? undefined : value)
      }
      options={[
        { key: 'no-value', text: 'No value', value: 'no-value' },
        ...choices.map(option => ({
          key: option[0],
          text: option[1],
          value: option[0],
        })),
      ]}
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
SelectWidget.propTypes = {
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
   * List of choices
   */
  choices: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.string)),
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
SelectWidget.defaultProps = {
  description: null,
  required: false,
  error: [],
  value: '',
  choices: [],
};

export default SelectWidget;
