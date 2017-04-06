/**
 * SelectWidget component.
 * @module components/manage/Widgets/SelectWidget
 */

import React, { PropTypes } from 'react';

/**
 * SelectWidget component class.
 * @function SelectWidget
 * @returns {string} Markup of the component.
 */
const SelectWidget = ({ id, title, required, description, error, value, choices, onChange }) =>
  <div className={`field${error ? ' error' : ''}`}>
    <label htmlFor={`field-${id}`} className="horizontal">
      {title}
      {description && <span className="formHelp">{description}</span>}
      {required && <span className="required horizontal" title="Required">&nbsp;</span>}
    </label>
    {error && <div className="fieldErrorBox">{error}</div>}
    <select
      id={`field-${id}`}
      name={id}
      value={value || ''}
      onChange={({ target }) => onChange(id, target.value === '' ? undefined : target.value)}
      className="select-widget"
    >
      <option value="">No value</option>
      {choices.map(option =>
        <option key={option[0]} value={option[0]}>{option[1]}</option>,
      )}
    </select>
  </div>;

/**
 * Property types.
 * @property {Object} propTypes Property types.
 * @static
 */
SelectWidget.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string,
  required: PropTypes.bool,
  error: PropTypes.string,
  value: PropTypes.string,
  choices: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.string)),
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
  error: null,
  value: '',
  choices: [],
};

export default SelectWidget;
