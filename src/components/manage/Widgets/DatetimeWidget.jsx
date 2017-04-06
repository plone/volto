/**
 * DatetimeWidget component.
 * @module components/manage/Widgets/DatetimeWidget
 */

import React, { PropTypes } from 'react';

/**
 * DatetimeWidget component class.
 * @function DatetimeWidget
 * @returns {string} Markup of the component.
 */
const DatetimeWidget = ({ id, title, required, description, error, value, onChange }) =>
  <div className={`field${error ? ' error' : ''}`}>
    <label htmlFor={`field-${id}`} className="horizontal">
      {title}
      {description && <span className="formHelp">{description}</span>}
      {required && <span className="required horizontal" title="Required">&nbsp;</span>}
    </label>
    {error && <div className="fieldErrorBox">{error}</div>}
    <input
      id={`field-${id}`}
      name={id}
      type="datetime-local"
      className="datetime-widget"
      value={value || ''}
      onChange={({ target }) => onChange(id, target.value === '' ? undefined : target.value)}
    />
  </div>;

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
