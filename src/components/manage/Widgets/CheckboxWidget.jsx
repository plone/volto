/**
 * CheckboxWidget component.
 * @module components/manage/Widgets/CheckboxWidget
 */

import React, { PropTypes } from 'react';

/**
 * CheckboxWidget component class.
 * @function CheckboxWidget
 * @returns {string} Markup of the component.
 */
const CheckboxWidget = ({ id, title, required, description, error, value, onChange }) =>
  <div className={`field${error ? ' error' : ''}`}>
    <span className="option">
      <input
        id={`field-${id}`}
        name={id}
        type="checkbox"
        className="single-checkbox-widget"
        checked={value}
        onChange={({ target }) => onChange(id, target.checked)}
      />
      <label htmlFor={`field-${id}`} className="horizontal">
        {title}
        {required && <span className="required horizontal" title="Required">&nbsp;</span>}
      </label>
    </span>
    {description && <div className="formHelp">{description}</div>}
    {error && <div className="fieldErrorBox">{error}</div>}

  </div>;

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
