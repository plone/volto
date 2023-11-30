/**
 * SelectInput component.
 * @module components/manage/Widgets/RecurrenceWidget/SelectInput
 */

import React from 'react';
import PropTypes from 'prop-types';
import Select from 'react-select';
import { find } from 'lodash';
import {
  Option,
  DropdownIndicator,
  selectTheme,
  customSelectStyles,
} from '@plone/volto/components/manage/Widgets/SelectStyling';
/**
 * SelectInput component class.
 * @function SelectInput
 * @returns {string} Markup of the component.
 */
const SelectInput = ({ name, disabled, options, value, onChange }) => {
  const inlineSelectStyles = {
    ...customSelectStyles,
    control: (styles, state) => ({
      ...customSelectStyles.control(styles, state),
      minWidth: '130px',
    }),
  };
  const getDefaultValue = (choices, value) => {
    const element = find(choices, (o) => o.value === value);
    return element ? element : {};
  };

  return (
    <Select
      isDisabled={disabled}
      id={name}
      name={name}
      className="react-select-container"
      classNamePrefix="react-select"
      defaultValue={getDefaultValue(options, value)}
      value={getDefaultValue(options, value)}
      options={options}
      styles={inlineSelectStyles}
      theme={selectTheme}
      components={{
        DropdownIndicator,
        Option,
      }}
      onChange={(data) => onChange(name, data.value)}
    />
  );
};

/**
 * Property types.
 * @property {Object} propTypes Property types.
 * @static
 */
SelectInput.propTypes = {
  name: PropTypes.string.isRequired,
  options: PropTypes.array.isRequired,
  disabled: PropTypes.bool,
  value: PropTypes.any,
  onChange: PropTypes.func,
};

/**
 * Default properties.
 * @property {Object} defaultProps Default properties.
 * @static
 */
SelectInput.defaultProps = {
  name: 'select',
  options: [],
  disabled: false,
  value: null,
  onChange: null,
};

export default SelectInput;
