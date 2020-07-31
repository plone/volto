/**
 * MonthOfTheYearField component.
 * @module components/manage/Widgets/RecurrenceWidget/MonthOfTheYearField
 */

import React from 'react';
import PropTypes from 'prop-types';
import { map } from 'lodash';
import moment from 'moment';
import { Form } from 'semantic-ui-react';
import SelectInput from './SelectInput';

/**
 * MonthOfTheYearField component class.
 * @function MonthOfTheYearField
 * @returns {string} Markup of the component.
 */
const MonthOfTheYearField = ({ value, disabled, inline, onChange }) => {
  const monthList = [
    ...map(moment.months(), (m, i) => ({
      value: i + 1,
      label: m,
    })),
  ];

  return (
    <Form.Field inline={inline} disabled={disabled}>
      <SelectInput
        name="monthOfTheYear"
        disabled={disabled}
        options={monthList}
        value={value}
        onChange={onChange}
      />
    </Form.Field>
  );
};

/**
 * Property types.
 * @property {Object} propTypes Property types.
 * @static
 */
MonthOfTheYearField.propTypes = {
  value: PropTypes.any,
  disabled: PropTypes.bool,
  inline: PropTypes.bool,
  onChange: PropTypes.func,
};

/**
 * Default properties.
 * @property {Object} defaultProps Default properties.
 * @static
 */
MonthOfTheYearField.defaultProps = {
  value: null,
  disabled: false,
  inline: false,
  onChange: null,
};

export default MonthOfTheYearField;
