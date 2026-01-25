/**
 * WeekdayOfTheMonthIndexField component.
 * @module components/manage/Widgets/RecurrenceWidget/WeekdayOfTheMonthIndexField
 */

import React from 'react';
import PropTypes from 'prop-types';
import { defineMessages, useIntl } from 'react-intl';
import map from 'lodash/map';
import { Form } from 'semantic-ui-react';
import SelectInput from './SelectInput';

/**
 * WeekdayOfTheMonthIndexField component.
 * @function WeekdayOfTheMonthIndexField
 * @returns {JSX.Element} Markup of the component.
 */

const messages = defineMessages({
  bymonthDayNumber: { id: 'Weeek day of month', defaultMessage: 'The' },

  first: { id: 'First', defaultMessage: 'First' },
  second: { id: 'Second', defaultMessage: 'Second' },
  third: { id: 'Third', defaultMessage: 'Third' },
  fourth: { id: 'Fourth', defaultMessage: 'Fourth' },
  last: { id: 'Last', defaultMessage: 'Last' },
});

const ORDINAL_NUMBERS = {
  1: 'first',
  2: 'second',
  3: 'third',
  4: 'fourth',
  '-1': 'last',
};

const WeekdayOfTheMonthIndexField = ({
  disabled,
  value,
  onChange,
  ...otherProps
}) => {
  const intl = useIntl();
  const weekdayOfTheMonthIndexList = [
    ...map(Object.keys(ORDINAL_NUMBERS), (option) => ({
      value: parseInt(option),
      label: intl.formatMessage(messages[ORDINAL_NUMBERS[option]]),
    })),
  ];
  return (
    <>
      <Form.Field disabled={disabled}>
        {intl.formatMessage(messages.bymonthDayNumber)}
      </Form.Field>

      <Form.Field disabled={disabled}>
        <SelectInput
          name="weekdayOfTheMonthIndex"
          options={weekdayOfTheMonthIndexList}
          disabled={disabled}
          value={value}
          onChange={onChange}
          {...otherProps}
        />
      </Form.Field>
    </>
  );
};

/**
 * Property types.
 * @property {Object} propTypes
 * @static
 */
WeekdayOfTheMonthIndexField.propTypes = {
  disabled: PropTypes.bool,
  value: PropTypes.any,
  onChange: PropTypes.func,
};

/**
 * Default properties.
 * @property {Object} defaultProps
 * @static
 */
WeekdayOfTheMonthIndexField.defaultProps = {
  disabled: false,
  value: null,
  onChange: null,
};

export default WeekdayOfTheMonthIndexField;
