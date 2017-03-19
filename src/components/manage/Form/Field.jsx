/**
 * Field component.
 * @module components/manage/Form/Field
 */

import React, { PropTypes } from 'react';

/**
 * Field component class.
 * @function Field
 * @returns {string} Markup of the component.
 */
const Field = ({ id, classNames, label, help, required, rawDescription, rawErrors, children }) =>
  <div className={`field ${classNames} ${rawErrors.length > 0 ? 'error' : ''}`}>
    <label htmlFor={id} className="horizontal">
      {label}
      {required ? <span className="required horizontal" title="Required">&nbsp;</span> : null}
      {rawDescription ? <span className="formHelp">{rawDescription}</span> : null}
    </label>
    {rawErrors.map(error =>
      <div key={error} className="fieldErrorBox">{error}</div>,
    )}
    {children}
    {help}
  </div>;

/**
 * Property types.
 * @property {Object} propTypes Property types.
 * @static
 */
Field.propTypes = {
  id: PropTypes.string.isRequired,
  classNames: PropTypes.string.isRequired,
  label: PropTypes.string,
  help: PropTypes.element,
  required: PropTypes.bool,
  rawDescription: PropTypes.string,
  rawErrors: PropTypes.arrayOf(PropTypes.string),
  children: PropTypes.element.isRequired,
};

/**
 * Default properties.
 * @property {Object} defaultProps Default properties.
 * @static
 */
Field.defaultProps = {
  label: '',
  help: null,
  required: false,
  rawDescription: '',
  rawErrors: [],
};

export default Field;
