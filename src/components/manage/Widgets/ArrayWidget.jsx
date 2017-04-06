/**
 * ArrayWidget component.
 * @module components/manage/Widgets/ArrayWidget
 */

import React, { PropTypes } from 'react';

/**
 * ArrayWidget component class.
 * @function ArrayWidget
 * @returns {string} Markup of the component.
 */
const ArrayWidget = ({ id, title, required, description, error, value, onChange }) =>
  <div className={`field${error ? ' error' : ''}`}>
    <label htmlFor={`field-${id}`} className="horizontal">
      {title}
      {description && <span className="formHelp">{description}</span>}
      {required && <span className="required horizontal" title="Required">&nbsp;</span>}
    </label>
    {error && <div className="fieldErrorBox">{error}</div>}
    <textarea
      id={`field-${id}`}
      name={id}
      className="textarea-widget"
      value={value ? value.join('\n') : ''}
      onChange={({ target }) => onChange(id, target.value === '' ? undefined : target.value.split('\n'))}
    />
  </div>;

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
