/**
 * ArrayWidget component.
 * @module components/manage/Widgets/ArrayWidget
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Form, Label, TextArea } from 'semantic-ui-react';

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
  <Form.Field required={required} error={error}>
    <label htmlFor={`field-${id}`}>
      {title}
      {description && <span className="help">{description}</span>}
    </label>
    {error && <div className="fieldErrorBox">{error}</div>}
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
    {error && <Label basic color="red" pointing="below">{error}</Label>}
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
  error: PropTypes.string,
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
  error: null,
  value: null,
};

export default ArrayWidget;
