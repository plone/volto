/**
 * TextWidget component.
 * @module components/manage/Widgets/TextWidget
 */

import React, { PropTypes } from 'react';
import { drop } from 'lodash';

/**
 * TextWidget component class.
 * @function TextWidget
 * @returns {string} Markup of the component.
 */
const TextWidget = ({ id, label, value, onChange }) =>
  <input
    id={id}
    name={drop(id.split('_'), 2).join('_')}
    type="text"
    label={label}
    className="text-widget"
    onChange={({ target }) => onChange(target.value === '' ? undefined : target.value)}
    value={value}
  />;

/**
 * Property types.
 * @property {Object} propTypes Property types.
 * @static
 */
TextWidget.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func.isRequired,
};

/**
 * Default properties.
 * @property {Object} defaultProps Default properties.
 * @static
 */
TextWidget.defaultProps = {
  label: '',
  value: '',
};

export default TextWidget;
