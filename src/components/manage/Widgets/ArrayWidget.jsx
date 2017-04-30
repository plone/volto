/**
 * ArrayWidget component.
 * @module components/manage/Widgets/ArrayWidget
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Form, Label, TextArea } from 'semantic-ui-react';
import { map } from 'lodash';

/**
 * ArrayWidget component class.
 * @function ArrayWidget
 * @returns {string} Markup of the component.
 */
const ArrayWidget = ({
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
    <TextArea
      id={`field-${id}`}
      name={id}
      value={value ? value.join('\n') : ''}
      onChange={({ target }) =>
        onChange(
          id,
          target.value === '' ? undefined : target.value.split('\n'),
        )}
    />
    {map(error, message => (
      <Label key={message} basic color="red" pointing>{message}</Label>
    ))}
  </Form.Field>
);

/**
 * Property types.
 * @property {Object} propTypes Property types.
 * @static
 */
ArrayWidget.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string,
  required: PropTypes.bool,
  error: PropTypes.arrayOf(PropTypes.string),
  value: PropTypes.arrayOf(PropTypes.string),
  onChange: PropTypes.func.isRequired,
};

/**
 * Default properties.
 * @property {Object} defaultProps Default properties.
 * @static
 */
ArrayWidget.defaultProps = {
  description: null,
  required: false,
  error: [],
  value: null,
};

export default ArrayWidget;
