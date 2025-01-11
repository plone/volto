/**
 * MonthOfTheYearField component.
 * @module components/manage/Widgets/RecurrenceWidget/MonthOfTheYearField
 */

import React from 'react';
import PropTypes from 'prop-types';
import map from 'lodash/map';
import { Form } from 'semantic-ui-react';
import SelectInput from './SelectInput';
import { toBackendLang } from '@plone/volto/helpers/Utils/Utils';
import { useSelector } from 'react-redux';
import moment from 'moment';

/**
 * MonthOfTheYearField component class.
 * @function MonthOfTheYearField
 * @returns {string} Markup of the component.
 */
const MonthOfTheYearField = ({ value, disabled, inline, onChange }) => {
  const lang = useSelector((state) => state.intl.locale);
  moment.locale(toBackendLang(lang));
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
